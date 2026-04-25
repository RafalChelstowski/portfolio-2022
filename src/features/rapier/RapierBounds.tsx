import type { JSX } from 'react';

import { rapierPhysicsConstants } from '../physics/constants';
import { RapierBackWallCollider } from './BackWallCollider';
import { RapierCatchSurfaceCollider } from './CatchSurfaceCollider';
import { RapierFloorCollider } from './FloorCollider';
import { RapierFrontWallCollider } from './FrontWallCollider';
import { RapierLeftWallCollider } from './LeftWallCollider';
import { RapierRightWallCollider } from './RightWallCollider';

export function RapierBounds(): JSX.Element {
  return (
    <>
      <RapierFloorCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
      <RapierLeftWallCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
      <RapierRightWallCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
      <RapierFrontWallCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
      <RapierBackWallCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
      <RapierCatchSurfaceCollider
        friction={rapierPhysicsConstants.bounds.friction}
        restitution={rapierPhysicsConstants.bounds.restitution}
      />
    </>
  );
}
