'use client';
import React from 'react';
import { LeaderboardEntry } from '../types';
import { GAMES, QUIZ_MODES } from '../data/mockData';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const RANK_ICONS: Record<number, string> = {
  1: '👑',
  2: '🥈',
  3: '🥉',
};

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-surface-variant">
      {/* Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-surface-container-high border-b border-surface-variant">
        <div className="col-span-1 text-label-sm font-mono text-outline uppercase">#</div>
        <div className="col-span-4 text-label-sm font-mono text-outline uppercase">Player</div>
        <div className="col-span-2 text-label-sm font-mono text-outline uppercase text-right">Score</div>
        <div className="col-span-2 text-label-sm font-mono text-outline uppercase text-right">Acc.</div>
        <div className="col-span-1 text-label-sm font-mono text-outline uppercase text-right">Stk.</div>
        <div className="col-span-2 text-label-sm font-mono text-outline uppercase text-right hidden md:block">Game</div>
      </div>

      {/* Rows */}
      {entries.map((entry) => {
        const game = GAMES.find((g) => g.id === entry.gameId);
        const isTop3 = entry.rank <= 3;

        return (
          <div
            key={`${entry.rank}-${entry.username}`}
            className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-surface-variant/50 transition-colors ${
              entry.isCurrentUser
                ? 'bg-primary/10 border-l-2 border-l-primary'
                : isTop3
                ? 'bg-surface-container-high/50'
                : 'hover:bg-surface-container'
            }`}
          >
            {/* Rank */}
            <div className="col-span-1 flex items-center">
              {RANK_ICONS[entry.rank] ? (
                <span className="text-base select-none">{RANK_ICONS[entry.rank]}</span>
              ) : (
                <span className="text-label-sm font-mono text-on-surface-variant">
                  {entry.rank}
                </span>
              )}
            </div>

            {/* Username */}
            <div className="col-span-4 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-surface-variant border border-outline-variant/30 flex items-center justify-center text-xs select-none">
                {entry.username[0].toUpperCase()}
              </div>
              <div>
                <p className={`text-sm font-heading font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-on-surface'}`}>
                  {entry.username}
                  {entry.isCurrentUser && (
                    <span className="ml-1 text-label-sm font-mono text-primary/70">(you)</span>
                  )}
                </p>
                {entry.badge && <span className="text-xs">{entry.badge}</span>}
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
              <span className={`text-sm font-mono ${
                entry.accuracy >= 90 ? 'text-secondary-fixed' : entry.accuracy >= 75 ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {entry.accuracy}%
              </span>
            </div>

            {/* Streak */}
            <div className="col-span-1 flex items-center justify-end">
              <span className="text-sm font-mono text-on-surface-variant">
                {entry.streak}
              </span>
            </div>

            {/* Game */}
            <div className="col-span-2 items-center justify-end hidden md:flex">
              <span className="text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 px-2 py-0.5 rounded-full">
                {game?.shortName || entry.gameId.slice(0, 3).toUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
