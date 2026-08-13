import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

export default function SearchModal({ artworks, onClose, onSelectArtwork }) {
  const [query, setQuery] = useState('');

  const filtered = artworks.filter((art) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      art.title.toLowerCase().includes(q) ||
      art.artist.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.museum.toLowerCase().includes(q)
    );
  });

  const collections = [
    { title: 'Renaissance', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcY1aakbwkLmqjQIi0wp8dDT7twxgbOGRaM5MOh-T16I6QtKOaos3Yhx1675cZYjYjyg2eH32qeynpwFAzVZnedQkQlHndeXJdF7nJSU6Eq-0506KaPTfhYWkZY6MIBD0SNMG6kzmestupmB1yUJD_sqHPHENMdqDZRHqq5ZCX9zQ45hYSkGiLIaQE_yv91Lz0S3x3X8yPRoTL3ncyi_c8gq8VaaQteAfX22YMOqYXZTBazEynNYLBpg' },
    { title: 'Baroque', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFXYM7CWxvabkmAqorntRCi1tsqvGS7Zg4Coq3q7YRC5VUrWZPPaxOcvRDxImOZjDiXOSceeHKCAnh8PJ3QLXphFME-_dz_e35rh14l5RLDpKqOIHcuie__uWTJBG6FWvyAF78zqLuUeK92JrgTJc_kveKxNPZsWhzfl51TT72oC0xjdbuIvakc74dxlKO74G13Dmz1Fc9e-CWEm-kl-koICMizdOduLUgoK1vhHHxXSEXtwC4ssOt_A' },
    { title: 'Impressionism', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFuG9ttxAsAY3QBTv0fJoJu3yXK-Xyuzh8K6E8n53U40ynT5tyszn2dlRZ-eYlJX2lSdXwZh8EFG4HIsH9k1lxE5FQDnClWBm4l7YcngHdYxNhaYra2vzB5fFgrX3a0MA2snXj2eDbGnremhYyTYCFgdqMDI1ZfJIroHWQt3tHrSeHpZY-3GvccnEVCbEnZBmsgqHnS8FSjnSZfB8FOl413xyvvrtWX050CiMs2U7ea3N4rWoaxBX7bw' },
    { title: 'Post-Impressionism', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7O3v6jPllOUdP7dhwChytgY1YZZdbH_q2K0h1n-tSqunlT3uUvTD-614vO4rUgeW_4jsdqs6CuGjvJP2izUYCuJ9Os-qE-p2mIY4M-HBWo8OmIiPq9hn-fWA4HJW9DbEdoAcnX9jAyrnPGUUnGaKmkRLM2Ok_98gTB-bM3G6_p_a_tkq39_GJRvhErrn3KpLYOT7wqAswlLFrjnPK-dHBpWyKCsYYGjupBFtcO_UEkXm4CbgQZNTs-g' }
  ];

  return (
    <div className="modal-overlay-ivory" onClick={onClose}>
      <div
        className="modal-content-ivory overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E5E1DA]">
          <span className="font-headline-md text-xl tracking-widest text-black">SCROLLS DISCOVER</span>
          <button onClick={onClose} className="p-2 text-black hover:opacity-75">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          {/* Search Input Bar (Single Bottom Underline) */}
          <div className="relative mb-10 border-b-2 border-black group">
            <Search size={20} className="absolute left-0 bottom-3 text-black/60" />
            <input
              type="text"
              autoFocus
              placeholder="Search eras, artists, or collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none pl-8 pr-4 py-3 font-label-caps text-sm text-black placeholder:text-black/40 focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Curated Collections Grid */}
          {!query && (
            <div className="mb-12">
              <h2 className="font-title-lg text-lg text-black uppercase tracking-widest mb-6">
                Curated Collections
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {collections.map((col, idx) => (
                  <div
                    key={idx}
                    onClick={() => setQuery(col.title)}
                    className="editorial-frame group cursor-pointer aspect-square relative overflow-hidden bg-black/10"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${col.img})` }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <h3 className="font-headline-md text-xl text-white text-center px-2">
                        {col.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div>
            <h2 className="font-title-lg text-lg text-black uppercase tracking-widest mb-6">
              {query ? `Results for "${query}"` : 'All Masterpieces'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((work) => (
                <div
                  key={work.id}
                  onClick={() => {
                    onSelectArtwork(work.id);
                    onClose();
                  }}
                  className="editorial-frame flex items-center gap-4 cursor-pointer hover:border-black transition-colors"
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-16 h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-black text-base truncate">
                      {work.title}
                    </h3>
                    <p className="font-label-sm text-xs text-[#c5a059] font-medium">
                      {work.artist} ({work.year})
                    </p>
                    <p className="font-label-sm text-xs text-[#444748] truncate">
                      {work.museum}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-black/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
