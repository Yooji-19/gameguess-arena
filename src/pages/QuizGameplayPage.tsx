import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameId, ModeId, Question, QuizResult, Answer } from '../types';
import { GAMES, QUIZ_MODES, ALL_QUESTIONS } from '../data/mockData';
import TimerBar from '../components/TimerBar';
import AnswerButton from '../components/AnswerButton';
import { calculateTimeBonus, calculateStreakBonus, calculateRank, shuffleArray } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';
type AnswerState = 'default' | 'correct' | 'incorrect' | 'revealed';

interface Props {
  gameId: GameId | null;
  gameIds: GameId[];
  modeId: ModeId | null;
  onNavigate: (page: Page) => void;
  onQuizComplete: (result: QuizResult) => void;
}

function PixelatedImage({
  src,
  revealed,
  onError,
}: {
  src: string;
  revealed: boolean;
  onError: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (revealed) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const image = new Image();

    image.onload = () => {
      // Higher values = less pixelated
      canvas.width = 20;
      canvas.height = 13;

      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );

      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height,
      );
    };

    image.onerror = onError;
    image.src = src;
  }, [src, revealed, onError]);

  if (revealed) {
    return (
      <img
        src={src}
        alt="Quiz question"
        onError={onError}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center center',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-label="Pixelated quiz question"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default function QuizGameplayPage({ gameId, gameIds, modeId, onNavigate, onQuizComplete }: Props) {
  // Support both single game and multi-game
  const activeGameIds: GameId[] = gameIds.length > 0 ? gameIds : gameId ? [gameId] : [];
  const isMultiGame = activeGameIds.length > 1;

  const mode = QUIZ_MODES.find(m => m.id === modeId);

  const [questions] = useState<Question[]>(() => {
    if (!modeId || activeGameIds.length === 0) return [];
    const pool: Question[] = [];
    for (const gid of activeGameIds) {
      const gamePool = modeId === 'character-guess'
        ? ALL_QUESTIONS[gid]?.character ?? []
        : ALL_QUESTIONS[gid]?.map ?? [];
      pool.push(...gamePool);
    }
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

  const isCharacterMode = modeId === 'character-guess';
  const shouldPixelate = isCharacterMode && !revealed;
  const handleImageError = useCallback(() => setImgError(true), []);

  // Show the game that the current question belongs to
  const currentGame = GAMES.find(g => g.id === (currentQ?.gameId ?? activeGameIds[0]));

  const finishQuiz = useCallback((fs: number, fc: number, fk: number, fb: number) => {
    const accuracy = total > 0 ? Math.round((fc / total) * 100) : 0;
    const result: QuizResult = {
      gameId: activeGameIds[0] ?? 'valorant',
      modeId: modeId!,
      score: fs,
      totalQuestions: total,
      correctAnswers: fc,
      accuracy,
      timeBonus: fb,
      maxStreak: fk,
      rank: calculateRank(accuracy),
      date: new Date().toISOString(),
    };
    onQuizComplete(result);
    onNavigate('results');
  }, [activeGameIds, modeId, total, onQuizComplete, onNavigate]);

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
      const tB = calculateTimeBonus(timeLeft, mode?.timeLimit ?? 20);
      const sB = calculateStreakBonus(streak + 1);
      setScore(p => p + currentQ.points + tB + sB);
      setTotalTimeBonus(p => p + tB);
      setStreak(p => { const ns = p + 1; setMaxStreak(m => Math.max(m, ns)); return ns; });
      setCorrectCount(p => p + 1);
      setLastCorrect(true);
    } else {
      setStreak(0);
      setLastCorrect(false);
    }
  }, [isAnswered, currentQ, timeLeft, mode, streak]);

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;
    setTimerActive(false); setIsAnswered(true); setRevealed(true);
    setLastCorrect(false); setStreak(0);
    const states: Record<string, AnswerState> = {};
    currentQ?.answers.forEach(a => { states[a.id] = a.isCorrect ? 'revealed' : 'default'; });
    setAnswerStates(states);
  }, [isAnswered, currentQ]);

  const handleNext = () => {
    const ni = currentIndex + 1;
    if (ni >= total) { finishQuiz(score, correctCount, maxStreak, totalTimeBonus); return; }
    setCurrentIndex(ni);
    setIsAnswered(false); setAnswerStates({}); setLastCorrect(null);
    setRevealed(false); setTimeLeft(mode?.timeLimit ?? 20);
    setTimerActive(true); setImgError(false);
  };

  if (!currentQ) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-on-surface-variant mb-4">No questions available.</p>
        <button onClick={() => onNavigate('games')} className="text-primary font-mono hover:underline">Go back</button>
      </div>
    </div>
  );

  const accentColor = currentGame?.accentColor ?? '#d2bbff';
  const progressPct = (currentIndex / total) * 100;
  const earnedThisQ = currentQ.points
    + calculateTimeBonus(timeLeft, mode?.timeLimit ?? 20)
    + calculateStreakBonus(streak);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at top, ${accentColor}12, transparent 60%)` }} />

      {/* HUD */}
      <header className="relative z-10 px-4 md:px-10 pt-20 pb-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => { if (window.confirm('Quit this quiz?')) onNavigate('home'); }}
            className="text-on-surface-variant hover:text-valo-red transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="text-sm select-none">{currentGame?.emoji}</span>
            <span className="text-xs font-mono text-on-surface-variant">{currentGame?.shortName}</span>
            {isMultiGame && (
              <span className="text-xs font-mono text-outline">· Multi</span>
            )}
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
              <span className="text-2xl font-heading font-bold text-on-surface leading-none">{score.toLocaleString()}</span>
            </div>
            {streak >= 2 && (
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-outline uppercase">Streak</span>
                <span className={`text-2xl font-heading font-bold leading-none ${streak >= 5 ? 'text-valo-red' : 'text-tertiary'}`}>{streak}x 🔥</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-outline w-14 flex-shrink-0">{currentIndex + 1} / {total}</span>
          <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <TimerBar key={currentIndex} timeLimit={mode?.timeLimit ?? 20}
          isActive={timerActive} onTimeUp={handleTimeUp} onTick={setTimeLeft} />
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-10 py-4 flex flex-col lg:flex-row gap-6">

        {/* Left: image */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono border rounded-full px-2 py-0.5 ${
              currentQ.difficulty === 'Hard'   ? 'text-valo-red border-valo-red/40 bg-valo-red/10' :
              currentQ.difficulty === 'Medium' ? 'text-tertiary border-tertiary/40 bg-tertiary/10' :
                                                 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'
            }`}>{currentQ.difficulty}</span>
            {shouldPixelate && (
              <span className="text-xs font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">grid_on</span>
                Pixelated
              </span>
            )}
            {revealed && isCharacterMode && (
              <span className="text-xs font-mono text-secondary-fixed border border-secondary-fixed/30 bg-secondary-fixed/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span>
                Revealed
              </span>
            )}
            <span className="text-xs font-mono text-primary ml-auto">+{currentQ.points} pts</span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white leading-snug">{currentQ.prompt}</h2>

          {/* Image box */}
          <div className="relative w-full rounded-xl overflow-hidden border border-surface-variant bg-surface-container-high"
            style={{ height: '300px' }}>
            {imgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6">
                <span className="material-symbols-outlined text-5xl text-outline">image_not_supported</span>
                <p className="text-sm font-mono text-outline">Image failed to load.<br />Check internet connection.</p>
              </div>
            ) : (
              <>
                {isCharacterMode ? (
                  <PixelatedImage
                    key={currentQ.id}
                    src={currentQ.image}
                    revealed={revealed}
                    onError={handleImageError}
                  />
                ) : (
                  <img
                    key={currentQ.id}
                    src={currentQ.image}
                    alt="Quiz question"
                    onError={handleImageError}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
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
            <AnswerButton key={answer.id} label={LABELS[idx]} text={answer.text}
              onClick={() => handleAnswer(answer)}
              state={answerStates[answer.id] ?? 'default'} disabled={isAnswered} />
          ))}

          {isAnswered && (
            <p className={`text-center text-sm font-mono mt-1 animate-fade-in ${lastCorrect ? 'text-secondary-fixed' : 'text-valo-red'}`}>
              {lastCorrect ? `✓ Correct! +${earnedThisQ} pts` : '✗ Better luck next time'}
            </p>
          )}

          {isAnswered && (
            <button onClick={handleNext}
              className="mt-2 w-full py-4 rounded-xl font-mono font-bold text-base uppercase tracking-widest text-on-primary-container flex items-center justify-center gap-2 transition-all hover:scale-[1.01] animate-fade-in"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #00dbe7)', boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}>
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
