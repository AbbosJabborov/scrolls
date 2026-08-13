import React from 'react';
import { Search, User } from 'lucide-react';

export default function Header({ onOpenSearch, onOpenProfile, currentUser }) {
  return (
    <header className="app-header">
      {/* Brand Logo - Dark Logo, 50% Bigger with Rounded Corners */}
      <div className="logo-container">
        <img
          src="/logo/logo_dark.png"
          alt="Scrolls Logo"
          className="h-11 w-auto object-contain rounded-xl overflow-hidden shadow-sm"
        />
      </div>

      {/* Header Actions - Search & Curator Profile */}
      <div className="header-actions flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSearch}
          title="Search Artworks & Artists"
          className="text-white hover:text-[#c5a059] p-2 bg-transparent border-0 outline-none cursor-pointer transition-colors"
        >
          <Search size={22} />
        </button>

        <button
          type="button"
          onClick={onOpenProfile}
          title={currentUser ? `Profile (@${currentUser.username})` : "Curator Sign In"}
          className="text-white hover:text-[#c5a059] p-2 bg-transparent border-0 outline-none cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <User size={22} className={currentUser ? 'text-[#c5a059]' : ''} />
          {currentUser && (
            <span className="hidden md:inline font-label-caps text-[11px] text-[#c5a059] tracking-wider font-semibold">
              @{currentUser.username}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
