import { RITUAL_STEPS } from '../../data/coffeeData';
import { ArrowRight } from 'lucide-react';

export default function TheRitualSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="text-xs font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-4">
          02 · THE RITUAL
        </div>

        {/* Heading */}
        <h2 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#F3EFEA] leading-[1.1] mb-6">
          FROM THE SOURCE <br />
          <span className="font-serif italic font-normal text-[#E2A66C]">
            TO YOUR CUP.
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#C2B2A3] max-w-xl font-light leading-relaxed mb-16">
          Each step is carefully measured to preserve the bean's natural character.
        </p>

        {/* Horizontal Process Grid: SELECT → GRIND → EXTRACT → POUR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {RITUAL_STEPS.map((step, idx) => (
            <div
              key={step.title}
              className="relative p-6 rounded-2xl glass-espresso border border-[#C88A58]/20 backdrop-blur-md transition-all duration-300 hover:border-[#C88A58]/50 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#8A796D] tracking-widest font-semibold">
                  STEP {step.number}
                </span>
                {idx < RITUAL_STEPS.length - 1 && (
                  <ArrowRight className="hidden lg:block w-4 h-4 text-[#C88A58]/50" />
                )}
              </div>

              <h3 className="font-display text-2xl font-bold tracking-wider text-[#F3EFEA] mb-1">
                {step.title}
              </h3>

              <div className="font-mono text-[11px] tracking-[0.15em] text-[#D49664] uppercase mb-3">
                {step.tag}
              </div>

              <p className="text-xs text-[#B5A597] leading-relaxed mb-4 font-light">
                {step.description}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#E2A66C]">
                <span>SPEC</span>
                <span>{step.tempOrTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
