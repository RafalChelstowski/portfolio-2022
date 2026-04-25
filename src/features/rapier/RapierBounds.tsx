import { useControls } from 'leva';
import type { JSX } from 'react';

import { rapierPhysicsConstants } from '../physics/constants';
import { RapierBackWallCollider } from './BackWallCollider';
import { RapierCatchSurfaceCollider } from './CatchSurfaceCollider';
import { RapierFloorCollider } from './FloorCollider';
import { RapierFrontWallCollider } from './FrontWallCollider';
import { RapierLeftWallCollider } from './LeftWallCollider';
import { RapierRightWallCollider } from './RightWallCollider';

export function RapierBounds(): JSX.Element {
  const poolContactControls = useControls('Rapier pool contact', {
    poolFriction: {
      value: rapierPhysicsConstants.bounds.friction,
      min: 0,
      max: 2,
      step: 0.01,
    },
    poolRestitution: {
      value: rapierPhysicsConstants.bounds.restitution,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <>
      <RapierFloorCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
      <RapierLeftWallCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
      <RapierRightWallCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
      <RapierFrontWallCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
      <RapierBackWallCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
      <RapierCatchSurfaceCollider
        friction={poolContactControls.poolFriction}
        restitution={poolContactControls.poolRestitution}
      />
    </>
  );
}
