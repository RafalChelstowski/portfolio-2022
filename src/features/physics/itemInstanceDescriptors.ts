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

export const itemInstanceDescriptors: ItemInstanceDescriptor[] = items.map(
  (item, index) => ({
    index,
    color: item.customColor,
    scaleSource: item.size,
    scale: getSize(item.size),
    spawnPosition: [
      0,
      itemPhysicsConstants.spawnBaseHeight +
        itemPhysicsConstants.spawnHeightStep * index,
      0,
    ],
    initialRotationSeed: createRotationSeed(index),
  })
);
