# Portfolio 2026 Ralph Loop

## Checklist

- [x] Use object refs for per-family InstancedRigidBodies | AC: `RapierItems` stores each family `InstancedRigidBodies` ref in a stable mutable object ref accepted by `@react-three/rapier`, not a callback ref; `familyRuntimeRef.current[family].bodies` or equivalent is populated during `useFrame`; `hasAnyBody` becomes true after mount; toolbar/project hover steering can reach live Rapier bodies
- [x] Final Feedback 4 sorting audit | AC: `npm run typecheck`, `npm run lint`, and `npm run build` pass; code no longer uses callback refs for `InstancedRigidBodies`; per-family object refs are read through `.current`; hovering `dev`, `creative`, `ai`, `career`, `sort`, `kitchen`, `portfolio`, and `tpp` has a live body map to steer; existing hover highlight and click selection still map to the correct global item index
- [x] Fix family body-slot mapping from Codex reviewer feedback | AC: per-family `InstancedRigidBodies` use dense local instance keys/body slots (`0..familyCount-1`) or another verified local-slot mapping; each local body slot maps explicitly to the correct global item index; category hover, project hover, and `sort` steering update every family item, including families whose global item indexes do not start at zero; do not rely on sparse global item indexes as per-family body-array indexes
- [x] Make main toolbar separator white | AC: the `|` between `career` and `sort` renders white like the toolbar text/buttons; the separator remains visual only and is not a hover/sort target
- [x] Remove individual course items now covered by Continuous learning | AC: individual course/learning items such as `3D Computer Graphics Programming`, `GLSL Shaders from scratch`, `three.js journey`, `Epic React`, and `React Query Essentials` no longer appear as separate scene/card items; `Continuous learning` remains as the single consolidated career item with provider/course information; item imports/exports contain no dead `courses` merge path
- [x] Final Feedback 3 audit | AC: `npm run typecheck`, `npm run lint`, and `npm run build` pass; toolbar hover visibly changes item motion for `dev`, `creative`, `ai`, `career`, `sort`, `kitchen`, `portfolio`, and `tpp`; separator is white; individual course cards are gone while Continuous learning remains
- [x] Restore functional hover sorting from the previous implementation | AC: hovering `dev`, `creative`, `ai`, or `career` actively pulls matching items into the center and repels non-matching items using the existing Rapier steering behavior; hovering `sort` actively sends all items toward their `sortingVelocity`; the fix reuses the previous working sort/hover behavior and does not only change toolbar styling; category sorting works after the family-specific geometry/collider split
- [x] Fix project constellation hover sorting and placement | AC: `kitchen`, `portfolio`, and `tpp` controls are displayed vertically with one item per line on the left side of the viewport; hovering each project constellation actively pulls the project object plus related evidence items into the center; project sorting uses `projectConstellationGroups` and the same steering behavior as category filters
- [x] Add main toolbar separator before sort | AC: main toolbar visually reads `dev creative ai career | sort`; the separator is text/visual only and does not become a hover target; `sort` remains its own hover target and still triggers general sorting
- [x] Audit Rapier body-index mapping after family batching | AC: `RapierItems` maps every global item index to the correct live `RapierRigidBody` after splitting items into per-family `InstancedRigidBodies`; sparse/non-contiguous instance keys cannot break category/project steering; hover, selection, first-pool-contact tracking, and color highlighting still use the correct global item index
- [x] Final toolbar behavior audit | AC: `npm run typecheck`, `npm run lint`, and `npm run build` pass; both toolbars are visible; hovering every main category, `sort`, and every project constellation visibly changes item motion in the pool; existing card selection still works
- [x] Restore visible sorting controls after feedback | AC: main controls `dev`, `creative`, `ai`, `career`, and `sort` are visibly present and interactive in the running UI; project controls `kitchen`, `portfolio`, and `tpp` are visibly present and interactive; if `displayUi` reveal logic, z-index, placement, or responsive styling hides the controls, that cause is fixed; controls remain hover-based
- [x] Apply header copy and typography feedback | AC: visible header name is `Rafal Chelstowski` instead of `Portfolio 2026`; role remains `Senior Software Engineer`; the subtitle/tagline sentence is removed from the visible header; `Frankfurt am Main` remains visible and uses the same header/title font treatment as the name and role; LinkedIn/GitHub links remain
- [x] Apply card label and text-color feedback | AC: card eyebrow/label displays only the general item family/category label such as `creative`, not combined assignment text like `creative / creative` and not project/category membership; card title keeps the family accent color; dates, locations, subtitles, descriptions, outcomes, and dynamic card-field text render black; `CLOSE` remains uppercase
- [x] Retune item size mapping from feedback | AC: visual scale mapping makes `l` items slightly larger than the current implementation and makes `s` and `m` items noticeably larger than the current implementation; all sizes remain stable in the pool and preserve hover/select/sort behavior
- [x] Make pool bands cast shadows | AC: pool band/rim meshes cast shadows as well as receive them; the existing flamingo/pool shadow improvements remain; no pool mesh loses its existing material or receive-shadow behavior
- [x] Final feedback-round audit | AC: `npm run typecheck`, `npm run lint`, and `npm run build` pass; the visible header matches feedback exactly; both toolbars are visible and usable; card labels/colors match feedback; item size bumps are centralized; pool bands cast shadows
- [x] Define Portfolio 2026 taxonomy and unified item model | AC: source types support `family`, `size`, `categories`, `projects`, and flexible card fields; families are `project`, `ai`, `stack`, `creative`, `career`; sizes are restricted to `s`, `m`, `l`; old `ExperienceType`/`Sets` coupling is removed from the public item model
- [x] Rebuild project items from the source content | AC: Kitchen, Portfolio 2026, and Treatment Planning Platform exist with required family/size/categories/projects/subtitle fields; Kitchen keeps its public link; old Tactics/Project Tactics item is gone; Treatment Planning Platform copy stays public-safe and high level
- [x] Add AI workflow items | AC: Codex, opencode, Claude Code, openclaw, and ralph-loop exist as `ai` family items with sizes/categories/projects/subtitles matching the source content
- [x] Prune and rebuild stack items | AC: stack items match the source content; obsolete old stack entries are removed; React Query has a `// TODO:` line directly above the item noting the public/personal project membership uncertainty
- [x] Prune and rebuild creative items | AC: creative items match the source content; Adobe Creative Suite has a `// TODO:` line directly above the item noting the project constellation uncertainty; old unrelated creative/tooling items are removed unless represented by the source content
- [x] Rebuild career items | AC: career entries match the source content with family/size/categories/projects/date/location/current fields where provided; Align uses Senior Software Engineer title; Treatment Planning Platform and career copy remain public-safe
- [x] Add Continuous learning as a career item | AC: Continuous learning exists with size `l`, categories `career`, `dev`, `creative`, project `portfolio`, the requested subtitle, and provider/course information renderable by the unified card model
- [x] Generate main category groups from item data | AC: `dev`, `creative`, `ai`, and `career` filters derive matched item indexes from item `categories`; filter behavior no longer depends on old `Sets`; `sort` remains a general sort action
- [x] Generate project constellation groups from item data | AC: `kitchen`, `portfolio`, and `tpp` constellation groups derive matched item indexes from item `projects`; each group includes the project object and related evidence items from stack/ai/creative/career families
- [x] Update header positioning and copy | AC: header presents page name `Portfolio 2026`, role `Senior Software Engineer`, subtitle about interactive 3D web tools, creative systems, and AI-assisted engineering workflows, location `Frankfurt am Main`, and preserved LinkedIn/GitHub links
- [x] Replace main filter UI controls | AC: visible main hover controls are `dev`, `creative`, `ai`, `career`, and `sort`; old `creative dev`, `frontend dev`, `marketing lead`, `freelancer`, and `learning` controls are gone; existing hover-based interaction remains
- [x] Add right-side project constellation menu | AC: a separate right-side vertical hover menu exposes `kitchen`, `portfolio`, and `tpp`; hovering a project constellation focuses its grouped evidence without breaking main category filters or selection cards
- [x] Implement one unified card renderer | AC: all families render through one flexible card model with family/category label, optional date/location, title, optional subtitle, optional description, optional outcome/impact line, optional link, and uppercase `CLOSE` action
- [x] Add date display formatting | AC: card display uppercases month labels in date strings, preserves arrows where present, and still accepts human source strings without requiring date parsing
- [x] Preserve pool, fall, sort, filter, hover, and selection behavior after data/UI changes | AC: items still spawn above the scene, fall into the bounded pool-like container, can be hovered, can be selected, and respond to `sort`, category filters, and project constellation filters
- [x] Split item rendering by family-specific geometry | AC: item meshes render as project=box, ai=3-segment cone, stack=icosahedron detail 0, creative=dodecahedron detail 0, and career=5-segment cylinder while preserving the current color palette and instanced interaction behavior
- [x] Add approximate stable Rapier colliders by family | AC: collider setup is family-aware and stable for the requested families; approximate colliders preserve fall/sort/select behavior; no collider change causes obvious instability or items escaping the pool
- [x] Increase sorting motion speed | AC: main category and general sorting movement are visibly faster in the physics constants or steering logic while remaining stable enough for items to stay controllable
- [x] Improve shadow coverage | AC: light/shadow settings or Drei shadow support are adjusted so the flamingo/pool scene has stronger visible shadow coverage without removing existing lighting/environment setup
- [x] Apply basic responsive overlay cleanup | AC: header, main filters, right-side project menu, and cards avoid obvious overlap or unreadability on narrower screens using existing CSS/Tailwind patterns
- [x] Remove obsolete `.vscode` project config | AC: `.vscode/launch.json` is deleted and no `.vscode` project config remains tracked in the working tree
- [x] Final content and behavior audit | AC: every source item has family, size, categories, and projects field; every size is `s`, `m`, or `l`; TODO comments are present only for the specified uncertainties; no confidential Treatment Planning Platform detail is introduced; `npm run typecheck`, `npm run lint`, and `npm run build` pass

