# Portfolio pass-3 content cleanup

## How agents should use this note

This note is the pass-3 source of truth for the next portfolio content cleanup. Pick one checklist item per Ralph iteration.

- Pick the first unchecked task in `## Tasks`.
- Implement only that task.
- Treat this note as canonical when it conflicts with current `src/data/`.
- Preserve the existing portfolio interaction model unless a task explicitly changes it.
- Do not invent filler subtitles, descriptions, project memberships, or marketing copy.
- If a claim is uncertain, add a `// TODO:` directly above the affected source-data item.
- Mark a task `[x]` only when its acceptance criteria are satisfied and `npm run typecheck && npm run lint && npm run build` pass.

## Current source files

- `src/data/ai.ts`
- `src/data/creative.ts`
- `src/data/technologies.ts`
- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/items.ts`
- `src/types/index.ts`
- `src/features/Info.tsx`

## Pass-3 intended changes

### General content model

- `subtitle` must be optional for all items.
- `description` must be optional for all items.
- If this note omits a subtitle or description, do not re-add generic filler copy.
- Sizes are portfolio signal strength, not years of experience.

### AI items

Canonical pass-3 AI content:

- `Codex`: subtitle `my main harness for openai models`; family `ai`; size `l`; categories `['ai', 'dev']`; no project membership specified in the pass-3 source note.
- `opencode`: subtitle `my support harness for anthropic/other models`; family `ai`; size `m`; categories `['ai', 'dev']`; projects `['portfolio']`.
- `Claude Code`: no subtitle; family `ai`; size `m`; categories `['ai', 'dev']`; projects `['portfolio']`.
- `openclaw`: subtitle `several specialized agents for calendar management/workout analysis/learning/coding with ralph-loops`; family `ai`; size `s`; categories `['ai', 'dev']`; projects `['portfolio']`.
- `ralph-loop`: subtitle `iterative agent loop for turning planning notes into implementation tasks`; family `ai`; size `s`; categories `['ai', 'dev']`; projects `['portfolio']`.

### Creative items

Canonical pass-3 creative content:

- `Creative copywriting`: subtitle `language, concept, and narrative direction for interactive work`; family `creative`; size `m`; categories `['creative']`; projects `['portfolio', 'kitchen']`.
- `Adobe Creative Suite`: no subtitle; family `creative`; size `m`; categories `['creative']`; projects `['kitchen', 'portfolio']`.
- `Affinity Suite`: no subtitle; family `creative`; size `m`; categories `['creative']`; projects `['kitchen', 'portfolio']`.
- `Blender`: no subtitle; family `creative`; size `l`; categories `['creative']`; projects `['kitchen', 'portfolio']`.

### Education and continuous learning

- Work experience is broadly correct.
- The Continuous learning card should not expose a long provider/course blob by default.
- Providers and courses should be connected as separate provider/course rows.
- The provider/course list should render in a collapsed-by-default accordion-like panel.

### Technology items

Canonical pass-3 technology content:

- `React`: no subtitle; family `stack`; size `m`; categories `['dev']`; projects `['kitchen', 'portfolio', 'tpp']`.
- `Neovim / tmux / terminal / Ghostty`: subtitle `terminal/keyboard-first development environment and workflow`; family `stack`; size `m`; categories `['dev']`; no project membership specified in the pass-3 source note.
- `TypeScript`: no subtitle; family `stack`; size `s`; categories `['dev']`; projects `['kitchen', 'portfolio', 'tpp']`.
- `Three.js / React Three Fiber / other 3d technologies`: no subtitle; family `stack`; size `l`; categories `['dev', 'creative']`; projects `['kitchen', 'portfolio', 'tpp']`.
- `React Query`: no subtitle; family `stack`; size `s`; categories `['dev']`; projects `['tpp']`.
- `Zustand`: no subtitle; family `stack`; size `s`; categories `['dev']`; projects `['portfolio', 'tpp']`.

### Project items

Canonical pass-3 project content:

- `Kitchen`: subtitle `3D interactive cafeteria, recreated from lidar scans in Blender`; link `https://kitchen.vercel.app/`; family `project`; size `l`; categories `['creative']`; projects `['kitchen']`.
- `Portfolio 2026`: no subtitle; family `project`; size `m`; categories `['creative', 'dev', 'ai']`; projects `['portfolio']`.
- `Treatment Planning Platform`: subtitle `leading dentistry treatment planning app`; family `project`; size `l`; categories `['dev', 'career']`; projects `['tpp']`.

## Tasks

- [x] Normalize optional card text fields | AC: `subtitle` and `description` are treated as optional content everywhere; items may omit either field without fallback filler copy; card rendering stays stable.

- [x] Apply pass-3 dataset size corrections | AC: `opencode`, `Creative copywriting`, `React`, and `Neovim / tmux / terminal / Ghostty` use the sizes from this note; no unrelated item size changes are made.

- [x] Remove filler descriptions/subtitles not present in pass-3 note | AC: agent compares `src/data/` against this note and removes only copy that the note intentionally omits; no new marketing copy is invented.

- [x] Resolve creative tool project memberships | AC: `Adobe Creative Suite` and `Affinity Suite` are assigned to `['kitchen', 'portfolio']`; uncertainty TODO for these items is removed.

- [x] Resolve React Query project membership | AC: `React Query` remains assigned only to `['tpp']`; uncertainty TODO is removed; no extra project memberships are added.

- [x] Structure Continuous learning courses | AC: Continuous learning data stores provider/course pairs; UI renders them in a collapsed-by-default panel; existing experience card content remains readable.

- [ ] Final public-safe copy pass | AC: Treatment Planning Platform copy remains high-level and public-safe; no proprietary details, screenshots, internals, or confidential claims are added.

## Findings

- `src/types/index.ts` already defines `subtitle?: string` and `description?: string`.
- `src/features/Info.tsx` already renders `subtitle` and `description` conditionally.
- Current data still has pass-3 size drift for `opencode`, `Creative copywriting`, `React`, and `Neovim / tmux / terminal / Ghostty`.
- Current data has uncertainty TODOs for Adobe/Affinity project membership and React Query project membership.
- Existing repo has `npm run typecheck`, `npm run lint`, and `npm run build`; treat this as a no-tests feature-delivery loop and do not add tests or test infrastructure.
- Filler copy removal in pass-3 means deleting subtitle fields entirely when omitted by the note, while preserving explicit canonical replacements (for example `Codex`, `opencode`, `openclaw`, and `Kitchen` subtitle text).
- Continuous learning now uses `learningCourses: Array<{provider, course}>` in `src/data/experience.ts`, and `src/features/Info.tsx` renders it via a collapsed `<details>` panel to keep the card readable by default.
