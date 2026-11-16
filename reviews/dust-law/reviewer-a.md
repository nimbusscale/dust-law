# Dust Law: reviewer A

Reviewed d98a98d. Ran at the same time as reviewer B, with the same prompt.

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

The spec should go back for fixes before it merges. It is complete and well organized, and almost every source rule is in it. But FR-47 gives the wrong answer for a common tile, and several requirements can't be tested from their own text because of loose wording or words used with two meanings.

I edited nothing. The working tree on `functional-spec-3` is still clean.

## Problems in this change

Most important first. Every problem is in `docs/functional-spec.md`, which is a new file, so none of them are older problems.

**1. FR-47 (line 299): the rule for a finished bastion is wrong when a tile holds two bastion pieces.**
- **What's wrong:** It says a bastion is finished when "no bastion edge of any tile in a bastion faces an empty space". Take a tile with two separate bastion pieces, one on the north edge (bastion A) and one on the south edge (bastion B). That tile is "in" bastion A. So if B's south edge faces an empty space, A never counts as finished.
- **Check it fails:** can be tested from its own text.
- **Rewrite:** "When no edge covered by a piece of a bastion faces an empty space, the app shall count the bastion as finished."
- **Why it fixes it:** Only the bastion's own pieces are checked, so another bastion on the same tile can't block it. The commit took this wording from TILES, which has the same flaw. RULES' "follow each wall all the way around" did not have it.

**2. FR-27 (line 222): the rule about splitting wasteland is wrong for walls, and you can't test it.**
- **What's wrong:** It says "every wall splits the wasteland beside it into separate pieces". A wall has wasteland on one side only, so there's nothing for it to split. The plain wall tile has one wasteland piece. RULES meant something else: wasteland on one side of a road or bastion doesn't connect to wasteland on the other side.
- **Check it fails:** can be tested; nothing was dropped.
- **Rewrite:** "The app shall create only tiles on which the wasteland on one side of a road or a bastion is a separate piece from the wasteland on the other side."
- **Why it fixes it:** You can check it on any tile. RULES' "outposts split wastelands" is still covered by FR-20, because an outpost tile holds no wasteland.

**3. Terms, "Feature scoring" (line 85): the definition leaves out wastelands.**
- **What's wrong:** It says "control of a finished feature" and cites F-SEC-8. But FR-50 says a wasteland is never finished, and FR-80 scores wastelands at the end of the game. Read strictly, F-SEC-9's control rules don't apply to wastelands. Only FR-80's untagged sentence "Control works as in F-SEC-9 and FR-71" says they do.
- **Check it fails:** one name for each thing (the term has to cover every use).
- **Rewrite:** "Feature scoring. Working out control of a feature and giving out its points: a finished bastion, road or outpost during play (F-SEC-8), or a wasteland when the game ends (FR-80)."
- **Why it fixes it:** FR-58 to FR-62 then plainly cover wasteland scoring.

**4. FR-86 (line 516): "fits" is used with a narrower meaning than its term.**
- **What's wrong:** The Fit term means "in at least one rotation". FR-86 says "fits in its current rotation".
- **Check it fails:** one meaning for each term.
- **Rewrite:** "While a player has picked a tile in their hand, the app shall highlight every space where laying the tile in its current rotation follows FR-36, FR-37 and FR-38."
- **Why it fixes it:** It no longer gives the defined word a second meaning.

**5. FR-33 (line 241) and FR-43 (line 282) leave out the condition they depend on.**
- **What's wrong:** Read alone, FR-33 deals a tile at every draw step, even when the supply is empty. FR-43 offers a deploy even when the player has no enforcers left. Only FR-24 and FR-45 say otherwise. The skill says to "state the condition a requirement depends on in its Where or While".
- **Check it fails:** item rules; can be tested.
- **Rewrite FR-33:** "While the tile supply isn't empty, when a player's draw step comes, the app shall deal them one tile."
- **Rewrite FR-43:** "While a player's enforcer supply isn't empty, when their deploy step comes, ..."
- **Why it fixes it:** A test written from either one alone now gets the empty case right.

**6. FR-71 (line 410): it doesn't say which garrisons count.**
- **What's wrong:** "for each garrison whose owner has at least one enforcer on that feature" could mean any garrison in the game.
- **Check it fails:** can be tested.
- **Rewrite:** "When the app works out control of a road or a wasteland, the app shall leave out one of its hostiles for every side, for each garrison that is in a bastion the road ends at or the wasteland borders and whose owner has at least one enforcer on that road or wasteland."
- **Why it fixes it:** It names the garrisons that count, and it moves "for every side" into the rule itself.

