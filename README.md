# Rafal Chelstowski Portfolio

Rafal Chelstowski's current portfolio introduction page, built as an interactive
React, Vite, Three.js, React Three Fiber, and Zustand app.

The project is developed with AI-assisted development workflows, including Ralph
loops that turn scoped progress notes into implementation passes while keeping
the public portfolio framing explicit.

## Requirements

- Node `24` via `.nvmrc`
- npm `11` or newer

Match the expected runtime with:

```bash
nvm use
```

## Install

Install dependencies from the project root:

```bash
npm ci
```

When intentionally changing dependencies, use `npm install` and commit the
resulting lockfile update.

## Local Development

Start the Vite development server:

```bash
npm run dev
```

`npm start` is kept as an alias for `npm run dev`.

## Verification

Run the required local checks before shipping changes:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

## Script Reference

- `npm run dev` starts the local Vite dev server
- `npm start` aliases the dev server command
- `npm run test` runs the current Node test command
- `npm run typecheck` runs TypeScript without emitting files
- `npm run lint` runs the repo ESLint check
- `npm run build` creates a production build in `dist/`
- `npm run format` applies Prettier to supported files
- `npm run format:check` verifies formatting without changing files
