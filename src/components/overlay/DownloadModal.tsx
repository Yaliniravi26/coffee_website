import { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Archive, Terminal, FileCode2 } from 'lucide-react';

interface DownloadModalProps {
  onClose: () => void;
}

export default function DownloadModal({ onClose }: DownloadModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/aurelia-coffee-house.zip`
    : '/aurelia-coffee-house.zip';

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/aurelia-coffee-house.zip');
      if (!response.ok) throw new Error('Network error');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = 'aurelia-coffee-house.zip';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
        setDownloading(false);
        setDownloaded(true);
      }, 500);
    } catch {
      // Fallback: direct window download
      const a = document.createElement('a');
      a.href = '/aurelia-coffee-house.zip';
      a.download = 'aurelia-coffee-house.zip';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
      setDownloaded(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#140D09] border border-[#C88A58]/40 rounded-3xl p-6 sm:p-8 text-[#F3EFEA] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-[#C88A58]/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A69485] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 mb-6">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#C88A58] uppercase">
            SOURCE CODE PACKAGE
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#F3EFEA]">
            Download Project ZIP
          </h3>
          <p className="text-xs text-[#A8988B] leading-relaxed">
            Full complete source code for <span className="text-[#E2A66C]">Aurelia Coffee House</span> including 3D scenes, shaders, overlays, and audio synth.
          </p>
        </div>

        {/* Package info */}
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#1A120D] border border-white/5 mb-6">
          <div className="p-2.5 rounded-xl bg-[#C88A58]/15 text-[#E2A66C]">
            <Archive className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-mono text-[#F3EFEA] font-semibold">aurelia-coffee-house.zip</div>
            <div className="text-[#8A796D] text-[11px] font-mono mt-0.5">80 KB · Clean bundle (TypeScript + React + Three.js)</div>
          </div>
        </div>

        {/* Action 1: Direct Download Button */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center space-x-2.5 py-3.5 rounded-2xl bg-[#C88A58] hover:bg-[#D99B6A] text-[#140D0A] font-mono text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-[#140D0A]" />
                <span>DOWNLOAD STARTED!</span>
              </>
            ) : downloading ? (
              <span>PREPARING DOWNLOAD...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DOWNLOAD ZIP DIRECTLY</span>
              </>
            )}
          </button>

          {/* Action 2: Open in New Tab (Bypasses any iframe download sandbox restrictions) */}
          <a
            href="/aurelia-coffee-house.zip"
            target="_blank"
            rel="noopener noreferrer"
            download="aurelia-coffee-house.zip"
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-[#1A120D] hover:bg-[#251A13] border border-white/10 hover:border-[#C88A58]/40 text-[#E2A66C] font-mono text-xs tracking-wider transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>OPEN & DOWNLOAD IN NEW TAB</span>
          </a>
        </div>

        {/* Action 3: Copy direct URL */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A796D]">
            <span>DIRECT LINK:</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1 text-[#E2A66C] hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY LINK'}</span>
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-[#0F0A07] border border-white/5 font-mono text-[11px] text-[#A8988B] truncate select-all">
            {fileUrl}
          </div>
        </div>

        {/* Quick Instructions */}
        <div className="mt-5 p-3 rounded-xl bg-[#17100B] border border-[#C88A58]/15 text-[11px] text-[#9E8E81] space-y-1">
          <div className="font-mono text-[#E2A66C] text-[10px] font-semibold tracking-wider uppercase">
            HOW TO RUN LOCALLY:
          </div>
          <div className="font-mono text-[10px] text-[#C2B2A3]">
            1. Extract ZIP &nbsp;→&nbsp; 2. <code className="text-[#E2A66C]">npm install</code> &nbsp;→&nbsp; 3. <code className="text-[#E2A66C]">npm run dev</code>
          </div>
        </div>
      </div>
    </div>
  );
}
