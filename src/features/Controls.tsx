import { OrbitControls } from '@react-three/drei';
import { useStore } from '../store/store';

const defaultControlsMode = {
  autoRotate: true,
  autoRotateSpeed: 0.5,
} as const;

const presentationControlsMode = {
  autoRotate: false,
  autoRotateSpeed: 0,
} as const;

export function Controls() {
  const isPresenting = useStore((state) => state.isPresenting !== null);
  const controlsMode = isPresenting ? presentationControlsMode : defaultControlsMode;

  return (
    <OrbitControls
      autoRotate={controlsMode.autoRotate}
      autoRotateSpeed={controlsMode.autoRotateSpeed}
      enablePan={false}
      enableDamping={false}
      enableZoom={false}
      enableRotate={false}
      maxPolarAngle={Math.PI / 3.5}
      minPolarAngle={Math.PI / 3.5}
    />
  );
}
