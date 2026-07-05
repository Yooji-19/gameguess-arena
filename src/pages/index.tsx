'use client';
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GameId, ModeId, QuizResult } from '../types';
import NavBar from '../components/NavBar';
import LandingPage from './LandingPage';
import GameSelectionPage from './GameSelectionPage';
import QuizModeSelectionPage from './QuizModeSelectionPage';
import QuizGameplayPage from './QuizGameplayPage';
import ResultsPage from './ResultsPage';
import LeaderboardPage from './LeaderboardPage';
import ProfilePage from './ProfilePage';
import { getUsername } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeId | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [username] = useState<string>(() => {
    if (typeof window !== 'undefined') return getUsername();
    return 'GuestPlayer';
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top on page change
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (gameId: GameId) => {
    setSelectedGame(gameId);
  };

  const handleSelectMode = (modeId: ModeId) => {
    setSelectedMode(modeId);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
  };

  const showNav = currentPage !== 'quiz';

  return (
    <>
      <Head>
        <title>GameGuess Arena — TRIVIA-X</title>
        <meta name="description" content="Test your gaming knowledge — VALORANT, Pokémon, LoL, MLBB, and Tekken trivia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
      </Head>

      <div className="min-h-screen bg-background bg-pattern dark">
        {/* Navigation */}
        {showNav && (
          <NavBar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            username={username}
          />
        )}

        {/* Page renderer */}
        {currentPage === 'home' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'games' && (
          <GameSelectionPage
            onNavigate={handleNavigate}
            onSelectGame={handleSelectGame}
          />
        )}

        {currentPage === 'quiz-mode' && (
          <QuizModeSelectionPage
            selectedGameId={selectedGame}
            onNavigate={handleNavigate}
            onSelectMode={handleSelectMode}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizGameplayPage
            gameId={selectedGame}
            modeId={selectedMode}
            onNavigate={handleNavigate}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {currentPage === 'results' && (
          <ResultsPage
            result={quizResult}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'leaderboard' && (
          <LeaderboardPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'profile' && (
          <ProfilePage onNavigate={handleNavigate} />
        )}
      </div>
    </>
  );
};

export default Home;
