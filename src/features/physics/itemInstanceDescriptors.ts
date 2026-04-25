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
  [-6.8, -5.4],
  [-1.8, -6.6],
  [4.8, -5.9],
  [-7.3, 0.2],
  [0.7, -0.8],
  [6.6, 1.4],
  [-4.6, 6.4],
  [2.2, 5.6],
];

function seededUnit(index: number, salt: number): number {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createSpawnPosition(index: number): PhysicsVector3 {
  const groupIndex = index % SPAWN_GROUP_CENTERS.length;
  const dropLayer = Math.floor(index / SPAWN_GROUP_CENTERS.length);
  const [groupX, groupZ] = SPAWN_GROUP_CENTERS[groupIndex];
  const angle = seededUnit(index, dropLayer + 1) * Math.PI * 2;
  const radius =
    0.45 +
    seededUnit(index, dropLayer + 7) * 1.75 +
    (dropLayer % 3) * 0.1;
  const offsetX = Math.cos(angle) * radius;
  const offsetZ = Math.sin(angle) * radius;
  const layerWave = (dropLayer % 2 === 0 ? 1 : -1) * 0.3;

  return [
    groupX + offsetX + layerWave * 0.35,
    itemPhysicsConstants.spawnBaseHeight +
      itemPhysicsConstants.spawnHeightStep * dropLayer,
    groupZ + offsetZ - layerWave * 0.2,
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
