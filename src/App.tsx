import { Physics } from '@react-three/rapier';
import { AdaptiveDpr, Loader, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { Camera } from './features/Camera';
import { Controls } from './features/Controls';
import { Lights, duskPalette, sceneToneMappingExposure } from './features/Lights';
import Pool from './features/Pool';
import { RetroPass } from './features/RetroPass';
import { SelectedCardOverlay } from './features/SelectedCardOverlay';
import { UI } from './features/UI';
import { rapierPhysicsConstants } from './features/physics/constants';
import { RapierBounds } from './features/rapier/RapierBounds';
import { RapierItems } from './features/rapier/RapierItems';

const canvasDprRange: [minimum: number, maximum: number] = [1, 1.5];
const sceneFogDensity = 0.014;

function SceneAtmosphere() {
  return (
    <>
      <color attach="background" args={[duskPalette.backgroundFog]} />
      {/* Keep fog density subtle so atmosphere adds depth without increasing draw cost. */}
      <fogExp2 attach="fog" args={[duskPalette.backgroundFog, sceneFogDensity]} />
    </>
  );
}

export function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Canvas
        dpr={canvasDprRange}
        onCreated={({ gl }) => {
          if ('useLegacyLights' in gl) {
            Reflect.set(gl, 'useLegacyLights', false);
          } else if ('physicallyCorrectLights' in gl) {
            Reflect.set(gl, 'physicallyCorrectLights', true);
          }

          Reflect.set(gl, 'toneMappingExposure', sceneToneMappingExposure);
        }}
        shadows
      >
        <SceneAtmosphere />
        <Camera />
        <Lights />
        <Controls />
        <Physics gravity={rapierPhysicsConstants.world.gravity}>
          <Suspense fallback={null}>
            <Pool />
          </Suspense>
          <RapierItems />
          <RapierBounds />
        </Physics>
        {/* DPR is intentionally capped and adaptive to keep the scene responsive on dense displays. */}
        <AdaptiveDpr pixelated />
        <RetroPass />
        <Preload all />
      </Canvas>
      <SelectedCardOverlay />
      <Loader />
      <UI />
    </main>
  );
}
