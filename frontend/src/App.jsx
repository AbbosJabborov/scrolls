import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_ARTWORKS } from './data/artworksData';
import { fetchBackendArtworks, toggleLikeBackend, toggleSaveBackend, postCommentBackend } from './services/api';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ArtworkCard from './components/ArtworkCard';
import BottomNavBar from './components/BottomNavBar';
import CommentsDrawer from './components/CommentsDrawer';
import ArtworkDetailModal from './components/ArtworkDetailModal';
import ArtistProfileModal from './components/ArtistProfileModal';
import SavedGalleryModal from './components/SavedGalleryModal';
import ShareModal from './components/ShareModal';
import SearchModal from './components/SearchModal';
import { Volume2, Sparkles } from 'lucide-react';

export default function App() {
  const [artworks, setArtworks] = useState(INITIAL_ARTWORKS);
  const [selectedCategory, setSelectedCategory] = useState('All Classics');
  const [activeTab, setActiveTab] = useState('for-you');

  const [activeArtworkId, setActiveArtworkId] = useState(INITIAL_ARTWORKS[0].id);

  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [followedArtists, setFollowedArtists] = useState(new Set());

  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const [activeCommentsArtId, setActiveCommentsArtId] = useState(null);
  const [activeDetailArtId, setActiveDetailArtId] = useState(null);
  const [activeArtistName, setActiveArtistName] = useState(null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [shareArtwork, setShareArtwork] = useState(null);

  const [toasts, setToasts] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    async function loadArtworks() {
      const backendData = await fetchBackendArtworks(selectedCategory);
      if (backendData && backendData.length > 0) {
        const transformed = backendData.map((item) => ({
          id: String(item.id),
          title: item.title,
          artist: item.artist_name || 'Unknown Master',
          artistPhoto: item.artist_photo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/800px-Klimt.jpg',
          artistBio: item.artist_bio || '',
          birthDeath: item.birth_death || '',
          nationality: item.nationality || '',
          year: item.year,
          medium: item.medium,
          dimensions: item.dimensions,
          museum: item.museum,
          location: item.location,
          imageUrl: item.image_url,
          shortDescription: item.short_description,
          fullDescription: item.full_description,
          sourceUrl: item.full_description_url || '',
          museumUrl: item.full_description_url || '',
          category: item.category,
          tags: item.tags || [],
          likesCount: item.likes_count || 0,
          savesCount: item.saves_count || 0,
          sharesCount: 1200,
          audioTitle: item.audio_title || 'Classical Symphony',
          audioComposer: item.audio_composer || '',
          audioUrl: item.audio_url || 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Chopin_-_Nocturne_Op._9_No._2_%28orchestral%29.ogg',
          comments: []
        }));
        setArtworks(transformed);
        if (transformed[0]) {
          setActiveArtworkId(transformed[0].id);
        }
      }
    }
    loadArtworks();
  }, [selectedCategory]);

  const filteredArtworks = artworks.filter((art) => {
    if (selectedCategory === 'All Classics') return true;
    return art.category === selectedCategory;
  });

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-artwork-id');
          if (id) {
            setActiveArtworkId(id);
          }
        }
      });
    }, observerOptions);

    const cards = containerRef.current?.querySelectorAll('.reel-card-wrapper');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredArtworks]);

  const activeArtwork = artworks.find((a) => a.id === activeArtworkId) || artworks[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    if (activeArtwork && activeArtwork.audioUrl) {
      audioRef.current.src = activeArtwork.audioUrl;
      if (!isMuted) {
        audioRef.current
          .play()
          .then(() => setIsPlayingAudio(true))
          .catch(() => setIsPlayingAudio(false));
      } else {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
    }
  }, [activeArtworkId, isMuted]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          showToast(`Playing soundtrack: ${activeArtwork?.audioTitle || 'Classical'} 🎵`);
        })
        .catch(() => {
          setIsPlayingAudio(false);
        });
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      showToast('Soundtrack muted');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToRelative(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToRelative(-1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        toggleMute();
      } else if (e.key.toLowerCase() === 'l') {
        toggleLike(activeArtworkId);
      } else if (e.key.toLowerCase() === 's') {
        toggleSave(activeArtworkId);
      } else if (e.key.toLowerCase() === 'c') {
        setActiveCommentsArtId(activeArtworkId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArtworkId, isMuted, filteredArtworks]);

  const scrollToRelative = (delta) => {
    const idx = filteredArtworks.findIndex((a) => a.id === activeArtworkId);
    if (idx === -1) return;

    const nextIdx = Math.max(0, Math.min(filteredArtworks.length - 1, idx + delta));
    const targetArtwork = filteredArtworks[nextIdx];

    if (targetArtwork) {
      const el = containerRef.current?.querySelector(`[data-artwork-id="${targetArtwork.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToArtworkId = (id) => {
    const el = containerRef.current?.querySelector(`[data-artwork-id="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth' });
    setActiveArtworkId(id);
  };

  const toggleLike = async (artId) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(artId)) {
        next.delete(artId);
        showToast('Removed from liked artworks');
      } else {
        next.add(artId);
        showToast('Liked masterpiece! ❤️');
      }
      return next;
    });
    await toggleLikeBackend(artId);
  };

  const toggleSave = async (artId) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(artId)) {
        next.delete(artId);
        showToast('Removed from saved collection');
      } else {
        next.add(artId);
        showToast('Saved to your exhibition 🔖');
      }
      return next;
    });
    await toggleSaveBackend(artId);
  };

  const toggleFollowArtist = (artistName) => {
    setFollowedArtists((prev) => {
      const next = new Set(prev);
      if (next.has(artistName)) {
        next.delete(artistName);
        showToast(`Unfollowed ${artistName}`);
      } else {
        next.add(artistName);
        showToast(`Now following ${artistName} ✨`);
      }
      return next;
    });
  };

  const handleAddComment = async (artId, text) => {
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id !== artId) return art;
        const newComment = {
          id: `c_${Date.now()}`,
          user: 'You',
          avatar: '✨',
          text,
          time: 'Just now',
          likes: 0
        };
        return {
          ...art,
          comments: [newComment, ...art.comments]
        };
      })
    );
    showToast('Comment published! 💬');
    await postCommentBackend(artId, text);
  };

  const savedArtworks = artworks.filter((a) => savedIds.has(a.id));

  return (
    <div className="app-viewport">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast-item">
            <Sparkles size={14} className="text-amber-400" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Desktop & Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.size}
        onOpenSaved={() => setShowSavedModal(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenSearch={() => setShowSearchModal(true)}
      />

      {/* Category Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Vertical Snap-Scroll Reel Feed */}
      <main className="feed-snap-container" ref={containerRef}>
        {filteredArtworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <p className="text-lg">No artworks found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All Classics')}
              className="mt-4 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl"
            >
              Reset Category
            </button>
          </div>
        ) : (
          filteredArtworks.map((artwork) => (
            <section key={artwork.id} className="reel-card-section">
              <ArtworkCard
                artwork={artwork}
                isLiked={likedIds.has(artwork.id)}
                isSaved={savedIds.has(artwork.id)}
                isFollowingArtist={followedArtists.has(artwork.artist)}
                onToggleLike={toggleLike}
                onToggleSave={toggleSave}
                onToggleFollowArtist={toggleFollowArtist}
                onOpenComments={(id) => setActiveCommentsArtId(id)}
                onOpenDetail={(id) => setActiveDetailArtId(id)}
                onOpenArtistProfile={(name) => setActiveArtistName(name)}
                onOpenShare={(art) => setShareArtwork(art)}
                isPlayingAudio={isPlayingAudio && activeArtworkId === artwork.id}
                onToggleAudio={toggleMute}
              />
            </section>
          ))
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Google Stitches) */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedIds.size}
        onOpenSaved={() => setShowSavedModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
      />

      {/* Floating Audio Tap Banner if Muted */}
      {isMuted && (
        <div
          onClick={toggleMute}
          className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-30 bg-amber-500/90 hover:bg-amber-400 text-black font-bold text-xs px-4 py-2 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <Volume2 size={16} />
          <span>Tap to unmute classical soundtrack</span>
        </div>
      )}

      {/* Modals & Drawers */}
      {activeCommentsArtId && (
        <CommentsDrawer
          artwork={artworks.find((a) => a.id === activeCommentsArtId)}
          onClose={() => setActiveCommentsArtId(null)}
          onAddComment={handleAddComment}
        />
      )}

      {activeDetailArtId && (
        <ArtworkDetailModal
          artwork={artworks.find((a) => a.id === activeDetailArtId)}
          onClose={() => setActiveDetailArtId(null)}
          onToggleLike={toggleLike}
          onToggleSave={toggleSave}
          isLiked={likedIds.has(activeDetailArtId)}
          isSaved={savedIds.has(activeDetailArtId)}
        />
      )}

      {activeArtistName && (
        <ArtistProfileModal
          artistName={activeArtistName}
          artworks={artworks}
          isFollowing={followedArtists.has(activeArtistName)}
          onToggleFollow={toggleFollowArtist}
          onClose={() => setActiveArtistName(null)}
          onSelectArtwork={scrollToArtworkId}
        />
      )}

      {showSavedModal && (
        <SavedGalleryModal
          savedArtworks={savedArtworks}
          onClose={() => setShowSavedModal(false)}
          onSelectArtwork={scrollToArtworkId}
          onRemoveSave={toggleSave}
        />
      )}

      {shareArtwork && (
        <ShareModal
          artwork={shareArtwork}
          onClose={() => setShareArtwork(null)}
          onShowToast={showToast}
        />
      )}

      {showSearchModal && (
        <SearchModal
          artworks={artworks}
          onClose={() => setShowSearchModal(false)}
          onSelectArtwork={scrollToArtworkId}
        />
      )}
    </div>
  );
}
