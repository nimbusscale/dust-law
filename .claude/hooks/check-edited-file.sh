#!/usr/bin/env bash
# Claude Code runs this after each Edit or Write. It formats and lints the file when it's a
# TypeScript file under packages/, so errors come back right away. Exit code 2 sends stderr back
# to Claude Code.
#
# Claude Code asks the owner before each edit to this file, so an agent can't weaken a check to
# make it pass (CS-3).
set -uo pipefail

file_path=$(jq -r '.tool_input.file_path // empty')
case "$file_path" in
  *.ts | *.tsx) ;;
  *) exit 0 ;;
esac

# The file's own checkout, so an edit in a git worktree is checked against that worktree's config.
repo=$(git -C "$(dirname "$file_path")" rev-parse --show-toplevel 2>/dev/null) || exit 0
case "$file_path" in
  "$repo"/packages/*) ;;
  *) exit 0 ;;
esac
cd "$repo" || exit 1

if ! output=$(node_modules/.bin/prettier --write "$file_path" 2>&1); then
  printf 'Prettier failed on %s:\n%s\n' "$file_path" "$output" >&2
  exit 2
fi

if ! output=$(node_modules/.bin/eslint --max-warnings 0 --no-warn-ignored "$file_path" 2>&1); then
  printf 'ESLint failed on %s:\n%s\n' "$file_path" "$output" >&2
  exit 2
fi
