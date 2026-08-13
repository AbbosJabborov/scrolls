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

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-content-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} color="#fe2c55" />
            <h3 className="drawer-title">
              Comments ({artwork.comments.length})
            </h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body - Comment List */}
        <div className="drawer-body">
          {artwork.comments.length === 0 ? (
            <div className="text-center text-slate-400 py-12">
              <p>No comments yet. Be the first art enthusiast to share a thought!</p>
            </div>
          ) : (
            <div className="comments-list">
              {artwork.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    {comment.avatar || '🎨'}
                  </div>
                  <div className="comment-content">
                    <div className="comment-user-row">
                      <span className="comment-user-name">@{comment.user}</span>
                      <span className="comment-time">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    {comment.likes !== undefined && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <Heart size={12} color="#fe2c55" />
                        <span>{comment.likes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer - New Comment Form */}
        <form className="comment-input-footer" onSubmit={handleSubmit}>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment on this masterpiece..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button type="submit" className="comment-send-btn">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
