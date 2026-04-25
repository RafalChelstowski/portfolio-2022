import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const backWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.backWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierBackWallColliderProps {
  friction: number;
  restitution: number;
}

export function RapierBackWallCollider({
  friction,
  restitution,
}: RapierBackWallColliderProps): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.backWall.position} type="fixed">
      <CuboidCollider
        args={backWallHalfExtents}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
