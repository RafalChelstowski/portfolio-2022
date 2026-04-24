import type { JSX } from 'react';

import { RapierBackWallCollider } from './BackWallCollider';
import { RapierCatchSurfaceCollider } from './CatchSurfaceCollider';
import { RapierFloorCollider } from './FloorCollider';
import { RapierFrontWallCollider } from './FrontWallCollider';
import { RapierLeftWallCollider } from './LeftWallCollider';
import { RapierRightWallCollider } from './RightWallCollider';

export function RapierBounds(): JSX.Element {
  return (
    <>
      <RapierFloorCollider />
      <RapierLeftWallCollider />
      <RapierRightWallCollider />
      <RapierFrontWallCollider />
      <RapierBackWallCollider />
      <RapierCatchSurfaceCollider />
    </>
  );
}
