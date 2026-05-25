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

- Vite React portfolio scene using React Three Fiber, three.js, drei, and Rapier physics.
- Work only with existing installed dependencies and public assets. Uploaded marble texture maps under public/marble are in scope; do not add new HDRIs, GLTF/object assets, packages, or test infrastructure.
- Key scene files are src/features/Lights.tsx, src/features/Pool.tsx, src/features/rapier/RapierItems.tsx, and src/App.tsx.
- Existing public assets include pool.gltf, pool PBR texture maps, hdr.hdr, and uploaded marble texture maps under public/marble; reuse these only.
- Preserve the interactive Rapier item behavior and existing UI/card behavior.
- Latest Rafal feedback: the RetroPass/grain is now too prominent and obstructs the view. Keep the scope focused on making the RetroPass adjustable through existing Leva/dev controls, lowering defaults, and preserving the scene visibility. Do not widen into unrelated lighting/material changes unless required by the RetroPass task.
- Do not start a dev server unless Rafal explicitly asks.
