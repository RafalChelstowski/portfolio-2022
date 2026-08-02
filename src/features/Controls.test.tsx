import { create } from '@react-three/test-renderer';
import type * as THREE from 'three';
import { useStore } from '../store/store';
import { Controls } from './Controls';

// Keep the native scene node while avoiding browser event-handler setup.
vi.mock('@react-three/drei', () => {
  function MockOrbitControls({
    target,
    autoRotate,
    autoRotateSpeed,
    enablePan,
    enableDamping,
    enableZoom,
    enableRotate,
    maxPolarAngle,
    minPolarAngle,
  }: Record<string, unknown>) {
    return (
      <group
        userData={{
          target,
          autoRotate,
          autoRotateSpeed,
          enablePan,
          enableDamping,
          enableZoom,
          enableRotate,
          maxPolarAngle,
          minPolarAngle,
        }}
      />
    );
  }

  return { OrbitControls: MockOrbitControls };
});

type TestRenderer = Awaited<ReturnType<typeof create>>;

function resetStore(): void {
  useStore.setState({
    displayUi: false,
    presentation: { type: 'none' },
    sortOption: null,
    selectedGroup: null,
    activeGather: null,
  });
}

let renderer: TestRenderer | undefined;

beforeEach(resetStore);
afterEach(async () => {
  if (renderer) {
    await renderer.unmount();
    renderer = undefined;
  }

  resetStore();
  vi.doUnmock('@react-three/drei');
  vi.resetModules();
});

describe('Controls scene presentation modes', () => {
  it('auto-rotates around the origin while idle', async () => {
    renderer = await create(<Controls />);
    const controls = renderer.scene.findByType('Group').instance as THREE.Group;

    expect(controls.userData).toMatchObject({
      target: [0, 0, 0],
      autoRotate: true,
      autoRotateSpeed: 0.5,
    });
  });

  it('locks camera interaction controls to the fixed polar angle', async () => {
    renderer = await create(<Controls />);
    const controls = renderer.scene.findByType('Group').instance as THREE.Group;

    expect(controls.userData).toMatchObject({
      enablePan: false,
      enableZoom: false,
      enableRotate: false,
      enableDamping: false,
      minPolarAngle: Math.PI / 3.5,
      maxPolarAngle: Math.PI / 3.5,
    });
  });

  it('disables auto-rotation and targets the presented item', async () => {
    const targetPosition: [number, number, number] = [1.25, 2, -3];
    useStore.getState().presentItem(4, targetPosition);

    renderer = await create(<Controls />);
    const controls = renderer.scene.findByType('Group').instance as THREE.Group;

    expect(controls.userData).toMatchObject({
      target: targetPosition,
      autoRotate: false,
      autoRotateSpeed: 0,
    });
  });

  it('disables auto-rotation and keeps the origin target for a group', async () => {
    useStore.getState().presentGroup('creative');

    renderer = await create(<Controls />);
    const controls = renderer.scene.findByType('Group').instance as THREE.Group;

    expect(controls.userData).toMatchObject({
      target: [0, 0, 0],
      autoRotate: false,
      autoRotateSpeed: 0,
    });
  });
});
