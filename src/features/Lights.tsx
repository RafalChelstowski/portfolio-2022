import { ContactShadows, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

export function Lights() {
  const scene = useThree((state) => state.scene);

  const targetObject = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    targetObject.position.set(0.5, 0, 0);
    scene.add(targetObject);
  }, [scene, targetObject]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[8, 14, 6]}
        intensity={1.7}
        target={targetObject}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-bias={-0.00015}
        shadow-normalBias={0.02}
        shadow-radius={2}
      />
      <pointLight castShadow position={[-2, 4, 5]} intensity={5} />
      <ContactShadows
        position={[0, -2.01, 0]}
        opacity={0.45}
        scale={48}
        blur={2.4}
        far={40}
        resolution={1024}
        frames={1}
      />
      <Environment files="hdr.hdr" background={false} resolution={128} />
    </>
  );
}
