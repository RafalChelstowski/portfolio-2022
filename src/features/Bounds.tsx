import { Suspense, type JSX } from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import type { Mesh } from 'three';
import { poolPhysicsBounds } from './physics/constants';

export function Bounds(): JSX.Element {
  const [abyss] = usePlane<Mesh>(() => ({
    position: [0, -3, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  const [bottom] = useBox<Mesh>(() => ({
    position: poolPhysicsBounds.floor.position,
    args: poolPhysicsBounds.floor.size,
    type: 'Static',
  }));

  const [leftBank] = useBox<Mesh>(() => ({
    position: poolPhysicsBounds.leftWall.position,
    args: poolPhysicsBounds.leftWall.size,
    type: 'Static',
  }));

  const [rightBank] = useBox<Mesh>(() => ({
    position: poolPhysicsBounds.rightWall.position,
    args: poolPhysicsBounds.rightWall.size,
    type: 'Static',
  }));

  const [upBank] = useBox<Mesh>(() => ({
    position: poolPhysicsBounds.frontWall.position,
    args: poolPhysicsBounds.frontWall.size,
    type: 'Static',
  }));

  const [downBank] = useBox<Mesh>(() => ({
    position: poolPhysicsBounds.backWall.position,
    args: poolPhysicsBounds.backWall.size,
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
