import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';

export default function MenuTable() {
  const cupsFloatingGroupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      tableWood: new THREE.MeshStandardMaterial({
        color: '#160E0A',
        roughness: 0.32,
        metalness: 0.08,
      }),
      copperInlay: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        metalness: 0.88,
        roughness: 0.22,
      }),
      slateCoaster: new THREE.MeshStandardMaterial({
        color: '#221D1A',
        roughness: 0.5,
      }),
    };
  }, []);

  // 6 distinct cups with various dimensions and finishes representing the 6 menu offerings
  const menuCups: {
    pos: [number, number, number];
    scale: number;
    hasSteam: boolean;
    cremaColor: string;
    cupColor: string;
  }[] = [
    // 1. Espresso (small demitasse, intense dark crema)
    { pos: [-1.4, 0.9, -0.2], scale: 0.55, hasSteam: true, cremaColor: '#5C341C', cupColor: '#F5EFE6' },
    // 2. Cappuccino (classic bowl, golden hazelnut crema)
    { pos: [-0.85, 0.9, 0.25], scale: 0.68, hasSteam: true, cremaColor: '#8A5836', cupColor: '#ECE3D5' },
    // 3. Latte (tall curved cup, light milk foam)
    { pos: [-0.25, 0.9, -0.25], scale: 0.74, hasSteam: true, cremaColor: '#B08865', cupColor: '#FAF7F2' },
    // 4. Americano (clear balanced cup)
    { pos: [0.35, 0.9, 0.2], scale: 0.65, hasSteam: false, cremaColor: '#6B4228', cupColor: '#F2EDE4' },
    // 5. Mocha (indulgent chocolate-tinted crema)
    { pos: [0.95, 0.9, -0.15], scale: 0.72, hasSteam: true, cremaColor: '#4A2A1E', cupColor: '#E8DFC8' },
    // 6. Cold Brew Glass (tall sleek profile)
    { pos: [1.5, 0.9, 0.15], scale: 0.62, hasSteam: false, cremaColor: '#301A10', cupColor: '#F8F4EC' },
  ];

  // Subtle floating micro-movement of the cups showcase
  useFrame((state) => {
    if (cupsFloatingGroupRef.current) {
      const t = state.clock.getElapsedTime();
      cupsFloatingGroupRef.current.position.y = Math.sin(t * 1.2) * 0.015;
    }
  });

  return (
    <group position={[0.2, 0, -44.0]}>
      {/* ========================================================
          EXHIBITION MENU TABLE
      ======================================================== */}
      {/* Tabletop Surface Slab */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow material={materials.tableWood}>
        <boxGeometry args={[3.8, 0.08, 1.4]} />
      </mesh>

      {/* Elegant Copper Perimeter Inlay Band */}
      <mesh position={[0, 0.85, 0]} material={materials.copperInlay}>
        <boxGeometry args={[3.82, 0.04, 1.42]} />
      </mesh>

      {/* Dual Heavy Block Legs */}
      <mesh position={[-1.4, 0.42, 0]} castShadow material={materials.tableWood}>
        <boxGeometry args={[0.25, 0.84, 1.1]} />
      </mesh>
      <mesh position={[1.4, 0.42, 0]} castShadow material={materials.tableWood}>
        <boxGeometry args={[0.25, 0.84, 1.1]} />
      </mesh>

      {/* Floor Foot Stretcher Bar with Copper Sleeves */}
      <mesh position={[0, 0.15, 0]} material={materials.tableWood}>
        <boxGeometry args={[2.7, 0.06, 0.12]} />
      </mesh>
      <mesh position={[-1.2, 0.15, 0]} material={materials.copperInlay}>
        <boxGeometry args={[0.1, 0.08, 0.14]} />
      </mesh>
      <mesh position={[1.2, 0.15, 0]} material={materials.copperInlay}>
        <boxGeometry args={[0.1, 0.08, 0.14]} />
      </mesh>

      {/* ========================================================
          6 TASTING CUPS ON SLATE COASTERS WITH SUBTLE FLOAT
      ======================================================== */}
      <group ref={cupsFloatingGroupRef}>
        {menuCups.map((cup, i) => (
          <group key={`menu-cup-${i}`} position={cup.pos}>
            {/* Dark Stone / Slate Coaster */}
            <mesh position={[0, -0.015, 0]} material={materials.slateCoaster}>
              <cylinderGeometry args={[0.42 * cup.scale, 0.44 * cup.scale, 0.025, 24]} />
            </mesh>
            {/* Coffee Cup */}
            <CoffeeCup
              position={[0, 0, 0]}
              scale={cup.scale}
              hasSteam={cup.hasSteam}
              cremaColor={cup.cremaColor}
              cupColor={cup.cupColor}
              hasSaucer={true}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
