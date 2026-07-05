'use client';
import React from 'react';

interface AnswerButtonProps {
  label: string;
  text: string;
  onClick: () => void;
  state?: 'default' | 'selected' | 'correct' | 'incorrect' | 'revealed';
  disabled?: boolean;
}

export default function AnswerButton({ label, text, onClick, state = 'default', disabled }: AnswerButtonProps) {
  const stateClasses = {
    default: 'border-surface-variant bg-surface-container-high hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(210,187,255,0.3)]',
    selected: 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.4)]',
    correct: 'border-secondary-fixed bg-secondary-fixed/20 shadow-[0_0_30px_rgba(116,245,255,0.5)]',
    incorrect: 'border-valo-red bg-valo-red/20 shadow-[0_0_30px_rgba(255,70,85,0.5)]',
    revealed: 'border-secondary-fixed/50 bg-secondary-fixed/10',
  };

  const textColors = {
    default: 'text-white group-hover:text-primary',
    selected: 'text-primary',
    correct: 'text-secondary-fixed',
    incorrect: 'text-valo-red',
    revealed: 'text-secondary-fixed/80',
  };

  const labelColors = {
    default: 'text-outline',
    selected: 'text-primary/70',
    correct: 'text-secondary-fixed/70',
    incorrect: 'text-valo-red/70',
    revealed: 'text-secondary-fixed/50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 w-full text-left ${stateClasses[state]} ${
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
      } ${!disabled && state === 'default' ? 'hover:-skew-x-1' : ''}`}
      style={{ minHeight: '80px' }}
    >
      {/* Label indicator */}
      <div className={`absolute top-2 left-3 text-label-sm font-mono ${labelColors[state]} font-bold`}>
        {label}
      </div>

      {/* State icon */}
      {state === 'correct' && (
        <div className="absolute top-2 right-3">
          <span className="material-symbols-outlined text-secondary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
      )}
      {state === 'incorrect' && (
        <div className="absolute top-2 right-3">
          <span className="material-symbols-outlined text-valo-red text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            cancel
          </span>
        </div>
      )}

      <span className={`text-headline-md font-heading font-bold ${textColors[state]} transition-colors text-center`}>
        {text}
      </span>
    </button>
  );
}
