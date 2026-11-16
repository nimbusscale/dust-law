# Agent reports for the third functional spec run

These are the prompts and final reports of the agents that wrote and reviewed the specs on this branch, copied word for word from the agent logs. This branch is for testing the `writing-project-docs` skill (nimbusscale/software-factory#18, steps 4 and 5) and is never merged.

Every agent was a fresh Claude Opus agent at high effort. Each read the skill from its folder by path.

- **`dust-law/`:** the writer and two reviewers for Dust Law's functional spec, commit `d98a98d`. The source was the three foundation docs on `main`, which the writer deleted.
- **`facet/`:** the writer and two reviewers for Facet's functional spec, commit `bdb155e`. The source is `docs/facet/input/DESIGN.md`, copied from Facet's repo.

There was no PR for either spec. Each commit message stood in for the PR description.

In the Facet run, the check script was given `docs/facet` as its docs folder. It read Dust Law's `docs/functional-spec.md` as source code, so its results in that run aren't reliable: false RULE lines, and no "isn't cited" signals. The spec itself isn't affected.

The follow-up issues from these runs are sub-issues of nimbusscale/software-factory#18.
