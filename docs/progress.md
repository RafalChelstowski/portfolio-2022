# Portfolio 2026 Ralph Loop

## Checklist

- [ ] Define Portfolio 2026 taxonomy and unified item model | AC: source types support `family`, `size`, `categories`, `projects`, and flexible card fields; families are `project`, `ai`, `stack`, `creative`, `career`; sizes are restricted to `s`, `m`, `l`; old `ExperienceType`/`Sets` coupling is removed from the public item model
- [ ] Rebuild project items from the source content | AC: Kitchen, Portfolio 2026, and Treatment Planning Platform exist with required family/size/categories/projects/subtitle fields; Kitchen keeps its public link; old Tactics/Project Tactics item is gone; Treatment Planning Platform copy stays public-safe and high level
- [ ] Add AI workflow items | AC: Codex, opencode, Claude Code, openclaw, and ralph-loop exist as `ai` family items with sizes/categories/projects/subtitles matching the source content
- [ ] Prune and rebuild stack items | AC: stack items match the source content; obsolete old stack entries are removed; React Query has a `// TODO:` line directly above the item noting the public/personal project membership uncertainty
- [ ] Prune and rebuild creative items | AC: creative items match the source content; Adobe Creative Suite has a `// TODO:` line directly above the item noting the project constellation uncertainty; old unrelated creative/tooling items are removed unless represented by the source content
- [ ] Rebuild career items | AC: career entries match the source content with family/size/categories/projects/date/location/current fields where provided; Align uses Senior Software Engineer title; Treatment Planning Platform and career copy remain public-safe
- [ ] Add Continuous learning as a career item | AC: Continuous learning exists with size `l`, categories `career`, `dev`, `creative`, project `portfolio`, the requested subtitle, and provider/course information renderable by the unified card model
- [ ] Generate main category groups from item data | AC: `dev`, `creative`, `ai`, and `career` filters derive matched item indexes from item `categories`; filter behavior no longer depends on old `Sets`; `sort` remains a general sort action
- [ ] Generate project constellation groups from item data | AC: `kitchen`, `portfolio`, and `tpp` constellation groups derive matched item indexes from item `projects`; each group includes the project object and related evidence items from stack/ai/creative/career families
- [ ] Update header positioning and copy | AC: header presents page name `Portfolio 2026`, role `Senior Software Engineer`, subtitle about interactive 3D web tools, creative systems, and AI-assisted engineering workflows, location `Frankfurt am Main`, and preserved LinkedIn/GitHub links
- [ ] Replace main filter UI controls | AC: visible main hover controls are `dev`, `creative`, `ai`, `career`, and `sort`; old `creative dev`, `frontend dev`, `marketing lead`, `freelancer`, and `learning` controls are gone; existing hover-based interaction remains
- [ ] Add right-side project constellation menu | AC: a separate right-side vertical hover menu exposes `kitchen`, `portfolio`, and `tpp`; hovering a project constellation focuses its grouped evidence without breaking main category filters or selection cards
- [ ] Implement one unified card renderer | AC: all families render through one flexible card model with family/category label, optional date/location, title, optional subtitle, optional description, optional outcome/impact line, optional link, and uppercase `CLOSE` action
- [ ] Add date display formatting | AC: card display uppercases month labels in date strings, preserves arrows where present, and still accepts human source strings without requiring date parsing
- [ ] Preserve pool, fall, sort, filter, hover, and selection behavior after data/UI changes | AC: items still spawn above the scene, fall into the bounded pool-like container, can be hovered, can be selected, and respond to `sort`, category filters, and project constellation filters
- [ ] Split item rendering by family-specific geometry | AC: item meshes render as project=box, ai=3-segment cone, stack=icosahedron detail 0, creative=dodecahedron detail 0, and career=5-segment cylinder while preserving the current color palette and instanced interaction behavior
- [ ] Add approximate stable Rapier colliders by family | AC: collider setup is family-aware and stable for the requested families; approximate colliders preserve fall/sort/select behavior; no collider change causes obvious instability or items escaping the pool
- [ ] Increase sorting motion speed | AC: main category and general sorting movement are visibly faster in the physics constants or steering logic while remaining stable enough for items to stay controllable
- [ ] Improve shadow coverage | AC: light/shadow settings or Drei shadow support are adjusted so the flamingo/pool scene has stronger visible shadow coverage without removing existing lighting/environment setup
- [ ] Apply basic responsive overlay cleanup | AC: header, main filters, right-side project menu, and cards avoid obvious overlap or unreadability on narrower screens using existing CSS/Tailwind patterns
- [ ] Remove obsolete `.vscode` project config | AC: `.vscode/launch.json` is deleted and no `.vscode` project config remains tracked in the working tree
- [ ] Final content and behavior audit | AC: every source item has family, size, categories, and projects field; every size is `s`, `m`, or `l`; TODO comments are present only for the specified uncertainties; no confidential Treatment Planning Platform detail is introduced; `npm run typecheck`, `npm run lint`, and `npm run build` pass

