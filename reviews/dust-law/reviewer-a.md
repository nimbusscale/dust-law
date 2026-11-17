# Dust Law: reviewer A

Reviewed f95d7ee. Ran at the same time as reviewer B, with the same prompt.

## Prompt

Review a change to Dust Law's docs, using the `writing-project-docs` skill. You are reviewing someone else's change, so edit nothing and report what you find.

**The project.** Dust Law is a game project at `/home/jjk3/PycharmProjects/personal/dust-law`. It's checked out on the branch `technical-spec-1`. Don't switch branches or change the working tree. Read `main`'s files with `git show main:<path>` and compare with `git diff main...technical-spec-1`.

**The change.** One commit, `f95d7ee`, on `technical-spec-1`. It turns the three foundation docs on `main` (`docs/foundation/DESIGN.md`, `RULES.md` and `TILES.md`) into three docs: a functional spec at `docs/functional-spec.md`, a technical spec at `docs/technical-spec.md` and a blueprint at `docs/blueprints/first-build.md`. It deletes the foundation docs. There's no PR for this change. The commit message stands in for the PR description: read it wherever the skill mentions the PR.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. Don't read the skill's `evals/` folder. Don't read anything else in the software-factory repo, and don't look at other dust-law branches or at GitHub issues and PRs. Earlier attempts at these docs exist there, and this review must stand on the change alone.

**Not a finding:** the foundation docs are deleted on purpose. A missing source doc isn't a finding. For the "Nothing was dropped" check, compare the three new docs against the foundation docs on `main`.

**Your report** should give:
- Your verdict in one or two sentences.
- Each problem you find, numbered, with the doc, the item ID or source line, what's wrong, and how to fix it. Put the most important first.
- Questions only the owner can answer, if any.
- The review checklist from the skill, with pass or fail for each check and what the check script found.
- Where the skill was unclear or fell short while you reviewed. Be specific and quote the skill where it helps.

## Report

## Verdict

The change is close, but it isn't ready to merge. Almost every rule from the foundation docs made it across cleanly. The one problem that changes how the game plays is FR-63: read on its own, it gives no road bonus when one tile finishes both a bastion and a road, and its scenario says the bonus is paid. The other problems are smaller: a few added or dropped rules, two term problems and some items that each hold two facts.

All three docs are new, so every problem below belongs to this change. There are no older problems.

## Problems in this change

1. **FR-63 can't be tested as written, and its scenario contradicts it** (functional-spec.md:338).
   - **What's wrong:** the trigger is "when a road ... is finished", and the While is "a bastion holds one or more garrisons". A road counts as finished when the tile is laid (FR-43). A garrison is only left later, in the scoring step (FR-46). So when one tile finishes both the bastion and the road, no garrison exists at the moment the road is finished. The text gives no bonus, but the scenario under it says you get one.
   - **Check failed:** "can be tested from its own text". The skill says a vague requirement is fixed by rewriting it, never by adding a scenario.
   - **Rewrite:** "When the app scores a road that ends at a bastion holding one or more garrisons, the app shall give the owner of each garrison there 2 bonus points, once per garrison however many of the road's ends are at that bastion, whichever side wins the road, and even when no player has a rider on it."
   - **Why it works:** FR-46 already puts garrison choices before scoring. With the trigger at scoring time, the same-turn bonus follows from the text. A road scored before the garrison was left is never scored again, so it never pays, as RULES says.

2. **TD-1 adds a rule the source didn't settle** (technical-spec.md:68).
   - **What's wrong:** DESIGN says the client "holds no rules logic of its own beyond what it needs to show options", and that the client "may use" the engine to show legal moves. TD-1 turns that into a must: options logic must come from the engine, and the client has none of its own.
   - **Check failed:** "Nothing was added that the source didn't settle".
   - **Rewrite:** "TD-1. The client holds no rules logic of its own, except what it needs to show a player their options, such as where a tile fits (FR-32). It may take that logic from the engine." Then ask the owner whether using the engine should be required (question 2).
   - **Why it works:** it says only what the source says, and the open part becomes a question instead of a guessed rule.

3. **The purpose paragraph was dropped.**
   - **What's wrong:** DESIGN's Purpose said the game "only needs to be good enough for a small group to play and test. Clarity and correctness matter more than polish." That is guidance a builder would act on, and none of the three docs has it. The commit says it's waiting on an owner question, but the skill says a cut the task doesn't call for is a problem, whatever reason the author gives.
   - **Check failed:** "Nothing was dropped".
   - **Fix:** keep it until the owner answers. One option is a code standard: "TD-15. Clear, correct code over polish." Raise question 3.

