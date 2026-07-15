import React from 'react';
import { Play, Trash2, BookmarkCheck } from 'lucide-react';

export function BookmarkList({ bookmarks, onSeek, onDelete, formatTime }) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8 px-4 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
        <BookmarkCheck className="mx-auto text-slate-300 mb-2" size={28} />
        <p className="text-sm text-slate-400 font-medium">No bookmarks created yet</p>
        <p className="text-xs text-slate-400 mt-0.5">Pause the video at any timestamp to tag a checkpoint.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
      {bookmarks.map((bookmark) => (
        <div 
          key={bookmark.id} 
          className="group flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-lg transition-all"
        >
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-xs font-semibold text-slate-700 truncate">{bookmark.title}</h4>
            <span className="inline-block mt-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
              {formatTime(bookmark.timestamp)}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSeek(bookmark.timestamp)}
              className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
              title="Jump to bookmark"
            >
              <Play size={12} fill="currentColor" />
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all"
              title="Delete entry"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}