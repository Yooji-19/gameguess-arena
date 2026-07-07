'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { GameId, ModeId, Question, QuizResult, Answer } from '../types';
import { GAMES, QUIZ_MODES, ALL_QUESTIONS } from '../data/mockData';
import TimerBar from '../components/TimerBar';
import AnswerButton from '../components/AnswerButton';
import { calculateTimeBonus, calculateStreakBonus, calculateRank, shuffleArray } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';
type AnswerState = 'default' | 'correct' | 'incorrect' | 'revealed';

interface Props {
  gameId: GameId | null;
  modeId: ModeId | null;
  onNavigate: (page: Page) => void;
  onQuizComplete: (result: QuizResult) => void;
}

export default function QuizGameplayPage({ gameId, modeId, onNavigate, onQuizComplete }: Props) {
  const game = GAMES.find(g => g.id === gameId);
  const mode = QUIZ_MODES.find(m => m.id === modeId);

  const [questions] = useState<Question[]>(() => {
    if (!gameId || !modeId) return [];
    const pool = modeId === 'character-guess'
      ? ALL_QUESTIONS[gameId]?.character ?? []
      : ALL_QUESTIONS[gameId]?.map ?? [];
    return shuffleArray(pool).slice(0, mode?.questionCount ?? 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTimeBonus, setTotalTimeBonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode?.timeLimit ?? 20);
  const [timerActive, setTimerActive] = useState(true);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [imgError, setImgError] = useState(false);

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const LABELS = ['A', 'B', 'C', 'D'];

  const finishQuiz = useCallback((finalScore: number, finalCorrect: number, finalStreak: number, finalTimeBonus: number) => {
    const accuracy = total > 0 ? Math.round((finalCorrect / total) * 100) : 0;
    const result: QuizResult = {
      gameId: gameId!,
      modeId: modeId!,
      score: finalScore,
      totalQuestions: total,
      correctAnswers: finalCorrect,
      accuracy,
      timeBonus: finalTimeBonus,
      maxStreak: finalStreak,
      rank: calculateRank(accuracy),
      date: new Date().toISOString(),
    };
    onQuizComplete(result);
    onNavigate('results');
  }, [gameId, modeId, total, onQuizComplete, onNavigate]);

  const handleAnswer = useCallback((answer: Answer) => {
    if (isAnswered || !currentQ) return;
    setTimerActive(false);
    setIsAnswered(true);

    const states: Record<string, AnswerState> = {};
    currentQ.answers.forEach(a => {
      if (a.id === answer.id) states[a.id] = a.isCorrect ? 'correct' : 'incorrect';
      else if (a.isCorrect) states[a.id] = 'revealed';
      else states[a.id] = 'default';
    });
    setAnswerStates(states);

    if (answer.isCorrect) {
      const tBonus = calculateTimeBonus(timeLeft, mode?.timeLimit ?? 20);
      const sBonus = calculateStreakBonus(streak + 1);
      const earned = currentQ.points + tBonus + sBonus;
      setScore(prev => prev + earned);
      setTotalTimeBonus(prev => prev + tBonus);
      setStreak(prev => { const ns = prev + 1; setMaxStreak(m => Math.max(m, ns)); return ns; });
      setCorrectCount(prev => prev + 1);
      setLastCorrect(true);
    } else {
      setStreak(0);
      setLastCorrect(false);
    }
  }, [isAnswered, currentQ, timeLeft, mode, streak]);

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;
    setTimerActive(false);
    setIsAnswered(true);
    setLastCorrect(false);
    setStreak(0);
    const states: Record<string, AnswerState> = {};
    currentQ?.answers.forEach(a => { states[a.id] = a.isCorrect ? 'revealed' : 'default'; });
    setAnswerStates(states);
  }, [isAnswered, currentQ]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      finishQuiz(score, correctCount, maxStreak, totalTimeBonus);
      return;
    }
    setCurrentIndex(nextIndex);
    setIsAnswered(false);
    setAnswerStates({});
    setLastCorrect(null);
    setTimeLeft(mode?.timeLimit ?? 20);
    setTimerActive(true);
    setImgError(false);
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4 font-body">No questions available for this selection.</p>
          <button onClick={() => onNavigate('games')} className="text-primary font-mono hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const accentColor = game?.accentColor ?? '#d2bbff';
  const progressPct = (currentIndex / total) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Atmospheric bg */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: `radial-gradient(ellipse at top, ${accentColor}15, transparent 60%)` }} />

      {/* HUD */}
      <header className="relative z-10 px-4 md:px-10 pt-20 pb-3 flex flex-col gap-3">
        {/* Top row: back + game badge + score */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (window.confirm('Quit this quiz?')) onNavigate('home'); }}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="text-sm select-none">{game?.emoji}</span>
            <span className="text-xs font-mono text-on-surface-variant">{game?.shortName}</span>
          </div>

          <div className="flex-1" />

          {/* Score */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-outline uppercase">Score</span>
              <span className="text-xl font-heading font-bold text-on-surface">{score.toLocaleString()}</span>
            </div>
            {streak >= 2 && (
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-outline uppercase">Streak</span>
                <span className={`text-xl font-heading font-bold ${streak >= 5 ? 'text-valo-red' : 'text-tertiary'}`}>{streak}x 🔥</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-outline w-14">{currentIndex + 1} / {total}</span>
          <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Timer */}
        <TimerBar
          key={currentIndex}
          timeLimit={mode?.timeLimit ?? 20}
          isActive={timerActive}
          onTimeUp={handleTimeUp}
          onTick={setTimeLeft}
        />
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-10 py-4 flex flex-col lg:flex-row gap-6">

        {/* Left: Image + prompt */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Difficulty + points */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono border rounded-full px-2 py-0.5 ${
              currentQ.difficulty === 'Hard' ? 'text-valo-red border-valo-red/40 bg-valo-red/10' :
              currentQ.difficulty === 'Medium' ? 'text-tertiary border-tertiary/40 bg-tertiary/10' :
              'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'
            }`}>{currentQ.difficulty}</span>
            <span className="text-xs font-mono text-primary ml-auto">+{currentQ.points} pts</span>
          </div>

          {/* Question prompt */}
          <h2 className="text-2xl font-heading font-bold text-white leading-snug">{currentQ.prompt}</h2>

          {/* Image */}
          <div className="relative w-full rounded-xl overflow-hidden border border-surface-variant bg-surface-container-high flex items-center justify-center" style={{ minHeight: '240px', height: '260px' }}>
            {imgError ? (
              <div className="flex flex-col items-center gap-3 text-on-surface-variant p-6">
                <span className="material-symbols-outlined text-5xl text-outline">image_not_supported</span>
                <p className="text-sm font-mono text-center text-outline">Image not found.<br />Add it to <code className="text-primary">public{currentQ.image}</code></p>
              </div>
            ) : (
              <Image
                src={currentQ.image}
                alt="Quiz question"
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                unoptimized
              />
            )}

            {/* Feedback overlay */}
            {isAnswered && lastCorrect !== null && (
              <div className={`absolute inset-0 flex items-center justify-center animate-fade-in ${
                lastCorrect ? 'bg-secondary-fixed/10' : 'bg-valo-red/10'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${
                  lastCorrect ? 'border-secondary-fixed bg-secondary-fixed/20' : 'border-valo-red bg-valo-red/20'
                }`}>
                  <span className={`material-symbols-outlined text-5xl ${lastCorrect ? 'text-secondary-fixed' : 'text-valo-red'}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}>
                    {lastCorrect ? 'check' : 'close'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Time up message */}
          {isAnswered && lastCorrect === false && !currentQ.answers.find(a => answerStates[a.id] === 'incorrect') && (
            <p className="text-center text-xs font-mono text-valo-red flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">timer_off</span>
              Time's up! The correct answer is highlighted.
            </p>
          )}
        </div>

        {/* Right: Answers */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-center">
          {currentQ.answers.map((answer, idx) => (
            <AnswerButton
              key={answer.id}
              label={LABELS[idx]}
              text={answer.text}
              onClick={() => handleAnswer(answer)}
              state={answerStates[answer.id] ?? 'default'}
              disabled={isAnswered}
            />
          ))}

          {/* Feedback message */}
          {isAnswered && (
            <p className={`text-center text-sm font-mono mt-1 animate-fade-in ${lastCorrect ? 'text-secondary-fixed' : 'text-valo-red'}`}>
              {lastCorrect
                ? `✓ Correct! +${currentQ.points + calculateTimeBonus(timeLeft, mode?.timeLimit ?? 20) + calculateStreakBonus(streak)} pts`
                : '✗ Wrong answer'}
            </p>
          )}

          {/* Next button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-2 w-full py-4 rounded-xl font-mono font-bold text-base uppercase tracking-widest text-on-primary-container flex items-center justify-center gap-2 transition-all hover:scale-[1.01] animate-fade-in"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #00dbe7)', boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}
            >
              {currentIndex + 1 >= total ? (
                <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>View Results</>
              ) : (
                <>Next Question<span className="material-symbols-outlined">arrow_forward</span></>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}