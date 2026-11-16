# Facet: reviewer B

Reviewed bdb155e. Ran at the same time as reviewer A, with the same prompt.

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

## Verdict

The spec is a careful, faithful conversion of the design doc. Its commit message is unusually honest about what it left out and what it couldn't decide. It needs one real meaning fix (FR-40) and one conflict fix (FR-4 against FR-9) before merge. The rest are smaller wording, naming and testability problems.

All problems are in this change, since both files are new. There are no older problems in `docs/facet/`. Line numbers are in `docs/facet/output/functional-spec.md` unless noted.

## Problems in this change

1. **FR-40 (line 191) says the wrong thing once comments are turned off.**
   - **What's wrong:** "accept comments on an item only after the owner turns comments on" stays true after the owner turns them off again. So the site would keep accepting comments. The source (DESIGN.md:31) says comments are "off until you enable them". This fails "can be tested from its own text": a test of turning comments off has no answer.
   - **Rewrite:** "The site shall accept comments on an item only while the owner has comments turned on for that item, not otherwise."
   - **Why it fixes it:** "while" ties the rule to the item's current setting, not to a past event.

2. **FR-4 (line 55) conflicts with FR-9 (line 72) about analytics.**
   - **What's wrong:** FR-4 keeps all data, "analytics included", only on the instance's disk. FR-9 lets the owner add third-party tracking, which keeps visitor figures at an outside service. The Analytics term (line 39) covers any "figures about how visitors use the site", so it includes those. The source only says "Built-in analytics stay on your server" (DESIGN.md:31). This fails the GEARS rule "check that ... no other requirement makes an exception to it".
   - **Rewrite:** change the term to "**Analytics.** Figures the app itself collects about how visitors use the site, for the owner to look at." Then FR-4 can stay as it is.
   - **Why it fixes it:** third-party tracking is no longer analytics, so FR-9 stops being an exception to FR-4.

3. **FR-6, FR-7 and FR-8 (lines 62-70) are limits without "only", and FR-6 can't be tested.**
   - **What's wrong:** `functional-spec.md` in the skill says each limit is written "with 'only', then what that rules out". All three are bare bans ("shall have no", "shall offer no", "shall show no"). FR-6 also has three smaller problems:
     - "Engagement features" names a thing but isn't in Terms.
     - Its "such as" list is open-ended, so a test can't tell what else counts.
     - It drops the source's "engagement nudges" (DESIGN.md:19).
   - **Rewrite:** add a term, "**Engagement feature.** A feature meant to make visitors come back or stay longer: feeds, likes, follows, infinite scroll and engagement nudges." Then FR-6 becomes "The site shall offer visitors only the owner's pages, not engagement features." FR-8 becomes "The site shall show only the owner's content, not advertising or growth loops."
   - **Why it fixes it:** the closed list makes FR-6 testable, and each limit now has the "only" form. FR-7 has no clean "only" form (see skill gap 1). Splitting FR-8's advertising and growth loops into two items is also worth considering, since they would change for different reasons.
   - **Also:** FR-6's Why (line 65) is a mission statement copied from DESIGN.md:9. It doesn't change how anyone would apply FR-6, so it fails the second Why test. Cut it once the term exists.

4. **FR-34 (line 169) has three triggers, and "not found" isn't precise enough to test.**
   - **What's wrong:** it fires on an unlisted view without its share link, on a private view, and on a private item. The GEARS rule says "One trigger per requirement". The point of its Why is that a hidden thing looks exactly like a missing one. But "answer 'not found'" would pass even if the page looked slightly different from a real missing address.
   - **Rewrite:** "When a visitor asks for a view or an item that FR-30 or FR-33 keeps from them, the site shall answer exactly as it does for an address where nothing exists."
   - **Why it fixes it:** there is now one trigger, and the test is a direct comparison with a real missing address. Password views stay out, so FR-32 still asks for the password.

5. **Some names have no definition, so their requirements can't be tested from the spec alone.**
   - **FR-28 (line 144), "a valid share link":** nothing says what makes a share link valid. See the questions below.
   - **FR-29 (line 150), "Facet's own pages":** nothing says which pages these are, so a test can't pick a slug that should be refused. Add a term, such as "**Reserved address.** An address the app uses for its own pages, such as the admin and `/s/`." Then write FR-29 as "...accept it only if it isn't a reserved address."
   - **FR-25 (line 131), "the admin's homepage settings":** this names a part of the admin without a term. Add one, or write "the homepage settings in the admin (FR-25)" and define it once.
   - **FR-39 (line 186), "plain language":** this is as hard to test as "calm, not a CMS", which the commit left out for that reason. Either give it a concrete measure or move it to the open questions with the others.

6. **The FR-28 Why (line 148) uses "sites" with a second meaning.**
   - **What's wrong:** "Site" is defined as the instance's pages, but "leaking to other sites" means other websites. This fails "One meaning for each term".
   - **Rewrite:** "...stops it leaking to other websites through the `Referer` header."
   - **Why it fixes it:** "site" keeps its one meaning.

7. **The View visibility and Item visibility terms (lines 28-31) give a rule for making names.**
   - **What's wrong:** "A view is named by this setting, such as an unlisted view or a password view" breaks "Never give a rule for making names ... list every name in that home."
   - **Rewrite:** "The views are named for it: a public view, an unlisted view, a password view and a private view." Do the same for items: "a public item and a private item".
   - **Why it fixes it:** every name is listed in one place.

8. **The app has two names, "the app" and "Facet".**
   - **Where:** lines 65, 150 and 162 say "Facet", while every requirement says "the app". This fails "One name for each thing".
   - **Rewrite:** use "the app" in those three places, for example "the app's own pages" and "keeps the app simple". Keep "Facet" only in the opening description.

