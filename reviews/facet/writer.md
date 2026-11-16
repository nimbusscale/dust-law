# Facet: writer

Wrote the spec and the commit message for bdb155e. Unlike the Dust Law writer, it wasn't asked for owner questions or where the skill fell short.

## Prompt

Turn a design doc into a functional spec, using the `writing-project-docs` skill.

**The source.** The design doc for Facet, a self-hosted personal site for a résumé, portfolio and writing, is at `/home/jjk3/PycharmProjects/personal/dust-law/docs/facet/input/DESIGN.md`. It's the only source. It links to other Facet docs (`ARCHITECTURE.md`, `ROADMAP.md`, a source file); don't look for them or fetch anything from the web. There's no code.

The doc sits in a repo for a different project, Dust Law, checked out on the branch `functional-spec-3`. Ignore everything in that repo outside `docs/facet/`. In particular, don't read `docs/functional-spec.md`: it's Dust Law's spec, not Facet's.

**The skill.** The skill can't load on its own, so read it from its folder by path: start with `/home/jjk3/PycharmProjects/personal/software-factory/.claude/skills/writing-project-docs/SKILL.md`, and read the files it links to when it tells you to. Its check script is in that folder's `scripts/`. When you run it, give it `docs/facet` as the docs folder and `main` as the base branch, from the dust-law repo root, so it doesn't mix Facet's spec with Dust Law's. Don't read the skill's `evals/` folder, and don't read anything else in the software-factory repo.

**What to do:**
1. Write Facet's functional spec at `docs/facet/output/functional-spec.md`, following the skill.
2. Write only the functional spec. Leave out facts that belong in a technical spec, a blueprint or anywhere else, and don't write them anywhere. List them in the commit message with where each belongs.
3. Leave the source doc where it is. Don't edit or delete it.
4. Check your own work the way the skill says, including running the check script.
5. Don't commit or push.

**There's no PR for this run.** Wherever the skill says something goes in the PR description, put it in a commit message instead. Write that commit message to `/tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/d8317862-5ccd-4d6b-964e-de8c6f738c9b/scratchpad/facet/commit-message.txt`: a short subject line, a blank line, then the body. Keep your working notes in that same `facet` folder.

When you're done, reply with the spec's path, the commit message's path, and one line on what the check script found.

## Report

I wrote Facet's functional spec. It has 45 GEARS requirements in 10 sections, a Terms section and a Limits section among them.

- Spec: /home/jjk3/PycharmProjects/personal/dust-law/docs/facet/output/functional-spec.md
- Commit message: /tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/d8317862-5ccd-4d6b-964e-de8c6f738c9b/scratchpad/facet/commit-message.txt
- Check script: it found nothing from this change.

The commit message lists every fact I left out and where each one belongs: the technical spec, a code comment, or the AI prompts. Examples are SQLite, PocketBase, the share-link cookie, and the old "default" flag on views. It also lists open questions I didn't invent answers to. Examples are the colour contrast standard, the export format, and whether comments need approval before they show. Some principles are too vague to test, such as "calm, not a CMS", so I left them out of the spec and listed them there too.

The source doc is untouched, and nothing is committed. My working notes and the script's output are in /tmp/claude-1000/-home-jjk3-PycharmProjects-personal-software-factory/d8317862-5ccd-4d6b-964e-de8c6f738c9b/scratchpad/facet/.
