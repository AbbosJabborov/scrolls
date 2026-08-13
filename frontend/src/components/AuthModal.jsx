import React, { useState } from 'react';
import { X, User, Mail, Lock, LogOut, Sparkles, CheckCircle2, Bookmark, Users, Shield, Settings, ChevronRight, UserMinus } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({
  currentUser,
  onLoginSuccess,
  onLogout,
  onClose,
  savedCount = 0,
  followedArtists = new Set(),
  onToggleFollowArtist,
  onOpenArtistProfile
}) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSettingsView, setShowSettingsView] = useState(false);
  const [showFollowedList, setShowFollowedList] = useState(false);

  const handleSubmit = async (e) => {
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
          onClose();
        } else {
          setErrorMsg(res?.error || 'Registration failed. Username may already exist.');
        }
      } else {
        const res = await loginUser(username.trim(), password.trim());
        if (res && res.user) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res?.error || 'Invalid username or password.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const followedList = Array.from(followedArtists);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#161616] text-[#F9F7F2] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[#c5a059]" />
            <span className="font-serif text-base text-white font-medium tracking-wide">
              {showSettingsView ? 'Curator Settings' : (currentUser ? 'Curator Profile' : 'Museum Membership')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                type="button"
                onClick={() => setShowSettingsView(!showSettingsView)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  showSettingsView
                    ? 'bg-[#c5a059] text-black border-[#c5a059]'
                    : 'text-white/70 hover:text-white border-white/10 hover:border-white/30 bg-white/5'
                }`}
                title="Curator Settings"
              >
                <Settings size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white bg-transparent border-0 cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {currentUser ? (
          showSettingsView ? (
            /* SETTINGS VIEW */
            <div className="p-6 space-y-6 overflow-y-auto">
              <h3 className="font-serif text-lg text-white font-normal border-b border-white/10 pb-2">
                Preferences & Account
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Dark Museum Theme</p>
                    <p className="text-white/50 text-[11px]">Default editorial theme</p>
                  </div>
                  <span className="text-[#c5a059] font-bold text-[10px] font-label-caps">ACTIVE</span>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Audio Auto-Play</p>
                    <p className="text-white/50 text-[11px]">Play classical soundtrack on scroll</p>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] font-label-caps">ENABLED</span>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Curator Username</p>
                    <p className="text-white/50 text-[11px]">@{currentUser.username}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowSettingsView(false)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-label-caps text-xs font-semibold cursor-pointer border-0 transition-colors"
                >
                  RETURN TO PROFILE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl font-label-caps text-xs font-semibold cursor-pointer transition-colors"
                >
                  SIGN OUT
                </button>
              </div>
            </div>
          ) : (
            /* LOGGED IN USER PROFILE VIEW */
            <div className="p-6 md:p-8 space-y-6 text-center overflow-y-auto">
              {/* User Avatar Circle */}
              <div className="relative inline-block mx-auto">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#ffdea5] text-black font-serif font-bold text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
                  {currentUser.username ? currentUser.username[0].toUpperCase() : 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#10b981] p-1 rounded-full text-white shadow" title="Active Patron Member">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-white font-normal">@{currentUser.username}</h2>
                <p className="font-sans text-xs text-white/60 mt-1">{currentUser.email || 'Curatorial Member'}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/40 rounded-full text-[11px] font-label-caps text-[#c5a059] tracking-wider">
                  <Sparkles size={12} />
                  <span>MUSEUM PATRON & CURATOR</span>
                </div>
              </div>

              {/* Member Stats Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-center">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <Bookmark size={18} className="text-[#c5a059] mx-auto mb-1" />
                  <span className="font-serif text-xl text-white font-bold block">{savedCount}</span>
                  <span className="font-label-caps text-[10px] text-white/50 tracking-wider">SAVED ARTWORKS</span>
                </div>

                {/* Followed Artists Interactive Box */}
                <div
                  className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer group"
                  onClick={() => setShowFollowedList(!showFollowedList)}
                >
                  <Users size={18} className="text-[#c5a059] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-serif text-xl text-white font-bold block">{followedList.length}</span>
                  <span className="font-label-caps text-[10px] text-[#c5a059] tracking-wider flex items-center justify-center gap-0.5">
                    <span>FOLLOWED ARTISTS</span>
                    <ChevronRight size={10} />
                  </span>
                </div>
              </div>

              {/* Followed Artists Expandable List */}
              {showFollowedList && (
                <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3 text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-label-caps text-xs text-[#c5a059] font-bold">
                      FOLLOWED MASTERS ({followedList.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFollowedList(false)}
                      className="text-xs text-white/50 hover:text-white bg-transparent border-0 cursor-pointer"
                    >
                      Hide
                    </button>
                  </div>

                  {followedList.length === 0 ? (
                    <p className="text-xs text-white/40 py-2 text-center">
                      You are not following any artists yet. Tap follow on any artwork reel!
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {followedList.map((artistName) => (
                        <div
                          key={artistName}
                          className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-[#c5a059]/30 transition-colors"
                        >
                          <span
                            className="font-serif text-xs text-white font-medium cursor-pointer hover:text-[#c5a059]"
                            onClick={() => {
                              if (onOpenArtistProfile) onOpenArtistProfile(artistName);
                              onClose();
                            }}
                          >
                            {artistName}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleFollowArtist(artistName)}
                            className="p-1 text-white/40 hover:text-rose-400 bg-transparent border-0 cursor-pointer"
                            title={`Unfollow ${artistName}`}
                          >
                            <UserMinus size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-label-caps text-xs tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                <span>SIGN OUT OF ACCOUNT</span>
              </button>
            </div>
          )
        ) : (
          /* LOGIN / REGISTER FORM */
          <div className="p-6 md:p-8 space-y-6">
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
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-sans">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#c5a059] hover:bg-[#ffdea5] text-black font-label-caps text-xs tracking-widest font-bold rounded-xl transition-all border-0 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? 'PROCESSING...' : (isRegisterMode ? 'CREATE MEMBERSHIP' : 'SIGN IN TO SCROLLS')}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="font-sans text-[11px] text-white/40">
                {isRegisterMode ? 'Already a member?' : "Don't have a museum membership?"}{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(!isRegisterMode); setErrorMsg(''); }}
                  className="text-[#c5a059] hover:underline font-semibold bg-transparent border-0 cursor-pointer"
                >
                  {isRegisterMode ? 'Sign In' : 'Join Now'}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
