import {
  BallCollider,
  CuboidCollider,
  InstancedRigidBodies,
  type CollisionEnterPayload,
  type InstancedRigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
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
  type BufferGeometry,
  Color,
  type BufferAttribute,
  Float32BufferAttribute,
  InstancedMesh,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  NoColorSpace,
  RGBADepthPacking,
  RepeatWrapping,
  SRGBColorSpace,
  Vector2,
  Vector3,
  type Texture,
} from 'three';

import { getGroupItemIndexes, items } from '../../data/items';
import type { ItemFamily } from '../../types';
import { type ActiveGatherState, useStore } from '../../store/store';
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
const colorLiftTarget = new Color('#ffffff');
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
const familyOrder: ItemFamily[] = ['project', 'ai', 'stack', 'creative', 'career', 'learning'];

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
  | { kind: 'icosahedron'; args: [radius: number, detail: number] }
  | { kind: 'octahedron'; args: [radius: number, detail: number] }
  | { kind: 'dodecahedron'; args: [radius: number, detail: number] };
type FamilyColliderDimensions =
  | { kind: 'cuboid'; args: [halfWidth: number, halfHeight: number, halfDepth: number] }
  | { kind: 'ball'; args: [radius: number] };
interface FamilyMaterialSettings {
  color: string;
  emissive: string;
  emissiveIntensity: number;
  roughness: number;
  metalness: number;
  transmission: number;
  thickness: number;
  ior: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
  opacity: number;
  transparent: boolean;
  normalScale: Vector2;
}

interface MarbleTextures {
  map: Texture;
  normalMap: Texture;
  roughnessMap: Texture;
}

interface MarbleItemSettings {
  clearcoat: number;
  colorLift: number;
  envMapIntensity: number;
  normalStrength: number;
  roughness: number;
  shapeScale: number;
  textureRepeat: number;
}

const familyVisualGeometryDimensions: Record<ItemFamily, FamilyVisualGeometry> = {
  project: { kind: 'box', args: [1, 1, 1] },
  ai: { kind: 'icosahedron', args: [0.78, 0] },
  stack: { kind: 'icosahedron', args: [0.8, 0] },
  creative: { kind: 'dodecahedron', args: [0.64, 0] },
  career: { kind: 'box', args: [1.08, 0.92, 1.08] },
  learning: { kind: 'octahedron', args: [0.74, 0] },
};

const familyColliderDimensions: Record<ItemFamily, FamilyColliderDimensions> = {
  project: { kind: 'cuboid', args: [0.5, 0.5, 0.5] },
  ai: { kind: 'ball', args: [0.72] },
  stack: { kind: 'ball', args: [0.78] },
  creative: { kind: 'ball', args: [0.64] },
  career: { kind: 'cuboid', args: [0.54, 0.46, 0.54] },
  learning: { kind: 'ball', args: [0.72] },
};

const marbleTexturePaths = {
  map: '/marble/Poliigon_StoneQuartzite_8060_BaseColor.jpg',
  normalMap: '/marble/Poliigon_StoneQuartzite_8060_Normal.png',
  roughnessMap: '/marble/Poliigon_StoneQuartzite_8060_Roughness.jpg',
};
const marbleTextureRepeat = new Vector2(0.55, 0.55);
const marbleNormalScale = new Vector2(0.45, 0.45);
const marbleItemDefaults: MarbleItemSettings = {
  clearcoat: 0.35,
  colorLift: 0.18,
  envMapIntensity: 0.9,
  normalStrength: 0.45,
  roughness: 0.36,
  shapeScale: 1.3,
  textureRepeat: 0.55,
};

const heroMaterialSettings: FamilyMaterialSettings = {
  color: '#ffffff',
  emissive: '#160c08',
  emissiveIntensity: 0.02,
  roughness: marbleItemDefaults.roughness,
  metalness: 0,
  transmission: 0.02,
  thickness: 0.16,
  ior: 1.44,
  clearcoat: marbleItemDefaults.clearcoat,
  clearcoatRoughness: 0.26,
  envMapIntensity: marbleItemDefaults.envMapIntensity,
  opacity: 1,
  transparent: false,
  normalScale: marbleNormalScale,
};

const secondaryMaterialSettings: FamilyMaterialSettings = {
  color: '#ffffff',
  emissive: '#07141d',
  emissiveIntensity: 0.02,
  roughness: marbleItemDefaults.roughness,
  metalness: 0,
  transmission: 0.01,
  thickness: 0.12,
  ior: 1.38,
  clearcoat: marbleItemDefaults.clearcoat,
  clearcoatRoughness: 0.3,
  envMapIntensity: marbleItemDefaults.envMapIntensity,
  opacity: 1,
  transparent: false,
  normalScale: marbleNormalScale,
};

