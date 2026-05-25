import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTFResult } from '../types';
import { duskPalette } from './Lights';

const poolColor = new THREE.Color(duskPalette.poolShellTint);
const rimColor = new THREE.Color(duskPalette.poolRimTint);
const insideColor = new THREE.Color(duskPalette.poolInteriorTint);
const planeColor = new THREE.Color(duskPalette.poolPlaneTint);
const poolNormalScale = new THREE.Vector2(0.72, 0.72);
const rimNormalScale = new THREE.Vector2(0.48, 0.48);
const insideNormalScale = new THREE.Vector2(0.34, 0.34);

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

  const poolMaterial = (
    <meshStandardMaterial
      map={texture}
      normalMap={normalMap}
      metalnessMap={metalnessMap}
      roughnessMap={roughnessMap}
      color={poolColor}
      roughness={0.58}
      metalness={0.04}
      envMapIntensity={0.62}
      normalScale={poolNormalScale}
    />
  );

  const rimMaterial = (
    <meshStandardMaterial
      map={texture}
      normalMap={normalMap}
      metalnessMap={metalnessMap}
      roughnessMap={roughnessMap}
      color={rimColor}
      roughness={0.33}
      metalness={0.02}
      envMapIntensity={0.95}
      normalScale={rimNormalScale}
    />
  );

  const insideMaterial = (
    <meshStandardMaterial
      map={texture}
      normalMap={normalMap}
      metalnessMap={metalnessMap}
      roughnessMap={roughnessMap}
      color={insideColor}
      roughness={0.72}
      metalness={0}
      envMapIntensity={0.38}
      normalScale={insideNormalScale}
    />
  );

  return (
    <group dispose={null}>
      <mesh receiveShadow castShadow geometry={nodes.flamingo.geometry}>
        {poolMaterial}
      </mesh>
      <mesh receiveShadow castShadow geometry={nodes.rim.geometry}>
        {rimMaterial}
      </mesh>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.inside.geometry}
        material={nodes.inside.material}
      >
        {insideMaterial}
      </mesh>
      <mesh receiveShadow geometry={nodes.plane.geometry}>
        <meshStandardMaterial
          color={planeColor}
          roughness={0.86}
          metalness={0}
          envMapIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/pool.gltf');
