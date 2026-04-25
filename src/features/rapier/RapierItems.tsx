import {
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
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
import {
  itemPhysicsConstants,
  poolPhysicsBounds,
  rapierPhysicsConstants,
  type PhysicsVector3,
} from '../physics/constants';

const instanceCount = itemInstanceDescriptors.length;
const majorityInPoolCount = Math.floor(instanceCount / 2) + 1;
const color = new Color();
const directionVector = new Vector3();
const currentPositionVector = new Vector3();
const targetPositionVector = new Vector3();
const centerTargetVector = new Vector3(...itemPhysicsConstants.centerTarget);
const poolInnerMinX =
  poolPhysicsBounds.leftWall.position[0] + poolPhysicsBounds.leftWall.size[0] / 2;
const poolInnerMaxX =
  poolPhysicsBounds.rightWall.position[0] - poolPhysicsBounds.rightWall.size[0] / 2;
const poolInnerMinZ =
  poolPhysicsBounds.backWall.position[2] + poolPhysicsBounds.backWall.size[2] / 2;
const poolInnerMaxZ =
  poolPhysicsBounds.frontWall.position[2] - poolPhysicsBounds.frontWall.size[2] / 2;
const poolFloorY = poolPhysicsBounds.floor.position[1] + poolPhysicsBounds.floor.size[1] / 2;
const poolTopY = poolPhysicsBounds.leftWall.position[1] + poolPhysicsBounds.leftWall.size[1] / 2;
const centerAreaRadiusSquared = rapierPhysicsConstants.steering.centerAreaRadius ** 2;

function createCenterAreaOffset(index: number): PhysicsVector3 {
  const seed = index + 1;
  const angle = seed * 2.399963229728653;
  const radius = Math.sqrt((seed % 17) / 16) * rapierPhysicsConstants.steering.centerAreaRadius;

  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}

const centerAreaOffsets: PhysicsVector3[] = itemInstanceDescriptors.map((descriptor) =>
  createCenterAreaOffset(descriptor.index)
);

function blendVelocity(
  rigidBody: RapierRigidBody,
  targetX: number,
  targetY: number,
  targetZ: number,
  blendFactor: number
): void {
  const currentVelocity = rigidBody.linvel();
  targetPositionVector.set(targetX, targetY, targetZ);
  targetPositionVector.lerp(
    currentPositionVector.set(currentVelocity.x, currentVelocity.y, currentVelocity.z),
    1 - blendFactor
  );
  rigidBody.setLinvel(targetPositionVector, true);
}

export function RapierItems(): JSX.Element {
  const ref = useRef<InstancedMesh>(null);
  const bodiesRef = useRef<(RapierRigidBody | null)[] | null>(null);
  const hasRevealedUiRef = useRef<boolean>(false);
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

    const storeState = useStore.getState();
    const { sortOption } = storeState;

    const rigidBodies = bodiesRef.current;

    if (!rigidBodies) {
      return;
    }

    if (!hasRevealedUiRef.current) {
      if (storeState.displayUi) {
        hasRevealedUiRef.current = true;
      } else {
        let inPoolCount = 0;

        for (let index = 0; index < instanceCount; index += 1) {
          const rigidBody = rigidBodies[index];

          if (rigidBody) {
            const { x, y, z } = rigidBody.translation();
            const isInsidePoolVolume =
              x >= poolInnerMinX &&
              x <= poolInnerMaxX &&
              z >= poolInnerMinZ &&
              z <= poolInnerMaxZ &&
              y >= poolFloorY &&
              y <= poolTopY;

            if (isInsidePoolVolume) {
              inPoolCount += 1;
            }
          }
        }

        if (inPoolCount >= majorityInPoolCount) {
          useStore.setState({ displayUi: true });
          hasRevealedUiRef.current = true;
        }
      }
    }

    if (sortOption === null) {
      for (let index = 0; index < instanceCount; index += 1) {
        const rigidBody = rigidBodies[index];

        if (rigidBody) {
          blendVelocity(
            rigidBody,
            0,
            0,
            0,
            rapierPhysicsConstants.steering.settleLerp
          );
        }
      }

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
            );
          const distance = directionVector.length();

          if (distance > 0) {
            const targetSpeed = Math.min(
              rapierPhysicsConstants.steering.maxSortSpeed,
              distance * rapierPhysicsConstants.steering.sortPull
            );

            directionVector.normalize().multiplyScalar(targetSpeed);
          } else {
            directionVector.set(0, 0, 0);
          }

          blendVelocity(
            rigidBody,
            directionVector.x,
            directionVector.y,
            directionVector.z,
            rapierPhysicsConstants.steering.activeLerp
          );
        }
      }

      return;
    }

    const itemSet = new Set(sets[sortOption]);

    for (let index = 0; index < instanceCount; index += 1) {
      const rigidBody = rigidBodies[index];

      if (rigidBody) {
        const { x, y, z } = rigidBody.translation();
        const [offsetX, , offsetZ] = centerAreaOffsets[index];
        const targetX = centerTargetVector.x + offsetX;
        const targetZ = centerTargetVector.z + offsetZ;
        const isMatched = itemSet.has(index);

        directionVector.subVectors(
          targetPositionVector.set(targetX, centerTargetVector.y, targetZ),
          currentPositionVector.set(x, y, z)
        );
        const distanceToTarget = directionVector.length();
        const distanceToCenterSquared = x * x + z * z;

        if (isMatched) {
          if (distanceToTarget > 0) {
            const targetSpeed = Math.min(
              rapierPhysicsConstants.steering.maxSetMatchSpeed,
              distanceToTarget * rapierPhysicsConstants.steering.setMatchSeek
            );
            directionVector.normalize().multiplyScalar(targetSpeed);
          } else {
            directionVector.set(0, 0, 0);
          }

          blendVelocity(
            rigidBody,
            directionVector.x,
            directionVector.y,
            directionVector.z,
            rapierPhysicsConstants.steering.activeLerp
          );
        } else {
          if (distanceToCenterSquared <= centerAreaRadiusSquared) {
            directionVector
              .set(x, 0, z)
              .normalize()
              .multiplyScalar(rapierPhysicsConstants.steering.setMissRepel);
          } else {
            directionVector.set(0, -1, 0);
          }

          if (directionVector.lengthSq() > 0) {
            directionVector.setLength(
              Math.min(
                directionVector.length(),
                rapierPhysicsConstants.steering.maxSetMissSpeed
              )
            );
          }

          blendVelocity(
            rigidBody,
            directionVector.x,
            directionVector.y,
            directionVector.z,
            rapierPhysicsConstants.steering.activeLerp
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
      linearDamping={rapierPhysicsConstants.items.linearDamping}
      angularDamping={rapierPhysicsConstants.items.angularDamping}
      restitution={rapierPhysicsConstants.items.restitution}
      friction={rapierPhysicsConstants.items.friction}
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
