import { items } from '../../data/items';
import { useStore } from '../../store/store';
import { rapierPhysicsConstants } from '../physics/constants';
import {
  resolvePendingSelection,
  type PositionedRigidBody,
} from './pendingSelection';

function createBodies(): Array<PositionedRigidBody | null> {
  return Array(items.length).fill(null);
}

describe('pending search selection', () => {
  beforeEach(() => {
    useStore.setState({
      presentation: { type: 'none' },
      sortOption: null,
      selectedGroup: null,
      activeGather: null,
      pendingSelection: null,
    });
  });

  afterEach(() => {
    useStore.setState({
      presentation: { type: 'none' },
      sortOption: null,
      selectedGroup: null,
      activeGather: null,
      pendingSelection: null,
    });
  });

  it('waits beyond the gather duration and uses the matching live body position when ready', () => {
    const itemIndex = 4;
    const targetPosition = [7.5, -2, 11] as const;
    const bodies = createBodies();
    const gatherStartedAt = Date.now();
    useStore.setState({
      selectedGroup: 'dev',
      sortOption: 'sort',
      activeGather: { option: 'sort', startedAt: gatherStartedAt },
    });

    useStore.getState().requestItemSelection(itemIndex);
    vi.spyOn(Date, 'now').mockReturnValue(
      gatherStartedAt + rapierPhysicsConstants.steering.gatherDurationMs * 10
    );

    expect(Date.now() - gatherStartedAt).toBeGreaterThan(
      rapierPhysicsConstants.steering.gatherDurationMs
    );
    expect(resolvePendingSelection(itemIndex, bodies)).toBeNull();
    expect(useStore.getState()).toMatchObject({
      pendingSelection: itemIndex,
      presentation: { type: 'none' },
      sortOption: null,
      selectedGroup: null,
      activeGather: null,
    });

    bodies[itemIndex] = {
      translation: () => ({
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
      }),
    };
    const resolvedSelection = resolvePendingSelection(itemIndex, bodies);

    expect(resolvedSelection).toEqual({ itemIndex, targetPosition });
    if (resolvedSelection) {
      useStore
        .getState()
        .presentPendingSelection(
          resolvedSelection.itemIndex,
          resolvedSelection.targetPosition
        );
    }

    expect(useStore.getState()).toMatchObject({
      pendingSelection: null,
      presentation: {
        type: 'item',
        itemIndex,
        targetPosition,
        selectionSource: 'search',
      },
      selectedGroup: null,
      activeGather: null,
    });
  });

  it('keeps only the latest request when earlier bodies become available', () => {
    const olderIndex = 1;
    const latestIndex = 2;
    const bodies = createBodies();
    const stalePosition = [1, 2, 3] as const;
    const latestPosition = [4, 5, 6] as const;

    useStore.getState().requestItemSelection(olderIndex);
    useStore.getState().requestItemSelection(latestIndex);
    bodies[olderIndex] = {
      translation: () => ({
        x: stalePosition[0],
        y: stalePosition[1],
        z: stalePosition[2],
      }),
    };
    const staleSelection = resolvePendingSelection(
      useStore.getState().pendingSelection,
      bodies
    );

    expect(staleSelection).toBeNull();
    expect(useStore.getState().pendingSelection).toBe(latestIndex);

    bodies[latestIndex] = {
      translation: () => ({
        x: latestPosition[0],
        y: latestPosition[1],
        z: latestPosition[2],
      }),
    };
    const latestSelection = resolvePendingSelection(
      useStore.getState().pendingSelection,
      bodies
    );

    expect(latestSelection).toEqual({
      itemIndex: latestIndex,
      targetPosition: latestPosition,
    });
    useStore
      .getState()
      .presentPendingSelection(
        latestIndex,
        latestPosition as [number, number, number]
      );
    expect(useStore.getState().presentation).toMatchObject({
      type: 'item',
      itemIndex: latestIndex,
      targetPosition: latestPosition,
    });
  });

  it('cancels pending work on close and rejects stale completion', () => {
    const itemIndex = 3;

    useStore.getState().requestItemSelection(itemIndex);
    useStore.getState().closePresentation();
    useStore.getState().presentPendingSelection(itemIndex, [1, 2, 3]);

    expect(useStore.getState()).toMatchObject({
      pendingSelection: null,
      presentation: { type: 'none' },
    });
  });
});
