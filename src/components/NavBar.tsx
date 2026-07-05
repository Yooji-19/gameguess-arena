'use client';
import React from 'react';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface NavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  username?: string;
}

export default function NavBar({ currentPage, onNavigate, username = 'Guest' }: NavBarProps) {
  const navLinks: { label: string; page: Page; icon: string }[] = [
    { label: 'Home', page: 'home', icon: 'home' },
    { label: 'Games', page: 'games', icon: 'sports_esports' },
    { label: 'Leaderboard', page: 'leaderboard', icon: 'leaderboard' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-20 bg-surface/90 backdrop-blur-xl border-b border-surface-variant"
      style={{ boxShadow: '0 0 15px rgba(210,187,255,0.1)' }}
    >
      {/* Logo */}
      <button
        onClick={() => onNavigate('home')}
        className="font-display font-black text-2xl italic text-primary tracking-tighter hover:text-secondary transition-all hover:scale-105"
      >
        TRIVIA-X
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <button
            key={link.page}
            onClick={() => onNavigate(link.page)}
            className={`text-label-lg font-body font-medium uppercase tracking-wide transition-all hover:scale-105 ${
              currentPage === link.page
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="text-primary hover:text-secondary transition-colors">
          <span className="material-symbols-outlined">emoji_events</span>
        </button>

        {/* Profile avatar */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${
            currentPage === 'profile'
              ? 'border-primary bg-primary/10'
              : 'border-surface-variant hover:border-primary/50 bg-surface-container-high'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-surface-variant border border-primary/50 flex items-center justify-center text-sm select-none">
            {username[0]?.toUpperCase() || 'G'}
          </div>
          <span className="hidden sm:block text-label-sm font-mono text-on-surface-variant">
            {username}
          </span>
        </button>
      </div>

      {/* Mobile bottom nav indicator */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex bg-surface border-t border-surface-variant z-50">
        {navLinks.map((link) => (
          <button
            key={link.page}
            onClick={() => onNavigate(link.page)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
              currentPage === link.page ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentPage === link.page ? "'FILL' 1" : "'FILL' 0" }}>
              {link.icon}
            </span>
            <span className="text-[10px] font-mono uppercase">{link.label}</span>
          </button>
        ))}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
            currentPage === 'profile' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentPage === 'profile' ? "'FILL' 1" : "'FILL' 0" }}>
            person
          </span>
          <span className="text-[10px] font-mono uppercase">Profile</span>
        </button>
      </div>
    </nav>
  );
}
