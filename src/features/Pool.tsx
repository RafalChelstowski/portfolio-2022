import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTFResult } from '../types';

function configureSrgbTexture(texture: THREE.Texture) {
  const configuredTexture = texture;
  configuredTexture.flipY = false;

  if ('colorSpace' in configuredTexture) {
    Reflect.set(
      configuredTexture,
      'colorSpace',
      (THREE as typeof THREE & { SRGBColorSpace?: string }).SRGBColorSpace ??
        'srgb'
    );
  } else {
    Reflect.set(configuredTexture, 'encoding', 3001);
  }
}

export default function Model() {
  const { nodes } = useGLTF('/pool.gltf') as unknown as GLTFResult;

  const texture = useTexture('/pool_textured_BaseColor.jpg');
  configureSrgbTexture(texture);

  const normalMap = useTexture('/pool_textured_Normal.jpg');
  normalMap.flipY = false;

  const metalnessMap = useTexture('/pool_textured_Metallic.jpg');
  metalnessMap.flipY = false;

  const roughnessMap = useTexture('/pool_textured_Roughness.jpg');
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
      <mesh receiveShadow castShadow geometry={nodes.flamingo.geometry}>
        {material}
      </mesh>
      <mesh receiveShadow castShadow geometry={nodes.rim.geometry}>
        {material}
      </mesh>
      <mesh
        receiveShadow
        castShadow
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
