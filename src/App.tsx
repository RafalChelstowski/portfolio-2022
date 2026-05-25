import { Physics } from '@react-three/rapier';
import { AdaptiveDpr, Loader, Preload } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { Suspense, useEffect } from 'react';

import { Camera } from './features/Camera';
import { Controls } from './features/Controls';
import { Lights, sceneToneDefaults, type SceneToneSettings } from './features/Lights';
import Pool from './features/Pool';
import { RetroPass } from './features/RetroPass';
import { SelectedCardOverlay } from './features/SelectedCardOverlay';
import { UI } from './features/UI';
import { rapierPhysicsConstants } from './features/physics/constants';
import { RapierBounds } from './features/rapier/RapierBounds';
import { RapierItems } from './features/rapier/RapierItems';

const canvasDprRange: [minimum: number, maximum: number] = [1, 1.5];

function SceneToneExposure({ exposure }: { exposure: number }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    Reflect.set(gl, 'toneMappingExposure', exposure);
  }, [exposure, gl]);

  return null;
}

function SceneAtmosphere({ tone }: { tone: SceneToneSettings }) {
  return (
    <>
      <color attach="background" args={[tone.backgroundFog]} />
      {/* Keep fog density subtle so atmosphere adds depth without increasing draw cost. */}
      <fogExp2 attach="fog" args={[tone.backgroundFog, tone.fogDensity]} />
    </>
  );
}

export function App() {
  const tone = useControls(
    'Scene Tone',
    {
      exposure: {
        value: sceneToneDefaults.exposure,
        min: 0.65,
        max: 1.45,
        step: 0.01,
      },
      environment: {
        value: sceneToneDefaults.environment,
        min: 0,
        max: 2.6,
        step: 0.05,
      },
      warmKey: {
        value: sceneToneDefaults.warmKey,
        min: 0,
        max: 7,
        step: 0.05,
      },
      coolFill: {
        value: sceneToneDefaults.coolFill,
        min: 0,
        max: 5,
        step: 0.05,
      },
      hemisphere: {
        value: sceneToneDefaults.hemisphere,
        min: 0,
        max: 1.8,
        step: 0.02,
      },
      fogDensity: {
        value: sceneToneDefaults.fogDensity,
        min: 0,
        max: 0.025,
        step: 0.001,
      },
      contactShadowOpacity: {
        value: sceneToneDefaults.contactShadowOpacity,
        min: 0,
        max: 0.45,
        step: 0.01,
      },
      backgroundFog: sceneToneDefaults.backgroundFog,
    },
    { collapsed: true, render: () => import.meta.env.DEV }
  );

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
        }}
        shadows="percentage"
      >
        <SceneToneExposure exposure={tone.exposure} />
        <SceneAtmosphere tone={tone} />
        <Camera />
        <Lights tone={tone} />
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
