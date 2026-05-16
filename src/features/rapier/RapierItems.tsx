import {
  BallCollider,
  ConeCollider,
  CuboidCollider,
  CylinderCollider,
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
  type MutableRefObject,
  type ReactNode,
} from 'react';
import {
  Color,
  type BufferAttribute,
  InstancedMesh,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  RGBADepthPacking,
  Vector3,
} from 'three';

import { items, mainCategoryGroups, projectConstellationGroups } from '../../data/items';
import type { ItemFamily, MainCategory, ProjectConstellation } from '../../types';
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
const familyOrder: ItemFamily[] = ['project', 'ai', 'stack', 'creative', 'career'];

interface FamilyBatch {
  family: ItemFamily;
  indexes: number[];
  bodySlotToItemIndex: Map<number, number>;
  instances: InstancedRigidBodyProps[];
  colors: Float32Array;
}

interface FamilyBatchRuntime {
  bodies: (RapierRigidBody | null)[] | null;
  mesh: InstancedMesh | null;
}

type FamilyBodiesRef = MutableRefObject<(RapierRigidBody | null)[] | null>;
type FamilyVisualGeometry =
  | { kind: 'box'; args: [width: number, height: number, depth: number] }
  | { kind: 'cone'; args: [radius: number, height: number, radialSegments: number] }
  | { kind: 'icosahedron'; args: [radius: number, detail: number] }
  | { kind: 'dodecahedron'; args: [radius: number, detail: number] }
  | {
      kind: 'cylinder';
      args: [radiusTop: number, radiusBottom: number, height: number, radialSegments: number];
    };
type FamilyColliderDimensions =
  | { kind: 'cuboid'; args: [halfWidth: number, halfHeight: number, halfDepth: number] }
  | { kind: 'cone'; args: [halfHeight: number, radius: number] }
  | { kind: 'ball'; args: [radius: number] }
  | { kind: 'cylinder'; args: [halfHeight: number, radius: number] };

const familyVisualGeometryDimensions: Record<ItemFamily, FamilyVisualGeometry> = {
  project: { kind: 'box', args: [1, 1, 1] },
  ai: { kind: 'cone', args: [0.72, 1.24, 3] },
  stack: { kind: 'icosahedron', args: [0.8, 0] },
  creative: { kind: 'dodecahedron', args: [0.64, 0] },
  career: { kind: 'cylinder', args: [0.65, 0.65, 1.18, 5] },
};

const familyColliderDimensions: Record<ItemFamily, FamilyColliderDimensions> = {
  project: { kind: 'cuboid', args: [0.5, 0.5, 0.5] },
  ai: { kind: 'cone', args: [0.62, 0.54] },
  stack: { kind: 'ball', args: [0.78] },
  creative: { kind: 'ball', args: [0.82] },
  career: { kind: 'cylinder', args: [0.59, 0.62] },
};

function createFamilyBodiesRef(): FamilyBodiesRef {
  return { current: null };
}

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

function FamilyGeometry({ family, colors }: { family: ItemFamily; colors: Float32Array }): JSX.Element {
  const dimensions = familyVisualGeometryDimensions[family];

  if (dimensions.kind === 'box') {
    return (
      <boxGeometry args={dimensions.args}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
    );
  }

  if (dimensions.kind === 'cone') {
    return (
      <coneGeometry args={dimensions.args}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </coneGeometry>
    );
  }

  if (dimensions.kind === 'icosahedron') {
    return (
      <icosahedronGeometry args={dimensions.args}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </icosahedronGeometry>
    );
  }

  if (dimensions.kind === 'dodecahedron') {
    return (
      <dodecahedronGeometry args={dimensions.args}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </dodecahedronGeometry>
    );
  }

  return (
    <cylinderGeometry args={dimensions.args}>
      <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
    </cylinderGeometry>
  );
}

