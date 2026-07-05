'use client';
import React, { useState } from 'react';

interface AudioPlayerProps {
  isVoiceLine?: boolean;
  label?: string;
}

export default function AudioPlayer({ isVoiceLine = true, label }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    setHasPlayed(true);
    // Simulate playback duration
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="w-full rounded-lg border border-surface-variant bg-surface-container-highest relative overflow-hidden flex flex-col items-center justify-center gap-4 p-6" style={{ minHeight: '160px' }}>
      {/* Waveform decoration */}
      <div className="flex items-end gap-1 h-12 opacity-30 select-none pointer-events-none">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-surface-variant'} transition-colors`}
            style={{
              height: `${20 + Math.sin((i / 24) * Math.PI * 4) * 18 + Math.random() * 10}px`,
              animationDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>

      {/* Play button */}
      <button
        onClick={handlePlay}
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border ${
          isPlaying
            ? 'bg-primary/30 border-primary shadow-[0_0_25px_rgba(210,187,255,0.5)] scale-110'
            : 'bg-primary/20 border-primary/60 hover:bg-primary/30 hover:scale-110 shadow-[0_0_15px_rgba(210,187,255,0.2)]'
        }`}
      >
        <span
          className="material-symbols-outlined text-primary text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {/* Status text */}
      <p className="text-label-sm font-mono text-on-surface-variant text-center">
        {!hasPlayed && (isVoiceLine ? 'Play voice line to identify the character' : label || 'Click to play audio')}
        {hasPlayed && isPlaying && '🔊 Playing...'}
        {hasPlayed && !isPlaying && '✓ Audio played — make your guess below'}
      </p>

      {/* Placeholder notice */}
      <span className="absolute bottom-2 right-2 text-label-sm font-mono text-outline/50 text-xs">
        [placeholder audio]
      </span>
    </div>
  );
}
