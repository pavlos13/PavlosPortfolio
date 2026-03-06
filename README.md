# Pavlos Konstantinou – Portfolio

A modern, responsive single-page portfolio built with **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- Single-page layout with smooth scroll navigation
- Dark mode (toggle + system preference, persisted in `localStorage`)
- Mobile-first responsive design (sm, md, lg breakpoints)
- Sections: Hero, About, Experience, Projects, Education, Skills, Certifications, Contact
- **Cooking** skill card links to `/cooking` – a page that can list your YouTube cooking videos with descriptions (optional API key)
- Subtle animations (fade-in, slide-up, hover) via Framer Motion
- Semantic HTML and accessibility (ARIA labels, keyboard navigation)
- Lucide React icons

## Setup

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Project structure

```
src/
├── components/     # Navbar, Footer, SectionHeader, ProjectCard, TimelineItem, ThemeToggle
├── sections/       # Hero, About, Experience, Projects, Education, Skills, Certifications, Contact
├── data/           # profile.ts – edit this to update your content
├── types/          # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css       # Tailwind directives + base styles
```

To update your info, edit `src/data/profile.ts`. Replace the placeholder profile photo URL with your own image (or keep `https://via.placeholder.com/256`). Update LinkedIn and GitHub URLs in `socialLinks` to your real profiles.

### Cooking videos page

Clicking the **Cooking** skill card goes to `/cooking`, which lists all videos from [your YouTube channel](https://www.youtube.com/@pavlosrev). Videos play in a modal on the same page (no redirect to YouTube unless the user clicks "Open on YouTube").

**To show all channel videos**, use either option:

1. **Runtime (API key)**  
   Add to `.env`:
   ```
   VITE_YOUTUBE_API_KEY=your_youtube_data_api_key
   ```
   Get a key from [Google Cloud Console](https://console.cloud.google.com/) (enable YouTube Data API v3). The page will fetch all uploads when visitors load it.

2. **Static list (no key in browser)**  
   Run once (with your API key in `.env` or as env var):
   ```bash
   npm run fetch-cooking-videos
   ```
   This writes `public/cooking-videos.json`. Commit that file; the site will load it and show all videos without using the API key in the browser.
