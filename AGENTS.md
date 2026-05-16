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

- This is a Vite React portfolio app with Three.js, React Three Fiber, Rapier physics, Tailwind CSS, and Zustand.
- App composition starts in `src/App.tsx`; the Three.js scene is inside `<Canvas>`, while ordinary DOM overlays can be rendered as siblings of the canvas.
- Portfolio source data lives in `src/data/*.ts`; normalized exported item ids are produced in `src/data/items.ts` from source item order.
- Shared item types live in `src/types/index.ts`; avoid data shape changes unless a task explicitly asks for them.
- Menu controls live in `src/features/UI.tsx`; global UI state lives in `src/store/store.ts`.
- Current item cards are rendered in `src/features/Info.tsx` via Drei `Html`; this loop should move selected item card presentation to regular DOM outside the Three.js Html layer.
- Camera and controls are driven by `src/features/Camera.tsx` and `src/features/Controls.tsx`; selection state should drive presentation camera behavior.
- Rapier item geometry, collider nodes, per-instance props, and steering are centralized in `src/features/rapier/RapierItems.tsx`.
- Physics constants live in `src/features/physics/constants.ts`; item spawn descriptors and size scale live in `src/features/physics/itemInstanceDescriptors.ts` and `src/utils/getSize.ts`.
- Do not start a dev server. Do not add committed tests or test infrastructure in this feature-delivery loop.
