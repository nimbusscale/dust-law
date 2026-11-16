# Dust Law: reviewer B

Reviewed d98a98d. Ran at the same time as reviewer A, with the same prompt.

## Prompt

Review a change to Dust Law's docs, using the `writing-project-docs` skill. You are reviewing someone else's change, so edit nothing and report what you find.

**The project.** Dust Law is a game project at `/home/jjk3/PycharmProjects/personal/dust-law`. It's checked out on the branch `functional-spec-3`. Don't switch branches or change the working tree. Read `main`'s files with `git show main:<path>` and compare with `git diff main...functional-spec-3`.

**The change.** One commit, `d98a98d`, on `functional-spec-3`. It turns the three foundation docs on `main` (`docs/foundation/DESIGN.md`, `RULES.md` and `TILES.md`) into a functional spec at `docs/functional-spec.md`, and deletes the foundation docs. There's no PR for this change. The commit message stands in for the PR description: read it wherever the skill mentions the PR.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. Don't read the skill's `evals/` folder. Don't read anything else in the software-factory repo, and don't look at other dust-law branches or at GitHub issues and PRs. Earlier attempts at this spec exist there, and this review must stand on the change alone.

**Two things that are not findings:**
- Facts that belong in a blueprint, such as the tile catalog's shapes and weights, are left out of the spec on purpose. For now we're only testing the functional spec. Leaving them out isn't a finding. A blueprint fact that wrongly got into the spec still is.
- The foundation docs are deleted on purpose. A missing source doc isn't a finding. For the "Nothing was dropped" check, compare the spec against the foundation docs on `main`.

**Your report** should give:
- Your verdict in one or two sentences.
- Each problem you find, numbered, with the item ID or source line, what's wrong, and how to fix it. Put the most important first.
- Questions only the owner can answer, if any.
- The review checklist from the skill, with pass or fail for each check and what the check script found.
- Where the skill was unclear or fell short while you reviewed. Be specific and quote the skill where it helps.

## Report

## Verdict

The spec is close, but it needs one more pass before merge. One rule is wrong: FR-47 can stop a finished bastion from ever counting as finished. Several rules also sit in loose paragraphs under items instead of in the requirements themselves.

The spec is a new doc, so every problem below was caused by this change. There are no older problems.

## Problems in this change

**1. FR-47 (line 299): a bastion can fail to finish because of a different bastion on the same tile.**
- What's wrong: it says "no bastion edge of any tile in a bastion faces an empty space". The Piece term (line 73) says one tile can hold two separate bastion pieces. Take bastion A, closed on every side, sharing a tile with bastion B, which still has an open edge. B's open edge is "a bastion edge of a tile in" A, so A never finishes. This fails the check that each requirement can be tested from its own text.
- Rewrite: "When every edge that a piece of the bastion reaches faces a tile, the app shall count the bastion as finished."
- Why it fixes it: it only looks at the edges of this bastion's own pieces.

**2. FR-44, FR-69, FR-71 and FR-80: rules sit in unlabeled paragraphs under the requirement, outside its "shall".**
- What's wrong: these paragraphs aren't a Why, a Scenario or an Accepted gap, and the check script only checks the bold requirement line. The worst case is FR-80 (line 496). Its trailing paragraph holds four rules:
  - a bastion counts even if the hostile side won it;
  - a bastion counts even if it holds a garrison;
  - one bastion can count for several wastelands;
  - control works as in F-SEC-9 and FR-71.

  The other three:
  - FR-44 (line 288): "A hostile on the feature doesn't count."
  - FR-69 (line 405): "paid even if the hostile side wins the road or no player has a rider."
  - FR-71 (line 414): "stays on the feature."

  This fails the rule of one behavior per requirement.
- Rewrite: move each rule into its requirement's text, or make it its own FR. For example, FR-80b: "When the game ends, the app shall work out control of each wasteland that holds a ranger as in F-SEC-9, with FR-71 applying." For FR-44: "...only onto a feature with no enforcer on it from any player, whether or not it holds a hostile..."
- Why it fixes it: each rule gets an ID that tests and code can cite. The script's shape check then covers it too.
- The "So..." and "For example" lines under FR-14, FR-55 and FR-59 are worked examples, not new rules. They can stay.

