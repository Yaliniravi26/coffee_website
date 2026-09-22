import { MapPin, Mail, Clock, ArrowUp } from 'lucide-react';

interface EveningSectionProps {
  onScrollToTop: () => void;
  onOpenContactModal: () => void;
  onOpenLocationModal: () => void;
}

export default function EveningSection({
  onScrollToTop,
  onOpenContactModal,
  onOpenLocationModal,
}: EveningSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 sm:px-12 pt-28 pb-12 pointer-events-auto">
      {/* Spacer top */}
      <div />

      {/* Main Centered Hero Finish */}
      <div className="max-w-2xl mx-auto my-auto space-y-6">
        {/* Eyebrow */}
        <div className="text-xs font-mono tracking-[0.25em] text-[#C88A58] uppercase">
          05 · EVENING AT AURELIA
        </div>

        {/* Heading */}
        <h2 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F3EFEA] leading-[1.05]">
          SHARE A CUP <br />
          <span className="font-serif italic font-normal text-[#E2A66C]">
            WITH US.
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-xl text-[#C2B2A3] font-light leading-relaxed max-w-lg mx-auto">
          Stay for the warmth, the conversation, and a cup worth remembering.
        </p>

        {/* Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-5">
          {/* FIND US Button */}
          <button
            onClick={onOpenLocationModal}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>FIND US</span>
          </button>

          {/* GET IN TOUCH Button */}
          <button
            onClick={onOpenContactModal}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full border border-[#C88A58]/50 hover:border-[#E2A66C] bg-[#1A110D]/80 hover:bg-[#251712] text-[#F3EFEA] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#E2A66C]" />
            <span>GET IN TOUCH</span>
          </button>
        </div>

        <div className="pt-3">
          <a
            href="mailto:hello@aurelia.coffee"
            className="text-xs font-mono text-[#8C7A6D] hover:text-[#E2A66C] transition-colors tracking-widest"
          >
            hello@aurelia.coffee
          </a>
        </div>
      </div>

      {/* Footer & Back to Top */}
      <div className="w-full max-w-7xl mx-auto pt-16 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#7A6B5F] border-t border-white/5 gap-4">
        <div>
          <span>Aurelia Coffee House · Made with care</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <span>DAILY · 7:00 AM — 10:00 PM</span>
          <button
            onClick={onScrollToTop}
            className="inline-flex items-center space-x-1.5 text-[#C88A58] hover:text-[#F3EFEA] transition-colors cursor-pointer"
          >
            <span>RETURN TO ENTRANCE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
