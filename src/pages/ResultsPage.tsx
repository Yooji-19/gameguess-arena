'use client';
import React from 'react';
import { QuizResult } from '../types';
import ResultSummary from '../components/ResultSummary';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface ResultsPageProps {
  result: QuizResult | null;
  onNavigate: (page: Page) => void;
}

export default function ResultsPage({ result, onNavigate }: ResultsPageProps) {
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant font-body text-body-md mb-4">No results to show.</p>
          <button onClick={() => onNavigate('home')} className="text-primary font-mono hover:underline">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 md:px-12 py-28">
      {/* Atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-tertiary animate-float opacity-0"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${(i * 8.3) % 100}%`,
              top: `${50 + (i % 5) * 10}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <ResultSummary
          result={result}
          onPlayAgain={() => onNavigate('quiz-mode')}
          onViewLeaderboard={() => onNavigate('leaderboard')}
          onHome={() => onNavigate('home')}
        />
      </div>
    </div>
  );
}
