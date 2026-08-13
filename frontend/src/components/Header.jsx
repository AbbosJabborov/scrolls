import React from 'react';
import { Search } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  return (
    <header className="app-header">
      {/* Brand Logo Image Only */}
      <div className="logo-container">
        <img
          src="/logo/logo_beige.png"
          alt="Scrolls Logo"
          className="h-7 w-auto object-contain"
        />
      </div>

      {/* Header Actions - Search Only, Borderless */}
      <div className="header-actions">
        <button
          type="button"
          onClick={onOpenSearch}
          title="Search Artworks & Artists"
          className="text-white hover:text-[#c5a059] p-2 bg-transparent border-0 outline-none cursor-pointer transition-colors"
        >
          <Search size={22} />
        </button>
      </div>
    </header>
  );
}
