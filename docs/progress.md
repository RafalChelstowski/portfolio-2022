# 2026 Foundation Refresh Progress

- [x] Add env floor and stable automation commands | AC: `.nvmrc`, `package.json` engines, and `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` all exist and pass
- [ ] Ignore Ralph state and scaffold loop files | AC: `.ralph/` ignored, `AGENTS.md` present, and this file tracks atomic refresh tasks
- [ ] Add Vite app shell and make it default | AC: Vite config, root `index.html`, `src/main.tsx`, and `npm run dev` / `npm run build` use Vite successfully
- [ ] Remove CRA-only leftovers | AC: remove `react-scripts` usage, CRA env types, `reportWebVitals`, and obsolete HTML/bootstrap files without changing app behavior
- [ ] Upgrade TypeScript compiler and base config | AC: TypeScript 6 config supports Vite, strict mode stays on, and `npm run typecheck` passes
- [ ] Replace legacy ESLint config with ESLint flat config | AC: `eslint.config.js` exists, old inline config removed, and `npm run lint` passes
- [ ] Keep Prettier as separate formatter | AC: Prettier config still applies cleanly and does not conflict with ESLint
- [ ] Replace CRA test runner with Vitest setup | AC: Vitest + jsdom + Testing Library configured and `npm run test` exits 0
- [ ] Add first smoke test for app shell | AC: one app render test passes under Vitest
- [ ] Add one focused unit test for store behavior | AC: one small Zustand test passes under Vitest
- [ ] Update Zustand usage to modern API | AC: store uses supported import/create pattern and behavior is unchanged
- [ ] Fix direct Three API deprecations in scene code | AC: remove deprecated color-management, lighting, and geometry APIs currently used in `src`
- [ ] Upgrade React, Three, Fiber, Drei, and Cannon together | AC: app builds on React 19 + Fiber 9 + Drei 10 + Three 0.184 + Cannon 6.6 with scene behavior preserved
- [ ] Refresh Tailwind/PostCSS on Vite stack | AC: Tailwind/PostCSS versions support the Vite build and current utility classes still render
- [ ] Refresh repo docs for new workflow | AC: `README.md` documents Node version and dev/build/test/lint commands

---

## Findings

- `@react-three/cannon@6.6.0` declares `react >=18` and `@react-three/fiber >=8`, so it does not hard-block the React 19 / Fiber 9 target.
- Vite 8 requires Node `^20.19.0 || >=22.12.0`; `.nvmrc` therefore targets Node 24 for a stable LTS baseline.
- CRA's Jest wrapper exits non-zero without tests unless `CI=true react-scripts test --watchAll=false --passWithNoTests` is used, which keeps the required automation command stable until the Vitest migration task.