const quietMaterialSettings: FamilyMaterialSettings = {
  color: '#ffffff',
  emissive: '#071018',
  emissiveIntensity: 0.015,
  roughness: marbleItemDefaults.roughness,
  metalness: 0,
  transmission: 0,
  thickness: 0.08,
  ior: 1.32,
  clearcoat: marbleItemDefaults.clearcoat,
  clearcoatRoughness: 0.44,
  envMapIntensity: marbleItemDefaults.envMapIntensity,
  opacity: 0.98,
  transparent: false,
  normalScale: marbleNormalScale,
};

const familyMaterialSettings: Record<ItemFamily, FamilyMaterialSettings> = {
  project: heroMaterialSettings,
  career: heroMaterialSettings,
  ai: secondaryMaterialSettings,
  creative: secondaryMaterialSettings,
  stack: secondaryMaterialSettings,
  learning: quietMaterialSettings,
};

function createFamilyBodiesRef(): FamilyBodiesRef {
  return { current: null };
}

function configureMarbleTexture(
  texture: Texture,
  repeat: number,
  isColorTexture = false
): void {
  const configuredTexture = texture;
  configuredTexture.wrapS = RepeatWrapping;
  configuredTexture.wrapT = RepeatWrapping;
  marbleTextureRepeat.set(repeat, repeat);
  configuredTexture.repeat.copy(marbleTextureRepeat);
  configuredTexture.anisotropy = 4;
  configuredTexture.colorSpace = isColorTexture ? SRGBColorSpace : NoColorSpace;

  configuredTexture.needsUpdate = true;
}

function applyObjectSpaceMarbleUvs(geometry: BufferGeometry): void {
  const positionAttribute = geometry.getAttribute('position');
  const normalAttribute = geometry.getAttribute('normal');
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox;

  if (!positionAttribute || !normalAttribute || !bounds) {
    return;
  }

  const uvs = new Float32Array(positionAttribute.count * 2);
  const sizeX = Math.max(0.0001, bounds.max.x - bounds.min.x);
  const sizeY = Math.max(0.0001, bounds.max.y - bounds.min.y);
  const sizeZ = Math.max(0.0001, bounds.max.z - bounds.min.z);

  for (let index = 0; index < positionAttribute.count; index += 1) {
    const x = positionAttribute.getX(index);
    const y = positionAttribute.getY(index);
    const z = positionAttribute.getZ(index);
    const normalX = Math.abs(normalAttribute.getX(index));
    const normalY = Math.abs(normalAttribute.getY(index));
    const normalZ = Math.abs(normalAttribute.getZ(index));

    if (normalX >= normalY && normalX >= normalZ) {
      uvs[index * 2] = (z - bounds.min.z) / sizeZ;
      uvs[index * 2 + 1] = (y - bounds.min.y) / sizeY;
    } else if (normalY >= normalX && normalY >= normalZ) {
      uvs[index * 2] = (x - bounds.min.x) / sizeX;
      uvs[index * 2 + 1] = (z - bounds.min.z) / sizeZ;
    } else {
      uvs[index * 2] = (x - bounds.min.x) / sizeX;
      uvs[index * 2 + 1] = (y - bounds.min.y) / sizeY;
    }
  }

  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
}

function applyReadableVertexColor(sourceColor: string, colorLift: number): void {
  color.set(sourceColor);
  color.lerp(colorLiftTarget, colorLift);
}

