'use client';
import React from 'react';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface NavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function NavBar({ currentPage, onNavigate }: NavBarProps) {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-surface/90 backdrop-blur-xl border-b border-surface-variant">
        <button
          onClick={() => onNavigate('home')}
          className="font-heading font-black text-xl italic text-primary tracking-tighter hover:text-secondary transition-all"
        >
          TRIVIA-X
        </button>

        <div className="hidden md:flex gap-8">
          {([
            { label: 'Home', page: 'home' as Page },
            { label: 'Play', page: 'games' as Page },
            { label: 'Leaderboard', page: 'leaderboard' as Page },
          ]).map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-sm font-body font-semibold uppercase tracking-wide transition-all ${
                currentPage === link.page
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side play button on desktop */}
        <button
          onClick={() => onNavigate('games')}
          className="hidden md:flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-mono text-xs px-4 py-2 rounded-lg uppercase tracking-widest transition-all"
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          Play Now
        </button>
      </nav>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex bg-surface border-t border-surface-variant z-50">
        {([
          { label: 'Home', page: 'home' as Page, icon: 'home' },
          { label: 'Play', page: 'games' as Page, icon: 'sports_esports' },
          { label: 'Scores', page: 'leaderboard' as Page, icon: 'leaderboard' },
        ]).map(link => (
          <button
            key={link.page}
            onClick={() => onNavigate(link.page)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
              currentPage === link.page ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentPage === link.page ? "'FILL' 1" : "'FILL' 0" }}>
              {link.icon}
            </span>
            <span className="text-[10px] font-mono uppercase">{link.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
