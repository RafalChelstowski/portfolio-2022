import { Suspense } from 'react';
import { usePlane, useBox } from '@react-three/cannon';

export function Bounds(): JSX.Element {
  const [abyss] = usePlane<THREE.Mesh>(() => ({
    position: [0, -3, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  const [bottom] = useBox<THREE.Mesh>(() => ({
    position: [0, -2.5, 0],
    args: [22, 1, 32],
    type: 'Static',
  }));

  const [leftBank] = useBox<THREE.Mesh>(() => ({
    position: [-15.5, -1, 0],
    args: [9, 20, 26],
    type: 'Static',
  }));

  const [rightBank] = useBox<THREE.Mesh>(() => ({
    position: [15.5, -1, 0],
    args: [9, 20, 26],
    type: 'Static',
  }));

  const [upBank] = useBox<THREE.Mesh>(() => ({
    position: [0, -1, 15.5],
    args: [26, 20, 5],
    type: 'Static',
  }));

  const [downBank] = useBox<THREE.Mesh>(() => ({
    position: [0, -1, -15.5],
    args: [26, 20, 5],
    type: 'Static',
  }));

  return (
    <Suspense fallback={null}>
      <mesh name="abyss" ref={abyss} />
      <mesh name="floor" ref={bottom} />
      <mesh ref={leftBank} />
      <mesh ref={rightBank} />
      <mesh ref={upBank} />
      <mesh ref={downBank} />
    </Suspense>
  );
}
