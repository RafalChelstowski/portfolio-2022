import { useEffect, useRef, type JSX } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import type { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { useStore } from '../store/store';

const defaultCameraPosition = [7, 25, -6] as const;
const presentationCameraPosition = [11, 18, -8] as const;
const presentationViewOffsetRatio = 0.22;
const defaultCameraZoom = 1.2;
const presentationCameraZoom = 1.35;

export function Camera(): JSX.Element {
  const presentingItemIndex = useStore((state) => state.isPresenting);
  const { size } = useThree();
  const ref = useRef<PerspectiveCameraImpl>(null);
  const isPresenting = presentingItemIndex !== null;

  useEffect(() => {
    const camera = ref.current;

    if (!camera) {
      return;
    }

    const [x, y, z] = isPresenting ? presentationCameraPosition : defaultCameraPosition;

    camera.position.set(x, y, z);
    camera.zoom = isPresenting ? presentationCameraZoom : defaultCameraZoom;

    if (isPresenting) {
      camera.setViewOffset(
        size.width,
        size.height,
        size.width * presentationViewOffsetRatio,
        0,
        size.width,
        size.height
      );
    } else {
      camera.clearViewOffset();
    }

    camera.updateProjectionMatrix();
  }, [isPresenting, presentingItemIndex, size.height, size.width]);

  return (
    <PerspectiveCamera
      ref={ref}
      fov={63}
      position={defaultCameraPosition}
      zoom={defaultCameraZoom}
      makeDefault
    />
  );
}
