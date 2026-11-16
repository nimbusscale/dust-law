# Facet: reviewer A

Reviewed bdb155e. Ran at the same time as reviewer B, with the same prompt.

## Prompt

Review a change that adds a functional spec, using the `writing-project-docs` skill. You are reviewing someone else's change, so edit nothing and report what you find.

**The change.** One commit, `bdb155e`, on the branch `functional-spec-3` of the repo at `/home/jjk3/PycharmProjects/personal/dust-law`. It adds two files:
- `docs/facet/input/DESIGN.md`: the design doc for Facet, a self-hosted personal site for a résumé, portfolio and writing. This is the source.
- `docs/facet/output/functional-spec.md`: Facet's functional spec, written from that source.

The doc sits in a repo for a different project, Dust Law. Ignore everything in that repo outside `docs/facet/`. In particular, `docs/functional-spec.md` is Dust Law's spec and isn't part of this review. Don't switch branches or change the working tree.

There's no PR for this change. The commit message stands in for the PR description: read it with `git show bdb155e` wherever the skill mentions the PR.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. When you run it, give it `docs/facet` as the docs folder and `bdb155e~1` as the base, from the dust-law repo root, so it doesn't mix Facet's spec with Dust Law's. Don't read the skill's `evals/` folder, and don't read anything else in the software-factory repo. Don't look at other dust-law branches or GitHub issues and PRs.

**The source is the only source.** It links to other Facet docs (`ARCHITECTURE.md`, `ROADMAP.md`, a source file). They aren't available; don't look for them or fetch anything from the web.

**Not a finding:** facts that belong in a technical spec, a blueprint or anywhere other than the functional spec are left out on purpose. For now we're only testing the functional spec. Leaving them out isn't a finding. A fact like that which wrongly got into the spec still is. For the "Nothing was dropped" check, compare the spec against `docs/facet/input/DESIGN.md`.

**Your report** should give:
- Your verdict in one or two sentences.
- Each problem you find, numbered, with the item ID or source line, what's wrong, and how to fix it. Put the most important first.
- Questions only the owner can answer, if any.
- The review checklist from the skill, with pass or fail for each check and what the check script found.
- Where the skill was unclear or fell short while you reviewed. Be specific and quote the skill where it helps.

## Report

**Verdict.** The spec is a solid first draft but isn't ready to merge. Most items are well formed and every source rule is accounted for. A few requirements contradict each other, though, and the spec states as settled several things the commit message itself lists as unknown.

I edited nothing and didn't switch branches.

## Problems in this change

Most important first.

1. **FR-30 and FR-31 lock the owner out of their own views.**
   - **What's wrong:** "Visitor" means anyone not signed in as the owner. So "show it only to a visitor who has opened its share link" leaves the owner out. That contradicts FR-14, which lets the owner see everything. FR-33 gets this right for private views. This fails step 7 of changing-a-doc.md (check the items that depend on the same fact).
   - **Fix:** "…the site shall show it only to the owner and to a visitor who has opened its share link." Do the same in FR-31.

2. **The spec settles questions the commit says are open.**
   - **What's wrong:**
     - The commit asks whether a view can be private. FR-33, FR-34 and the View visibility term all say it can.
     - The commit asks whether public and private are the only item visibility values. The Item visibility term says they are.
     - The commit says the source only *aims* for accessible site pages. FR-43 and FR-44 require it.
     - FR-18 says "every public item that fits it", which the commit admits nobody can define, so FR-18 can't be tested.
   - The skill puts anything not yet decided in an issue, not in a doc. This also breaks the "no invented answers" rule.
   - **Fix:** get the owner's answers (see Questions). Until then, take "private view" out of FR-33, FR-34 and the term. Limit FR-43 and FR-44 to the admin.

3. **FR-24 lets the owner put "any view" in the site navigation.**
   - **What's wrong:** an unlisted or private view in the menu shows that it exists. That undoes FR-34's Why ("any other answer would confirm that it exists"). The source only says views "may be included in site navigation".
   - **Fix:** "The app shall let the owner add a public view to the site navigation." Confirm which views with the owner.

