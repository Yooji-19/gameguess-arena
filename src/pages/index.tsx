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

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeId | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNav = currentPage !== 'quiz';

  return (
    <>
      <Head>
        <title>Guess IT</title>
        <meta name="description" content="Gaming trivia booth — identify characters, maps, and stages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
      </Head>

      <div className="min-h-screen bg-background bg-pattern dark">
        {showNav && <NavBar currentPage={currentPage} onNavigate={handleNavigate} />}

        {currentPage === 'home' && <LandingPage onNavigate={handleNavigate} />}

        {currentPage === 'games' && (
          <GameSelectionPage
            onNavigate={handleNavigate}
            onSelectGame={(id) => setSelectedGame(id)}
          />
        )}

        {currentPage === 'quiz-mode' && (
          <QuizModeSelectionPage
            selectedGameId={selectedGame}
            onNavigate={handleNavigate}
            onSelectMode={(id) => setSelectedMode(id)}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizGameplayPage
            gameId={selectedGame}
            modeId={selectedMode}
            onNavigate={handleNavigate}
            onQuizComplete={(r) => setQuizResult(r)}
          />
        )}

        {currentPage === 'results' && (
          <ResultsPage result={quizResult} onNavigate={handleNavigate} />
        )}

        {currentPage === 'leaderboard' && (
          <LeaderboardPage onNavigate={handleNavigate} />
        )}
      </div>
    </>
  );
};

export default Home;
