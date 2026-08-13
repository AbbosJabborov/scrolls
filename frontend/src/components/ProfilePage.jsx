import React, { useState, useRef, useEffect } from 'react';
import {
  User, Bookmark, Heart, Users, Settings, Sparkles, Camera, Edit3, Check,
  LogOut, ArrowRight, Trash2, UserMinus, Sun, Moon, Shield, Mail, Lock, X
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
  onToggleTheme,
  showSettingsFromHeader = false,
  onCloseSettingsFromHeader
}) {
  const [activeProfileTab, setActiveProfileTab] = useState('saved'); // 'saved' | 'liked' | 'followed'
  const [showSettings, setShowSettings] = useState(false);

  // Profile Customizations (Display Name & Avatar)
  const [displayName, setDisplayName] = useState(() => {
    return localStorage.getItem('scrolls_display_name') || (currentUser ? currentUser.username : '');
  });
  const [customAvatar, setCustomAvatar] = useState(() => {
    return localStorage.getItem('scrolls_custom_avatar') || null;
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const fileInputRef = useRef(null);

  // Sync prop from header if user clicked Settings in header
  useEffect(() => {
    if (showSettingsFromHeader) {
      setShowSettings(true);
    }
  }, [showSettingsFromHeader]);

  useEffect(() => {
    if (currentUser && !displayName) {
      setDisplayName(currentUser.username);
    }
  }, [currentUser]);

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
          setDisplayName(res.user.username);
        } else {
          setErrorMsg(res?.error || 'Registration failed. Username may already exist.');
        }
      } else {
        const res = await loginUser(username.trim(), password.trim());
        if (res && res.user) {
          onLoginSuccess(res.user);
          setDisplayName(res.user.username);
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

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatar(reader.result);
        localStorage.setItem('scrolls_custom_avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim());
      localStorage.setItem('scrolls_display_name', tempName.trim());
    }
    setIsEditingName(false);
  };

  const followedList = Array.from(followedArtists);
  const isDay = themeMode === 'day';
  const borderClass = isDay ? 'border-black/10' : 'border-white/10';

  if (!currentUser) {
    return (
      <div className="w-full h-full min-h-screen pt-20 pb-28 px-4 flex items-center justify-center bg-var-bg text-var-text overflow-y-auto">
        <div className="w-full max-w-md bg-[#161616] text-[#F9F7F2] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
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
    <div className="w-full h-full min-h-screen pt-16 pb-28 px-3 md:px-12 bg-var-bg text-var-text overflow-y-auto relative">
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar - Username removed from top left, line below removed */}
        <div className="flex items-center justify-end pt-4 pb-1">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer border-0 bg-transparent"
            title="Profile Settings"
          >
            <Settings size={22} className="text-[#c5a059]" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="text-center space-y-3 pt-2">
          {/* Attachable Profile Image (No Green Check Button) */}
          <div
            className="relative inline-block mx-auto cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            title="Click to upload profile image"
          >
            {customAvatar ? (
              <img
                src={customAvatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#ffdea5] text-black font-serif font-bold text-4xl flex items-center justify-center shadow-xl border-4 border-white/20">
                {displayName ? displayName[0].toUpperCase() : (currentUser.username ? currentUser.username[0].toUpperCase() : 'C')}
              </div>
            )}
            {/* Camera Overlay Icon on Hover */}
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera size={24} />
            </div>
          </div>

          <div>
            {/* Editable Display Name */}
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your name"
                  className={`px-3 py-1 bg-current/10 border ${borderClass} rounded-lg text-sm text-center focus:outline-none focus:border-[#c5a059]`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="p-1.5 bg-[#c5a059] text-black rounded-lg hover:bg-[#ffdea5] transition-colors"
                >
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h1 className="font-serif text-2xl md:text-3xl font-normal">
                  {displayName || currentUser.username}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setTempName(displayName || currentUser.username);
                    setIsEditingName(true);
                  }}
                  className="p-1 text-[#c5a059] hover:opacity-80 bg-transparent border-0 cursor-pointer"
                  title="Edit Name"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            )}

            {/* Subtext: @username instead of email */}
            <p className="font-sans text-xs opacity-60 mt-1">@{currentUser.username}</p>

            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/40 rounded-full text-[11px] font-label-caps text-[#c5a059] tracking-wider">
              <Sparkles size={12} />
              <span>MUSEUM PATRON & CURATOR</span>
            </div>
          </div>

          {/* TikTok-Style 3-Stat Counter Bar (Toned Down Borders) */}
          <div className={`flex justify-center items-center gap-8 py-3 border-y ${borderClass} max-w-md mx-auto`}>
            <button
              type="button"
              onClick={() => setActiveProfileTab('saved')}
              className={`text-center bg-transparent border-0 cursor-pointer transition-transform ${activeProfileTab === 'saved' ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className="font-serif text-xl font-bold block text-[#c5a059]">{savedArtworks.length}</span>
              <span className="font-label-caps text-[10px] tracking-wider opacity-60">SAVED</span>
            </button>

            <div className={`w-px h-8 bg-current/10`} />

            <button
              type="button"
              onClick={() => setActiveProfileTab('liked')}
              className={`text-center bg-transparent border-0 cursor-pointer transition-transform ${activeProfileTab === 'liked' ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className="font-serif text-xl font-bold block text-rose-400">{likedArtworks.length}</span>
              <span className="font-label-caps text-[10px] tracking-wider opacity-60">LIKED</span>
            </button>

            <div className={`w-px h-8 bg-current/10`} />

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

        {/* Tab Selection Row (Toned Down Border) */}
        <div className={`flex border-b ${borderClass}`}>
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
                    className={`bg-current/5 border ${borderClass} rounded-xl overflow-hidden group flex flex-col justify-between`}
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
                    className={`bg-current/5 border ${borderClass} rounded-xl overflow-hidden cursor-pointer group`}
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
                    className={`p-3 bg-current/5 border ${borderClass} rounded-xl flex items-center justify-between`}
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

      {/* FULL-SCREEN SLIDE-IN SETTINGS DRAWER (Moves in from right to left covering whole screen) */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ease-out transform ${
          showSettings ? 'translate-x-0' : 'translate-x-full'
        } ${isDay ? 'bg-[#f9f7f2] text-[#1c1b1b]' : 'bg-[#121212] text-[#F9F7F2]'} overflow-y-auto p-6 md:p-12`}
      >
        <div className="max-w-2xl mx-auto space-y-8 pt-10">
          {/* Settings Top Bar with Close Button */}
          <div className={`flex items-center justify-between border-b ${borderClass} pb-4`}>
            <div className="flex items-center gap-3">
              <Settings size={24} className="text-[#c5a059]" />
              <h2 className="font-serif text-2xl font-normal">Curator Settings</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSettings(false);
                if (onCloseSettingsFromHeader) onCloseSettingsFromHeader();
              }}
              className="p-2 rounded-full hover:bg-current/10 transition-colors border-0 bg-transparent cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Profile Avatar & Name Editor */}
            <div className={`p-4 bg-current/5 border ${borderClass} rounded-2xl space-y-4`}>
              <h3 className="font-serif text-base font-medium">Profile Customization</h3>

              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden cursor-pointer relative group flex-shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {customAvatar ? (
                    <img src={customAvatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#c5a059] to-[#ffdea5] text-black font-serif font-bold text-2xl flex items-center justify-center">
                      {displayName ? displayName[0].toUpperCase() : 'C'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={18} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{displayName || currentUser.username}</p>
                  <p className="text-xs opacity-60">@{currentUser.username}</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 text-xs text-[#c5a059] font-medium hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Change profile photo
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance Day / Night Mode Switch */}
            <div className={`p-4 bg-current/5 border ${borderClass} rounded-2xl flex items-center justify-between`}>
              <div>
                <p className="font-sans text-sm font-semibold">Appearance Theme</p>
                <p className="text-xs opacity-60 mt-0.5">Switch between Warm Museum Day mode & Night mode</p>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-4 py-2 bg-[#c5a059] text-black rounded-full font-label-caps text-xs font-bold cursor-pointer border-0 shadow"
              >
                {isDay ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDay ? 'DAY MODE' : 'NIGHT MODE'}</span>
              </button>
            </div>

            {/* Account Info */}
            <div className={`p-4 bg-current/5 border ${borderClass} rounded-2xl space-y-3 text-xs`}>
              <h3 className="font-serif text-sm font-medium text-current mb-2">Account Info</h3>
              <div className="flex justify-between py-1">
                <span className="opacity-60">Username</span>
                <span className="font-medium">@{currentUser.username}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="opacity-60">Email</span>
                <span className="font-medium">{currentUser.email || 'Curator Member'}</span>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowSettings(false);
                  if (onCloseSettingsFromHeader) onCloseSettingsFromHeader();
                  onLogout();
                }}
                className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-xl font-label-caps text-xs tracking-wider font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                <span>SIGN OUT OF ACCOUNT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