4. **FR-31's accepted gap contradicts FR-33.**
   - **What's wrong:** the gap says "the owner can't end a visitor's access before the hour is up". But if the owner makes the view private, FR-33 says only the owner sees it. One of the two is false.
   - **Fix:** narrow the gap to what can't be undone, for example: "Changing a password view's password doesn't end access for a visitor who entered the old one until their hour is up." The owner has to confirm this.

5. **FR-23 says a view can't set "its own name".**
   - **What's wrong:** views do have names. The scenario under FR-22 uses "a view called UX Designer". The rule means the owner's name.
   - **Fix:** "…but not the owner's name, avatar or contact links, which always come from the profile."

6. **FR-40 still holds after comments are turned off.**
   - **What's wrong:** "only after the owner turns comments on" stays true once they've been turned on, even if the owner later turns them off.
   - **Fix:** "While comments are turned on for an item, the site shall accept comments on it." Or keep the limit form: "only while the owner has comments turned on for that item."

7. **FR-12 may clash with comments.**
   - **What's wrong:** FR-12 says "content" becomes visible to more people only through a change the owner makes. A visitor's comment that appears without the owner's approval breaks that, if a comment counts as content.
   - **Fix:** write "the owner's content" in FR-12. Then answer the moderation question so FR-41 says whether comments show before approval.

8. **FR-11 can't be tested.**
   - **What's wrong:** "send notifications" names no recipient or event, so almost any email counts. The source gives its three jobs as examples in brackets. The spec turns them into the full list, which would also forbid something like a sign-in recovery email.
   - **Fix:** list each kind of email by who gets it and when. The owner has to supply that list.

9. **FR-6, FR-7 and FR-8 are bans, not written in the limit form.**
   - **What's wrong:** references/functional-spec.md asks for "what the app does, with 'only', then what that rules out". FR-6's "engagement features, such as…" is an open list, so you can't write a test that covers it.
   - **Fix:** close the list: "The site shall have no feeds, likes, follows or infinite scroll." Do the same for FR-7 and FR-8 if the only-form can't fit them. (See skill gap 2.)

10. **Two Terms entries give naming rules, and one repeats a count.**
    - **What's wrong:** "A view is named by this setting, such as an unlisted view or a password view" is a rule for making names. SKILL.md forbids that and says to list every name in the set. Item visibility does the same. The Owner term, "The one person…", repeats the count FR-1 holds.
    - **Fix:**
      - "The views are called public views, unlisted views, password views and private views." Do the same for items.
      - "Owner. The person who owns an instance and signs in to it."

11. **Some words that name things have no term and no citation.**
    - **What's wrong:** testimonial (FR-11), notification, newsletter, the admin's homepage settings (FR-25) and "Facet's own pages" (FR-29) are all undefined. "Facet" and "the app" are also both used for the app (FR-6 Why, FR-29, FR-31 gap). This fails "One name for each thing".
    - **Fix:** add terms for the ones that stay. Write "the app" everywhere except the opening line.

12. **FR-30, FR-31 and FR-33 use "Where" for a setting that changes.**
    - **What's wrong:** "Where" is for a fixed precondition. View and item visibility change whenever the owner flips them, so GEARS calls for "While".
    - **Fix:** "While a view is an unlisted view, …"

13. **FR-20 and FR-34 have more than one trigger.**
    - **What's wrong:** FR-20 has two ("opens or saves"). FR-34 has three cases (unlisted view without its link, private view, private item).
    - **Fix:** split each, or confirm that "When A or B" with one behavior counts as one trigger. (See skill gap 4.)

14. **FR-39 can't be tested.**
    - **What's wrong:** "written in plain language" is as vague as "readable", which the commit cut for that reason.
    - **Fix:** give a measurable rule, or cut it and add it to the open questions.

15. **The Growth loop term adds a rule.**
    - **What's wrong:** "such as a prompt to share the site" isn't in the source. It quietly widens FR-8 to ban share buttons.
    - **Fix:** define the term without that example, or confirm with the owner.

16. **The commit misreports the check script.**
    - **What's wrong:** it says "nothing from this change… two copy signals". The script also printed three RULE lines for broken links in DESIGN.md, which this change added.
    - **Fix:** report them and say why they're harmless (the linked Facet docs aren't in this repo).

**Older problems:** none. The spec is a new file.

## Questions only the owner can answer

