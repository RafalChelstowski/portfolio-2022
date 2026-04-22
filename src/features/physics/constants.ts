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

export const poolPhysicsBounds: PoolPhysicsBounds = {
  floor: {
    position: [0, -2.5, 0],
    size: [22, 1, 32],
  },
  leftWall: {
    position: [-15.5, -1, 0],
    size: [9, 20, 26],
  },
  rightWall: {
    position: [15.5, -1, 0],
    size: [9, 20, 26],
  },
  frontWall: {
    position: [0, -1, 15.5],
    size: [26, 20, 5],
  },
  backWall: {
    position: [0, -1, -15.5],
    size: [26, 20, 5],
  },
};
