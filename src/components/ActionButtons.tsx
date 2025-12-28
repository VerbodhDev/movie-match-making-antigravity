'use client';

import { X, Heart } from 'lucide-react';

interface ActionButtonsProps {
    onLike: () => void;
    onPass: () => void;
    disabled?: boolean;
}

export function ActionButtons({ onLike, onPass, disabled }: ActionButtonsProps) {
    return (
        <div className="flex items-center justify-center gap-4 mt-6 py-4">
            {/* Pass Button */}
            <button
                onClick={onPass}
                disabled={disabled}
                className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                aria-label="Pass"
            >
                <X className="w-7 h-7 text-red-500 group-hover:text-red-600 transition-colors" strokeWidth={3} />
            </button>

            {/* Like Button */}
            <button
                onClick={onLike}
                disabled={disabled}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                aria-label="Like"
            >
                <Heart className="w-8 h-8 text-white fill-white" strokeWidth={2} />
            </button>
        </div>
    );
}
