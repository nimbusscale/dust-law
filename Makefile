# The project contract's two targets, in the factory plugin's project-contract.md.
#
# Claude Code asks the owner before each edit to this file, so an agent can't weaken a check to
# make it pass (CS-3).
.PHONY: setup check

# --ignore-scripts stops lefthook's install script from adding its git hooks to a factory run's
# copy of the repo. People add them with npx lefthook install.
setup:
	npm ci --ignore-scripts

# --config makes ESLint use this repo's config for every file. Otherwise an eslint.config.* in a
# package would replace it there, rules and all.
check:
	node_modules/.bin/prettier --check .
	node_modules/.bin/eslint --config eslint.config.mjs --max-warnings 0 .
