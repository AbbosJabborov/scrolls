import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

export default function SavedGalleryModal({
  savedArtworks,
  onClose,
  onSelectArtwork,
  onRemoveSave
}) {
  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 110 }}>
      <div className="drawer-content-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Bookmark size={18} fill="#f59e0b" />
            <span>Saved Masterpieces ({savedArtworks.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {savedArtworks.length === 0 ? (
            <div className="text-center text-slate-400 py-16">
              <Bookmark size={48} className="mx-auto mb-3 opacity-30 text-amber-400" />
              <h4 className="text-sm font-bold text-white mb-1">Your Collection is Empty</h4>
              <p className="text-xs text-slate-400 max-w-[220px] mx-auto">
                Tap the bookmark icon on any artwork reel to save it to your personal exhibition space.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {savedArtworks.map((work) => (
                <div
                  key={work.id}
                  className="flex gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all group relative cursor-pointer"
                  onClick={() => {
                    onSelectArtwork(work.id);
                    onClose();
                  }}
                >
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white truncate">
                        {work.title}
                      </h4>
                      <p className="text-xs text-amber-400 font-medium">
                        {work.artist} ({work.year})
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {work.museum}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300 font-semibold pt-1">
                      <span className="text-amber-500 flex items-center gap-1 group-hover:underline">
                        Jump to reel <ArrowRight size={12} />
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSave(work.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
