'use client';
import React from 'react';

type AnswerState = 'default' | 'correct' | 'incorrect' | 'revealed';

interface AnswerButtonProps {
  label: string;
  text: string;
  onClick: () => void;
  state?: AnswerState;
  disabled?: boolean;
}

export default function AnswerButton({ label, text, onClick, state = 'default', disabled }: AnswerButtonProps) {
  const styles: Record<AnswerState, string> = {
    default:   'border-surface-variant bg-surface-container-high hover:border-primary hover:bg-primary/10 cursor-pointer',
    correct:   'border-secondary-fixed bg-secondary-fixed/20 shadow-[0_0_20px_rgba(116,245,255,0.4)]',
    incorrect: 'border-valo-red bg-valo-red/20 shadow-[0_0_20px_rgba(255,70,85,0.4)]',
    revealed:  'border-secondary-fixed/40 bg-secondary-fixed/10',
  };

  const textStyles: Record<AnswerState, string> = {
    default:   'text-on-surface group-hover:text-primary',
    correct:   'text-secondary-fixed',
    incorrect: 'text-valo-red',
    revealed:  'text-secondary-fixed/70',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative border-2 rounded-xl p-4 flex items-center gap-4 w-full text-left transition-all duration-200 ${styles[state]} ${disabled && state === 'default' ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* Letter badge */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 border transition-colors ${
        state === 'correct' ? 'bg-secondary-fixed/30 border-secondary-fixed text-secondary-fixed' :
        state === 'incorrect' ? 'bg-valo-red/30 border-valo-red text-valo-red' :
        state === 'revealed' ? 'bg-secondary-fixed/20 border-secondary-fixed/40 text-secondary-fixed/70' :
        'bg-surface-container border-outline-variant text-outline group-hover:border-primary group-hover:text-primary'
      }`}>
        {label}
      </div>

      <span className={`font-heading font-semibold text-base flex-1 transition-colors ${textStyles[state]}`}>
        {text}
      </span>

      {state === 'correct' && (
        <span className="material-symbols-outlined text-secondary-fixed text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      )}
      {state === 'incorrect' && (
        <span className="material-symbols-outlined text-valo-red text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
      )}
    </button>
  );
}