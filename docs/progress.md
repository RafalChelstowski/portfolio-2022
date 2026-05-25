# Ralph Progress

- [x] Rework environment lighting into a dusk-style hierarchy | AC: `src/features/Lights.tsx` uses the existing `hdr.hdr` plus three/drei lighting primitives to create a restrained warm/cool split with stable shadow settings, without adding new assets or dependencies.
- [x] Add subtle atmospheric depth using existing scene controls | AC: the Canvas/scene setup adds a soft background/fog or equivalent three.js atmosphere that makes the pool read less flat while preserving legible UI overlay behavior.
- [x] Tune pool material response using existing pool assets | AC: `src/features/Pool.tsx` keeps the existing GLTF and texture maps but adjusts material properties so the pool, rim, inside, and plane have clearer roughness/reflection/color separation.
- [x] Create falling-item material hierarchy without textures | AC: `src/features/rapier/RapierItems.tsx` uses existing geometry, vertex colors, and `meshPhysicalMaterial` settings to distinguish hero/secondary/quiet floating forms without new marble textures or object assets.
- [x] Keep the visual pass performance-safe | AC: the implementation avoids new postprocessing packages, avoids runtime-expensive effects, keeps static shadow/contact-shadow behavior bounded, and does not start or require a browser smoke test.
- [x] Verify production checks | AC: `npm run typecheck && npm run lint && npm run build` passes.
- [x] Refine dusk palette consistency across scene primitives | AC: `src/features/Lights.tsx`, `src/features/Pool.tsx`, and `src/App.tsx` use shared, named color constants for the dusk background/fog, warm key light, cool fill, and pool material tints so the visual direction is coherent without introducing new files, assets, or dependencies.
- [x] Improve falling-item readability in the new lighting pass | AC: `src/features/rapier/RapierItems.tsx` keeps existing geometry, physics, vertex colors, hover/presentation behavior, and no texture dependencies, but adjusts physical material settings so hero, secondary, and quiet families remain visibly distinct against the darker atmospheric background.
- [ ] Add conservative shadow and atmosphere guardrails | AC: the scene keeps bounded shadow/contact-shadow settings and adds inline code-level guardrails/comments or constants that make future changes to fog density, DPR, and shadow map sizes explicitly performance-safe, without changing runtime behavior outside the visual scene.
- [ ] Verify additional visual pass checks | AC: `npm run typecheck && npm run lint && npm run build` passes after the additional visual refinements.

## Findings

- `@react-three/drei` Environment in this repo supports `environmentIntensity` and `environmentRotation`, so HDR contribution can be tuned directly without new assets.
- Canvas DPR is capped at 1.5 and static shadow/contact-shadow buffers are intentionally bounded for the visual pass.
- The follow-up pass should keep all work inside the existing React Three Fiber scene files and must not add postprocessing, browser smoke tests, new assets, or new dependencies.
