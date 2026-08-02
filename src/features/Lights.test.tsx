import { create } from '@react-three/test-renderer';
import type * as THREE from 'three';
import { Lights, sceneToneDefaults, type SceneToneSettings } from './Lights';

// Keep native lights under test while avoiding HDR and shadow asset setup.
vi.mock('@react-three/drei', () => {
  function MockEnvironment(props: Record<string, unknown>) {
    return <group userData={props} />;
  }

  function MockContactShadows() {
    return null;
  }

  return {
    ContactShadows: MockContactShadows,
    Environment: MockEnvironment,
  };
});

type TestRenderer = Awaited<ReturnType<typeof create>>;

const testTone: SceneToneSettings = {
  ...sceneToneDefaults,
  coolFill: 1.25,
  hemisphere: 0.7,
  warmKey: 3.4,
};

let renderer: TestRenderer | undefined;

afterEach(async () => {
  if (renderer) {
    await renderer.unmount();
    renderer = undefined;
  }

  vi.doUnmock('@react-three/drei');
  vi.resetModules();
});

describe('Lights scene', () => {
  it('passes configurable tone values to native hemisphere, directional, and point lights', async () => {
    renderer = await create(<Lights tone={testTone} />);

    const hemisphereLight = renderer.scene.findByType('HemisphereLight')
      .instance as THREE.HemisphereLight;
    const directionalLight = renderer.scene.findByType('DirectionalLight')
      .instance as THREE.DirectionalLight;
    const pointLight = renderer.scene.findByType('PointLight')
      .instance as THREE.PointLight;

    expect(hemisphereLight.color.getHexString()).toBe('edf6ff');
    expect(hemisphereLight.groundColor.getHexString()).toBe('b98268');
    expect(hemisphereLight.intensity).toBe(testTone.hemisphere);
    expect(directionalLight.color.getHexString()).toBe('ffe2b2');
    expect(directionalLight.intensity).toBe(testTone.warmKey);
    expect(pointLight.color.getHexString()).toBe('dbeeff');
    expect(pointLight.intensity).toBe(testTone.coolFill);
  });

  it('configures the HDR environment with bounded rendering', async () => {
    renderer = await create(<Lights tone={testTone} />);
    const environment = renderer.scene.findByType('Group')
      .instance as THREE.Group;

    expect(environment.userData).toMatchObject({
      files: 'hdr.hdr',
      background: false,
      environmentIntensity: testTone.environment,
      environmentRotation: [0, Math.PI * 0.15, 0],
      resolution: 128,
    });
  });

  it('attaches the directional target to the scene and removes it on unmount', async () => {
    renderer = await create(<Lights tone={testTone} />);
    const { instance: scene } = renderer.scene;
    const directionalLight = renderer.scene.findByType('DirectionalLight')
      .instance as THREE.DirectionalLight;
    const { target } = directionalLight;

    expect(target.position.toArray()).toEqual([0.5, 0, 0]);
    expect(target.parent).toBe(scene);
    expect(scene.children).toContain(target);

    await renderer.unmount();
    renderer = undefined;

    expect(target.parent).toBeNull();
    expect(scene.children).not.toContain(target);
  });
});
