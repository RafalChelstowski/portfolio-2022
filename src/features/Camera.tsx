import { useEffect, useRef, type JSX } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import type { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { useStore } from '../store/store';

const defaultCameraPosition = [7, 25, -6] as const;
const presentationCameraPosition = [11, 18, -8] as const;
const defaultCameraTarget = [0, 0, 0] as const;
const presentationViewOffsetRatio = 0.22;
const defaultCameraZoom = 1.2;
const presentationCameraZoom = 1.35;

export function Camera(): JSX.Element {
  const isPresenting = useStore((state) => state.presentation.type !== 'none');
  const itemPresentationTarget = useStore((state) =>
    state.presentation.type === 'item' ? state.presentation.targetPosition : null
  );
  const { size } = useThree();
  const ref = useRef<PerspectiveCameraImpl>(null);

  useEffect(() => {
    const camera = ref.current;

    if (!camera) {
      return;
    }

    const cameraTarget = itemPresentationTarget ?? defaultCameraTarget;
    const [offsetX, offsetY, offsetZ] = isPresenting
      ? presentationCameraPosition
      : defaultCameraPosition;
    const [targetX, targetY, targetZ] = cameraTarget;

    camera.position.set(targetX + offsetX, targetY + offsetY, targetZ + offsetZ);
    camera.lookAt(targetX, targetY, targetZ);
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
  }, [isPresenting, itemPresentationTarget, size.height, size.width]);

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
