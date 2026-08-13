import React from 'react';
import { Settings, BookOpen } from 'lucide-react';

export default function Header({ onOpenSettings, onSelectTab, activeTab, savedCount = 0, themeMode = 'dark' }) {
  const logoSrc = themeMode === 'day' ? '/logo/logo_beige.png' : '/logo/logo_dark.png';

  return (
    <header className={`app-header flex items-center justify-between px-4 md:px-8 py-3 backdrop-blur-md border-b fixed top-0 left-0 right-0 z-40 transition-colors ${
      themeMode === 'day'
        ? 'bg-[#f9f7f2]/95 border-black/10 text-black'
        : 'bg-[#121212]/95 border-white/10 text-white'
    }`}>
      {/* Brand Logo */}
      <div
        className="logo-container cursor-pointer flex items-center gap-2"
        onClick={() => onSelectTab('for-you')}
      >
        <img
          src={logoSrc}
          alt="Scrolls Logo"
          className="h-11 w-auto object-contain rounded-xl overflow-hidden shadow-sm"
        />
      </div>

      {/* Header Actions - Settings & Desktop Museum Link */}
      <div className="header-actions flex items-center gap-2 md:gap-4">
        {/* Desktop Museum Collection Tab */}
        <button
          type="button"
          onClick={() => onSelectTab(activeTab === 'museum' ? 'for-you' : 'museum')}
          className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-label-caps tracking-wider transition-all cursor-pointer ${
            activeTab === 'museum'
              ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
              : themeMode === 'day'
                ? 'border-black/20 text-black/80 hover:text-black hover:border-black/40 bg-black/5'
                : 'border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/5'
          }`}
        >
          <BookOpen size={16} />
          <span>MY MUSEUM ({savedCount})</span>
        </button>

        {/* Settings Gear Button (Replaces Search Button) */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Curator Settings"
          className={`p-2 bg-transparent border-0 outline-none cursor-pointer transition-colors ${
            themeMode === 'day' ? 'text-black/80 hover:text-[#c5a059]' : 'text-white/80 hover:text-[#c5a059]'
          }`}
        >
          <Settings size={22} />
        </button>
      </div>
    </header>
  );
}