**3. FR-86 (line 516): "fits in its current rotation" contradicts the Fit term.**
- What's wrong: Fit (line 48) means "in at least one rotation". FR-86 uses the same word for a single rotation. This fails "one meaning for each term".
- Rewrite: "While a player has picked a tile in their hand, the app shall highlight every space where laying the tile in its current rotation follows FR-36, FR-37 and FR-38."
- Why it fixes it: "fits" keeps the one meaning Terms gives it.

**4. FR-89 (line 525): it drops feedback when a feature scores nothing.**
- What's wrong: DESIGN said to give "clear feedback when a feature is finished and scored". FR-89 only fires "When the app gives a player points". So a bastion the hostile side takes, or a road with no riders, gets no feedback. This fails "Nothing was dropped", and the commit doesn't say the cut was on purpose.
- Rewrite: add "When a feature is scored, the app shall show every player which feature was scored and who, if anyone, got its points." Keep FR-89 for road bonuses and bounties.
- Why it fixes it: it puts back the case where nobody gets points.

**5. FR-27 (line 222): you can't test it as written, and it drops outposts.**
- What's wrong: "every wall splits the wasteland beside it into separate pieces" doesn't hold for a tile whose wall has wasteland on only one side. RULES said "Outposts and roads split wastelands apart, and so do bastion walls". FR-27 leaves out outposts.
- Rewrite: "The app shall treat wasteland on opposite sides of a road, a bastion or an outpost as separate pieces, not one."
- Why it fixes it: it states the rule a player sees, which a test can check, and it puts outposts back.

**6. FR-91 (line 531): it promises more than the source did, and it clashes with FR-6.**
- What's wrong: DESIGN said phone browsers "aren't blocked, but the game isn't designed or tested for them". FR-91 says play works "as in a desktop browser". That reads as a promise that phones work just as well, while FR-6 says screens aren't laid out for phones.
- Rewrite: "Where a person uses a phone browser, the app shall let them join and play a game, with the desktop layout."
- Why it fixes it: it says the app doesn't block phones, and promises nothing more.

**7. FR-11 (line 176): "turns a person away" uses "turn", which Terms defines as a player's go.**
- What's wrong: this fails "one meaning for each term".
- Rewrite: "When the app refuses to let a person join a game, the app shall tell them why..."
- Why it fixes it: "turn" keeps its one meaning.

**8. The Road bonus term (line 127) repeats a rule from FR-69.**
- What's wrong: "Points a garrison's owner scores when a road that ends at the garrisoned bastion is scored" says when the bonus is paid. That is FR-69's rule. The skill says a term never states a rule a requirement holds.
- Rewrite: "Road bonus. Points a garrison earns its owner from roads (FR-69)."
- Why it fixes it: the rule lives only in FR-69, so changing FR-69 can't leave the term out of date.

**9. FR-74 (line 451): the bounty step is named but never used.**
- What's wrong: FR-30 names a "bounty step", but no requirement says what happens in it. FR-74 fires on "When a turn's scoring step is done" instead. Every other step has a requirement that starts "When a player's ... step comes".
- Rewrite: "When a player's bounty step comes, the app shall check every player against each bounty in play."
- Why it fixes it: the step's name now has a home that says what it does.

**10. FR-60 (line 361): "the side with the most" is unclear when sides tie.**
- What's wrong: FR-61 covers ties, but FR-60 doesn't exclude them.
- Rewrite: "While one side has more enforcers on a feature than every other side, when the feature is scored, the app shall give its points to that side."
- Why it fixes it: FR-60 and FR-61 can no longer both apply to the same feature.

**11. Two scenarios don't meet the skill's bar for a scenario.**
- FR-77 (line 471), the Frontier pooling scenario: its result comes from FR-77 alone, and FR-77 already says it plainly. Cut it, or say in the commit that it's kept as the source's example.
- FR-58 (line 348): the Given doesn't say the road has no enforcer. Without that, FR-44 blocks the deploy. Add "and no enforcer on it" to the Given.

**12. Some rules that limit what players can do are placed or worded against the spec's rules.**
- FR-12, FR-25, FR-26 and FR-72 are absolute "only" rules with no trigger, but they sit outside the Limits section.
- FR-46 says what's refused ("no way to take their own enforcers back") instead of what's allowed. Suggested rewrite: "The app shall return an enforcer to its owner's enforcer supply only when its feature is scored or the game ends."
- FR-40 says "let them discard" but doesn't say discarding is allowed only while a hand is stuck. Rewrite: "The app shall let a player discard a tile only while their hand is stuck, in place of laying one."

