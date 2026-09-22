import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AtmosphericParticles() {
  const count = 48;
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and drift factors once
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = 0.8 + Math.random() * 4.4;
      pos[i * 3 + 2] = 10 - Math.random() * 80;

      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.18;
      vel[i * 3 + 1] = 0.08 + Math.random() * 0.12;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
    }

    return { positions: pos, velocities: vel };
  }, []);

  // Update particle positions smoothly scaled by delta
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const safeDelta = Math.min(delta, 0.04);
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 0] += velocities[i * 3 + 0] * safeDelta;
      array[i * 3 + 1] += velocities[i * 3 + 1] * safeDelta;
      array[i * 3 + 2] += velocities[i * 3 + 2] * safeDelta;

      // Wrap around seamlessly within room boundaries
      if (array[i * 3 + 1] > 5.2) {
        array[i * 3 + 1] = 0.8;
      }
      if (array[i * 3 + 0] > 5.5) array[i * 3 + 0] = -5.5;
      if (array[i * 3 + 0] < -5.5) array[i * 3 + 0] = 5.5;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#F0BF7A"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
