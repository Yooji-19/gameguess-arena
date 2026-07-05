'use client';
import React from 'react';
import { QuizResult } from '../types';
import { GAMES, QUIZ_MODES } from '../data/mockData';
import { formatScore } from '../utils';

interface ResultSummaryProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
  onHome: () => void;
}

export default function ResultSummary({ result, onPlayAgain, onViewLeaderboard, onHome }: ResultSummaryProps) {
  const game = GAMES.find((g) => g.id === result.gameId);
  const mode = QUIZ_MODES.find((m) => m.id === result.modeId);
  const isPerfect = result.accuracy === 100;
  const isGreat = result.accuracy >= 80;

  const rankColors: Record<string, string> = {
    'S+': 'text-tertiary',
    S: 'text-tertiary',
    A: 'text-secondary-fixed',
    B: 'text-primary',
    C: 'text-on-surface',
    D: 'text-outline',
    F: 'text-valo-red',
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono tracking-widest uppercase">
          <span className="material-symbols-outlined text-base">military_tech</span>
          Match Concluded
        </div>
        <h1 className="text-display-lg font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary uppercase italic leading-tight">
          {isPerfect ? 'Perfect!' : isGreat ? 'Victory' : result.accuracy >= 60 ? 'Complete' : 'Try Again'}
        </h1>
        <p className="text-body-md font-body text-on-surface-variant">
          {game?.name} · {mode?.name}
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {/* Score card */}
        <div className="md:col-span-6 glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <p className="text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-3">Final Score</p>
          <div className="text-[72px] font-display font-black text-primary leading-none drop-shadow-[0_0_10px_rgba(210,187,255,0.3)]">
            {formatScore(result.score)}
          </div>
          {result.timeBonus > 0 && (
            <div className="mt-2 text-label-sm font-mono text-secondary-fixed flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">bolt</span>
              +{result.timeBonus} time bonus
            </div>
          )}
          <div className="mt-3 flex items-center gap-2 text-label-sm font-mono text-on-surface-variant">
            <span className="material-symbols-outlined text-xs text-secondary-container">trending_up</span>
            Top {100 - result.percentile}% Global · Rank
            <span className={`font-bold text-base ${rankColors[result.rank] || 'text-primary'}`}>{result.rank}</span>
          </div>
        </div>

        {/* Mini stats */}
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-mono text-on-surface-variant uppercase">Accuracy</span>
              <span className="material-symbols-outlined text-secondary-container text-base">my_location</span>
            </div>
            <div className="text-headline-lg font-heading text-on-surface">{result.accuracy}%</div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary-container h-full rounded-full transition-all" style={{ width: `${result.accuracy}%` }} />
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-mono text-on-surface-variant uppercase">Max Streak</span>
              <span className="material-symbols-outlined text-valo-red text-base" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <div className="text-headline-lg font-heading text-on-surface">
              {result.maxStreak}
              <span className="text-valo-red text-body-md font-body ml-1">x</span>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-mono text-on-surface-variant uppercase">Correct</span>
              <span className="material-symbols-outlined text-secondary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="text-headline-lg font-heading text-on-surface">
              {result.correctAnswers}
              <span className="text-on-surface-variant text-body-md font-body">/{result.totalQuestions}</span>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-mono text-on-surface-variant uppercase">Time Bonus</span>
              <span className="material-symbols-outlined text-tertiary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div className="text-headline-lg font-heading text-on-surface">
              +{result.timeBonus}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <button
          onClick={onPlayAgain}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:opacity-90 hover:-skew-x-1 transition-all"
          style={{ boxShadow: '0 0 15px rgba(210,187,255,0.3)' }}
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
          Play Again
        </button>
        <button
          onClick={onViewLeaderboard}
          className="flex-1 flex items-center justify-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest transition-all"
        >
          <span className="material-symbols-outlined text-base">leaderboard</span>
          Leaderboard
        </button>
        <button
          onClick={onHome}
          className="flex items-center justify-center gap-1 border border-outline/30 text-on-surface-variant hover:text-on-surface hover:border-outline font-mono text-label-sm px-4 py-3 rounded-lg uppercase tracking-widest transition-all"
        >
          <span className="material-symbols-outlined text-sm">home</span>
        </button>
      </div>
    </div>
  );
}
