import { useMemo } from 'react';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';

export default function SeatingArea() {
  const materials = useMemo(() => {
    return {
      walnutTable: new THREE.MeshStandardMaterial({
        color: '#1C120B',
        roughness: 0.32,
        metalness: 0.08,
      }),
      chairWood: new THREE.MeshStandardMaterial({
        color: '#241710',
        roughness: 0.45,
        metalness: 0.05,
      }),
      copperLampShade: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        metalness: 0.88,
        roughness: 0.25,
      }),
      lampWarmGlow: new THREE.MeshBasicMaterial({
        color: '#FFDE9E',
      }),
      terracottaPot: new THREE.MeshStandardMaterial({
        color: '#A85A3C',
        roughness: 0.6,
      }),
      copperPot: new THREE.MeshStandardMaterial({
        color: '#B87445',
        metalness: 0.85,
        roughness: 0.3,
      }),
      darkFoliage: new THREE.MeshStandardMaterial({
        color: '#1E3825',
        roughness: 0.4,
      }),
      soilBrown: new THREE.MeshStandardMaterial({
        color: '#281B14',
        roughness: 0.8,
      }),
    };
  }, []);

  // 3 distinct seating arrangements along the left/center of the room
  const seatingGroups: [number, number, number][] = [
    [-2.6, 0, -27.0],
    [-1.2, 0, -32.5],
    [-3.2, 0, -36.5],
  ];

  return (
    <group>
      {seatingGroups.map(([gx, gy, gz], groupIndex) => (
        <group key={`seating-group-${groupIndex}`} position={[gx, gy, gz]}>
          {/* Round Dark Walnut Table */}
          {/* Tabletop Disc */}
          <mesh position={[0, 0.76, 0]} castShadow receiveShadow material={materials.walnutTable}>
            <cylinderGeometry args={[0.78, 0.78, 0.05, 32]} />
          </mesh>
          {/* Table Center Pedestal Base */}
          <mesh position={[0, 0.38, 0]} castShadow material={materials.walnutTable}>
            <cylinderGeometry args={[0.07, 0.09, 0.72, 16]} />
          </mesh>
          {/* Table Base Disc */}
          <mesh position={[0, 0.025, 0]} material={materials.walnutTable}>
            <cylinderGeometry args={[0.42, 0.42, 0.04, 24]} />
          </mesh>

          {/* Warm Tabletop Cordless Brass/Copper Lamp */}
          <group position={[0.22, 0.79, 0.1]}>
            {/* Lamp base */}
            <mesh material={materials.copperLampShade}>
              <cylinderGeometry args={[0.06, 0.08, 0.03, 16]} />
            </mesh>
            {/* Lamp stem */}
            <mesh position={[0, 0.12, 0]} material={materials.copperLampShade}>
              <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
            </mesh>
            {/* Mushroom copper shade */}
            <mesh position={[0, 0.23, 0]} material={materials.copperLampShade}>
              <sphereGeometry args={[0.09, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            </mesh>
            {/* Warm table light source */}
            <pointLight position={[0, 0.2, 0]} color="#FFA64D" intensity={3.5} distance={3.8} />
          </group>

          {/* Coffee cup on the table */}
          <CoffeeCup
            position={[-0.18, 0.79, -0.12]}
            scale={0.58}
            hasSteam={groupIndex === 1}
            hasSaucer={true}
          />

          {/* 2 Chairs per table */}
          {[-Math.PI * 0.35, Math.PI * 0.75].map((angle, chairIndex) => {
            const chairDist = 1.05;
            const cx = Math.cos(angle) * chairDist;
            const cz = Math.sin(angle) * chairDist;
            const chairRot = -angle + Math.PI / 2;

            return (
              <group key={`chair-${chairIndex}`} position={[cx, 0, cz]} rotation={[0, chairRot, 0]}>
                {/* Chair Seat */}
                <mesh position={[0, 0.45, 0]} castShadow material={materials.chairWood}>
                  <boxGeometry args={[0.48, 0.04, 0.46]} />
                </mesh>
                {/* 4 Chair Legs */}
                {[
                  [-0.2, 0.22, -0.19],
                  [0.2, 0.22, -0.19],
                  [-0.2, 0.22, 0.19],
                  [0.2, 0.22, 0.19],
                ].map(([lx, ly, lz], legIdx) => (
                  <mesh key={`leg-${legIdx}`} position={[lx, ly, lz]} material={materials.chairWood}>
                    <cylinderGeometry args={[0.02, 0.016, 0.44, 8]} />
                  </mesh>
                ))}
                {/* Curved Chair Backrest */}
                <mesh position={[0, 0.74, -0.2]} material={materials.chairWood}>
                  <boxGeometry args={[0.46, 0.18, 0.03]} />
                </mesh>
                <mesh position={[-0.2, 0.6, -0.2]} material={materials.chairWood}>
                  <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
                </mesh>
                <mesh position={[0.2, 0.6, -0.2]} material={materials.chairWood}>
                  <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}

      {/* ========================================================
          INDOOR PLANTS AROUND SEATING AREA
      ======================================================== */}
      {/* Plant 1: Large Terracotta Floor Planter (Near wall at X = -4.8, Z = -28) */}
      <group position={[-4.8, 0, -28.5]}>
        {/* Pot */}
        <mesh position={[0, 0.55, 0]} castShadow material={materials.terracottaPot}>
          <cylinderGeometry args={[0.45, 0.32, 1.1, 24]} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 1.08, 0]} material={materials.soilBrown}>
          <cylinderGeometry args={[0.43, 0.43, 0.05, 20]} />
        </mesh>
        {/* Large Lush Leaves (Ficus / Rubber tree style) */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const rotY = (i * Math.PI) / 3;
          const tiltX = 0.4 + (i % 2) * 0.2;
          return (
            <mesh
              key={`leaf-${i}`}
              position={[0, 1.2 + (i % 3) * 0.2, 0]}
              rotation={[tiltX, rotY, 0]}
              material={materials.darkFoliage}
            >
              <coneGeometry args={[0.28, 0.85, 5]} />
            </mesh>
          );
        })}
      </group>

      {/* Plant 2: Architectural Copper Planter (X = -4.2, Z = -34.5) */}
      <group position={[-4.5, 0, -34.8]}>
        <mesh position={[0, 0.45, 0]} castShadow material={materials.copperPot}>
          <cylinderGeometry args={[0.36, 0.26, 0.9, 20]} />
        </mesh>
        <mesh position={[0, 0.88, 0]} material={materials.soilBrown}>
          <cylinderGeometry args={[0.34, 0.34, 0.05, 16]} />
        </mesh>
        {/* Monstera broad leaves */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={`leaf-copper-${i}`}
            position={[0, 1.0 + i * 0.15, 0]}
            rotation={[0.5, (i * Math.PI) / 2, 0.2]}
            material={materials.darkFoliage}
          >
            <coneGeometry args={[0.32, 0.72, 6]} />
          </mesh>
        ))}
      </group>

      {/* Plant 3: Slender Planter along Right Window Wall (X = 4.8, Z = -31) */}
      <group position={[4.8, 0, -31]}>
        <mesh position={[0, 0.4, 0]} castShadow material={materials.terracottaPot}>
          <cylinderGeometry args={[0.32, 0.24, 0.8, 20]} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={`leaf-right-${i}`}
            position={[0, 0.9 + i * 0.12, 0]}
            rotation={[0.45, (i * Math.PI) / 2.5, 0]}
            material={materials.darkFoliage}
          >
            <coneGeometry args={[0.25, 0.65, 5]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
