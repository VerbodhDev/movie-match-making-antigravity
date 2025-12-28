'use client';

import { mockMovies } from '@/data/movies';
import { Deck } from '@/components/Deck';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <Deck movies={mockMovies} />
      </div>
    </main>
  );
}
