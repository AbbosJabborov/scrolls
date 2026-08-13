import React from 'react';
import { X, ExternalLink, MapPin, Calendar, Layers, Maximize2, ShieldCheck, Heart, Bookmark } from 'lucide-react';

export default function ArtworkDetailModal({ artwork, onClose, onToggleLike, onToggleSave, isLiked, isSaved }) {
  if (!artwork) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 110 }}>
      <div
        className="drawer-content-right"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        {/* Modal Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold">🏛️ Curatorial Spotlight</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="drawer-body" style={{ padding: '24px' }}>
          {/* High-res Image Preview */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-black border border-white/10 group">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-[360px] object-contain mx-auto"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center gap-1 border border-white/10">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Public Domain</span>
            </div>
          </div>

          {/* Title & Artist Header */}
          <div className="mb-6">
            <h1 className="font-serif text-2xl font-bold text-white mb-1">
              {artwork.title}
            </h1>
            <p className="text-lg text-amber-400 font-semibold mb-2">
              By {artwork.artist} ({artwork.year})
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                {artwork.category}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10 flex items-center gap-1">
                <MapPin size={12} /> {artwork.museum}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                {artwork.location}
              </span>
            </div>
          </div>

          {/* Metadata Specs Table */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 rounded-xl border border-white/10 mb-6 text-sm">
            <div>
              <span className="text-slate-400 text-xs block">Medium</span>
              <span className="text-slate-200 font-medium">{artwork.medium}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Dimensions</span>
              <span className="text-slate-200 font-medium">{artwork.dimensions || 'N/A'}</span>
            </div>
          </div>

          {/* Full Curatorial Narrative */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
              Curatorial Analysis
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">
              {artwork.fullDescription}
            </p>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
            <h4 className="text-xs font-semibold text-slate-400">External References</h4>
            <div className="flex flex-wrap gap-3">
              {artwork.sourceUrl && (
                <a
                  href={artwork.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20"
                >
                  <span>Wikipedia Entry</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {artwork.museumUrl && (
                <a
                  href={artwork.museumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
                >
                  <span>Official Museum Record</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/90 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => onToggleLike(artwork.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isLiked
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart size={14} fill={isLiked ? '#f43f5e' : 'none'} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              onClick={() => onToggleSave(artwork.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isSaved
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Bookmark size={14} fill={isSaved ? '#f59e0b' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-slate-200 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
