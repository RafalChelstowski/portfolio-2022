Implement ONE feature task from docs/progress.md.

IMPORTANT: If all items in docs/progress.md are marked [x], you MUST output <promise>COMPLETE</promise> and stop. Do not do anything else.

## THIS ITERATION

1. Read `docs/progress.md`
2. If no `- [ ]` or `- [/]` items remain -> output `<promise>COMPLETE</promise>` and stop immediately
3. Pick the first `- [ ]` or `- [/]` item
4. Read `## Findings` in `docs/progress.md` and apply any relevant notes
5. Parse the item:
   - Task description: everything before `|`
   - Acceptance criteria: everything after `AC:`
6. Determine mode:
   - `[ ]` -> CREATE
   - `[/]` -> IMPROVE
7. Implement the task
8. Do not modify application code for this smoke test unless a verification command forces it
9. Run: CI=1 npm test -- --watch=false --passWithNoTests && npx tsc --noEmit && npx eslint src --ext .ts,.tsx
10. If step 9 fails, fix the failure and rerun step 9
11. If step 9 passes, mark the item `[x]` in `docs/progress.md`
12. Optionally add critical discoveries to `## Findings`
13. Commit all changed files together: `git add -A && git commit -m "feat: <item-name>"`
14. End iteration. Do not output COMPLETE unless step 2 triggered.

## SUCCESS = ALL THREE PASS

- Test command exits 0
- Typecheck command exits 0
- Lint command exits 0

## COMPLETE

Output `<promise>COMPLETE</promise>` ONLY in step 2 when no `- [ ]` or `- [/]` items remain. Stop immediately after outputting it.

## FINDINGS

Optional. Add only critical discoveries:
- Architectural decisions that affect other items
- Constants or configs with unexpected values
- Patterns that should be reused later

## Project Context

- Repo: Create React App + TypeScript portfolio project.
- Branch: `ralph/smoke-digit-loop`.
- This is a Ralph workflow smoke test, not a product feature.
- The task file is `ralph-digit-loop.txt` at the repo root.
- Each iteration should add exactly one next digit on its own line and preserve all previous lines.
- Preferred write scope for this exercise: `ralph-digit-loop.txt`, `docs/progress.md`, and Ralph metadata under `.ralph/`.
- Leave `src/`, package manifests, and lockfiles unchanged unless verification genuinely requires a fix.
