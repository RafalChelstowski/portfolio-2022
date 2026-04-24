import { InstancedRigidBodies, type InstancedRigidBodyProps } from '@react-three/rapier';
import { useMemo, type JSX } from 'react';
import { Color } from 'three';

import { itemInstanceDescriptors } from '../physics/itemInstanceDescriptors';

const instanceCount = itemInstanceDescriptors.length;
const color = new Color();

export function RapierItems(): JSX.Element {
  const instances = useMemo<InstancedRigidBodyProps[]>(
    () =>
      itemInstanceDescriptors.map((descriptor) => ({
        key: descriptor.index,
        position: descriptor.spawnPosition,
        rotation: descriptor.initialRotationSeed,
        scale: descriptor.scale,
      })),
    []
  );

  const colors = useMemo(() => {
    const values = new Float32Array(instanceCount * 3);

    for (let index = 0; index < instanceCount; index += 1) {
      const descriptor = itemInstanceDescriptors[index];
      color.set(descriptor.color);
      values[index * 3] = color.r;
      values[index * 3 + 1] = color.g;
      values[index * 3 + 2] = color.b;
    }

    return values;
  }, []);

  return (
    <InstancedRigidBodies colliders="cuboid" instances={instances}>
      <instancedMesh castShadow receiveShadow args={[undefined, undefined, instanceCount]}>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshPhysicalMaterial
          vertexColors
          roughness={0.1}
          metalness={0}
          transmission={0.6}
        />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
