import React from 'react';
import { Bookmark, Share2, ArrowLeft, Star, Info, BookOpen } from 'lucide-react';

export default function ArtworkDetailModal({ artwork, onClose, onToggleLike, onToggleSave, isLiked, isSaved, themeMode = 'dark' }) {
  if (!artwork) return null;

  const isDay = themeMode === 'day';

  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center p-0 md:p-4 backdrop-blur-md ${
      isDay ? 'bg-black/40' : 'bg-black/75'
    }`} onClick={onClose}>
      <div
        className={`w-full max-w-3xl h-full md:h-auto max-h-[100vh] md:max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:rounded-2xl transition-colors ${
          isDay 
            ? 'bg-[#F9F7F2] text-[#1c1b1b]' 
            : 'bg-[#141414] text-[#e8e6e3] border border-white/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Navigation */}
        <div className={`sticky top-0 z-30 flex justify-between items-center px-6 py-4 backdrop-blur-md border-b ${
          isDay 
            ? 'bg-[#F9F7F2]/95 border-[#E5E1DA]' 
            : 'bg-[#141414]/95 border-white/10'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`flex items-center gap-2 text-xs font-semibold tracking-widest transition-colors cursor-pointer border-0 bg-transparent ${
              isDay ? 'text-black hover:text-[#c5a059]' : 'text-white hover:text-[#c5a059]'
            }`}
          >
            <ArrowLeft size={18} />
            <span>BACK TO FEED</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleSave(artwork.id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]' 
                  : isDay 
                    ? 'border-[#E5E1DA] text-black hover:bg-black/5' 
                    : 'border-white/15 text-white hover:bg-white/10'
              }`}
              title={isSaved ? 'Saved in My Museum' : 'Save Artwork'}
            >
              <Bookmark size={18} fill={isSaved ? '#c5a059' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: artwork.title, url: window.location.href });
                }
              }}
              className={`p-2.5 rounded-full border cursor-pointer bg-transparent ${
                isDay 
                  ? 'border-[#E5E1DA] text-black hover:bg-black/5' 
                  : 'border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 md:p-10 space-y-8 flex-1">
          {/* Framed Image Container */}
          <div className={`p-4 rounded-xl shadow-lg border text-center ${
            isDay 
              ? 'bg-[#121212] border-[#E5E1DA]' 
              : 'bg-[#0a0a0a] border-white/10'
          }`}>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-[65vh] object-contain mx-auto rounded"
            />
            <div className="mt-3 text-right">
              <span className="font-label-caps text-[11px] text-[#c5a059] tracking-widest">
                {(artwork.artist || '').toUpperCase()}, {artwork.year}
              </span>
            </div>
          </div>

          {/* Title & Curatorial Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 border text-[11px] font-label-caps tracking-wider ${
                isDay 
                  ? 'bg-black/5 border-[#E5E1DA] text-[#444748]' 
                  : 'bg-white/5 border-white/10 text-white/80'
              }`}>
                {artwork.category || 'Fine Art Painting'}
              </span>
              <span className={`px-3 py-1 border text-[11px] font-label-caps tracking-wider ${
                isDay 
                  ? 'bg-black/5 border-[#E5E1DA] text-[#444748]' 
                  : 'bg-white/5 border-white/10 text-white/80'
              }`}>
                PUBLIC DOMAIN / CC0
              </span>
            </div>

            <h1 className={`font-serif text-3xl md:text-5xl leading-tight tracking-normal font-normal ${
              isDay ? 'text-black' : 'text-white'
            }`}>
              {artwork.title}
            </h1>
            <p className="font-sans text-sm text-[#c5a059] italic">
              Artwork from {artwork.museum || 'Art Institute of Chicago'}
            </p>
          </div>

          {/* Quick Specs 4-Column Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-5 rounded-xl border text-xs ${
            isDay 
              ? 'bg-white border-[#E5E1DA]' 
              : 'bg-[#1c1c1c] border-white/10'
          }`}>
            <div>
              <p className="font-label-caps text-[#c5a059] text-[10px] tracking-wider mb-1">ARTIST</p>
              <p className={`font-sans font-semibold text-sm ${isDay ? 'text-black' : 'text-white'}`}>{artwork.artist}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#c5a059] text-[10px] tracking-wider mb-1">YEAR</p>
              <p className={`font-sans font-semibold text-sm ${isDay ? 'text-black' : 'text-white'}`}>{artwork.year}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#c5a059] text-[10px] tracking-wider mb-1">MEDIUM</p>
              <p className={`font-sans font-semibold text-sm ${isDay ? 'text-black' : 'text-white'}`}>{artwork.medium}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#c5a059] text-[10px] tracking-wider mb-1">LOCATION</p>
              <p className={`font-sans font-semibold text-sm ${isDay ? 'text-black' : 'text-white'}`}>{artwork.location || artwork.museum}</p>
            </div>
          </div>

          {/* Read More Section */}
          <section className={`space-y-3 p-6 rounded-xl border ${
            isDay 
              ? 'bg-white border-[#E5E1DA]' 
              : 'bg-[#1c1c1c] border-white/10'
          }`}>
            <h2 className={`font-serif text-2xl flex items-center gap-2 ${isDay ? 'text-black' : 'text-white'}`}>
              <BookOpen size={20} className="text-[#c5a059]" />
              <span>Read More</span>
            </h2>
            <p className={`font-sans text-sm leading-relaxed ${isDay ? 'text-[#444748]' : 'text-white/80'}`}>
              {artwork.fullDescription || artwork.shortDescription}
            </p>
          </section>

          {/* Why is this famous? Highlight Box */}
          <section className={`p-6 border-l-4 border-[#c5a059] rounded-r-xl border space-y-3 ${
            isDay 
              ? 'bg-[#FAF7F0] border-[#E5E1DA]' 
              : 'bg-[#1a1712] border-white/10'
          }`}>
            <h2 className={`font-serif text-xl flex items-center gap-2 ${isDay ? 'text-black' : 'text-white'}`}>
              <Star size={20} className="text-[#c5a059]" fill="#c5a059" />
              <span>Why is this famous?</span>
            </h2>
            <p className={`font-sans text-sm leading-relaxed ${isDay ? 'text-[#444748]' : 'text-white/80'}`}>
              {artwork.title} is renowned for its iconic composition, subtle light play, and historical significance within the {artwork.category} movement. Its timeless beauty continues to inspire artists worldwide.
            </p>
          </section>

          {/* Technical Details */}
          <section className={`space-y-3 p-6 rounded-xl border ${
            isDay 
              ? 'bg-white border-[#E5E1DA]' 
              : 'bg-[#1c1c1c] border-white/10'
          }`}>
            <h2 className={`font-serif text-xl flex items-center gap-2 ${isDay ? 'text-black' : 'text-white'}`}>
              <Info size={19} className="text-[#c5a059]" />
              <span>Technical Details</span>
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-xs ${isDay ? 'text-[#444748]' : 'text-white/80'}`}>
              <div>
                <span className={`font-semibold block ${isDay ? 'text-black' : 'text-white'}`}>Dimensions:</span>
                <span>{artwork.dimensions || 'Standard Gallery Canvas'}</span>
              </div>
              <div>
                <span className={`font-semibold block ${isDay ? 'text-black' : 'text-white'}`}>License:</span>
                <span>{artwork.license || 'Public Domain / CC0'}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
