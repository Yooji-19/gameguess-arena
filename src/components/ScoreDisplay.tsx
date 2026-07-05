'use client';
import React from 'react';

interface ScoreDisplayProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showGlow?: boolean;
}

export function ScoreDisplay({ score, label = 'Score', size = 'md', showGlow }: ScoreDisplayProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  const scoreSizes = {
    sm: 'text-lg',
    md: 'text-headline-md',
    lg: 'text-headline-lg',
  };

  return (
    <div
      className={`bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`}
      style={showGlow ? { boxShadow: '0 0 15px rgba(210,187,255,0.2)' } : undefined}
    >
      <span className="text-label-sm font-body text-outline uppercase tracking-widest">
        {label}
      </span>
      <span className={`${scoreSizes[size]} font-heading font-bold text-on-surface`}>
        {score.toLocaleString()}
      </span>
    </div>
  );
}

interface StreakDisplayProps {
  streak: number;
  size?: 'sm' | 'md';
}

export function StreakDisplay({ streak, size = 'md' }: StreakDisplayProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
  };

  const isHot = streak >= 3;
  const isOnFire = streak >= 5;

  return (
    <div className={`bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`}>
      <span className="text-label-sm font-body text-outline uppercase tracking-widest">
        Streak
      </span>
      <span
        className={`text-headline-md font-heading font-bold flex items-center gap-1 ${
          isOnFire ? 'text-valo-red' : isHot ? 'text-tertiary' : 'text-on-surface'
        }`}
      >
        {streak}x{' '}
        {isHot && (
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
        )}
      </span>
    </div>
  );
}
