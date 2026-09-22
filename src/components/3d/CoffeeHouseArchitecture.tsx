import { useMemo } from 'react';
import * as THREE from 'three';

export default function CoffeeHouseArchitecture() {
  const materials = useMemo(() => {
    return {
      woodFloor: new THREE.MeshStandardMaterial({
        color: '#1A110B',
        roughness: 0.35,
        metalness: 0.08,
      }),
      floorPlanksAccent: new THREE.MeshStandardMaterial({
        color: '#241710',
        roughness: 0.42,
        metalness: 0.05,
      }),
      darkWoodWall: new THREE.MeshStandardMaterial({
        color: '#150E0A',
        roughness: 0.65,
        metalness: 0.05,
      }),
      accentWoodPanel: new THREE.MeshStandardMaterial({
        color: '#21150F',
        roughness: 0.55,
        metalness: 0.1,
      }),
      ceilingBeams: new THREE.MeshStandardMaterial({
        color: '#110B08',
        roughness: 0.7,
        metalness: 0.05,
      }),
      copperFrame: new THREE.MeshStandardMaterial({
        color: '#B87848',
        roughness: 0.28,
        metalness: 0.85,
      }),
      glassWindow: new THREE.MeshStandardMaterial({
        color: '#181216',
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.1,
      }),
      exteriorNight: new THREE.MeshBasicMaterial({
        color: '#080506',
      }),
      warmNightCityBokeh: new THREE.MeshBasicMaterial({
        color: '#E0A865',
        transparent: true,
        opacity: 0.15,
      }),
    };
  }, []);

  // Wooden ceiling beams along the corridor
  const beamZPositions = useMemo(() => {
    const list: number[] = [];
    for (let z = 14; z >= -72; z -= 4.5) {
      list.push(z);
    }
    return list;
  }, []);

  // Window mullions along the right wall (X = 5.95)
  const windowBays = useMemo(() => {
    const list: number[] = [];
    for (let z = 12; z >= -68; z -= 6.5) {
      list.push(z);
    }
    return list;
  }, []);

  // Alternating floor plank inlays to give real wooden floor texture
  const floorInlays = useMemo(() => {
    const list: number[] = [];
    for (let z = 14; z >= -70; z -= 3.2) {
      list.push(z);
    }
    return list;
  }, []);

  return (
    <group>
      {/* 1. Main Continuous Dark Wooden Floor */}
      <mesh
        position={[0, 0, -28]}
        receiveShadow
        material={materials.woodFloor}
      >
        <boxGeometry args={[12.2, 0.2, 92]} />
      </mesh>

      {/* Subtle floor plank divider lines */}
      {floorInlays.map((z, idx) => (
        <mesh
          key={`floor-plank-${idx}`}
          position={[0, 0.105, z]}
          material={materials.floorPlanksAccent}
        >
          <boxGeometry args={[11.8, 0.01, 0.06]} />
        </mesh>
      ))}

      {/* 2. Wooden Ceiling with Timber Beams */}
      <mesh
        position={[0, 5.4, -28]}
        material={materials.darkWoodWall}
      >
        <boxGeometry args={[12.2, 0.2, 92]} />
      </mesh>

      {/* Exposed dark timber ceiling beams */}
      {beamZPositions.map((z, idx) => (
        <group key={`beam-${idx}`} position={[0, 5.25, z]}>
          <mesh material={materials.ceilingBeams}>
            <boxGeometry args={[12.2, 0.3, 0.28]} />
          </mesh>
          {/* Subtle copper bracket on beam ends */}
          <mesh position={[-5.9, 0, 0]} material={materials.copperFrame}>
            <boxGeometry args={[0.08, 0.24, 0.3]} />
          </mesh>
          <mesh position={[5.9, 0, 0]} material={materials.copperFrame}>
            <boxGeometry args={[0.08, 0.24, 0.3]} />
          </mesh>
        </group>
      ))}

      {/* 3. Left Wall (X = -6): Rich paneled wood with wainscoting */}
      <mesh
        position={[-6, 2.7, -28]}
        material={materials.darkWoodWall}
      >
        <boxGeometry args={[0.2, 5.4, 92]} />
      </mesh>

      {/* Lower wainscoting trim along left wall */}
      <mesh
        position={[-5.88, 1.2, -28]}
        material={materials.accentWoodPanel}
      >
        <boxGeometry args={[0.08, 2.4, 91.5]} />
      </mesh>

      {/* Horizontal copper accent strip along left wall */}
      <mesh
        position={[-5.86, 2.42, -28]}
        material={materials.copperFrame}
      >
        <boxGeometry args={[0.04, 0.05, 91]} />
      </mesh>

      {/* 4. Right Wall (X = +6): Large floor-to-ceiling glass windows with copper frames */}
      {/* Lower low wood sill */}
      <mesh position={[6, 0.4, -28]} material={materials.darkWoodWall}>
        <boxGeometry args={[0.2, 0.8, 92]} />
      </mesh>

      {/* Upper header above windows */}
      <mesh position={[6, 5.0, -28]} material={materials.darkWoodWall}>
        <boxGeometry args={[0.2, 0.8, 92]} />
      </mesh>

      {/* Large continuous glass sheet */}
      <mesh position={[5.95, 2.7, -28]} material={materials.glassWindow}>
        <boxGeometry args={[0.04, 3.8, 91.5]} />
      </mesh>

      {/* Copper vertical mullions and horizontal glazing bars */}
      {windowBays.map((z, idx) => (
        <group key={`mullion-${idx}`} position={[5.9, 2.7, z]}>
          {/* Vertical copper frame */}
          <mesh material={materials.copperFrame}>
            <boxGeometry args={[0.14, 3.82, 0.12]} />
          </mesh>
          {/* Horizontal transom bar */}
          <mesh position={[-0.01, 0.8, 0]} material={materials.copperFrame}>
            <boxGeometry args={[0.1, 0.08, 6.4]} />
          </mesh>
        </group>
      ))}

      {/* Exterior warm soft light plane outside windows (simulating quiet city night / courtyard) */}
      <mesh position={[7.5, 2.5, -28]} rotation={[0, -Math.PI / 2, 0]} material={materials.exteriorNight}>
        <planeGeometry args={[95, 8]} />
      </mesh>

      {/* Distant soft warm bokeh lights outside window */}
      <mesh position={[7.2, 2.8, -15]} material={materials.warmNightCityBokeh}>
        <sphereGeometry args={[0.8, 16, 16]} />
      </mesh>
      <mesh position={[7.2, 3.2, -38]} material={materials.warmNightCityBokeh}>
        <sphereGeometry args={[1.1, 16, 16]} />
      </mesh>
      <mesh position={[7.2, 2.2, -58]} material={materials.warmNightCityBokeh}>
        <sphereGeometry args={[0.9, 16, 16]} />
      </mesh>

      {/* 5. End Wall (Z = -74): Dark wood and backlit architectural niche */}
      <mesh position={[0, 2.7, -74]} material={materials.darkWoodWall}>
        <boxGeometry args={[12.2, 5.4, 0.2]} />
      </mesh>

      {/* 6. Front Entrance Wall (Z = 16) */}
      <mesh position={[0, 2.7, 16]} material={materials.darkWoodWall}>
        <boxGeometry args={[12.2, 5.4, 0.2]} />
      </mesh>
    </group>
  );
}
