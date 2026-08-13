import React from 'react';
import { X, ExternalLink, Star, Bookmark, Share2, ArrowLeft } from 'lucide-react';

export default function ArtworkDetailModal({ artwork, onClose, onToggleLike, onToggleSave, isLiked, isSaved }) {
  if (!artwork) return null;

  return (
    <div className="modal-overlay-ivory" onClick={onClose}>
      <div
        className="modal-content-ivory overflow-y-auto max-h-[92vh] rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Navigation */}
        <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#E5E1DA]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-black hover:opacity-75 font-label-caps text-xs transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to feed</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleSave(artwork.id)}
              className={`p-2 rounded-full border transition-colors ${
                isSaved ? 'bg-amber-100 border-amber-500 text-amber-800' : 'border-[#E5E1DA] text-black hover:bg-black/5'
              }`}
            >
              <Bookmark size={18} fill={isSaved ? '#c5a059' : 'none'} />
            </button>
            <button className="p-2 rounded-full border border-[#E5E1DA] text-black hover:bg-black/5">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {/* Main Hero Artwork Frame */}
          <div className="editorial-frame mb-10 bg-black/5">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-[70vh] object-contain mx-auto"
            />
            <div className="mt-3 text-right">
              <span className="font-label-caps text-[11px] text-[#444748]">
                {artwork.artist}, {artwork.year}
              </span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="ghost-chip">{artwork.category}</span>
              <span className="ghost-chip">Public Domain / CC0</span>
            </div>
            <h1 className="font-display-lg text-4xl md:text-5xl text-black mb-3 font-normal">
              {artwork.title}
            </h1>
            <p className="font-label-sm text-[#444748] italic mb-6">
              Masterpiece from {artwork.museum}
            </p>

            {/* Quick Specs 4-Column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-[#E5E1DA] text-sm">
              <div>
                <p className="font-label-caps text-[#444748] mb-1">Artist</p>
                <p className="font-label-sm font-semibold text-black">{artwork.artist}</p>
              </div>
              <div>
                <p className="font-label-caps text-[#444748] mb-1">Year</p>
                <p className="font-label-sm font-semibold text-black">{artwork.year}</p>
              </div>
              <div>
                <p className="font-label-caps text-[#444748] mb-1">Medium</p>
                <p className="font-label-sm font-semibold text-black">{artwork.medium}</p>
              </div>
              <div>
                <p className="font-label-caps text-[#444748] mb-1">Location</p>
                <p className="font-label-sm font-semibold text-black">{artwork.location || artwork.museum}</p>
              </div>
            </div>
          </div>

          {/* The Story Section */}
          <section className="mb-10">
            <h2 className="font-headline-md text-2xl text-black mb-4">The Story</h2>
            <div className="font-body-lg text-base text-[#444748] leading-relaxed space-y-4">
              <p>{artwork.fullDescription || artwork.shortDescription}</p>
            </div>
          </section>

          {/* Why is this famous? Highlight Box */}
          <section className="mb-10 relative p-6 md:p-8 bg-[#f7f3f2] border border-[#c5a059]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#c5a059]"></div>
            <h2 className="font-headline-md text-xl text-black mb-3 flex items-center gap-2">
              <Star size={20} className="text-[#c5a059]" fill="#c5a059" />
              <span>Why is this famous?</span>
            </h2>
            <p className="font-body-md text-sm text-[#444748] leading-relaxed">
              {artwork.title} is renowned for its iconic composition and historical significance within the {artwork.category} movement. Its timeless beauty continues to influence artists worldwide.
            </p>
          </section>

          {/* Technical Details Section */}
          <section className="mb-10">
            <h2 className="font-headline-md text-2xl text-black mb-4">Technical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#444748]">
              <div className="border-b border-[#E5E1DA] pb-3">
                <h3 className="font-title-lg text-base text-black mb-1">Materials</h3>
                <p>{artwork.medium}</p>
              </div>
              <div className="border-b border-[#E5E1DA] pb-3">
                <h3 className="font-title-lg text-base text-black mb-1">Dimensions</h3>
                <p>{artwork.dimensions || 'Standard Canvas'}</p>
              </div>
            </div>
          </section>

          {/* External References */}
          {artwork.sourceUrl && (
            <div className="pt-6 border-t border-[#E5E1DA] flex justify-between items-center">
              <a
                href={artwork.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label-caps text-xs text-black border-b border-black pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors"
              >
                <span>Read official museum archival record</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
