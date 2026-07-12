'use client';
import React, { useState } from 'react';
import { GAMES } from '../data/mockData';
import { GameId } from '../types';
import GameCard from '../components/GameCard';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';
type GameSelection = GameId | 'multi';

interface GameSelectionPageProps {
  onNavigate: (page: Page) => void;
  onSelectGame: (id: GameId | null) => void;
}

export default function GameSelectionPage({
  onNavigate,
  onSelectGame,
}: GameSelectionPageProps) {
  const [selected, setSelected] = useState<GameSelection | null>(null);

  const handleContinue = () => {
    if (!selected) return;

    onSelectGame(selected === 'multi' ? null : selected);
    onNavigate('quiz-mode');
  };

  const game =
    selected && selected !== 'multi'
      ? GAMES.find(g => g.id === selected)
      : undefined;

  const isMultiGame = selected === 'multi';

  return (
    <main className="pt-20 pb-24 md:pb-8 px-4 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="mt-8 mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-xs font-mono uppercase tracking-wide transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-xs font-mono uppercase tracking-widest mb-3">
          Step 1 of 2
        </div>

        <h1 className="text-4xl font-heading font-black text-on-surface mb-1">
          Select Your Game
        </h1>

        <p className="text-on-surface-variant font-body">
          Choose one game or build a quiz using multiple games.
        </p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {GAMES.map(gameItem => (
          <GameCard
            key={gameItem.id}
            game={gameItem}
            onClick={() => setSelected(gameItem.id)}
            selected={selected === gameItem.id}
          />
        ))}

        {/* Separate Multi Game option */}
        <button
          type="button"
          onClick={() => setSelected('multi')}
          className={`group relative min-h-[166px] overflow-hidden rounded-xl border-2 text-left transition-all duration-300 hover:-translate-y-1 ${
            isMultiGame
              ? 'border-primary bg-primary/15 shadow-[0_0_24px_rgba(124,58,237,0.3)]'
              : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/60'
          }`}
          style={{
            background: isMultiGame
              ? 'linear-gradient(135deg, rgba(124,58,237,0.34), rgba(0,219,231,0.22))'
              : 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(0,219,231,0.10))',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="material-symbols-outlined text-[90px] text-primary">
              layers
            </span>
          </div>

          {isMultiGame && (
            <span
              className="absolute right-3 top-3 z-20 material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          )}

          <div className="relative z-10 flex min-h-[166px] flex-col justify-end p-4">
            <span className="mb-auto w-fit rounded-full border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-primary">
              Select 2+
            </span>

            <h3 className="font-heading text-base font-bold uppercase text-white">
              Multi Game
            </h3>

            <p className="font-mono text-xs text-primary">
              Mixed Questions
            </p>
          </div>
        </button>
      </div>

      {/* Continue panel */}
      {game || isMultiGame ? (
        <div
          className="rounded-xl p-6 border flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in"
          style={{
            background: isMultiGame
              ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,219,231,0.08))'
              : `${game!.accentColor}10`,
            borderColor: isMultiGame
              ? 'rgba(210,187,255,0.35)'
              : `${game!.accentColor}40`,
          }}
        >
          <div className="flex items-center gap-4 flex-1">
            {isMultiGame ? (
              <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary">
                  layers
                </span>
              </div>
            ) : (
              <span className="text-5xl select-none">{game!.emoji}</span>
            )}

            <div>
              <h2 className="font-heading font-bold text-xl text-on-surface">
                {isMultiGame ? 'Multi Game Quiz' : game!.name}
              </h2>

              <p className="text-on-surface-variant text-sm font-body">
                {isMultiGame
                  ? 'Choose at least two games and mix their questions into one quiz.'
                  : game!.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="flex-shrink-0 flex items-center gap-2 px-8 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest text-on-primary-container transition-all hover:scale-105"
            style={{
              background: isMultiGame
                ? 'linear-gradient(135deg, #7c3aed, #00dbe7)'
                : `linear-gradient(135deg, #7c3aed, ${game!.accentColor})`,
              boxShadow: isMultiGame
                ? '0 0 20px rgba(124,58,237,0.35)'
                : `0 0 20px ${game!.accentColor}40`,
            }}
          >
            Continue
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-8 text-center border border-outline-variant/20 bg-surface-container">
          <span className="material-symbols-outlined text-4xl text-outline block mb-2">
            touch_app
          </span>

          <p className="text-on-surface-variant font-body">
            Select a game or Multi Game above to continue
          </p>
        </div>
      )}
    </main>
  );
}