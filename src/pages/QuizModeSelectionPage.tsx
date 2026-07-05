'use client';
import React, { useState } from 'react';
import { GAMES, QUIZ_MODES } from '../data/mockData';
import { GameId, ModeId } from '../types';
import ModeCard from '../components/ModeCard';
import { getPersonalBest, formatScore } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface QuizModePageProps {
  selectedGameId: GameId | null;
  onNavigate: (page: Page) => void;
  onSelectMode: (modeId: ModeId) => void;
}

export default function QuizModeSelectionPage({ selectedGameId, onNavigate, onSelectMode }: QuizModePageProps) {
  const [selectedMode, setSelectedMode] = useState<ModeId | null>(null);

  const game = GAMES.find((g) => g.id === selectedGameId);

  const handleContinue = () => {
    if (!selectedMode) return;
    onSelectMode(selectedMode);
    onNavigate('quiz');
  };

  const mode = QUIZ_MODES.find((m) => m.id === selectedMode);
  const pb = selectedGameId && selectedMode ? getPersonalBest(selectedGameId, selectedMode) : null;

  return (
    <main className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16">
      {/* Header */}
      <div className="mb-10 mt-4">
        <button
          onClick={() => onNavigate('games')}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Game Selection
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3">
          Step 2 of 2
        </div>

        <div className="flex items-center gap-4 mb-3">
          {game && <span className="text-4xl select-none">{game.emoji}</span>}
          <div>
            <h1 className="text-display-sm font-display font-black text-on-surface">
              Select Quiz Mode
            </h1>
            {game && (
              <p className="text-body-md font-body text-on-surface-variant">
                Playing: <span className="text-primary font-semibold">{game.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {QUIZ_MODES.map((m) => (
          <ModeCard
            key={m.id}
            mode={m}
            onClick={() => setSelectedMode(m.id)}
            selected={selectedMode === m.id}
          />
        ))}
      </div>

      {/* Selected mode details & CTA */}
      {mode ? (
        <div className="glass-panel rounded-xl p-6 border border-primary/20 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {mode.icon}
                  </span>
                </div>
                <h2 className="text-headline-md font-heading text-on-surface">{mode.name}</h2>
              </div>
              <p className="text-body-md font-body text-on-surface-variant mb-3">{mode.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 text-label-sm font-mono text-outline">
                  <span className="material-symbols-outlined text-xs">timer</span>
                  {mode.timeLimit}s per question
                </div>
                <div className="flex items-center gap-1 text-label-sm font-mono text-outline">
                  <span className="material-symbols-outlined text-xs">quiz</span>
                  {mode.questionCount === 999 ? 'Unlimited' : `${mode.questionCount} questions`}
                </div>
                {pb && (
                  <div className="flex items-center gap-1 text-label-sm font-mono text-tertiary">
                    <span className="material-symbols-outlined text-xs">emoji_events</span>
                    PB: {formatScore(pb.score)}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all"
              style={{ boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-8 text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl text-outline mb-3 block">touch_app</span>
          <p className="text-body-md font-body text-on-surface-variant">Select a mode above to begin</p>
        </div>
      )}
    </main>
  );
}
