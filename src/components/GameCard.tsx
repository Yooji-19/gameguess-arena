'use client';
import React from 'react';
import { Game } from '../types';

// Game icons as SVG or emoji representations
const GAME_ICONS: Record<string, string> = {
  valorant: '🎯',
  'mobile-legends': '⚔️',
  pokemon: '⚡',
  'league-of-legends': '🏆',
  tekken: '👊',
};

const GAME_GRADIENTS: Record<string, string> = {
  valorant: 'from-red-900/40 to-background',
  'mobile-legends': 'from-cyan-900/40 to-background',
  pokemon: 'from-yellow-900/40 to-background',
  'league-of-legends': 'from-purple-900/40 to-background',
  tekken: 'from-orange-900/40 to-background',
};

interface GameCardProps {
  game: Game;
  onClick: () => void;
  selected?: boolean;
  showStats?: boolean;
  highScore?: number;
}

export default function GameCard({ game, onClick, selected, showStats, highScore }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 w-full aspect-video flex flex-col items-start justify-end p-4 text-left ${
        selected
          ? 'border-primary bg-surface-container shadow-[0_0_25px_rgba(210,187,255,0.3)]'
          : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:scale-[1.02]'
      }`}
      style={
        selected
          ? { boxShadow: `0 0 30px -5px ${game.accentColor}40` }
          : undefined
      }
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${GAME_GRADIENTS[game.id]} z-0`} />

      {/* Game icon (large) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 z-0 select-none">
        {GAME_ICONS[game.id]}
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 right-2 z-20">
          <span
            className="material-symbols-outlined text-primary text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        <span className="font-heading font-bold text-white uppercase tracking-widest block text-sm mb-0.5">
          {game.name}
        </span>
        <span className="text-label-sm font-body text-on-surface-variant/80">{game.genre}</span>
        {showStats && highScore !== undefined && highScore > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
            <span className="text-label-sm font-mono text-tertiary">{highScore.toLocaleString()}</span>
          </div>
        )}
      </div>
    </button>
  );
}
