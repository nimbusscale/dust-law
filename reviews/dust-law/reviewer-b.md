# Dust Law: reviewer B

Reviewed f95d7ee. Ran at the same time as reviewer A, with the same prompt.

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

The change is not ready to merge yet, but it is close. The conversion is careful: almost every rule in the three foundation docs made it across, and the shape catalog was copied exactly. I checked the tables with a diff. One rule is wrong as written: FR-63 takes away the garrison bonus for a road finished by the same tile that finished the bastion. There are also about a dozen smaller fixes.

## Problems in this change

Most important first.

**1. FR-63 denies a bonus the source grants** (`docs/functional-spec.md:338`)
- **What's wrong:** the item reads "While a bastion holds one or more garrisons, when a road that ends at that bastion is finished…".
  - FR-43 counts a road as finished at the moment the tile is laid.
  - The garrison is only left later, in the scoring step (FR-46).
  - So when one tile finishes both the bastion and the road, the bastion holds no garrison when the road finishes, and no bonus is paid.
  - The scenario under FR-63 says the bonus is paid, and so does RULES.md:174.
  - So the scenario holds a rule that the requirement lacks. This fails "Each requirement can be tested from its own text" and "Each scenario earns its place".
- **Rewrite:** "**FR-63.** When the app scores a road that ends at a bastion holding one or more garrisons, the app shall give the owner of each garrison there 2 bonus points, once per garrison however many of the road's ends are at that bastion, whichever side wins the road, and even when no player has a rider on it."
- **Why it works:** with the trigger at scoring time, FR-46 puts the garrison choices first, so a road finished by the same tile pays. A road scored before the garrison existed is never scored again, so it never pays, which is what the source says. Keep the scenario, because a reader of FR-63 alone could still get the same-tile case wrong.

**2. FR-3 promises more than the source and clashes with FR-2** (`functional-spec.md:110`, `:113`)
- **What's wrong:**
  - The source says "Phone browsers aren't blocked, but the game isn't designed or tested for them."
  - FR-3 says the app "shall let them play it". Every requirement gets a test, so FR-3 demands testing full play on phones, which FR-2 rules out.
  - FR-2 also holds two facts: no mobile app, and desktop browsers only. Each could change without the other.
- **Rewrite:**
  - "The app shall run only in a web browser, not as a mobile app."
  - "The app shall be designed and tested only for desktop browsers, not for phone browsers."
  - "**FR-3.** When a player opens a game in a phone browser, the app shall serve them the same game it serves a desktop browser."
- **Why it works:** FR-3 then says only "not blocked", can be tested without testing full play on a phone, and no longer clashes with the desktop limit.

**3. TD-1 turns "may" into "must"** (`technical-spec.md:68`)
- **What's wrong:**
  - The source says the client "holds no rules logic of its own beyond what it needs to show options" and "may use [the engine] to show legal moves".
  - TD-1 says the client gets that logic from the engine "and has none of its own". The source doesn't settle that.
  - This fails "Nothing was added that the source didn't settle".
- **Rewrite:** "**TD-1.** The client holds no rules logic beyond what it needs to show a player their options, such as where a tile fits (FR-32)." Then ask the owner whether it must use the engine for that (question 3 below).

**4. TR-1 checks fewer actions than the source does** (`technical-spec.md:55`)
- **What's wrong:**
  - The source says "Every action is checked by the engine on the server."
  - TR-1 only checks rules in F-SEC-3, F-SEC-5, F-SEC-6, F-SEC-7 and F-SEC-10.
  - It misses rules elsewhere that limit actions. Examples: FR-4 in F-SEC-2 says one game can't change another, and FR-46 in F-SEC-8 says garrison choices come before scoring.
  - Any rule added to another section later is also unprotected.
  - It also names "the engine", which is a design choice (AD-2), inside a requirement.
- **Rewrite:** "**TR-1.** When the server receives an action, the server shall apply it only if every rule in the functional spec allows it." AD-6 already says the engine does the checking.
- **Why it works:** it matches "every action", and it doesn't go stale when a section changes.

