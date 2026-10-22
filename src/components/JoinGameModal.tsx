'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Loader2 } from 'lucide-react';

interface JoinGameModalProps {
    onJoin: (pin: string) => Promise<void>;
    onCancel: () => void;
    isJoining: boolean;
}

export function JoinGameModal({ onJoin, onCancel, isJoining }: JoinGameModalProps) {
    const { theme } = useTheme();
    const [pin, setPin] = useState(['', '', '', '']); // Array for 4 digit inputs
    const [error, setError] = useState('');

    const handlePinChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value !== '' && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const pinString = pin.join('');
        if (pinString.length !== 4) {
            setError('Please enter a valid 4-digit PIN');
            return;
        }

        try {
            await onJoin(pinString);
        } catch (err: any) {
            setError(err.message || 'Failed to join room');
        }
    };

    const isGamified = theme === 'gamified';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`w-full max-w-sm rounded-3xl p-8 relative ${isGamified ? 'bg-gray-900 border border-neon-blue shadow-[0_0_40px_rgba(0,0,0,0.8)]' :
                    'bg-white shadow-2xl'
                }`}>
                <h3 className={`text-2xl font-bold mb-6 text-center ${isGamified ? 'text-white' : 'text-gray-900'
                    }`}>Join Game</h3>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-3 mb-8">
                        {pin.map((digit, i) => (
                            <input
                                key={i}
                                id={`pin-${i}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handlePinChange(i, e.target.value)}
                                className={`w-14 h-16 rounded-xl text-center text-2xl font-bold border-2 focus:ring-4 focus:ring-opacity-50 outline-none transition-all ${isGamified ?
                                        'bg-gray-800 border-gray-700 text-white focus:border-neon-pink focus:ring-neon-pink' :
                                        'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
                                    }`}
                                autoComplete="off"
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-red-500 text-center text-sm mb-4 bg-red-500/10 py-2 rounded-lg">{error}</p>
                    )}

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={isJoining}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isGamified ?
                                    'bg-neon-blue text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]' :
                                    'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                                }`}
                        >
                            {isJoining ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>Enter Room <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
