import type { PresentationTarget } from '../../store/store';

export interface PositionedRigidBody {
  translation: () => { x: number; y: number; z: number };
}

export interface ResolvedPendingSelection {
  itemIndex: number;
  targetPosition: PresentationTarget;
}

export function resolvePendingSelection(
  itemIndex: number | null,
  bodies: readonly (PositionedRigidBody | null)[]
): ResolvedPendingSelection | null {
  if (itemIndex === null) {
    return null;
  }

  const body = bodies[itemIndex];

  if (!body) {
    return null;
  }

  const { x, y, z } = body.translation();

  return {
    itemIndex,
    targetPosition: [x, y, z],
  };
}
