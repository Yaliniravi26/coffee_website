import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_WAYPOINTS } from '../../data/coffeeData';

interface CameraControllerProps {
  scrollProgressRef: React.RefObject<number>;
  isMobile?: boolean;
}

export default function CameraController({
  scrollProgressRef,
  isMobile = false,
}: CameraControllerProps) {
  const { camera } = useThree();

  // Smoothed position and lookAt vectors
  const currentPos = useRef(new THREE.Vector3(...CAMERA_WAYPOINTS[0].position));
  const currentTarget = useRef(new THREE.Vector3(...CAMERA_WAYPOINTS[0].target));
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });

  // Listen to subtle mouse movement on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.x = nx;
      mousePos.current.y = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.04);

    // Read raw scroll progress (0.0 to 1.0)
    const rawProgress = Math.max(0, Math.min(1, scrollProgressRef.current ?? 0));

    // Determine segment between waypoints
    const totalSegments = CAMERA_WAYPOINTS.length - 1;
    const progressScaled = rawProgress * totalSegments;
    const index = Math.min(Math.floor(progressScaled), totalSegments - 1);
    const fraction = progressScaled - index;

    // Smoothstep easing for each segment to eliminate abrupt transitions
    const easedFraction = fraction * fraction * (3 - 2 * fraction);

    const wpA = CAMERA_WAYPOINTS[index];
    const wpB = CAMERA_WAYPOINTS[index + 1] || wpA;

    // Target waypoint interpolation
    const targetX = THREE.MathUtils.lerp(wpA.position[0], wpB.position[0], easedFraction);
    const targetY = THREE.MathUtils.lerp(wpA.position[1], wpB.position[1], easedFraction);
    const targetZ = THREE.MathUtils.lerp(wpA.position[2], wpB.position[2], easedFraction);

    const lookX = THREE.MathUtils.lerp(wpA.target[0], wpB.target[0], easedFraction);
    const lookY = THREE.MathUtils.lerp(wpA.target[1], wpB.target[1], easedFraction);
    const lookZ = THREE.MathUtils.lerp(wpA.target[2], wpB.target[2], easedFraction);

    // Ambient continuous breathing drift (ensures background animation is always seamless and never stuck)
    const elapsedTime = state.clock.getElapsedTime();
    const breathY = Math.sin(elapsedTime * 0.7) * 0.03;
    const breathX = Math.cos(elapsedTime * 0.45) * 0.025;

    // Mouse parallax damping (subtle, non-jarring)
    if (!isMobile) {
      smoothedMouse.current.x = THREE.MathUtils.damp(
        smoothedMouse.current.x,
        mousePos.current.x,
        5.0,
        safeDelta
      );
      smoothedMouse.current.y = THREE.MathUtils.damp(
        smoothedMouse.current.y,
        mousePos.current.y,
        5.0,
        safeDelta
      );
    }

    const mouseOffsetX = isMobile ? 0 : smoothedMouse.current.x * 0.18;
    const mouseOffsetY = isMobile ? 0 : smoothedMouse.current.y * 0.1;

    // Highly responsive damping: Eliminates any feeling of lag or buffer
    const dampSpeed = 6.8;
    currentPos.current.x = THREE.MathUtils.damp(
      currentPos.current.x,
      targetX + mouseOffsetX + breathX,
      dampSpeed,
      safeDelta
    );
    currentPos.current.y = THREE.MathUtils.damp(
      currentPos.current.y,
      targetY + mouseOffsetY + breathY,
      dampSpeed,
      safeDelta
    );
    currentPos.current.z = THREE.MathUtils.damp(
      currentPos.current.z,
      targetZ,
      dampSpeed,
      safeDelta
    );

    // Smoothly damp lookAt target
    currentTarget.current.x = THREE.MathUtils.damp(
      currentTarget.current.x,
      lookX + mouseOffsetX * 0.35 + breathX * 0.5,
      dampSpeed,
      safeDelta
    );
    currentTarget.current.y = THREE.MathUtils.damp(
      currentTarget.current.y,
      lookY + mouseOffsetY * 0.25 + breathY * 0.5,
      dampSpeed,
      safeDelta
    );
    currentTarget.current.z = THREE.MathUtils.damp(
      currentTarget.current.z,
      lookZ,
      dampSpeed,
      safeDelta
    );

    // Apply to camera
    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
