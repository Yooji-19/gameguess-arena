'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TimerBarProps {
  timeLimit: number;
  isActive: boolean;
  onTimeUp: () => void;
  onTick?: (t: number) => void;
}

export default function TimerBar({ timeLimit, isActive, onTimeUp, onTick }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Store callbacks in refs so they never cause the effect to re-run
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);
  useEffect(() => { onTimeUpRef.current = onTimeUp; }, [onTimeUp]);
  useEffect(() => { onTickRef.current = onTick; }, [onTick]);

  // Reset when a new question starts (timeLimit changes)
  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  // Tick interval — only depends on isActive and timeLeft
  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onTimeUpRef.current();
      return;
    }
    const t = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isActive, timeLeft]);

  const pct = (timeLeft / timeLimit) * 100;
  const isWarning = timeLeft <= 5;
  const isLow = timeLeft <= 10;
  const barColor = isWarning ? 'bg-valo-red' : isLow ? 'bg-tertiary' : 'bg-secondary-fixed';
  const textColor = isWarning ? 'text-valo-red' : isLow ? 'text-tertiary' : 'text-on-surface';
  const ringColor = isWarning ? 'border-valo-red animate-pulse-red' : isLow ? 'border-tertiary' : 'border-secondary-fixed/60';

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-2.5 bg-surface-variant rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${ringColor} bg-surface-container-high flex-shrink-0`}>
        <span className={`font-mono font-bold text-lg ${textColor}`}>{timeLeft}</span>
      </div>
    </div>
  );
}
