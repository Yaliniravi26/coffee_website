import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';

export default function BrewingStation() {
  const pourStreamRef = useRef<THREE.Mesh>(null);
  const instancedBeansRef = useRef<THREE.InstancedMesh>(null);

  const beanCount = 24;

  const materials = useMemo(() => {
    return {
      woodCounter: new THREE.MeshStandardMaterial({
        color: '#18100A',
        roughness: 0.38,
        metalness: 0.05,
      }),
      copperAccent: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        metalness: 0.88,
        roughness: 0.22,
      }),
      kettleCopper: new THREE.MeshStandardMaterial({
        color: '#D48956',
        metalness: 0.92,
        roughness: 0.18,
      }),
      kettleWoodHandle: new THREE.MeshStandardMaterial({
        color: '#281912',
        roughness: 0.5,
      }),
      glassCarafe: new THREE.MeshStandardMaterial({
        color: '#FAF8F4',
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        metalness: 0.1,
      }),
      coffeeLiquid: new THREE.MeshStandardMaterial({
        color: '#3A1E11',
        roughness: 0.2,
      }),
      streamLiquid: new THREE.MeshBasicMaterial({
        color: '#5C331C',
        transparent: true,
        opacity: 0.85,
      }),
      ceramicFilterCone: new THREE.MeshStandardMaterial({
        color: '#F4EFE6',
        roughness: 0.2,
      }),
      coffeeBeanMat: new THREE.MeshStandardMaterial({
        color: '#2E190E',
        roughness: 0.6,
        metalness: 0.08,
      }),
    };
  }, []);

  // Bean dummy object and random motion params
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const beanData = useMemo(() => {
    const data: {
      baseX: number;
      baseY: number;
      baseZ: number;
      speedX: number;
      speedY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      scale: number;
    }[] = [];

    for (let i = 0; i < beanCount; i++) {
      // Float around the brew station
      data.push({
        baseX: 0.6 + (Math.random() - 0.5) * 2.2,
        baseY: 1.2 + Math.random() * 1.8,
        baseZ: -16.5 + (Math.random() - 0.5) * 3.5,
        speedX: 0.4 + Math.random() * 0.6,
        speedY: 0.6 + Math.random() * 0.8,
        rotSpeedX: 0.5 + Math.random() * 0.8,
        rotSpeedY: 0.7 + Math.random() * 0.9,
        scale: 0.075 + Math.random() * 0.035,
      });
    }
    return data;
  }, [beanCount]);

  // Set initial matrix for instanced beans
  useEffect(() => {
    if (instancedBeansRef.current) {
      beanData.forEach((b, i) => {
        dummy.position.set(b.baseX, b.baseY, b.baseZ);
        dummy.scale.set(b.scale * 1.4, b.scale, b.scale);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        dummy.updateMatrix();
        instancedBeansRef.current?.setMatrixAt(i, dummy.matrix);
      });
      instancedBeansRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [beanData, dummy]);

  // Subtle floating bean animation and graceful coffee stream pulse
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Instanced Coffee Beans gentle drift
    if (instancedBeansRef.current) {
      beanData.forEach((b, i) => {
        const yOffset = Math.sin(t * b.speedY + i) * 0.14;
        const xOffset = Math.cos(t * b.speedX + i * 0.7) * 0.08;
        const zOffset = Math.sin(t * 0.5 + i * 1.2) * 0.06;

        dummy.position.set(b.baseX + xOffset, b.baseY + yOffset, b.baseZ + zOffset);
        dummy.rotation.x = t * b.rotSpeedX * 0.4;
        dummy.rotation.y = t * b.rotSpeedY * 0.5;
        dummy.rotation.z = Math.sin(t + i) * 0.3;
        dummy.scale.set(b.scale * 1.35, b.scale * 0.9, b.scale);
        dummy.updateMatrix();
        instancedBeansRef.current?.setMatrixAt(i, dummy.matrix);
      });
      instancedBeansRef.current.instanceMatrix.needsUpdate = true;
    }

    // 2. Coffee Pouring Stream micro-fluctuation
    if (pourStreamRef.current) {
      const streamPulse = 1 + Math.sin(t * 8) * 0.08;
      pourStreamRef.current.scale.set(streamPulse, 1, streamPulse);
    }
  });

  return (
    <group position={[0.6, 0, -16.5]}>
      {/* Wooden Brewing Bench */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={materials.woodCounter}>
        <boxGeometry args={[1.5, 1.1, 4.4]} />
      </mesh>
      {/* Counter Top Slab */}
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow material={materials.woodCounter}>
        <boxGeometry args={[1.62, 0.07, 4.55]} />
      </mesh>
      {/* Copper Bench Trim */}
      <mesh position={[-0.78, 0.85, 0]} material={materials.copperAccent}>
        <boxGeometry args={[0.02, 0.03, 4.3]} />
      </mesh>

      {/* ========================================================
          BREWING APPARATUS: Chemex / V60 Stand & Glass Carafe
      ======================================================== */}
      <group position={[0, 1.15, -0.6]}>
        {/* Dripper Copper Stand */}
        <mesh position={[0, 0.28, -0.28]} material={materials.copperAccent}>
          <cylinderGeometry args={[0.02, 0.02, 0.58, 12]} />
        </mesh>
        <mesh position={[0, 0.56, -0.06]} material={materials.copperAccent}>
          <torusGeometry args={[0.22, 0.02, 12, 24]} />
        </mesh>

        {/* Ceramic Filter Dripper Cone */}
        <mesh position={[0, 0.54, -0.06]} rotation={[Math.PI, 0, 0]} material={materials.ceramicFilterCone}>
          <cylinderGeometry args={[0.26, 0.05, 0.32, 24, 1, true]} />
        </mesh>

        {/* Glass Pour-Over Carafe on Bench */}
        <mesh position={[0, 0.22, -0.06]} material={materials.glassCarafe}>
          <cylinderGeometry args={[0.16, 0.24, 0.44, 24]} />
        </mesh>

        {/* Freshly Brewed Coffee Liquid in Carafe */}
        <mesh position={[0, 0.14, -0.06]} material={materials.coffeeLiquid}>
          <cylinderGeometry args={[0.18, 0.22, 0.24, 24]} />
        </mesh>

        {/* Animated Trickling Coffee Stream from Filter into Carafe */}
        <mesh ref={pourStreamRef} position={[0, 0.32, -0.06]} material={materials.streamLiquid}>
          <cylinderGeometry args={[0.015, 0.012, 0.26, 12]} />
        </mesh>

        {/* ========================================================
            COPPER GOOSENECK KETTLE IN POURING POSITION
        ======================================================== */}
        <group position={[0.42, 0.72, 0.18]} rotation={[-0.28, 0.4, 0.22]}>
          {/* Kettle Body */}
          <mesh castShadow material={materials.kettleCopper}>
            <cylinderGeometry args={[0.18, 0.24, 0.36, 24]} />
          </mesh>
          {/* Kettle Lid & Wood Finial */}
          <mesh position={[0, 0.2, 0]} material={materials.kettleCopper}>
            <cylinderGeometry args={[0.14, 0.14, 0.04, 20]} />
          </mesh>
          <mesh position={[0, 0.25, 0]} material={materials.kettleWoodHandle}>
            <sphereGeometry args={[0.038, 12, 12]} />
          </mesh>
          {/* Curved Gooseneck Spout */}
          <mesh position={[-0.24, 0.05, -0.12]} rotation={[0.4, -0.3, 0.5]} material={materials.kettleCopper}>
            <cylinderGeometry args={[0.02, 0.026, 0.38, 12]} />
          </mesh>
          {/* Ergonomic Wooden Handle */}
          <mesh position={[0.26, 0.02, 0]} rotation={[0, 0, 0.2]} material={materials.kettleWoodHandle}>
            <boxGeometry args={[0.04, 0.32, 0.05]} />
          </mesh>
        </group>
      </group>

      {/* Fresh Tasting Cup on Brew Bench */}
      <CoffeeCup
        position={[0.1, 1.15, 0.9]}
        scale={0.75}
        hasSteam={true}
        hasSaucer={true}
        cupColor="#F8F3EA"
      />

      {/* Small copper bean dish on bench */}
      <group position={[-0.2, 1.15, 1.5]}>
        <mesh material={materials.copperAccent}>
          <cylinderGeometry args={[0.24, 0.18, 0.06, 24]} />
        </mesh>
        {/* Whole Roasted Beans in dish */}
        <mesh position={[0, 0.04, 0]} material={materials.coffeeBeanMat}>
          <sphereGeometry args={[0.17, 16, 12]} />
        </mesh>
      </group>

      {/* ========================================================
          INSTANCED MESH: FLOATING COFFEE BEANS AROUND BREW STATION
      ======================================================== */}
      <instancedMesh
        ref={instancedBeansRef}
        args={[undefined, undefined, beanCount]}
        castShadow
        material={materials.coffeeBeanMat}
      >
        {/* Realistic Bean Geometry (Elongated sphere with crease) */}
        <sphereGeometry args={[1, 16, 12]} />
      </instancedMesh>
    </group>
  );
}
