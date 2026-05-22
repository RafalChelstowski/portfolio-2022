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

function SceneAtmosphere() {
  return (
    <>
      <color attach="background" args={['#111822']} />
      <fogExp2 attach="fog" args={['#111822', 0.022]} />
    </>
  );
}

export function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          if ('useLegacyLights' in gl) {
            Reflect.set(gl, 'useLegacyLights', false);
          } else if ('physicallyCorrectLights' in gl) {
            Reflect.set(gl, 'physicallyCorrectLights', true);
          }
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
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
      <SelectedCardOverlay />
      <Loader />
      <UI />
    </main>
  );
}
