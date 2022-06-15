import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFResult } from '../types';

export default function Model() {
  const { nodes } = useGLTF('/pool.gltf') as unknown as GLTFResult;

  const texture = useTexture('/pool_textured_BaseColor.png');
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  const normalMap = useTexture('/pool_textured_Normal.png');
  normalMap.flipY = false;

  const metalnessMap = useTexture('/pool_textured_Metallic.png');
  metalnessMap.flipY = false;

  const roughnessMap = useTexture('/pool_textured_Roughness.png');
  roughnessMap.flipY = false;

  const material = (
    <meshStandardMaterial
      map={texture}
      normalMap={normalMap}
      metalnessMap={metalnessMap}
      roughnessMap={roughnessMap}
    />
  );

  return (
    <group dispose={null}>
      <mesh castShadow geometry={nodes.flamingo.geometry}>
        {material}
      </mesh>
      <mesh receiveShadow geometry={nodes.rim.geometry}>
        {material}
      </mesh>
      <mesh
        receiveShadow
        geometry={nodes.inside.geometry}
        material={nodes.inside.material}
      >
        {material}
      </mesh>
      <mesh receiveShadow geometry={nodes.plane.geometry}>
        <meshStandardMaterial
          color={new THREE.Color('#bb787b')}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/pool.gltf');
