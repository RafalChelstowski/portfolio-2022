Implement ONE feature task from docs/progress.md.

IMPORTANT: If all items in docs/progress.md are marked [x], you MUST output <promise>COMPLETE</promise> and stop. Do not do anything else.

## THIS ITERATION

1. Read `docs/progress.md`
2. If no `- [ ]` or `- [/]` items remain -> output `<promise>COMPLETE</promise>` and stop immediately
3. Pick first `- [ ]` or `- [/]` item
4. Read `## Findings` in `docs/progress.md` and reuse relevant discoveries
5. Parse item:
   - Task description: everything before `|`
   - Acceptance criteria: everything after `AC:`
6. Implement only that item. If you uncover adjacent work, add a new `[ ]` item instead of widening scope.
7. Run `npm run test && npm run typecheck && npm run lint && npm run build`
8. If a command fails, fix the item until all four commands pass
9. Mark item `[x]` when finished
10. Add brief notes to `## Findings` only when they reduce future loop risk
11. Commit all changes for the item together:
    `git add -A && git commit -m "chore: <item-name>"`
12. End iteration. Output `<promise>COMPLETE</promise>` only when step 2 triggered.

## SUCCESS = ALL FOUR PASS

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Project Context

- Portfolio app is a small React + Three + R3F scene with Zustand state and static assets in `public/`
- Current refresh goal is foundation only: modern toolchain, runtime compatibility, and stable automation
- Preserve current behavior before redesigning content or visuals
- Watch for breakpoints around `@react-three/cannon`, Three color APIs, and Vite asset handling
