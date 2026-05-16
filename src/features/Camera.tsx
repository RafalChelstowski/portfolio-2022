import { useEffect, useRef, type JSX } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import type { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { useStore } from '../store/store';

const defaultCameraPosition = [7, 25, -6] as const;
const presentationCameraPosition = [11, 18, -8] as const;

export function Camera(): JSX.Element {
  const presentingItemIndex = useStore((state) => state.isPresenting);
  const ref = useRef<PerspectiveCameraImpl>(null);
  const isPresenting = presentingItemIndex !== null;

  useEffect(() => {
    const camera = ref.current;

    if (!camera) {
      return;
    }

    const [x, y, z] = isPresenting ? presentationCameraPosition : defaultCameraPosition;

    camera.position.set(x, y, z);
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }, [isPresenting, presentingItemIndex]);

  return (
    <PerspectiveCamera
      ref={ref}
      fov={63}
      position={defaultCameraPosition}
      zoom={1.2}
      makeDefault
    />
  );
}
