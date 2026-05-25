import { ContactShadows, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

const shadowBounds = {
  near: 0.5,
  far: 38,
  left: -18,
  right: 18,
  top: 18,
  bottom: -18,
};

// Keep static shadow buffers bounded; larger maps quickly raise GPU cost in this scene.
const directionalShadowMapSize = 1024;
const contactShadowResolution = 512;
const environmentResolution = 128;
const contactShadowFrames = 1;

export interface SceneToneSettings {
  backgroundFog: string;
  contactShadowOpacity: number;
  coolFill: number;
  environment: number;
  exposure: number;
  fogDensity: number;
  hemisphere: number;
  warmKey: number;
}

export const duskPalette = {
  backgroundFog: '#69798a',
  warmKeyLight: '#ffe2b2',
  coolFillLight: '#dbeeff',
  coolSkyLight: '#edf6ff',
  warmGroundLight: '#b98268',
  poolShellTint: '#f0a1a7',
  poolRimTint: '#ffe0d2',
  poolInteriorTint: '#7faebd',
  poolPlaneTint: '#8f6166',
};

export const sceneToneDefaults: SceneToneSettings = {
  backgroundFog: duskPalette.backgroundFog,
  contactShadowOpacity: 0.24,
  coolFill: 2.7,
  environment: 1.65,
  exposure: 1.08,
  fogDensity: 0.011,
  hemisphere: 1,
  warmKey: 4.6,
};

export function Lights({ tone }: { tone: SceneToneSettings }) {
  const scene = useThree((state) => state.scene);

  const targetObject = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    targetObject.position.set(0.5, 0, 0);
    scene.add(targetObject);

    return () => {
      scene.remove(targetObject);
    };
  }, [scene, targetObject]);

  return (
    <>
      <Environment
        files="hdr.hdr"
        background={false}
        environmentIntensity={tone.environment}
        environmentRotation={[0, Math.PI * 0.15, 0]}
        resolution={environmentResolution}
      />
      <hemisphereLight
        args={[
          duskPalette.coolSkyLight,
          duskPalette.warmGroundLight,
          tone.hemisphere,
        ]}
        position={[0, 8, 0]}
      />
      <directionalLight
        castShadow
        color={duskPalette.warmKeyLight}
        position={[9, 7, 4]}
        intensity={tone.warmKey}
        target={targetObject}
        shadow-mapSize-width={directionalShadowMapSize}
        shadow-mapSize-height={directionalShadowMapSize}
        shadow-camera-near={shadowBounds.near}
        shadow-camera-far={shadowBounds.far}
        shadow-camera-left={shadowBounds.left}
        shadow-camera-right={shadowBounds.right}
        shadow-camera-top={shadowBounds.top}
        shadow-camera-bottom={shadowBounds.bottom}
        shadow-bias={-0.00012}
        shadow-normalBias={0.025}
        shadow-radius={3}
      />
      <pointLight
        color={duskPalette.coolFillLight}
        position={[-5, 3.5, 4]}
        intensity={tone.coolFill}
        distance={18}
        decay={2}
      />
      <ContactShadows
        position={[0, -2.01, 0]}
        opacity={tone.contactShadowOpacity}
        scale={36}
        blur={2.8}
        far={24}
        resolution={contactShadowResolution}
        frames={contactShadowFrames}
      />
    </>
  );
}
