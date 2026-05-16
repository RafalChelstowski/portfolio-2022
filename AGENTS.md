# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React portfolio app with Three.js, React Three Fiber, Rapier physics, Tailwind CSS, and Zustand. App entrypoints live in `src/main.tsx` and `src/App.tsx`. UI, camera, lighting, pool, and Rapier scene modules live in `src/features/`, with physics constants and item descriptors under `src/features/physics/`. Portfolio data is in `src/data/`, shared types in `src/types/`, state in `src/store/`, and helper functions in `src/utils/`. Static public assets, including GLTF and texture files, live in `public/`; bundled font assets live in `src/assets/`.

## Build, Test, and Development Commands

Use Node `24` and npm `11+`; run `nvm use` before installing or verifying.

- `npm ci` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Vite dev server; `npm start` is an alias. Do not start a dev server unless the user explicitly asks for it.
- `npm run typecheck` runs TypeScript with `--noEmit`.
- `npm run lint` runs the custom ESLint wrapper in `scripts/lint.mjs`.
- `npm run build` creates the production `dist/` build.
- `npm run format:check` checks Prettier formatting; `npm run format` rewrites supported files.

## Coding Style & Naming Conventions

Write TypeScript with strict compiler settings and React JSX runtime. Follow the existing component style: PascalCase components and files for React features, camelCase helpers and data exports, named exports unless an existing module uses default export. Keep Tailwind classes inline for local layout and visual styling. Let ESLint and Prettier settle formatting; avoid broad unrelated rewrites.

## Testing Guidelines

There are no committed test files yet, never add new tests unless user asks for it.

## Commit & Pull Request Guidelines

Do not create commits unless the user explicitly asks for a commit.
