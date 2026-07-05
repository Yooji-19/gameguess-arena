'use client';
import React, { useState } from 'react';
import { GAMES, MOCK_LEADERBOARD, QUIZ_MODES } from '../data/mockData';
import { GameId, ModeId } from '../types';
import LeaderboardTable from '../components/LeaderboardTable';
import { getHighScores } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface LeaderboardPageProps {
  onNavigate: (page: Page) => void;
}

export default function LeaderboardPage({ onNavigate }: LeaderboardPageProps) {
  const [filterGame, setFilterGame] = useState<GameId | 'all'>('all');
  const [filterMode, setFilterMode] = useState<ModeId | 'all'>('all');
  const [tab, setTab] = useState<'global' | 'personal'>('global');

  const localScores = getHighScores();

  const filtered = MOCK_LEADERBOARD.filter((e) => {
    if (filterGame !== 'all' && e.gameId !== filterGame) return false;
    if (filterMode !== 'all' && e.modeId !== filterMode) return false;
    return true;
  });

  return (
    <main className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16">
      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono uppercase tracking-widest mb-4">
          <span className="material-symbols-outlined text-sm">emoji_events</span>
          Rankings
        </div>
        <h1 className="text-display-sm font-display font-black text-on-surface mb-2">Leaderboard</h1>
        <p className="text-body-md font-body text-on-surface-variant">
          See how you stack up against the best players globally.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-6 bg-surface-container-low rounded-lg p-1 w-fit">
        {(['global', 'personal'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-md text-label-sm font-mono uppercase tracking-wide transition-all ${
              tab === t
                ? 'bg-surface-container-high text-primary border border-outline-variant/30'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t === 'global' ? 'Global' : 'My Scores'}
          </button>
        ))}
      </div>

      {tab === 'global' ? (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Game filter */}
            <div className="flex items-center gap-2">
              <span className="text-label-sm font-mono text-outline uppercase">Game:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFilterGame('all')}
                  className={`px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${
                    filterGame === 'all'
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  All
                </button>
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setFilterGame(g.id)}
                    className={`px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${
                      filterGame === g.id
                        ? 'bg-primary/20 border-primary/40 text-primary'
                        : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    {g.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
            {filtered.slice(0, 3).map((entry, idx) => {
              const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd heights
              const actual = [filtered[1], filtered[0], filtered[2]][idx];
              if (!actual) return null;
              const heights = ['h-24', 'h-32', 'h-20'];
              const icons = ['🥈', '👑', '🥉'];

              return (
                <div key={actual.rank} className={`flex flex-col items-center gap-2 ${idx === 1 ? 'order-first md:order-none' : ''}`}>
                  <div className="text-2xl select-none">{icons[idx]}</div>
                  <div className="w-12 h-12 rounded-full bg-surface-variant border-2 border-primary/40 flex items-center justify-center text-lg font-heading font-bold text-on-surface">
                    {actual.username[0]}
                  </div>
                  <p className="text-label-sm font-mono text-on-surface text-center truncate max-w-full">{actual.username}</p>
                  <div className={`w-full ${heights[idx]} rounded-t-lg flex items-end justify-center pb-3 ${
                    idx === 1 ? 'bg-primary/20 border border-primary/30' : 'bg-surface-container-high border border-outline-variant/20'
                  }`}>
                    <span className={`text-sm font-heading font-bold ${idx === 1 ? 'text-tertiary' : 'text-on-surface'}`}>
                      {actual.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full table */}
          <LeaderboardTable entries={filtered} />
        </>
      ) : (
        /* Personal best scores */
        <div className="flex flex-col gap-4">
          {localScores.length === 0 ? (
            <div className="glass-panel rounded-xl p-12 text-center border border-outline-variant/20">
              <span className="material-symbols-outlined text-5xl text-outline mb-4 block">leaderboard</span>
              <p className="text-headline-md font-heading text-on-surface-variant mb-2">No scores yet</p>
              <p className="text-body-md font-body text-outline mb-6">Complete a quiz to see your personal bests here.</p>
              <button
                onClick={() => onNavigate('games')}
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:bg-primary/30 transition-all"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Play Now
              </button>
            </div>
          ) : (
            localScores
              .sort((a, b) => b.score - a.score)
              .map((hs, idx) => {
                const game = GAMES.find((g) => g.id === hs.gameId);
                const mode = QUIZ_MODES.find((m) => m.id === hs.modeId);
                return (
                  <div key={idx} className="glass-panel rounded-xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-xl select-none">
                      {game?.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-heading font-semibold text-on-surface">{game?.name}</p>
                      <p className="text-label-sm font-mono text-on-surface-variant">{mode?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-headline-md font-heading text-primary font-bold">{hs.score.toLocaleString()}</p>
                      <p className="text-label-sm font-mono text-outline">{hs.accuracy}% accuracy</p>
                    </div>
                    <div className="text-label-sm font-mono text-outline text-right hidden sm:block">
                      {new Date(hs.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}
    </main>
  );
}