function getFamilyColliderNodes(family: ItemFamily): ReactNode[] {
  const dimensions = familyColliderDimensions[family];

  if (dimensions.kind === 'cuboid') {
    return [<CuboidCollider key={`${family}-collider`} args={dimensions.args} />];
  }

  if (dimensions.kind === 'cone') {
    return [<ConeCollider key={`${family}-collider`} args={dimensions.args} />];
  }

  if (dimensions.kind === 'ball') {
    return [<BallCollider key={`${family}-collider`} args={dimensions.args} />];
  }

  return [<CylinderCollider key={`${family}-collider`} args={dimensions.args} />];
}

export function RapierItems(): JSX.Element {
  const familyBodiesRef = useRef<Record<ItemFamily, FamilyBodiesRef>>({
    project: createFamilyBodiesRef(),
    ai: createFamilyBodiesRef(),
    stack: createFamilyBodiesRef(),
    creative: createFamilyBodiesRef(),
    career: createFamilyBodiesRef(),
  });
  const familyRuntimeRef = useRef<Record<ItemFamily, FamilyBatchRuntime>>({
    project: { bodies: null, mesh: null },
    ai: { bodies: null, mesh: null },
    stack: { bodies: null, mesh: null },
    creative: { bodies: null, mesh: null },
    career: { bodies: null, mesh: null },
  });
  const bodyByItemIndexRef = useRef<(RapierRigidBody | null)[]>(Array(instanceCount).fill(null));
  const firstPoolContactByIndexRef = useRef<boolean[]>(Array(instanceCount).fill(false));
  const hasRevealedUiRef = useRef<boolean>(false);
  const isPresenting = useStore((state) => state.isPresenting);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isPresenting !== null) {
      setHovered(undefined);
    }
  }, [isPresenting]);

  const markFirstPoolContact = useCallback((index: number, payload: CollisionEnterPayload): void => {
    if (firstPoolContactByIndexRef.current[index]) {
      return;
    }

    const otherName = payload.other.rigidBodyObject?.name ?? payload.other.colliderObject?.name;

    if (otherName === rapierColliderNames.floor || otherName === rapierColliderNames.catchSurface) {
      firstPoolContactByIndexRef.current[index] = true;
    }
  }, []);

  const familyBatches = useMemo<FamilyBatch[]>(() => {
    const batches = familyOrder.map((family) => {
      const indexes = itemInstanceDescriptors
        .filter((descriptor) => items[descriptor.index].family === family)
        .map((descriptor) => descriptor.index);
      const bodySlotToItemIndex = new Map<number, number>();

      const familyInstances = indexes.map<InstancedRigidBodyProps>((itemIndex, localBodySlot) => {
        const descriptor = itemInstanceDescriptors[itemIndex];
        bodySlotToItemIndex.set(localBodySlot, itemIndex);

        return {
          key: localBodySlot,
          position: descriptor.spawnPosition,
          rotation: descriptor.initialRotationSeed,
          scale: descriptor.scale,
          onCollisionEnter: (payload) => {
            markFirstPoolContact(itemIndex, payload);
          },
        };
      });
      const familyColors = new Float32Array(indexes.length * 3);

      for (let localIndex = 0; localIndex < indexes.length; localIndex += 1) {
        const itemIndex = indexes[localIndex];
        color.set(itemInstanceDescriptors[itemIndex].color);
        familyColors[localIndex * 3] = color.r;
        familyColors[localIndex * 3 + 1] = color.g;
        familyColors[localIndex * 3 + 2] = color.b;
      }

      return {
        family,
        indexes,
        bodySlotToItemIndex,
        instances: familyInstances,
        colors: familyColors,
      };
    });

    return batches.filter((batch) => batch.indexes.length > 0);
  }, [markFirstPoolContact]);

  const shadowDepthMaterial = useMemo(
    () =>
      new MeshDepthMaterial({
        depthPacking: RGBADepthPacking,
      }),
    []
  );
  const shadowDistanceMaterial = useMemo(() => new MeshDistanceMaterial(), []);

  useEffect(() => {
    familyBatches.forEach((batch) => {
      const { colors: batchColors } = batch;

      for (let localIndex = 0; localIndex < batch.indexes.length; localIndex += 1) {
        const itemIndex = batch.indexes[localIndex];
        const descriptor = itemInstanceDescriptors[itemIndex];

        if (itemIndex === hovered || itemIndex === isPresenting) {
          color.setRGB(1, 1, 1);
        } else {
          color.set(descriptor.color);
        }

        batchColors[localIndex * 3] = color.r;
        batchColors[localIndex * 3 + 1] = color.g;
        batchColors[localIndex * 3 + 2] = color.b;
      }

      const { mesh } = familyRuntimeRef.current[batch.family];
      const colorAttribute = mesh?.geometry.getAttribute('color') as BufferAttribute | undefined;

      if (colorAttribute) {
        colorAttribute.needsUpdate = true;
      }
    });
  }, [familyBatches, hovered, isPresenting]);

  useFrame(() => {
    // Keep interaction bounds aligned with physics-driven instance transforms.
    familyOrder.forEach((family) => {
      familyRuntimeRef.current[family].mesh?.computeBoundingSphere();
    });

    const storeState = useStore.getState();
    const { sortOption } = storeState;

    const rigidBodies = bodyByItemIndexRef.current;
    let hasAnyBody = false;

    for (let index = 0; index < rigidBodies.length; index += 1) {
      rigidBodies[index] = null;
    }

    familyBatches.forEach((batch) => {
      const batchBodies = familyBodiesRef.current[batch.family].current;
      familyRuntimeRef.current[batch.family].bodies = batchBodies;

      if (batchBodies) {
        for (let bodySlot = 0; bodySlot < batchBodies.length; bodySlot += 1) {
          const itemIndex = batch.bodySlotToItemIndex.get(bodySlot);
          const body = batchBodies[bodySlot];

          if (itemIndex !== undefined && body) {
            hasAnyBody = true;
            rigidBodies[itemIndex] = body;
          }
        }
      }
    });

    if (!hasAnyBody) {
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

            if (isInsidePoolVolume && firstPoolContactByIndexRef.current[index]) {
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
      return;
    }

    if (sortOption === 'sort') {
      for (let index = 0; index < instanceCount; index += 1) {
        const rigidBody = rigidBodies[index];

        if (rigidBody) {
          const { x, y, z } = rigidBody.translation();
          const [targetX, targetY, targetZ] = items[index].sortingVelocity;

          directionVector.subVectors(
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
        const distanceToCenterSquared = centerDeltaX * centerDeltaX + centerDeltaZ * centerDeltaZ;

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
          const nearCenterBoost = distanceToCenterSquared <= centerAreaRadiusSquared ? 1.6 : 1;
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
    <>
      {familyBatches.map((batch) => (
        <InstancedRigidBodies
          key={batch.family}
          ref={familyBodiesRef.current[batch.family]}
          colliders={false}
          colliderNodes={getFamilyColliderNodes(batch.family)}
          instances={batch.instances}
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
            ref={(value) => {
              familyRuntimeRef.current[batch.family].mesh = value;
            }}
            args={[undefined, undefined, batch.indexes.length]}
            customDepthMaterial={shadowDepthMaterial}
            customDistanceMaterial={shadowDistanceMaterial}
            onPointerMove={(e) => {
              e.stopPropagation();

              if (e.instanceId === undefined) {
                return;
              }

              setHovered(batch.indexes[e.instanceId]);
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

              useStore.setState({
                isPresenting: batch.indexes[e.instanceId],
                sortOption: null,
              });
            }}
          >
            <FamilyGeometry family={batch.family} colors={batch.colors} />
            <meshPhysicalMaterial vertexColors roughness={0.1} metalness={0} transmission={0.6} />
          </instancedMesh>
        </InstancedRigidBodies>
      ))}
    </>
  );
}
