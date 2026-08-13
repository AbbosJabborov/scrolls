import React from 'react';
import { CATEGORIES } from '../data/artworksData';

export default function FilterBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-bar">
      <div className="filter-pills-container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
