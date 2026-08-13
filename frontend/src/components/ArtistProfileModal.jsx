import React from 'react';
import { X, Check, Plus, Palette, Calendar, Globe, Award } from 'lucide-react';

export default function ArtistProfileModal({
  artistName,
  artworks,
  isFollowing,
  onToggleFollow,
  onClose,
  onSelectArtwork
}) {
  if (!artistName) return null;

  // Find sample artwork for artist info
  const artistWorks = artworks.filter((a) => a.artist === artistName);
  const sampleWork = artistWorks[0] || artworks[0];

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 110 }}>
      <div className="drawer-content-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Artist Spotlight
          </span>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {/* Top Profile Banner */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
            <div className="relative mb-3">
              <img
                src={sampleWork.artistPhoto}
                alt={artistName}
                className="w-24 h-24 rounded-full object-cover border-4 border-amber-500/50 shadow-2xl"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-white text-xs font-bold" title="Verified Master">
                ✓
              </span>
            </div>

            <h2 className="font-display text-xl font-bold text-white mb-1">
              {artistName}
            </h2>
            <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
              <span>{sampleWork.birthDeath}</span>
              <span>•</span>
              <span>{sampleWork.nationality}</span>
            </p>

            {/* Follow Action Button */}
            <button
              onClick={() => onToggleFollow(artistName)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                isFollowing
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/40'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check size={16} />
                  <span>Following Artist</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Follow Artist</span>
                </>
              )}
            </button>
          </div>

          {/* Biography Section */}
          <div className="py-6 border-b border-white/10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Biography & Legacy
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {sampleWork.artistBio}
            </p>
          </div>

          {/* Famous Masterpieces Grid */}
          <div className="py-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Masterpieces in Feed ({artistWorks.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {artistWorks.map((work) => (
                <div
                  key={work.id}
                  onClick={() => {
                    onSelectArtwork(work.id);
                    onClose();
                  }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-black aspect-square"
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 p-2 flex flex-col justify-end">
                    <span className="font-serif text-xs font-bold text-white truncate">
                      {work.title}
                    </span>
                    <span className="text-[10px] text-amber-400">
                      {work.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
