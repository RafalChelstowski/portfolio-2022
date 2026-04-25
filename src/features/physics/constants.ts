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
  catchSurface: BoxPhysicsBounds;
}

export interface ItemPhysicsConstants {
  spawnBaseHeight: number;
  spawnHeightStep: number;
  spawnFastDropSpeed: number;
  spawnFastDropCutoffY: number;
  centerTarget: PhysicsVector3;
}

export interface RapierSteeringPhysicsConstants {
  sortPull: number;
  setMatchSeek: number;
  setMissRepel: number;
  maxSortSpeed: number;
  maxSetMatchSpeed: number;
  maxSetMissSpeed: number;
  settleLerp: number;
  activeLerp: number;
  centerAreaRadius: number;
}

export interface RapierWorldPhysicsConstants {
  gravity: PhysicsVector3;
}

export interface RapierItemBodyPhysicsConstants {
  mass: number;
  canSleep: boolean;
  linearDamping: number;
  angularDamping: number;
  restitution: number;
  friction: number;
}

export interface RapierBoundsColliderPhysicsConstants {
  restitution: number;
  friction: number;
}

export interface RapierPhysicsConstants {
  world: RapierWorldPhysicsConstants;
  items: RapierItemBodyPhysicsConstants;
  bounds: RapierBoundsColliderPhysicsConstants;
  steering: RapierSteeringPhysicsConstants;
}

const FLOOR_POSITION: PhysicsVector3 = [0, -2.5, 0];
const FLOOR_SIZE: PhysicsVector3 = [22, 1, 32];
const CATCH_SURFACE_Y_OFFSET = -0.5;
const CATCH_SURFACE_SIZE_MULTIPLIER = 4;
const CATCH_SURFACE_THICKNESS = 1;

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
  catchSurface: {
    position: [0, FLOOR_POSITION[1] + CATCH_SURFACE_Y_OFFSET, 0],
    size: [
      FLOOR_SIZE[0] * CATCH_SURFACE_SIZE_MULTIPLIER,
      CATCH_SURFACE_THICKNESS,
      FLOOR_SIZE[2] * CATCH_SURFACE_SIZE_MULTIPLIER,
    ],
  },
};

export const itemPhysicsConstants: ItemPhysicsConstants = {
  spawnBaseHeight: 8,
  spawnHeightStep: 0.45,
  spawnFastDropSpeed: 20,
  spawnFastDropCutoffY: 2,
  centerTarget: [0, -2, 0],
};

export const rapierPhysicsConstants: RapierPhysicsConstants = {
  world: {
    gravity: [0, -9.81, 0],
  },
  items: {
    mass: 1,
    canSleep: false,
    linearDamping: 1,
    angularDamping: 3,
    restitution: 0.6,
    friction: 1,
  },
  bounds: {
    restitution: 0.5,
    friction: 2,
  },
  steering: {
    sortPull: 8,
    setMatchSeek: 16,
    setMissRepel: 5,
    maxSortSpeed: 10,
    maxSetMatchSpeed: 12,
    maxSetMissSpeed: 7,
    settleLerp: 0.12,
    activeLerp: 0.2,
    centerAreaRadius: 3.2,
  },
};
