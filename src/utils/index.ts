import { StoredHighScore, QuizResult, GameId, ModeId } from '../types';
import { GAMES, QUIZ_MODES } from '../data/mockData';

// LocalStorage keys
const HS_KEY = 'gameguess_high_scores';
const RESULTS_KEY = 'gameguess_results';
const PROFILE_KEY = 'gameguess_profile';

// Safe localStorage access
const isClient = typeof window !== 'undefined';

export function getHighScores(): StoredHighScore[] {
  if (!isClient) return [];
  try {
    const data = localStorage.getItem(HS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHighScore(score: StoredHighScore): void {
  if (!isClient) return;
  try {
    const scores = getHighScores();
    const idx = scores.findIndex(
      (s) => s.gameId === score.gameId && s.modeId === score.modeId
    );
    if (idx >= 0) {
      if (score.score > scores[idx].score) {
        scores[idx] = score;
      }
    } else {
      scores.push(score);
    }
    localStorage.setItem(HS_KEY, JSON.stringify(scores));
  } catch {
    // ignore
  }
}

export function getPersonalBest(gameId: GameId, modeId: ModeId): StoredHighScore | null {
  const scores = getHighScores();
  return scores.find((s) => s.gameId === gameId && s.modeId === modeId) || null;
}

export function saveResult(result: QuizResult): void {
  if (!isClient) return;
  try {
    const results = getResults();
    results.unshift(result);
    // Keep last 50 results
    const trimmed = results.slice(0, 50);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function getResults(): QuizResult[] {
  if (!isClient) return [];
  try {
    const data = localStorage.getItem(RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUsername(username: string): void {
  if (!isClient) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ username }));
}

export function getUsername(): string {
  if (!isClient) return 'GuestPlayer';
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data).username : 'GuestPlayer';
  } catch {
    return 'GuestPlayer';
  }
}

// Score calculation
export function calculateTimeBonus(timeLeft: number, totalTime: number): number {
  const ratio = timeLeft / totalTime;
  if (ratio > 0.8) return 100;
  if (ratio > 0.6) return 75;
  if (ratio > 0.4) return 50;
  if (ratio > 0.2) return 25;
  return 10;
}

export function calculateStreakBonus(streak: number): number {
  if (streak >= 10) return 300;
  if (streak >= 7) return 200;
  if (streak >= 5) return 150;
  if (streak >= 3) return 100;
  if (streak >= 2) return 50;
  return 0;
}

export function calculateRank(score: number, totalPossible: number): { rank: string; percentile: number } {
  const ratio = score / totalPossible;
  if (ratio >= 0.95) return { rank: 'S+', percentile: 99 };
  if (ratio >= 0.90) return { rank: 'S', percentile: 95 };
  if (ratio >= 0.80) return { rank: 'A', percentile: 85 };
  if (ratio >= 0.70) return { rank: 'B', percentile: 70 };
  if (ratio >= 0.55) return { rank: 'C', percentile: 50 };
  if (ratio >= 0.40) return { rank: 'D', percentile: 30 };
  return { rank: 'F', percentile: 10 };
}

export function getGameById(id: GameId) {
  return GAMES.find((g) => g.id === id);
}

export function getModeById(id: ModeId) {
  return QUIZ_MODES.find((m) => m.id === id);
}

export function formatScore(score: number): string {
  return score.toLocaleString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 90) return 'text-secondary-fixed';
  if (accuracy >= 75) return 'text-primary';
  if (accuracy >= 60) return 'text-tertiary';
  return 'text-error';
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}