# Ralph Progress

- [x] Rework environment lighting into a dusk-style hierarchy | AC: `src/features/Lights.tsx` uses the existing `hdr.hdr` plus three/drei lighting primitives to create a much brighter warm/cool split with stable shadow settings, without adding new assets or dependencies.
- [x] Add subtle atmospheric depth using existing scene controls | AC: the Canvas/scene setup adds a soft background/fog or equivalent three.js atmosphere that makes the pool read less flat while preserving legible UI overlay behavior.
- [x] Tune pool material response using existing pool assets | AC: `src/features/Pool.tsx` keeps the existing GLTF and texture maps but adjusts material properties so the pool, rim, inside, and plane have clearer roughness/reflection/color separation.
- [x] Create falling-item material hierarchy with uploaded marble textures | AC: `src/features/rapier/RapierItems.tsx` uses existing geometry plus the uploaded `public/marble/*` texture maps on sortable/falling shapes, preserving hero/secondary/quiet distinction and physics/hover behavior without adding new object assets or packages.
- [x] Keep the visual pass performance-safe | AC: the implementation avoids new postprocessing packages, avoids runtime-expensive effects, keeps static shadow/contact-shadow behavior bounded, and does not start or require a browser smoke test.
- [x] Verify production checks | AC: `npm run typecheck && npm run lint && npm run build` passes.
- [x] Refine dusk palette consistency across scene primitives | AC: `src/features/Lights.tsx`, `src/features/Pool.tsx`, and `src/App.tsx` use shared, named color constants for the dusk background/fog, warm key light, cool fill, and pool material tints so the visual direction is coherent without introducing new files, assets, or dependencies.
- [x] Improve falling-item readability in the new lighting pass | AC: `src/features/rapier/RapierItems.tsx` keeps existing geometry, physics, vertex colors, hover/presentation behavior, and uses the uploaded marble texture maps so hero, secondary, and quiet families remain visibly distinct against the brighter atmospheric background.
- [x] Add conservative shadow and atmosphere guardrails | AC: the scene keeps bounded shadow/contact-shadow settings and adds inline code-level guardrails/comments or constants that make future changes to fog density, DPR, and shadow map sizes explicitly performance-safe, without changing runtime behavior outside the visual scene.
- [x] Verify additional visual pass checks | AC: `npm run typecheck && npm run lint && npm run build` passes after the additional visual refinements.

- [x] Make the scene substantially brighter using the current HDR and light hierarchy | AC: `src/features/Lights.tsx` and related scene constants raise environment/background/lighting exposure enough that the scene reads much, much brighter than the current PR while preserving stable bounded shadows and no new HDR asset.
- [x] Replace barely visible/competing visual effects with a dedicated RetroPass grain shader | AC: any other custom postprocessing/filter effect in the scene is removed or disabled, and a focused RetroPass-style shader/component provides clearly visible retro grain/noise in production without new dependencies and without breaking UI overlay behavior.

- [x] Parameterize RetroPass grain with Leva controls | AC: the RetroPass-style grain/filter exposes useful Leva controls in dev for intensity/scale or comparable grain parameters, defaults to a less obstructive setting than the current PR screenshot, and keeps production behavior safe without adding dependencies.
- [x] Add a second tuning pass for RetroPass usability | AC: after the initial Leva wiring, review the RetroPass defaults/ranges and shader output so Rafal can comfortably tune the effect in dev without the filter obscuring the scene; `npm run typecheck && npm run lint && npm run build` passes.

- [x] Investigate and fix broken-looking marble textures on sortable shapes | AC: inspect the current marble texture loading/material setup in `src/features/rapier/RapierItems.tsx`, correct UV/repeat/color-space/wrapping or material choices so the uploaded marble texture reads clearly instead of broken/washed out, and preserve existing sortable physics/hover behavior without adding assets or dependencies.
- [x] Apply Rafal-approved RetroPass defaults and scanline tuning | AC: RetroPass/Leva defaults use grain opacity `0.03`, grain scale `20`, scanline intensity `0.05` or a slightly more prominent scanline if visually appropriate, with ranges still useful for dev tuning and no obstructive overlay.
- [/] Tone down current scene brightness slightly | AC: adjust the current light/environment/exposure/fog constants so the scene is a little less bright than the latest PR screenshot while remaining brighter than the original dark PR state; keep stable shadows and no new HDR asset.

## Findings

- Rafal review feedback from screenshot/message on 2026-05-25 15:15 Europe/Berlin: marble textures on sortable shapes look broken and need investigation, not just another surface tweak.
- The broken marble read was addressed in `RapierItems.tsx` by using explicit Three color-space constants, reducing repeat/normal strength, and assigning spherical UVs to faceted sortable shapes whose default UVs can fragment the bitmap.
- Rafal requested RetroPass shader values: grain opacity 0.03, scale 20, scanline 0.05; scanline can be slightly more prominent if the implementation benefits from it.
- RetroPass now keeps Rafal's requested scale default at 20 in Leva, with a small internal frequency multiplier so the grain stays fine enough at that default instead of becoming large block noise.
- Latest scene is now too bright; tone it down slightly while preserving the earlier requirement that it must not return to the dark PR state.

- Rafal review feedback from screenshot/message on 2026-05-25 14:56 Europe/Berlin: RetroPass/grain is now too prominent and obstructs the view. Defaults must be toned down.
- Rafal wants RetroPass parameters exposed through Leva so he can adjust them directly in the dev environment; prepare a couple of update passes focused only on that scope.
- RetroPass now uses lower defaults and sparse grain/scanline alpha instead of a constant dark overlay, so future passes should avoid reintroducing a full-screen veil.

- Rafal review feedback for PR #16: the HDR/background was intentionally changed to be lighter, but the PR made the scene dark again; next pass must be much, much brighter, not subtly brighter.
- Rafal uploaded marble textures under `public/marble/`; sortable/falling Rapier shapes must visibly use those maps.
- Rafal review feedback: the retro grain is barely visible, if present. Remove other competing postprocessing/filter effects and implement the grain as a focused RetroPass-style shader/component.

- `@react-three/drei` Environment in this repo supports `environmentIntensity` and `environmentRotation`, so HDR contribution can be tuned directly without new assets.
- Canvas DPR is capped at 1.5 and static shadow/contact-shadow buffers are intentionally bounded for the visual pass.
- The follow-up pass should keep all work inside the existing React Three Fiber scene files and must not add postprocessing, browser smoke tests, new assets, or new dependencies.
- Falling items now share the uploaded marble base color, normal, roughness, and metallic maps; AO/displacement maps remain unused to avoid adding uv2 requirements or heavier geometry work to the instanced physics shapes.
- The brighter pass is controlled by `duskPalette`, `lightLevels`, `sceneToneMappingExposure`, and the App fog density; bounded shadow/contact-shadow map sizes were left unchanged.
