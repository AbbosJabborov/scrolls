const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchBackendArtworks(category = 'All Classics') {
  try {
    let url = `${API_BASE_URL}/artworks/`;
    if (category && category !== 'All Classics') {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('Backend API connection failed, falling back to client dataset:', err);
    return null;
  }
}

export async function toggleLikeBackend(artworkId) {
  try {
    const res = await fetch(`${API_BASE_URL}/social/artworks/${artworkId}/like/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function toggleSaveBackend(artworkId) {
  try {
    const res = await fetch(`${API_BASE_URL}/social/artworks/${artworkId}/save/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function postCommentBackend(artworkId, text, authorName = 'ArtLover') {
  try {
    const res = await fetch(`${API_BASE_URL}/social/artworks/${artworkId}/comments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author_name: authorName })
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
