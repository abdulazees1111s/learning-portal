import React from 'react';

export function VideoPlayer({ 
  videoRef, 
  isBlurred, 
  userEmail, 
  onTimeUpdate, 
  onLoadedMetadata 
}) {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800 transition-all duration-300 ${
        isBlurred ? 'blur-2xl scale-[0.99] select-none pointer-events-none' : ''
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        className="w-full aspect-video"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />
      
      {/* Dynamic Security Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none text-white font-mono text-2xl font-bold rotate-12">
        STUDENT_2026_SESSION_SECURE
      </div>
      <div className="absolute top-3 left-3 pointer-events-none opacity-40 select-none text-white bg-black/40 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded font-mono">
        User: {userEmail}
      </div>
    </div>
  );
}