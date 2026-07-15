### Project Overview

This application is a secure, high-performance web-based Learning Portal designed for students to stream educational video content. It features an interactive, real-time workspace that allows students to study effectively by taking customizable video notes (bookmarks) and pausing or resuming their lectures seamlessly.

The application is built with a strong focus on content security, incorporating front-end mitigation techniques to deter unauthorized screen-capturing, video downloading, or content sharing.

---

### Technology Stack

* **Frontend Library**: React (built using the Vite build system for sub-second hot module reloading)
* **Styling Engine**: Tailwind CSS v4 (leveraging its native CSS-based compilation and performance gains)
* **Icons**: Lucide React (for lightweight, modern UI symbols)
* **State Management & Persistence**: Custom React Hooks coupled with HTML5 LocalStorage API
* **Video Media Engine**: HTML5 native Video API

---

### Project File Structure

The project follows a modular, clean architectural separation of concerns:

```text
src/
├── components/
│   ├── VideoPlayer.jsx       # Renders video player DOM, manages watermark overlays and blur security state
│   └── BookmarkList.jsx      # Maps and lists saved bookmarks, handles seek execution and deletion events
├── hooks/
│   └── useBookmarks.js       # Custom state-machine hook managing bookmark CRUD and local storage sync
├── App.jsx                   # Central page hub containing visibility listeners and layout grid
├── index.css                 # Import entry-point for Tailwind v4 compiler
└── main.jsx                  # React DOM viewport root mounting point

```

---

### Core Functions

* **Time-Synchronized Bookmarking**: Students can mark specific times in a video. Clicking any bookmark instantly passes the coordinate to the player ref, moving the playhead back to that precise second.
* **Focus-Loss Video Blurring**: Tracks active user focus. The moment a user clicks away from the browser viewport or triggers a screenshot program, a security blur class is applied to hide the video frames.
* **Dynamic Traceability Overlays**: Generates low-opacity text elements with active session details (such as user email and active session tags) directly over the playing video frame to deter illegal external recording.
* **Right-Click Deterrence**: Intercepts and blocks context menu generation over the video canvas wrapper to block standard "Save Video As..." browser tricks.

---

### Implemented Upgrades

* **Continue Watching (Session Auto-Resume)**: Every frame change of the video updates a secure record of current playback progress. If the student closes the page, opens a different tab, or refreshes the browser, the application reads the cached progress on load and immediately seeks to that position.
* **Dynamic Empty States**: The bookmark container renders an interactive contextual state when no bookmarks exist, prompting the student on how to begin.
* **Responsive Adaptive Grid**: The workspace layout transitions from a side-by-side desktop view to an stacked vertical layout on mobile, keeping both the video and bookmark notes accessible on smaller devices.
