export function getSize(size: string): [x: number, y: number, z: number] {
  switch (size) {
    case 'xl':
      return [0.75, 0.75, 0.75];

    case 'lg':
      return [0.5, 0.5, 0.5];

    case 'sm':
      return [0.3, 0.3, 0.3];

    default:
      return [0.4, 0.4, 0.4];
  }
}
