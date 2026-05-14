# Ralph Progress: Portfolio 2026 Public Framing

Branch: `ralph/portfolio-2022/portfolio-2026-public-framing`
Mode: feature-delivery
Source date: 2026-05-14

Ralph must implement only the public portfolio changes described here. Do not add extra portfolio facts, private/internal details, or unsupported ownership claims.

## Checklist

- [x] Update public framing and README copy | AC: `index.html` title is `Rafal Chelstowski`; metadata description exactly matches the source; visible header name remains `Rafal Chelstowski`; visible role line is `Senior Software Engineer | Creative Front-End Dev`; README reframes this as Rafal's current portfolio introduction page, mentions AI-assisted development and Ralph loops as process, and preserves existing install/development/verification documentation.
- [x] Remove direct lodash source use and direct dependencies | AC: no source file imports `lodash/isNumber.js`; all `isPresenting` guards use native `number | null` checks; `package.json` no longer lists direct `lodash` or `@types/lodash`; `package-lock.json` no longer lists those as direct root dependencies; transitive lodash-related packages are not chased or removed.
- [x] Rewrite project items | AC: `src/data/projects.ts` contains exactly these project card titles: `Kitchen`, `Rafal Chelstowski 2026`, `World-leading orthodontic software`; each has the source-specified family, size, categories, projects, subtitle, outcome, link/cardFields where specified; Align product wording stays contribution-level.
- [x] Rewrite AI capability items | AC: `src/data/ai.ts` contains exactly these AI card titles: `AI-assisted development`, `Agentic workflows`, `AI knowledge sharing`; old raw cards `Codex`, `opencode`, `Claude Code`, `openclaw`, and `ralph-loop` are absent as visible item titles; supporting tool/workshop details appear only in subtitles or `cardFields` per source.
- [x] Rewrite stack ecosystem items | AC: `src/data/technologies.ts` contains exactly these stack card titles: `React ecosystem`, `3D web ecosystem`, `Terminal-first workflow`; old granular stack titles are absent as visible item titles; tool/package names appear in `cardFields`.
- [x] Rewrite creative capability items | AC: `src/data/creative.ts` contains exactly these creative card titles: `Visual production and design tooling`, `3D asset workflow`, `Creative and narrative direction`; old app-name/copywriting card titles are absent as visible item titles; tool names appear in `cardFields` where specified.
- [x] Rewrite career and learning items | AC: `src/data/experience.ts` contains exactly the four career/timeline cards and four learning-path career cards from the source; `Itransition Group` is absent; removed visible source entries `Getback SA`, `Marketing / web / print freelancer`, `University of Wroclaw, Universite libre de Bruxelles`, `Continuous learning`, `Wes Bos`, and `Grant Abbitt` are absent as visible item/source entries; learning path cards use family `career` rather than adding a new family.
- [x] Preserve grouping and card rendering compatibility | AC: `src/data/items.ts` keeps main categories `dev`, `creative`, `ai`, `career`; keeps project constellations `kitchen`, `portfolio`, `tpp`; no new `learning` family is added; `outcome` and `cardFields` render cleanly in item cards; final enumerated visible item set totals 20 items from the source lists.
- [x] Run verification | AC: no-op test command for this no-tests feature loop succeeds; `npm run typecheck`, `npm run lint`, and `npm run build` pass; any failure is fixed or recorded under `## Findings` with exact command output summary.

## Source of truth

When the numeric summary conflicts with the enumerated item list, implement the enumerated item list. The requested visible item set is 20 cards total: 3 project, 3 AI, 3 stack, 3 creative, and 8 career/learning cards.

### Public framing

- Header name: `Rafal Chelstowski`
- Role line: `Senior Software Engineer | Creative Front-End Dev`
- Browser title: `Rafal Chelstowski`
- Metadata description: `Interactive portfolio introduction for Rafal Chelstowski, blending senior software engineering, creative front-end work, and AI-assisted development.`
- README framing:
  - Reframe the project as Rafal's current portfolio introduction page.
  - Mention AI-assisted development and Ralph loops as part of the development process.
  - Keep existing install, development, and verification documentation.

