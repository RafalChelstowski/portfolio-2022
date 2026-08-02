import { items } from '../../data/items';
import { getSize } from '../../utils/getSize';
import {
  itemInstanceDescriptors,
  type ItemInstanceDescriptor,
} from './itemInstanceDescriptors';
import { itemPhysicsConstants } from './constants';

function expectFiniteVector(vector: readonly number[]): void {
  expect(vector).toHaveLength(3);
  vector.forEach((value) => {
    expect(Number.isFinite(value)).toBe(true);
  });
}

function projectTransforms(descriptors: readonly ItemInstanceDescriptor[]) {
  return descriptors.map(({ index, spawnPosition, initialRotationSeed }) => ({
    index,
    spawnPosition: [...spawnPosition],
    initialRotationSeed: [...initialRotationSeed],
  }));
}

describe('item instance descriptors', () => {
  it('has one aligned descriptor for every generated item', () => {
    expect(itemPhysicsConstants.spawnBaseHeight).toBeGreaterThan(
      itemPhysicsConstants.centerTarget[1]
    );
    expect(itemPhysicsConstants.spawnHeightStep).toBeGreaterThan(0);
    expectFiniteVector(itemPhysicsConstants.centerTarget);
    expect(itemInstanceDescriptors).toHaveLength(items.length);
    expect(
      itemInstanceDescriptors.map((descriptor) => descriptor.index)
    ).toEqual(items.map((_, index) => index));
    expect(
      new Set(itemInstanceDescriptors.map((descriptor) => descriptor.index))
        .size
    ).toBe(items.length);

    itemInstanceDescriptors.forEach((descriptor) => {
      const item = items[descriptor.index];

      expect(item).toBeDefined();

      if (!item) {
        return;
      }

      expect(descriptor.scaleSource).toBe(item.size);
      expect(descriptor.scale).toEqual(getSize(item.size));
      expect(descriptor.color).toBe(item.customColor);
      expectFiniteVector(descriptor.scale);
      expectFiniteVector(descriptor.spawnPosition);
      expect(descriptor.spawnPosition[1]).toBeGreaterThanOrEqual(
        itemPhysicsConstants.spawnBaseHeight
      );
      expectFiniteVector(descriptor.initialRotationSeed);
      descriptor.scale.forEach((value) => {
        expect(value).toBeGreaterThan(0);
      });
    });
  });

  it('generates finite deterministic spawn and rotation transforms', async () => {
    const firstTransforms = projectTransforms(itemInstanceDescriptors);

    vi.resetModules();
    const regeneratedModule = await import('./itemInstanceDescriptors');

    expect(
      projectTransforms(regeneratedModule.itemInstanceDescriptors)
    ).toEqual(firstTransforms);
  });
});