4. **TR-1 and TR-5 have the engine in them, which is a design choice, not a requirement** (technical-spec.md:55, 75).
   - **What's wrong:** TR-1 says the server applies an action "only if the engine finds it allowed", and TR-5's subject is "the engine". The skill says a technical requirement has "no implementation in it". A redesign without an engine would still have to check every action and replay games. TR-1 also repeats AD-6's "checks it with the engine", so the two items hold one fact.
   - **Checks failed:** "Each item follows the rules for its kind of doc" and "One item for each fact".
   - **Rewrite TR-1:** "When the server receives an action, the server shall apply it only if the rules in F-SEC-3, F-SEC-5, F-SEC-6, F-SEC-7 and F-SEC-10 allow it."
   - **Rewrite TR-5:** "When a game's seed and its actions are replayed in order, the replay shall rebuild exactly that game's state."
   - **Why it works:** AD-6 then says how TR-1 is met, and TR-1 says what must hold.

5. **FR-81 holds two facts, and its "no animation" part isn't settled** (functional-spec.md:425).
   - **What's wrong:** the source says "No art assets or animation beyond tiles drawn in code." That can be read as allowing animation of the code-drawn tiles. FR-81 makes it an outright ban on animation. Art and animation could also change for different reasons, so they are two facts. "Tile pictures" could also be read as banning drawn enforcers and hostile markers.
   - **Checks failed:** "Nothing was added that the source didn't settle" and "One item for each fact".
   - **Fix:** keep only the settled part: "The app shall show only pictures it draws itself, with no art files." Cut the animation part and ask the owner (question 4).

6. **The Wasteland term states a rule that no requirement holds** (functional-spec.md:100).
   - **What's wrong:** the term ends "Roads, outposts and bastions divide it into separate wastelands." That decides how many wastelands there are, which matters for ranger scoring (FR-74). Nothing in the functional spec says it. FR-25 only covers joining across edges.
   - **Check failed:** "No term states a rule". The skill says a part the app must do or check, with no requirement holding it, is a missing requirement.
   - **Fix:** add "FR-82. The app shall count wasteland on either side of a road, an outpost or a bastion as separate wastelands, unless they join elsewhere (FR-25)." Then cut the sentence from the term.

7. **The Engine and Server terms cite decisions, and Engine restates AD-3** (technical-spec.md:16, 22).
   - **What's wrong:** "(AD-3)" and "(AD-6)" are neither a requirement the meaning depends on nor a section of rules. Cover either citation and the term still reads clearly. "Holds the game rules and game state" is also AD-3's rule. If AD-3 changed, the term would have to change too.
   - **Checks failed:** "Each citation in Terms earns its place" and "No term states a rule".
   - **Rewrite:** "Engine. The part of the code that runs the game, shared by the server and the client (T-SEC-2)." and "Server. The program the players' browsers connect to."
   - **Why it works:** T-SEC-2 holds the engine's rules, so a section citation is allowed there.

8. **"Side" is a term, but the docs also use it for a tile's sides** (functional-spec.md:22, 59, 88; technical-spec.md:24; the blueprint's catalog, such as "east side").
   - **What's wrong:** Side means a player or the hostile side when the app works out control. "One of a tile's four sides" and "an outpost edge on every side" use the same word for something else. This is the same kind of clash as the skill's own example, "the player may turn a tile".
   - **Check failed:** "One name for each thing".
   - **Fix:** in the terms, use "Edge. One of a tile's four borders: north, east, south or west." and "with an outpost edge in every direction". In the blueprint's catalog, write "east half" and "west part", or name the positions.

9. **The shape names reuse the word "junction" and bring back "crossroads"** (first-build.md:107-108).
   - **What's wrong:** "Junction" is now the term for the point where three or four roads end. The `road-junction` shape is also named "Junction", and the `road-crossroads` shape keeps "Crossroads", the word the commit removed.
   - **Check failed:** "One name for each thing".
   - **Fix:** rename them, for example to "Three-way junction" and "Four-way junction", with ids `road-junction-3` and `road-junction-4`.

10. **FR-1 and FR-66 each hold two facts** (functional-spec.md:107, 369).
    - **FR-1:** "only people, not computer opponents" and "each from their own browser over a network" could change apart. For example, a same-screen mode would change the second and not the first. Split them into two requirements.
    - **FR-66:** the All Hands exception is about one bounty and doesn't belong in the general check. Move it back into the All Hands row of FR-65, as RULES had it: "When the player's own turn's scoring is done, all of the player's enforcers are on the board, garrisons included." Then cut "except that ..." from FR-66.

11. **FR-2's wording reads as if phone browsers are blocked, and it isn't something the app does** (functional-spec.md:110-113).
    - **What's wrong:** "shall be designed and tested only for desktop web browsers, ... not for phone browsers" describes how it's built, not app behavior. It also seems to contradict FR-3.
    - **Rewrite:** "FR-2. The app shall run only in a web browser, laid out for a desktop screen, not as a mobile app." and "FR-3. When a player opens a game in a phone browser, the app shall serve it as it would to a desktop browser." This second line matches "phone browsers aren't blocked".

