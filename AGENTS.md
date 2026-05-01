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

## PASS-3 SOURCE OF TRUTH

- `docs/progress.md` is the canonical pass-3 content note for this branch.
- Preserve the existing portfolio interaction model unless a checklist task explicitly changes it.
- Do not invent filler subtitles, descriptions, project memberships, or marketing copy.
- If the pass-3 note omits a subtitle or description, remove generic filler copy rather than replacing it.
- Sizes mean current portfolio signal strength, not years of experience.
- If category, size, project membership, or copy is uncertain, put a `// TODO:` line directly above that item in the source data.
- Treatment Planning Platform copy must stay public-safe and high level. Do not add proprietary details, screenshots, product internals, or confidential claims.

## SUCCESS = REQUIRED GATES PASS

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Project Context

- Portfolio app is a small React + Three + R3F scene with Zustand state and static assets in `public/`.
- Active goal on this branch is the pass-3 portfolio content cleanup described in `docs/progress.md`: optional copy fields, dataset size corrections, removal of filler copy, resolved project memberships, structured continuous learning courses, and a final public-safe copy pass.
- Current source data lives in `src/data/ai.ts`, `src/data/creative.ts`, `src/data/technologies.ts`, `src/data/projects.ts`, `src/data/experience.ts`, and `src/data/items.ts`.
- Shared item types live in `src/types/index.ts`; card rendering lives primarily in `src/features/Info.tsx`.
- Continuous learning currently stores separate provider and course arrays in `cardFields`. The pass-3 goal is to store connected provider/course rows and render them in a collapsed-by-default panel.
- Preserve the current React + Three + React Three Fiber + Rapier architecture before redesigning visuals. Prefer small refactors that make the requested content model and UI possible.
- Main category filters are `dev`, `creative`, `ai`, `career`, plus the existing general `sort` behavior.
- Project constellations are `kitchen`, `portfolio`, and `tpp`; they should remain a separate right-side hover menu and should focus the project object plus related evidence items.
- Item family describes what an object is. Categories describe which sortable story it supports. Project constellations describe project-related evidence.
- Item families and visual targets: `project` box, `ai` cone with 3 radial segments, `stack` icosahedron with 0 detail, `creative` dodecahedron with 0 detail, `career` cylinder with 5 radial segments.
- Family-specific Rapier colliders should be approximate and stable. Do not chase perfect collider geometry if it risks the fall/sort/select behavior.
- Every item must include `family`, `size`, `categories`, and `projects` when relevant. Sizes are only `s`, `m`, or `l` and mean current portfolio signal strength, not years of experience.
- Feature-delivery remains no-tests for this loop: do not add tests, do not add test infrastructure, and do not run `npm run test`.
- Browser/runtime verification is handled manually by Rafal outside this loop. Do not block checklist progress on browser automation in this sandbox.
- Keep tasks granular. If implementation reveals adjacent work, add a new checklist item instead of widening the current one.

### Preserved prior AGENTS context

- Prior physics work migrated the scene to Rapier. Keep Rapier pool bounds, falling behavior, sorting behavior, filtering behavior, and selection behavior stable during this content/UI pass.
- The visual pool mesh is separate from the collision shape. Treat the existing hidden Rapier container layout as the first-pass behavioral reference.
- Current refresh foundation uses modern React, Three, Fiber/Drei, Vite, TypeScript, Zustand, and Rapier. Preserve runtime compatibility and stable automation.
- Watch for breakpoints around Three color/light APIs, Vite asset handling, and React Three Fiber/Rapier instance behavior.