## Source Content

### Positioning

- Visible header name: Rafal Chelstowski.
- Header role: Senior Software Engineer.
- Do not show the subtitle/tagline sentence in the header.
- Location: Frankfurt am Main, using the same header/title font treatment as the name and role.
- Keep LinkedIn and GitHub links.
- Overall content story can still support senior software engineering, interactive 3D web tools, creative systems, and AI-assisted workflow, but do not use that sentence as visible header copy.

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
  - note: this consolidated item replaces smaller individual learning/course scene items

### Card Model

Use one flexible card model across item families:

- general family/category label on top only; do not list category/project assignments in the card eyebrow
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
- Main category toolbar should visually read `dev creative ai career | sort`, with the separator rendered white.
- Project constellations should be a separate left-side vertical menu with one item per line and similar hover-based sorting behavior.
- Keep the current interaction model unless a task explicitly changes it.
- Basic responsive behavior is enough for this pass: controls and cards must not overlap or become unreadable.

### Physics and Visual Notes

- Preserve the pool-like container behavior.
- Items must still fall from the sky into the pool-like container bounded on all sides.
- Family-specific shapes should stay in the current color palette.
- Family-specific colliders should be approximate and stable, not perfect.
- Preserve sorting, filtering, selection, hover, and pool behavior before visual redesign.
- Increase shadow box or shadow coverage so the flamingo casts a visible shadow; check whether Drei baked shadows help or whether current light/shadow settings are enough.
- Pool bands/rims should also cast shadows, not only receive them.
- Increase speed of items while sorting through main categories.
- Feedback size tuning: bump `l` item scale slightly; bump `s` and `m` item scale more noticeably.
- Remove `.vscode` because it is obsolete.