### Data model rules

- Keep the existing five item families: `project`, `ai`, `stack`, `creative`, `career`.
- Do not add a new `learning` family.
- Keep the main categories: `dev`, `creative`, `ai`, `career`.
- Keep the project constellations: `kitchen`, `portfolio`, `tpp`.
- Use existing optional item fields where useful: `subtitle`, `description`, `outcome`, `cardFields`, `learningCourses`.
- Prefer `cardFields` for supporting tools, public product names, sources, and workshops.

### Project items

#### Kitchen

- family: `project`
- size: `l`
- categories: [`creative`]
- projects: [`kitchen`]
- link: `https://kitchen.vercel.app/`
- subtitle: `Interactive 3D cafeteria recreated from LiDAR scans in Blender.`
- outcome: `Shows spatial thinking, 3D asset preparation, and playful web presentation in one small scene.`

#### Rafal Chelstowski 2026

- family: `project`
- size: `m`
- categories: [`creative`, `dev`, `ai`]
- projects: [`portfolio`]
- subtitle: `An interactive portfolio where my engineering, 3D, creative, and AI workflow threads come together.`
- outcome: `Turns a portfolio page into a navigable constellation of projects, tools, learning paths, and career evidence.`

#### World-leading orthodontic software

- family: `project`
- size: `l`
- categories: [`dev`, `career`]
- projects: [`tpp`]
- subtitle: `Senior engineering work connected to ClinCheck and Invisalign treatment-planning experiences.`
- outcome: `Contributed to public product areas including Invisalign Smile Video and In-Face Visualization.`
- cardFields:
  - `Products`: `ClinCheck, Invisalign Smile Video, In-Face Visualization`

### AI items

Replace current raw tool cards for `Codex`, `opencode`, `Claude Code`, `openclaw`, and `ralph-loop` with these capability cards.

#### AI-assisted development

- family: `ai`
- size: `l`
- categories: [`ai`, `dev`]
- projects: [`portfolio`]
- subtitle: `Using Codex as the primary coding harness, with opencode and Claude Code for supporting workflows.`

#### Agentic workflows

- family: `ai`
- size: `m`
- categories: [`ai`, `dev`]
- projects: [`portfolio`]
- subtitle: `Long-running agent loops that turn planning notes into scoped implementation work.`
- cardFields:
  - `Technique`: `Ralph loops`

#### AI knowledge sharing

- family: `ai`
- size: `m`
- categories: [`ai`, `dev`]
- projects: [`portfolio`]
- subtitle: `Practical workshops and patterns for using AI coding agents in real development work.`
- cardFields:
  - `Workshops`: `Agents code while you're away: intro to ralph-loops; Context management for AI coding agents`

### Stack items

Replace granular stack cards with ecosystem cards. Tool and package names should appear as supporting details, not as main visible item titles.

#### React ecosystem

- family: `stack`
- size: `l`
- categories: [`dev`]
- projects: [`kitchen`, `portfolio`, `tpp`]
- subtitle: `Production UI engineering with React, TypeScript, state, server-state, and testing patterns.`
- cardFields:
  - `Tools`: `React, TypeScript, Zustand, React Query`

#### 3D web ecosystem

- family: `stack`
- size: `l`
- categories: [`dev`, `creative`]
- projects: [`kitchen`, `portfolio`, `tpp`]
- subtitle: `Interactive browser graphics, scene composition, physics-driven UI, and real-time rendering.`
- cardFields:
  - `Tools`: `Three.js, React Three Fiber, Rapier`

#### Terminal-first workflow

- family: `stack`
- size: `m`
- categories: [`dev`]
- projects: [`portfolio`, `tpp`]
- subtitle: `Keyboard-first development environment for focused code navigation, automation, and agent work.`
- cardFields:
  - `Tools`: `Neovim, tmux, Ghostty`

### Creative items