## Source Content

### Positioning

- Page name: Portfolio 2026.
- Header role: Senior Software Engineer.
- Subtitle direction: interactive 3D web tools, creative systems, and AI-assisted engineering workflows.
- Location: Frankfurt am Main.
- Keep LinkedIn and GitHub links.
- Overall story: senior software engineer building interactive 3D web tools, exploring creative ideas, and incorporating AI into everyday workflow.

### Main Categories

- `dev`
- `creative`
- `ai`
- `career`
- `sort` remains the general sorting feature.

### Item Families

- `project`: box
- `ai`: cone with 3 radial segments
- `stack`: icosahedron with 0 detail
- `creative`: dodecahedron with 0 detail
- `career`: cylinder with 5 radial segments

### Project Constellations

- `kitchen`
- `portfolio`
- `tpp`

Selecting a project constellation should pull the project object plus related evidence items into focus. Related evidence can include stack items, AI workflow items, creative skills, and relevant career items.

### Data Rules

- Every item must include family, size, categories, and projects when relevant.
- Sizes are `s`, `m`, or `l`.
- Size means current portfolio signal strength, not years of experience.
- Prune aggressively. Keep only items that support senior engineering, interactive 3D web, creative systems, AI-assisted workflow, and credible career depth.
- If category, size, project membership, or copy is uncertain, put a `// TODO:` line directly above that item in source data.
- Treatment Planning Platform must use public-safe wording and avoid proprietary details, screenshots, product internals, or confidential claims.

### Project Items

- Kitchen
  - family: project
  - size: l
  - categories: creative
  - projects: kitchen
  - subtitle: 3D interactive cafeteria
  - link: https://kitchen.vercel.app/
  - note: should stay like current project signal
- Portfolio 2026
  - family: project
  - size: m
  - categories: creative, dev, ai
  - projects: portfolio
  - subtitle: interactive 3D portfolio and creative lab
  - note: replaces old Project Tactics item
- Treatment Planning Platform
  - family: project
  - size: l
  - categories: dev, career
  - projects: tpp
  - subtitle: leading dentistry treatment planning app
  - note: keep public-safe and high level

### AI Items

- Codex
  - family: ai
  - size: l
  - categories: ai, dev
  - projects: portfolio
  - subtitle: agentic coding workflow for planning, implementation, and review
- opencode
  - family: ai
  - size: l
  - categories: ai, dev
  - projects: portfolio
  - subtitle: terminal AI coding workflow and local development automation
- Claude Code
  - family: ai
  - size: m
  - categories: ai, dev
  - projects: portfolio
  - subtitle: AI coding assistant used for implementation and codebase navigation
- openclaw
  - family: ai
  - size: s
  - categories: ai, dev
  - projects: portfolio
  - subtitle: custom or experimental AI workflow tooling
- ralph-loop
  - family: ai
  - size: s
  - categories: ai, dev
  - projects: portfolio
  - subtitle: iterative agent loop for turning planning notes into implementation tasks

### Stack Items

- React
  - family: stack
  - size: l
  - categories: dev
  - projects: kitchen, portfolio, tpp
  - subtitle: production UI engineering foundation
- Neovim / tmux / terminal / Ghostty
  - family: stack
  - size: l
  - categories: dev
  - projects: portfolio, tpp
  - subtitle: keyboard-first development environment and workflow
- TypeScript
  - family: stack
  - size: s
  - categories: dev
  - projects: kitchen, portfolio, tpp
  - subtitle: typed application development
- Three.js / React Three Fiber
  - family: stack
  - size: l
  - categories: dev, creative
  - projects: kitchen, portfolio, tpp
  - subtitle: interactive 3D web rendering
