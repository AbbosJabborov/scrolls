import React, { useState, useRef } from 'react';
import { Heart, Bookmark, MessageCircle, Share2, Plus, Check, ArrowRight, Music, Play, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ArtworkCard({
  artwork,
  isLiked,
  isSaved,
  isFollowingArtist,
  onToggleLike,
  onToggleSave,
  onToggleFollowArtist,
  onOpenComments,
  onOpenDetail,
  onOpenArtistProfile,
  onOpenShare,
  isPlayingAudio,
  onToggleAudio,
  themeMode = 'dark'
}) {
  const [doubleTapHearts, setDoubleTapHearts] = useState([]);
  const lastTapRef = useRef(0);
  const isDay = themeMode === 'day';
  const defaultIconColor = isDay ? '#1c1b1b' : '#ffffff';
  const FALLBACK_ARTWORK = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80';
  const FALLBACK_ARTIST = '/artists/klimt.jpg';

  const handleMediaClick = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newHeart = { id: Date.now(), x, y };
      setDoubleTapHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setDoubleTapHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 900);

      if (!isLiked) {
        onToggleLike(artwork.id);
      }

      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#fe2c55', '#c5a059', '#ffffff']
      });
    }

    lastTapRef.current = now;
  };

  return (
    <div className={`reel-card-wrapper ${isDay ? 'day-mode-card' : ''}`} data-artwork-id={artwork.id}>
      {/* Heavy Blurred Ambient Artwork Background */}
      <img
        src={artwork.imageUrl}
        alt=""
        aria-hidden="true"
        className="ambient-bg-blur"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_ARTWORK;
        }}
      />

      {/* Main Content Area with Picture Frame */}
      <div className="artwork-media-container" onClick={handleMediaClick}>
        {/* Elegant Museum Picture Frame Container */}
        <div className="picture-frame-wrap">
          <img
            src={artwork.imageUrl}
            alt={`${artwork.title} by ${artwork.artist}`}
            className="artwork-img-framed"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_ARTWORK;
            }}
          />
        </div>

        {doubleTapHearts.map((h) => (
          <div
            key={h.id}
            className="double-tap-heart"
            style={{ top: `${h.y}px`, left: `${h.x}px` }}
          >
            <Heart size={80} fill="#fe2c55" color="#fe2c55" />
          </div>
        ))}
      </div>

      {/* Vignette Gradient Overlay */}
      <div className="card-overlay-bottom" />

      {/* Right Action Rail */}
      <div className="action-rail-stitches">
        {/* Artist Profile Circle + Overlapping Follow Button */}
        <div className="artist-avatar-container" onClick={() => onOpenArtistProfile(artwork.artist)}>
          <div className="w-[46px] h-[46px] rounded-full overflow-hidden border border-current/20 shadow-lg bg-[#222] flex items-center justify-center">
            {artwork.artistPhoto ? (
              <img
                src={artwork.artistPhoto}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_ARTIST;
                }}
              />
            ) : (
              <span className="text-xs font-bold text-[#c5a059]">
                {artwork.artist ? artwork.artist[0] : 'A'}
              </span>
            )}
          </div>
          <button
            type="button"
            className={`artist-follow-plus-btn ${isFollowingArtist ? 'following' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFollowArtist(artwork.artist);
            }}
            title={isFollowingArtist ? `Following ${artwork.artist}` : `Follow ${artwork.artist}`}
          >
            {isFollowingArtist ? <Check size={12} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Like Button */}
        <button
          type="button"
          className="action-btn-item"
          onClick={() => onToggleLike(artwork.id)}
          title="Like Artwork"
        >
          <div className={`action-icon-wrap ${isLiked ? 'liked' : ''}`}>
            <Heart
              size={24}
              fill={isLiked ? '#fe2c55' : 'none'}
              color={isLiked ? '#fe2c55' : defaultIconColor}
            />
          </div>
        </button>

        {/* Comment Button */}
        <button
          type="button"
          className="action-btn-item"
          onClick={() => onOpenComments(artwork.id)}
          title="View Discussion"
        >
          <div className="action-icon-wrap">
            <MessageCircle size={24} color={defaultIconColor} />
          </div>
        </button>

        {/* Save / Bookmark Button */}
        <button
          type="button"
          className="action-btn-item"
          onClick={() => onToggleSave(artwork.id)}
          title="Save to Collection"
        >
          <div className={`action-icon-wrap ${isSaved ? 'saved' : ''}`}>
            <Bookmark
              size={24}
              fill={isSaved ? '#c5a059' : 'none'}
              color={isSaved ? '#c5a059' : defaultIconColor}
            />
          </div>
        </button>

        {/* Share Button */}
        <button
          type="button"
          className="action-btn-item"
          onClick={() => onOpenShare(artwork)}
          title="Share Masterpiece"
        >
          <div className="action-icon-wrap">
            <Share2 size={22} color={defaultIconColor} />
          </div>
        </button>

        {/* Classical Audio Spinning Disc */}
        <div
          className={`vinyl-disc ${isPlayingAudio ? 'playing' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleAudio();
          }}
          title={isPlayingAudio ? 'Pause Classical Soundtrack' : 'Play Classical Soundtrack'}
        >
          <img
            src={artwork.artistPhoto}
            alt="Audio Disc"
            className="w-5 h-5 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Left Editorial Info Overlay */}
      <div className="card-info-editorial">
        {/* Title in Bodoni Moda Serif */}
        <h1 className="artwork-title-serif">{artwork.title}</h1>

        <div className="flex items-center space-x-2 my-1">
          <span
            className="artist-tag-chip cursor-pointer hover:border-amber-400"
            onClick={() => onOpenArtistProfile(artwork.artist)}
          >
            {artwork.artist}
          </span>
          <span className="font-label-sm text-xs opacity-75">· {artwork.year}</span>
        </div>

        <p className="font-body-md text-xs opacity-80 line-clamp-2 max-w-sm font-light">
          {artwork.shortDescription}
        </p>

        {/* Read Full Story Button */}
        <button
          type="button"
          className="read-story-link"
          onClick={() => onOpenDetail(artwork.id)}
        >
          <span>Read the story</span>
          <ArrowRight size={14} />
        </button>

        {/* Interactive Audio Strip with Live Animated Sound Waves */}
        <div
          className={`flex items-center space-x-2 text-[11px] px-3 py-1.5 rounded-full w-fit mt-2.5 border cursor-pointer transition-all shadow-md ${
            isPlayingAudio
              ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/50 shadow-[#c5a059]/10 font-bold'
              : isDay
              ? 'bg-black/5 text-black/80 border-black/15 hover:bg-black/10'
              : 'bg-black/50 text-white/80 border-white/15 hover:bg-black/70'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleAudio();
          }}
          title={isPlayingAudio ? 'Pause Classical Soundtrack' : 'Play Classical Soundtrack'}
        >
          <div className="flex items-center gap-1">
            {isPlayingAudio ? (
              <div className="flex items-end gap-[2px] h-3 w-3">
                <span className="eq-bar eq-bar-1 bg-[#c5a059]" />
                <span className="eq-bar eq-bar-2 bg-[#c5a059]" />
                <span className="eq-bar eq-bar-3 bg-[#c5a059]" />
              </div>
            ) : (
              <Play size={11} className="text-amber-500 fill-amber-500" />
            )}
          </div>

          <Music size={12} className={isPlayingAudio ? 'text-[#c5a059] animate-pulse' : 'text-amber-500'} />
          
          <span className="truncate max-w-[170px] font-medium tracking-wide">
            {artwork.audioTitle || 'Classical Soundtrack'}
          </span>

          <span className="text-[9px] font-bold uppercase tracking-wider opacity-70 ml-1">
            {isPlayingAudio ? '• PLAYING' : '• PLAY'}
          </span>
        </div>
      </div>
    </div>
  );
}
