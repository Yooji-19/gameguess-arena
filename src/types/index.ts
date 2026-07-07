export type GameId = 'valorant' | 'mobile-legends' | 'pokemon' | 'league-of-legends' | 'tekken';
export type ModeId = 'character-guess' | 'map-region';

export interface Game {
  id: GameId;
  name: string;
  shortName: string;
  genre: string;
  accentColor: string;
  emoji: string;
  description: string;
}

export interface QuizMode {
  id: ModeId;
  name: string;
  description: string;
  icon: string;
  timeLimit: number;
  questionCount: number;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  gameId: GameId;
  type: 'character' | 'map';
  prompt: string;
  image: string; // path to public/images/...
  answers: Answer[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

export interface QuizResult {
  gameId: GameId;
  modeId: ModeId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeBonus: number;
  maxStreak: number;
  rank: string;
  date: string;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  gameId: GameId;
  modeId: ModeId;
  accuracy: number;
  date: string;
  rank?: number;
}