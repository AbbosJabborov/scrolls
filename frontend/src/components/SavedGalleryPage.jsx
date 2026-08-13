import React from 'react';
import { Bookmark, Trash2, ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function SavedGalleryPage({
  savedArtworks,
  onSelectArtwork,
  onRemoveSave,
  onGoToDiscover
}) {
  return (
    <div className="w-full h-full min-h-screen bg-[#121212] text-[#F9F7F2] pt-20 pb-28 px-4 md:px-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Curatorial Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#c5a059] font-label-caps text-xs tracking-widest font-semibold mb-2">
              <Sparkles size={16} />
              <span>PERSONAL EXHIBITION SPACE</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              My Museum Collection
            </h1>
            <p className="font-sans text-xs md:text-sm text-white/60 mt-1 max-w-xl">
              Your privately curated archive of world-renowned fine art paintings and masterpieces.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-white/5 border border-white/15 rounded-full text-xs font-label-caps text-[#c5a059] tracking-wider font-semibold">
              {savedArtworks.length} {savedArtworks.length === 1 ? 'MASTERPIECE' : 'MASTERPIECES'} SAVED
            </span>
          </div>
        </div>

        {/* Saved Gallery Grid */}
        {savedArtworks.length === 0 ? (
          <div className="text-center py-24 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center mx-auto text-[#c5a059]">
              <Bookmark size={32} fill="#c5a059" />
            </div>
            <h2 className="font-serif text-xl text-white font-normal">Your Exhibition is Empty</h2>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
              Tap the bookmark icon on any artwork reel to curate your personal gallery.
            </p>
            <button
              type="button"
              onClick={onGoToDiscover}
              className="mt-4 px-6 py-3 bg-[#c5a059] hover:bg-[#ffdea5] text-black font-label-caps text-xs font-bold tracking-widest rounded-xl transition-all flex items-center gap-2 mx-auto cursor-pointer border-0 shadow-lg"
            >
              <Compass size={16} />
              <span>DISCOVER MASTERPIECES</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedArtworks.map((work) => (
              <div
                key={work.id}
                className="bg-[#1a1a1a] border border-white/15 rounded-2xl overflow-hidden hover:border-[#c5a059]/60 transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                {/* Framed Artwork Display */}
                <div
                  className="relative aspect-[4/5] bg-black overflow-hidden cursor-pointer p-3 flex items-center justify-center"
                  onClick={() => onSelectArtwork(work.id)}
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-[#ffdea5] font-label-caps tracking-wider flex items-center gap-1 font-semibold">
                      <span>OPEN REEL</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Artwork Meta */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-label-caps text-[#c5a059] tracking-widest block uppercase mb-1">
                      {work.category || 'Fine Art Painting'}
                    </span>
                    <h3
                      className="font-serif text-lg text-white font-normal line-clamp-1 cursor-pointer hover:text-[#c5a059] transition-colors"
                      onClick={() => onSelectArtwork(work.id)}
                    >
                      {work.title}
                    </h3>
                    <p className="font-sans text-xs text-white/70 mt-1">
                      {work.artist} ({work.year})
                    </p>
                    <p className="font-sans text-[11px] text-white/40 truncate mt-1 italic">
                      {work.museum}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectArtwork(work.id)}
                      className="text-xs text-white/80 hover:text-white font-label-caps tracking-wider flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                    >
                      <span>VIEW REEL</span>
                      <ArrowRight size={12} className="text-[#c5a059]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveSave(work.id)}
                      className="p-2 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors bg-transparent border-0 cursor-pointer"
                      title="Remove from saved exhibition"
                    >
                      <Trash2 size={16} />
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
