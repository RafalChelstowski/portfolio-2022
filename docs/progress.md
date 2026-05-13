# Rapier Startup Freefall Progress

- [ ] Restore startup UI gating for pool readiness | AC: `src/store/store.ts` initializes `displayUi` as `false`; `RapierItems` remains responsible for setting `displayUi: true` only after the existing majority-in-pool condition; `npm run typecheck && npm run lint && npm run build` passes
- [ ] Remove artificial velocity control during the initial fall | AC: `src/features/rapier/RapierItems.tsx` does not call `setLinvel` or `blendVelocity` while `sortOption === null`; startup bodies are left to Rapier gravity/collisions before sorting is active; existing body-ref mapping and first-pool-contact tracking remain intact; `npm run typecheck && npm run lint && npm run build` passes
- [ ] Remove unused controlled-fall constants after freefall cleanup | AC: `spawnFastDropSpeed` and `settleLerp` are removed if no longer referenced; item linear damping is set to `0` unless implementation proves it is still needed for sorting stability and records that reason in `## Findings`; `npm run typecheck && npm run lint && npm run build` passes

---

## Findings

### Startup freefall bug (initial discovery)
- `src/store/store.ts` currently initializes `displayUi: true`, which bypasses the intended majority-in-pool reveal gate in `RapierItems`.
- `src/features/rapier/RapierItems.tsx` currently handles `sortOption === null` by writing linear velocity every frame: before first pool contact it blends bodies toward a fixed downward speed, and after contact it blends them toward zero.
- That per-frame `setLinvel` path makes startup movement look directed/slow-motion instead of pure Rapier freefall.
- Keep the existing body-ref mapping and first-pool-contact logic. Prior Rapier work depends on `InstancedRigidBodies` object refs being populated so hover/menu sorting can reach bodies during `useFrame`.
- `blendVelocity` is still used by active sorting/grouping paths; the freefall task should stop using it during `sortOption === null`, not remove the helper unless a later cleanup proves it unused.
- Browser/runtime verification is manual outside this loop; Ralph should rely on source-level AC plus typecheck/lint/build gates.
