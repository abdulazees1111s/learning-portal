#Learning Portal

A high-performance, student-centric Learning Portal built with React and Tailwind CSS v4. This portal delivers a seamless video-learning experience complete with live dynamic video bookmarking, session playback auto-resumption, and front-end screenshot mitigation and deterrence frameworks.

---

## 🚀 Key Features

*   **Student-Friendly Layout**: A modern, split-pane layout designed around intuitive workspace interfaces. Stacks gracefully on mobile viewports for full responsiveness.
*   **Precision Video Bookmarking**: Capture multiple high-resolution timestamps down to the second. Add optional descriptive titles, view active lists, and click to seek smoothly.
*   **Persistent Storage Model**: Bookmarks and progress markers instantly sync via local application states straight to browser local storage engines.
*   **Continue Watching (Auto-Resume)**: The system hooks into playback frame transitions and caches time positions, returning the student exactly where they left off upon reload.
*   **Multi-Layered Screenshot Protection**: Employs client-side mitigation strategies to discourage content scraping and screen-capturing.

---

## 🛡️ Screenshot & Content Protection Strategy

Because this application runs entirely within standard web browser environments, hardware-level screenshot execution blocking is natively sandboxed out of bounds. To satisfy the requirement effectively, this platform applies a layered **Deterrence, Blurring, and Traceability** framework:

1. **Context & Key Interception**: Mouse right-clicks are explicitly overridden on the video container component to block basic DOM asset inspect loops or "Save Video As" context operations.
2. **Focus State Management**: Using the HTML5 Page Visibility API paired with window `blur`/`focus` browser listeners, the system applies a massive `blur-2xl` CSS utility filter over the viewport the absolute millisecond the browser window loses focus (e.g., when firing up native Snipping Tools or switching view applications).
3. **Dynamic User Watermarking**: Injects an low-opacity, unselectable overlay tracking user session context (`User: student_demo@gvcc.edu`) floating over active frame sequences, rendering unauthorized screen clips or records identifyingly traceable back to the student account.

---

## 💾 System Architecture & Database Design

While this standalone builds on localized storage engines for decoupled, configuration-free testing, it is architected around robust structural schemas designed to map perfectly into external databases (e.g., PostgreSQL, Supabase, or MongoDB):

### Suggested Data Models (Relational Schema)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE videos (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url TEXT NOT NULL,
    duration INT NOT NULL -- stored in total seconds
);

CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    video_id VARCHAR(100) REFERENCES videos(id) ON DELETE CASCADE,
    title VARCHAR(255),
    timestamp DOUBLE PRECISION NOT NULL, -- exact frame offset in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
