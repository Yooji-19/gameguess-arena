// Game types
export type GameId = 'valorant' | 'mobile-legends' | 'pokemon' | 'league-of-legends' | 'tekken';

export interface Game {
  id: GameId;
  name: string;
  shortName: string;
  genre: string;
  accentColor: string;
  glowClass: string;
  description: string;
  questionCount: number;
  emoji: string;
}

// Quiz mode types
export type ModeId =
  | 'voice-line'
  | 'character-guess'
  | 'map-region'
  | 'mixed-quiz'
  | 'daily-challenge'
  | 'endless';

export interface QuizMode {
  id: ModeId;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Variable';
  timeLimit: number; // seconds per question
  questionCount: number;
  isLocked?: boolean;
  badge?: string;
}

// Question types
export type QuestionType = 'voice-line' | 'character-image' | 'map' | 'trivia';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  gameId: GameId;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  answers: Answer[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  hint?: string;
  tags?: string[];
}

// Score & gameplay types
export interface QuizSession {
  gameId: GameId;
  modeId: ModeId;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeBonus: number;
  startTime: number;
  answers: SessionAnswer[];
}

export interface SessionAnswer {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  timeLeft: number;
  pointsEarned: number;
}

export interface QuizResult {
  gameId: GameId;
  modeId: ModeId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  maxStreak: number;
  accuracy: number;
  timeBonus: number;
  rank: string;
  percentile: number;
  date: string;
  duration: number;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  accuracy: number;
  streak: number;
  gameId: GameId;
  modeId: ModeId;
  date: string;
  badge?: string;
  isCurrentUser?: boolean;
}

// User / Profile types
export interface UserProfile {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalGamesPlayed: number;
  totalScore: number;
  highScore: number;
  accuracy: number;
  maxStreak: number;
  achievements: Achievement[];
  favoriteGame?: GameId;
  joinDate: string;
  gamesStats: GameStat[];
}

export interface GameStat {
  gameId: GameId;
  gamesPlayed: number;
  highScore: number;
  accuracy: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

// Storage types
export interface StoredHighScore {
  gameId: GameId;
  modeId: ModeId;
  score: number;
  accuracy: number;
  date: string;
}