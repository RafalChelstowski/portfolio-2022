import { Triplet, useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import { InstancedMesh } from 'three';
import * as THREE from 'three';
import { useStore } from '../store/store';
import { getSize } from '../utils/getSize';
import { items, sets } from '../data/items';

const directionVector = new THREE.Vector3();
const centerVector = new THREE.Vector3(0, -2, 0);
const currentPositionVector = new THREE.Vector3(0, 0, 0);
const targetPositionVector = new THREE.Vector3(0, 0, 0);

const color = new THREE.Color();

export function Items() {
  const colors = useMemo(() => {
    const arr = new Float32Array(items.length * 3);
    for (let index = 0; index < items.length; index += 1) {
      color.set(items[index].customColor).toArray(arr, index * 3);
    }
    return arr;
  }, []);

  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const [ref, api] = useBox<InstancedMesh>(() => ({
    mass: 1,
    position: [0, 20, 0],
    args: [0.8, 0.8, 0.8],
    rotation: [Math.random(), Math.random(), Math.random()],
    allowSleep: false,
    onCollide: (e) => {
      if (e.body?.name === 'floor' && !useStore.getState().displayUi) {
        useStore.setState({ displayUi: true });
      }
    },
  }));

  const { at } = api;

  const positionRef = useRef<Triplet[]>([]);

  useEffect(() => {
    if (positionRef.current) {
      for (let index = 0; index < items.length; index += 1) {
        at(index).position.subscribe((p) => {
          positionRef.current[index] = p;
        });
      }
    }
  }, [at]);

  useEffect(() => {
    for (let index = 0; index < items.length; index += 1) {
      at(index).position.set(0, 12 + index, 0);
      at(index).scaleOverride(getSize(items[index].size));
    }
  }, [at]);

  useFrame(() => {
    for (let index = 0; index < items.length; index += 1) {
      if (ref.current) {
        (index === hovered
          ? color.setRGB(1, 1, 1)
          : color.set(items[index].customColor)
        ).toArray(colors, index * 3);
        ref.current.geometry.attributes.color.needsUpdate = true;
      }
    }

    const { sortOption } = useStore.getState();

    if (sortOption === null) {
      return;
    }

    if (sortOption === 'sort') {
      for (let index = 0; index < items.length; index += 1) {
        const [vx, vy, vz] = items[index].sortingVelocity;
        const currentPosition = positionRef.current[index];

        directionVector
          .subVectors(
            targetPositionVector.set(vx, vy, vz),
            currentPositionVector.set(...currentPosition)
          )
          .normalize()
          .multiplyScalar(10);

        const [x, y, z] = directionVector.toArray();

        at(index).velocity.set(x, y, z);
      }
    } else {
      const itemSet = sets[sortOption];

      for (let index = 0; index < items.length; index += 1) {
        const currentPosition = positionRef.current[index];

        const direction = directionVector
          .subVectors(
            centerVector,
            currentPositionVector.set(...currentPosition)
          )
          .normalize()
          .multiplyScalar(10);

        const [x, y, z] = direction.toArray();

        if (itemSet.includes(index)) {
          at(index).velocity.set(x, y, z);
        } else {
          at(index).velocity.set(-x, y, -z);
        }
      }
    }
  });

  return (
    <instancedMesh
      castShadow
      receiveShadow
      ref={ref}
      args={[undefined, undefined, items.length]}
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
      <boxBufferGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxBufferGeometry>
      <meshStandardMaterial vertexColors roughness={0.8} metalness={0.4} />
    </instancedMesh>
  );
}
