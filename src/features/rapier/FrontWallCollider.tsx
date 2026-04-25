import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const frontWallHalfExtents: PhysicsVector3 = poolPhysicsBounds.frontWall.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierFrontWallColliderProps {
  friction: number;
  restitution: number;
}

export function RapierFrontWallCollider({
  friction,
  restitution,
}: RapierFrontWallColliderProps): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.frontWall.position} type="fixed">
      <CuboidCollider
        args={frontWallHalfExtents}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
