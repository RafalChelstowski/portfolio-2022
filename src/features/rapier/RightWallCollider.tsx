import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const rightWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.rightWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierRightWallColliderProps {
  friction: number;
  restitution: number;
}

export function RapierRightWallCollider({
  friction,
  restitution,
}: RapierRightWallColliderProps): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.rightWall.position} type="fixed">
      <CuboidCollider
        args={rightWallHalfExtents}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
