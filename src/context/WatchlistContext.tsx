'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Movie } from '@/data/movies';

interface WatchlistContextType {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: string) => void;
    isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const STORAGE_KEY = 'movie-matchmaker-watchlist';

// Initialize from localStorage (runs only on client)
function getInitialWatchlist(): Movie[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const [watchlist, setWatchlist] = useState<Movie[]>(getInitialWatchlist);
    const isFirstRender = useRef(true);

    // Save to localStorage whenever watchlist changes (skip first render)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = useCallback((movie: Movie) => {
        setWatchlist((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    }, []);

    const removeFromWatchlist = useCallback((id: string) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== id));
    }, []);

    const isInWatchlist = useCallback((id: string) => {
        return watchlist.some((m) => m.id === id);
    }, [watchlist]);

    const value = React.useMemo(() => ({
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
    }), [watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist]);

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
}
