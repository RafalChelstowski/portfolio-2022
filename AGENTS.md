# AGENTS.md - Ralph Feature Loop

You are Codex working inside the `portfolio-2022` repository on a Ralph feature-delivery loop.

## Mission

Implement the next unchecked task in `docs/progress.md`. Continue until all checklist items are complete. Output `<promise>RALPH_DOCS_PROGRESS_COMPLETE</promise>` only when no `- [ ]` or `- [/]` items remain in `docs/progress.md`.

This is a public portfolio framing/data rewrite. Preserve Rafal's public/work boundaries: no secrets, no private client details, no internal-only details, and no unsupported ownership claims.

## Project Context

This is a Vite React portfolio app with Three.js, React Three Fiber, Rapier physics, Tailwind CSS, Zustand, and TypeScript.

- App entrypoints: `src/main.tsx`, `src/App.tsx`
- Public HTML metadata: `index.html`
- Header/filter UI: `src/features/UI.tsx`
- Item card UI: `src/features/Info.tsx`
- Portfolio data: `src/data/`
- Shared item types: `src/types/index.ts`
- Source item grouping: `src/data/items.ts`
- Presentation state: `src/store/store.ts` where `isPresenting` is `number | null`

Follow existing style: named exports, strict TypeScript, small local changes, Tailwind classes inline where current code already uses them.

## Non-Negotiable Guardrails

- Use `docs/progress.md` as the source of truth.
- Do not add extra portfolio facts not listed in `docs/progress.md`.
- Do not reintroduce removed items just because they still exist in old source files.
- Do not turn product references into ownership claims.
- Use contribution-level wording for Align, ClinCheck, Invisalign Smile Video, and In-Face Visualization.
- Keep exact item titles and subtitles from `docs/progress.md` unless implementation reveals a clear typo or type mismatch.
- Keep the existing five item families only: `project`, `ai`, `stack`, `creative`, `career`.
- Do not add a new `learning` family.
- Keep main categories: `dev`, `creative`, `ai`, `career`.
- Keep project constellations: `kitchen`, `portfolio`, `tpp`.
- If the text says 16 visible items but the enumerated cards total 20, implement the enumerated 20-card set.
- Do not add new tests or test infrastructure in this feature-delivery loop.
- Do not make browser/runtime smoke checks an automated gate; note manual presentation review separately if useful.

## Implementation Notes

- Replace direct `lodash/isNumber.js` checks with native `number | null` checks. For example, use `state.isPresenting !== null` or `isPresenting === null` as appropriate.
- Remove only direct root dependencies `lodash` and `@types/lodash`. Do not chase transitive packages such as `lodash.merge`.
- When changing dependencies, update `package-lock.json` using npm. In sandbox contexts, prefer `npm install --cache /workspace/.cache/npm` for intentional dependency changes.
- Prefer `cardFields` for supporting tools, public product names, sources, and workshops.
- `outcome` and `cardFields` are already supported by the item type and card renderer; adjust rendering only if needed to display the prepared source cleanly.
- Keep `src/data/items.ts` grouping behavior compatible unless a small change is necessary for the final categories and project constellations.
- Keep README install, development, script reference, and verification documentation intact while updating the opening framing.

## Progress Discipline

For each task:

1. Inspect relevant files before editing.
2. Make the smallest coherent change.
3. Update the matching checkbox in `docs/progress.md` from `[ ]` to `[x]` only after its acceptance criteria are satisfied.
4. If blocked or partially complete, use `[/]` and add exact notes under `## Findings`.
5. Keep unrelated formatting churn out of the diff.

## Verification

This repository currently has no committed tests for this feature loop. Do not add tests or test infrastructure. Use this no-op test command for the Ralph checklist test slot:

```bash
node -e "console.log('no committed tests for this feature loop')"
```

Required verification before completion:

```bash
npm run typecheck
npm run lint
npm run build
```

If dependencies are not installed or stale, run:

```bash
npm ci --cache /workspace/.cache/npm
```

If a command fails, fix the issue before marking verification complete. If an external/environmental problem prevents verification, mark the verification item `[/]` and record the exact blocker under `## Findings`.

## Completion Rule

Do not emit the completion promise until:

- every checklist item in `docs/progress.md` is `[x]`
- there are no `[/]` findings left unresolved
- the required verification commands have passed or an explicit blocker is recorded
