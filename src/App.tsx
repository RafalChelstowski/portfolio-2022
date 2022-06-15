import { Physics } from '@react-three/cannon';
import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { Bounds } from './features/Bounds';
import { Camera } from './features/Camera';
import { Controls } from './features/Controls';
import { Info } from './features/Info';
import { Items } from './features/Items';
import { Lights } from './features/Lights';
import Pool from './features/Pool';
import { UI } from './features/UI';

export function App() {
  return (
    <main className="w-screen h-screen">
      <Canvas gl={{ physicallyCorrectLights: true }} shadows>
        <Camera />
        <Lights />
        <Controls />
        <Suspense fallback={null}>
          <Physics>
            <Pool />
            <Items />
            <Bounds />
          </Physics>
        </Suspense>
        <Info />
        <AdaptiveDpr pixelated />
      </Canvas>
      <UI />
    </main>
  );
}
