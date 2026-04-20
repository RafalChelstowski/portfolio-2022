# 2026 Foundation Refresh Progress

- [x] Add env floor and stable automation commands | AC: `.nvmrc`, `package.json` engines, and `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` all exist and pass
- [x] Ignore Ralph state and scaffold loop files | AC: `.ralph/` ignored, `AGENTS.md` present, and this file tracks atomic refresh tasks
- [x] Add Vite app shell and make it default | AC: Vite config, root `index.html`, `src/main.tsx`, and `npm run dev` / `npm run build` use Vite successfully
- [x] Remove CRA-only leftovers | AC: remove `react-scripts` usage, CRA env types, `reportWebVitals`, and obsolete HTML/bootstrap files without changing app behavior
- [x] Upgrade TypeScript compiler and base config | AC: TypeScript 6 config supports Vite, strict mode stays on, and `npm run typecheck` passes
- [x] Replace legacy ESLint config with ESLint flat config | AC: `eslint.config.js` exists, old inline config removed, `npm run lint` passes, and the lint command covers repo-level config files used by the build/toolchain
- [x] Keep Prettier as separate formatter | AC: Prettier config still applies cleanly and does not conflict with ESLint
- [x] Update Zustand usage to modern API | AC: store uses supported import/create pattern and behavior is unchanged
- [x] Fix direct Three API deprecations in scene code | AC: remove deprecated color-management, lighting, and geometry APIs currently used in `src`
- [x] Upgrade React 19 baseline packages | AC: `react`, `react-dom`, `@types/react`, and `@types/react-dom` are aligned to React 19-compatible versions and `npm run typecheck`, `npm run lint`, and `npm run build` still pass
- [x] Reopen Three, Fiber, and Drei renderer cohort for React 19 runtime compatibility | AC: `@react-three/fiber` is on a React-19-compatible stable version, `@react-three/drei` is on a mutually compatible stable version, opening the local app no longer throws `ReactCurrentBatchConfig`, and `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass
- [x] Upgrade `@react-three/cannon` and remaining renderer peers to newest compatible stable versions | AC: `@react-three/cannon`, `three`, and required physics/runtime peers are on the newest compatible stable versions practical for this repo, the scene still initializes, and `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass
- [x] Clean the direct dependency graph to newest compatible stable releases | AC: direct app/build dependencies are on the newest compatible stable versions practical here, `npm ls react react-dom @react-three/fiber @react-three/drei @react-three/cannon three scheduler` exits without invalid or extraneous shipped-app dependency errors, and any intentional hold-backs are recorded in `## Findings`
- [x] Refresh PostCSS and Autoprefixer on the Vite stack | AC: `postcss` and `autoprefixer` are updated to supported versions that preserve the current CSS build output
- [x] Refresh Tailwind CSS on the updated CSS toolchain | AC: `tailwindcss` is updated without rewriting the current theme/config shape and the existing utility classes still render
- [x] Rewrite README for the current local workflow | AC: `README.md` documents Node version, install, dev, build, lint, and test commands for this repo

---

## Findings

- On Monday, 20 April 2026, the validated React 19 renderer cohort here is `@react-three/fiber@9.6.0`, `@react-three/drei@10.7.7`, `@react-three/cannon@6.6.0`, `three@0.184.0`, and `zustand@5.0.12`; with small source updates, `npm ls`, `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass.
- `@react-three/gltfjsx` was not imported anywhere in the app and was only acting as a stale generator dependency with React 17-era transitive packages; removing it was necessary to make the shipped-app dependency graph clean under React 19.
- Rafal manually confirmed on Monday, 20 April 2026 that the upgraded renderer cohort reaches first render in a real local browser smoke check without the prior `ReactCurrentBatchConfig` or root runtime crash; the exact browser/tool was not recorded in chat.
- `@react-three/fiber@8.12.0` with `react@19.2.5` can pass `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` yet still crash at runtime with `Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')`; renderer tasks need a real app smoke check before closing.
- React 19.2 compatibility landed in `@react-three/fiber v9.5.0`; treating any `v8.x` renderer build as a valid React 19 end state is unsafe.
- `npm ls react react-dom @react-three/fiber @react-three/drei @react-three/cannon three scheduler` is a useful gate in this repo because it surfaces invalid peer/reconciler relationships and stale extraneous packages even when the bundle builds.
- As of Monday, 20 April 2026, npm lists `@react-three/cannon 6.6.0` as latest stable and `@react-three/drei 10.7.x` as latest stable; the follow-up loop should target newest compatible stable versions rather than stopping at the first passing build.

