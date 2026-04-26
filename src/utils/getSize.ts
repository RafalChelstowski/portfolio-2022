import type { ItemSize } from '../types';

export function getSize(size: ItemSize): [x: number, y: number, z: number] {
  switch (size) {
    case 'l':
      return [0.75, 0.75, 0.75];

    case 'm':
      return [0.5, 0.5, 0.5];

    case 's':
      return [0.3, 0.3, 0.3];

    default:
      return [0.4, 0.4, 0.4];
  }
}
