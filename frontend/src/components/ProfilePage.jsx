import React, { useState } from 'react';
import {
  User, Bookmark, Heart, Users, Settings, Sparkles, CheckCircle2,
  LogOut, ArrowRight, Trash2, UserMinus, Sun, Moon, Shield, Mail, Lock
} from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function ProfilePage({
  currentUser,
  onLoginSuccess,
  onLogout,
  savedArtworks = [],
  likedArtworks = [],
  followedArtists = new Set(),
  onSelectArtwork,
  onRemoveSave,
  onToggleFollowArtist,
  onOpenArtistProfile,
  themeMode = 'dark',
  onToggleTheme
}) {
  const [activeProfileTab, setActiveProfileTab] = useState('saved'); // 'saved' | 'liked' | 'followed'
  const [showSettings, setShowSettings] = useState(false);

  // Auth form states if not logged in
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username and password are required');
      return;
    }

    if (isRegisterMode && !email.trim()) {
      setErrorMsg('Email address is required for membership');
      return;
    }

    setLoading(true);
    try {
      if (isRegisterMode) {
        const res = await registerUser(username.trim(), email.trim(), password.trim());
        if (res && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res?.error || 'Registration failed. Username may already exist.');
        }
      } else {
        const res = await loginUser(username.trim(), password.trim());
        if (res && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res?.error || 'Invalid username or password.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const followedList = Array.from(followedArtists);

  if (!currentUser) {
    return (
      <div className="w-full h-full min-h-screen pt-20 pb-28 px-4 flex items-center justify-center bg-var-bg text-var-text overflow-y-auto">
        <div className="w-full max-w-md bg-[#161616] text-[#F9F7F2] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
              <Shield size={28} />
            </div>
            <h2 className="font-serif text-2xl font-normal text-white">Curator Membership</h2>
            <p className="font-sans text-xs text-white/60">
              Sign in to save your personal museum gallery & follow master artists.
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex border-b border-white/10 pb-2">
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
              className={`flex-1 pb-2 font-label-caps text-xs tracking-widest text-center cursor-pointer border-0 bg-transparent transition-colors ${
                !isRegisterMode ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
              className={`flex-1 pb-2 font-label-caps text-xs tracking-widest text-center cursor-pointer border-0 bg-transparent transition-colors ${
                isRegisterMode ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              JOIN MUSEUM
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block font-label-caps text-[10px] text-white/60 tracking-wider mb-1.5">
                USERNAME
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="e.g. ArtCurator"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="block font-label-caps text-[10px] text-white/60 tracking-wider mb-1.5">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="curator@museum.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-label-caps text-[10px] text-white/60 tracking-wider mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#ffdea5] text-black font-label-caps text-xs tracking-widest font-bold rounded-xl transition-all border-0 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : (isRegisterMode ? 'CREATE MEMBERSHIP' : 'SIGN IN TO SCROLLS')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen pt-16 pb-28 px-3 md:px-12 bg-var-bg text-var-text overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TikTok-Style Top Header Bar with Settings Gear */}
        <div className="flex items-center justify-between pt-4 pb-2 border-b border-current/10">
          <span className="font-serif text-lg font-normal tracking-wide">
            @{currentUser.username}
          </span>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer border-0 bg-transparent"
            title="Profile Settings"
          >
            <Settings size={22} className="text-[#c5a059]" />
          </button>
        </div>

        {/* Settings Modal Overlay */}
        {showSettings && (
          <div className="p-4 bg-current/5 border border-current/15 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <span className="font-serif text-base font-normal">Preferences & Theme</span>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-xs opacity-60 hover:opacity-100 border-0 bg-transparent cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Day / Night Theme Switcher */}
            <div className="flex items-center justify-between p-3 bg-current/5 rounded-xl">
              <div>
                <p className="font-sans text-xs font-semibold">Appearance Theme</p>
                <p className="text-[11px] opacity-60">Switch between Warm Museum Day mode & Night mode</p>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#c5a059] text-black rounded-full font-label-caps text-xs font-bold cursor-pointer border-0 shadow"
              >
                {themeMode === 'day' ? <Sun size={14} /> : <Moon size={14} />}
                <span>{themeMode === 'day' ? 'DAY MODE' : 'NIGHT MODE'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSettings(false);
                onLogout();
              }}
              className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-xl font-label-caps text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              <span>SIGN OUT OF ACCOUNT</span>
            </button>
          </div>
        )}

        {/* Profile Card Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#ffdea5] text-black font-serif font-bold text-4xl flex items-center justify-center shadow-xl border-4 border-white/20">
              {currentUser.username ? currentUser.username[0].toUpperCase() : 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#10b981] p-1.5 rounded-full text-white shadow-lg" title="Active Patron">
              <CheckCircle2 size={16} />
            </div>
          </div>

          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-normal">@{currentUser.username}</h1>
            <p className="font-sans text-xs opacity-60 mt-0.5">{currentUser.email || 'Curatorial Member'}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/40 rounded-full text-[11px] font-label-caps text-[#c5a059] tracking-wider">
              <Sparkles size={12} />
              <span>MUSEUM PATRON & CURATOR</span>
            </div>
          </div>

          {/* TikTok-Style 3-Stat Counter Bar */}
          <div className="flex justify-center items-center gap-8 py-3 border-y border-current/10 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveProfileTab('saved')}
              className={`text-center bg-transparent border-0 cursor-pointer transition-transform ${activeProfileTab === 'saved' ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className="font-serif text-xl font-bold block text-[#c5a059]">{savedArtworks.length}</span>
              <span className="font-label-caps text-[10px] tracking-wider opacity-60">SAVED</span>
            </button>

            <div className="w-px h-8 bg-current/10" />

            <button
              type="button"
              onClick={() => setActiveProfileTab('liked')}
              className={`text-center bg-transparent border-0 cursor-pointer transition-transform ${activeProfileTab === 'liked' ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className="font-serif text-xl font-bold block text-rose-400">{likedArtworks.length}</span>
              <span className="font-label-caps text-[10px] tracking-wider opacity-60">LIKED</span>
            </button>

            <div className="w-px h-8 bg-current/10" />

            <button
              type="button"
              onClick={() => setActiveProfileTab('followed')}
              className={`text-center bg-transparent border-0 cursor-pointer transition-transform ${activeProfileTab === 'followed' ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className="font-serif text-xl font-bold block text-[#c5a059]">{followedList.length}</span>
              <span className="font-label-caps text-[10px] tracking-wider opacity-60">FOLLOWING</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-current/10">
          <button
            type="button"
            onClick={() => setActiveProfileTab('saved')}
            className={`flex-1 pb-3 font-label-caps text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-0 bg-transparent transition-colors ${
              activeProfileTab === 'saved' ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Bookmark size={16} />
            <span>SAVED</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveProfileTab('liked')}
            className={`flex-1 pb-3 font-label-caps text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-0 bg-transparent transition-colors ${
              activeProfileTab === 'liked' ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Heart size={16} />
            <span>LIKED</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveProfileTab('followed')}
            className={`flex-1 pb-3 font-label-caps text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-0 bg-transparent transition-colors ${
              activeProfileTab === 'followed' ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Users size={16} />
            <span>MASTERS</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeProfileTab === 'saved' && (
          <div>
            {savedArtworks.length === 0 ? (
              <div className="text-center py-16 opacity-50 space-y-2">
                <Bookmark size={36} className="mx-auto text-[#c5a059]" />
                <p className="text-xs">No saved masterpieces yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                {savedArtworks.map((work) => (
                  <div
                    key={work.id}
                    className="bg-current/5 border border-current/10 rounded-xl overflow-hidden group flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-square bg-black overflow-hidden cursor-pointer p-1 flex items-center justify-center"
                      onClick={() => onSelectArtwork(work.id)}
                    >
                      <img src={work.imageUrl} alt={work.title} className="w-full h-full object-contain rounded-sm" />
                    </div>
                    <div className="p-2 flex items-center justify-between">
                      <h4 className="font-serif text-[11px] truncate flex-1" title={work.title}>{work.title}</h4>
                      <button
                        type="button"
                        onClick={() => onRemoveSave(work.id)}
                        className="text-rose-400 p-1 bg-transparent border-0 cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeProfileTab === 'liked' && (
          <div>
            {likedArtworks.length === 0 ? (
              <div className="text-center py-16 opacity-50 space-y-2">
                <Heart size={36} className="mx-auto text-rose-400" />
                <p className="text-xs">No liked masterpieces yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                {likedArtworks.map((work) => (
                  <div
                    key={work.id}
                    className="bg-current/5 border border-current/10 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => onSelectArtwork(work.id)}
                  >
                    <div className="relative aspect-square bg-black overflow-hidden p-1 flex items-center justify-center">
                      <img src={work.imageUrl} alt={work.title} className="w-full h-full object-contain rounded-sm" />
                    </div>
                    <div className="p-2">
                      <h4 className="font-serif text-[11px] truncate" title={work.title}>{work.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeProfileTab === 'followed' && (
          <div>
            {followedList.length === 0 ? (
              <div className="text-center py-16 opacity-50 space-y-2">
                <Users size={36} className="mx-auto text-[#c5a059]" />
                <p className="text-xs">Not following any artists yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {followedList.map((artistName) => (
                  <div
                    key={artistName}
                    className="p-3 bg-current/5 border border-current/10 rounded-xl flex items-center justify-between"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => onOpenArtistProfile(artistName)}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center font-serif text-sm font-bold text-[#c5a059]">
                        {artistName[0]}
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold hover:text-[#c5a059]">{artistName}</p>
                        <p className="text-[10px] opacity-60 font-label-caps">MASTER PAINTER</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleFollowArtist(artistName)}
                      className="px-3 py-1 bg-white/10 hover:bg-rose-500/20 text-xs text-white hover:text-rose-400 rounded-full font-label-caps transition-colors border-0 cursor-pointer"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
