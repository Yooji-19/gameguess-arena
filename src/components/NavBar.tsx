'use client';

import React, { useState } from 'react';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface NavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const LINKTREE_URL = 'https://linktr.ee/uezenith';

export default function NavBar({ currentPage, onNavigate }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToAbout = () => {
    setMenuOpen(false);

    if (currentPage !== 'home') {
      onNavigate('home');
      window.setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
      return;
    }

    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const navigate = (page: Page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  const navItemClass = (active: boolean) =>
    `relative px-1 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
      active
        ? 'text-yellow-300'
        : 'text-white/60 hover:text-yellow-300'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-400/15 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="flex items-center gap-3"
          aria-label="Go to home page"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-yellow-400/40 bg-yellow-400/10 text-yellow-300">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </span>

          <span className="font-heading text-lg font-black uppercase tracking-[-0.03em] text-white">
            UEZE
            <span className="ml-1 text-yellow-400">Trivia</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          <button
            type="button"
            onClick={() => navigate('home')}
            className={navItemClass(currentPage === 'home')}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('games')}
            className={navItemClass(
              currentPage === 'games' ||
                currentPage === 'quiz-mode' ||
                currentPage === 'quiz' ||
                currentPage === 'results',
            )}
          >
            Play
          </button>

          <button
            type="button"
            onClick={() => navigate('leaderboard')}
            className={navItemClass(currentPage === 'leaderboard')}
          >
            Leaderboard
          </button>

          <button
            type="button"
            onClick={goToAbout}
            className={navItemClass(false)}
          >
            About
          </button>

          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={navItemClass(false)}
          >
            Linktree
          </a>
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => navigate('games')}
            className="inline-flex items-center gap-2 border border-yellow-400 bg-yellow-400 px-5 py-2.5 font-mono text-xs font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-yellow-300 hover:shadow-[0_0_24px_rgba(250,204,21,0.3)]"
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            Play Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-yellow-400/10 bg-black/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => navigate('games')}
              className="px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              Play
            </button>

            <button
              type="button"
              onClick={() => navigate('leaderboard')}
              className="px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              Leaderboard
            </button>

            <button
              type="button"
              onClick={goToAbout}
              className="px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              About
            </button>

            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              Info / Linktree
            </a>
          </div>
        </div>
      )}
    </header>
  );
}