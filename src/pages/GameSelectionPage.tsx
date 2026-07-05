'use client';
import React, { useState } from 'react';
import { GAMES } from '../data/mockData';
import { GameId } from '../types';
import GameCard from '../components/GameCard';
import { getHighScores } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface GameSelectionPageProps {
  onNavigate: (page: Page) => void;
  onSelectGame: (gameId: GameId) => void;
}

export default function GameSelectionPage({ onNavigate, onSelectGame }: GameSelectionPageProps) {
  const [selected, setSelected] = useState<GameId | null>(null);
  const highScores = getHighScores();

  const handleSelect = (gameId: GameId) => {
    setSelected(gameId);
  };

  const handleContinue = () => {
    if (!selected) return;
    onSelectGame(selected);
    onNavigate('quiz-mode');
  };

  const selectedGame = GAMES.find((g) => g.id === selected);

  return (
    <main className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16">
      {/* Header */}
      <div className="mb-10 mt-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3">
          Step 1 of 2
        </div>
        <h1 className="text-display-sm font-display font-black text-on-surface mb-2">Select Your Game</h1>
        <p className="text-body-md font-body text-on-surface-variant">
          Choose the game universe you want to be tested on.
        </p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {GAMES.map((game) => {
          const hs = highScores.find((h) => h.gameId === game.id);
          return (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => handleSelect(game.id)}
              selected={selected === game.id}
              showStats
              highScore={hs?.score}
            />
          );
        })}
      </div>

      {/* Selected game details */}
      {selectedGame ? (
        <div className="glass-panel rounded-xl p-6 mb-8 border border-primary/20 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl select-none">{selectedGame.emoji}</span>
                <div>
                  <h2 className="text-headline-lg font-heading text-on-surface">{selectedGame.name}</h2>
                  <span className="text-label-sm font-mono text-on-surface-variant">{selectedGame.genre}</span>
                </div>
              </div>
              <p className="text-body-md font-body text-on-surface-variant">{selectedGame.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-label-sm font-mono text-outline">
                  <span className="material-symbols-outlined text-xs">quiz</span>
                  {selectedGame.questionCount} questions
                </div>
                <div className="flex items-center gap-1 text-label-sm font-mono text-outline">
                  <span className="material-symbols-outlined text-xs">leaderboard</span>
                  Active leaderboard
                </div>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-8 py-3 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all"
              style={{ boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}
            >
              Continue
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-8 mb-8 text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl text-outline mb-3 block">touch_app</span>
          <p className="text-body-md font-body text-on-surface-variant">Select a game above to continue</p>
        </div>
      )}

      {/* Featured games info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🎯', label: 'Voice Lines', desc: 'Identify characters by quotes' },
          { icon: '👤', label: 'Characters', desc: 'Guess from descriptions' },
          { icon: '🗺️', label: 'Maps & Stages', desc: 'Locate iconic locations' },
          { icon: '🎲', label: 'Mixed Mode', desc: 'All types combined' },
        ].map((item) => (
          <div key={item.label} className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex items-center gap-3">
            <span className="text-2xl select-none">{item.icon}</span>
            <div>
              <p className="text-sm font-heading font-semibold text-on-surface">{item.label}</p>
              <p className="text-label-sm font-body text-on-surface-variant">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
