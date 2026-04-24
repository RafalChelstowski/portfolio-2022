import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, rapierPhysicsConstants, type PhysicsVector3 } from '../physics/constants';

const catchSurfaceHalfExtents: PhysicsVector3 = poolPhysicsBounds.catchSurface.size.map(
  (value) => value / 2
) as PhysicsVector3;

export function RapierCatchSurfaceCollider(): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.catchSurface.position} type="fixed">
      <CuboidCollider
        args={catchSurfaceHalfExtents}
        restitution={rapierPhysicsConstants.bounds.restitution}
        friction={rapierPhysicsConstants.bounds.friction}
      />
    </RigidBody>
  );
}