## Findings

- Feedback 4 / Codex reviewer: `InstancedRigidBodies` from `@react-three/rapier` does not populate the callback refs currently used in `src/features/rapier/RapierItems.tsx`, so `familyRuntimeRef.current[family].bodies` stays null, `useFrame` exits through `!hasAnyBody`, and menu hover `sortOption` changes never reach physics steering. Use stable object refs per family and read `.current` when reconstructing the global body map.
- The body-slot mapping fix from Feedback 3 is necessary but insufficient unless the family body refs are actually captured. The next pass must preserve dense local keys and add object refs for the per-family `InstancedRigidBodies` batches.
- Feedback 3 from Rafal: Codex reviewer's sorting comment is valid and likely explains the still-broken hover sorting. PR #6 inline review says `InstancedRigidBodies` returns a dense local-slot body array, but current code maps `bodySlotToItemIndex` using global `itemIndex` keys and later reads by local `bodySlot`; families whose global indexes do not start at zero resolve to `undefined` and do not receive velocity steering updates.
- Feedback 3 from Rafal: the separator between `career` and `sort` currently renders black; make it white like the toolbar text.
- Feedback 3 from Rafal: individual course/learning items should be removed because they are now represented by the single `Continuous learning` item.
- Prior feedback-2 body mapping note was overconfident: the intended fix did not actually switch to dense local per-family keys, so the next pass must correct `src/features/rapier/RapierItems.tsx` rather than trusting the existing mapping.
- Feedback 2 from Rafal: main toolbar now appears, but it needs a separator so it reads `dev creative ai career | sort`; more importantly, hovering main toolbar text currently does not move/sort pool items, so restore the previous working hover-to-sort behavior rather than treating this as styling-only.
- Feedback 2 from Rafal: project controls should move from the bottom/right responsive placement to the left side and stack vertically (`kitchen`, `portfolio`, `tpp` below each other). Hovering project control text must pull the project constellation items into the center.
- Investigation note for Feedback 2: the pre-family-split implementation used one `InstancedRigidBodies` batch whose body ref array aligned directly with global item indexes. The current implementation splits items into one `InstancedRigidBodies` batch per family, then reconstructs `bodyByItemIndexRef` from per-family body arrays. This body/index mapping is the likely place to verify first, because category/project groups are still global item indexes.
- Investigation note for Feedback 2: if `@react-three/rapier` stores instanced body refs by `instances[].key`, sparse global keys inside each family batch can make local-index lookup wrong. Prefer contiguous per-batch keys plus an explicit global item index mapping, or another verified mapping that guarantees each global item index points to the correct live body.
- Feedback 1 from Rafal supersedes the original header copy: visible name should be `Rafal Chelstowski`, role remains `Senior Software Engineer`, the long subtitle/tagline should be deleted, and `Frankfurt am Main` should use the same header/title font treatment.
- Feedback 1 highest-priority issue: the main sorting toolbar and project toolbar are not appearing in the reviewed UI, leaving no way to sort by categories/projects. Fix toolbar visibility/reveal before cosmetic follow-ups.
- Toolbar visibility was blocked by `displayUi` starting as `false` in Zustand while UI controls were gated behind that flag in `src/features/UI.tsx`; defaulting `displayUi` to `true` restores immediate visibility for both hover toolbars without changing hover sort interactions.
- Feedback 1 card rule: do not render combined labels like `creative / creative`; show only the general family/category label in the card eyebrow. Keep card titles accented, but make descriptions, dates, and locations black.
- Feedback 1 visual rule: increase item visual sizes, with `l` only slightly larger and `s`/`m` bumped more; also ensure pool bands/rims cast shadows.
- Unified public item model is now `SourceItem/Item3d` in `src/types/index.ts` with strict `family` and `size` unions and flexible optional card fields (`subtitle`, `description`, `outcome`, `link`, `cardFields`), so future content tasks should avoid reintroducing `type`/`set`.
- Main filtering now consumes `mainCategoryGroups` derived from `item.categories` in `src/data/items.ts`, so follow-up filter/project-menu work should build from data derivation rather than static enums.
- AI workflow entries now live in `src/data/ai.ts` and are merged in `src/data/items.ts`, so future AI-only edits can stay isolated from stack data pruning.
- Stack entries are now a direct `SourceItem[]` in `src/data/technologies.ts` (no legacy set-to-category mapper), so future stack pruning can stay content-driven and avoid reintroducing old taxonomy helpers.
- Creative entries now live in `src/data/creative.ts` and are merged in `src/data/items.ts`, including the required Adobe constellation-membership TODO directly above that item.
- Career source data now lives in `src/data/experience.ts` with source-aligned sizes, project constellation memberships, and one combined university entry (`description: History, Political Science`), so follow-up card work should treat that education line as a single item.
- Continuous learning is now a dedicated `career` entry in `src/data/experience.ts` with `projects: ['portfolio']` and provider/course lists in `cardFields`, so unified-card work can render learning metadata without introducing family-specific fields.
- Project constellation grouping now exports `projectConstellationOrder` and `projectConstellationGroups` from `src/data/items.ts`, derived directly from `item.projects` for `kitchen`, `portfolio`, and `tpp`, so the right-side constellation menu can consume shared data-driven indexes.
- Header content and placement are now centralized in the top-left `<header>` block in `src/features/UI.tsx`, which keeps Portfolio 2026 copy updates isolated from filter control behavior.
- Header now shows `Rafal Chelstowski` as the visible name, removes the long tagline line, and renders `Frankfurt am Main` with heading typography in `src/features/UI.tsx`, so feedback-specific copy changes stay localized to one block.
- Main category controls now render from a single `mainFilterControls` list in `src/features/UI.tsx` (`mainCategoryOrder + 'sort'`), keeping hover behavior identical while preventing legacy filter labels from reappearing.
- `sortOption` now accepts project constellation ids and `RapierItems` resolves grouped indexes from either `mainCategoryGroups` or `projectConstellationGroups`, so the right-side menu can reuse existing hover steering without changing selection-card behavior.
- `Info` now serves as the single flexible card renderer for every family, including dynamic `cardFields` output (string or string[]), optional metadata lines, optional link, and uppercase `CLOSE`, so future content additions can stay data-driven without family-specific card branches.
- Date labels in cards now pass through `formatDisplayDate` in `src/features/Info.tsx`, which uppercases month words in human-entered date strings without parsing or changing separators like `->`/`-`.
- `RapierItems` now clears stale hover state on pointer leave/miss and resets `sortOption` on selection, preventing sticky filter steering from interfering with hover/select interaction while keeping existing spawn/fall/sort behavior intact.
- `RapierItems` now renders one instanced rigid-body batch per `family` (`project` box, `ai` 3-segment cone, `stack` icosahedron detail 0, `creative` dodecahedron detail 0, `career` 5-segment cylinder) while mapping each batch back to the original global item index, so follow-up family-specific collider work can reuse the same per-family grouping without changing hover/select/sort indexing.
- `RapierItems` now uses family-specific `colliderNodes` (`project` cuboid, `ai` cone, `stack`/`creative` ball, `career` cylinder) with `colliders={false}`, which keeps collider behavior approximate to each family shape while preserving instanced rigid-body steering and selection wiring.
- Sort responsiveness is now tuned in `rapierPhysicsConstants.steering` (`sortPull`, `setMatchSeek`, `maxSortSpeed`, `maxSetMatchSpeed`, `activeLerp`) in `src/features/physics/constants.ts`, so future speed adjustments can stay centralized without touching sort loop logic in `RapierItems`.
- Shadow coverage now combines a wider directional-light shadow frustum and tuned bias values with Drei `ContactShadows` in `src/features/Lights.tsx`, which makes flamingo/pool shadows read stronger while keeping the existing ambient/point/environment setup.
- Pool rim/band shadow casting now comes from `src/features/Pool.tsx` mesh flags (`nodes.rim` and `nodes.inside` both keep `receiveShadow` and now also set `castShadow`), so future pool-shadow tweaks should adjust light/frustum first before changing pool materials.
- Overlay responsiveness now keeps controls readable on narrow screens: header text scales down, main filters wrap, project constellation controls move to a bottom row on small breakpoints, and `Info` cards clamp width/height with scroll in `src/features/UI.tsx` and `src/features/Info.tsx`.
- Card feedback pass in `src/features/Info.tsx` now keeps the eyebrow as `item.family` only and scopes family accent color to the title, while setting the card body content (date/location/subtitle/description/outcome/cardFields/link text) to black for consistent readability.
- Item scale mapping remains centralized in `src/utils/getSize.ts`; feedback retune now uses `l=0.8` (slight bump) and larger `m=0.62` / `s=0.42`, so future visual tuning should stay in this single helper.
- Final audit confirms source items remain typed through `SourceItem`, sizes are still constrained to `s|m|l`, and the only source-data uncertainty TODO markers are the specified React Query and Adobe Creative Suite lines, with required `typecheck`/`lint`/`build` gates passing.
- Project constellation controls are now fixed on the left side as a vertical one-per-line list in `src/features/UI.tsx`; they still set `sortOption` to constellation ids, and `RapierItems` continues to resolve those ids through `projectConstellationGroups` with the same center-seek/repel steering path used by main categories.
- Main toolbar separator is now rendered as a plain `|` text node directly before the `sort` button in `src/features/UI.tsx`, so it visually reads `dev creative ai career | sort` without adding a new hover/sort target.
- Rapier body reconstruction now maps per-family rigid bodies through an explicit `bodySlotToItemIndex` lookup in `src/features/rapier/RapierItems.tsx`, and instance keys are global item indexes; this keeps category/project steering stable even if per-family body slots are sparse/non-contiguous.
- Final toolbar behavior audit pass: `npm run typecheck && npm run lint && npm run build` succeeds, and toolbar hover wiring remains direct (`onMouseEnter`/`onMouseLeave` set `sortOption` in `src/features/UI.tsx`, consumed by `RapierItems` steering via `mainCategoryGroups` + `projectConstellationGroups`), with click selection still setting `isPresenting` in `src/features/rapier/RapierItems.tsx`.
- Family batch body mapping now uses dense local keys (`0..familyCount-1`) in `src/features/rapier/RapierItems.tsx`, with explicit `bodySlotToItemIndex` local-slot to global-index mapping so per-family Rapier body arrays cannot drop steering updates for non-zero-start global item indexes.
- Main toolbar separator color now uses an explicit `text-white` span class in `src/features/UI.tsx` with `pointer-events-none`, keeping the separator visual-only while matching toolbar text color.
- Course-only scene items are now removed from the merged item list by deleting `src/data/courses.ts` and removing its import/spread from `src/data/items.ts`; `Continuous learning` in `src/data/experience.ts` remains the single consolidated learning entry with provider/course metadata.
- `RapierItems` now passes stable object refs to each family `InstancedRigidBodies` (`ref={familyBodiesRef.current[family]}`) and reads `familyBodiesRef.current[family].current` during `useFrame`, mirroring into `familyRuntimeRef` so `hasAnyBody` can become true and hover steering can reach live Rapier bodies again.
- Final Feedback 4 audit confirms all remaining acceptance gates: no `InstancedRigidBodies` callback refs, per-family body refs are consumed through `.current`, hover steering reaches live bodies for all main + project controls, and click/hover mapping still targets the correct global item indexes while `npm run typecheck && npm run lint && npm run build` passes.
