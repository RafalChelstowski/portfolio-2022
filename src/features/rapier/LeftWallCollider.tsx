import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const leftWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.leftWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierLeftWallColliderProps {
  friction: number;
  restitution: number;
}

export function RapierLeftWallCollider({
  friction,
  restitution,
}: RapierLeftWallColliderProps): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.leftWall.position} type="fixed">
      <CuboidCollider
        args={leftWallHalfExtents}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
