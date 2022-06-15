import { Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

export function Lights() {
  const scene = useThree((state) => state.scene);

  const targetObject = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    targetObject.position.set(1, 0, 2);
    scene.add(targetObject);
  }, [scene, targetObject]);

  return (
    <>
      <ambientLight intensity={0.6} />
      {/* <directionalLight intensity={1} target={targetObject} castShadow /> */}
      <pointLight castShadow position={[0, 4, 0]} intensity={4} />
      <Environment files="touk.hdr" background={false} resolution={128} />
    </>
  );
}
