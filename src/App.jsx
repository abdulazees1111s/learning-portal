import React, { useRef, useState, useEffect } from 'react';
import { useBookmarks } from './hooks/useBookmarks';
import { BookmarkList } from './components/BookmarkList';
import { VideoPlayer } from './components/VideoPlayer';
import { Shield, Video, Bookmark } from 'lucide-react';

export default function App() {
  const videoId = "gvcc-sample-lecture-1";
  const videoRef = useRef(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const { bookmarks, addBookmark, deleteBookmark, formatTime } = useBookmarks(videoId);

  // Focus detection for screenshot mitigation
  useEffect(() => {
    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);
    const handleVisibility = () => document.hidden ? setIsBlurred(true) : setIsBlurred(false);

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Save progress as the video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      localStorage.setItem(`${videoId}_last_position`, videoRef.current.currentTime);
    }
  };

  // Restore progress on video metadata load
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const savedTime = localStorage.getItem(`${videoId}_last_position`);
      if (savedTime) {
        videoRef.current.currentTime = parseFloat(savedTime);
      }
    }
  };

  const handleCreateBookmark = () => {
    if (!videoRef.current) return;
    addBookmark(videoRef.current.currentTime, bookmarkTitle);
    setBookmarkTitle("");
  };

  const handleSeek = (timestamp) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Video size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">GVCC Learning Portal</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full">
          <Shield size={14} /> Screen Protection Active
        </div>
      </header>

      {/* Workspace Grid */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Top Columns: Video Player Interface */}
        <div className="lg:col-span-2 space-y-4">
          <VideoPlayer 
            videoRef={videoRef} 
            isBlurred={isBlurred} 
            userEmail="student_demo@gvcc.edu" 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Introduction to Advanced Full-Stack Architecture</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              This module covers architectural paradigms, cross-origin communication models, and performance engineering setups across modern client-side ecosystems.
            </p>
          </div>
        </div>

        {/* Right Column: Bookmarks Management Sidebar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark size={18} className="text-blue-600" /> Video Bookmarks
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Timestamps are automatically synchronized down to the second.</p>
          </div>

          {/* Create Input Group */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Note or Title (Optional)"
              value={bookmarkTitle}
              onChange={(e) => setBookmarkTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button
              onClick={handleCreateBookmark}
              className="w-full bg-blue-600 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add Current Timestamp
            </button>
          </div>

          <hr className="border-slate-100" />

          {/* Bookmarks Display List Component */}
          <BookmarkList 
            bookmarks={bookmarks} 
            onSeek={handleSeek} 
            onDelete={deleteBookmark} 
            formatTime={formatTime} 
          />
        </div>
      </main>
    </div>
  );
}