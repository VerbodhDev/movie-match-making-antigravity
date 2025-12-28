# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture

Movie Matchmaker is a Tinder-style movie discovery app built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Framer Motion.

### Key Patterns

**Path Aliases**: Use `@/*` to import from `src/*` (e.g., `@/components/Deck`).

**Theme System**: Three visual themes (`balanced`, `immersive`, `gamified`) controlled by `ThemeContext`. Components conditionally render styles based on `useTheme()`. Theme persists in localStorage under `movie-matchmaker-theme`.

**Watchlist State**: Global state via `WatchlistContext` with localStorage persistence (`movie-matchmaker-watchlist`). Access with `useWatchlist()` hook.

**Swipe Interaction**: The `Deck` component manages card stack state. `MovieCard` uses Framer Motion's drag gestures with `useMotionValue`/`useTransform` for swipe physics and visual feedback (rotation, opacity, LIKE/NOPE indicators).

### File Structure

- `src/app/` - Next.js App Router pages (home, watchlist)
- `src/components/` - UI components (Deck, MovieCard, ActionButtons, Header, Logo)
- `src/context/` - React Context providers (WatchlistContext, ThemeContext)
- `src/data/movies.ts` - Movie type definition and mock data

### Data Types

```typescript
interface Movie {
    id: string;
    title: string;
    poster: string;      // TMDB image URL
    genre: string[];
    year: number;
    rating: number;
    description: string;
}
```
