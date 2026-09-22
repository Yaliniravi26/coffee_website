import { Coffee, Clock, Heart } from 'lucide-react';

export default function TheHouseSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full flex justify-end">
        {/* Aligned towards the right side so 3D seating area shines on the left */}
        <div className="max-w-xl text-left bg-[#100A08]/75 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#C88A58]/20 shadow-2xl">
          {/* Eyebrow */}
          <div className="text-xs font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-4">
            03 · THE HOUSE
          </div>

          {/* Heading */}
          <h2 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-[#F3EFEA] leading-[1.1] mb-6">
            A PLACE <br />
            <span className="font-serif italic font-normal text-[#E2A66C]">
              TO SLOW DOWN.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#C2B2A3] font-light leading-relaxed mb-8">
            Warm light, quiet corners, and carefully made coffee for unhurried moments.
          </p>

          {/* Subtle architectural notes */}
          <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono text-[#A8988B]">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58]" />
              <span>NATURAL TIMBER ACOUSTICS FOR GENTLE CONVERSATION</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58]" />
              <span>HANDMADE STONEWARE WARMED TO OPTIMAL DEGREE</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58]" />
              <span>NO RUSHED SESSIONS · OPEN TILL THE LATE EMBERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
