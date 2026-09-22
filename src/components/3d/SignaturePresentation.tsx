import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CoffeeCup from './CoffeeCup';

export default function SignaturePresentation() {
  const haloPulseRef = useRef<THREE.Mesh>(null);
  const cupPedestalRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      darkPedestalWood: new THREE.MeshStandardMaterial({
        color: '#150E09',
        roughness: 0.28,
        metalness: 0.08,
      }),
      copperGoldAccents: new THREE.MeshStandardMaterial({
        color: '#D49658',
        metalness: 0.92,
        roughness: 0.18,
      }),
      illuminatedPanelBack: new THREE.MeshBasicMaterial({
        color: '#F0AA52',
        transparent: true,
        opacity: 0.22,
      }),
      glowingArchBorder: new THREE.MeshStandardMaterial({
        color: '#C88A58',
        emissive: '#FFB35A',
        emissiveIntensity: 0.45,
        metalness: 0.8,
        roughness: 0.2,
      }),
      terracottaPot: new THREE.MeshStandardMaterial({
        color: '#8A482E',
        roughness: 0.55,
      }),
      deepEmeraldLeaves: new THREE.MeshStandardMaterial({
        color: '#162F1E',
        roughness: 0.35,
      }),
    };
  }, []);

  // Subtle breathing pulse for the back-lit arch halo
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (haloPulseRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.03;
      haloPulseRef.current.scale.set(pulse, pulse, 1);
    }
    if (cupPedestalRef.current) {
      // Very slow majestic turn of the hero cup
      cupPedestalRef.current.rotation.y = Math.sin(t * 0.5) * 0.12;
    }
  });

  return (
    <group position={[0, 0, -68]}>
      {/* ========================================================
          1. WARM GOLDEN ILLUMINATED ARCH PANEL ON DARK WALL
      ======================================================== */}
      {/* Arch Backdrop Glow Plane */}
      <mesh
        ref={haloPulseRef}
        position={[0, 2.8, -0.6]}
        material={materials.illuminatedPanelBack}
      >
        <planeGeometry args={[4.2, 5.2]} />
      </mesh>

      {/* Architectural Curved Arch Halo Frame */}
      <group position={[0, 2.9, -0.5]}>
        {/* Outer Copper Arch Border */}
        <mesh material={materials.glowingArchBorder}>
          <boxGeometry args={[3.6, 0.08, 0.06]} />
        </mesh>
        <mesh position={[-1.76, -1.2, 0]} material={materials.glowingArchBorder}>
          <boxGeometry args={[0.08, 2.4, 0.06]} />
        </mesh>
        <mesh position={[1.76, -1.2, 0]} material={materials.glowingArchBorder}>
          <boxGeometry args={[0.08, 2.4, 0.06]} />
        </mesh>
      </group>

      {/* Dramatic Warm Spotlight focused on Signature Cup */}
      <spotLight
        position={[0, 5.2, 2.5]}
        target-position={[0, 1.4, 0]}
        color="#FFE0B2"
        intensity={35}
        angle={0.55}
        penumbra={0.8}
        distance={10}
      />

      {/* Soft warm backlight */}
      <pointLight position={[0, 2.6, -0.2]} color="#FFA64D" intensity={18} distance={8} />

      {/* ========================================================
          2. ELEVATED WOODEN PEDESTAL WITH COPPER COLLAR
      ======================================================== */}
      {/* Stepped Base Tier */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow material={materials.darkPedestalWood}>
        <cylinderGeometry args={[1.5, 1.65, 0.24, 36]} />
      </mesh>
      {/* Copper Reveal Band */}
      <mesh position={[0, 0.25, 0]} material={materials.copperGoldAccents}>
        <cylinderGeometry args={[1.48, 1.48, 0.03, 36]} />
      </mesh>

      {/* Main Pedestal Cylinder */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={materials.darkPedestalWood}>
        <cylinderGeometry args={[1.1, 1.3, 0.9, 36]} />
      </mesh>

      {/* Polished Top Pedestal Slab */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow material={materials.darkPedestalWood}>
        <cylinderGeometry args={[1.18, 1.18, 0.07, 36]} />
      </mesh>
      {/* Copper Inlay Ring on Pedestal Top */}
      <mesh position={[0, 1.24, 0]} material={materials.copperGoldAccents}>
        <ringGeometry args={[1.05, 1.12, 36]} />
      </mesh>

      {/* ========================================================
          3. LARGE HERO SIGNATURE AURELIA COFFEE CUP
      ======================================================== */}
      <group ref={cupPedestalRef} position={[0, 1.24, 0]}>
        <CoffeeCup
          position={[0, 0, 0]}
          scale={1.42}
          hasSteam={true}
          hasSaucer={true}
          cupColor="#FAF7F0"
          cremaColor="#8E5230"
        />
      </group>

      {/* ========================================================
          4. FLANKING TALL ARCHITECTURAL PLANTS ON BOTH SIDES
      ======================================================== */}
      {/* Left Planter */}
      <group position={[-2.4, 0, 0.2]}>
        <mesh position={[0, 0.65, 0]} castShadow material={materials.terracottaPot}>
          <cylinderGeometry args={[0.42, 0.3, 1.3, 24]} />
        </mesh>
        <mesh position={[0, 1.31, 0]} material={materials.copperGoldAccents}>
          <cylinderGeometry args={[0.43, 0.43, 0.03, 24]} />
        </mesh>
        {/* Foliage */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={`left-sig-leaf-${i}`}
            position={[0, 1.5 + (i % 3) * 0.25, 0]}
            rotation={[0.45, (i * Math.PI) / 3, 0]}
            material={materials.deepEmeraldLeaves}
          >
            <coneGeometry args={[0.34, 1.0, 5]} />
          </mesh>
        ))}
      </group>

      {/* Right Planter */}
      <group position={[2.4, 0, 0.2]}>
        <mesh position={[0, 0.65, 0]} castShadow material={materials.terracottaPot}>
          <cylinderGeometry args={[0.42, 0.3, 1.3, 24]} />
        </mesh>
        <mesh position={[0, 1.31, 0]} material={materials.copperGoldAccents}>
          <cylinderGeometry args={[0.43, 0.43, 0.03, 24]} />
        </mesh>
        {/* Foliage */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={`right-sig-leaf-${i}`}
            position={[0, 1.5 + (i % 3) * 0.25, 0]}
            rotation={[0.45, (i * Math.PI) / 3 + 0.3, 0]}
            material={materials.deepEmeraldLeaves}
          >
            <coneGeometry args={[0.34, 1.0, 5]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
