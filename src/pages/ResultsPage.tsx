'use client';
import React, { useState } from 'react';
import { QuizResult } from '../types';
import { GAMES, QUIZ_MODES } from '../data/mockData';
import { saveToLeaderboard, calculateRank } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface ResultsPageProps {
  result: QuizResult | null;
  onNavigate: (page: Page) => void;
}

const RANK_COLORS: Record<string, string> = {
  'S+': 'text-tertiary',
  S: 'text-tertiary',
  A: 'text-secondary-fixed',
  B: 'text-primary',
  C: 'text-on-surface',
  D: 'text-outline',
  F: 'text-valo-red',
};

export default function ResultsPage({ result, onNavigate }: ResultsPageProps) {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const [nameError, setNameError] = useState('');

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-primary font-mono hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  const resultGameIds =
    result.gameIds && result.gameIds.length > 0
      ? result.gameIds
      : [result.gameId];

  const selectedGames = resultGameIds
    .map(gameId => GAMES.find(game => game.id === gameId))
    .filter((game): game is NonNullable<typeof game> => Boolean(game));

  const game = selectedGames[0];
  const isMultiGame = selectedGames.length > 1;
  const mode = QUIZ_MODES.find(m => m.id === result.modeId);
  const rank = calculateRank(result.accuracy);
  const isPerfect = result.accuracy === 100;

  const handleSave = () => {
    if (!playerName.trim()) {
      setNameError('Please enter your name.');
      return;
    }

    setNameError('');

    const resultWithGames: QuizResult = {
      ...result,
      gameIds: resultGameIds,
    };

    saveToLeaderboard(playerName, resultWithGames);
    setSaved(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-tertiary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-xs font-mono uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            Quiz Complete
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-fixed to-tertiary uppercase">
            {isPerfect
              ? 'Perfect!'
              : result.accuracy >= 80
                ? 'Great Job!'
                : result.accuracy >= 60
                  ? 'Not Bad!'
                  : 'Try Again!'}
          </h1>

          <p className="text-on-surface-variant font-body mt-2">
            {isMultiGame ? 'Multi Game Quiz' : game?.name} · {mode?.name}
          </p>

          {/* Games included */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {selectedGames.map(selectedGame => (
              <span
                key={selectedGame.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1 text-xs font-mono text-on-surface-variant"
                title={selectedGame.name}
              >
                <span className="text-sm select-none">{selectedGame.emoji}</span>
                {selectedGame.shortName}
              </span>
            ))}
          </div>
        </div>

        {/* Score + stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Big score */}
          <div
            className="rounded-xl p-8 border border-primary/20 bg-surface-container flex flex-col items-center text-center"
            style={{
              background: 'rgba(19,27,46,0.8)',
              boxShadow: '0 0 30px rgba(210,187,255,0.1)',
            }}
          >
            <span className="text-xs font-mono text-outline uppercase tracking-widest mb-2">
              Final Score
            </span>

            <div className="text-7xl font-heading font-black text-primary">
              {result.score.toLocaleString()}
            </div>

            {result.timeBonus > 0 && (
              <span className="text-xs font-mono text-secondary-fixed mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">bolt</span>
                +{result.timeBonus} time bonus
              </span>
            )}

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-mono text-on-surface-variant">
                Rank
              </span>

              <span
                className={`text-4xl font-heading font-black ${RANK_COLORS[rank]}`}
              >
                {rank}
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: 'Accuracy',
                value: `${result.accuracy}%`,
                icon: 'my_location',
                color:
                  result.accuracy >= 80
                    ? 'text-secondary-fixed'
                    : result.accuracy >= 60
                      ? 'text-primary'
                      : 'text-valo-red',
              },
              {
                label: 'Correct',
                value: `${result.correctAnswers}/${result.totalQuestions}`,
                icon: 'check_circle',
                color: 'text-on-surface',
              },
              {
                label: 'Max Streak',
                value: `${result.maxStreak}x`,
                icon: 'local_fire_department',
                color:
                  result.maxStreak >= 5 ? 'text-valo-red' : 'text-tertiary',
              },
              {
                label: 'Time Bonus',
                value: `+${result.timeBonus}`,
                icon: 'bolt',
                color: 'text-tertiary',
              },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-xl p-4 border border-outline-variant/20 bg-surface-container flex flex-col gap-1"
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-sm ${stat.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>

                  <span className="text-xs font-mono text-outline uppercase">
                    {stat.label}
                  </span>
                </div>

                <span
                  className={`text-2xl font-heading font-bold ${stat.color}`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Save to leaderboard */}
        <div className="rounded-xl p-6 border border-primary/20 bg-surface-container">
          <h3 className="font-heading font-bold text-on-surface text-lg mb-1 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              leaderboard
            </span>
            Save Your Score
          </h3>

          <p className="text-on-surface-variant text-sm font-body mb-4">
            Enter your name to add your score to the leaderboard.
          </p>

          {saved ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-fixed/10 border border-secondary-fixed/30 animate-fade-in">
              <span
                className="material-symbols-outlined text-secondary-fixed text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>

              <div>
                <p className="font-heading font-semibold text-secondary-fixed">
                  Score saved!
                </p>

                <p className="text-xs font-mono text-on-surface-variant">
                  Your score has been added to the leaderboard.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={playerName}
                  onChange={e => {
                    setPlayerName(e.target.value);
                    setNameError('');
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                  placeholder="Enter your name..."
                  maxLength={20}
                  className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-4 py-3 text-on-surface font-body placeholder-outline outline-none focus:border-primary transition-colors"
                />

                {nameError && (
                  <p className="text-valo-red text-xs font-mono mt-1">
                    {nameError}
                  </p>
                )}
              </div>

              <button
                onClick={handleSave}
                className="flex-shrink-0 px-6 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest text-on-primary-container transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #00dbe7)',
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('quiz-mode')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest text-on-primary-container transition-all hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #00dbe7)',
              boxShadow: '0 0 15px rgba(210,187,255,0.3)',
            }}
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              replay
            </span>
            Play Again
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm uppercase tracking-widest border border-primary/40 text-primary hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              leaderboard
            </span>
            Leaderboard
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center gap-1 px-5 py-3 rounded-lg font-mono text-sm uppercase tracking-widest border border-outline/30 text-on-surface-variant hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined text-base">home</span>
          </button>
        </div>
      </div>
    </div>
  );
}