import React from 'react';
import { Search, BookOpen } from 'lucide-react';

export default function Header({ onOpenSearch, onSelectTab, activeTab, savedCount = 0 }) {
  return (
    <header className="app-header flex items-center justify-between px-4 md:px-8 py-3 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 right-0 z-40">
      {/* Brand Logo - Dark Logo */}
      <div
        className="logo-container cursor-pointer flex items-center gap-2"
        onClick={() => onSelectTab('for-you')}
      >
        <img
          src="/logo/logo_dark.png"
          alt="Scrolls Logo"
          className="h-11 w-auto object-contain rounded-xl overflow-hidden shadow-sm"
        />
      </div>

      {/* Header Actions - Search & Desktop Museum Link */}
      <div className="header-actions flex items-center gap-2 md:gap-4">
        {/* Desktop Museum Collection Tab */}
        <button
          type="button"
          onClick={() => onSelectTab(activeTab === 'museum' ? 'for-you' : 'museum')}
          className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-label-caps tracking-wider transition-all cursor-pointer ${
            activeTab === 'museum'
              ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
              : 'border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/5'
          }`}
        >
          <BookOpen size={16} />
          <span>MY MUSEUM ({savedCount})</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          title="Search Artworks & Artists"
          className="text-white/80 hover:text-[#c5a059] p-2 bg-transparent border-0 outline-none cursor-pointer transition-colors"
        >
          <Search size={22} />
        </button>
      </div>
    </header>
  );
}
