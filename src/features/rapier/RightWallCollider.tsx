import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, rapierPhysicsConstants, type PhysicsVector3 } from '../physics/constants';

const rightWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.rightWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

export function RapierRightWallCollider(): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.rightWall.position} type="fixed">
      <CuboidCollider
        args={rightWallHalfExtents}
        restitution={rapierPhysicsConstants.bounds.restitution}
        friction={rapierPhysicsConstants.bounds.friction}
      />
    </RigidBody>
  );
}
