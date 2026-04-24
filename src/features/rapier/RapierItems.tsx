import { InstancedRigidBodies, type InstancedRigidBodyProps } from '@react-three/rapier';
import { useMemo, useRef, useEffect, useState, type JSX } from 'react';
import { Color, InstancedMesh } from 'three';

import { itemInstanceDescriptors } from '../physics/itemInstanceDescriptors';
import { useStore } from '../../store/store';

const instanceCount = itemInstanceDescriptors.length;
const color = new Color();

export function RapierItems(): JSX.Element {
  const ref = useRef<InstancedMesh>(null);
  const isPresenting = useStore((state) => state.isPresenting);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

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

  useEffect(() => {
    for (let index = 0; index < instanceCount; index += 1) {
      const descriptor = itemInstanceDescriptors[index];

      if (index === hovered || index === isPresenting) {
        color.setRGB(1, 1, 1);
      } else {
        color.set(descriptor.color);
      }

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    if (ref.current) {
      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [colors, hovered, isPresenting]);

  return (
    <InstancedRigidBodies colliders="cuboid" instances={instances}>
      <instancedMesh
        castShadow
        receiveShadow
        ref={ref}
        args={[undefined, undefined, instanceCount]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(e.instanceId);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(undefined);
        }}
        onClick={(e) => {
          e.stopPropagation();

          if (e.instanceId === undefined) {
            return;
          }

          useStore.setState({ isPresenting: e.instanceId });
        }}
      >
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
