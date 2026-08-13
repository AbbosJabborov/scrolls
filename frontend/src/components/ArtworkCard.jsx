import React, { useState, useRef } from 'react';
import { Heart, Bookmark, MessageCircle, Share2, Plus, Check, ArrowRight, Music } from 'lucide-react';
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

  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

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
        crossOrigin="anonymous"
        className="ambient-bg-blur"
      />

      {/* Main Content Area with Picture Frame */}
      <div className="artwork-media-container" onClick={handleMediaClick}>
        {/* Elegant Museum Picture Frame Container */}
        <div className="picture-frame-wrap">
          <img
            src={artwork.imageUrl}
            alt={`${artwork.title} by ${artwork.artist}`}
            crossOrigin="anonymous"
            className="artwork-img-framed"
            loading="eager"
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
          <span className="font-label-sm text-[12px] opacity-90 mt-1">
            {formatCount((artwork.likesCount || 12400) + (isLiked ? 1 : 0))}
          </span>
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
          <span className="font-label-sm text-[12px] opacity-90 mt-1">
            {artwork.comments ? artwork.comments.length : 428}
          </span>
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
          onClick={onToggleAudio}
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

        {/* Audio Strip */}
        <div
          className={`flex items-center space-x-2 text-[11px] px-2.5 py-1 rounded-md w-fit mt-2 border cursor-pointer ${
            isDay ? 'bg-black/5 text-black/80 border-black/10' : 'bg-black/40 text-white/60 border-white/10'
          }`}
          onClick={onToggleAudio}
        >
          <Music size={12} className="text-amber-500" />
          <span className="truncate max-w-[160px]">{artwork.audioTitle}</span>
        </div>
      </div>
    </div>
  );
}
