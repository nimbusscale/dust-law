# Dust Law

A networked, browser-based tile-laying game for 2 to 5 players. It exists to practice building
software with coding agents. Clarity and correctness matter more than polish.

## Docs

| Doc | Path | Read it when |
|---|---|---|
| Functional spec | `docs/functional-spec.md` | You change what a player sees or can do, or write tests of the rules |
| Technical spec | `docs/technical-spec.md` | You write or review any code |
| Blueprints | `docs/blueprints/` | You build the part a blueprint describes |
| Research docs | `docs/research/` | You're told to |

Every fact has one home. Other places point to it by ID, such as `FR-12` or `T-SEC-3`, and never
restate it.

When a doc and the code disagree, the doc says what's intended. Fix the code, or ask the owner to
change the doc. Never change a doc to match the code on your own.

## Where each kind of fact goes

| If the fact is ... | Its home |
|---|---|
| Something a player would notice if it changed | The functional spec |
| Something the system must achieve that a player wouldn't see | The technical spec, as a technical requirement |
| A choice that shapes the whole system, where a change would touch most of it | The technical spec, as an architecture decision |
| A choice that new code could follow or break without passing through one shared place in the code | The technical spec, as a design decision |
| A choice that every case of goes through one place in the code, or a reason for one piece of code | A comment in that place |
| A rule a type, a lint rule or a setting enforces, where breaking it is a quick fix | That check, with a comment giving the reason if it isn't obvious |
| How to do one task | A skill |
| What was tried and measured | A new research doc |
| When or by whom something was decided, status, open items | The commit, the PR, or an issue |
| A deferred decision | An issue |
| A rejected idea | Nowhere. Name it in a code comment only if an agent would likely change the code back to it. |

## History

No doc is a ledger. While working, keep notes in a scratchpad file, and write the commit message
from them.

## Corrections

When the owner corrects something that is a project rule, offer a change to the right doc or
skill. The owner decides. Never apply it on your own, and never save it as a memory.
