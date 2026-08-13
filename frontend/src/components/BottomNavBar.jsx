import React from 'react';
import { Compass, BookOpen, Search, User } from 'lucide-react';

export default function BottomNavBar({ activeTab, onTabChange, savedCount, onOpenSaved, onOpenSearch }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/10 flex justify-around items-center px-4 py-2 md:hidden">
      {/* Discover / Feed */}
      <button
        onClick={() => onTabChange('for-you')}
        className={`flex flex-col items-center justify-center py-1 w-16 transition-colors ${
          activeTab === 'for-you' ? 'text-white border-t-2 border-amber-400 font-semibold' : 'text-white/60 hover:text-white'
        }`}
      >
        <Compass size={22} className={activeTab === 'for-you' ? 'text-amber-400' : ''} />
        <span className="text-[11px] mt-1 tracking-wider uppercase">Discover</span>
      </button>

      {/* Museum / Saved Collection */}
      <button
        onClick={onOpenSaved}
        className="flex flex-col items-center justify-center py-1 w-16 text-white/60 hover:text-white transition-colors relative"
      >
        <BookOpen size={22} />
        <span className="text-[11px] mt-1 tracking-wider uppercase">Museum</span>
        {savedCount > 0 && (
          <span className="absolute top-1 right-3 bg-amber-500 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>

      {/* Search */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center py-1 w-16 text-white/60 hover:text-white transition-colors"
      >
        <Search size={22} />
        <span className="text-[11px] mt-1 tracking-wider uppercase">Search</span>
      </button>

      {/* Profile */}
      <button
        onClick={onOpenSaved}
        className="flex flex-col items-center justify-center py-1 w-16 text-white/60 hover:text-white transition-colors"
      >
        <User size={22} />
        <span className="text-[11px] mt-1 tracking-wider uppercase">Profile</span>
      </button>
    </nav>
  );
}
