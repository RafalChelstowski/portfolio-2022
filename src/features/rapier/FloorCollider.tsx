import { CuboidCollider, RigidBody, type CollisionEnterPayload } from '@react-three/rapier';
import { useRef, type JSX } from 'react';

import { poolPhysicsBounds, type PhysicsVector3 } from '../physics/constants';
import { useStore } from '../../store/store';

const floorHalfExtents: PhysicsVector3 = poolPhysicsBounds.floor.size.map(
  (value) => value / 2
) as PhysicsVector3;
const startupGracePeriodMs = 4000;

interface RapierFloorColliderProps {
  friction: number;
  restitution: number;
}

export function RapierFloorCollider({ friction, restitution }: RapierFloorColliderProps): JSX.Element {
  const mountedAtMsRef = useRef<number>(Date.now());
  const hasRevealedUiRef = useRef<boolean>(false);

  const handleCollisionEnter = ({ other }: CollisionEnterPayload): void => {
    if (hasRevealedUiRef.current || !other.rigidBody) {
      return;
    }

    if (Date.now() - mountedAtMsRef.current <= startupGracePeriodMs) {
      return;
    }

    if (useStore.getState().displayUi) {
      hasRevealedUiRef.current = true;
      return;
    }

    useStore.setState({ displayUi: true });
    hasRevealedUiRef.current = true;
  };

  return (
    <RigidBody colliders={false} position={poolPhysicsBounds.floor.position} type="fixed">
      <CuboidCollider
        args={floorHalfExtents}
        onCollisionEnter={handleCollisionEnter}
        restitution={restitution}
        friction={friction}
      />
    </RigidBody>
  );
}
