'use client';
import React from 'react';
import { Achievement } from '../types';

const RARITY_STYLES: Record<string, string> = {
  Common: 'border-outline-variant/50 bg-surface-container-low',
  Rare: 'border-primary/40 bg-primary/5',
  Epic: 'border-secondary-container/60 bg-secondary-container/10',
  Legendary: 'border-tertiary/60 bg-tertiary/10',
};

const RARITY_LABEL_COLORS: Record<string, string> = {
  Common: 'text-outline',
  Rare: 'text-primary',
  Epic: 'text-secondary-container',
  Legendary: 'text-tertiary',
};

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md';
}

export default function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const isLocked = !achievement.isUnlocked;

  return (
    <div
      className={`relative border rounded-xl flex flex-col items-center text-center gap-2 transition-all duration-200 ${
        size === 'sm' ? 'p-3' : 'p-4'
      } ${RARITY_STYLES[achievement.rarity]} ${
        isLocked ? 'opacity-40 grayscale' : 'hover:-translate-y-0.5'
      }`}
    >
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="material-symbols-outlined text-outline/70 text-2xl">lock</span>
        </div>
      )}

      {/* Rarity indicator */}
      <div className="absolute top-2 right-2">
        <span className={`text-label-sm font-mono text-[10px] ${RARITY_LABEL_COLORS[achievement.rarity]}`}>
          {achievement.rarity[0]}
        </span>
      </div>

      {/* Icon */}
      <div className={`${size === 'sm' ? 'text-2xl' : 'text-4xl'} select-none`}>
        {achievement.icon}
      </div>

      {/* Text */}
      <div>
        <p className={`font-heading font-semibold text-on-surface ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {achievement.name}
        </p>
        {size === 'md' && (
          <p className="text-label-sm font-body text-on-surface-variant mt-0.5 leading-tight">
            {achievement.description}
          </p>
        )}
        {achievement.isUnlocked && achievement.unlockedAt && (
          <p className="text-label-sm font-mono text-outline text-[10px] mt-1">
            {new Date(achievement.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  );
}
