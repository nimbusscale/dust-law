# Dust Law

A tile-laying game for 2 to 5 players, played online in the browser.

The old world is gone. What's left is dust, broken roads and a few walled bastions where law still
means something. Each player commands a squad of enforcers. Players build the wastes one tile at a
time and send enforcers to claim what they build. Finished territory pays. Unfinished territory
pays nothing.

## Why this project exists

Dust Law is a practice project for issue-driven development with coding agents. It only needs to
be good enough for a small group to play and test. Clarity and correctness matter more than
polish.

## Setup

Run `make setup` to install the packages, then `npx lefthook install` once to add the pre-commit
hook, which runs `make check`.

## Docs

- [Functional spec](docs/functional-spec.md): what the game does, including every rule.
- [Technical spec](docs/technical-spec.md): how it's built.
- [Blueprints](docs/blueprints/): plans to build from, retired once the code exists.