**5. The Purpose paragraph was dropped with no question asked** (DESIGN.md:11–13)
- **What's wrong:**
  - "It only needs to be good enough for a small group to play and test. Clarity and correctness matter more than polish." is gone.
  - The commit says it is "waiting on a question for the owner", but no question is written anywhere.
  - The skill counts any cut the task doesn't call for as a problem, whatever reason the author gives.
- **Fix:** put the question to the owner (question 1 below). It may become a limit in F-SEC-2, such as "only a small group of invited players", or a code standard.

**6. "Side" has two meanings** (`functional-spec.md:22`, `:59`, `:77`, `:88`; `technical-spec.md:24`)
- **What's wrong:**
  - The term Side means a player or the hostile side when control is worked out.
  - But Edge ("one of a tile's four sides"), Outpost ("on every side"), Tile ("an edge on each side") and Shape ("the edge on each side") use "side" for a tile's side.
  - This is the skill's own "turn a tile" example of a word a reader could take for the term.
- **Rewrite:**
  - Edge: "One of a tile's four boundaries: north, east, south or west."
  - Tile: "with four edges".
  - Outpost: "with an outpost edge on all four edges".
  - Shape: "the edge in each direction".

**7. FR-7 and FR-13 don't say "only the host"** (`functional-spec.md:127`, `:142`)
- **What's wrong:**
  - The source says "The host picks the game length" and "The host starts the game".
  - Both items say the app "shall let its host…". A test can't check that another player is refused.
- **Rewrite:** "…the app shall let only its host set…" and "…the app shall let only its host start it."

**8. FR-1 is two facts** (`functional-spec.md:107`)
- **What's wrong:** "only people, not computer opponents" and "each from their own browser over a network" could each change on their own. For example, allowing two players to share one screen changes only the second.
- **Fix:** split it into two items.

**9. The Engine and Server terms cite decisions** (`technical-spec.md:16`, `:22`)
- **What's wrong:**
  - "(AD-3)" and "(AD-6)" are neither of the two kinds of citation the skill allows on a term. Cover them and each word is still clear.
  - "Holds the game rules and game state" also repeats AD-3.
- **Fix:** drop both citations. Define Engine without restating AD-3, for example "The part of the code that holds the game logic, apart from the server and the client."

**10. The Wasteland term states a rule** (`functional-spec.md:100`)
- **What's wrong:** "Roads, outposts and bastions divide it into separate wastelands" is something the app must do. No requirement holds it.
- **Fix:** trim the term to "Open ground between the other features." Add a requirement in F-SEC-4, for example "The app shall treat wasteland on opposite sides of a road, an outpost or a bastion's wall as separate wastelands."

**11. Small copies of one fact**
- The Scoring step row in FR-31 (`:221`) says "Takes garrison choices, then scores", which repeats FR-46's order. Make the row "Takes garrison choices and scores features (F-SEC-8, F-SEC-10)".
- TD-10's "with no image files" (`technical-spec.md:124`) repeats FR-81. Make it "The client draws tiles in code, as SVG or CSS (FR-81)".
- TD-11 (`:130`) repeats AD-1's "TypeScript … in all the code". Make it "Strict mode for all TypeScript (AD-1)".

**12. A small rule was dropped** (RULES.md:224)
- **What's wrong:** at the end of the game, enforcers on unfinished features "simply go home". FR-41 only returns enforcers from features that are scored, and FR-73 says nothing about them.
- **Fix:** add "When the game ends, the app shall return each enforcer on an unfinished bastion, road or outpost to its owner's enforcer supply." Or ask the owner whether it matters.

**13. Name clashes in the blueprint**
- Line 57 says "eight border positions", but Border is a term (a wasteland touching a bastion). Write "eight edge positions".
- The shapes are named "Junction" and "Crossroads" (lines 107–108). But Junction is the term for the point where roads meet, and the commit dropped "crossroads". Suggest "Three-way junction" and "Four-way junction".

## Older problems

These came from the foundation docs, not from this change.
- **TR-5 and TD-3** rebuild a game from "its seed and its actions". But the game also depends on its setup: tiles per player and which players joined. The Action term ("such as laying a tile…") doesn't say whether setup choices count. The source said "seed plus list of moves", which has the same gap.
- **TD-7's and TD-3's Whys** rest on rejoining and on saving games. Both are still open questions in the source.

