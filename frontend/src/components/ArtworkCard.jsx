import React, { useState, useRef } from 'react';
import { Heart, Bookmark, MessageCircle, Share2, Plus, Check, Music, MapPin, Sparkles, ExternalLink, Info } from 'lucide-react';
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
  const [enableKenBurns, setEnableKenBurns] = useState(true);
  const lastTapRef = useRef(0);

  // Format large numbers (e.g. 148200 -> 148.2k)
  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  // Handle double tap/click on image for TikTok heart pop
  const handleMediaClick = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected!
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newHeart = { id: Date.now(), x, y };
      setDoubleTapHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setDoubleTapHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 900);

      // Trigger like if not already liked
      if (!isLiked) {
        onToggleLike(artwork.id);
      }

      // Confetti burst
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#fe2c55', '#f59e0b', '#ffffff']
      });
    }

    lastTapRef.current = now;
  };

  return (
    <div className="reel-card-wrapper" data-artwork-id={artwork.id}>
      {/* Background Media Container */}
      <div className="artwork-media-container" onClick={handleMediaClick}>
        {/* Blurry background wallpaper */}
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="artwork-bg-blur"
        />

        {/* Main Artwork Image */}
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title} by ${artwork.artist}`}
          className={`artwork-img-main ${enableKenBurns ? 'ken-burns-active' : ''}`}
          loading="eager"
        />

        {/* Floating Double Tap Hearts */}
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

      {/* Card Vignette Overlays */}
      <div className="card-overlay-top" />
      <div className="card-overlay-bottom" />

      {/* Right Action Rail (TikTok layout) */}
      <div className="action-rail-tiktok">
        {/* Artist Profile Circle + Overlapping Plus Button */}
        <div className="artist-avatar-wrap" onClick={() => onOpenArtistProfile(artwork.artist)}>
          <img
            src={artwork.artistPhoto}
            alt={artwork.artist}
            className="artist-avatar-img"
          />
          <button
            className={`artist-follow-btn ${isFollowingArtist ? 'following' : ''}`}
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
          <div className={`action-icon-circle ${isLiked ? 'liked' : ''}`}>
            <Heart
              size={24}
              fill={isLiked ? '#fe2c55' : 'none'}
              color={isLiked ? '#fe2c55' : '#ffffff'}
            />
          </div>
          <span className="action-count-text">
            {formatCount(artwork.likesCount + (isLiked ? 1 : 0))}
          </span>
        </button>

        {/* Save / Bookmark Button */}
        <button
          className="action-btn-item"
          onClick={() => onToggleSave(artwork.id)}
          title="Save to Collection"
        >
          <div className={`action-icon-circle ${isSaved ? 'saved' : ''}`}>
            <Bookmark
              size={24}
              fill={isSaved ? '#f59e0b' : 'none'}
              color={isSaved ? '#f59e0b' : '#ffffff'}
            />
          </div>
          <span className="action-count-text">
            {formatCount(artwork.savesCount + (isSaved ? 1 : 0))}
          </span>
        </button>

        {/* Comments Button */}
        <button
          className="action-btn-item"
          onClick={() => onOpenComments(artwork.id)}
          title="View Discussion"
        >
          <div className="action-icon-circle">
            <MessageCircle size={24} color="#ffffff" />
          </div>
          <span className="action-count-text">
            {artwork.comments.length}
          </span>
        </button>

        {/* Share Button */}
        <button
          className="action-btn-item"
          onClick={() => onOpenShare(artwork)}
          title="Share Masterpiece"
        >
          <div className="action-icon-circle">
            <Share2 size={22} color="#ffffff" />
          </div>
          <span className="action-count-text">
            {formatCount(artwork.sharesCount)}
          </span>
        </button>

        {/* Spinning Vinyl Record Disc for Classical Music */}
        <div
          className={`vinyl-disc-wrap ${isPlayingAudio ? 'playing' : ''}`}
          onClick={onToggleAudio}
          title={isPlayingAudio ? 'Pause Classical Soundtrack' : 'Play Classical Soundtrack'}
        >
          <img
            src={artwork.artistPhoto}
            alt="Audio Thumb"
            className="vinyl-art-thumb"
          />
        </div>
      </div>

      {/* Bottom Left Info Overlay */}
      <div className="card-info-bottom-left">
        {/* Artist Header */}
        <div className="artist-header-row" onClick={() => onOpenArtistProfile(artwork.artist)}>
          <span className="artist-name-title">@{artwork.artist.replace(/\s+/g, '').toLowerCase()}</span>
          <span className="artist-badge-tag">{artwork.category}</span>
        </div>

        {/* Artwork Title & Year */}
        <h2 className="artwork-title-heading">{artwork.title}</h2>

        <div className="artwork-year-museum">
          <span>{artwork.year}</span>
          <span>•</span>
          <MapPin size={12} />
          <span>{artwork.museum}</span>
        </div>

        {/* Short Description */}
        <p className="artwork-short-desc">{artwork.shortDescription}</p>

        {/* Read Full Story Button */}
        <button
          className="read-story-btn"
          onClick={() => onOpenDetail(artwork.id)}
        >
          <Info size={14} />
          <span>Read full curatorial story</span>
        </button>

        {/* Classical Music Audio Strip */}
        <div className="audio-track-strip" onClick={onToggleAudio} style={{ cursor: 'pointer' }}>
          <Music size={14} color="#f59e0b" />
          <span className="truncate max-w-[200px]">{artwork.audioTitle}</span>
          <div className="sound-waves-icon">
            <div className={`wave-bar ${isPlayingAudio ? 'playing' : ''}`} />
            <div className={`wave-bar ${isPlayingAudio ? 'playing' : ''}`} />
            <div className={`wave-bar ${isPlayingAudio ? 'playing' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
