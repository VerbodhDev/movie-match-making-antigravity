'use client';

import { useState, useEffect } from 'react';
import { mockMovies } from '@/data/movies';
import { Deck } from '@/components/Deck';
import { Header } from '@/components/Header';
import { useTheme } from '@/context/ThemeContext';
import { gameService, Room } from '@/services/gameService';
import { WaitingScreen } from '@/components/WaitingScreen';
import { JoinGameModal } from '@/components/JoinGameModal';
import { Users, Play, Plus } from 'lucide-react';
import { toast } from 'sonner';

type GameStatus = 'idle' | 'waiting' | 'playing';

export default function Home() {
  const { theme } = useTheme();
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [room, setRoom] = useState<Room | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Subscribe to room updates (for Host)
  useEffect(() => {
    if (gameStatus === 'waiting' && room) {
      const channel = gameService.subscribeToRoom(room.id, (updatedRoom) => {
        if (updatedRoom.player2_user_id) {
          setRoom(updatedRoom);
          setGameStatus('playing');
        }
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [gameStatus, room]);

  const handleStartGame = async () => {
    try {
      // Generate a random host ID for MVP
      const hostId = 'host_' + Math.floor(Math.random() * 10000);
      const newRoom = await gameService.createRoom(hostId, mockMovies);
      setRoom(newRoom);
      setGameStatus('waiting');
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Failed to create room. Please try again.');
    }
  };

  const handleJoinGame = async (pin: string) => {
    setIsJoining(true);
    try {
      const userId = 'player_' + Math.floor(Math.random() * 10000);
      const joinedRoom = await gameService.joinRoom(pin, userId);
      setRoom(joinedRoom);
      setGameStatus('playing');
      setShowJoinModal(false);
    } catch (error) {
      console.error('Failed to join room:', error);
      throw error; // Let modal handle display
    } finally {
      setIsJoining(false);
    }
  };

  const handleCancel = () => {
    setGameStatus('idle');
    setRoom(null);
    setShowJoinModal(false);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between overflow-hidden relative transition-colors duration-500 ${theme === 'immersive' ? 'bg-black' :
        theme === 'gamified' ? 'bg-gray-900' :
          'bg-white'
      }`}>
      <Header />

      {/* Main Interaction Area */}
      <div className="flex-1 w-full flex items-center justify-center p-4 z-10">

        {/* IDLE STATE - Mode Selection */}
        {gameStatus === 'idle' && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
            <button
              onClick={handleStartGame}
              className={`group relative overflow-hidden py-4 px-8 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105 ${theme === 'gamified' ? 'bg-gray-800 text-neon-blue border border-neon-blue shadow-[0_0_20px_rgba(0,255,255,0.3)]' :
                  theme === 'immersive' ? 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20' :
                    'bg-white text-indigo-600 shadow-xl border border-indigo-100 hover:border-indigo-200'
                }`}
            >
              <div className={`p-2 rounded-full ${theme === 'gamified' ? 'bg-neon-blue/20' :
                  theme === 'immersive' ? 'bg-white/20' : 'bg-indigo-50'
                }`}>
                <Plus className="w-6 h-6" />
              </div>
              <span>Start New Game</span>
              {theme === 'gamified' && <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>

            <button
              onClick={() => setShowJoinModal(true)}
              className={`group py-4 px-8 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105 ${theme === 'gamified' ? 'bg-transparent text-neon-pink border border-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:bg-neon-pink/10' :
                  theme === 'immersive' ? 'bg-transparent text-gray-300 border border-white/10 hover:bg-white/5 hover:text-white' :
                    'bg-white text-gray-600 shadow-lg border border-gray-100 hover:bg-gray-50'
                }`}
            >
              <div className={`p-2 rounded-full ${theme === 'gamified' ? 'bg-neon-pink/20' :
                  theme === 'immersive' ? 'bg-white/10' : 'bg-gray-100'
                }`}>
                <Users className="w-6 h-6" />
              </div>
              <span>Join a Friend</span>
            </button>
          </div>
        )}

        {/* WAITING STATE */}
        {gameStatus === 'waiting' && room && (
          <WaitingScreen pin={room.pin} onCancel={handleCancel} />
        )}

        {/* PLAYING STATE */}
        {gameStatus === 'playing' && (
          <Deck movies={mockMovies} />
        )}
      </div>

      {/* Join Modal Overlay */}
      {showJoinModal && (
        <JoinGameModal
          onJoin={handleJoinGame}
          onCancel={() => setShowJoinModal(false)}
          isJoining={isJoining}
        />
      )}

      {/* Background decoration - Dynamic based on theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {(theme === 'balanced' || !theme) && (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          </>
        )}

        {theme === 'immersive' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black opacity-80" />
        )}

        {theme === 'gamified' && (
          <>
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
          </>
        )}
      </div>
    </main>
  );
}
