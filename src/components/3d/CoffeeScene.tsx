import { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import CoffeeHouseArchitecture from './CoffeeHouseArchitecture';
import PendantLamps from './PendantLamps';
import EspressoStation from './EspressoStation';
import BrewingStation from './BrewingStation';
import SeatingArea from './SeatingArea';
import MenuTable from './MenuTable';
import SignaturePresentation from './SignaturePresentation';
import AtmosphericParticles from './AtmosphericParticles';
import CameraController from './CameraController';

interface CoffeeSceneProps {
  scrollProgressRef: React.RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}

function SceneContent({
  scrollProgressRef,
  isMobile,
  reducedMotion,
}: {
  scrollProgressRef: React.RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      {/* Exponential Fog: Distant parts of the coffee house seamlessly melt into rich espresso dark */}
      <fogExp2 attach="fog" args={['#100A08', 0.024]} />

      {/* Camera Controller with responsive damping & ambient idle drift */}
      <CameraController scrollProgressRef={scrollProgressRef} isMobile={isMobile} />

      {/* Global Warm Atmospheric Lighting */}
      {/* 1. Ambient Warm Cream Light */}
      <ambientLight color="#EED8BE" intensity={0.55} />

      {/* 2. Key Warm Directional Sunlight / Courtyard Light through window */}
      <directionalLight
        position={[8, 7, 2]}
        color="#F8D5A3"
        intensity={1.1}
      />

      {/* 3. Soft Opposite Fill Light */}
      <directionalLight
        position={[-6, 4, -30]}
        color="#70442E"
        intensity={0.35}
      />

      {/* 4. Architectural Environment: Floor, Timber Ceiling, Windows, Walls */}
      <CoffeeHouseArchitecture />

      {/* 5. Hanging Copper Pendant Lamps along the corridor (stable light count) */}
      <PendantLamps />

      {/* 6. Station 1 & 2: Counter, Espresso Machine, Shelves */}
      <EspressoStation />

      {/* 7. Station 3: Pour-Over Brewing Area with floating beans */}
      <BrewingStation />

      {/* 8. Station 4: Seating Area & Potted Plants */}
      <SeatingArea />

      {/* 9. Station 5: Exhibition Menu Table with 6 cups */}
      <MenuTable />

      {/* 10. Station 6: Final Hero Signature Cup with Illuminated Arch */}
      <SignaturePresentation />

      {/* 11. Seamless warm-gold floating atmospheric particles */}
      {!reducedMotion && <AtmosphericParticles />}
    </>
  );
}

const CoffeeScene = memo(function CoffeeScene({
  scrollProgressRef,
  isMobile,
  reducedMotion,
}: CoffeeSceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{
          position: [0, 3.3, 10],
          fov: 46,
          near: 0.1,
          far: 90,
        }}
        dpr={[1, 1.25]}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          depth: true,
          stencil: false,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#100A08', 1);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            scrollProgressRef={scrollProgressRef}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>

      {/* Pure hardware-accelerated CSS Vignette overlay: Zero WebGL overhead, zero buffer stutter */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(16,10,8,0.75)_100%)]" />
    </div>
  );
});

export default CoffeeScene;
