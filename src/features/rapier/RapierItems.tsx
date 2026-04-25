import {
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useMemo, useRef, useEffect, useState, type JSX } from 'react';
import {
  Color,
  InstancedMesh,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  RGBADepthPacking,
  Vector3,
} from 'three';

import { items, sets } from '../../data/items';
import { useStore } from '../../store/store';
import { itemInstanceDescriptors } from '../physics/itemInstanceDescriptors';
import { itemPhysicsConstants, rapierPhysicsConstants } from '../physics/constants';

const instanceCount = itemInstanceDescriptors.length;
const color = new Color();
const directionVector = new Vector3();
const currentPositionVector = new Vector3();
const targetPositionVector = new Vector3();
const centerTargetVector = new Vector3(...itemPhysicsConstants.centerTarget);

export function RapierItems(): JSX.Element {
  const ref = useRef<InstancedMesh>(null);
  const bodiesRef = useRef<(RapierRigidBody | null)[] | null>(null);
  const isPresenting = useStore((state) => state.isPresenting);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const cubeContactControls = useControls('Rapier cube contact', {
    cubeFriction: {
      value: rapierPhysicsConstants.items.friction,
      min: 0,
      max: 2,
      step: 0.01,
    },
    cubeRestitution: {
      value: rapierPhysicsConstants.items.restitution,
      min: 0,
      max: 1,
      step: 0.01,
    },
    cubeLinearDamping: {
      value: rapierPhysicsConstants.items.linearDamping,
      min: 0,
      max: 5,
      step: 0.01,
    },
    cubeAngularDamping: {
      value: rapierPhysicsConstants.items.angularDamping,
      min: 0,
      max: 5,
      step: 0.01,
    },
  });
  const steeringControls = useControls('Rapier steering', {
    sortPull: {
      value: rapierPhysicsConstants.steering.sortPull,
      min: 0,
      max: 40,
      step: 0.25,
    },
    setMatchSeek: {
      value: rapierPhysicsConstants.steering.setMatchSeek,
      min: 0,
      max: 40,
      step: 0.25,
    },
    setMissRepel: {
      value: rapierPhysicsConstants.steering.setMissRepel,
      min: 0,
      max: 40,
      step: 0.25,
    },
  });

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
  const shadowDepthMaterial = useMemo(
    () =>
      new MeshDepthMaterial({
        depthPacking: RGBADepthPacking,
      }),
    []
  );
  const shadowDistanceMaterial = useMemo(() => new MeshDistanceMaterial(), []);

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

  useFrame(() => {
    // Keep interaction bounds aligned with physics-driven instance transforms.
    ref.current?.computeBoundingSphere();

    const { sortOption } = useStore.getState();

    if (sortOption === null) {
      return;
    }

    const rigidBodies = bodiesRef.current;

    if (!rigidBodies) {
      return;
    }

    if (sortOption === 'sort') {
      for (let index = 0; index < instanceCount; index += 1) {
        const rigidBody = rigidBodies[index];

        if (rigidBody) {
          const { x, y, z } = rigidBody.translation();
          const [targetX, targetY, targetZ] = items[index].sortingVelocity;

          directionVector
            .subVectors(
              targetPositionVector.set(targetX, targetY, targetZ),
              currentPositionVector.set(x, y, z)
            )
            .normalize()
            .multiplyScalar(steeringControls.sortPull);

          rigidBody.setLinvel(directionVector, true);
        }
      }

      return;
    }

    const itemSet = sets[sortOption];

    for (let index = 0; index < instanceCount; index += 1) {
      const rigidBody = rigidBodies[index];

      if (rigidBody) {
        const { x, y, z } = rigidBody.translation();

        directionVector
          .subVectors(centerTargetVector, currentPositionVector.set(x, y, z))
          .normalize();

        if (itemSet.includes(index)) {
          directionVector.multiplyScalar(steeringControls.setMatchSeek);
          rigidBody.setLinvel(directionVector, true);
        } else {
          rigidBody.setLinvel(
            targetPositionVector.set(
              -directionVector.x * steeringControls.setMissRepel,
              -1,
              -directionVector.z * steeringControls.setMissRepel
            ),
            true
          );
        }
      }
    }
  });

  return (
    <InstancedRigidBodies
      ref={bodiesRef}
      colliders="cuboid"
      instances={instances}
      mass={rapierPhysicsConstants.items.mass}
      canSleep={rapierPhysicsConstants.items.canSleep}
      linearDamping={cubeContactControls.cubeLinearDamping}
      angularDamping={cubeContactControls.cubeAngularDamping}
      restitution={cubeContactControls.cubeRestitution}
      friction={cubeContactControls.cubeFriction}
    >
      <instancedMesh
        castShadow
        receiveShadow
        ref={ref}
        args={[undefined, undefined, instanceCount]}
        customDepthMaterial={shadowDepthMaterial}
        customDistanceMaterial={shadowDistanceMaterial}
        onPointerMove={(e) => {
          e.stopPropagation();

          if (e.instanceId === undefined) {
            return;
          }

          setHovered(e.instanceId);
        }}
        onPointerOut={(e) => {
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