**7. Rules sit in plain paragraphs under items, outside the "shall" sentence.**
- **Where:** line 288 under FR-44 ("A hostile on the feature doesn't count"), line 405 under FR-69, line 414 under FR-71, and lines 496 to 498 under FR-80.
- **What's wrong:** These are rules, but they aren't a Why or a Scenario. The script's GEARS check never sees them. FR-44's line matters most. FR-59 counts each hostile "as one enforcer", so a reader could think a hostile blocks a deploy.
- **Check it fails:** item rules (one behavior per requirement, all in the requirement).
- **Rewrites:**
  - FR-44: "...accept it only onto a feature with no player's enforcer on it, counting the whole feature and the tile just laid, and not counting hostiles."
  - FR-69: "...a road bonus of 2 points, whoever wins the road."
  - FR-80: "...worth 3 points for each finished bastion it borders, whatever the bastion's size, whoever won it, and whether or not it holds a garrison." Drop the control sentence once problem 3 is fixed.
- **Why it fixes it:** Each rule is then part of a requirement that a test can be written from.

**8. FR-91 (line 531) promises more than DESIGN did.**
- **What's wrong:** It says phone users can "join and play a game as in a desktop browser". DESIGN said phone browsers "aren't blocked, but the game isn't designed or tested for them". A test written from FR-91 would need a working phone experience.
- **Check it fails:** nothing was dropped (the meaning changed).
- **Rewrite:** "When a person opens the app in a phone browser, the app shall serve them the same screens as a desktop browser." Move it into Limits next to FR-6.
- **Why it fixes it:** It promises only that phones aren't blocked, which matches FR-6.

**9. FR-89 (line 525) drops feedback when a feature scores nothing.**
- **What's wrong:** DESIGN asked for "clear feedback when a feature is finished and scored". FR-89 fires only "when the app gives a player points". A bastion the hostile side wins, or a road with no enforcers, shows nothing.
- **Check it fails:** nothing was dropped.
- **Rewrite:** add "When a feature is scored, the app shall show every player which feature it was and who got its points, if anyone." Keep FR-89 for road bonuses and bounties.
- **Why it fixes it:** It brings back the source's trigger.

**10. Defined words are also used with other meanings.**
- **Check it fails:** one meaning for each term. The skill's own example is "turned" and "turning" for "turn".
- **Where, and the rewrites:**
  - Line 7 and the Enforcer term (line 93) use "claim" for features, but Claim is defined for bounties. Use "win" or "take control of" instead.
  - FR-52 says "finish all garrison choices", but Finished is a term. Use "collect every garrison choice".
  - FR-11 says "turns a person away", but Turn is a term. Use "When the app doesn't let a person join a game".
  - FR-61, FR-76 and the third scenario under FR-71 say "rounded down", but Round is a term. Use "with any fraction of a point dropped".
  - Also, FR-74's "When a turn's scoring step is done" should use FR-30's step name: "When a player's bounty step comes".
- **Why it fixes it:** Each defined word then has one meaning everywhere in the spec.

**11. Terms, "Bounty in play" (line 132), repeats FR-75's rule.**
- **What's wrong:** "that no player has claimed yet" says when a bounty leaves play, and FR-75 already holds that rule.
- **Check it fails:** a term never states a rule.
- **Rewrite:** "Bounty in play. A bounty picked for the game that hasn't been taken out of play (FR-75)."
- **Why it fixes it:** The rule then lives in one place.

**12. FR-69 and FR-70 are one fact.**
- **What's wrong:** If the bonus were paid per road end instead of per road, both items would have to change.
- **Check it fails:** one item for each fact.
- **Rewrite:** Merge them. "When a road that ends at a garrisoned bastion is scored, the app shall give the owner of each garrison in that bastion one road bonus of 2 points for that road, on top of the road's own points." Then turn the looping road into a Scenario under it.
- **Why it fixes it:** One item holds the whole rule.

