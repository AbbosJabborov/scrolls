import React from 'react';
import { Bookmark, Trash2, ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function SavedGalleryPage({
  savedArtworks,
  onSelectArtwork,
  onRemoveSave,
  onGoToDiscover
}) {
  return (
    <div className="w-full h-full min-h-screen bg-[#121212] text-[#F9F7F2] pt-20 pb-28 px-3 md:px-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Curatorial Header */}
        <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#c5a059] font-label-caps text-[11px] tracking-widest font-semibold mb-1">
              <Sparkles size={14} />
              <span>PERSONAL EXHIBITION SPACE</span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl text-white font-normal leading-tight">
              My Museum Collection
            </h1>
            <p className="font-sans text-xs text-white/60 mt-0.5 max-w-xl">
              Your privately curated archive of world-renowned fine art paintings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-[11px] font-label-caps text-[#c5a059] tracking-wider font-semibold">
              {savedArtworks.length} {savedArtworks.length === 1 ? 'ARTWORK' : 'ARTWORKS'} SAVED
            </span>
          </div>
        </div>

        {/* Saved Gallery Grid (3 per row on mobile!) */}
        {savedArtworks.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center mx-auto text-[#c5a059]">
              <Bookmark size={28} fill="#c5a059" />
            </div>
            <h2 className="font-serif text-lg text-white font-normal">Your Exhibition is Empty</h2>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
              Tap the bookmark icon on any artwork reel to curate your personal gallery.
            </p>
            <button
              type="button"
              onClick={onGoToDiscover}
              className="mt-2 px-5 py-2.5 bg-[#c5a059] hover:bg-[#ffdea5] text-black font-label-caps text-xs font-bold tracking-widest rounded-xl transition-all flex items-center gap-2 mx-auto cursor-pointer border-0 shadow-lg"
            >
              <Compass size={16} />
              <span>DISCOVER MASTERPIECES</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {savedArtworks.map((work) => (
              <div
                key={work.id}
                className="bg-[#1a1a1a] border border-white/15 rounded-xl overflow-hidden hover:border-[#c5a059]/60 transition-all duration-300 group flex flex-col justify-between shadow-lg"
              >
                {/* Framed Artwork Display */}
                <div
                  className="relative aspect-square bg-black overflow-hidden cursor-pointer p-1.5 flex items-center justify-center"
                  onClick={() => onSelectArtwork(work.id)}
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                    <span className="text-[10px] text-white font-label-caps tracking-wider font-semibold bg-black/60 px-2 py-1 rounded">
                      VIEW
                    </span>
                  </div>
                </div>

                {/* Compact Artwork Meta */}
                <div className="p-2 space-y-1 flex-1 flex flex-col justify-between bg-[#161616]">
                  <div>
                    <h3
                      className="font-serif text-xs text-white font-normal line-clamp-1 cursor-pointer hover:text-[#c5a059] transition-colors leading-tight"
                      onClick={() => onSelectArtwork(work.id)}
                      title={work.title}
                    >
                      {work.title}
                    </h3>
                    <p className="font-sans text-[10px] text-[#c5a059] truncate mt-0.5">
                      {work.artist}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-1 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectArtwork(work.id)}
                      className="text-[10px] text-white/70 hover:text-white font-label-caps tracking-wider flex items-center gap-0.5 bg-transparent border-0 cursor-pointer"
                    >
                      <span>REEL</span>
                      <ArrowRight size={10} className="text-[#c5a059]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveSave(work.id)}
                      className="p-1 text-white/40 hover:text-rose-400 rounded transition-colors bg-transparent border-0 cursor-pointer"
                      title="Remove from saved exhibition"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
