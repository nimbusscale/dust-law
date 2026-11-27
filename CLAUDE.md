# Dust Law

## Doc map

The doc standards come from the factory's plugin, which `.claude/settings.json` asks for. Its
`software-factory:standards` skill holds the standards, their templates and the doc check script.

| Doc | Path |
|---|---|
| Doc standards | The `software-factory:standards` skill |
| Functional spec | `docs/functional-spec.md` |
| Technical spec | `docs/technical-spec.md` |
| Blueprints | `docs/blueprints/` |
| Doc check script | `check_docs.py` in the `software-factory:standards` skill |
| GitHub standards | `github.md` in the `software-factory:standards` skill |

Before you write, change or review a doc, or code that a doc describes, load the
`software-factory:standards` skill and read it. If you can't load it, stop and say so in your
report. Don't write the docs from memory of the standards.

Before you write an issue or the summary in a PR's description, or update an issue, read `github.md`
in the `software-factory:standards` skill.

Before you add, change or delete a code comment, move code that has comments, or review a change
that does, read `code-comments.md` in the `software-factory:standards` skill.

Before you write or change a test, read `tests.md` in the `software-factory:standards` skill.

## When work is done

A change is done when `make check` passes.

## The check's config files

Claude Code asks the owner before each edit to the check's config files, such as
`eslint.config.mjs`, the tsconfigs and the `Makefile`, and to `.claude/settings.json` and the hook
scripts. If a change to one seems needed, say why and ask first. Never change one, or add a comment
that turns off a check, just to make the check pass (CS-3).

After each edit to a TypeScript file under `packages/`, a hook formats and lints it, so errors come
back right away.
