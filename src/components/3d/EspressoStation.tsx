import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';

export default function EspressoStation() {
  const grinderBurrRef = useRef<THREE.Group>(null);
  const steamWandSteamRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      counterWood: new THREE.MeshStandardMaterial({
        color: '#1C120C',
        roughness: 0.35,
        metalness: 0.05,
      }),
      counterMarbleTop: new THREE.MeshStandardMaterial({
        color: '#2A1D15',
        roughness: 0.22,
        metalness: 0.1,
      }),
      copperAccent: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        metalness: 0.88,
        roughness: 0.22,
      }),
      espressoCreamBody: new THREE.MeshStandardMaterial({
        color: '#E8DFC8',
        roughness: 0.25,
        metalness: 0.15,
      }),
      chromeMetal: new THREE.MeshStandardMaterial({
        color: '#D8D4CE',
        metalness: 0.92,
        roughness: 0.15,
      }),
      darkSteel: new THREE.MeshStandardMaterial({
        color: '#282320',
        metalness: 0.85,
        roughness: 0.3,
      }),
      glassContainer: new THREE.MeshStandardMaterial({
        color: '#EFEBE4',
        transparent: true,
        opacity: 0.38,
        roughness: 0.1,
        metalness: 0.1,
      }),
      roastedBeans: new THREE.MeshStandardMaterial({
        color: '#341E14',
        roughness: 0.7,
        metalness: 0.05,
      }),
      jarAmber: new THREE.MeshStandardMaterial({
        color: '#A6652E',
        transparent: true,
        opacity: 0.55,
        roughness: 0.15,
        metalness: 0.08,
      }),
      jarCeramic: new THREE.MeshStandardMaterial({
        color: '#E3D7C5',
        roughness: 0.3,
      }),
    };
  }, []);

  // Shelving jar positions (~15 jars across 3 rows)
  const jars = useMemo(() => {
    const list: { pos: [number, number, number]; type: 'copper' | 'glass' | 'ceramic'; scale: number }[] = [];
    const types: ('copper' | 'glass' | 'ceramic')[] = [
      'copper', 'glass', 'ceramic', 'glass', 'copper',
      'ceramic', 'copper', 'glass', 'ceramic', 'glass',
      'copper', 'glass', 'ceramic', 'copper', 'glass',
    ];

    let idx = 0;
    // 3 shelf heights
    const shelfY = [2.2, 3.1, 4.0];
    shelfY.forEach((y) => {
      // 5 jars per shelf
      for (let i = 0; i < 5; i++) {
        const z = -6.5 + i * 0.72;
        list.push({
          pos: [-5.6, y + 0.25, z],
          type: types[idx % types.length],
          scale: 0.85 + (idx % 3) * 0.12,
        });
        idx++;
      }
    });
    return list;
  }, []);

  // Slowly rotate the grinder burr mechanism inside the glass hopper
  useFrame((state) => {
    if (grinderBurrRef.current) {
      grinderBurrRef.current.rotation.y = state.clock.getElapsedTime() * 0.9;
    }
    if (steamWandSteamRef.current) {
      const s = Math.sin(state.clock.getElapsedTime() * 2.5);
      steamWandSteamRef.current.scale.setScalar(0.8 + s * 0.2);
    }
  });

  return (
    <group position={[-1.2, 0, -4.5]}>
      {/* ========================================================
          1. MAIN COFFEE COUNTER
      ======================================================== */}
      {/* Base Counter Body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={materials.counterWood}>
        <boxGeometry args={[1.5, 1.1, 5.8]} />
      </mesh>

      {/* Polished Countertop */}
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow material={materials.counterMarbleTop}>
        <boxGeometry args={[1.65, 0.08, 6.0]} />
      </mesh>

      {/* Copper Trim inlay on front face of counter */}
      <mesh position={[0.76, 0.85, 0]} material={materials.copperAccent}>
        <boxGeometry args={[0.02, 0.04, 5.7]} />
      </mesh>
      <mesh position={[0.76, 0.25, 0]} material={materials.copperAccent}>
        <boxGeometry args={[0.02, 0.03, 5.7]} />
      </mesh>

      {/* ========================================================
          2. DETAILED ESPRESSO MACHINE
      ======================================================== */}
      <group position={[0, 1.16, 0.4]}>
        {/* Machine Main Body (Cream Ceramic/Metal) */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow material={materials.espressoCreamBody}>
          <boxGeometry args={[0.82, 0.72, 1.4]} />
        </mesh>

        {/* Lower Chrome Drip Tray */}
        <mesh position={[0.15, 0.05, 0]} material={materials.chromeMetal}>
          <boxGeometry args={[0.55, 0.08, 1.34]} />
        </mesh>
        {/* Drip Tray Metal Grille */}
        <mesh position={[0.15, 0.095, 0]} material={materials.darkSteel}>
          <boxGeometry args={[0.5, 0.01, 1.28]} />
        </mesh>

        {/* Copper Top Cup Warmer Rail */}
        <mesh position={[0, 0.8, 0]} material={materials.copperAccent}>
          <boxGeometry args={[0.76, 0.04, 1.32]} />
        </mesh>
        <mesh position={[0.36, 0.85, 0]} material={materials.copperAccent}>
          <boxGeometry args={[0.02, 0.08, 1.3]} />
        </mesh>

        {/* Cups Warming on top of Machine */}
        <CoffeeCup position={[0.1, 0.83, -0.35]} scale={0.45} hasSteam={false} hasSaucer={false} />
        <CoffeeCup position={[-0.1, 0.83, 0.3]} scale={0.45} hasSteam={false} hasSaucer={false} />
        <CoffeeCup position={[0.12, 0.83, 0.1]} scale={0.45} hasSteam={false} hasSaucer={false} />

        {/* Dual Commercial Group Heads (Copper & Chrome) */}
        {[-0.32, 0.32].map((zOffset, i) => (
          <group key={`group-head-${i}`} position={[0.42, 0.45, zOffset]}>
            {/* Bell/Group housing */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.copperAccent}>
              <cylinderGeometry args={[0.12, 0.14, 0.16, 24]} />
            </mesh>
            {/* Portafilter Spout */}
            <mesh position={[0.06, -0.1, 0]} material={materials.chromeMetal}>
              <cylinderGeometry args={[0.09, 0.07, 0.1, 24]} />
            </mesh>
            {/* Portafilter Handle extending forward */}
            <mesh position={[0.26, -0.06, 0]} rotation={[0, 0, 0.15]} material={materials.counterWood}>
              <cylinderGeometry args={[0.028, 0.032, 0.34, 16]} />
            </mesh>
            {/* Portafilter Copper Cap */}
            <mesh position={[0.43, -0.08, 0]} material={materials.copperAccent}>
              <sphereGeometry args={[0.034, 12, 12]} />
            </mesh>
            {/* Active demitasse cup under group head */}
            <CoffeeCup
              position={[0.12, -0.28, 0]}
              scale={0.52}
              hasSteam={true}
              hasSaucer={true}
            />
          </group>
        ))}

        {/* Dual Circular Pressure Gauges */}
        <mesh position={[0.42, 0.65, -0.12]} rotation={[0, 0, Math.PI / 2]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.065, 0.065, 0.02, 24]} />
        </mesh>
        <mesh position={[0.42, 0.65, 0.12]} rotation={[0, 0, Math.PI / 2]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.065, 0.065, 0.02, 24]} />
        </mesh>

        {/* Chrome Steam Wands */}
        <mesh position={[0.42, 0.35, -0.6]} rotation={[0.3, 0, -0.3]} material={materials.chromeMetal}>
          <cylinderGeometry args={[0.016, 0.016, 0.42, 12]} />
        </mesh>
        <mesh position={[0.42, 0.35, 0.6]} rotation={[-0.3, 0, -0.3]} material={materials.chromeMetal}>
          <cylinderGeometry args={[0.016, 0.016, 0.42, 12]} />
        </mesh>
      </group>

      {/* ========================================================
          3. PRECISION COFFEE GRINDER WITH ROTATING BURR
      ======================================================== */}
      <group position={[0.05, 1.16, -1.6]}>
        {/* Grinder Heavy Base & Body */}
        <mesh position={[0, 0.35, 0]} castShadow material={materials.counterWood}>
          <cylinderGeometry args={[0.18, 0.22, 0.7, 24]} />
        </mesh>
        {/* Copper Collar */}
        <mesh position={[0, 0.72, 0]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.2, 0.2, 0.06, 24]} />
        </mesh>
        {/* Glass Bean Hopper Container */}
        <mesh position={[0, 1.05, 0]} material={materials.glassContainer}>
          <cylinderGeometry args={[0.22, 0.12, 0.6, 24, 1, true]} />
        </mesh>
        {/* Coffee Beans filling inside Hopper */}
        <mesh position={[0, 0.95, 0]} material={materials.roastedBeans}>
          <cylinderGeometry args={[0.18, 0.11, 0.38, 20]} />
        </mesh>
        {/* Copper Hopper Lid */}
        <mesh position={[0, 1.36, 0]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.23, 0.23, 0.04, 24]} />
        </mesh>
        {/* Rotating Burr Animation Group */}
        <group ref={grinderBurrRef} position={[0, 0.74, 0]}>
          <mesh material={materials.copperAccent}>
            <torusGeometry args={[0.12, 0.02, 8, 16]} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]} material={materials.darkSteel}>
            <boxGeometry args={[0.22, 0.02, 0.04]} />
          </mesh>
        </group>
        {/* Grinder Dosing Fork & Spout */}
        <mesh position={[0.22, 0.35, 0]} rotation={[0, 0, -Math.PI / 6]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.035, 0.025, 0.14, 16]} />
        </mesh>
      </group>

      {/* Fresh Coffee Cup on Counter for Guest */}
      <CoffeeCup
        position={[0.35, 1.16, 1.7]}
        scale={0.8}
        hasSteam={true}
        hasSaucer={true}
        cupColor="#F5EFE6"
      />

      {/* ========================================================
          4. WOODEN SHELVES WITH ~15 CONTAINERS & JARS BEHIND COUNTER
      ======================================================== */}
      {/* 3 Floating Walnut Shelves mounted on Left Wall (X = -4.5 from counter) */}
      {[2.2, 3.1, 4.0].map((shelfY, i) => (
        <group key={`shelf-${i}`} position={[-4.5, shelfY, -0.6]}>
          <mesh castShadow receiveShadow material={materials.counterWood}>
            <boxGeometry args={[0.55, 0.07, 4.4]} />
          </mesh>
          {/* Copper shelf brackets */}
          {[-1.6, 0, 1.6].map((bracketZ, bIdx) => (
            <mesh key={`bracket-${bIdx}`} position={[0.1, -0.18, bracketZ]} material={materials.copperAccent}>
              <boxGeometry args={[0.04, 0.32, 0.05]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Shelving containers and jars */}
      {jars.map((jar, idx) => {
        const mat =
          jar.type === 'copper'
            ? materials.copperAccent
            : jar.type === 'glass'
            ? materials.jarAmber
            : materials.jarCeramic;

        return (
          <group key={`jar-${idx}`} position={[jar.pos[0] + 1.2, jar.pos[1], jar.pos[2] + 4.5]} scale={jar.scale}>
            {/* Canister Body */}
            <mesh castShadow material={mat}>
              <cylinderGeometry args={[0.14, 0.14, 0.38, 20]} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.21, 0]} material={materials.copperAccent}>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 20]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
