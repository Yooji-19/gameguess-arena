'use client';
import React, { useEffect, useState } from 'react';

interface TimerBarProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
  onTick?: (timeLeft: number) => void;
}

export default function TimerBar({ timeLimit, onTimeUp, isActive, onTick }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (onTick) onTick(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp, onTick]);

  const pct = (timeLeft / timeLimit) * 100;
  const isWarning = timeLeft <= 5;
  const isLow = timeLeft <= 10;

  const barColor = isWarning
    ? 'bg-valo-red'
    : isLow
    ? 'bg-tertiary'
    : 'bg-secondary-container';

  const timerBg = isWarning
    ? 'border-valo-red animate-pulse-red'
    : isLow
    ? 'border-tertiary'
    : 'border-secondary-container';

  const timerTextColor = isWarning
    ? 'text-valo-red'
    : isLow
    ? 'text-tertiary'
    : 'text-on-surface';

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Progress bar */}
      <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Timer circle */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${timerBg} bg-surface-container-high flex-shrink-0`}
        style={{
          boxShadow: isWarning ? '0 0 10px rgba(255,70,85,0.5)' : undefined,
        }}
      >
        <span className={`font-heading font-bold text-lg ${timerTextColor}`}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
