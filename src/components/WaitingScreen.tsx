'use client';

import { Copy, User, Loader2, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface WaitingScreenProps {
    pin: string;
    onCancel: () => void;
}

export function WaitingScreen({ pin, onCancel }: WaitingScreenProps) {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `${window.location.origin}/join/${pin}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isGamified = theme === 'gamified';
    const isImmersive = theme === 'immersive';

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto text-center animate-in fade-in zoom-in duration-300">
            <div className={`mb-8 p-4 rounded-full ${isGamified ? 'bg-neon-purple/20 border-2 border-neon-purple shadow-[0_0_30px_rgba(189,0,255,0.4)]' :
                    isImmersive ? 'bg-white/10 backdrop-blur-md' : 'bg-gray-100'
                }`}>
                <Loader2 className={`w-12 h-12 animate-spin ${isGamified ? 'text-neon-purple' : 'text-indigo-600'
                    }`} />
            </div>

            <h2 className={`text-2xl font-bold mb-2 ${isGamified ? 'text-white' : 'text-gray-900'
                }`}>Waiting for Player 2...</h2>

            <p className={`mb-8 ${isGamified ? 'text-gray-300' : 'text-gray-500'
                }`}>Share this PIN with your friend to start matching!</p>

            <div className={`relative w-full p-8 rounded-3xl mb-8 border-2 border-dashed ${isGamified ? 'bg-gray-900/80 border-neon-blue' :
                    isImmersive ? 'bg-black/40 border-gray-600' : 'bg-white border-indigo-200'
                }`}>
                <span className={`text-sm uppercase tracking-widest font-bold mb-2 block ${isGamified ? 'text-neon-blue' : 'text-indigo-500'
                    }`}>Game PIN</span>
                <div className={`text-6xl font-black tracking-widest font-mono ${isGamified ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-gray-900'
                    }`}>
                    {pin}
                </div>
            </div>

            <div className="flex gap-4 w-full">
                <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${isGamified ? 'bg-gray-800 text-neon-green border border-neon-green hover:bg-neon-green hover:text-black' :
                            'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {copied ? 'Copied!' : <><Copy className="w-4 h-4" /> Copy Link</>}
                </button>

                <button
                    onClick={onCancel}
                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                >
                    Cancel
                </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>Hosting as Player 1</span>
            </div>
        </div>
    );
}
