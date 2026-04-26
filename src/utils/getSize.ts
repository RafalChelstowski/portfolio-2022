import type { ItemSize } from '../types';

export function getSize(size: ItemSize): [x: number, y: number, z: number] {
  switch (size) {
    case 'l':
      return [0.8, 0.8, 0.8];

    case 'm':
      return [0.62, 0.62, 0.62];

    case 's':
      return [0.42, 0.42, 0.42];

    default:
      return [0.4, 0.4, 0.4];
  }
}
