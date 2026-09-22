import { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';

interface ContactModalProps {
  type: 'contact' | 'location';
  onClose: () => void;
}

export default function ContactModal({ type, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#140D09] border border-[#C88A58]/40 rounded-3xl p-6 sm:p-8 text-[#F3EFEA] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A69485] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'location' ? (
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-1">
              VISIT OUR SANCTUARY
            </div>
            <h3 className="font-display text-3xl font-bold tracking-wider text-[#F3EFEA] mb-6">
              AURELIA COFFEE HOUSE
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-[#1A120D] border border-white/5">
                <MapPin className="w-5 h-5 text-[#E2A66C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-mono text-[#F3EFEA] font-semibold mb-0.5">LOCATION</div>
                  <div className="text-[#A8988B] leading-relaxed">
                    Via dei Tornabuoni 42 / Grand Boulevard District <br />
                    Firenze, FI 50123
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-[#1A120D] border border-white/5">
                <Clock className="w-5 h-5 text-[#E2A66C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-mono text-[#F3EFEA] font-semibold mb-0.5">HOURS OF RITUAL</div>
                  <div className="text-[#A8988B] leading-relaxed">
                    Monday — Friday: 07:00 — 22:00 <br />
                    Saturday & Sunday: 08:00 — 23:00
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-[#1A120D] border border-white/5">
                <Phone className="w-5 h-5 text-[#E2A66C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-mono text-[#F3EFEA] font-semibold mb-0.5">DIRECT LINE</div>
                  <div className="text-[#A8988B]">+39 (055) 842-1980</div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
            >
              CLOSE DOSSIER
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C88A58] uppercase mb-1">
              CONCIERGE & ROASTERY
            </div>
            <h3 className="font-display text-3xl font-bold tracking-wider text-[#F3EFEA] mb-4">
              GET IN TOUCH
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1B3824] border border-[#2E7D47] mx-auto flex items-center justify-center text-[#4ADE80]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl text-[#F3EFEA]">Message Received</h4>
                <p className="text-xs text-[#A8988B] max-w-xs mx-auto">
                  Our head roaster will respond directly to your correspondence within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 rounded-full bg-[#C88A58] text-[#140D0A] text-xs font-mono font-bold tracking-wider"
                >
                  RETURN TO EXPERIENCE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#8A796D] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A120D] border border-white/10 text-sm text-[#F3EFEA] focus:outline-none focus:border-[#C88A58]"
                    placeholder="E.g., Elena Vance"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8A796D] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A120D] border border-white/10 text-sm text-[#F3EFEA] focus:outline-none focus:border-[#C88A58]"
                    placeholder="elena@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8A796D] uppercase mb-1">
                    Inquiry / Tasting Request
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A120D] border border-white/10 text-sm text-[#F3EFEA] focus:outline-none focus:border-[#C88A58] resize-none"
                    placeholder="Private cupping sessions, bean allocations, or general inquiries..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
