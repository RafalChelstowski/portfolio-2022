import { OrbitControls } from '@react-three/drei';
import { useStore } from '../store/store';

const defaultControlsTarget = [0, 0, 0] as const;

const defaultControlsMode = {
  autoRotate: true,
  autoRotateSpeed: 0.5,
} as const;

const presentationControlsMode = {
  autoRotate: false,
  autoRotateSpeed: 0,
} as const;

export function Controls() {
  const isPresenting = useStore((state) => state.presentation.type !== 'none');
  const itemPresentationTarget = useStore((state) =>
    state.presentation.type === 'item' ? state.presentation.targetPosition : null
  );
  const controlsMode = isPresenting ? presentationControlsMode : defaultControlsMode;
  const controlsTarget = itemPresentationTarget ?? defaultControlsTarget;

  return (
    <OrbitControls
      target={controlsTarget}
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
