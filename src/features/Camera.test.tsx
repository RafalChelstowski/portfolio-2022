import { create } from '@react-three/test-renderer';
import type * as THREE from 'three';
import { useStore } from '../store/store';
import { Camera } from './Camera';

vi.mock('leva', () => ({
  useControls: () => ({ focusedCardZoom: 2.65 }),
}));

type TestRenderer = Awaited<ReturnType<typeof create>>;

const presentationZoom = 2.65;
const presentationViewport = { width: 1600, height: 900 };

let renderer: TestRenderer | undefined;

function resetStore(): void {
  useStore.setState({
    displayUi: false,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
  });
}

function getCamera(): THREE.PerspectiveCamera {
  if (!renderer) {
    throw new Error('Expected the camera test renderer to be mounted.');
  }

  return renderer.scene.findByType('PerspectiveCamera')
    .instance as THREE.PerspectiveCamera;
}

function expectCameraAimsAt(
  camera: THREE.PerspectiveCamera,
  target: [number, number, number]
): void {
  const directionToTarget = [
    target[0] - camera.position.x,
    target[1] - camera.position.y,
    target[2] - camera.position.z,
  ];
  const directionLength = Math.hypot(...directionToTarget);
  const actualDirection = camera.getWorldDirection(camera.position.clone());

  expect(actualDirection.x).toBeCloseTo(directionToTarget[0] / directionLength);
  expect(actualDirection.y).toBeCloseTo(directionToTarget[1] / directionLength);
  expect(actualDirection.z).toBeCloseTo(directionToTarget[2] / directionLength);
}

beforeEach(resetStore);
afterEach(async () => {
  if (renderer) {
    await renderer.unmount();
    renderer = undefined;
  }

  resetStore();
});

describe('Camera presentation modes', () => {
  it('uses the default position and zoom without a view offset while idle', async () => {
    renderer = await create(<Camera />, presentationViewport);
    const camera = getCamera();

    expect(camera.position.toArray()).toEqual([7, 25, -6]);
    expect(camera.zoom).toBe(1.2);
    expect(camera.view).toBeNull();
    expectCameraAimsAt(camera, [0, 0, 0]);
  });

  it('focuses an item relative to its target with the configured zoom and viewport offset', async () => {
    const targetPosition: [number, number, number] = [2, -1, 3];
    useStore.getState().presentItem(4, targetPosition);

    renderer = await create(<Camera />, presentationViewport);
    const camera = getCamera();

    expect(camera.position.toArray()).toEqual([13, 17, -5]);
    expect(camera.zoom).toBe(presentationZoom);
    expectCameraAimsAt(camera, targetPosition);
    expect(camera.view).toMatchObject({
      enabled: true,
      fullWidth: presentationViewport.width,
      fullHeight: presentationViewport.height,
      offsetX: presentationViewport.width * 0.22,
      offsetY: 0,
      width: presentationViewport.width,
      height: presentationViewport.height,
    });
  });

  it('uses the presentation position and viewport offset for a group at the origin', async () => {
    useStore.getState().presentGroup('creative');

    renderer = await create(<Camera />, presentationViewport);
    const camera = getCamera();

    expect(camera.position.toArray()).toEqual([11, 18, -8]);
    expect(camera.zoom).toBe(presentationZoom);
    expectCameraAimsAt(camera, [0, 0, 0]);
    expect(camera.view).toMatchObject({
      enabled: true,
      fullWidth: presentationViewport.width,
      fullHeight: presentationViewport.height,
      offsetX: presentationViewport.width * 0.22,
      offsetY: 0,
      width: presentationViewport.width,
      height: presentationViewport.height,
    });
  });
});
