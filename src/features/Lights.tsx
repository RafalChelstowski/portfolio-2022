import { Environment } from '@react-three/drei';
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
      <directionalLight intensity={1} target={targetObject} />
      <pointLight castShadow position={[-2, 4, 5]} intensity={5} />
      <Environment files="hdr.hdr" background={false} resolution={128} />
    </>
  );
}