9. **The commit message says the check script found "nothing from this change", but it found three RULE lines in the new DESIGN.md.**
   - **What's wrong:** DESIGN.md:3 and DESIGN.md:68 link to `ARCHITECTURE.md`, `ROADMAP.md` and `../frontend/src/params.ts`. None of these exist. A RULE line is always a problem.
   - **Fix:** keep the copied source somewhere the script doesn't read as a doc, or remove the links from the copy. Either way, say so in the commit message.

## Questions only the owner can answer

The commit's own open questions are all good, and I'd keep them. These are extra:

- **FR-11:** is the list of email uses complete? As written, it rules out a password-reset or sign-in email.
- **Share links (FR-28, FR-30):** what makes a share link valid? Can the owner revoke one? What should an invalid share link return?
- **FR-2 (one profile) and FR-5 (no version history):** are these permanent limits, or accepted trade-offs that might change? The skill says something that might come later isn't a limit, but the source lists both under "Accepted trade-offs".
- **FR-38:** the source only says the prompts *tell* the model not to invent facts. Is it right to promise as a hard rule that a draft adds no facts?
- **DESIGN.md:** should it stay? The commit itself notes the two docs will drift.

## Review checklist

- **Run the check script and decide each SIGNAL line:** done. It printed 59 RULE lines and 2 SIGNAL lines.
  - 56 RULE lines point at `docs/functional-spec.md`, which is Dust Law's spec. They are not from this change. The script treats that file as source code that cites FR-46 to FR-91, which Facet's spec doesn't define.
  - 3 RULE lines are the DESIGN.md broken links. These are from this change (problem 9).
  - SIGNAL, DESIGN.md:9 and spec:65 share 11 eight-word runs. This is FR-6's copied Why. Copying from the source isn't a problem in itself, but the Why should go (problem 3).
  - SIGNAL, spec:43 and Dust Law spec:147 share template wording. Not a problem.
  - There were no history signals and no item-shape RULE lines.
- **Each item follows the rules for its kind of doc:** fail. See FR-6, FR-7 and FR-8 (problem 3) and FR-34 (problem 4).
- **Nothing was dropped:** pass, with one small drop. I went through every line of DESIGN.md, and everything is in the spec or named in the commit message, except "engagement nudges" (problem 3).
- **The rewrite stayed in scope:** pass. It's a new doc. The few additions beyond the source (FR-32, private views in FR-34, FR-43 and FR-44 applied to the site) are all raised in the commit.
- **No history got in:** pass. The FR-27 Why, "already in use elsewhere", is fine: it keeps the redirect from looking unneeded.
- **One name for each thing:** fail. See problems 5, 6, 7 and 8.
- **Each citation in Terms earns its place:** pass. The terms cite F-SEC-4 and F-SEC-6, and those sections hold the rules for what the terms name.
- **One item for each fact:** pass. I checked these pairs: FR-1 and FR-14, FR-3/FR-4/FR-15, FR-12/FR-19/FR-20, FR-30 and FR-34, FR-7 and FR-11.
- **Each requirement can be tested from its own text:** fail. See FR-40, FR-6, FR-34, FR-28, FR-29 and FR-39. FR-18's "every public item that fits it" also can't be tested, but the commit already raises it.
- **Each scenario earns its place:** pass. FR-22's scenario comes from FR-17 and FR-22 together.
- **Each requirement's Why passes both tests:** fail for FR-6 only. The others pass, including the Whys on FR-19, FR-27, FR-28 and FR-34, which stop a rule from looking unneeded.
- **Every new item is in the right home:** pass. FR-3, FR-4 and FR-15 are things the self-hosting owner would notice.
- **Every other step in changing-a-doc.md holds:** pass, apart from the bare word "field" (skill gap 2) and DESIGN.md's duplicated facts (a question above).

## Where the skill was unclear or fell short

1. **The Limits form doesn't fit a ban on a kind of feature.** The skill says "Write it as an absolute: what the app does, with 'only', then what that rules out." For "no private messages between visitors" (FR-7), the "only" form means listing everything a visitor *can* do. The source doesn't give that list, so a writer would have to invent it. The skill should say how to write a ban, or allow "shall not" for one.

2. **"Never use a shared word alone" goes too far when the bare word is meant generally.** "Fact field" and "Framing field" share "field". FR-35 and FR-36 say "each field" and "any field", and they really do mean any field. Read literally, "always write the full name" fails them, and there's no sensible full name to use. The rule should apply only when the bare word could mean one specific name.

3. **"One trigger per requirement" and "One item for each fact" pull against each other.** FR-34 has three triggers, but they are one fact. The skill doesn't say which rule wins. It also doesn't say the fix is to name the shared condition, for example by citing FR-30 and FR-33.

4. **The check script is unreliable when the docs folder is a subfolder.** With `docs/facet` as the docs folder, `docs/functional-spec.md` counts as a source file. That causes two problems:
   - It prints 56 false RULE lines.
   - It hides every "isn't cited anywhere" signal, because Dust Law's spec cites FR-1 to FR-45 and makes all of Facet's requirements look cited.

   The script also reads a copied source doc in the docs folder as a project doc. The skill doesn't say where a source document should live, or how to review a spec written from a doc rather than from an older version of itself. "Nothing was dropped" only says "go through it the same way".

5. **The skill gives no way to tell a limit from an accepted trade-off.** It says "Something the app doesn't do yet, but might later, isn't a limit." But a design doc's "accepted trade-offs" (one profile, no version history) could be either. The skill doesn't say whether to treat them as limits or raise them as open items.
