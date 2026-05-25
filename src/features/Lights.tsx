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

export const duskPalette = {
  backgroundFog: '#2f3b4b',
  warmKeyLight: '#ffd29a',
  coolFillLight: '#c2ddff',
  coolSkyLight: '#d4e7ff',
  warmGroundLight: '#65402f',
  poolShellTint: '#f0a1a7',
  poolRimTint: '#ffe0d2',
  poolInteriorTint: '#7faebd',
  poolPlaneTint: '#8f6166',
};

const lightLevels = {
  environment: 1.45,
  hemisphere: 0.82,
  warmKey: 4.1,
  coolFill: 2.35,
  contactShadowOpacity: 0.26,
};

export function Lights() {
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
        environmentIntensity={lightLevels.environment}
        environmentRotation={[0, Math.PI * 0.15, 0]}
        resolution={environmentResolution}
      />
      <hemisphereLight
        args={[
          duskPalette.coolSkyLight,
          duskPalette.warmGroundLight,
          lightLevels.hemisphere,
        ]}
        position={[0, 8, 0]}
      />
      <directionalLight
        castShadow
        color={duskPalette.warmKeyLight}
        position={[9, 7, 4]}
        intensity={lightLevels.warmKey}
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
        intensity={lightLevels.coolFill}
        distance={18}
        decay={2}
      />
      <ContactShadows
        position={[0, -2.01, 0]}
        opacity={lightLevels.contactShadowOpacity}
        scale={36}
        blur={2.8}
        far={24}
        resolution={contactShadowResolution}
        frames={contactShadowFrames}
      />
    </>
  );
}
