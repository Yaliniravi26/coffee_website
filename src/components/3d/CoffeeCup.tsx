import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CoffeeCupProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  hasSteam?: boolean;
  cremaColor?: string;
  hasSaucer?: boolean;
  cupColor?: string;
}

export default function CoffeeCup({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  hasSteam = true,
  cremaColor = '#8A5836',
  hasSaucer = true,
  cupColor = '#F2EDE4',
}: CoffeeCupProps) {
  const steamGroupRef = useRef<THREE.Group>(null);

  // Materials memoized for performance
  const materials = useMemo(() => {
    return {
      ceramic: new THREE.MeshStandardMaterial({
        color: cupColor,
        roughness: 0.18,
        metalness: 0.05,
      }),
      copperRim: new THREE.MeshStandardMaterial({
        color: '#D49664',
        roughness: 0.28,
        metalness: 0.85,
      }),
      coffeeLiquid: new THREE.MeshStandardMaterial({
        color: cremaColor,
        roughness: 0.45,
        metalness: 0.08,
      }),
      steam: new THREE.MeshBasicMaterial({
        color: '#EDE4D8',
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    };
  }, [cupColor, cremaColor]);

  // Subtle animated steam wisps
  useFrame((state) => {
    if (steamGroupRef.current && hasSteam) {
      const t = state.clock.getElapsedTime();
      steamGroupRef.current.children.forEach((child, idx) => {
        const offset = idx * 1.6;
        child.position.y = 0.5 + Math.sin(t * 1.2 + offset) * 0.18 + (t * 0.12 + offset * 0.2) % 0.8;
        child.position.x = Math.sin(t * 0.8 + offset) * 0.05;
        child.rotation.z = Math.sin(t * 0.6 + offset) * 0.2;
        child.scale.setScalar(0.7 + Math.sin(t * 1.5 + offset) * 0.3);
      });
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Saucer */}
      {hasSaucer && (
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow material={materials.ceramic}>
            <cylinderGeometry args={[0.58, 0.42, 0.04, 32]} />
          </mesh>
          {/* Subtle copper accent ring in saucer */}
          <mesh position={[0, 0.021, 0]} material={materials.copperRim}>
            <ringGeometry args={[0.42, 0.44, 32]} />
          </mesh>
        </group>
      )}

      {/* Main Cup Body */}
      <group position={[0, hasSaucer ? 0.02 : 0, 0]}>
        {/* Cup Outer Wall */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow material={materials.ceramic}>
          <cylinderGeometry args={[0.34, 0.25, 0.42, 32, 1, true]} />
        </mesh>

        {/* Cup Bottom Cap */}
        <mesh position={[0, 0.015, 0]} material={materials.ceramic}>
          <cylinderGeometry args={[0.25, 0.25, 0.03, 32]} />
        </mesh>

        {/* Fine Copper Rim */}
        <mesh position={[0, 0.43, 0]} material={materials.copperRim}>
          <torusGeometry args={[0.34, 0.012, 12, 32]} />
        </mesh>

        {/* Inner Liquid / Crema */}
        <mesh position={[0, 0.37, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.coffeeLiquid}>
          <circleGeometry args={[0.32, 32]} />
        </mesh>

        {/* Cup Handle */}
        <mesh position={[0.33, 0.22, 0]} rotation={[0, 0, 0]} castShadow material={materials.ceramic}>
          <torusGeometry args={[0.13, 0.032, 12, 24, Math.PI * 1.25]} />
        </mesh>
      </group>

      {/* Gentle Steam Plume */}
      {hasSteam && (
        <group ref={steamGroupRef} position={[0, 0.4, 0]}>
          <mesh position={[0, 0.3, 0]} material={materials.steam}>
            <sphereGeometry args={[0.12, 12, 12]} />
          </mesh>
          <mesh position={[0.04, 0.5, 0.02]} material={materials.steam}>
            <sphereGeometry args={[0.14, 12, 12]} />
          </mesh>
          <mesh position={[-0.03, 0.75, -0.01]} material={materials.steam}>
            <sphereGeometry args={[0.16, 12, 12]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
