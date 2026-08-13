import React, { useState } from 'react';
import { X, Copy, Check, Share2, Code, Send } from 'lucide-react';

export default function ShareModal({ artwork, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!artwork) return null;

  const shareUrl = `${window.location.origin}/#artwork-${artwork.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onShowToast(`Link copied to clipboard! 🔗`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 120 }}>
      <div
        className="drawer-content-right"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '420px', height: 'auto', maxHeight: '90vh', margin: 'auto 0', borderRadius: '24px 0 0 24px' }}
      >
        <div className="drawer-header">
          <div className="flex items-center gap-2 font-bold text-white">
            <Share2 size={18} className="text-cyan-400" />
            <span>Share Masterpiece</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body p-6 flex flex-col gap-6">
          {/* Artwork Card Thumbnail Preview */}
          <div className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/10 items-center">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-16 h-16 object-cover rounded-xl border border-white/10"
            />
            <div>
              <h4 className="font-serif text-sm font-bold text-white">
                {artwork.title}
              </h4>
              <p className="text-xs text-amber-400 font-medium">
                {artwork.artist}
              </p>
              <p className="text-[11px] text-slate-400">
                {artwork.museum}
              </p>
            </div>
          </div>

          {/* Direct Copy Link Field */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Send via
            </label>
            <div className="grid grid-cols-3 gap-3 text-center">
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=Check out ${artwork.title} by ${artwork.artist} on Scrolls!&url=${encodeURIComponent(shareUrl)}`, '_blank');
                }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors flex flex-col items-center gap-1"
              >
                <span>𝕏 Twitter</span>
              </button>
              <button
                onClick={() => {
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${artwork.title} by ${artwork.artist}!`)}`, '_blank');
                }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors flex flex-col items-center gap-1"
              >
                <span>✈ Telegram</span>
              </button>
              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${artwork.title} by ${artwork.artist}: ${shareUrl}`)}`, '_blank');
                }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors flex flex-col items-center gap-1"
              >
                <span>💬 WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
