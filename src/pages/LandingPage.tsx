'use client';
import React from 'react';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-3xl">

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary-fixed to-tertiary uppercase leading-none tracking-tight">
            UEZE 
          </h1>
          <h2 className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary-fixed to-tertiary uppercase leading-none tracking-tight">
            Booth Game
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-on-surface-variant font-body text-lg max-w-xl">
          Identify characters, maps, and stages from your favorite games. How well do you know them?
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => onNavigate('games')}
            className="flex items-center gap-3 px-10 py-4 rounded-xl font-mono font-bold text-lg uppercase tracking-widest text-on-primary-container transition-all duration-300 hover:scale-105 hover:-skew-x-2"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #00dbe7)',
              boxShadow: '0 0 30px rgba(210,187,255,0.35), inset 0 0 15px rgba(210,187,255,0.1)',
            }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            Play Now
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="flex items-center gap-2 px-6 py-4 rounded-xl font-mono text-sm uppercase tracking-widest border border-primary/30 text-primary hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined text-lg">leaderboard</span>
            Leaderboard
          </button>
        </div>
      </div>
    </main>
  );
}
