import React, { useState, useRef } from 'react';
import { Heart, Bookmark, MessageCircle, Share2, Plus, Check, ArrowRight, Music, MapPin } from 'lucide-react';
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
  onToggleAudio
}) {
  const [doubleTapHearts, setDoubleTapHearts] = useState([]);
  const lastTapRef = useRef(0);

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
    <div className="reel-card-wrapper" data-artwork-id={artwork.id}>
      {/* Background Media Container */}
      <div className="artwork-media-container" onClick={handleMediaClick}>
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title} by ${artwork.artist}`}
          className="artwork-img-main ken-burns-active"
          loading="eager"
        />

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

      {/* Card Overlays */}
      <div className="card-overlay-bottom" />

      {/* Right Action Rail (Stitches Google Layout) */}
      <div className="action-rail-stitches">
        {/* Artist Profile Circle + Overlapping Follow Button */}
        <div className="artist-avatar-container" onClick={() => onOpenArtistProfile(artwork.artist)}>
          <img
            src={artwork.artistPhoto}
            alt={artwork.artist}
            className="artist-avatar-img"
          />
          <button
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
          className="action-btn-item"
          onClick={() => onToggleLike(artwork.id)}
          title="Like Artwork"
        >
          <div className={`action-icon-wrap ${isLiked ? 'liked' : ''}`}>
            <Heart
              size={24}
              fill={isLiked ? '#fe2c55' : 'none'}
              color={isLiked ? '#fe2c55' : '#ffffff'}
            />
          </div>
          <span className="font-label-sm text-[12px] opacity-80 mt-1">
            {formatCount((artwork.likesCount || 12400) + (isLiked ? 1 : 0))}
          </span>
        </button>

        {/* Comment Button */}
        <button
          className="action-btn-item"
          onClick={() => onOpenComments(artwork.id)}
          title="View Discussion"
        >
          <div className="action-icon-wrap">
            <MessageCircle size={24} color="#ffffff" />
          </div>
          <span className="font-label-sm text-[12px] opacity-80 mt-1">
            {artwork.comments ? artwork.comments.length : 428}
          </span>
        </button>

        {/* Save / Bookmark Button */}
        <button
          className="action-btn-item"
          onClick={() => onToggleSave(artwork.id)}
          title="Save to Collection"
        >
          <div className={`action-icon-wrap ${isSaved ? 'saved' : ''}`}>
            <Bookmark
              size={24}
              fill={isSaved ? '#c5a059' : 'none'}
              color={isSaved ? '#c5a059' : '#ffffff'}
            />
          </div>
        </button>

        {/* Share Button */}
        <button
          className="action-btn-item"
          onClick={() => onOpenShare(artwork)}
          title="Share Masterpiece"
        >
          <div className="action-icon-wrap">
            <Share2 size={22} color="#ffffff" />
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

      {/* Bottom Left Editorial Overlay (Google Stitches) */}
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
          <span className="font-label-sm text-xs text-white/70">· {artwork.year}</span>
        </div>

        <p className="font-body-md text-xs text-white/70 line-clamp-2 max-w-sm font-light">
          {artwork.shortDescription}
        </p>

        {/* Read Full Story Button with arrow */}
        <button
          className="read-story-link"
          onClick={() => onOpenDetail(artwork.id)}
        >
          <span>Read the story</span>
          <ArrowRight size={14} />
        </button>

        {/* Audio Strip */}
        <div
          className="flex items-center space-x-2 text-[11px] text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md w-fit mt-2 border border-white/10 cursor-pointer"
          onClick={onToggleAudio}
        >
          <Music size={12} className="text-amber-400" />
          <span className="truncate max-w-[160px]">{artwork.audioTitle}</span>
        </div>
      </div>
    </div>
  );
}
