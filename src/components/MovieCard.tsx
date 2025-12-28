'use client';

import { motion, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';
import { Movie } from '@/data/movies';
import { Star, Calendar, Play } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';

interface MovieCardProps {
    movie: Movie;
    onSwipe: (direction: 'left' | 'right') => void;
    style?: React.CSSProperties;
    drag?: boolean;
}

export interface MovieCardRef {
    swipeLeft: () => void;
    swipeRight: () => void;
}

export const MovieCard = forwardRef<MovieCardRef, MovieCardProps>(
    function MovieCard({ movie, onSwipe, style, drag = false }, ref) {
        const x = useMotionValue(0);
        const rotate = useTransform(x, [-200, 200], [-25, 25]);
        const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0, 1, 1, 1, 0]);

        // Visual cues for swiping
        const likeOpacity = useTransform(x, [0, 100], [0, 1]);
        const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

        // Expose swipe methods to parent
        useImperativeHandle(ref, () => ({
            swipeLeft: () => {
                animate(x, -400, {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    onComplete: () => onSwipe('left')
                });
            },
            swipeRight: () => {
                animate(x, 400, {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    onComplete: () => onSwipe('right')
                });
            }
        }));

        const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const threshold = 100;
            if (info.offset.x > threshold) {
                animate(x, 400, { type: 'spring', stiffness: 300, damping: 30 });
                setTimeout(() => onSwipe('right'), 200);
            } else if (info.offset.x < -threshold) {
                animate(x, -400, { type: 'spring', stiffness: 300, damping: 30 });
                setTimeout(() => onSwipe('left'), 200);
            } else {
                animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
            }
        };

        return (
            <motion.div
                style={{
                    x,
                    rotate,
                    opacity,
                    ...style,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    cursor: drag ? 'grab' : 'default',
                }}
                drag={drag ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
                className="w-full max-w-[360px] h-[520px] rounded-2xl overflow-hidden shadow-xl select-none bg-white"
            >
                {/* Full card is the image with overlay */}
                <div className="relative w-full h-full">
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover pointer-events-none"
                        draggable={false}
                        unoptimized
                    />

                    {/* Gradient overlay at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Watch Trailer Button */}
                    <button
                        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-black/70 transition-colors"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " official trailer")}`, '_blank')}
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Trailer
                    </button>

                    {/* Swipe Indicators */}
                    {drag && (
                        <>
                            <motion.div
                                style={{ opacity: likeOpacity }}
                                className="absolute top-8 left-6 z-30 border-4 border-green-500 rounded-xl transform -rotate-12 pointer-events-none bg-green-500/20"
                            >
                                <span className="text-3xl font-bold text-green-500 px-4 py-2 uppercase tracking-wider">Like</span>
                            </motion.div>
                            <motion.div
                                style={{ opacity: nopeOpacity }}
                                className="absolute top-8 right-6 z-30 border-4 border-red-500 rounded-xl transform rotate-12 pointer-events-none bg-red-500/20"
                            >
                                <span className="text-3xl font-bold text-red-500 px-4 py-2 uppercase tracking-wider">Nope</span>
                            </motion.div>
                        </>
                    )}

                    {/* Movie Info Overlay - Tinder style at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">
                            {movie.title}
                        </h2>

                        {/* Rating & Year Row */}
                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-semibold text-sm">{movie.rating}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-200">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{movie.year}</span>
                            </div>
                        </div>

                        {/* Genre Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {movie.genre.slice(0, 3).map((g) => (
                                <span
                                    key={g}
                                    className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm font-medium"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }
);
