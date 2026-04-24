import { useBox } from '@react-three/cannon';
import type { Triplet } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import { InstancedMesh } from 'three';
import * as THREE from 'three';
import { items, sets } from '../data/items';
import { itemPhysicsConstants } from './physics/constants';
import { itemInstanceDescriptors } from './physics/itemInstanceDescriptors';
import { useStore } from '../store/store';

const directionVector = new THREE.Vector3();
const centerVector = new THREE.Vector3(...itemPhysicsConstants.centerTarget);
const currentPositionVector = new THREE.Vector3(0, 0, 0);
const targetPositionVector = new THREE.Vector3(0, 0, 0);

const color = new THREE.Color();

export function Items() {
  const counterRef = useRef(0);
  const colors = useMemo(() => {
    const arr = new Float32Array(itemInstanceDescriptors.length * 3);
    for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
      color.set(itemInstanceDescriptors[index].color).toArray(arr, index * 3);
    }
    return arr;
  }, []);

  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const [ref, api] = useBox<InstancedMesh>((index) => ({
    mass: 1,
    position: [0, 20, 0],
    args: [0.8, 0.8, 0.8],
    rotation: itemInstanceDescriptors[index].initialRotationSeed,
    allowSleep: false,
    onCollide: (e) => {
      if (
        counterRef.current > 4 &&
        e.body?.name === 'floor' &&
        !useStore.getState().displayUi
      ) {
        useStore.setState({ displayUi: true });
      }
    },
  }));

  const { at } = api;

  const positionRef = useRef<Triplet[]>([]);

  useEffect(() => {
    if (positionRef.current) {
      for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
        at(index).position.subscribe((p) => {
          positionRef.current[index] = p;
        });
      }
    }
  }, [at]);

  useEffect(() => {
    for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
      const descriptor = itemInstanceDescriptors[index];
      at(index).position.set(...descriptor.spawnPosition);
      at(index).scaleOverride(descriptor.scale);
    }
  }, [at]);

  useFrame(({ clock }) => {
    counterRef.current = clock.getElapsedTime();

    for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
      if (ref.current) {
        const descriptor = itemInstanceDescriptors[index];
        (index === hovered || index === useStore.getState().isPresenting
          ? color.setRGB(1, 1, 1)
          : color.set(descriptor.color)
        ).toArray(colors, index * 3);
        ref.current.geometry.attributes.color.needsUpdate = true;
      }
    }

    const { sortOption } = useStore.getState();

    if (sortOption === null) {
      return;
    }

    if (sortOption === 'sort') {
      for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
        const [vx, vy, vz] = items[index].sortingVelocity;
        const currentPosition = positionRef.current[index];

        directionVector
          .subVectors(
            targetPositionVector.set(vx, vy, vz),
            currentPositionVector.set(...currentPosition)
          )
          .normalize()
          .multiplyScalar(itemPhysicsConstants.steeringStrength);

        const [x, y, z] = directionVector.toArray();

        at(index).velocity.set(x, y, z);
      }
    } else {
      const itemSet = sets[sortOption];

      for (let index = 0; index < itemInstanceDescriptors.length; index += 1) {
        const currentPosition = positionRef.current[index];

        const direction = directionVector
          .subVectors(
            centerVector,
            currentPositionVector.set(...currentPosition)
          )
          .normalize()
          .multiplyScalar(itemPhysicsConstants.steeringStrength);

        const [x, y, z] = direction.toArray();

        if (itemSet.includes(index)) {
          at(index).velocity.set(x, y, z);
        } else {
          at(index).velocity.set(-x, -1, -z);
        }
      }
    }
  });

  return (
    <instancedMesh
      castShadow
      receiveShadow
      ref={ref}
      args={[undefined, undefined, itemInstanceDescriptors.length]}
      onPointerEnter={(e) => {
        e.stopPropagation();

        setHovered(e.instanceId);
      }}
      onPointerLeave={() => {
        setHovered(undefined);
      }}
      onClick={(e) => {
        e.stopPropagation();

        useStore.setState({ isPresenting: e.instanceId });
      }}
    >
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshPhysicalMaterial
        vertexColors
        roughness={0.1}
        metalness={0}
        transmission={0.6}
      />
    </instancedMesh>
  );
}
