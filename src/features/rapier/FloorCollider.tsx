import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import {
  poolPhysicsBounds,
  rapierColliderNames,
  type PhysicsVector3,
} from '../physics/constants';

const floorHalfExtents: PhysicsVector3 = poolPhysicsBounds.floor.size.map(
  (value) => value / 2
) as PhysicsVector3;

interface RapierFloorColliderProps {
  friction: number;
  restitution: number;
}

export function RapierFloorCollider({ friction, restitution }: RapierFloorColliderProps): JSX.Element {
  return (
    <RigidBody
      colliders={false}
      name={rapierColliderNames.floor}
      position={poolPhysicsBounds.floor.position}
      type="fixed"
    >
      <CuboidCollider
        args={floorHalfExtents}
        name={rapierColliderNames.floor}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
