export type PhysicsVector3 = [number, number, number];

export interface BoxPhysicsBounds {
  position: PhysicsVector3;
  size: PhysicsVector3;
}

export interface PoolPhysicsBounds {
  floor: BoxPhysicsBounds;
  leftWall: BoxPhysicsBounds;
  rightWall: BoxPhysicsBounds;
  frontWall: BoxPhysicsBounds;
  backWall: BoxPhysicsBounds;
}

export interface ItemPhysicsConstants {
  spawnBaseHeight: number;
  spawnHeightStep: number;
  centerTarget: PhysicsVector3;
  steeringStrength: number;
}

const FLOOR_POSITION: PhysicsVector3 = [0, -2.5, 0];
const FLOOR_SIZE: PhysicsVector3 = [22, 1, 32];

const WALL_Y = -1;
const SIDE_WALL_X = 15.5;
const FRONT_BACK_WALL_Z = 15.5;
const SIDE_WALL_SIZE: PhysicsVector3 = [9, 20, 26];
const FRONT_BACK_WALL_SIZE: PhysicsVector3 = [26, 20, 5];

export const poolPhysicsBounds: PoolPhysicsBounds = {
  floor: {
    position: FLOOR_POSITION,
    size: FLOOR_SIZE,
  },
  leftWall: {
    position: [-SIDE_WALL_X, WALL_Y, 0],
    size: SIDE_WALL_SIZE,
  },
  rightWall: {
    position: [SIDE_WALL_X, WALL_Y, 0],
    size: SIDE_WALL_SIZE,
  },
  frontWall: {
    position: [0, WALL_Y, FRONT_BACK_WALL_Z],
    size: FRONT_BACK_WALL_SIZE,
  },
  backWall: {
    position: [0, WALL_Y, -FRONT_BACK_WALL_Z],
    size: FRONT_BACK_WALL_SIZE,
  },
};

export const itemPhysicsConstants: ItemPhysicsConstants = {
  spawnBaseHeight: 12,
  spawnHeightStep: 1,
  centerTarget: [0, -2, 0],
  steeringStrength: 20,
};
