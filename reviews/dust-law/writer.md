# Dust Law: writer

Wrote the three docs and the commit message for f95d7ee. Its report went to the session, not into the commit.

## Prompt

Turn Dust Law's foundation docs into a functional spec, a technical spec and a blueprint, using the `writing-project-docs` skill.

**The project.** Dust Law is a game project at `/home/jjk3/PycharmProjects/personal/dust-law`. It's checked out on the branch `technical-spec-1`. Its only docs are the three foundation docs in `docs/foundation/`: `DESIGN.md`, `RULES.md` and `TILES.md`. There's no code yet.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. Don't read the skill's `evals/` folder.

**Use only the skill and the three foundation docs.** Don't read anything else in the software-factory repo. Don't look at other branches, git history or GitHub issues and PRs for dust-law. Earlier attempts at these docs exist there, and this run is a test of whether the skill alone is enough.

**What to do:**
1. Write the functional spec, the technical spec and a blueprint in the dust-law repo, following the skill. Write them in one pass, from all three foundation docs. Decide each fact's home with both specs and the blueprint open, rather than finishing one doc before starting the next. The blueprint holds facts whose home is code that doesn't exist yet, such as the tile catalog and its weights.
2. Once the docs are written, delete `docs/foundation/` (`DESIGN.md`, `RULES.md` and `TILES.md`). Every fact in them must either be in one of the three docs or be listed in your report with where it belongs.
3. Check your own work the way the skill says, including running the check script.
4. Don't commit or push. I'll do that.

**There's no PR for this run.** Wherever the skill says something goes in the PR description, put it in a commit message instead. Write that commit message to `/tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/04232baa-17da-4e77-89db-3933daecff5f/scratchpad/tech-run1/commit-message.txt`: a short subject line, a blank line, then the body. Keep your own working notes in that same `tech-run1` folder.

**Your final report** should cover:
- Questions for the owner: anything the sources leave open or unclear, and any choice you had to make that the sources didn't.
- Conflicts in the sources, and what you did about each.
- What you left out of the three docs, and where each group of facts belongs.
- Where the skill fell short or was unclear while you worked. Be specific and quote the skill where it helps.
- What the check script found on your final docs.

## Report

I wrote all three docs and deleted `docs/foundation/`. The check script's only findings on the final docs are 14 decisions with no Why. The sources give no reason for any of them, so each one is a question below. Nothing is committed: the three deletions are unstaged and the new docs are untracked.

Files:
- /home/jjk3/PycharmProjects/personal/dust-law/docs/functional-spec.md (81 requirements, Terms, 13 sections)
- /home/jjk3/PycharmProjects/personal/dust-law/docs/technical-spec.md (5 TRs, 6 ADs, 14 TDs)
- /home/jjk3/PycharmProjects/personal/dust-law/docs/blueprints/first-build.md (tile model, shape catalog and weights, catalog rules, how a tile is created, the check command, and a table of where each part goes once code exists)
- Commit message: /tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/04232baa-17da-4e77-89db-3933daecff5f/scratchpad/tech-run1/commit-message.txt
- Working notes and saved script output are in the same `tech-run1` folder.

## What should the owner answer?

