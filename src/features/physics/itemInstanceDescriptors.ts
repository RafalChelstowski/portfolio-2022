import type { Item3d } from '../../types';
import { items } from '../../data/items';
import { getSize } from '../../utils/getSize';
import { itemPhysicsConstants } from './constants';

type PhysicsVector3 = [number, number, number];

export interface ItemInstanceDescriptor {
  index: number;
  color: Item3d['customColor'];
  scaleSource: Item3d['size'];
  scale: PhysicsVector3;
  spawnPosition: PhysicsVector3;
  initialRotationSeed: PhysicsVector3;
}

function createRotationSeed(index: number): PhysicsVector3 {
  const seed = index + 1;
  const x = (seed * 0.917) % Math.PI;
  const y = (seed * 1.183) % Math.PI;
  const z = (seed * 1.619) % Math.PI;

  return [x, y, z];
}

const SPAWN_GROUP_CENTERS: [number, number][] = [
  [-4.5, -4.5],
  [4.5, -4.5],
  [-4.5, 4.5],
  [4.5, 4.5],
];

const SPAWN_GROUP_OFFSETS: [number, number][] = [
  [0, 0],
  [1.2, 0.6],
  [-1.2, -0.6],
  [0.9, -1],
  [-0.9, 1],
];

function createSpawnPosition(index: number): PhysicsVector3 {
  const groupIndex = index % SPAWN_GROUP_CENTERS.length;
  const dropLayer = Math.floor(index / SPAWN_GROUP_CENTERS.length);
  const [groupX, groupZ] = SPAWN_GROUP_CENTERS[groupIndex];
  const [offsetX, offsetZ] =
    SPAWN_GROUP_OFFSETS[dropLayer % SPAWN_GROUP_OFFSETS.length];

  return [
    groupX + offsetX,
    itemPhysicsConstants.spawnBaseHeight +
      itemPhysicsConstants.spawnHeightStep * dropLayer,
    groupZ + offsetZ,
  ];
}

export const itemInstanceDescriptors: ItemInstanceDescriptor[] = items.map(
  (item, index) => ({
    index,
    color: item.customColor,
    scaleSource: item.size,
    scale: getSize(item.size),
    spawnPosition: createSpawnPosition(index),
    initialRotationSeed: createRotationSeed(index),
  })
);
