import { MENU_ITEMS } from '../../data/coffeeData';
import { MenuItem } from '../../types';
import { Plus } from 'lucide-react';

interface TheMenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export default function TheMenuSection({ onSelectItem }: TheMenuSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="text-xs font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-4 text-center">
          04 · THE MENU
        </div>

        {/* Heading */}
        <h2 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-[#F3EFEA] leading-[1.1] mb-6 text-center">
          FIND YOUR <br />
          <span className="font-serif italic font-normal text-[#E2A66C]">
            PERFECT CUP.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#A8988B] text-center max-w-lg mx-auto font-light leading-relaxed mb-12">
          Prepared to order using freshly dialed micro-lots and mineral-balanced spring water.
        </p>

        {/* Elegant Horizontal Rows Menu */}
        <div className="space-y-3">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group flex items-center justify-between p-5 sm:p-6 rounded-2xl glass-espresso border border-[#C88A58]/15 backdrop-blur-md transition-all duration-300 hover:border-[#C88A58]/50 hover:bg-[#1A110D]/85 cursor-pointer shadow-md"
            >
              {/* Left Item Details */}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wider text-[#F3EFEA] group-hover:text-[#E2A66C] transition-colors">
                    {item.name}
                  </h3>
                  {item.featured && (
                    <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#C88A58]/20 text-[#E2A66C] border border-[#C88A58]/30">
                      HOUSE SPECIALTY
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#A8988B] font-light">
                  {item.description}
                </p>
              </div>

              {/* Right Price & Add Plus Indicator */}
              <div className="flex items-center space-x-4 pl-4 shrink-0">
                <div className="text-right">
                  <span className="font-display text-2xl sm:text-3xl font-light text-[#E2A66C]">
                    ${item.price}
                  </span>
                </div>
                <div className="p-2 rounded-full border border-[#C88A58]/20 bg-[#160E0A] text-[#C88A58] group-hover:bg-[#C88A58] group-hover:text-[#140D0A] transition-all">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
