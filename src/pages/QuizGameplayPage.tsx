'use client';
import React, { useState, useCallback, useMemo } from 'react';
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

// Random zoom configs — different part of image each question
const ZOOM_CONFIGS = [
  { scale: 2.2, originX: '50%', originY: '15%', label: 'Face area' },
  { scale: 2.4, originX: '45%', originY: '30%', label: 'Chest area' },
  { scale: 2.6, originX: '55%', originY: '10%', label: 'Head/helmet' },
  { scale: 2.0, originX: '40%', originY: '50%', label: 'Mid body' },
  { scale: 2.8, originX: '60%', originY: '20%', label: 'Shoulder' },
  { scale: 2.2, originX: '50%', originY: '60%', label: 'Lower body' },
  { scale: 2.5, originX: '35%', originY: '25%', label: 'Left side' },
  { scale: 2.5, originX: '65%', originY: '25%', label: 'Right side' },
  { scale: 3.0, originX: '50%', originY: '5%',  label: 'Top of head' },
  { scale: 2.0, originX: '50%', originY: '75%', label: 'Legs/feet' },
];

function getZoomForQuestion(questionId: string) {
  // Deterministic random based on question ID so it's always the same per question
  let hash = 0;
  for (let i = 0; i < questionId.length; i++) {
    hash = (hash * 31 + questionId.charCodeAt(i)) % ZOOM_CONFIGS.length;
  }
  return ZOOM_CONFIGS[hash];
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
  const [revealed, setRevealed] = useState(false);

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const LABELS = ['A', 'B', 'C', 'D'];
  const shouldPixelate = currentQ?.pixelate && !revealed;

  // Get zoom config for this specific question — consistent per question ID
  const zoomConfig = useMemo(
    () => currentQ ? getZoomForQuestion(currentQ.id) : ZOOM_CONFIGS[0],
    [currentQ?.id]
  );

  const finishQuiz = useCallback((
    finalScore: number, finalCorrect: number,
    finalStreak: number, finalTimeBonus: number
  ) => {
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
    setRevealed(true);

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
      setStreak(prev => {
        const ns = prev + 1;
        setMaxStreak(m => Math.max(m, ns));
        return ns;
      });
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
    setRevealed(true);
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
    setRevealed(false);
    setTimeLeft(mode?.timeLimit ?? 20);
    setTimerActive(true);
    setImgError(false);
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4 font-body">No questions available.</p>
          <button onClick={() => onNavigate('games')} className="text-primary font-mono hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const accentColor = game?.accentColor ?? '#d2bbff';
  const progressPct = (currentIndex / total) * 100;
  const earnedThisQ = currentQ.points
    + calculateTimeBonus(timeLeft, mode?.timeLimit ?? 20)
    + calculateStreakBonus(streak);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at top, ${accentColor}12, transparent 60%)` }}
      />

      {/* HUD */}
      <header className="relative z-10 px-4 md:px-10 pt-20 pb-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (window.confirm('Quit this quiz?')) onNavigate('home'); }}
            className="text-on-surface-variant hover:text-valo-red transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="text-sm select-none">{game?.emoji}</span>
            <span className="text-xs font-mono text-on-surface-variant">{game?.shortName}</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container border border-outline-variant/20">
            <span className="material-symbols-outlined text-xs text-outline">
              {modeId === 'character-guess' ? 'person_search' : 'map'}
            </span>
            <span className="text-xs font-mono text-outline hidden sm:block">
              {modeId === 'character-guess' ? 'Character' : 'Map/Stage'}
            </span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-outline uppercase">Score</span>
              <span className="text-2xl font-heading font-bold text-on-surface leading-none">
                {score.toLocaleString()}
              </span>
            </div>
            {streak >= 2 && (
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-outline uppercase">Streak</span>
                <span className={`text-2xl font-heading font-bold leading-none ${streak >= 5 ? 'text-valo-red' : 'text-tertiary'}`}>
                  {streak}x 🔥
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-outline w-14 flex-shrink-0">
            {currentIndex + 1} / {total}
          </span>
          <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <TimerBar
          key={currentIndex}
          timeLimit={mode?.timeLimit ?? 20}
          isActive={timerActive}
          onTimeUp={handleTimeUp}
          onTick={setTimeLeft}
        />
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-10 py-4 flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-1/2 flex flex-col gap-3">

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono border rounded-full px-2 py-0.5 ${
              currentQ.difficulty === 'Hard'   ? 'text-valo-red border-valo-red/40 bg-valo-red/10' :
              currentQ.difficulty === 'Medium' ? 'text-tertiary border-tertiary/40 bg-tertiary/10' :
                                                 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'
            }`}>{currentQ.difficulty}</span>

            {currentQ.pixelate && !revealed && (
              <span className="text-xs font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">search</span>
                Zoomed In
              </span>
            )}
            {revealed && currentQ.pixelate && (
              <span className="text-xs font-mono text-secondary-fixed border border-secondary-fixed/30 bg-secondary-fixed/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span>
                Revealed
              </span>
            )}
            <span className="text-xs font-mono text-primary ml-auto">+{currentQ.points} pts</span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Image box */}
          <div
            className="relative w-full rounded-xl overflow-hidden border border-surface-variant bg-surface-container-high"
            style={{ height: '300px' }}
          >
            {imgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6">
                <span className="material-symbols-outlined text-5xl text-outline">image_not_supported</span>
                <p className="text-sm font-mono text-outline">Image failed to load.<br />Check internet connection.</p>
              </div>
            ) : (
              <>
                <img
                  key={currentQ.id}
                  src={currentQ.image}
                  alt="Quiz question"
                  onError={() => setImgError(true)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    // Random zoom per question — scale and origin from zoomConfig
                    transform: shouldPixelate
                      ? `scale(${zoomConfig.scale})`
                      : 'scale(1)',
                    transformOrigin: shouldPixelate
                      ? `${zoomConfig.originX} ${zoomConfig.originY}`
                      : 'center center',
                    // Very light blur — just enough to soften edges, not hide everything
                    filter: shouldPixelate
                      ? 'blur(2.5px) brightness(1.0)'
                      : 'blur(0px) brightness(1)',
                    transition: 'transform 0.7s ease, filter 0.7s ease, transform-origin 0.7s ease',
                  }}
                />

                {/* Soft vignette to hide the hard crop edges */}
                {shouldPixelate && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, rgba(11,19,38,0.9) 100%)',
                    }}
                  />
                )}

                {/* "?" badge */}
                {shouldPixelate && (
                  <div className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
                    <span className="text-white/70 font-mono font-bold text-base">?</span>
                  </div>
                )}

                {/* Answer feedback */}
                {isAnswered && lastCorrect !== null && (
                  <div className="absolute inset-0 flex items-end justify-center pb-4 z-20 pointer-events-none">
                    <div className={`px-4 py-2 rounded-full border-2 font-mono font-bold text-sm flex items-center gap-2 backdrop-blur-sm ${
                      lastCorrect
                        ? 'bg-secondary-fixed/20 border-secondary-fixed text-secondary-fixed'
                        : 'bg-valo-red/20 border-valo-red text-valo-red'
                    }`}>
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {lastCorrect ? 'check_circle' : 'cancel'}
                      </span>
                      {lastCorrect ? 'Correct!' : 'Wrong!'}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isAnswered && lastCorrect === false && !Object.values(answerStates).includes('incorrect') && (
            <p className="text-center text-xs font-mono text-valo-red flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">timer_off</span>
              Time is up — correct answer highlighted
            </p>
          )}
        </div>

        {/* Right: answers */}
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

          {isAnswered && (
            <p className={`text-center text-sm font-mono mt-1 animate-fade-in ${
              lastCorrect ? 'text-secondary-fixed' : 'text-valo-red'
            }`}>
              {lastCorrect ? `✓ Correct! +${earnedThisQ} pts` : '✗ Better luck next time'}
            </p>
          )}

          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-2 w-full py-4 rounded-xl font-mono font-bold text-base uppercase tracking-widest text-on-primary-container flex items-center justify-center gap-2 transition-all hover:scale-[1.01] animate-fade-in"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #00dbe7)',
                boxShadow: '0 0 20px rgba(210,187,255,0.3)',
              }}
            >
              {currentIndex + 1 >= total ? (
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
        </div>
      </main>
    </div>
  );
}
