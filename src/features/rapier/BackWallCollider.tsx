import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const backWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.backWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

export function RapierBackWallCollider(): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.backWall.position} type="fixed">
      <CuboidCollider args={backWallHalfExtents} />
    </RigidBody>
  );
}
