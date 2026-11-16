# Dust Law: writer

Wrote the spec and the commit message for d98a98d. Its report went to the session, not into the commit.

## Prompt

Turn Dust Law's foundation docs into a functional spec, using the `writing-project-docs` skill.

**The project.** Dust Law is a game project at `/home/jjk3/PycharmProjects/personal/dust-law`. It's checked out on the branch `functional-spec-3`. Its only docs are the three foundation docs in `docs/foundation/`: `DESIGN.md`, `RULES.md` and `TILES.md`. There's no code yet.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. Don't read the skill's `evals/` folder.

**Use only the skill and the three foundation docs.** Don't read anything else in the software-factory repo. Don't look at other branches, git history or GitHub issues and PRs for dust-law. Earlier attempts at this spec exist there, and this run is a test of whether the skill alone is enough.

**What to do:**
1. Write the functional spec at `docs/functional-spec.md` in the dust-law repo, following the skill.
2. Ignore facts that belong in a blueprint, such as the tile catalog's shapes and weights. Don't write them anywhere. List them in your report instead. For now we're only testing the functional spec.
3. Once the spec is written, delete `docs/foundation/` (`DESIGN.md`, `RULES.md` and `TILES.md`). Every fact in them must either be in the spec or be listed in your report with where it belongs.
4. Check your own work the way the skill says, including running the check script.
5. Don't commit or push. I'll do that.

**There's no PR for this run.** Wherever the skill says something goes in the PR description, put it in a commit message instead. Write that commit message to `/tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/d8317862-5ccd-4d6b-964e-de8c6f738c9b/scratchpad/run3/commit-message.txt`: a short subject line, a blank line, then the body. Keep your own working notes in that same `run3` folder.

**Your final report** should cover:
- Questions for the owner: anything the sources leave open or unclear, and any choice you had to make that the sources didn't.
- Conflicts in the sources, and what you did about each.
- What you left out of the spec, and where each group of facts belongs.
- Where the skill fell short or was unclear while you worked. Be specific and quote the skill where it helps.
- What the check script found on your final spec.

## Report

The functional spec is written at `/home/jjk3/PycharmProjects/personal/dust-law/docs/functional-spec.md`. It has 91 requirements in 13 sections, plus a Terms section and a Limits section. I deleted `docs/foundation/`, and nothing is staged or committed. The check script found no broken rules. Every fact from the three source docs is either in the spec or listed below. The commit message is at `/tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/d8317862-5ccd-4d6b-964e-de8c6f738c9b/scratchpad/run3/commit-message.txt`, and my notes are in `notes.md` in the same folder.

## Questions for the owner

1. **Who may act during a turn.** The sources never say that only the player whose turn it is may lay, discard or deploy. I inferred it from "players take turns in order" and wrote it as FR-32. Is that right?
2. **"Each player plays from their own browser."** I read this as "two people can't share one browser," and wrote it as a limit (FR-5). Was it meant as a rule, or just a description of the setup?
3. **Non-goals as limits.** I wrote "no computer opponents", "no matchmaking", "desktop browsers only" and "no art or animation" as permanent limits (FR-2, FR-3, FR-6, FR-7). The skill says something the app might do later is an issue, not a limit. Are any of these only "not yet"?
4. **The invite.** The sources say "a link or a short code" without choosing. I left the invite's form open and listed it as an issue below.
5. **Two choices that change what players read:**
   - The 2 points a garrison earns are called "road bonus" everywhere, and the end-screen category is "road bonuses". The sources also call it "garrison bonus", including in the end-screen list.
   - The outpost's scoring rule has a Why ("an outpost pays for being remote"). It's borderline under the skill's second test for a Why, which asks whether the reason changes how someone applies the rule.

## Conflicts in the sources

None of the rules contradicted each other. There were three naming clashes:
- **"Crossroads" vs "junction".** RULES says a road stops at a "crossroads", but TILES calls that point a "junction" and uses "Crossroads" for a four-way tile. I used "junction" throughout.
- **"Road bonus" vs "garrison bonus".** Same thing, two names in the sources. I used "road bonus".
- **Two meanings of "supply".** "Tile supply" and "enforcer supply" both appear, so I always write the full name.