12. **Small duplicates.**
    - **FR-31's table repeats FR-46** (functional-spec.md:221). The scoring step's "Takes garrison choices, then scores" repeats FR-46's order. Make that cell "Scores what the tile finished (F-SEC-8)."
    - **TD-4 makes two choices** (technical-spec.md:92). One is the catalog as a data file, and the other is the weights and hostile chance as data. Its Why covers only the second. Split it, and leave the catalog decision with no Why unless the owner gives one.

## Questions only the owner can answer

1. **The 14 decisions with no Why:** AD-1 to AD-5, TD-1, TD-5, TD-8 to TD-14. Two suggestions:
   - AD-4 and AD-5: "so the engine can be fully unit-tested on its own". DESIGN's goals pair "fully unit-tested" with "separate from the server and the UI".
   - TD-1: "so what the client shows always matches what the server allows".
2. **TD-1:** must the client take its options logic from the engine, or may it have its own?
3. **The purpose paragraph:** should "clarity and correctness matter more than polish" be a rule for builders, and where should it live?
4. **FR-81:** may the code-drawn tiles be animated? May enforcers and hostile markers be drawn in code too?
5. **Rejoining and saving:** these are among the open questions the commit says need issues. TD-7's Why ("the base for rejoining") and TD-3's Why ("saving a game would also need only that seed and list") both rest on them.

## Review checklist

- **Run the doc check script: pass.** It found 14 RULE lines, all "has no Why line right after it", for the 14 decisions above. I checked each one, and the sources give no reason for any of them, so each is a question for the owner (question 1), not an author error. It found no SIGNAL lines.
- **Each item follows the rules for its kind of doc: fail.** See problems 4, 10, 11 and 12 (TD-4).
- **Nothing was dropped: fail.** The purpose paragraph is missing (problem 3). Everything else is covered: I traced each DESIGN, RULES and TILES rule to an item. The test lists, examples, summary table and flavor text were rightly cut.
- **Nothing was added that the source didn't settle: fail.** See problems 2 and 5. FR-3's "let them play it" is a little stronger than "aren't blocked" (problem 11).
- **The rewrite stayed in scope: pass.**
- **No history got in: pass.**
- **One name for each thing: fail.** See problems 8 and 9.
- **No term states a rule: fail.** See problems 6 and 7.
- **Each citation in Terms earns its place: fail.** Engine's AD-3 and Server's AD-6 don't earn their place (problem 7). The section citations on Bounty, Control, Finished, Fit and Garrison are fine.
- **One item for each fact: fail.** See problems 4, 10 and 12.
- **Each requirement can be tested from its own text: fail.** See FR-63 (problem 1).
- **Each scenario earns its place: fail** for FR-63's scenario, which papers over the gap in its text. The scenarios on FR-39, FR-56 and FR-72 pass.
- **Each requirement's Why passes both tests: pass.** That covers FR-21, TR-3 and TR-5.
- **Every new item is in the right home: pass.** TD-11 is a judgment call; see skill gap 2.
- **Every other step in changing-a-doc.md holds: pass.** There is no code and no old IDs.

## Where the skill was unclear or fell short

1. **It contradicts itself on RULE lines for a missing Why.** reviewing.md says "A `RULE` line is a broken rule, so it's always a problem." specs.md says "When the source gives no reason for a decision, write the decision with no Why." reviewing.md also says "A decision with no Why is fine when none of them gives a reason." A reviewer can't tell whether 14 RULE lines are 14 problems or zero.
2. **Settings for code that doesn't exist yet.** TD-11, strict mode, will be a tsconfig setting. Question 6 plus "Is the code not written yet?" sends a setting to the blueprint. Question 9 says "If new code could follow or break it without touching that place, it goes in the technical spec", and a new package with its own tsconfig could break it. The skill doesn't say which wins. I let TD-11 stand.
3. **Sentences about the source docs themselves.** The "Nothing was dropped" check says "If you weren't told the task, every cut is one." The foundation docs had lines like "Where this document disagrees ... the other document wins" and "This document is the source for that file." Those mean nothing once the sources are merged and deleted. The skill gives no way to say such a line can go. The test lists are a similar case: specs.md says not to write them, but reviewing.md says only the task can justify a cut. I didn't count either as a problem.
4. **It doesn't say whether the naming checks apply inside a blueprint.** blueprint.md says "nothing is ruled out", but "One name for each thing" reads as covering every doc. I applied it to the shape names in problem 9 without being sure that's intended.
5. **It doesn't say what happens when there is no report.** When the author's only "report" is a commit message, the skill doesn't say whether missing owner questions count against the change. Here, the decisions with no Why aren't quoted anywhere, and no reasons are suggested. I listed them myself under the owner questions.