- React Query
  - TODO: confirm if React Query should connect to public/personal projects too
  - family: stack
  - size: s
  - categories: dev
  - projects: tpp
  - subtitle: server-state and data synchronization patterns
- Zustand
  - family: stack
  - size: s
  - categories: dev
  - projects: portfolio, tpp
  - subtitle: small state management for interactive UI and scenes

### Creative Items

- Creative copywriting
  - family: creative
  - size: l
  - categories: creative
  - projects: portfolio, kitchen
  - subtitle: language, concept, and narrative direction for interactive work
- Adobe Creative Suite
  - TODO: confirm whether this should connect to older career/freelance evidence only, or stay unassigned to project constellations
  - family: creative
  - size: m
  - categories: creative
  - projects: kitchen
  - subtitle: visual design and production tooling
- Affinity Suite
  - family: creative
  - size: m
  - categories: creative
  - projects: kitchen
  - subtitle: visual design and publishing tooling
- Blender
  - family: creative
  - size: l
  - categories: creative
  - projects: kitchen, portfolio
  - subtitle: 3D modeling, scene thinking, and asset creation

### Career Items

- Align Technology, Senior Software Engineer
  - family: career
  - size: l
  - categories: dev, career
  - projects: tpp
  - fromTo: Nov 2022
  - where: Frankfurt am Main
  - current: true
  - subtitle: senior software engineering on various industry-leading projects
- TouK, Front-end Developer
  - family: career
  - size: m
  - categories: career
  - projects: kitchen
  - fromTo: Jul 2020 -> Nov 2022
  - where: Warsaw
- Itransition Group, Front-end Developer
  - family: career
  - size: s
  - categories: career
  - projects: none
  - fromTo: Jan 2020 - Apr 2020
  - where: Warsaw
- Credit Suisse, Multimedia Designer -> Senior Front-end Developer
  - family: career
  - size: m
  - categories: career, dev, creative
  - projects: none
  - fromTo: May 2016 - Dec 2019
  - where: Wroclaw
- Getback SA, Marketing Specialist -> Creative Projects Lead
  - family: career
  - size: m
  - categories: career, creative
  - projects: none
  - fromTo: May 2014 - Dec 2015
  - where: Wroclaw
- Marketing / web / print freelancer
  - family: career
  - size: m
  - categories: career, creative
  - projects: none
  - fromTo: Sep 2007 - May 2016
  - where: Wroclaw
- University of Wroclaw, Universite libre de Bruxelles
  - family: career
  - size: m
  - categories: career
  - projects: none
  - fromTo: 2004 - 2011
  - where: Wroclaw, Brussels
  - description: History, Political Science
- Continuous learning
  - family: career
  - size: l
  - categories: career, dev, creative
  - projects: portfolio
  - subtitle: ongoing software, 3D, creative tooling, and AI learning
  - providers: pikuma.com multiple courses on 3D programming; frontend masters multiple courses on software engineering topics; simondev courses on math and shaders for web/game dev; Bruno Simon three.js journey; LinkedIn Learning/Lynda courses on Blender and Substance Painter; Grant Abbitt Blender courses; Wes Bos web dev courses; Kent C. Dodds Epic React, Epic Web, Epic MCP, Testing JavaScript; Tanstack React Query Essentials

### Card Model

Use one flexible card model across item families:

- family/category label on top
- optional year/date/location
- title
- optional subtitle
- optional description
- optional outcome/impact line
- optional link
- uppercase CLOSE action

Project cards should support an outcome/impact line, especially Kitchen and Treatment Planning Platform.

### UI and Interaction Notes

- Main category filters remain the primary sorting controls.
- Project constellations should be a separate right-side vertical menu with similar hover-based sorting behavior.
- Keep the current interaction model unless a task explicitly changes it.
- Basic responsive behavior is enough for this pass: controls and cards must not overlap or become unreadable.

### Physics and Visual Notes

- Preserve the pool-like container behavior.
- Items must still fall from the sky into the pool-like container bounded on all sides.
- Family-specific shapes should stay in the current color palette.
- Family-specific colliders should be approximate and stable, not perfect.
- Preserve sorting, filtering, selection, hover, and pool behavior before visual redesign.
- Increase shadow box or shadow coverage so the flamingo casts a visible shadow; check whether Drei baked shadows help or whether current light/shadow settings are enough.
- Increase speed of items while sorting through main categories.
- Remove `.vscode` because it is obsolete.

## Findings

- No findings yet.
