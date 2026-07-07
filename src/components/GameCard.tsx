'use client';
import React from 'react';
import { Game } from '../types';

const GRADIENTS: Record<string, string> = {
  valorant:           'from-red-950/80 via-red-900/40 to-transparent',
  'mobile-legends':   'from-cyan-950/80 via-cyan-900/40 to-transparent',
  pokemon:            'from-yellow-950/80 via-yellow-900/40 to-transparent',
  'league-of-legends':'from-purple-950/80 via-purple-900/40 to-transparent',
  tekken:             'from-orange-950/80 via-orange-900/40 to-transparent',
};

interface GameCardProps {
  game: Game;
  onClick: () => void;
  selected?: boolean;
}

export default function GameCard({ game, onClick, selected }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 w-full aspect-video flex flex-col items-start justify-end p-4 text-left group ${
        selected
          ? 'scale-[1.03]'
          : 'border-surface-variant hover:-translate-y-1 hover:scale-[1.02]'
      }`}
      style={selected ? { borderColor: game.accentColor, boxShadow: `0 0 30px -5px ${game.accentColor}60` } : undefined}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENTS[game.id]} z-0`} />
      <div className="absolute inset-0 bg-surface-container-low z-[-1]" />

      {/* Big emoji bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 select-none z-0">
        {game.emoji}
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-3 right-3 z-20">
          <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1", color: game.accentColor }}>check_circle</span>
        </div>
      )}

      {/* Text */}
      <div className="relative z-10">
        <p className="font-heading font-black text-white uppercase tracking-wider text-sm leading-none">{game.name}</p>
        <p className="text-white/50 text-xs font-mono mt-0.5">{game.genre}</p>
      </div>
    </button>
  );
}