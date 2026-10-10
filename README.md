# بوکیتو | Bookito

مرجع کتاب‌های کلاسیک، رمان‌های ماندگار و آثار برگزیده جهان.

A premium Persian online bookstore built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 Premium editorial design with forest-green hero, terracotta accents, and gold highlights
- 📚 Full RTL Persian interface with Vazirmatn font
- 🔍 Search and filter by category, author, and price range
- 🛒 Functional shopping cart with localStorage persistence
- 📦 Checkout flow with form validation (demo mode)
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible navigation, focus states, and semantic HTML
- 🎭 CSS-rendered book covers (no external image dependencies)

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — dev server with HMR
- **Tailwind CSS 3** — styling
- **React Router 6** — routing
- **Lucide React** — icons
- **Vazirmatn** — Persian font
- **Playfair Display** — Latin serif font

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs on `http://localhost:3000`.

## Project Structure

```
src/
├── components/    # Reusable UI components (Header, Footer, BookCard, etc.)
├── pages/         # Route pages (Home, Books, BookDetail, Cart, Checkout, etc.)
├── data/          # Mock data (books, authors, collections)
├── context/       # Cart state management
├── utils/         # Formatting helpers (Persian digits, prices)
├── types.ts       # TypeScript interfaces
├── App.tsx        # Router setup
├── main.tsx       # Entry point
└── index.css      # Global styles + Tailwind
```

## Design Tokens

| Token | Color | Usage |
|-------|-------|-------|
| Forest | `#142923` | Hero, footer, dark sections |
| Forest Deep | `#0D1B17` | Darkest backgrounds |
| Ivory | `#F7F5F1` | Page background |
| Terracotta | `#A94F24` | CTAs, add-to-cart, accents |
| Gold | `#C69A63` | Highlights, borders, hover states |
| Ink | `#242622` | Primary text |

## Demo Mode

This is a frontend-only demo:
- **Cart**: Persists to localStorage
- **Checkout**: Demo flow — no real payment is processed
- **Authentication**: Demo mode — no backend
- **Data**: Mock data in `src/data/`

To enable real e-commerce functionality, integrate a backend with:
- Database (PostgreSQL + Prisma recommended)
- Authentication (session-based)
- Payment gateway
- Admin CRUD operations

## Environment Variables

See `.env.example` for available variables. No secrets are required for the demo.

## License

© 1405 Bookito | بوکیتو. All rights reserved.