## Questions for the owner

1. **Purpose (DESIGN.md:13).** Should "good enough for a small group to play and test" become a limit? Should "clarity and correctness matter more than polish" become a code standard? My suggestion is yes to both.
2. **Reasons for the 14 decisions with no Why:** AD-1 through AD-5, TD-1, TD-5, TD-8 through TD-14. The commit only gives the count, but the skill asks for each decision to be quoted. One hint in the source: "The engine is shared code. The server uses it… The client may use it" (DESIGN.md:46). That may be the reason for AD-4 (no network code, DOM or React in the engine) and part of AD-1.
3. **TD-1.** May the client have its own logic for showing options, or must it get that logic from the engine?
4. **Phones.** Is "phone browsers aren't blocked" only a promise not to block them, or a promise that the game works on a phone?

The open questions on player identity and rejoining, saving games, and hosting still need issues, as the commit says.

## Review checklist

- [x] **Run the check script:** pass. It printed 14 RULE lines, one "has no Why line" for each decision in question 2. That's allowed when the source gives no reason, and it matches the commit. It printed no SIGNAL lines.
- [ ] **Each item follows the rules for its kind of doc:** fail (problems 1, 2, 4, 8).
- [ ] **Nothing was dropped:** fail (problems 5, 12).
- [ ] **Nothing was added that the source didn't settle:** fail (problems 2, 3).
- [x] **The rewrite stayed in scope:** pass. Only the six expected files changed.
- [x] **No history got in:** pass.
- [ ] **One name for each thing:** fail (problems 6, 13).
- [ ] **No term states a rule:** fail (problem 10, and the Engine term in problem 9).
- [ ] **Each citation in Terms earns its place:** fail (problem 9). The section citations on Bounty, Control, Finished, Fit and Garrison are fine.
- [ ] **One item for each fact:** fail (problems 2, 8, 11).
- [ ] **Each requirement can be tested from its own text:** fail (problems 1, 2, 7).
- [ ] **Each scenario earns its place:** fail for FR-63's scenario (problem 1). The scenarios under FR-39, FR-56 and FR-72 pass.
- [x] **Each requirement's Why passes both tests:** pass (FR-21, TR-3, TR-5).
- [x] **Every new item is in the right home:** pass. The tile model, the catalog and the check command belong in a blueprint, because their code doesn't exist yet.
- [x] **Every other step in changing-a-doc.md holds:** pass. The repo has no code and no CLAUDE.md, and no older IDs were replaced.

## Where the skill fell short

- **No way to cite the whole spec.** specs.md says "Cite a section in place of the requirements only when the section holds every one the technical half protects." For TR-1, which protects every rule that limits an action, no section fits. Listing about 30 IDs, or five sections, both go stale. The skill should say how to point at the whole functional spec.
- **The Terms rules only talk about requirements.** "If a requirement changed, would this part have to change too?" doesn't cover a technical-spec term that repeats a decision, such as Engine and AD-3. Separately, "A new name gets one home: a term … or the item that introduces it" doesn't say which home wins when AD-2 introduces "engine" and Terms defines it as well.
- **Nothing on While and When timing.** GEARS doesn't warn that the While must already be true at the moment the When fires. That is exactly how FR-63 broke. One example would catch it.
- **Old against new doesn't fit a conversion.** "Look at the same place on the branch the change will merge into" assumes the same doc exists on both branches. Here the source docs are deleted. The skill doesn't say whether a problem copied from a source doc counts as older or new. The "Nothing was dropped" rule ("If you weren't told the task, every cut is one") also doesn't say whether text about the source docs themselves counts as a cut. An example is DESIGN's "where this document disagrees… the other document wins".
- **Two smaller gaps.**
  - The skill doesn't say whether names inside copied data must follow "One name for each thing". The shape names in the catalog table are an example.
  - It doesn't say what to do with a limit that is itself about testing ("not designed or tested for phones") when specs.md also says "Every requirement has at least one test".
