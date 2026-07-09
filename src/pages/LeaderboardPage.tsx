'use client';
import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { GAMES, QUIZ_MODES } from '../data/mockData';
import { getLeaderboard, clearLeaderboard } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface LeaderboardPageProps {
  onNavigate: (page: Page) => void;
}

const RANK_MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function LeaderboardPage({ onNavigate }: LeaderboardPageProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  const handleClear = () => {
    if (window.confirm('Clear all leaderboard scores? This cannot be undone.')) {
      clearLeaderboard();
      setEntries([]);
      setShowClear(false);
    }
  };

  const ranked = entries
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return (
    <main className="pt-20 pb-24 md:pb-8 px-4 md:px-12 max-w-4xl mx-auto min-h-screen">
      <div className="mt-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-xs font-mono uppercase tracking-widest mb-3">
              <span className="material-symbols-outlined text-sm">emoji_events</span>
              Booth Leaderboard
            </div>
            <h1 className="text-4xl font-heading font-black text-on-surface mb-1">Top Scores</h1>
            <p className="text-on-surface-variant font-body text-sm">All scores saved on this device.</p>
          </div>

          {/* Admin clear button - small, subtle */}
          <div className="flex flex-col items-end gap-2 mt-2">
            <button
              onClick={() => setShowClear(!showClear)}
              className="text-xs font-mono text-outline hover:text-on-surface-variant transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
              Admin
            </button>
            {showClear && (
              <button
                onClick={handleClear}
                className="text-xs font-mono text-valo-red border border-valo-red/30 bg-valo-red/10 hover:bg-valo-red/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Clear All Scores
              </button>
            )}
          </div>
        </div>
      </div>

      {ranked.length === 0 ? (
        <div className="rounded-xl p-16 text-center border border-outline-variant/20 bg-surface-container">
          <span className="material-symbols-outlined text-6xl text-outline block mb-4">leaderboard</span>
          <h2 className="font-heading font-bold text-xl text-on-surface-variant mb-2">No scores yet</h2>
          <p className="text-on-surface-variant font-body mb-8">Play a quiz and enter your name to appear here!</p>
          <button
            onClick={() => onNavigate('games')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest text-on-primary-container transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00dbe7)' }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            Play Now
          </button>
        </div>
      ) : (
        <>
          {/* Top 3 podium */}
          {ranked.length >= 3 && (
            <div className="flex items-end justify-center gap-4 mb-8 px-4">
              {/* 2nd */}
              {ranked[1] && (
                <div className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-3xl">🥈</span>
                  <div className="w-14 h-14 rounded-full bg-surface-variant border-2 border-outline flex items-center justify-center font-heading font-bold text-xl text-on-surface">
                    {ranked[1].playerName[0]?.toUpperCase()}
                  </div>
                  <p className="text-xs font-mono text-on-surface text-center truncate w-full max-w-[80px]">{ranked[1].playerName}</p>
                  <div className="w-full h-20 bg-surface-container-high border border-outline-variant/30 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-sm font-heading font-bold text-on-surface-variant">{ranked[1].score.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {/* 1st */}
              {ranked[0] && (
                <div className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-4xl">🥇</span>
                  <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-heading font-bold text-2xl text-on-surface"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #00dbe7)', borderColor: '#d2bbff' }}>
                    {ranked[0].playerName[0]?.toUpperCase()}
                  </div>
                  <p className="text-sm font-mono text-primary font-bold text-center truncate w-full max-w-[90px]">{ranked[0].playerName}</p>
                  <div className="w-full h-28 rounded-t-lg flex items-end justify-center pb-2 border border-primary/30"
                    style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.2), rgba(19,27,46,0.8))' }}>
                    <span className="text-lg font-heading font-bold text-primary">{ranked[0].score.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {/* 3rd */}
              {ranked[2] && (
                <div className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-3xl">🥉</span>
                  <div className="w-14 h-14 rounded-full bg-surface-variant border-2 border-outline flex items-center justify-center font-heading font-bold text-xl text-on-surface">
                    {ranked[2].playerName[0]?.toUpperCase()}
                  </div>
                  <p className="text-xs font-mono text-on-surface text-center truncate w-full max-w-[80px]">{ranked[2].playerName}</p>
                  <div className="w-full h-14 bg-surface-container-high border border-outline-variant/30 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-sm font-heading font-bold text-on-surface-variant">{ranked[2].score.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full table */}
          <div className="rounded-xl overflow-hidden border border-surface-variant">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-surface-container-high border-b border-surface-variant text-xs font-mono text-outline uppercase">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Acc.</div>
              <div className="col-span-3 text-right hidden sm:block">Game</div>
            </div>

            {ranked.map((entry) => {
              const game = GAMES.find(g => g.id === entry.gameId);
              const mode = QUIZ_MODES.find(m => m.id === entry.modeId);
              const isTop3 = entry.rank <= 3;
              return (
                <div
                  key={entry.id}
                  className={`grid grid-cols-12 gap-2 px-4 py-3.5 border-b border-surface-variant/50 transition-colors hover:bg-surface-container ${isTop3 ? 'bg-surface-container-high/40' : ''}`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    {RANK_MEDALS[entry.rank]
                      ? <span className="text-lg select-none">{RANK_MEDALS[entry.rank]}</span>
                      : <span className="text-sm font-mono text-outline">{entry.rank}</span>
                    }
                  </div>

                  {/* Name + date */}
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-sm font-heading font-bold text-on-surface flex-shrink-0">
                      {entry.playerName[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className={`text-sm font-heading font-semibold ${isTop3 ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {entry.playerName}
                      </p>
                      <p className="text-xs font-mono text-outline hidden sm:block">{entry.date}</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className={`text-sm font-mono font-bold ${isTop3 ? 'text-tertiary' : 'text-on-surface'}`}>
                      {entry.score.toLocaleString()}
                    </span>
                  </div>

                  {/* Accuracy */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className={`text-sm font-mono ${entry.accuracy >= 80 ? 'text-secondary-fixed' : entry.accuracy >= 60 ? 'text-primary' : 'text-outline'}`}>
                      {entry.accuracy}%
                    </span>
                  </div>

                  {/* Game + mode */}
                  <div className="col-span-3 hidden sm:flex items-center justify-end gap-1">
                    <span className="text-base select-none">{game?.emoji}</span>
                    <span className="text-xs font-mono text-outline bg-surface-container border border-outline-variant/30 px-2 py-0.5 rounded-full">
                      {game?.shortName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Entry count */}
          <p className="text-center text-xs font-mono text-outline mt-4">
            {ranked.length} {ranked.length === 1 ? 'score' : 'scores'} on this device
          </p>
        </>
      )}
    </main>
  );
}