**Things the sources leave open:**
- **How players are invited.** DESIGN says "a way for others to join, such as a link or a short code". FR-8 only says the host gets an invitation to share. I suggest a link.
- **What scoring feedback shows.** DESIGN says "Clear feedback when a feature is finished and scored". I wrote FR-79 as "what was scored and the points each player got from it". That content is my choice, so please confirm it.
- **The purpose paragraph.** It says the game is "a scenario for practicing issue-driven development", "only needs to be good enough for a small group to play and test", and "Clarity and correctness matter more than polish". I left it out. "Small group" is too vague to be a limit. I suggest a limit in F-SEC-2, such as "only small playtest groups, not the public", or putting it in a README or CLAUDE.md.
- **Missing reasons (the 14 flagged decisions).** Each has a suggested reason:
  - AD-1 TypeScript, AD-8 React, AD-9 Vite, TD-11 strict mode: no suggestion.
  - AD-2 three parts, AD-4 engine has no network/DOM/React, AD-5 engine is state + action in, new state out: maybe "so the engine can be tested and replayed on its own (TR-5)".
  - AD-3 all rules live in the engine, TD-1 client uses the engine for options: maybe "so the browser's highlights can't disagree with the server".
  - TD-5 Node: maybe "it runs the TypeScript engine directly".
  - TD-10 tiles drawn in code: maybe "no art to make".
  - TD-12 common libraries: maybe "agents know them, and they stay maintained".
  - TD-13 Vitest: maybe "it works with Vite".
  - TD-14 engine unit tests: no suggestion.

  (TD-8 and TD-9 are the React and Vite lines; the AD/TD labels above follow the spec's own numbering.)

**Choices I made that the sources didn't:**
- Tiles per player is a whole number (FR-7).
- A stuck hand is checked when the player's turn starts (FR-33).
- A discard skips the bounty step too (FR-35). RULES only says "your turn ends there".
- The hostile side always counts as a side when control is worked out (FR-54).
- TR-1 lists five sections as the rules the server enforces.
- "Borders" means the wasteland and bastion touch on the same tile. I took this from TILES' model.

**Issues to open:** player identity and rejoining, saving games, and hosting. These are the DESIGN open questions.

## What conflicts were in the sources?

No game rules conflicted. The conflicts were about names and about one model:
- **Crossroads vs junction.** RULES says crossroads and TILES says junction, and one shape is also named Crossroads. I used "junction" everywhere.
- **Words with two meanings.** "Hostile" was both the marker and the neutral side, so I added the term "hostile side". "Supply" became "tile supply" or "enforcer supply". "Neighbor" became "surrounding spaces". "Move" became "action". "Place" became "lay" for tiles and "deploy" for enforcers. I also added "control count", so hostiles aren't called enforcers.
- **The 15% hostile chance.** TILES says "Every tile has a 15% chance of a hostile" but also says the outpost never gets one. The blueprint keeps both rules, so the real rate is under 15%.
- **Where game state lives.** The engine "holds all game state", the server "holds the one true copy", and the server also keeps each game as seed plus moves. I kept the source wording in AD-3, AD-6 and TD-3. My reading is that the engine defines and computes the state, and the server stores the record.
- **When a bastion is finished.** RULES uses closed walls and TILES uses edges. They're the same rule, and I used the edge version (FR-42).

## What did I leave out, and where does it belong?

- **Open questions:** in issues (above).
- **The test lists and Definition of Done:** each entry is covered by a requirement, or is a whole-app goal. "Weights positive and add to 100" became catalog rule 5. The done command is in the blueprint, and later goes in a Commands section of the technical spec.
- **Text with no new rule:** the notes on which source doc wins, TILES' "this document is the source for that file", the flavor text, the worked examples, the Scoring at a Glance table, sentences that only restate other rules, and the sample join messages. None of these needs a home. The flavor text or messages could go in client code or a README if wanted.
- **Rejected transport options:** kept inside the Whys of the WebSocket and Socket.IO decisions.

## Where did the skill fall short?

- **Terms can only cite requirements.** The skill says a term cites something when "its meaning depends on a requirement's rule". In the technical spec, Engine and Server depend on decisions, so I cited AD-3 and AD-6. It doesn't say whether that's allowed.
- **Citing a broad technical half.** "Cite a section in place of the requirements only when the section holds every one the technical half protects." TR-1 protects most game rules. Those rules are spread across five sections that also hold rules TR-1 doesn't protect, such as the highlight in FR-32. Following the rule strictly means listing about 40 IDs.
- **Empty template sections.** The skill doesn't say whether to keep Commands and Outside services when they're empty or the command doesn't exist yet. I left them out. The blueprint's five retirement steps also have no step for moving a pointer, like the done command, into the technical spec.
- **Rules that define a word.** GEARS has no pattern for "a bastion is finished when…". I wrote "the app shall count it as finished". An example would help.
- **Expected flags look like failures.** The script reports an expected missing Why as a `RULE` line, not a `SIGNAL`. On a project with few written reasons, those lines take up most of the output.

## What did the check script find?

The final run against `main` printed 14 `RULE` lines, each "has no Why line right after it". They're for AD-1, AD-2, AD-3, AD-4, AD-5, TD-1, TD-5, TD-8, TD-9, TD-10, TD-11, TD-12, TD-13 and TD-14, and each one goes with a question above. There were no `SIGNAL` lines. An earlier run flagged "the new" in FR-39, and I reworded it. With `--uncited`, every requirement shows as uncited, which is expected while there's no code.
