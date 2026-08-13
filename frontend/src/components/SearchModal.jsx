import React, { useState } from 'react';
import { X, Search, MapPin, ArrowRight } from 'lucide-react';

export default function SearchModal({ artworks, onClose, onSelectArtwork }) {
  const [query, setQuery] = useState('');

  const filtered = artworks.filter((art) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      art.title.toLowerCase().includes(q) ||
      art.artist.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.museum.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 120 }}>
      <div className="drawer-content-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2 font-bold text-white">
            <Search size={18} className="text-amber-400" />
            <span>Search Artworks & Artists</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Search Input */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search by artist, title, museum, style..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white placeholder-slate-400 outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="drawer-body">
          {filtered.length === 0 ? (
            <div className="text-center text-slate-400 py-12">
              <p>No artworks found matching "{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filtered.map((work) => (
                <div
                  key={work.id}
                  onClick={() => {
                    onSelectArtwork(work.id);
                    onClose();
                  }}
                  className="flex gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white truncate">
                        {work.title}
                      </h4>
                      <p className="text-xs text-amber-400 font-medium">
                        {work.artist} ({work.year})
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {work.museum}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 group-hover:text-amber-400">
                      View reel <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
