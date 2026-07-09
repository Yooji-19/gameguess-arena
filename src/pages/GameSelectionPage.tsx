'use client';
import React, { useState } from 'react';
import { GAMES } from '../data/mockData';
import { GameId } from '../types';
import GameCard from '../components/GameCard';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface GameSelectionPageProps {
  onNavigate: (page: Page) => void;
  onSelectGame: (id: GameId) => void;
}

export default function GameSelectionPage({ onNavigate, onSelectGame }: GameSelectionPageProps) {
  const [selected, setSelected] = useState<GameId | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    onSelectGame(selected);
    onNavigate('quiz-mode');
  };

  const game = GAMES.find(g => g.id === selected);

  return (
    <main className="pt-20 pb-24 md:pb-8 px-4 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="mt-8 mb-8">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-xs font-mono uppercase tracking-wide transition-colors mb-6">
          <span className="material-symbols-outlined text-sm">arrow_back</span>Back
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-xs font-mono uppercase tracking-widest mb-3">
          Step 1 of 2
        </div>
        <h1 className="text-4xl font-heading font-black text-on-surface mb-1">Select Your Game</h1>
        <p className="text-on-surface-variant font-body">Choose the game universe you want to be tested on.</p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {GAMES.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelected(game.id)}
            selected={selected === game.id}
          />
        ))}
      </div>

      {/* Continue panel */}
      {game ? (
        <div
          className="rounded-xl p-6 border flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in"
          style={{ background: `${game.accentColor}10`, borderColor: `${game.accentColor}40` }}
        >
          <div className="flex items-center gap-4 flex-1">
            <span className="text-5xl select-none">{game.emoji}</span>
            <div>
              <h2 className="font-heading font-bold text-xl text-on-surface">{game.name}</h2>
              <p className="text-on-surface-variant text-sm font-body">{game.description}</p>
            </div>
          </div>
          <button
            onClick={handleContinue}
            className="flex-shrink-0 flex items-center gap-2 px-8 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest text-on-primary-container transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, #7c3aed, ${game.accentColor})`,
              boxShadow: `0 0 20px ${game.accentColor}40`,
            }}
          >
            Continue
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-8 text-center border border-outline-variant/20 bg-surface-container">
          <span className="material-symbols-outlined text-4xl text-outline block mb-2">touch_app</span>
          <p className="text-on-surface-variant font-body">Select a game above to continue</p>
        </div>
      )}
    </main>
  );
}
