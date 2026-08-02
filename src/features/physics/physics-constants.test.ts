import {
  poolPhysicsBounds,
  rapierPhysicsConstants,
  type BoxPhysicsBounds,
} from './constants';

function expectFiniteVector(vector: readonly number[]): void {
  expect(vector).toHaveLength(3);
  vector.forEach((value) => {
    expect(Number.isFinite(value)).toBe(true);
  });
}

describe('pool physics bounds', () => {
  it('uses positive finite full extents for every bound', () => {
    const bounds: BoxPhysicsBounds[] = Object.values(poolPhysicsBounds);

    bounds.forEach(({ position, size }) => {
      expectFiniteVector(position);
      expectFiniteVector(size);
      size.forEach((value) => {
        expect(value).toBeGreaterThan(0);
      });
    });
  });

  it('keeps side and front/back walls mirrored', () => {
    const { leftWall, rightWall, frontWall, backWall } = poolPhysicsBounds;

    expect(leftWall.position[0]).toBe(-rightWall.position[0]);
    expect(leftWall.position[1]).toBe(rightWall.position[1]);
    expect(leftWall.position[2]).toBe(rightWall.position[2]);
    expect(leftWall.size).toEqual(rightWall.size);

    expect(frontWall.position[0]).toBe(backWall.position[0]);
    expect(frontWall.position[1]).toBe(backWall.position[1]);
    expect(frontWall.position[2]).toBe(-backWall.position[2]);
    expect(frontWall.size).toEqual(backWall.size);
  });

  it('keeps the half-extents aligned with the usable pool space', () => {
    const { floor, leftWall, rightWall, frontWall, backWall } =
      poolPhysicsBounds;
    const leftInnerX = leftWall.position[0] + leftWall.size[0] / 2;
    const rightInnerX = rightWall.position[0] - rightWall.size[0] / 2;
    const backInnerZ = backWall.position[2] + backWall.size[2] / 2;
    const frontInnerZ = frontWall.position[2] - frontWall.size[2] / 2;
    const floorMinX = floor.position[0] - floor.size[0] / 2;
    const floorMaxX = floor.position[0] + floor.size[0] / 2;
    const floorMinZ = floor.position[2] - floor.size[2] / 2;
    const floorMaxZ = floor.position[2] + floor.size[2] / 2;

    expect(leftInnerX).toBeLessThan(rightInnerX);
    expect(backInnerZ).toBeLessThan(frontInnerZ);
    expect(floorMinX).toBeCloseTo(leftInnerX);
    expect(floorMaxX).toBeCloseTo(rightInnerX);
    expect(floorMinZ).toBeLessThanOrEqual(backInnerZ);
    expect(floorMaxZ).toBeGreaterThanOrEqual(frontInnerZ);
  });

  it('places an oversized catch surface below and under the floor', () => {
    const { floor, catchSurface } = poolPhysicsBounds;
    const catchSurfaceTop = catchSurface.position[1] + catchSurface.size[1] / 2;
    const floorTop = floor.position[1] + floor.size[1] / 2;

    expect(catchSurface.position[0]).toBe(floor.position[0]);
    expect(catchSurface.position[2]).toBe(floor.position[2]);
    expect(catchSurface.position[1]).toBeLessThan(floor.position[1]);
    expect(catchSurface.size[0]).toBeGreaterThan(floor.size[0]);
    expect(catchSurface.size[2]).toBeGreaterThan(floor.size[2]);
    expect(catchSurfaceTop).toBeLessThan(floorTop);
  });
});

describe('Rapier steering constants', () => {
  it('orders gather speeds from sorting to matched and missed items', () => {
    const { steering } = rapierPhysicsConstants;

    expect(steering.maxSortSpeed).toBeLessThan(steering.maxSetMatchSpeed);
    expect(steering.maxSetMatchSpeed).toBeLessThan(steering.setMissRepel);
    expect(steering.setMissRepel).toBeLessThan(steering.maxSetMissSpeed);
    expect(steering.sortPull).toBeLessThan(steering.setMatchSeek);
  });

  it('keeps steering and body values physically usable', () => {
    const { steering, items, world } = rapierPhysicsConstants;

    expect(steering.gatherDurationMs).toBeGreaterThan(0);
    expect(steering.activeLerp).toBeGreaterThan(0);
    expect(steering.activeLerp).toBeLessThanOrEqual(1);
    expect(steering.centerAreaRadius).toBeGreaterThan(0);
    expect(world.gravity[0]).toBe(0);
    expect(world.gravity[1]).toBeLessThan(0);
    expect(world.gravity[2]).toBe(0);

    expect(items.massBySize.s).toBeLessThan(items.massBySize.m);
    expect(items.massBySize.m).toBeLessThan(items.massBySize.l);
    expect(items.restitution).toBeGreaterThanOrEqual(0);
    expect(items.friction).toBeGreaterThanOrEqual(0);
    expect(items.linearDamping).toBeGreaterThanOrEqual(0);
    expect(items.angularDamping).toBeGreaterThanOrEqual(0);
  });
});