**13. One source example was dropped without a mention in the commit.**
- RULES had "So can a road that ends at one bastion holding two garrisons", meaning two hostiles get cancelled. The FR-71 scenarios cover the other two cases but not this one.
- FR-71's text does cover it. So either add the scenario, or list the cut in the commit message.

## Questions only the owner can answer

1. **Non-goals:** are "no computer opponents", "no matchmaking", "desktop only" and "no artwork" permanent limits, or just not built yet? FR-2, FR-3, FR-6 and FR-7 treat them as permanent. If they're "not yet", the skill sends them to issues instead.
2. **Shared browsers (FR-5):** should the app actively stop two players from sharing one browser, or only support each player having their own? How players are identified is still undecided, so this may not be testable yet.
3. **Phones (FR-91):** is "not blocked" all you want for phone browsers?

## Review checklist

- **Run the check script and decide each SIGNAL line: pass.** No RULE lines. There were 88 SIGNAL lines, all of the form "FR-n isn't cited anywhere". Every FR except FR-22, FR-68 and FR-71 got one. None is a problem: the repo has no code or tests yet, so nothing can cite them. No history, copy or size signals came up.
- **Each item follows the rules for its kind of doc: fail.** Problems 1, 2, 8, 10 and 12.
- **Nothing was dropped: fail.** Problems 4, 5 and 13. Everything else in DESIGN, RULES and TILES is either in the spec or listed in the commit as cut or moved. I checked them line by line.
- **The rewrite stayed in scope: pass.** It's a new doc plus the deletions, as intended.
- **No history got in: pass.**
- **One name for each thing: fail.** Problems 3, 7 and 9. "Tile supply" and "enforcer supply" are always written in full. "Crossroads" and "garrison bonus" are gone.
- **Each citation in Terms earns its place: pass.** Fit, Feature, Finished and Turn depend on the rules they cite. Each cited section holds the rules for its term. Road bonus has a different problem (8).
- **One item for each fact: pass.** I tested the pairs FR-23/24, FR-28/48, FR-60/61, FR-75/76 and FR-6/91. Each is two facts.
- **Each requirement can be tested from its own text: fail.** Problems 1, 5, 6, 10 and 12 (FR-40).
- **Each scenario earns its place: fail.** Problem 11.
- **Each Why passes both tests: pass.** That covers FR-21, FR-39 and FR-55. FR-55's "even a sliver" half reads more like a rule than a reason, but the reason still passes.
- **Every new item is in the right home: pass.** No blueprint fact got in, as far as I can tell. FR-26 is a tile rule a player can see, so it belongs. FR-21's Why holds part of the "why a tile always fits" argument, which the commit says went to the blueprint, but it works as a Why.
- **Every other step in changing-a-doc.md holds: pass.** There's no CLAUDE.md, so the default path is right. The commit says the doc was created. There's no code to keep in step. I didn't check open issues, as instructed.

## Where the skill was unclear or fell short

1. **There's no line for an example or a clarifying note under an item.** "Lines under an item" lists only Why, Scenario and Accepted gap. The source had many examples, like "An outpost with no bastions around it scores 9", so the writer used unlabeled paragraphs, and some of those picked up rules (problem 2). The check script only checks the bold requirement line, so it can't catch this.
2. **Two checks pull against each other on examples.** "Nothing was dropped" asks that "Every rule, condition, reason and example is still there". But "Each scenario earns its place" cuts a one-requirement example like the Frontier pooling one. The skill doesn't say which wins, or that a cut example needs a line in the PR.
3. **What counts as a limit is unclear.** functional-spec.md says "Each limit is a requirement... in the Limits section. A limit always holds." Many ordinary rules also always hold and use "only", like FR-12 and FR-36, and nothing says whether they belong in Limits. The line "Something the app doesn't do yet, but might later, isn't a limit" also doesn't say what to do when a source's "Non-Goals" doesn't say whether it's permanent. That's why I asked question 1.
4. **The rule about other word forms catches harmless uses.** "grep for each term's word and its other forms, such as 'turned' and 'turning' for 'turn'. Every use has the term's meaning" flags "rounded down" against the term Round, which no one would misread. I left it out. The skill doesn't say when a fixed phrase is fine.
5. **The uncited-ID signal floods a new spec.** "Decide each SIGNAL line" meant 88 identical lines for a project with no code. A line saying a spec with no code yet can decide these as one group would help.
