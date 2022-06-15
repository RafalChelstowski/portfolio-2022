import { useEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import isNumber from 'lodash/isNumber';
import { useStore } from '../store/store';

export function Camera(): JSX.Element {
  const isPresenting = useStore((state) => isNumber(state.isPresenting));
  const ref = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isPresenting) {
      ref.current.position.x = 5.7;
      ref.current.position.y = 15;
      ref.current.position.z = -7;
    } else {
      ref.current.position.x = 7;
      ref.current.position.y = 25;
      ref.current.position.z = -6;
    }
  }, [isPresenting]);

  return (
    <PerspectiveCamera
      ref={ref}
      fov={63}
      position={[7, 25, -6]}
      zoom={1.2}
      makeDefault
    />
  );
}
