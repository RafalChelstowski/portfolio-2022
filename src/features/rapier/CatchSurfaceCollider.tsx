import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const catchSurfaceHalfExtents: PhysicsVector3 = poolPhysicsBounds.catchSurface.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierCatchSurfaceColliderProps {
  friction: number;
  restitution: number;
}

export function RapierCatchSurfaceCollider({
  friction,
  restitution,
}: RapierCatchSurfaceColliderProps): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.catchSurface.position} type="fixed">
      <CuboidCollider
        args={catchSurfaceHalfExtents}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
