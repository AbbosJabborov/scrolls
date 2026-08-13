import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

export default function SearchModal({ artworks, onClose, onSelectArtwork }) {
  const [query, setQuery] = useState('');

  const filtered = artworks.filter((art) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      art.title.toLowerCase().includes(q) ||
      art.artist.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.museum.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-4xl bg-[#161616] text-[#F9F7F2] border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#1f1f1f]">
          <span className="font-serif text-lg text-white font-medium tracking-wide">SCROLLS DISCOVER</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-transparent border-0 cursor-pointer transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Search Input Bar */}
          <div className="relative mb-8 border-b border-white/20 group focus-within:border-[#c5a059] transition-colors">
            <Search size={20} className="absolute left-0 bottom-3 text-white/50" />
            <input
              type="text"
              autoFocus
              placeholder="Search eras, artists, or collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none pl-8 pr-4 py-3 font-label-caps text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          {/* Search Results */}
          <div>
            <h2 className="font-label-caps text-xs text-[#c5a059] tracking-widest mb-4">
              {query ? `RESULTS FOR "${query.toUpperCase()}"` : 'ALL MASTERPIECES'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((work) => (
                <div
                  key={work.id}
                  onClick={() => {
                    onSelectArtwork(work.id);
                    onClose();
                  }}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4 cursor-pointer hover:border-[#c5a059]/60 hover:bg-white/10 transition-all group"
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-14 h-16 object-cover rounded flex-shrink-0 bg-black"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-white text-sm truncate group-hover:text-[#c5a059] transition-colors">
                      {work.title}
                    </h3>
                    <p className="font-sans text-xs text-[#c5a059] font-medium mt-0.5">
                      {work.artist} ({work.year})
                    </p>
                    <p className="font-sans text-[11px] text-white/50 truncate">
                      {work.museum}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/40 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
