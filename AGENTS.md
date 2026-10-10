# Bookito | بوکیتو — Base44 Dev Environment

## Overview
Persian online bookstore built with React + TypeScript + Vite + Tailwind CSS.

## Running in the Sandbox
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- App runs on port 3000 (Vite dev server with live reload).
- Dependencies install automatically on container startup via `npm install`.
- Source is bind-mounted, so edits appear via live reload.

## Tech Stack
- React 18 + TypeScript
- Vite 5 (dev server with HMR)
- Tailwind CSS 3
- React Router 6
- Lucide React icons
- Vazirmatn (Persian font, CDN)
- Playfair Display (Latin serif, Google Fonts)

## Key Files
- `docker-compose.base44.yml` — sandbox run configuration
- `.base44/environment.json` — Base44 metadata
- `src/` — application source
  - `components/` — reusable UI components
  - `pages/` — route pages
  - `data/` — mock data (books, authors, collections)
  - `context/` — cart state (localStorage-persisted)
  - `utils/` — formatting helpers (Persian digits, prices)

## Notes
- This is a frontend-only demo. Cart persists to localStorage.
- Checkout is a demo flow — no real payment is processed.
- Authentication is in demo mode (no backend).
- Book covers are CSS-rendered (no external image dependencies).
