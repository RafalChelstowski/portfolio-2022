# Ralph Progress

- [ ] Rework environment lighting into a dusk-style hierarchy | AC: `src/features/Lights.tsx` uses the existing `hdr.hdr` plus three/drei lighting primitives to create a restrained warm/cool split with stable shadow settings, without adding new assets or dependencies.
- [ ] Add subtle atmospheric depth using existing scene controls | AC: the Canvas/scene setup adds a soft background/fog or equivalent three.js atmosphere that makes the pool read less flat while preserving legible UI overlay behavior.
- [ ] Tune pool material response using existing pool assets | AC: `src/features/Pool.tsx` keeps the existing GLTF and texture maps but adjusts material properties so the pool, rim, inside, and plane have clearer roughness/reflection/color separation.
- [ ] Create falling-item material hierarchy without textures | AC: `src/features/rapier/RapierItems.tsx` uses existing geometry, vertex colors, and `meshPhysicalMaterial` settings to distinguish hero/secondary/quiet floating forms without new marble textures or object assets.
- [ ] Keep the visual pass performance-safe | AC: the implementation avoids new postprocessing packages, avoids runtime-expensive effects, keeps static shadow/contact-shadow behavior bounded, and does not start or require a browser smoke test.
- [ ] Verify production checks | AC: `npm run typecheck && npm run lint && npm run build` passes.

## Findings
