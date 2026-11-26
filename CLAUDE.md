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

## When work is done

A change is done when all of these hold:

- `tsc` passes in strict mode.
- All tests pass.
- The client and the server both build.
