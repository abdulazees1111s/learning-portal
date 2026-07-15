import { useState, useEffect } from 'react';

export function useBookmarks(videoId) {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(`bookmarks_${videoId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`bookmarks_${videoId}`, JSON.stringify(bookmarks));
  }, [bookmarks, videoId]);

  const addBookmark = (timestamp, title) => {
    const newBookmark = {
      id: crypto.randomUUID(),
      videoId,
      timestamp,
      title: title.trim() || `Bookmark at ${formatTime(timestamp)}`,
      createdAt: new Date().toISOString()
    };
    setBookmarks(prev => [...prev, newBookmark].sort((a, b) => a.timestamp - b.timestamp));
  };

  const deleteBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return { bookmarks, addBookmark, deleteBookmark, formatTime };
}