import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_ARTWORKS } from './data/artworksData';
import { fetchBackendArtworks, toggleLikeBackend, toggleSaveBackend, postCommentBackend, getCurrentUser, logoutUser } from './services/api';
import Header from './components/Header';
import ArtworkCard from './components/ArtworkCard';
import BottomNavBar from './components/BottomNavBar';
import CommentsDrawer from './components/CommentsDrawer';
import ArtworkDetailModal from './components/ArtworkDetailModal';
import ArtistProfileModal from './components/ArtistProfileModal';
import SavedGalleryModal from './components/SavedGalleryModal';
import ShareModal from './components/ShareModal';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shareArtwork, setShareArtwork] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const containerRef = useRef(null);

  // Load User Profile on Mount
  useEffect(() => {
    async function loadUser() {
      const stored = localStorage.getItem('scrolls_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {}
      }
      const verified = await getCurrentUser();
      if (verified) {
        setCurrentUser(verified);
        localStorage.setItem('scrolls_user', JSON.stringify(verified));
      }
    }
    loadUser();
  }, []);

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

    const sections = containerRef.current?.querySelectorAll('.reel-card-section');
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [filteredArtworks]);

  const currentArtwork = artworks.find((a) => a.id === activeArtworkId) || artworks[0];

  useEffect(() => {
    if (!currentArtwork) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentArtwork.audioUrl);
      audioRef.current.loop = true;
    } else {
      audioRef.current.src = currentArtwork.audioUrl;
    }

    if (!isMuted) {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(false));
    } else {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  }, [activeArtworkId, isMuted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().then(() => {
        setIsMuted(false);
        setIsPlayingAudio(true);
      }).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsMuted(true);
      setIsPlayingAudio(false);
    }
  };

  const toggleLike = async (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const currentlyLiked = likedIds.has(id);
          return {
            ...art,
            likesCount: currentlyLiked ? art.likesCount - 1 : art.likesCount + 1
          };
        }
        return art;
      })
    );

    await toggleLikeBackend(id);
  };

  const toggleSave = async (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    await toggleSaveBackend(id);
  };

  const toggleFollowArtist = (artistName) => {
    setFollowedArtists((prev) => {
      const next = new Set(prev);
      if (next.has(artistName)) {
        next.delete(artistName);
      } else {
        next.add(artistName);
      }
      return next;
    });
  };

  const handleAddComment = async (artworkId, text) => {
    const userAuthor = currentUser ? currentUser.username : 'Curator';

    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === artworkId) {
          const newComment = {
            id: Date.now(),
            user: userAuthor,
            avatar: userAuthor[0].toUpperCase(),
            time: 'Just now',
            text,
            likes: 0
          };
          return {
            ...art,
            comments: [newComment, ...(art.comments || [])]
          };
        }
        return art;
      })
    );

    await postCommentBackend(artworkId, text, userAuthor);
  };

  const scrollToArtworkId = (id) => {
    const el = containerRef.current?.querySelector(`[data-artwork-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveArtworkId(id);
    }
  };

  const savedArtworks = artworks.filter((a) => savedIds.has(a.id));

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <div className="app-viewport">
      {/* Top Header Bar */}
      <Header
        savedCount={savedIds.size}
        onOpenSaved={() => setShowSavedModal(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenProfile={() => setShowAuthModal(true)}
        currentUser={currentUser}
      />

      {/* Vertical Snap-Scroll Reel Feed */}
      <main className="feed-snap-container" ref={containerRef}>
        {filteredArtworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <p className="text-lg">No artworks found.</p>
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
        onOpenProfile={() => setShowAuthModal(true)}
        currentUser={currentUser}
      />

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
          onShowToast={() => {}}
        />
      )}

      {showSearchModal && (
        <SearchModal
          artworks={artworks}
          onClose={() => setShowSearchModal(false)}
          onSelectArtwork={scrollToArtworkId}
        />
      )}

      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          onLoginSuccess={(user) => setCurrentUser(user)}
          onLogout={handleLogout}
          onClose={() => setShowAuthModal(false)}
          savedCount={savedIds.size}
        />
      )}
    </div>
  );
}