Replace app-name cards with capability cards. Tool names should appear in `cardFields`.

#### Visual production and design tooling

- family: `creative`
- size: `m`
- categories: [`creative`]
- projects: [`kitchen`, `portfolio`]
- subtitle: `Design and production workflow for visuals, layouts, and supporting portfolio assets.`
- cardFields:
  - `Tools`: `Adobe Creative Suite, Affinity Suite`

#### 3D asset workflow

- family: `creative`
- size: `l`
- categories: [`creative`, `dev`]
- projects: [`kitchen`, `portfolio`]
- subtitle: `Modeling, scene thinking, and asset preparation for interactive 3D web work.`
- cardFields:
  - `Tools`: `Blender`

#### Creative and narrative direction

- family: `creative`
- size: `l`
- categories: [`creative`]
- projects: [`portfolio`, `kitchen`]
- subtitle: `Language, concept, and presentation choices that make technical work easier to understand and remember.`

### Career and learning items

Use LinkedIn or the CV as the place for complete chronology. The portfolio should carry the strongest public signals. Remove `Itransition Group` from visible data because it was a short four-month episode and adds noise here.

#### Align Technology, Senior Software Engineer

- family: `career`
- size: `l`
- categories: [`dev`, `career`]
- projects: [`tpp`]
- date: `Nov 2022`
- location: `Frankfurt am Main`
- current: `true`
- subtitle: `Current senior software engineering role in orthodontic treatment-planning software.`

#### TouK, Front-end Developer

- family: `career`
- size: `m`
- categories: [`career`, `dev`]
- projects: [`kitchen`]
- date: `Jul 2020 -> Nov 2022`
- location: `Warsaw`
- subtitle: `Front-end development work that supports the Kitchen-era project constellation.`

#### Credit Suisse, Multimedia Designer -> Senior Front-end Developer

- family: `career`
- size: `m`
- categories: [`career`, `dev`, `creative`]
- projects: []
- date: `May 2016 - Dec 2019`
- location: `Wroclaw`
- subtitle: `The bridge from multimedia and design work into serious front-end engineering.`

#### Creative and marketing background

- family: `career`
- size: `m`
- categories: [`career`, `creative`]
- projects: []
- date: `2004 - 2016`
- location: `Wroclaw, Brussels`
- subtitle: `Earlier marketing, web, print, and humanities background that still informs communication and creative direction.`
- cardFields:
  - `Includes`: `Getback, freelance marketing/web/print work, University of Wroclaw, Universite libre de Bruxelles`

#### 3D learning path

- family: `career`
- size: `m`
- categories: [`career`, `dev`, `creative`]
- projects: [`kitchen`, `portfolio`]
- subtitle: `Learning 3D programming, shaders, and browser graphics from strong industry sources.`
- cardFields:
  - `Sources`: `Pikuma, SimonDev, Bruno Simon`

#### Dev learning path

- family: `career`
- size: `m`
- categories: [`career`, `dev`]
- projects: [`portfolio`, `tpp`]
- subtitle: `Continuous modern engineering study around React, testing, server-state, and application architecture.`
- cardFields:
  - `Sources`: `Frontend Masters, Kent C. Dodds, TanStack`

#### AI learning path

- family: `career`
- size: `m`
- categories: [`career`, `ai`, `dev`]
- projects: [`portfolio`]
- subtitle: `Focused study of AI-assisted development tooling and agent-facing context workflows.`
- cardFields:
  - `Source`: `Epic MCP`

#### Design learning path

- family: `career`
- size: `m`
- categories: [`career`, `creative`]
- projects: [`portfolio`, `kitchen`]
- subtitle: `Ongoing design and production learning connected to visual tooling and asset workflows.`
- cardFields:
  - `Sources`: `LinkedIn Learning/Lynda`
  - `Tools`: `Adobe Creative Suite, Affinity Suite`

## Findings

Use this section only for blockers or review feedback. If an item is incomplete, mark it `[/]` above and add exact findings here.
