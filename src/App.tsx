import { Physics } from '@react-three/rapier';
import { AdaptiveDpr, Loader, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { Camera } from './features/Camera';
import { Controls } from './features/Controls';
import { Lights } from './features/Lights';
import Pool from './features/Pool';
import { SelectedCardOverlay } from './features/SelectedCardOverlay';
import { UI } from './features/UI';
import { rapierPhysicsConstants } from './features/physics/constants';
import { RapierBounds } from './features/rapier/RapierBounds';
import { RapierItems } from './features/rapier/RapierItems';

export function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Canvas
        onCreated={({ gl }) => {
          if ('useLegacyLights' in gl) {
            Reflect.set(gl, 'useLegacyLights', false);
          } else if ('physicallyCorrectLights' in gl) {
            Reflect.set(gl, 'physicallyCorrectLights', true);
          }
        }}
        shadows
      >
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
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
      <SelectedCardOverlay />
      <Loader />
      <UI />
    </main>
  );
}