- Can a view be private? Are public and private the only item visibility values?
- Which views may appear in the site navigation?
- Does changing a password view's password, or making the view private, end access a visitor already has?
- Does the owner approve comments before they show, or only remove them afterwards?
- Which emails may the app send, and to whom? What does "notifications" cover, and does sign-in recovery count?
- Do the keyboard and screen-reader rules apply to site pages, or only to the admin?
- What makes a public item fit a view section (FR-18)?
- Should "Facet has no plugin system" be a limit in this spec? The owner of the instance would notice it.

## Review checklist

- **Run the doc check script: pass for the spec.**
  - 56 RULE lines point at `docs/functional-spec.md`, which is Dust Law's spec and not in scope. The script treats that file as source code and checks its FR IDs against Facet's spec, so these are false alarms.
  - 3 RULE lines are DESIGN.md links to `ARCHITECTURE.md`, `ROADMAP.md` and `params.ts`. Those files aren't in this repo. This is the source copy, not the spec.
  - 2 copy SIGNALs, both fine. One is 11 short runs shared with the source, such as "headline, summary, hero image, call to action and accent colour". The other is template wording shared with Dust Law's spec.
  - No history signals, no item-shape RULEs, no ID ranges.
- **Each item follows the rules for its kind: fail.** See 9, 10, 12 and 13.
- **Nothing was dropped: pass.** Every source rule is in an FR, or the commit lists it as cut, left for another doc, or an open question. The only possible gap is "no plugin system" (see Questions).
- **The rewrite stayed in scope: pass.** It's a new doc plus its source.
- **No history got in: pass.** FR-27's Why ("already in use elsewhere") is close to history but acceptable.
- **One name for each thing: fail.** See 5, 10 and 11.
- **Each citation in Terms earns its place: pass.** View cites F-SEC-4, and the two visibility terms cite F-SEC-6. Each of those sections holds the rules for the thing named.
- **One item for each fact: pass.** I checked FR-1/FR-14, FR-13/FR-35, FR-30/FR-34, FR-33/FR-34, FR-36/FR-37 and FR-12/FR-20. Each pair is two facts.
- **Each requirement can be tested from its own text: fail.** FR-6, FR-11, FR-18, FR-23, FR-39 and FR-40.
- **Each scenario earns its place: pass.** The FR-22 scenario needs FR-17 and FR-22 together, and it can happen.
- **Each Why passes both tests: pass.** FR-22 has no Why because the source gives none. That's correctly left open, not invented.
- **Every new item is in the right home: pass.** FR-3 (one container, one port) and FR-15 (two folders) are things the self-hosting owner notices.
- **Every other step in changing-a-doc.md holds: fail.** Step 7 is missed: see 1, 3, 4 and 7. IDs run from FR-1 to FR-45 with no gaps.

## Where the skill was unclear or fell short

1. **The check script gives false RULE lines when another project's spec is in the same repo.** It treats any tracked `.md` file outside the docs folder as source code. So Dust Law's spec citations were checked against Facet's spec. reviewing.md says "A `RULE` line is a broken rule, so it's always a problem", and here 56 of them weren't. The same overlap hides the "isn't cited anywhere" signal: 42 of Facet's 45 FRs are cited nowhere in Facet's docs, but the script found citations in Dust Law's spec. The skill also has no idea of a source file kept inside the docs folder, like DESIGN.md.
2. **The limit form doesn't fit a plain ban.** functional-spec.md says to write a limit "with 'only', then what that rules out". SKILL.md says "say what's allowed, not what's refused". Neither says what to do with "no advertising", where nothing is allowed.
3. **The skill never says how to tell a limit from an ordinary rule that uses "only".** functional-spec.md says "Each limit is a requirement… in the Limits section". But FR-25, FR-26, FR-29 and FR-30 all use "only" and sit outside it, and I couldn't tell from the skill whether they belong there.
4. **"One trigger per requirement" doesn't cover "When A or B" with the same behavior.** That leaves FR-20 and FR-34 open to either reading.
5. **The skill doesn't cover vague source material.** "Not made yet? It's an issue" sits under decisions only. Nothing says what to do with a requirement whose source is vague. The writer left some out (contrast) and kept others with a guess (FR-18, FR-34). Reviewers have no rule to judge which is right.
