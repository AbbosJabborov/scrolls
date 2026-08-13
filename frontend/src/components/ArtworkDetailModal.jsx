import React from 'react';
import { Bookmark, Share2, ArrowLeft, Star, Info, BookOpen } from 'lucide-react';

export default function ArtworkDetailModal({ artwork, onClose, onToggleLike, onToggleSave, isLiked, isSaved }) {
  if (!artwork) return null;

  return (
    <div className="modal-overlay-ivory z-50 flex justify-center items-center" onClick={onClose}>
      <div
        className="modal-content-ivory w-full max-w-3xl h-full max-h-[95vh] overflow-y-auto bg-[#F9F7F2] text-[#1c1b1b] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Navigation */}
        <div className="sticky top-0 z-30 flex justify-between items-center px-6 py-4 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#E5E1DA]">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-black hover:text-[#c5a059] font-label-caps text-xs font-semibold tracking-widest transition-colors cursor-pointer border-0 bg-transparent"
          >
            <ArrowLeft size={18} />
            <span>BACK TO FEED</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleSave(artwork.id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isSaved ? 'bg-amber-100 border-[#c5a059] text-amber-900' : 'border-[#E5E1DA] text-black hover:bg-black/5'
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
              className="p-2.5 rounded-full border border-[#E5E1DA] text-black hover:bg-black/5 cursor-pointer bg-transparent"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 md:p-10 space-y-8 flex-1">
          {/* Framed Image Container */}
          <div className="bg-[#121212] p-4 rounded-xl shadow-lg border border-[#E5E1DA] text-center">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-[65vh] object-contain mx-auto rounded"
            />
            <div className="mt-3 text-right">
              <span className="font-label-caps text-[11px] text-[#86847e] tracking-widest">
                {artwork.artist.toUpperCase()}, {artwork.year}
              </span>
            </div>
          </div>

          {/* Title & Curatorial Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-black/5 border border-[#E5E1DA] text-[11px] font-label-caps tracking-wider text-[#444748]">
                {artwork.category || 'Fine Art Painting'}
              </span>
              <span className="px-3 py-1 bg-black/5 border border-[#E5E1DA] text-[11px] font-label-caps tracking-wider text-[#444748]">
                PUBLIC DOMAIN / CC0
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-black leading-tight tracking-normal font-normal">
              {artwork.title}
            </h1>
            <p className="font-sans text-sm text-[#86847e] italic">
              Masterpiece from {artwork.museum || 'Art Institute of Chicago'}
            </p>
          </div>

          {/* Quick Specs 4-Column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-white border border-[#E5E1DA] rounded-xl text-xs">
            <div>
              <p className="font-label-caps text-[#86847e] text-[10px] tracking-wider mb-1">ARTIST</p>
              <p className="font-sans font-semibold text-black text-sm">{artwork.artist}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#86847e] text-[10px] tracking-wider mb-1">YEAR</p>
              <p className="font-sans font-semibold text-black text-sm">{artwork.year}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#86847e] text-[10px] tracking-wider mb-1">MEDIUM</p>
              <p className="font-sans font-semibold text-black text-sm">{artwork.medium}</p>
            </div>
            <div>
              <p className="font-label-caps text-[#86847e] text-[10px] tracking-wider mb-1">LOCATION</p>
              <p className="font-sans font-semibold text-black text-sm">{artwork.location || artwork.museum}</p>
            </div>
          </div>

          {/* The Story Section */}
          <section className="space-y-3 bg-white p-6 rounded-xl border border-[#E5E1DA]">
            <h2 className="font-serif text-2xl text-black flex items-center gap-2">
              <BookOpen size={20} className="text-[#c5a059]" />
              <span>The Story</span>
            </h2>
            <p className="font-sans text-sm text-[#444748] leading-relaxed">
              {artwork.fullDescription || artwork.shortDescription}
            </p>
          </section>

          {/* Why is this famous? Highlight Box */}
          <section className="p-6 bg-[#FAF7F0] border-l-4 border-[#c5a059] rounded-r-xl border border-[#E5E1DA] space-y-3">
            <h2 className="font-serif text-xl text-black flex items-center gap-2">
              <Star size={20} className="text-[#c5a059]" fill="#c5a059" />
              <span>Why is this famous?</span>
            </h2>
            <p className="font-sans text-sm text-[#444748] leading-relaxed">
              {artwork.title} is renowned for its iconic composition, subtle light play, and historical significance within the {artwork.category} movement. Its timeless beauty continues to inspire artists worldwide.
            </p>
          </section>

          {/* Technical Details */}
          <section className="space-y-3 bg-white p-6 rounded-xl border border-[#E5E1DA]">
            <h2 className="font-serif text-xl text-black flex items-center gap-2">
              <Info size={19} className="text-[#86847e]" />
              <span>Technical Details</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#444748]">
              <div>
                <span className="font-semibold text-black block">Dimensions:</span>
                <span>{artwork.dimensions || 'Standard Gallery Canvas'}</span>
              </div>
              <div>
                <span className="font-semibold text-black block">License:</span>
                <span>{artwork.license || 'Public Domain / CC0'}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
