import React from 'react';
import { Compass, BookOpen, Search, User } from 'lucide-react';

export default function BottomNavBar({ activeTab, onTabChange, savedCount, onOpenSaved, onOpenSearch }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#121212]/95 backdrop-blur-md border-t border-white/10 flex justify-around items-center px-2 py-2 md:hidden">
      {/* Discover / Feed */}
      <button
        type="button"
        onClick={() => onTabChange('for-you')}
        className={`flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none transition-colors ${
          activeTab === 'for-you' ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
        }`}
      >
        <Compass size={22} className={activeTab === 'for-you' ? 'text-[#ffdea5]' : ''} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Discover</span>
      </button>

      {/* Museum / Saved Collection */}
      <button
        type="button"
        onClick={onOpenSaved}
        className="flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none text-white/60 hover:text-white transition-colors relative"
      >
        <BookOpen size={22} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Museum</span>
        {savedCount > 0 && (
          <span className="absolute top-0 right-3 bg-[#c5a059] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>

      {/* Search */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none text-white/60 hover:text-white transition-colors"
      >
        <Search size={22} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Search</span>
      </button>

      {/* Profile */}
      <button
        type="button"
        onClick={onOpenSaved}
        className="flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none text-white/60 hover:text-white transition-colors"
      >
        <User size={22} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Profile</span>
      </button>
    </nav>
  );
}
