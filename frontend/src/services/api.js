const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://api-scrolls.claive.uz/api';
  }
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Auth token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('scrolls_access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Authentication API Services
export async function registerUser(username, email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok && data.access) {
      localStorage.setItem('scrolls_access_token', data.access);
      localStorage.setItem('scrolls_refresh_token', data.refresh);
      localStorage.setItem('scrolls_user', JSON.stringify(data.user));
      return { user: data.user };
    }
    return { error: data.error || 'Registration failed' };
  } catch (err) {
    return { error: 'Network error during registration' };
  }
}

export async function loginUser(username, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.access) {
      localStorage.setItem('scrolls_access_token', data.access);
      localStorage.setItem('scrolls_refresh_token', data.refresh);
      
      // Fetch full profile info
      const profile = await getCurrentUser(data.access);
      const userObj = profile || { username };
      localStorage.setItem('scrolls_user', JSON.stringify(userObj));
      return { user: userObj };
    }
    return { error: 'Invalid username or password' };
  } catch (err) {
    return { error: 'Network error during login' };
  }
}

export async function getCurrentUser(tokenOverride = null) {
  try {
    const token = tokenOverride || localStorage.getItem('scrolls_access_token');
    if (!token) return null;

    const res = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('scrolls_access_token');
  localStorage.removeItem('scrolls_refresh_token');
  localStorage.removeItem('scrolls_user');
}

// Artwork & Social API Services
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
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
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
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
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
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ text, author_name: authorName })
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
