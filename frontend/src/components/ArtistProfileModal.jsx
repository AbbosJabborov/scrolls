import React from 'react';
import { ArrowLeft, Check, Plus, Palette, BookOpen, Share2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-var-bg text-var-text animate-slide-in-right flex flex-col min-h-screen">
      {/* Top Navigation Header */}
      <div className="sticky top-0 z-30 bg-var-bg/95 backdrop-blur-md border-b border-current/10 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider opacity-85 hover:opacity-100 hover:text-[#c5a059] transition-all"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h1 className="font-serif font-bold text-sm tracking-wide truncate max-w-[200px]">
          {artistName}
        </h1>

        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: artistName,
                text: `Explore ${artistName}'s fine art masterpieces on Scrolls`,
                url: window.location.href
              }).catch(() => {});
            }
          }}
          className="p-1.5 rounded-full hover:bg-current/10 transition-colors opacity-80 hover:opacity-100"
          title="Share Artist Profile"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Hero Ambient Cover Banner */}
      <div className="h-44 w-full relative overflow-hidden bg-black/40">
        <img
          src={sampleWork.imageUrl}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover filter blur-md opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-var-bg/50 to-var-bg" />
      </div>

      {/* Profile Info Header */}
      <div className="relative -mt-16 flex flex-col items-center z-10 px-4 max-w-xl mx-auto w-full">
        {/* Avatar Circle */}
        <div className="relative">
          <img
            src={sampleWork.artistPhoto || '/artists/klimt.jpg'}
            alt={artistName}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#c5a059] shadow-2xl bg-black"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/artists/klimt.jpg';
            }}
          />
          <span
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#c5a059] border-2 border-[#121212] flex items-center justify-center text-black text-xs font-bold shadow-md"
            title="Verified Master Painter"
          >
            ✓
          </span>
        </div>

        {/* Artist Name & Lifespan */}
        <h2 className="font-serif text-2xl font-bold tracking-tight mt-3 text-center">
          {artistName}
        </h2>
        <p className="text-xs opacity-60 mt-1 font-light tracking-wide text-center">
          {sampleWork.birthDeath || '18th–19th Century'} · {sampleWork.nationality || 'Master Painter'}
        </p>

        {/* Clean Museum Stats Rail */}
        <div className="flex items-center justify-center space-x-8 my-4 py-3 border-y border-current/10 w-full max-w-sm">
          <div className="text-center">
            <p className="font-bold text-sm font-serif text-[#c5a059]">{artistWorks.length}</p>
            <p className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5">Masterpieces</p>
          </div>
          <div className="h-6 w-[1px] bg-current/10" />
          <div className="text-center max-w-[160px]">
            <p className="font-bold text-sm font-serif text-[#c5a059] truncate">
              {sampleWork.museum ? sampleWork.museum.split(' ')[0] : 'Gallery'}
            </p>
            <p className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5 truncate">Primary Museum</p>
          </div>
        </div>

        {/* Follow / Unfollow Action Button */}
        <button
          type="button"
          onClick={() => onToggleFollow(artistName)}
          className={`px-8 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all tracking-wider uppercase ${
            isFollowing
              ? 'bg-current/10 text-current border border-current/20 hover:bg-current/20'
              : 'bg-[#c5a059] text-black hover:bg-[#b08d46] shadow-[#c5a059]/25'
          }`}
        >
          {isFollowing ? (
            <>
              <Check size={16} />
              <span>Following</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Follow Artist</span>
            </>
          )}
        </button>
      </div>

      {/* Editorial Biography Section */}
      <div className="max-w-xl mx-auto w-full px-4 mt-6">
        <div className="p-4 rounded-xl border border-current/10 bg-current/5">
          <h3 className="font-label-caps text-[11px] text-[#c5a059] tracking-widest uppercase mb-2 flex items-center gap-1.5">
            <BookOpen size={14} />
            <span>Biography & Legacy</span>
          </h3>
          <p className="font-body-md text-xs leading-relaxed opacity-80 font-light">
            {sampleWork.artistBio || 'A renowned master painter whose timeless artworks are preserved in prestigious museum collections worldwide.'}
          </p>
        </div>
      </div>

      {/* Famous Masterpieces Grid */}
      <div className="max-w-xl mx-auto w-full px-4 my-8 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-label-caps text-xs text-[#c5a059] tracking-widest uppercase flex items-center gap-2">
            <Palette size={14} />
            <span>Masterpieces ({artistWorks.length})</span>
          </h3>
          <span className="text-[11px] opacity-60 font-light">Tap to view</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {artistWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => {
                onSelectArtwork(work.id);
                onClose();
              }}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-current/10 bg-black/40 aspect-[4/5] hover:border-[#c5a059]/60 transition-all shadow-md"
            >
              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end">
                <h4 className="font-serif text-xs font-bold text-white truncate group-hover:text-[#c5a059] transition-colors">
                  {work.title}
                </h4>
                <span className="text-[10px] text-[#c5a059] font-medium mt-0.5">
                  {work.year}
                </span>
                <span className="text-[9px] text-white/60 truncate mt-0.5">
                  {work.museum}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
