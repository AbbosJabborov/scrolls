import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

export default function ShareModal({ artwork, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!artwork) return null;

  const shareUrl = `${window.location.origin}/#artwork-${artwork.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end flex-col"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-auto bg-[#181818] text-[#F9F7F2] rounded-t-3xl border-t border-white/15 shadow-2xl p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto -mt-2 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-[#c5a059]" />
            <h3 className="font-label-caps text-sm tracking-wider font-semibold text-white">
              Share Masterpiece
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white bg-transparent border-0 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Artwork Card Thumbnail Preview */}
        <div className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/10 items-center">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-14 h-14 object-cover rounded-xl border border-white/10"
          />
          <div>
            <h4 className="font-serif text-sm font-bold text-white">
              {artwork.title}
            </h4>
            <p className="text-xs text-[#c5a059] font-medium">
              {artwork.artist}
            </p>
            <p className="text-[11px] text-white/50">
              {artwork.museum}
            </p>
          </div>
        </div>

        {/* Copy Link Input & Button */}
        <div>
          <label className="text-[11px] font-label-caps text-white/60 block mb-2">
            Direct Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-[#c5a059] text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-[#ffdea5] transition-colors border-0 cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Social Options */}
        <div className="grid grid-cols-3 gap-3 text-center pt-2">
          <button
            type="button"
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=Check out ${artwork.title} by ${artwork.artist} on Scrolls!&url=${encodeURIComponent(shareUrl)}`, '_blank');
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors border-0 cursor-pointer"
          >
            <span>𝕏 Twitter</span>
          </button>
          <button
            type="button"
            onClick={() => {
              window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${artwork.title} by ${artwork.artist}!`)}`, '_blank');
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors border-0 cursor-pointer"
          >
            <span>✈ Telegram</span>
          </button>
          <button
            type="button"
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${artwork.title} by ${artwork.artist}: ${shareUrl}`)}`, '_blank');
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors border-0 cursor-pointer"
          >
            <span>💬 WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