- `@react-three/cannon@6.6.0` declares `react >=18` and `@react-three/fiber >=8`, so it does not hard-block the React 19 / Fiber 9 target.
- Vite 8 requires Node `^20.19.0 || >=22.12.0`; `.nvmrc` therefore targets Node 24 for a stable LTS baseline.
- `node --test` exits 0 when no tests are present, which keeps the required automation command stable after removing `react-scripts` without adding harness overhead this early.
- Vite respects the TypeScript `target` for esbuild transpilation; leaving CRA's `es5` target in place breaks `vite build` on modern TS entrypoints.
- `package.json` can claim Vite is installed while `package-lock.json` and `node_modules` disagree; verify `node_modules/vite` is not a cross-repo symlink and that the lockfile contains `node_modules/vite` before treating the app-shell task as done.
- TypeScript 6 with `verbatimModuleSyntax` turns several former value imports into hard errors; files that only consume interfaces or type aliases need `import type` cleanup before `npm run typecheck` will pass.
- ESLint `8.2.0` in this repo does not natively execute `eslint.config.js`; the flat-config task therefore uses a small Node runner that resolves the flat config through ESLint internals and preserves `npm run lint` until ESLint itself is upgraded later.
- Prettier `2.6.2` errors on unknown dotfiles like `.prettierignore` when invoked on `.`; use `--ignore-unknown` in standalone format scripts so Prettier can stay separate from ESLint without brittle file globs.
- `zustand@4.0.0-rc.1` in this repo still types `create` as the default export, so this pass modernizes the store to the v4 curried `create<T>()(initializer)` pattern without widening scope into a package upgrade.
- Three scene code can bridge old and new renderer/texture APIs safely with runtime feature detection, which lets us remove deprecated JSX usage now without forcing the React/Fiber/Three upgrade task early.
- The remaining runtime work is safer as three dependency cohorts: React first, then Three/Fiber/Drei, then `@react-three/cannon`.
- The CSS toolchain refresh is safer as PostCSS/Autoprefixer first and Tailwind second, so one failed package bump does not block the whole styling stack.
- This sandbox currently cannot resolve `registry.npmjs.org` from `npm` (`npm install react@19 --verbose` fails with `ENOTFOUND`), so real dependency upgrades require cached tarballs or a network-enabled loop.
- When sandbox policy blocks writes to `~/.npm`, cached runtime upgrades can still proceed by extracting tarballs directly from `~/.npm/_cacache/content-v2`; React 19 and `scheduler@0.27.0` were recoverable this way.
- Cached tarball extraction in this sandbox can preserve non-executable directory permissions; after unpacking packages into `node_modules`, run `chmod -R u+rwX,go+rX` on the extracted directories so Vite can resolve their `dist/` entrypoints.
- `@react-three/cannon@6.5.2` can be upgraded offline from the npm cache here, but it now expects a top-level `cannon-es@0.20.0` install because the lockfile no longer nests that dependency under the package entry.
- The cached CSS toolchain tops out at `postcss@8.4.16` here, so this refresh keeps PostCSS pinned there and bumps `autoprefixer` to the newest cached compatible release instead of widening scope into the Tailwind task.
- `npm run lint` currently only walks `src/**/*.ts?(x)` via `scripts/lint.mjs`, so repo-level files such as `vite.config.ts` and `eslint.config.js` can change without being linted; reopen the flat-config task until the lint surface matches the repo changes.
- The local npm cache includes `tailwindcss` tarballs through `3.1.8`; that release preserves the current `tailwind.config.js` and PostCSS plugin shape here, so the Tailwind refresh can stay atomic without forcing a Tailwind 4 migration.
- The repo still carries legacy `build/` output alongside Vite `dist/`; the flat-config lint runner should ignore both generated directories or it will end up parsing bundled artifacts instead of just source and toolchain files.
- Cached npm packuments now report `@react-three/fiber@9.6.0` and `@react-three/drei@10.7.7` as the latest stable releases visible on this machine; use those as the current upgrade targets when package artifacts become available.
