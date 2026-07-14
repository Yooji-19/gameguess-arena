'use client';

import React from 'react';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LINKTREE_URL = 'https://linktr.ee/uezenith';

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-screen">
        <img
          src="/ueze-landing-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 h-full w-full object-contain object-center opacity-30 md:w-[72%] md:object-right md:opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-yellow-400/10 blur-[130px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-20 pt-28 md:px-12 lg:px-16">
          <div className="w-full max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-yellow-400/40 bg-black/55 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-yellow-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              Gaming Trivia Challenge
            </div>

            <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-white/50">
              University of the East
            </p>

            <h1 className="font-heading text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              <span className="block text-white">UEZE</span>
              <span className="block text-yellow-400">Booth Game</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              Identify characters, maps, and stages from your favorite games.
              Build your streak, earn time bonuses, and climb the leaderboard.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                ['5', 'Games'],
                ['2', 'Modes'],
                ['10', 'Questions'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="min-w-[92px] border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md"
                >
                  <div className="font-heading text-2xl font-black text-yellow-400">
                    {value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('games')}
                className="group inline-flex items-center justify-center gap-3 bg-yellow-400 px-8 py-4 font-mono text-sm font-black uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                Play Now
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('leaderboard')}
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-black/45 px-7 py-4 font-mono text-sm uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-yellow-400/60 hover:bg-yellow-400/10 hover:text-yellow-300"
              >
                <span className="material-symbols-outlined text-lg">
                  leaderboard
                </span>
                Leaderboard
              </button>
            </div>

            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Fast answers earn more points
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
      </section>

      <section
        id="about"
        className="scroll-mt-20 border-t border-yellow-400/10 bg-[#090907] px-6 py-20 md:px-12"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 border border-yellow-400/30 bg-yellow-400/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-yellow-300">
              About the Booth
            </div>

            <h2 className="font-heading text-4xl font-black uppercase leading-tight text-white md:text-5xl">
              #UNLEASH YOUR POTENTIAL
              <span className="block text-yellow-400">Represent UEZE.</span>
            </h2>
          </div>

          <div className="border border-white/10 bg-black/30 p-6 md:p-8">
            <p className="text-base leading-relaxed text-white/65">
              The UEZE Booth Game is a fast-paced gaming trivia experience
              featuring characters, maps, and stages from popular competitive
              games. Players can take on a single-game challenge or mix several
              games in one quiz.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['bolt', 'Time Bonus'],
                ['local_fire_department', 'Streak Bonus'],
                ['emoji_events', 'Leaderboard'],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="border border-white/10 bg-white/[0.025] p-4"
                >
                  <span className="material-symbols-outlined text-2xl text-yellow-400">
                    {icon}
                  </span>
                  <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-yellow-400/50 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-yellow-300 transition-colors hover:bg-yellow-400 hover:text-black"
            >
              View UEZenith Linktree
              <span className="material-symbols-outlined text-base">
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}