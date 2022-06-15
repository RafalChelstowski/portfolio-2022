import { Suspense } from 'react';
import { usePlane, useBox } from '@react-three/cannon';

export function Bounds(): JSX.Element {
  const [bottomRef] = usePlane<THREE.Mesh>(() => ({
    position: [0, -2, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  const [leftBank] = useBox<THREE.Mesh>(() => ({
    position: [-15.5, -1, 0],
    args: [9, 2, 26],
    type: 'Static',
  }));

  const [rightBank] = useBox<THREE.Mesh>(() => ({
    position: [15.5, -1, 0],
    args: [9, 2, 26],
    type: 'Static',
  }));

  const [upBank] = useBox<THREE.Mesh>(() => ({
    position: [0, -1, 15.5],
    args: [26, 2, 5],
    type: 'Static',
  }));

  const [downBank] = useBox<THREE.Mesh>(() => ({
    position: [0, -1, -15.5],
    args: [26, 2, 5],
    type: 'Static',
  }));

  return (
    <Suspense fallback={null}>
      <mesh name="floor" ref={bottomRef} />
      <mesh ref={leftBank} />
      <mesh ref={rightBank} />
      <mesh ref={upBank} />
      <mesh ref={downBank} />
    </Suspense>
  );
}
