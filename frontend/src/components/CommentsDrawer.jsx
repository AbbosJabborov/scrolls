import React, { useState } from 'react';
import { X, Send, Heart, MessageSquare } from 'lucide-react';

export default function CommentsDrawer({ artwork, onClose, onAddComment }) {
  const [newCommentText, setNewCommentText] = useState('');

  if (!artwork) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    onAddComment(artwork.id, newCommentText.trim());
    setNewCommentText('');
  };

  const commentsList = artwork.comments || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end flex-col pb-[56px] md:pb-0"
      onClick={onClose}
    >
      {/* Sliding Bottom Sheet */}
      <div
        className="w-full max-w-lg mx-auto bg-[#181818] text-[#F9F7F2] rounded-t-3xl border-t border-white/20 shadow-2xl overflow-hidden flex flex-col h-[65vh] min-h-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1f1f1f]">
          <div className="flex items-center gap-2.5">
            <MessageSquare size={18} className="text-[#c5a059]" />
            <h3 className="font-label-caps text-xs tracking-widest font-semibold text-white">
              CURATORIAL DISCUSSION ({commentsList.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white bg-transparent border-0 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Comment List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#181818]">
          {commentsList.length === 0 ? (
            <div className="text-center text-white/50 py-16 flex flex-col items-center justify-center space-y-2">
              <MessageSquare size={32} className="text-white/20 mb-2" />
              <p className="text-sm font-medium text-white/80">No thoughts shared yet</p>
              <p className="text-xs text-[#c5a059]">Be the first curatorial voice to leave a comment!</p>
            </div>
          ) : (
            commentsList.map((comment) => (
              <div key={comment.id} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-sm flex-shrink-0 border border-[#c5a059]/40 text-[#c5a059] font-bold">
                  {comment.user ? comment.user[0].toUpperCase() : 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs font-semibold text-white">
                      @{comment.user}
                    </span>
                    <span className="text-[10px] text-white/40">{comment.time}</span>
                  </div>
                  <p className="font-body-md text-xs text-white/80 mt-1.5 leading-relaxed">
                    {comment.text}
                  </p>
                  {comment.likes !== undefined && comment.likes > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-[11px] text-white/50">
                      <Heart size={11} className="text-rose-400" fill="#f43f5e" />
                      <span>{comment.likes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Input Footer */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-[#111111] border-t border-white/15 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Add your curatorial thought..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#c5a059] transition-colors"
          />
          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className="w-10 h-10 rounded-full bg-[#c5a059] text-black flex items-center justify-center border-0 cursor-pointer hover:bg-[#ffdea5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