**13. Some scenarios don't earn their place, and one leaves out a detail you need.**
- **Check it fails:** each scenario earns its place.
- **What's wrong:**
  - The second scenario under FR-62 (2 judges against 1 stronghold, you score 10) comes straight from FR-60. A reader wouldn't get it wrong.
  - The first scenario under FR-77 (Frontier can't be pooled) restates FR-77's own text.
  - The scenario under FR-55 only works if the north neighbor has bastion on its east edge too. Edge matching (FR-37) needs that for the north-east tile's bastion to reach the corner. As written, most readers would picture a board that can't exist.
- **Rewrites:**
  - Cut the first two.
  - FR-55's scenario: "Given an outpost whose north neighbor has bastion along its north and east edges, and whose north-east surrounding space holds a tile whose bastion runs along its west edge to the outpost's corner, ..."
- **Why it fixes it:** What's left shows only results a reader would likely get wrong, on boards that can happen.

**14. Low priority: some "only" rules that always hold sit outside Limits.**
- **Where:** FR-12, FR-25, FR-26, FR-27 and FR-72.
- **What's wrong:** Each is written as an absolute with "only", but none is in F-SEC-2, and none says what it rules out. `references/functional-spec.md` says "Each limit is a requirement, with its own ID, in the Limits section". Whether these count as limits depends on how you read that line (see the skill notes below).
- **Fix:** Move them to Limits in the "only ..., not ..." form, or reword them without "only".

**15. Low priority: the commit message says something the spec doesn't match.**
- **What's wrong:** The message lists "the argument for why a tile always fits" as moved to the blueprint. But FR-21's Why keeps part of that argument.
- **Fix:** The Why is fine to keep. Correct the commit message.

## Questions only the owner can answer

1. Are DESIGN's non-goals permanent? These are no computer opponents, no matchmaking, no art and desktop only. The skill says something that "might later" happen isn't a limit and goes in an issue instead. That would move FR-2, FR-3, FR-6 and FR-7 out of Limits.
2. Does "each player plays from their own browser" ban two players sharing one browser? FR-5 reads it as a ban. If it is one, how should the app tell? That depends on player identity, which is still an open question.
3. Some facts now live only in the commit message and git history: the technical-spec facts (seed on the server, the server checks every action, Socket.IO) and the open questions (identity, persistence, hosting). Do you want the technical spec and the issues written before this merges?

## Review checklist

- **Run the check script and decide each SIGNAL line: pass.** It found 0 RULE lines and 88 SIGNAL lines. Every signal says "FR-n isn't cited anywhere". That covers FR-1 to FR-91 except FR-22, FR-68 and FR-71, which the spec cites itself. None of them is a problem. The repo has no code, tests or other docs yet, so nothing can cite them.
- **Each item follows the rules for its kind of doc: fail.** See problems 5, 7 and 14.
- **Nothing was dropped: fail.** See problems 8 and 9, and problem 2 for the meaning that changed. Every other rule, condition and example in DESIGN, RULES and TILES is in the spec, or the commit lists it as cut or moved.
- **The rewrite stayed in scope: pass.**
- **No history got in: pass.** The script found nothing, and reading found nothing.
- **One name for each thing: fail.** See problems 3, 4 and 10. The names the commit chose (junction, road bonus, tile supply and enforcer supply in full, deal and draw step) are used the same way everywhere.
- **Each citation in Terms earns its place: pass.** Every citation passes the cover test. Problem 3 is about what "Feature scoring" means, not about its citation.
- **One item for each fact: fail.** See problem 12, and problem 11 for a term that holds the same rule as an item.
- **Each requirement can be tested from its own text: fail.** See problems 1, 2, 5 and 6.
- **Each scenario earns its place: fail, minor.** See problem 13.
- **Each requirement's Why passes both tests: pass.** These are FR-21, FR-39 and FR-55.
- **Every new item is in the right home: pass.** No blueprint or implementation fact got in as a requirement.
- **Every other step in changing-a-doc.md holds: pass.** Nothing in the repo still refers to the deleted foundation docs.

## Where the skill was unclear or fell short

1. **It doesn't say whether plain paragraphs may sit under an item.** It lists only "Why", "Scenario" and "Accepted gap" as lines under an item. It says nothing about plain lines such as "For example, ..." or "So ...". The author used them often, sometimes to hold rules (problem 7). I had to reason by analogy with "a rule found only in a scenario is a missing requirement".
2. **"Limit" has no clear boundary.** "A limit always holds. Write it as an absolute ... with 'only'" fits many game rules, such as FR-25. It also fits DESIGN's Non-Goals, yet "Something the app doesn't do yet, but might later, isn't a limit" pulls the other way. The skill gives no test for telling a permanent limit from a non-goal, or a limit from an ordinary rule that uses "only".
3. **Its rule on a term's word catches common phrases.** "Every use has the term's meaning" flags "rounded down" (because of Round) and "turns away" (because of Turn). I followed the rule, but the skill doesn't say whether fixed phrases like these are meant to count.
4. **Moved facts can end up nowhere.** "Nothing was dropped" passes when "the PR says it was cut on purpose". This change lists facts as moved to a technical spec and issues that don't exist, and deletes their only source. The skill doesn't say whether those facts must reach their new home in the same change, so the check passes while they survive only in the commit message.
