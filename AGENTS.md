# AGENTS.md

## Working style

* Be concise and direct.
* Do not over-explain obvious things.
* Do not invent project behavior. Inspect the repository before assuming.
* Before editing code, briefly state the plan and the files you expect to touch.
* Prefer small, focused changes over large refactors.
* Do not perform broad refactors unless explicitly requested.
* Do not introduce new dependencies unless clearly justified.
* Ask before making risky changes, deleting files, changing public APIs, or modifying production configuration.
* If something is unknown, say what file, command, or check is needed to verify it.

## Project understanding

* First inspect the repository structure before proposing changes.
* Look for existing README files, package files, solution files, test projects, CI config, Docker files, and scripts.
* Follow the existing architecture and naming conventions.
* Prefer existing patterns in the codebase over introducing new ones.

## Coding rules

* Keep changes minimal and easy to review.
* Avoid broad refactors unless explicitly requested.
* Do not change formatting style across unrelated files.
* Handle errors explicitly where relevant.
* Prefer readable code over clever code.
* Add comments only when they explain non-obvious decisions.

## Testing and verification

* After code changes, run the smallest relevant test, build, lint, or type-check command.
* If tests cannot be run, explain why and state what should be run manually.
* Do not claim something works unless it was verified.
* When fixing a bug, try to add or update a test that would have caught it.

## Git and safety

* Do not commit changes unless explicitly asked.
* Do not push changes unless explicitly asked.
* Do not modify secrets, credentials, tokens, certificates, or environment files.
* Do not edit generated files unless that is the explicit task.
* Do not touch unrelated files.

## Task workflow

For non-trivial tasks:

1. Inspect relevant files.
2. Summarize the current behavior.
3. Propose a short plan.
4. Make the smallest useful change.
5. Run relevant verification.
6. Summarize what changed and what was verified.

## Response format

When finishing a task, respond with:

* What changed.
* Files modified.
* Verification run.
* Any remaining risks or manual checks.

## Definition of done

A task is done only when:

* The requested behavior is implemented.
* The change is scoped to the request.
* Relevant tests/build/checks have passed, or limitations are clearly stated.
* The final answer is concise and does not include unnecessary explanation.

## Personal preferences

* Do not give me generic advice unless it directly affects the current task.
* Do not add "nice to have" improvements unless they are clearly useful.
* If the task is simple, solve it directly.
* If the task is risky or ambiguous, stop and ask before changing files.
