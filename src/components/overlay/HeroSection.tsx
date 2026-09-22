import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 pt-32 pb-16 pointer-events-auto">
      {/* Top Eyebrow */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C88A58] uppercase px-3 py-1 rounded-full bg-[#18100C]/80 border border-[#C88A58]/30 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#E2A66C]" />
          <span>SMALL-BATCH COFFEE · A DAILY RITUAL</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F3EFEA] leading-[1.05]">
            BREWED FOR <br />
            <span className="font-serif italic font-normal text-[#E2A66C] drop-shadow-sm">
              THE MOMENT
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#C2B2A3] max-w-xl font-light leading-relaxed">
            Thoughtfully roasted coffee, made to be savored slowly and shared often.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onExplore}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-[#C88A58]/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>EXPLORE THE COLLECTION</span>
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#8A796D] border-t border-white/5 pt-6">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2A66C] animate-pulse" />
          <span className="tracking-[0.2em] uppercase">STAGE 01 · COUNTER & ENTRANCE</span>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center space-x-2 text-[#C88A58] hover:text-[#F3EFEA] transition-colors cursor-pointer"
        >
          <span className="tracking-[0.2em] uppercase">SCROLL TO TRAVEL</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
