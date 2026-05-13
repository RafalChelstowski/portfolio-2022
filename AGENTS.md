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

- Portfolio app is a small React + Three + React Three Fiber scene with Zustand state and static assets in `public/`.
- Current physics runtime uses Rapier through `@react-three/rapier`; preserve the Rapier pool bounds, falling behavior after startup, sorting behavior, filtering behavior, hover behavior, and selection behavior unless the active checklist item explicitly changes them.
- Startup UI reveal is intended to be gated by `RapierItems`: show the UI only after the existing majority-in-pool condition passes.
- `RapierItems` uses `InstancedRigidBodies` refs to build a body-by-item-index map during `useFrame`; preserve that mapping because sorting and hover/menu interactions depend on it.
- `firstPoolContactByIndexRef` is part of the reveal gate. Preserve it while removing artificial startup velocity control.
- The freefall cleanup should affect only the inactive startup state where `sortOption === null`. Active sorting and grouping may continue to steer bodies with `blendVelocity`/`setLinvel` if needed.
- Keep checklist work granular. If implementation reveals adjacent work, add a new checklist item instead of widening the current one.
- Feature-delivery remains no-tests for this loop: do not add tests, do not add test infrastructure, and do not run `npm run test`.
- Browser/runtime verification is handled manually by Rafal outside this loop. Do not block checklist progress on browser automation in this sandbox.
- `src/features/Controls.tsx` uses Drei `OrbitControls`; camera pan must stay disabled even for modifier-assisted left drags so users cannot move the scene into unsupported views.
- `src/features/Camera.tsx` remains the owner of app-controlled camera positions. Preserve auto-rotation and presentation behavior while blocking pan.
- Filtered matched items use `maxSetMatchSpeed`; unmatched/sorted-out items use `maxSetMissSpeed` and should move at least as fast as matched items, preferably slightly faster, without changing matched incoming speed.

### Preserved prior AGENTS context

- Preserve the current React + Three + React Three Fiber + Rapier architecture before redesigning visuals.
- Watch for breakpoints around Three color/light APIs, Vite asset handling, and React Three Fiber/Rapier instance behavior.
- Project constellations are `kitchen`, `portfolio`, and `tpp`; they should remain a separate right-side hover menu and should focus the project object plus related evidence items.
- Item families and visual targets: `project` box, `ai` cone with 3 radial segments, `stack` icosahedron with 0 detail, `creative` dodecahedron with 0 detail, `career` cylinder with 5 radial segments.
- Family-specific Rapier colliders should be approximate and stable. Do not chase perfect collider geometry if it risks the fall/sort/select behavior.
