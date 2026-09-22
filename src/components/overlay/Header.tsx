import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download } from 'lucide-react';

interface HeaderProps {
  onScrollToTop: () => void;
  onNavigateSection: (index: number) => void;
  activeSection: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenDownload?: () => void;
}

export default function Header({
  onScrollToTop,
  onNavigateSection,
  activeSection,
  isAudioPlaying,
  onToggleAudio,
  onOpenDownload,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'COFFEE', index: 1 },
    { label: 'RITUAL', index: 2 },
    { label: 'HOUSE', index: 3 },
    { label: 'MENU', index: 4 },
    { label: 'VISIT', index: 5 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#100A08]/85 backdrop-blur-md border-b border-[#C88A58]/15 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Aurelia Brand Mark */}
        <button
          onClick={onScrollToTop}
          className="group flex flex-col items-start cursor-pointer text-left focus:outline-none"
        >
          <span className="font-display tracking-[0.22em] text-lg sm:text-xl font-bold text-[#F3EFEA] group-hover:text-[#E2A66C] transition-colors">
            AURELIA
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            <span className="h-[1px] w-6 bg-[#C88A58]/70 transition-all duration-300 group-hover:w-10 group-hover:bg-[#E2A66C]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A69485] uppercase">
              COFFEE HOUSE
            </span>
          </div>
        </button>

        {/* Center: Stage Waypoint Pills (Hidden on very small screens) */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigateSection(item.index)}
              className={`text-xs font-mono tracking-[0.18em] transition-all relative py-1 cursor-pointer ${
                activeSection === item.index
                  ? 'text-[#E2A66C] font-semibold'
                  : 'text-[#B8A798] hover:text-[#F3EFEA]'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.index && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C88A58]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Roastery subtitle + Audio ambience toggle */}
        <div className="flex items-center space-x-5">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-serif italic text-[#E2A66C]">
              Roastery & Coffee House
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#8A796D] uppercase">
              EST. 2024 · FIRENZE & OAXACA
            </span>
          </div>

          {/* Ambient Soundscape Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'border-[#C88A58] bg-[#C88A58]/15 text-[#E2A66C]'
                : 'border-white/10 bg-[#140D0A]/60 text-[#8A796D] hover:text-[#F3EFEA]'
            }`}
            title={isAudioPlaying ? 'Mute ambient coffee house sounds' : 'Play ambient coffee house sounds'}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Download Code ZIP button */}
          <button
            onClick={onOpenDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#C88A58]/40 bg-[#C88A58]/15 hover:bg-[#C88A58]/25 hover:border-[#C88A58] text-[#E2A66C] transition-all cursor-pointer text-xs font-mono"
            title="Download complete project ZIP file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wider">ZIP</span>
          </button>
        </div>
      </div>
    </header>
  );
}
