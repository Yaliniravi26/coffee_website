import { useMemo } from 'react';
import * as THREE from 'three';

export default function PendantLamps() {
  // Stable key lamp positions along the corridor (constant count prevents shader re-compilation)
  const lampPositions = useMemo(() => [
    { pos: [0, 5.2, 5], intensity: 18, distance: 14 },
    { pos: [-1.2, 5.2, -7], intensity: 20, distance: 15 },
    { pos: [1.0, 5.2, -19], intensity: 20, distance: 15 },
    { pos: [-1.0, 5.2, -32], intensity: 19, distance: 15 },
    { pos: [0.8, 5.2, -45], intensity: 20, distance: 15 },
    { pos: [0, 5.2, -58], intensity: 24, distance: 18 },
  ], []);

  // Materials memoized once
  const materials = useMemo(() => {
    return {
      cable: new THREE.MeshStandardMaterial({
        color: '#1A1412',
        roughness: 0.8,
      }),
      copperShade: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        metalness: 0.85,
        roughness: 0.25,
      }),
      bulbGlow: new THREE.MeshBasicMaterial({
        color: '#FFE8B3',
      }),
    };
  }, []);

  return (
    <group>
      {lampPositions.map((lamp, index) => {
        const [x, ceilingY, z] = lamp.pos;
        const shadeY = ceilingY - 1.8; // shade hangs down 1.8 units
        const cableLength = 1.8;

        return (
          <group key={index} position={[x, 0, z]}>
            {/* Thin black/copper hanging cable */}
            <mesh position={[0, ceilingY - cableLength / 2, 0]} material={materials.cable}>
              <cylinderGeometry args={[0.012, 0.012, cableLength, 8]} />
            </mesh>

            {/* Copper conical lampshade */}
            <mesh position={[0, shadeY, 0]} material={materials.copperShade}>
              <cylinderGeometry args={[0.1, 0.42, 0.38, 24, 1, true]} />
            </mesh>

            {/* Inside copper lip */}
            <mesh position={[0, shadeY - 0.18, 0]} material={materials.copperShade}>
              <ringGeometry args={[0.39, 0.42, 24]} />
            </mesh>

            {/* Glowing warm golden bulb */}
            <mesh position={[0, shadeY - 0.08, 0]} material={materials.bulbGlow}>
              <sphereGeometry args={[0.085, 16, 16]} />
            </mesh>

            {/* Dedicated warm point light casting pools of golden light */}
            <pointLight
              position={[0, shadeY - 0.2, 0]}
              color="#FFAF5E"
              intensity={lamp.intensity}
              distance={lamp.distance}
              decay={2}
            />
          </group>
        );
      })}
    </group>
  );
}