I also used "deal" for getting a new tile, because "draw" also means drawing the picture of a tile. "Draw" only appears in "draw step".

Two rules were worded differently but meant the same thing, so I kept one version of each:
- **When a bastion is finished.** I used TILES' version: no bastion edge faces an empty space. RULES says to follow each wall all the way around.
- **Which roads pay a garrison's bonus.** I wrote it as "a road scored while the garrison is there." That covers both "only roads finished after it was left" and "roads finished by the same tile".

## What I left out, and where it belongs

- **Blueprint for the tile generator:**
  - the catalog's shapes, weights and group totals
  - the 15% hostile chance, and how the hostile's kind and its spot on the tile are picked
  - the segment and edge data model, segment ids, the eight-position wasteland model and the bastion-border lists
  - the reference orientation, and catalog rules 1, 3 and 4
  - "a hostile never changes the fit", and the start tile skipping the generator
  - the argument for why a tile always fits (part of it is in FR-21's Why)
  - keeping weights and the catalog in a data file
  - all the engine, server and generator test lists
- **Technical spec:**
  - the stack (strict TypeScript, React, Vite, Vitest, Node, tiles drawn in SVG or CSS)
  - the engine, server and client split
  - the server checks every action, makes every tile and keeps the seed. The Why: anyone with the seed could predict every draw.
  - the server filters each player's view of the game state
  - one seeded random number generator per game, and exact replay from the seed plus the moves
  - each game stored as its seed plus its moves
  - Socket.IO, and its Why
  - the "done" command: tsc passes, tests pass, both build
- **Issues:**
  - player identity and rejoining
  - saving games so they survive a restart
  - hosting
  - the invite's form
  - the playtest check: two or more people play a game to the end
- **CLAUDE.md or nowhere:** the project's purpose (practice for issue-driven development, clarity over polish) and the setting text from RULES.
- **Nowhere:** the transport options that were passed on. They're named in the commit message.

I cut these on purpose, as the commit message says:
- "That is rare" about stuck hands
- the Scoring at a Glance table, which repeated the rules
- the order of the five game-start steps, which a player can't see
- the UI bullets that repeat a rule already in the spec

## Where the skill fell short

- **Building a whole spec from scratch.** The skill only covers changing one item. `changing-a-doc.md` gives steps for "an item or a section". Its step 2, "Check whether it's already written down", assumes a doc already exists. There is no guidance for turning about 7,000 words into a new spec: how to choose sections, or how to number IDs. I renumbered in reading order at the end. "A new ID is one more than the highest" only fits adding one item at a time.
- **Many uncited requirements in a new doc.** The script flagged 88 of the 91 requirements as "isn't cited anywhere". That is guaranteed in a new doc with no code yet. Meanwhile `reviewing.md` says to "decide each SIGNAL line" and to "say it found nothing from your change". Those two don't fit when every requirement is new and so every signal comes from the change.
- **Whether non-goals are limits.** `functional-spec.md` says "Something the app doesn't do yet, but might later, isn't a limit." That doesn't help when the source just says "Non-Goals" and gives no hint of the future.
- **Rule or definition.** "A term never states a rule" was hard to apply to lines like "An outpost tile shows outpost on all four edges." The skill gives no test for telling a definition from a rule.
- **Which word to choose when sources disagree.** "One name for each thing" tells me to search the docs for the existing name. When the sources use two names, it doesn't say which to pick.
- **Notes under a requirement.** The skill allows only Why, Scenario and Accepted gap. Some requirements needed a plain example or a clarifying line, such as "A hostile on the feature doesn't count" or "For example, … 40 for 2 players". The skill doesn't say whether such a paragraph is allowed. I used them.
- **A table inside a requirement.** Nothing says whether a requirement may hold a table, so I wasn't sure about FR-37 (edge matching) and FR-72 (bounties).

## What the check script found on the final spec

- **Broken rules:** none.
- **History signals:** none. An earlier draft had "the new tile", flagged as a history marker word, and I reworded it.
- **Uncited requirements:** 88 signals. They are not real problems, because nothing exists yet to cite the requirements.
- **Copies and size:** none. The copy signals between the spec and the foundation docs went away once I deleted them. The spec is about 5,800 tokens.
