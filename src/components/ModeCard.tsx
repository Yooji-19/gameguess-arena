'use client';
import React from 'react';
import { QuizMode } from '../types';

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10',
  Medium: 'text-tertiary border-tertiary/40 bg-tertiary/10',
  Hard: 'text-valo-red border-valo-red/40 bg-valo-red/10',
  Variable: 'text-primary border-primary/40 bg-primary/10',
};

interface ModeCardProps {
  mode: QuizMode;
  onClick: () => void;
  selected?: boolean;
}

export default function ModeCard({ mode, onClick, selected }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative border rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 text-left w-full ${
        selected
          ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.3)]'
          : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/50 hover:bg-surface-container hover:-translate-y-0.5'
      }`}
    >
      {/* Badge */}
      {mode.badge && (
        <div className="absolute top-3 right-3">
          <span className="text-label-sm font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full">
            {mode.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
          selected
            ? 'bg-primary/20 border-primary/30'
            : 'bg-surface-container-high border-outline-variant/30 group-hover:bg-primary/10 group-hover:border-primary/20'
        } transition-all`}
      >
        <span
          className={`material-symbols-outlined text-xl ${selected ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors`}
          style={{ fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}
        >
          {mode.icon}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className={`font-heading font-semibold text-base mb-1 ${selected ? 'text-primary' : 'text-on-surface group-hover:text-primary'} transition-colors`}>
          {mode.name}
        </h3>
        <p className="text-label-sm font-body text-on-surface-variant leading-relaxed">
          {mode.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/20">
        <span className={`text-label-sm font-mono border rounded-full px-2 py-0.5 ${DIFFICULTY_COLORS[mode.difficulty]}`}>
          {mode.difficulty}
        </span>
        <div className="flex items-center gap-1 text-outline text-label-sm font-mono">
          <span className="material-symbols-outlined text-xs">timer</span>
          {mode.questionCount === 999 ? '∞' : mode.questionCount}Q · {mode.timeLimit}s
        </div>
      </div>
    </button>
  );
}
