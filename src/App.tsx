import { useState, useRef, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import CoffeeScene from './components/3d/CoffeeScene';
import Header from './components/overlay/Header';
import HeroSection from './components/overlay/HeroSection';
import OurCoffeeSection from './components/overlay/OurCoffeeSection';
import TheRitualSection from './components/overlay/TheRitualSection';
import TheHouseSection from './components/overlay/TheHouseSection';
import TheMenuSection from './components/overlay/TheMenuSection';
import EveningSection from './components/overlay/EveningSection';
import CoffeeDetailModal from './components/overlay/CoffeeDetailModal';
import ContactModal from './components/overlay/ContactModal';
import DownloadModal from './components/overlay/DownloadModal';
import { CoffeeStyle, MenuItem } from './types';
import { cafeSoundscape } from './utils/audioSynth';

export default function App() {
  const scrollProgressRef = useRef<number>(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CoffeeStyle | MenuItem | null>(null);
  const [contactModalType, setContactModalType] = useState<'contact' | 'location' | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Section references for precise navigation
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Mobile and media query detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkMobile, 100);
    };

    let resizeTimer: number;
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  // Performance-optimized scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const current = Math.max(0, Math.min(1, maxScroll > 0 ? window.scrollY / maxScroll : 0));
          scrollProgressRef.current = current;

          // Only trigger React state update when active section actually changes
          const sectionIndex = Math.min(5, Math.floor(current * 6));
          setActiveSection((prev) => (prev !== sectionIndex ? sectionIndex : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handlers
  const scrollToSection = useCallback((index: number) => {
    const targetElement = sectionRefs.current[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleAudio = useCallback(() => {
    const isPlaying = cafeSoundscape.toggle();
    setIsAudioPlaying(isPlaying);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#100A08] text-[#F3EFEA] selection:bg-[#C88A58] selection:text-[#100A08]">
      {/* 1. SINGLE PERSISTENT WEBGL CANVAS (Entire 3D coffee shop experience) */}
      <CoffeeScene
        scrollProgressRef={scrollProgressRef}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 2. PERSISTENT EDITORIAL HEADER */}
      <Header
        onScrollToTop={scrollToTop}
        onNavigateSection={scrollToSection}
        activeSection={activeSection}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* 3. VERTICAL PROGRESS BAR (Right edge) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center space-y-3 pointer-events-none">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="group pointer-events-auto p-1 focus:outline-none"
            title={`Jump to stage 0${idx}`}
          >
            <div
              className={`transition-all duration-300 rounded-full ${
                activeSection === idx
                  ? 'w-2 h-7 bg-[#C88A58]'
                  : 'w-1.5 h-1.5 bg-[#C88A58]/30 group-hover:bg-[#C88A58]/80 group-hover:h-3'
              }`}
            />
          </button>
        ))}
      </div>

      {/* 4. EDITORIAL HTML OVERLAYS (Stacked along scroll journey) */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Stage 0: Hero / Entrance */}
        <div ref={(el) => { sectionRefs.current[0] = el; }}>
          <HeroSection
            onExplore={() => scrollToSection(1)}
            onOpenDownload={() => setIsDownloadModalOpen(true)}
          />
        </div>

        {/* Stage 1: 01 Our Coffee */}
        <div ref={(el) => { sectionRefs.current[1] = el; }}>
          <OurCoffeeSection onSelectStyle={(style) => setSelectedItem(style)} />
        </div>

        {/* Stage 2: 02 The Ritual */}
        <div ref={(el) => { sectionRefs.current[2] = el; }}>
          <TheRitualSection />
        </div>

        {/* Stage 3: 03 The House */}
        <div ref={(el) => { sectionRefs.current[3] = el; }}>
          <TheHouseSection />
        </div>

        {/* Stage 4: 04 The Menu */}
        <div ref={(el) => { sectionRefs.current[4] = el; }}>
          <TheMenuSection onSelectItem={(item) => setSelectedItem(item)} />
        </div>

        {/* Stage 5: 05 Evening at Aurelia */}
        <div ref={(el) => { sectionRefs.current[5] = el; }}>
          <EveningSection
            onScrollToTop={scrollToTop}
            onOpenContactModal={() => setContactModalType('contact')}
            onOpenLocationModal={() => setContactModalType('location')}
          />
        </div>
      </main>

      {/* 5. INTERACTIVE DETAIL MODAL */}
      <CoffeeDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* 6. LOCATION / CONTACT MODAL */}
      {contactModalType && (
        <ContactModal
          type={contactModalType}
          onClose={() => setContactModalType(null)}
        />
      )}

      {/* 7. DEDICATED PROJECT ZIP DOWNLOAD MODAL */}
      {isDownloadModalOpen && (
        <DownloadModal onClose={() => setIsDownloadModalOpen(false)} />
      )}

    </div>
  );
}
