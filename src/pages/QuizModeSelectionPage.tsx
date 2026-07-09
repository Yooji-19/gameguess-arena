'use client';
import React, { useState } from 'react';
import { GAMES, QUIZ_MODES, ALL_QUESTIONS } from '../data/mockData';
import { GameId, ModeId } from '../types';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface QuizModePageProps {
  selectedGameId: GameId | null;
  onNavigate: (page: Page) => void;
  onSelectMode: (id: ModeId) => void;
}

// Games that have map/stage questions
const GAMES_WITH_MAPS: GameId[] = ['valorant', 'tekken'];

export default function QuizModeSelectionPage({ selectedGameId, onNavigate, onSelectMode }: QuizModePageProps) {
  const [selected, setSelected] = useState<ModeId | null>(null);
  const game = GAMES.find(g => g.id === selectedGameId);

  const hasMapMode = selectedGameId ? GAMES_WITH_MAPS.includes(selectedGameId) : false;

  // Only show modes that have questions for this game
  const availableModes = QUIZ_MODES.filter(m => {
    if (m.id === 'map-region') return hasMapMode;
    return true;
  });

  const handleStart = () => {
    if (!selected) return;
    onSelectMode(selected);
    onNavigate('quiz');
  };

  return (
    <main className="pt-20 pb-24 md:pb-8 px-4 md:px-12 max-w-4xl mx-auto min-h-screen">
      <div className="mt-8 mb-8">
        <button
          onClick={() => onNavigate('games')}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-xs font-mono uppercase tracking-wide transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>Back
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-xs font-mono uppercase tracking-widest mb-3">
          Step 2 of 2
        </div>
        <div className="flex items-center gap-3 mb-1">
          {game && <span className="text-3xl select-none">{game.emoji}</span>}
          <h1 className="text-4xl font-heading font-black text-on-surface">Select Mode</h1>
        </div>
        {game && (
          <p className="text-on-surface-variant font-body">
            Playing: <span className="text-primary font-semibold">{game.name}</span>
            {!hasMapMode && (
              <span className="ml-2 text-xs font-mono text-outline">
                · Character Guess only for this game
              </span>
            )}
          </p>
        )}
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {availableModes.map(mode => {
          const isSelected = selected === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelected(mode.id)}
              className={`border-2 rounded-xl p-6 text-left flex flex-col gap-4 transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.2)] -translate-y-1'
                  : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/40 hover:bg-surface-container hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isSelected ? 'bg-primary/20 border-primary/40' : 'bg-surface-container-high border-outline-variant/30'
              }`}>
                <span
                  className={`material-symbols-outlined text-2xl ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
                  style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {mode.icon}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-heading font-bold text-xl ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                    {mode.name}
                  </h3>
                  {mode.id === 'character-guess' && (
                    <span className="text-xs font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full">
                      PIXELATED
                    </span>
                  )}
                </div>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">{mode.description}</p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20">
                <span className="text-xs font-mono text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">quiz</span>
                  {mode.questionCount} questions
                </span>
                <span className="text-xs font-mono text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">timer</span>
                  {mode.timeLimit}s each
                </span>
                {isSelected && (
                  <span className="ml-auto text-xs font-mono text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Start button */}
      {selected ? (
        <div className="animate-fade-in">
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-mono font-bold text-lg uppercase tracking-widest text-on-primary-container transition-all hover:scale-[1.01] hover:-skew-x-1"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #00dbe7)',
              boxShadow: '0 0 25px rgba(210,187,255,0.35)',
            }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6 text-center border border-outline-variant/20 bg-surface-container">
          <p className="text-on-surface-variant font-body">Select a mode above to start</p>
        </div>
      )}
    </main>
  );
}
