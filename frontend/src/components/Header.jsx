import React from 'react';
import { Bookmark, Volume2, VolumeX, Sparkles, Search } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  isMuted,
  onToggleMute,
  onOpenSearch
}) {
  return (
    <header className="app-header">
      {/* Brand Logo */}
      <div className="logo-container">
        <div className="logo-icon-wrap">
          <Sparkles size={18} className="text-black" />
        </div>
        <div className="flex flex-col">
          <span className="logo-text">Scrolls</span>
        </div>
        <span className="logo-badge">Reels</span>
      </div>

      {/* Center Feed Tabs */}
      <div className="header-center">
        <button
          type="button"
          className={`nav-tab ${activeTab === 'for-you' ? 'active' : ''}`}
          onClick={() => setActiveTab('for-you')}
        >
          For You
        </button>
        <button
          type="button"
          className={`nav-tab ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => setActiveTab('trending')}
        >
          Masterpieces
        </button>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Search trigger */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenSearch}
          title="Search Artworks & Artists"
        >
          <Search size={18} />
        </button>

        {/* Global Mute / Unmute Classical Audio */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Classical Music' : 'Mute Classical Music'}
        >
          {isMuted ? <VolumeX size={18} className="text-rose-400" /> : <Volume2 size={18} className="text-amber-400" />}
        </button>

        {/* Saved Gallery Drawer Trigger */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenSaved}
          title="Saved Masterpieces"
        >
          <Bookmark size={18} />
          {savedCount > 0 && <span className="saved-badge-count">{savedCount}</span>}
        </button>
      </div>
    </header>
  );
}
