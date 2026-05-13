# Rapier Startup Freefall Progress

- [x] Restore startup UI gating for pool readiness | AC: `src/store/store.ts` initializes `displayUi` as `false`; `RapierItems` remains responsible for setting `displayUi: true` only after the existing majority-in-pool condition; `npm run typecheck && npm run lint && npm run build` passes
- [x] Remove artificial velocity control during the initial fall | AC: `src/features/rapier/RapierItems.tsx` does not call `setLinvel` or `blendVelocity` while `sortOption === null`; startup bodies are left to Rapier gravity/collisions before sorting is active; existing body-ref mapping and first-pool-contact tracking remain intact; `npm run typecheck && npm run lint && npm run build` passes
- [x] Remove unused controlled-fall constants after freefall cleanup | AC: `spawnFastDropSpeed` and `settleLerp` are removed if no longer referenced; item linear damping is set to `0` unless implementation proves it is still needed for sorting stability and records that reason in `## Findings`; `npm run typecheck && npm run lint && npm run build` passes
- [ ] Block user camera panning on the scene | AC: `src/features/Controls.tsx` prevents OrbitControls panning at all times, including modifier-assisted left-drag panning with Control/Shift/Option; camera position remains app-controlled by `Camera`; auto-rotation/presentation behavior is preserved; `npm run typecheck && npm run lint && npm run build` passes
- [ ] Increase sorted-out filter item speed | AC: when a category/project filter is active, unmatched items are repelled at least as fast as matched items are pulled inward and preferably slightly faster; matched incoming item speed remains effectively unchanged; constants/implementation names make the speed relationship clear; `npm run typecheck && npm run lint && npm run build` passes

---

## Findings

### Startup freefall bug (initial discovery)
- `src/store/store.ts` currently initializes `displayUi: true`, which bypasses the intended majority-in-pool reveal gate in `RapierItems`.
- `src/features/rapier/RapierItems.tsx` currently handles `sortOption === null` by writing linear velocity every frame: before first pool contact it blends bodies toward a fixed downward speed, and after contact it blends them toward zero.
- That per-frame `setLinvel` path makes startup movement look directed/slow-motion instead of pure Rapier freefall.
- Keep the existing body-ref mapping and first-pool-contact logic. Prior Rapier work depends on `InstancedRigidBodies` object refs being populated so hover/menu sorting can reach bodies during `useFrame`.
- `blendVelocity` is still used by active sorting/grouping paths; the freefall task should stop using it during `sortOption === null`, not remove the helper unless a later cleanup proves it unused.
- Browser/runtime verification is manual outside this loop; Ralph should rely on source-level AC plus typecheck/lint/build gates.

### Follow-up review items
- `src/features/Controls.tsx` currently sets `enablePan={!isPresenting}`. Even with rotation and zoom disabled, OrbitControls can still pan via modifier-assisted left drag; this should be blocked so the camera remains app-controlled.
- `src/features/Camera.tsx` owns app camera positions for normal and presenting states. Do not move that responsibility into user controls.
- For active filters, incoming/matched items currently cap at `rapierPhysicsConstants.steering.maxSetMatchSpeed` while unmatched/sorted-out items cap at `maxSetMissSpeed`; sorted-out items are visibly too slow and should be at least as fast, slightly faster if stable.
