import { OrbitControls } from '@react-three/drei';
import { useStore } from '../store/store';

export function Controls() {
  const isPresenting = useStore((state) => state.isPresenting !== null);

  return (
    <OrbitControls
      autoRotate={!isPresenting}
      autoRotateSpeed={isPresenting ? 0 : 0.5}
      enablePan={false}
      enableDamping={false}
      enableZoom={false}
      enableRotate={false}
      maxPolarAngle={Math.PI / 3.5}
      minPolarAngle={Math.PI / 3.5}
    />
  );
}