function useMarbleTextures(textureRepeat: number): MarbleTextures {
  const map = useTexture(marbleTexturePaths.map);
  const normalMap = useTexture(marbleTexturePaths.normalMap);
  const roughnessMap = useTexture(marbleTexturePaths.roughnessMap);

  useEffect(() => {
    configureMarbleTexture(map, textureRepeat, true);
    configureMarbleTexture(normalMap, textureRepeat);
    configureMarbleTexture(roughnessMap, textureRepeat);
  }, [map, normalMap, roughnessMap, textureRepeat]);

  return {
    map,
    normalMap,
    roughnessMap,
  };
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

function getGatherDecayFactor(startedAt: number, now: number): number {
  const elapsedMs = now - startedAt;
  const progress = elapsedMs / rapierPhysicsConstants.steering.gatherDurationMs;

  return Math.max(0, Math.min(1, 1 - progress));
}

function isGatherInProgress(activeGather: ActiveGatherState | null, now: number): boolean {
  return activeGather !== null && getGatherDecayFactor(activeGather.startedAt, now) > 0;
}

function FamilyGeometry({ family, colors }: { family: ItemFamily; colors: Float32Array }): JSX.Element {
  const dimensions = familyVisualGeometryDimensions[family];

  if (dimensions.kind === 'box') {
    return (
      <boxGeometry args={dimensions.args} onUpdate={applyObjectSpaceMarbleUvs}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
    );
  }

  if (dimensions.kind === 'icosahedron') {
    return (
      <icosahedronGeometry args={dimensions.args} onUpdate={applyObjectSpaceMarbleUvs}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </icosahedronGeometry>
    );
  }

  if (dimensions.kind === 'octahedron') {
    return (
      <octahedronGeometry args={dimensions.args} onUpdate={applyObjectSpaceMarbleUvs}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </octahedronGeometry>
    );
  }

  if (dimensions.kind === 'dodecahedron') {
    return (
      <dodecahedronGeometry args={dimensions.args} onUpdate={applyObjectSpaceMarbleUvs}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </dodecahedronGeometry>
    );
  }

  const exhaustiveCheck: never = dimensions;
  return exhaustiveCheck;
}

function FamilyMaterial({
  family,
  marbleSettings,
  marbleTextures,
}: {
  family: ItemFamily;
  marbleSettings: MarbleItemSettings;
  marbleTextures: MarbleTextures;
}): JSX.Element {
  const settings = familyMaterialSettings[family];
  marbleNormalScale.set(marbleSettings.normalStrength, marbleSettings.normalStrength);

  return (
    <meshPhysicalMaterial
      vertexColors
      map={marbleTextures.map}
      normalMap={marbleTextures.normalMap}
      roughnessMap={marbleTextures.roughnessMap}
      color={settings.color}
      emissive={settings.emissive}
      emissiveIntensity={settings.emissiveIntensity}
      roughness={marbleSettings.roughness}
      metalness={settings.metalness}
      normalScale={marbleNormalScale}
      transmission={settings.transmission}
      thickness={settings.thickness}
      ior={settings.ior}
      clearcoat={marbleSettings.clearcoat}
      clearcoatRoughness={settings.clearcoatRoughness}
      envMapIntensity={marbleSettings.envMapIntensity}
      opacity={settings.opacity}
      transparent={settings.transparent}
    />
  );
}

function getFamilyColliderNodes(family: ItemFamily): ReactNode[] {
  const dimensions = familyColliderDimensions[family];

  if (dimensions.kind === 'cuboid') {
    return [<CuboidCollider key={`${family}-collider`} args={dimensions.args} />];
  }

  return [<BallCollider key={`${family}-collider`} args={dimensions.args} />];
}

export function RapierItems(): JSX.Element {
  const familyBodiesRef = useRef<Record<ItemFamily, FamilyBodiesRef>>({
    project: createFamilyBodiesRef(),
    ai: createFamilyBodiesRef(),
    stack: createFamilyBodiesRef(),
    creative: createFamilyBodiesRef(),
    career: createFamilyBodiesRef(),
    learning: createFamilyBodiesRef(),
  });
  const familyRuntimeRef = useRef<Record<ItemFamily, FamilyBatchRuntime>>({
    project: { bodies: null, mesh: null },
    ai: { bodies: null, mesh: null },
    stack: { bodies: null, mesh: null },
    creative: { bodies: null, mesh: null },
    career: { bodies: null, mesh: null },
    learning: { bodies: null, mesh: null },
  });
  const bodyByItemIndexRef = useRef<(RapierRigidBody | null)[]>(Array(instanceCount).fill(null));
  const firstPoolContactByIndexRef = useRef<boolean[]>(Array(instanceCount).fill(false));
  const hasRevealedUiRef = useRef<boolean>(false);
  const presentation = useStore((state) => state.presentation);
  const presentItem = useStore((state) => state.presentItem);
  const presentGroup = useStore((state) => state.presentGroup);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const presentedItemIndex = presentation.type === 'item' ? presentation.itemIndex : null;
  const isPresentingGroup = presentation.type === 'group';
  const canInteractWithItems = !isPresentingGroup;
  const marbleSettings = useControls(
    'Marble Items',
    {
      colorLift: {
        value: marbleItemDefaults.colorLift,
        min: 0,
        max: 0.55,
        step: 0.01,
      },
      textureRepeat: {
        value: marbleItemDefaults.textureRepeat,
        min: 0.2,
        max: 2,
        step: 0.05,
      },
      normalStrength: {
        value: marbleItemDefaults.normalStrength,
        min: 0,
        max: 1,
        step: 0.02,
      },
      roughness: {
        value: marbleItemDefaults.roughness,
        min: 0.12,
        max: 0.8,
        step: 0.02,
      },
      shapeScale: {
        value: marbleItemDefaults.shapeScale,
        min: 1,
        max: 2.1,
        step: 0.05,
      },
      clearcoat: {
        value: marbleItemDefaults.clearcoat,
        min: 0,
        max: 0.9,
        step: 0.02,
      },
      envMapIntensity: {
        value: marbleItemDefaults.envMapIntensity,
        min: 0,
        max: 1.8,
        step: 0.05,
      },
    },
    { collapsed: true, render: () => import.meta.env.DEV }
  );
  const marbleTextures = useMarbleTextures(marbleSettings.textureRepeat);

  useEffect(() => {
    if (isPresentingGroup) {
      setHovered(undefined);
    }
  }, [isPresentingGroup]);

  const markFirstPoolContact = useCallback((index: number, payload: CollisionEnterPayload): void => {
    if (firstPoolContactByIndexRef.current[index]) {
      return;
    }

    const otherName = payload.other.rigidBodyObject?.name ?? payload.other.colliderObject?.name;

    if (otherName === rapierColliderNames.floor || otherName === rapierColliderNames.catchSurface) {
      firstPoolContactByIndexRef.current[index] = true;
    }
  }, []);

  const presentClickedItem = useCallback(
    (itemIndex: number): void => {
      const {
        activeGather,
        presentation: currentPresentation,
        selectedGroup,
      } = useStore.getState();
      const itemBodyPosition = bodyByItemIndexRef.current[itemIndex]?.translation();
      const targetPosition: [number, number, number] = itemBodyPosition
        ? [itemBodyPosition.x, itemBodyPosition.y, itemBodyPosition.z]
        : itemInstanceDescriptors[itemIndex].spawnPosition;

      if (currentPresentation.type === 'item') {
        presentItem(itemIndex, targetPosition);
        return;
      }

      if (!selectedGroup || isGatherInProgress(activeGather, Date.now())) {
        presentItem(itemIndex, targetPosition);
        return;
      }

      const groupedIndexes = getGroupItemIndexes(selectedGroup);

      if (groupedIndexes.includes(itemIndex)) {
        presentGroup(selectedGroup);
        return;
      }

      presentItem(itemIndex, targetPosition);
    },
    [presentGroup, presentItem]
  );

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
          scale: [
            descriptor.scale[0] * marbleSettings.shapeScale,
            descriptor.scale[1] * marbleSettings.shapeScale,
            descriptor.scale[2] * marbleSettings.shapeScale,
          ],
          mass: rapierPhysicsConstants.items.massBySize[descriptor.scaleSource],
          onCollisionEnter: (payload) => {
            markFirstPoolContact(itemIndex, payload);
          },
        };
      });
      const familyColors = new Float32Array(indexes.length * 3);

      for (let localIndex = 0; localIndex < indexes.length; localIndex += 1) {
        const itemIndex = indexes[localIndex];
        applyReadableVertexColor(itemInstanceDescriptors[itemIndex].color, marbleSettings.colorLift);
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
  }, [marbleSettings.colorLift, marbleSettings.shapeScale, markFirstPoolContact]);

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

        if (itemIndex === hovered || itemIndex === presentedItemIndex) {
          color.setRGB(1, 1, 1);
        } else {
          applyReadableVertexColor(
            itemInstanceDescriptors[itemIndex].color,
            marbleSettings.colorLift
          );
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
  }, [familyBatches, hovered, marbleSettings.colorLift, presentedItemIndex]);

  useFrame(() => {
    // Keep interaction bounds aligned with physics-driven instance transforms.
    familyOrder.forEach((family) => {
      familyRuntimeRef.current[family].mesh?.computeBoundingSphere();
    });

    const storeState = useStore.getState();
    const { activeGather } = storeState;
    const now = Date.now();
    const gatherDecayFactor =
      activeGather === null ? 0 : getGatherDecayFactor(activeGather.startedAt, now);
    const hasExpiredGather = activeGather !== null && gatherDecayFactor <= 0;

    if (hasExpiredGather) {
      useStore.setState({
        sortOption: null,
        activeGather: null,
      });
    }

    const sortOption = hasExpiredGather ? null : activeGather?.option ?? null;
    const gatherSteeringFactor = hasExpiredGather || activeGather === null ? 1 : gatherDecayFactor;

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
            ) * gatherSteeringFactor;

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

    const groupedIndexes = getGroupItemIndexes(sortOption);
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
            ) * gatherSteeringFactor;
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
          ) * gatherSteeringFactor;

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

              if (!canInteractWithItems || e.instanceId === undefined) {
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

              if (!canInteractWithItems || e.instanceId === undefined) {
                return;
              }

              presentClickedItem(batch.indexes[e.instanceId]);
            }}
          >
            <FamilyGeometry family={batch.family} colors={batch.colors} />
            <FamilyMaterial
              family={batch.family}
              marbleSettings={marbleSettings}
              marbleTextures={marbleTextures}
            />
          </instancedMesh>
        </InstancedRigidBodies>
      ))}
    </>
  );
}
