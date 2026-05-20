Implement ONE feature task from docs/progress.md.

IMPORTANT: If all items in docs/progress.md are marked [x], you MUST output <promise>RALPH_DOCS_PROGRESS_COMPLETE</promise> and stop. Do not do anything else.

## THIS ITERATION

1. Read `docs/progress.md`
2. If no `- [ ]` or `- [/]` items remain, output `<promise>RALPH_DOCS_PROGRESS_COMPLETE</promise>` and stop immediately
3. Pick the first `- [ ]` or `- [/]` item
4. Read `## Findings` in `docs/progress.md` and reuse relevant discoveries
5. Parse the item:
   - Task description: everything before `|`
   - Acceptance criteria: everything after `AC:`
6. Determine mode:
   - `[ ]` -> CREATE: implement from scratch
   - `[/]` -> IMPROVE: read existing code, read Findings for this item, fix or enhance
7. Implement only that item. If you uncover adjacent work, add a new `[ ]` item instead of widening scope. When removing or refactoring code, preserve existing safety checks unless the AC explicitly asks to remove them.
8. This repo is a no-tests repo for this loop. Do not add tests, do not add test infrastructure, and do not run `npm run test`
9. Run `npm run typecheck && npm run lint && npm run build`
10. If required commands fail, fix the task and rerun step 9 until the acceptance criteria and required checks pass
11. Generated caches, build noise, and tool artifacts do not count as task progress. Do not mark `[x]` or commit if only unrelated/generated files changed.
12. Mark the item `[x]` only when its acceptance criteria are satisfied
13. Add brief notes to `## Findings` only when they reduce future loop risk
14. Commit all changed files for the item together:
    `git add -A && git commit -m "chore: <item-name>"`
15. End the iteration. Output `<promise>RALPH_DOCS_PROGRESS_COMPLETE</promise>` only when step 2 triggered

## SUCCESS = REQUIRED GATES PASS

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Project Context

Vite React portfolio app using TypeScript, React Three Fiber, Rapier physics, Tailwind CSS, and Zustand. Portfolio content lives in src/data, shared item types live in src/types, grouped card rendering is in src/features/SelectedCardOverlay.tsx and grouping helpers are in src/data/items.ts. Feature delivery must preserve existing project style, keep browser/runtime smoke checks manual, and avoid adding tests or test infrastructure.
