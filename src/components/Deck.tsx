'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Movie } from '@/data/movies';
import { MovieCard, MovieCardRef } from './MovieCard';
import { ActionButtons } from './ActionButtons';
import { useWatchlist } from '@/context/WatchlistContext';

interface DeckProps {
    movies: Movie[];
}

export function Deck({ movies }: DeckProps) {
    const [index, setIndex] = useState(0);
    const { addToWatchlist } = useWatchlist();
    const cardRef = useRef<MovieCardRef>(null);

    const currentMovie = movies[index];

    const handleSwipeComplete = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            addToWatchlist(currentMovie);
        }
        setIndex((prev) => prev + 1);
    };

    const handlePassClick = () => {
        cardRef.current?.swipeLeft();
    };

    const handleLikeClick = () => {
        cardRef.current?.swipeRight();
    };

    const hasMoreMovies = index < movies.length;

    if (!hasMoreMovies) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">You&apos;ve seen all movies!</h2>
                <p className="text-gray-500 mb-8">Check back later for more recommendations.</p>
                <button
                    onClick={() => setIndex(0)}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition shadow-lg"
                >
                    Start Over
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            {/* Card Stack Container */}
            <div className="relative w-full h-[520px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    {/* Next card (behind) */}
                    {index + 1 < movies.length && (
                        <MovieCard
                            key={movies[index + 1].id}
                            movie={movies[index + 1]}
                            onSwipe={() => { }}
                            style={{
                                scale: 0.95,
                                y: 10,
                                zIndex: 0,
                                opacity: 0.5,
                            }}
                        />
                    )}

                    {/* Current card */}
                    <MovieCard
                        ref={cardRef}
                        key={currentMovie.id}
                        movie={currentMovie}
                        onSwipe={handleSwipeComplete}
                        drag={true}
                        style={{ zIndex: 10 }}
                    />
                </AnimatePresence>
            </div>

            {/* Action Buttons - Below the card */}
            <ActionButtons
                onLike={handleLikeClick}
                onPass={handlePassClick}
                disabled={!hasMoreMovies}
            />
        </div>
    );
}
