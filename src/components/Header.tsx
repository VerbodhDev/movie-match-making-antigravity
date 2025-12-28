'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Heart } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';

export function Header() {
    const { watchlist } = useWatchlist();
    const count = watchlist.length;

    return (
        <header className="w-full px-4 py-3 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <Logo size="md" showText={true} />
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    MovieMatch
                </span>
            </div>

            <Link
                href="/watchlist"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Heart className="w-6 h-6 text-gray-600" />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs font-bold text-white bg-pink-500 rounded-full">
                        {count > 99 ? '99+' : count}
                    </span>
                )}
            </Link>
        </header>
    );
}
