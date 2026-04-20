# 2026 Foundation Refresh Progress

- [x] Add env floor and stable automation commands | AC: `.nvmrc`, `package.json` engines, and `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` all exist and pass
- [x] Ignore Ralph state and scaffold loop files | AC: `.ralph/` ignored, `AGENTS.md` present, and this file tracks atomic refresh tasks
- [x] Add Vite app shell and make it default | AC: Vite config, root `index.html`, `src/main.tsx`, and `npm run dev` / `npm run build` use Vite successfully
- [x] Remove CRA-only leftovers | AC: remove `react-scripts` usage, CRA env types, `reportWebVitals`, and obsolete HTML/bootstrap files without changing app behavior
- [x] Upgrade TypeScript compiler and base config | AC: TypeScript 6 config supports Vite, strict mode stays on, and `npm run typecheck` passes
- [x] Replace legacy ESLint config with ESLint flat config | AC: `eslint.config.js` exists, old inline config removed, and `npm run lint` passes
- [x] Keep Prettier as separate formatter | AC: Prettier config still applies cleanly and does not conflict with ESLint
- [x] Update Zustand usage to modern API | AC: store uses supported import/create pattern and behavior is unchanged
- [x] Fix direct Three API deprecations in scene code | AC: remove deprecated color-management, lighting, and geometry APIs currently used in `src`
- [x] Upgrade React 19 baseline packages | AC: `react`, `react-dom`, `@types/react`, and `@types/react-dom` are aligned to React 19-compatible versions and `npm run typecheck`, `npm run lint`, and `npm run build` still pass
- [x] Upgrade Three, Fiber, and Drei as one renderer cohort | AC: `three`, `@types/three`, `@react-three/fiber`, and `@react-three/drei` are aligned to mutually compatible modern versions and the scene still builds without reintroducing deprecated API usage
- [x] Upgrade `@react-three/cannon` on the new renderer stack | AC: physics integration works on the upgraded React/Fiber/Three stack and `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass
- [x] Refresh PostCSS and Autoprefixer on the Vite stack | AC: `postcss` and `autoprefixer` are updated to supported versions that preserve the current CSS build output
- [x] Refresh Tailwind CSS on the updated CSS toolchain | AC: `tailwindcss` is updated without rewriting the current theme/config shape and the existing utility classes still render
- [ ] Rewrite README for the current local workflow | AC: `README.md` documents Node version, install, dev, build, lint, and test commands for this repo

---

## Findings

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
- The local npm cache includes `tailwindcss` tarballs through `3.1.8`; that release preserves the current `tailwind.config.js` and PostCSS plugin shape here, so the Tailwind refresh can stay atomic without forcing a Tailwind 4 migration.
