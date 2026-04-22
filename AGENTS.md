Implement ONE feature task from docs/progress.md.

IMPORTANT: If all items in docs/progress.md are marked [x], you MUST output <promise>COMPLETE</promise> and stop. Do not do anything else.

## THIS ITERATION

1. Read `docs/progress.md`
2. If no `- [ ]` or `- [/]` items remain, output `<promise>COMPLETE</promise>` and stop immediately
3. Pick the first `- [ ]` or `- [/]` item
4. Read `## Findings` in `docs/progress.md` and reuse relevant discoveries
5. Parse the item:
   - Task description: everything before `|`
   - Acceptance criteria: everything after `AC:`
6. Implement only that item. If you uncover adjacent work, add a new `[ ]` item instead of widening scope
7. This repo is a no-tests repo for this loop. Do not add tests, do not add test infrastructure, and do not run `npm run test`
8. Run `npm run typecheck && npm run lint && npm run build`
9. If the task changes runtime packages, physics behavior, renderer internals, or deployment output behavior, also perform a real app smoke check and confirm there is no root runtime crash and the changed behavior works as required
10. If browser smoke testing is blocked by the environment, do not pretend it passed. Leave the task open or reopen it with `[/]`, record the blocker in `## Findings`, and move only when the checklist supports that state
11. If a required command or smoke check fails, fix the task until the acceptance criteria and required checks pass, or record the blocker precisely
12. Mark the item `[x]` only when its acceptance criteria are satisfied
13. Add brief notes to `## Findings` only when they reduce future loop risk
14. Commit all changes for the item together:
    `git add -A && git commit -m "chore: <item-name>"`
15. End the iteration. Output `<promise>COMPLETE</promise>` only when step 2 triggered

## SUCCESS = REQUIRED GATES PASS

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- for runtime package, renderer, or physics tasks, a real app smoke check with no root runtime crash and the expected behavior present

## Project Context

- Portfolio app is a small React + Three + R3F scene with Zustand state and static assets in `public/`
- Current goal on this branch is physics migration only: replace Cannon with Rapier while preserving the existing scene behavior
- Preserve the current look and interaction model before redesigning visuals or content
- The visual pool mesh is separate from the current collision shape. Use the existing hidden container layout as the first-pass behavioral reference
- Cubes must still fall from the sky into a pool-like container bounded on all sides
- Sorting and filtering behavior must remain intact after the physics migration
- Keep tasks granular. If the migration reveals extra work, add checklist items instead of widening the current one

### Preserved prior AGENTS context

- Portfolio app is a small React + Three + R3F scene with Zustand state and static assets in `public/`
- Current refresh goal is foundation only: modern toolchain, runtime compatibility, and stable automation
- Follow-up goal on `modernize`: push direct dependencies to the newest compatible stable set, especially the React 19 + Fiber/Drei/Cannon renderer stack
- Preserve current behavior before redesigning content or visuals
- Watch for breakpoints around `@react-three/cannon`, Three color APIs, and Vite asset handling
