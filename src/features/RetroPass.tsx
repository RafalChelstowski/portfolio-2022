import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const retroPassDefaults = {
  grainOpacity: 0.03,
  grainScale: 20,
  scanlineIntensity: 0.05,
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uGrainOpacity;
  uniform float uGrainScale;
  uniform float uScanlineIntensity;
  uniform vec2 uCssResolution;

  varying vec2 vUv;

  float random(vec2 coordinate) {
    return fract(sin(dot(coordinate, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 pixel = vUv;
    vec2 cssPixel = floor(pixel * max(uCssResolution.xy, vec2(1.0)));
    float grainFrequency = max(uGrainScale, 1.0) * 10.0;
    float grainFrame = floor(uTime * 24.0);
    float grain = random(vec2(random(floor(pixel * grainFrequency)), grainFrame));
    float scanline = 1.0 - step(1.0, mod(cssPixel.y, 2.0));
    float grainAlpha = smoothstep(0.32, 1.0, grain) * uGrainOpacity;
    float scanlineAlpha = smoothstep(0.78, 1.0, scanline) * uScanlineIntensity;
    vec3 retroInk = vec3(0.055, 0.065, 0.085);

    gl_FragColor = vec4(retroInk, grainAlpha + scanlineAlpha);
    #include <colorspace_fragment>
  }
`;

export function RetroPass() {
  const size = useThree((state) => state.size);
  const { grainOpacity, grainScale, scanlineIntensity } = useControls(
    'RetroPass',
    {
      grainOpacity: {
        value: retroPassDefaults.grainOpacity,
        min: 0,
        max: 0.1,
        step: 0.005,
      },
      grainScale: {
        value: retroPassDefaults.grainScale,
        min: 8,
        max: 42,
        step: 1,
      },
      scanlineIntensity: {
        value: retroPassDefaults.scanlineIntensity,
        min: 0,
        max: 0.08,
        step: 0.002,
      },
    },
    { collapsed: true, render: () => import.meta.env.DEV }
  );

  const pass = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uGrainOpacity: { value: retroPassDefaults.grainOpacity },
      uGrainScale: { value: retroPassDefaults.grainScale },
      uScanlineIntensity: { value: retroPassDefaults.scanlineIntensity },
      uCssResolution: { value: new THREE.Vector2(1, 1) },
    };
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.frustumCulled = false;
    scene.add(mesh);

    return {
      camera,
      geometry,
      material,
      scene,
      uniforms,
    };
  }, []);

  useEffect(() => {
    pass.uniforms.uCssResolution.value.set(size.width, size.height);
  }, [pass.uniforms.uCssResolution.value, size.height, size.width]);

  useEffect(() => {
    pass.uniforms.uGrainOpacity.value = grainOpacity;
    pass.uniforms.uGrainScale.value = grainScale;
    pass.uniforms.uScanlineIntensity.value = scanlineIntensity;
  }, [
    grainOpacity,
    grainScale,
    pass.uniforms.uGrainOpacity,
    pass.uniforms.uGrainScale,
    pass.uniforms.uScanlineIntensity,
    scanlineIntensity,
  ]);

  useEffect(
    () => () => {
      pass.geometry.dispose();
      pass.material.dispose();
    },
    [pass.geometry, pass.material]
  );

  useFrame(({ camera, clock, gl, scene }) => {
    const previousAutoClear = gl.autoClear;

    pass.uniforms.uTime.value = clock.elapsedTime;

    Reflect.set(gl, 'autoClear', true);
    gl.render(scene, camera);
    Reflect.set(gl, 'autoClear', false);
    gl.clearDepth();
    gl.render(pass.scene, pass.camera);
    Reflect.set(gl, 'autoClear', previousAutoClear);
  }, 1);

  return null;
}
