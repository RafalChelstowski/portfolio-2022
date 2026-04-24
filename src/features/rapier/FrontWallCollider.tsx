import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, rapierPhysicsConstants, type PhysicsVector3 } from '../physics/constants';

const frontWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.frontWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

export function RapierFrontWallCollider(): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.frontWall.position} type="fixed">
      <CuboidCollider
        args={frontWallHalfExtents}
        restitution={rapierPhysicsConstants.bounds.restitution}
        friction={rapierPhysicsConstants.bounds.friction}
      />
    </RigidBody>
  );
}
