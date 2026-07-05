'use client';
import React from 'react';
import { GAMES, QUIZ_MODES } from '../data/mockData';
import GameCard from '../components/GameCard';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-16 md:py-28 relative">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-primary/20 text-primary text-label-sm font-mono tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
          Live · Season 4
        </div>

        <h1 className="text-5xl md:text-[72px] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-container mb-6 leading-tight uppercase">
          GameGuess Arena
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mb-8">
          Can you recognize the voice, character, or map? Test your gaming knowledge across VALORANT, Pokémon, LoL, MLBB, and Tekken.
        </p>
        <button
          onClick={() => onNavigate('games')}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest transition-all duration-300 hover:-skew-x-3 hover:scale-105"
          style={{ boxShadow: '0 0 25px rgba(210,187,255,0.4), inset 0 0 10px rgba(210,187,255,0.1)' }}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          Play Now
        </button>
      </section>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Games section */}
        <section className="md:col-span-8 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-headline-lg font-heading text-primary">Choose Your Game</h2>
            <button
              onClick={() => onNavigate('games')}
              className="text-label-sm font-mono text-secondary hover:underline uppercase"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GAMES.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => onNavigate('games')}
              />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Quick play modes */}
          <div className="glass-panel rounded-xl p-5">
            <h3 className="text-headline-md font-heading text-on-surface mb-4">Quick Play</h3>
            <div className="flex flex-col gap-2">
              {QUIZ_MODES.slice(0, 4).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onNavigate('games')}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container hover:border-primary/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant/30 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-colors">
                      {mode.icon}
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-heading font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {mode.name}
                    </p>
                    <p className="text-label-sm font-mono text-outline">{mode.timeLimit}s/Q</p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors">chevron_right</span>
                </button>
              ))}
            </div>
          </div>

          {/* Daily challenge banner */}
          <div className="glass-panel rounded-xl p-5 border border-tertiary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-tertiary/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
                <span className="text-label-sm font-mono text-tertiary uppercase tracking-widest">Daily Challenge</span>
              </div>
              <h3 className="text-headline-md font-heading text-on-surface mb-1">Fresh questions every 24h</h3>
              <p className="text-label-sm font-body text-on-surface-variant mb-4">Compete with players worldwide for the top spot.</p>
              <button
                onClick={() => onNavigate('games')}
                className="w-full flex items-center justify-center gap-2 border border-tertiary/50 text-tertiary hover:bg-tertiary/10 font-mono text-label-lg py-2.5 rounded-lg uppercase tracking-widest transition-all text-sm"
              >
                Accept Challenge
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Stats widget */}
          <div className="glass-panel rounded-xl p-5">
            <h3 className="text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-4">Global Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Players', value: '142K', icon: 'groups' },
                { label: 'Questions', value: '645', icon: 'quiz' },
                { label: 'Games', value: '5', icon: 'sports_esports' },
                { label: 'Avg Score', value: '3,280', icon: 'trending_up' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-container-high rounded-lg p-3 border border-outline-variant/20">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm text-outline">{stat.icon}</span>
                    <span className="text-label-sm font-mono text-outline uppercase text-xs">{stat.label}</span>
                  </div>
                  <div className="text-headline-md font-heading text-on-surface font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
