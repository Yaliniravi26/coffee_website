import { COFFEE_STYLES } from '../../data/coffeeData';
import { CoffeeStyle } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface OurCoffeeSectionProps {
  onSelectStyle: (style: CoffeeStyle) => void;
}

export default function OurCoffeeSection({ onSelectStyle }: OurCoffeeSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="text-xs font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-4">
          01 · OUR COFFEE
        </div>

        {/* Heading */}
        <h2 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#F3EFEA] leading-[1.1] mb-6">
          FOUR COFFEE STYLES. <br />
          <span className="font-serif italic font-normal text-[#E2A66C]">
            ONE STANDARD.
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#C2B2A3] max-w-xl font-light leading-relaxed mb-12">
          From bright and delicate to deep and indulgent, every roast is made with intention.
        </p>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {COFFEE_STYLES.map((style) => (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className="group relative p-8 rounded-2xl glass-espresso border border-[#C88A58]/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:border-[#C88A58]/60 cursor-pointer shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs tracking-[0.2em] text-[#C88A58] font-bold">
                  {style.number}
                </span>
                <span className="p-1.5 rounded-full bg-[#1A120E] text-[#C88A58] group-hover:text-[#F3EFEA] group-hover:bg-[#C88A58] transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-wider text-[#F3EFEA] group-hover:text-[#E2A66C] transition-colors mb-1">
                {style.name}
              </h3>

              <div className="font-serif italic text-base text-[#D49664] mb-3">
                {style.tagline}
              </div>

              <p className="text-sm text-[#A8988B] leading-relaxed mb-5 font-light">
                {style.description}
              </p>

              {/* Flavor notes pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {style.notes.map((note) => (
                  <span
                    key={note}
                    className="text-[11px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#18100C] text-[#C2B2A3] border border-white/5"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
