import { LeaderboardEntry, QuizResult, GameId, ModeId } from '../types';

const LB_KEY = 'booth_leaderboard';

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LB_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function saveToLeaderboard(playerName: string, result: QuizResult): void {
  if (typeof window === 'undefined') return;
  try {
    const entries = getLeaderboard();
    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      playerName: playerName.trim() || 'Player',
      score: result.score,
      gameId: result.gameId,
      modeId: result.modeId,
      accuracy: result.accuracy,
      date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    entries.push(newEntry);
    // Sort by score descending, keep top 100
    entries.sort((a, b) => b.score - a.score);
    const trimmed = entries.slice(0, 100);
    localStorage.setItem(LB_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

export function clearLeaderboard(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LB_KEY);
}

export function calculateTimeBonus(timeLeft: number, totalTime: number): number {
  const ratio = timeLeft / totalTime;
  if (ratio > 0.8) return 100;
  if (ratio > 0.6) return 75;
  if (ratio > 0.4) return 50;
  if (ratio > 0.2) return 25;
  return 10;
}

export function calculateStreakBonus(streak: number): number {
  if (streak >= 7) return 200;
  if (streak >= 5) return 150;
  if (streak >= 3) return 100;
  if (streak >= 2) return 50;
  return 0;
}

export function calculateRank(accuracy: number): string {
  if (accuracy >= 95) return 'S+';
  if (accuracy >= 90) return 'S';
  if (accuracy >= 80) return 'A';
  if (accuracy >= 70) return 'B';
  if (accuracy >= 55) return 'C';
  if (accuracy >= 40) return 'D';
  return 'F';
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getGameAccentColor(gameId: GameId): string {
  const map: Record<GameId, string> = {
    'valorant': '#ff4655',
    'mobile-legends': '#00f1fe',
    'pokemon': '#e9c400',
    'league-of-legends': '#d2bbff',
    'tekken': '#ffb4ab',
  };
  return map[gameId] || '#d2bbff';
}
