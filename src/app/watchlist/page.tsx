'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import Link from 'next/link';
import { Trash2, Star, Calendar, ChevronLeft, Heart } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion';

export default function WatchlistPage() {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="container mx-auto px-4 py-6 max-w-2xl">
                {/* Page Title & Back Link */}
                <div className="flex items-center gap-3 mb-6">
                    <Link
                        href="/"
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Your Watchlist
                    </h1>
                    <span className="ml-auto text-sm font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                        {watchlist.length} Movies
                    </span>
                </div>

                {watchlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-gray-900">Your watchlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm">Swipe right on movies to add them to your watchlist.</p>
                        <Link
                            href="/"
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition shadow-lg"
                        >
                            Discover Movies
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {watchlist.map((movie) => (
                            <motion.div
                                key={movie.id}
                                className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                {/* Poster */}
                                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <Image
                                        src={movie.poster}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate">{movie.title}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                                            {movie.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {movie.year}
                                        </span>
                                    </div>
                                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                        {movie.genre[0]}
                                    </span>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromWatchlist(movie.id)}
                                    className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove from watchlist"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
