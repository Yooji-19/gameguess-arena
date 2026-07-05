'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GameId, ModeId, Question, QuizResult, Answer, QuizSession } from '../types';
import { GAMES, QUIZ_MODES, ALL_QUESTIONS } from '../data/mockData';
import { ScoreDisplay, StreakDisplay } from '../components/ScoreDisplay';
import TimerBar from '../components/TimerBar';
import AnswerButton from '../components/AnswerButton';
import AudioPlayer from '../components/AudioPlayer';
import {
  calculateTimeBonus,
  calculateStreakBonus,
  calculateRank,
  shuffleArray,
  saveHighScore,
  saveResult,
} from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';
type AnswerState = 'default' | 'selected' | 'correct' | 'incorrect' | 'revealed';

interface QuizGameplayPageProps {
  gameId: GameId | null;
  modeId: ModeId | null;
  onNavigate: (page: Page) => void;
  onQuizComplete: (result: QuizResult) => void;
}

export default function QuizGameplayPage({ gameId, modeId, onNavigate, onQuizComplete }: QuizGameplayPageProps) {
  const game = GAMES.find((g) => g.id === gameId);
  const mode = QUIZ_MODES.find((m) => m.id === modeId);

  // Build question set
  const [questions] = useState<Question[]>(() => {
    if (!gameId) return [];
    const pool = ALL_QUESTIONS[gameId] || [];
    const shuffled = shuffleArray(pool);
    const count = mode?.questionCount === 999 ? 999 : (mode?.questionCount || 10);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTimeBonus, setTotalTimeBonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode?.timeLimit || 20);
  const [timerActive, setTimerActive] = useState(true);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>({});
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [endlessLives, setEndlessLives] = useState(3);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPct = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;

  const isEndless = modeId === 'endless';

  const finishQuiz = useCallback(() => {
    const totalPossible = questions.reduce((acc, q) => acc + q.points + 200, 0); // approx
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const { rank, percentile } = calculateRank(score, totalPossible || 3000);

    const result: QuizResult = {
      gameId: gameId!,
      modeId: modeId!,
      score,
      totalQuestions,
      correctAnswers: correctCount,
      maxStreak,
      accuracy,
      timeBonus: totalTimeBonus,
      rank,
      percentile,
      date: new Date().toISOString(),
      duration: 0,
    };

    saveHighScore({ gameId: gameId!, modeId: modeId!, score, accuracy, date: new Date().toISOString() });
    saveResult(result);
    onQuizComplete(result);
    onNavigate('results');
  }, [correctCount, gameId, maxStreak, modeId, onNavigate, onQuizComplete, questions, score, totalQuestions, totalTimeBonus]);

  const handleAnswer = useCallback((answer: Answer) => {
    if (isAnswered || !currentQuestion) return;
    setTimerActive(false);
    setIsAnswered(true);
    setSelectedAnswerId(answer.id);

    const newStates: Record<string, AnswerState> = {};
    currentQuestion.answers.forEach((a) => {
      if (a.id === answer.id) {
        newStates[a.id] = a.isCorrect ? 'correct' : 'incorrect';
      } else if (a.isCorrect) {
        newStates[a.id] = 'revealed';
      } else {
        newStates[a.id] = 'default';
      }
    });
    setAnswerStates(newStates);

    if (answer.isCorrect) {
      const bonus = calculateTimeBonus(timeLeft, mode?.timeLimit || 20);
      const streakBonus = calculateStreakBonus(streak + 1);
      const earned = currentQuestion.points + bonus + streakBonus - (hintUsed ? 50 : 0);
      setScore((prev) => prev + Math.max(0, earned));
      setTotalTimeBonus((prev) => prev + bonus);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((m) => Math.max(m, newStreak));
        return newStreak;
      });
      setCorrectCount((prev) => prev + 1);
    } else {
      setStreak(0);
      if (isEndless) {
        setEndlessLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setTimeout(finishQuiz, 1200);
          }
          return next;
        });
      }
    }
  }, [isAnswered, currentQuestion, timeLeft, mode, streak, hintUsed, isEndless, finishQuiz]);

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;
    setTimerActive(false);
    setIsAnswered(true);
    // Reveal correct answer
    const newStates: Record<string, AnswerState> = {};
    currentQuestion?.answers.forEach((a) => {
      newStates[a.id] = a.isCorrect ? 'revealed' : 'default';
    });
    setAnswerStates(newStates);
    setStreak(0);
    if (isEndless) {
      setEndlessLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setTimeout(finishQuiz, 1200);
        }
        return next;
      });
    }
  }, [currentQuestion, isAnswered, isEndless, finishQuiz]);

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length && !isEndless) {
      finishQuiz();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setIsAnswered(false);
    setAnswerStates({});
    setSelectedAnswerId(null);
    setShowHint(false);
    setHintUsed(false);
    setTimeLeft(mode?.timeLimit || 20);
    setTimerActive(true);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface-variant">
        <div className="text-center">
          <p className="text-headline-md font-heading mb-4">No questions available.</p>
          <button onClick={() => onNavigate('games')} className="text-primary hover:underline font-mono">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const accentColor = game?.accentColor || '#d2bbff';
  const isVoiceLine = currentQuestion.type === 'voice-line';

  const LABELS = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{ backgroundColor: '#0b1326' }}>
      {/* Background atmospheric effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${accentColor}20, transparent 60%)`,
          }}
        />
      </div>

      {/* HUD header */}
      <header className="relative z-10 px-4 md:px-12 pt-24 pb-4 flex flex-col gap-3">
        {/* Progress + Timer */}
        <div className="flex items-center gap-3">
          <div className="text-label-sm font-mono text-outline">
            {currentIndex + 1}/{isEndless ? '∞' : totalQuestions}
          </div>
          <div className="flex-1">
            <TimerBar
              key={currentIndex}
              timeLimit={mode?.timeLimit || 20}
              onTimeUp={handleTimeUp}
              isActive={timerActive}
              onTick={setTimeLeft}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3">
          <ScoreDisplay score={score} size="sm" />
          <StreakDisplay streak={streak} size="sm" />

          {/* Progress bar */}
          <div className="flex-1 hidden md:block">
            <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Game badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="text-sm select-none">{game?.emoji}</span>
            <span className="text-label-sm font-mono text-on-surface-variant hidden sm:block">{game?.shortName}</span>
          </div>

          {/* Endless lives */}
          {isEndless && (
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-sm ${i < endlessLives ? 'text-valo-red' : 'text-surface-variant'}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-12 py-4 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Clue */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="rounded-xl p-5 border border-surface-variant bg-surface-container relative overflow-hidden">
            {/* Difficulty badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-label-sm font-mono border rounded-full px-2 py-0.5 ${
                  currentQuestion.difficulty === 'Hard'
                    ? 'text-valo-red border-valo-red/40 bg-valo-red/10'
                    : currentQuestion.difficulty === 'Medium'
                    ? 'text-tertiary border-tertiary/40 bg-tertiary/10'
                    : 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'
                }`}
              >
                {currentQuestion.difficulty}
              </span>
              <span className="text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 rounded-full px-2 py-0.5">
                {game?.name}
              </span>
              <span className="text-label-sm font-mono text-primary ml-auto">+{currentQuestion.points}pts</span>
            </div>

            <h2 className="text-headline-md font-heading text-white font-bold mb-3 leading-snug">
              {currentQuestion.prompt}
            </h2>
            {currentQuestion.subPrompt && (
              <p className="text-body-md font-body text-on-surface-variant mb-4">
                {currentQuestion.subPrompt}
              </p>
            )}

            {/* Audio player for voice lines */}
            {isVoiceLine && <AudioPlayer isVoiceLine />}

            {/* Hint */}
            {showHint && currentQuestion.hint && (
              <div className="mt-3 p-3 rounded-lg bg-tertiary/10 border border-tertiary/30 animate-fade-in">
                <p className="text-label-sm font-mono text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  {currentQuestion.hint}
                </p>
              </div>
            )}
          </div>

          {/* Utility actions */}
          <div className="flex items-center justify-between">
            {currentQuestion.hint && !isAnswered && !hintUsed && (
              <button
                onClick={() => { setShowHint(true); setHintUsed(true); }}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-label-sm font-mono"
              >
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Use Hint (-50 pts)
              </button>
            )}
            {hintUsed && (
              <span className="text-label-sm font-mono text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Hint used
              </span>
            )}
            <button
              onClick={() => { if (window.confirm('Surrender this quiz?')) finishQuiz(); }}
              className="flex items-center gap-1.5 text-outline hover:text-valo-red transition-colors text-label-sm font-mono ml-auto"
            >
              <span className="material-symbols-outlined text-sm">exit_to_app</span>
              Surrender
            </button>
          </div>
        </div>

        {/* Right: Answers */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.answers.map((answer, idx) => (
              <AnswerButton
                key={answer.id}
                label={LABELS[idx]}
                text={answer.text}
                onClick={() => handleAnswer(answer)}
                state={answerStates[answer.id] || 'default'}
                disabled={isAnswered}
              />
            ))}
          </div>

          {/* Next button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-[1.01] transition-all animate-fade-in"
              style={{ boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}
            >
              {currentIndex + 1 >= totalQuestions && !isEndless ? (
                <>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  View Results
                </>
              ) : (
                <>
                  Next Question
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          )}

          {/* Answer feedback */}
          {isAnswered && selectedAnswerId && (
            <div className={`text-center text-label-sm font-mono animate-fade-in ${
              currentQuestion.answers.find((a) => a.id === selectedAnswerId)?.isCorrect
                ? 'text-secondary-fixed'
                : 'text-valo-red'
            }`}>
              {currentQuestion.answers.find((a) => a.id === selectedAnswerId)?.isCorrect ? (
                <span className="flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Correct! +{currentQuestion.points + calculateTimeBonus(timeLeft, mode?.timeLimit || 20) + calculateStreakBonus(streak) - (hintUsed ? 50 : 0)} pts
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                  Incorrect — correct answer highlighted above
                </span>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
