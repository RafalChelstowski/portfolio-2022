import {
  InstancedRigidBodies,
  type CollisionEnterPayload,
  type InstancedRigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  type JSX,
} from 'react';
import {
  Color,
  InstancedMesh,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  RGBADepthPacking,
  Vector3,
} from 'three';

import {
  items,
  mainCategoryGroups,
  projectConstellationGroups,
} from '../../data/items';
import type { MainCategory, ProjectConstellation } from '../../types';
import { useStore } from '../../store/store';
import { itemInstanceDescriptors } from '../physics/itemInstanceDescriptors';
import {
  itemPhysicsConstants,
  poolPhysicsBounds,
  rapierColliderNames,
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
  const firstPoolContactByIndexRef = useRef<boolean[]>(Array(instanceCount).fill(false));
  const hasRevealedUiRef = useRef<boolean>(false);
  const isPresenting = useStore((state) => state.isPresenting);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isPresenting !== null) {
      setHovered(undefined);
    }
  }, [isPresenting]);

  const markFirstPoolContact = useCallback(
    (index: number, payload: CollisionEnterPayload): void => {
      if (firstPoolContactByIndexRef.current[index]) {
        return;
      }

      const otherName =
        payload.other.rigidBodyObject?.name ?? payload.other.colliderObject?.name;

      if (
        otherName === rapierColliderNames.floor ||
        otherName === rapierColliderNames.catchSurface
      ) {
        firstPoolContactByIndexRef.current[index] = true;
      }
    },
    []
  );

  const instances = useMemo<InstancedRigidBodyProps[]>(
    () =>
      itemInstanceDescriptors.map((descriptor) => ({
        key: descriptor.index,
        position: descriptor.spawnPosition,
        rotation: descriptor.initialRotationSeed,
        scale: descriptor.scale,
        onCollisionEnter: (payload) => {
          markFirstPoolContact(descriptor.index, payload);
        },
      })),
    [markFirstPoolContact]
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

            if (
              isInsidePoolVolume &&
              firstPoolContactByIndexRef.current[index]
            ) {
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
          if (!firstPoolContactByIndexRef.current[index]) {
            blendVelocity(
              rigidBody,
              0,
              -itemPhysicsConstants.spawnFastDropSpeed,
              0,
              rapierPhysicsConstants.steering.activeLerp
            );
          } else {
            blendVelocity(
              rigidBody,
              0,
              0,
              0,
              rapierPhysicsConstants.steering.settleLerp
            );
          }
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

    const groupedIndexes =
      sortOption in mainCategoryGroups
        ? mainCategoryGroups[sortOption as MainCategory]
        : projectConstellationGroups[sortOption as ProjectConstellation];
    const itemSet = new Set(groupedIndexes);

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
        const centerDeltaX = x - centerTargetVector.x;
        const centerDeltaZ = z - centerTargetVector.z;
        const distanceToCenterSquared =
          centerDeltaX * centerDeltaX + centerDeltaZ * centerDeltaZ;

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
          const distanceToCenter = Math.sqrt(distanceToCenterSquared);
          const [fallbackX, , fallbackZ] = centerAreaOffsets[index];
          const repelDirectionX =
            distanceToCenter > 0.001 ? centerDeltaX / distanceToCenter : fallbackX;
          const repelDirectionZ =
            distanceToCenter > 0.001 ? centerDeltaZ / distanceToCenter : fallbackZ;
          const nearCenterBoost =
            distanceToCenterSquared <= centerAreaRadiusSquared ? 1.6 : 1;
          const targetMissSpeed = Math.min(
            rapierPhysicsConstants.steering.maxSetMissSpeed,
            rapierPhysicsConstants.steering.setMissRepel * nearCenterBoost
          );

          directionVector.set(
            repelDirectionX * targetMissSpeed,
            -0.35,
            repelDirectionZ * targetMissSpeed
          );

          if (directionVector.lengthSq() === 0) {
            directionVector.set(0, -0.35, 0);
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
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(undefined);
        }}
        onPointerMissed={() => {
          setHovered(undefined);
        }}
        onClick={(e) => {
          e.stopPropagation();

          if (e.instanceId === undefined) {
            return;
          }

          useStore.setState({ isPresenting: e.instanceId, sortOption: null });
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
