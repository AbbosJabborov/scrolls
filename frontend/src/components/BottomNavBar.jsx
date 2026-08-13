import React from 'react';
import { Compass, BookOpen, Search, User } from 'lucide-react';

export default function BottomNavBar({ activeTab, onTabChange, onOpenSearch, currentUser, themeMode = 'dark' }) {
  const isDay = themeMode === 'day';
  const baseText = isDay ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white';
  const activeText = isDay ? 'text-black font-semibold' : 'text-white font-semibold';
  const goldAccent = isDay ? 'text-[#b38536]' : 'text-[#ffdea5]';

  return (
    <nav className={`fixed bottom-0 left-0 w-full z-50 backdrop-blur-md border-t flex justify-around items-center px-2 py-2 md:hidden transition-colors ${
      isDay ? 'bg-[#f9f7f2]/95 border-black/10' : 'bg-[#121212]/95 border-white/10'
    }`}>
      {/* Discover / Feed */}
      <button
        type="button"
        onClick={() => onTabChange('for-you')}
        className={`flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none transition-colors cursor-pointer ${
          activeTab === 'for-you' ? activeText : baseText
        }`}
      >
        <Compass size={22} className={activeTab === 'for-you' ? goldAccent : ''} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Discover</span>
      </button>

      {/* Museum / Saved Collection Tab */}
      <button
        type="button"
        onClick={() => onTabChange('museum')}
        className={`flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none transition-colors cursor-pointer ${
          activeTab === 'museum' ? activeText : baseText
        }`}
      >
        <BookOpen size={22} className={activeTab === 'museum' ? goldAccent : ''} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Museum</span>
      </button>

      {/* Search */}
      <button
        type="button"
        onClick={onOpenSearch}
        className={`flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none transition-colors cursor-pointer ${baseText}`}
      >
        <Search size={22} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">Search</span>
      </button>

      {/* Profile / Account Tab */}
      <button
        type="button"
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center py-1 w-16 bg-transparent border-0 outline-none transition-colors cursor-pointer relative ${
          activeTab === 'profile' ? activeText : baseText
        }`}
      >
        <User size={22} className={activeTab === 'profile' ? goldAccent : (currentUser ? 'text-[#c5a059]' : '')} />
        <span className="text-[10px] mt-1 tracking-wider uppercase">
          {currentUser ? currentUser.username.substring(0, 7) : 'Profile'}
        </span>
      </button>
    </nav>
  );
}
