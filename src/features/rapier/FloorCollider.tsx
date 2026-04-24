import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';

const floorHalfExtents: PhysicsVector3 = poolPhysicsBounds.floor.size.map(
  (value) => value / 2
) as PhysicsVector3;

export function RapierFloorCollider(): JSX.Element {
  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.floor.position} type="fixed">
      <CuboidCollider args={floorHalfExtents} />
    </RigidBody>
  );
}
