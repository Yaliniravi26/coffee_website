import { CoffeeStyle, MenuItem } from '../../types';
import { X, Sparkles, Check, Flame, Thermometer } from 'lucide-react';
import { useState } from 'react';

interface CoffeeDetailModalProps {
  item: CoffeeStyle | MenuItem | null;
  onClose: () => void;
}

export default function CoffeeDetailModal({ item, onClose }: CoffeeDetailModalProps) {
  const [reserved, setReserved] = useState(false);

  if (!item) return null;

  const isStyle = 'roastLevel' in item;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#140D09] border border-[#C88A58]/40 rounded-3xl p-6 sm:p-8 text-[#F3EFEA] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#C88A58]/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A69485] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#C88A58] uppercase">
            AURELIA ROASTERY DOSSIER
          </div>
          <h3 className="font-display text-3xl font-bold tracking-wider text-[#F3EFEA]">
            {item.name}
          </h3>
          {'tagline' in item && (
            <p className="font-serif italic text-base text-[#D49664]">
              {item.tagline}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#C2B2A3] leading-relaxed font-light mb-6">
          {item.description}
        </p>

        {/* Specifications Grid */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#1A120D] border border-white/5 text-xs font-mono mb-6">
          {isStyle ? (
            <>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span className="flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E2A66C]" />
                  <span>ROAST LEVEL:</span>
                </span>
                <span className="text-[#F3EFEA] font-semibold">{(item as CoffeeStyle).roastLevel}</span>
              </div>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span className="flex items-center space-x-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-[#E2A66C]" />
                  <span>CALIBRATION:</span>
                </span>
                <span className="text-[#F3EFEA]">{(item as CoffeeStyle).temperature}</span>
              </div>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span>TERROIR:</span>
                <span className="text-[#D49664]">{(item as CoffeeStyle).origin}</span>
              </div>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span>BODY & PROFILE:</span>
                <span className="text-[#F3EFEA]">{(item as CoffeeStyle).body}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span>ORIGIN:</span>
                <span className="text-[#D49664]">{(item as MenuItem).origin}</span>
              </div>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span>TASTE NOTES:</span>
                <span className="text-[#F3EFEA]">{(item as MenuItem).notes}</span>
              </div>
              <div className="flex items-center justify-between text-[#8A796D]">
                <span>CUP PRICE:</span>
                <span className="text-lg font-display text-[#E2A66C]">${(item as MenuItem).price}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div>
          {reserved ? (
            <div className="w-full py-3.5 rounded-full bg-[#1B3824] border border-[#2E7D47] text-[#C2DEC8] text-xs font-mono font-bold tracking-widest text-center flex items-center justify-center space-x-2">
              <Check className="w-4 h-4 text-[#4ADE80]" />
              <span>CUP TASTING PREPARED · SEE BARISTA</span>
            </div>
          ) : (
            <button
              onClick={() => setReserved(true)}
              className="w-full py-3.5 rounded-full bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>REQUEST TASTING AT COUNTER</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
