'use client';
import React, { useState } from 'react';
import { GAMES, QUIZ_MODES, ALL_QUESTIONS } from '../data/mockData';
import { GameId, ModeId } from '../types';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard';

interface QuizModePageProps {
  selectedGameId: GameId | null;
  onNavigate: (page: Page) => void;
  onSelectMode: (id: ModeId) => void;
  onSelectGames: (ids: GameId[]) => void;
}

const GAMES_WITH_MAPS: GameId[] = ['valorant'];

export default function QuizModeSelectionPage({
  selectedGameId,
  onNavigate,
  onSelectMode,
  onSelectGames,
}: QuizModePageProps) {
  const [selectedMode, setSelectedMode] = useState<ModeId | null>(null);
  const [multiMode, setMultiMode] = useState(false);
  const [selectedGames, setSelectedGames] = useState<GameId[]>(
    selectedGameId ? [selectedGameId] : []
  );

  const toggleGame = (id: GameId) => {
    setSelectedGames(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  // If multi-mode, map mode only available if selected games all support maps
  const hasMapMode = multiMode
    ? selectedGames.every(id => GAMES_WITH_MAPS.includes(id)) && selectedGames.length > 0
    : selectedGameId ? GAMES_WITH_MAPS.includes(selectedGameId) : false;

  const availableModes = QUIZ_MODES.filter(m => {
    if (m.id === 'map-region') return hasMapMode;
    return true;
  });

  // Count available questions for selected games + mode
  const questionCount = selectedMode
    ? (multiMode ? selectedGames : [selectedGameId ?? '']).reduce((acc, gid) => {
        const pool = selectedMode === 'character-guess'
          ? ALL_QUESTIONS[gid]?.character ?? []
          : ALL_QUESTIONS[gid]?.map ?? [];
        return acc + pool.length;
      }, 0)
    : 0;

  const canStart = selectedMode !== null && (multiMode ? selectedGames.length >= 1 : selectedGameId !== null);

  const handleStart = () => {
    if (!canStart || !selectedMode) return;
    const games = multiMode ? selectedGames : [selectedGameId!];
    onSelectGames(games);
    onSelectMode(selectedMode);
    onNavigate('quiz');
  };

  const singleGame = !multiMode && selectedGameId ? GAMES.find(g => g.id === selectedGameId) : null;

  return (
    <main className="pt-20 pb-24 md:pb-8 px-4 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="mt-8 mb-8">
        <button
          onClick={() => onNavigate('games')}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-xs font-mono uppercase tracking-wide transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>Back
        </button>

        <div className="flex items-center gap-3 mb-1">
          {singleGame && <span className="text-3xl select-none">{singleGame.emoji}</span>}
          <h1 className="text-4xl font-heading font-black text-on-surface">Select Mode</h1>
        </div>
        {singleGame && !multiMode && (
          <p className="text-on-surface-variant font-body">
            Playing: <span className="text-primary font-semibold">{singleGame.name}</span>
          </p>
        )}
      </div>

      {/* Single vs Multi toggle */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => { setMultiMode(false); setSelectedGames(selectedGameId ? [selectedGameId] : []); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-wide border transition-all ${
            !multiMode
              ? 'bg-primary/20 border-primary text-primary'
              : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/40 hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: !multiMode ? "'FILL' 1" : "'FILL' 0" }}>
            sports_esports
          </span>
          Single Game
        </button>
        <button
          onClick={() => { setMultiMode(true); setSelectedGames(selectedGameId ? [selectedGameId] : []); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-wide border transition-all ${
            multiMode
              ? 'bg-primary/20 border-primary text-primary'
              : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/40 hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: multiMode ? "'FILL' 1" : "'FILL' 0" }}>
            layers
          </span>
          Multi Game
        </button>
      </div>

      {/* Multi game selector */}
      {multiMode && (
        <div className="mb-8 animate-fade-in">
          <p className="text-on-surface-variant font-body text-sm mb-3">
            Select which games to include in the quiz:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {GAMES.map(game => {
              const isSelected = selectedGames.includes(game.id);
              return (
                <button
                  key={game.id}
                  onClick={() => toggleGame(game.id)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-outline-variant/30 bg-surface-container-low hover:border-primary/40 hover:bg-surface-container'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 15px ${game.accentColor}30` } : undefined}
                >
                  {isSelected && (
                    <span
                      className="absolute top-2 right-2 material-symbols-outlined text-sm text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                  <span className="text-3xl select-none">{game.emoji}</span>
                  <span className={`text-xs font-heading font-bold uppercase tracking-wide ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {game.shortName}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedGames.length === 0 && (
            <p className="text-valo-red text-xs font-mono mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">warning</span>
              Select at least one game to continue
            </p>
          )}
          {selectedGames.length > 0 && (
            <p className="text-on-surface-variant text-xs font-mono mt-2">
              {selectedGames.length} game{selectedGames.length > 1 ? 's' : ''} selected · Questions will be mixed from all selected games
            </p>
          )}
        </div>
      )}

      {/* Mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {availableModes.map(mode => {
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`border-2 rounded-xl p-6 text-left flex flex-col gap-4 transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.2)] -translate-y-1'
                  : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/40 hover:bg-surface-container hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isSelected ? 'bg-primary/20 border-primary/40' : 'bg-surface-container-high border-outline-variant/30'
              }`}>
                <span
                  className={`material-symbols-outlined text-2xl ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
                  style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {mode.icon}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-heading font-bold text-xl ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                    {mode.name}
                  </h3>
                </div>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">{mode.description}</p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20">
                <span className="text-xs font-mono text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">quiz</span>
                  {mode.questionCount} questions
                </span>
                <span className="text-xs font-mono text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">timer</span>
                  {mode.timeLimit}s each
                </span>
                {isSelected && (
                  <span className="ml-auto text-xs font-mono text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Map mode locked notice for multi-game when not all support it */}
        {multiMode && !hasMapMode && selectedGames.length > 0 && (
          <div className="border-2 border-outline-variant/20 rounded-xl p-6 text-left flex flex-col gap-4 opacity-40">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-surface-container-high border-outline-variant/30">
              <span className="material-symbols-outlined text-2xl text-outline">map</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-on-surface-variant mb-1">Map / Stage Guess</h3>
              <p className="text-outline font-body text-sm">Only available when playing VALORANT only.</p>
            </div>
          </div>
        )}
      </div>

      {/* Start button */}
      {canStart ? (
        <div className="animate-fade-in">
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-mono font-bold text-lg uppercase tracking-widest text-on-primary-container transition-all hover:scale-[1.01] hover:-skew-x-1"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00dbe7)', boxShadow: '0 0 25px rgba(210,187,255,0.35)' }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            Start Quiz
            {multiMode && selectedGames.length > 1 && (
              <span className="text-sm opacity-80 font-mono normal-case tracking-normal">
                · {selectedGames.length} games mixed
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6 text-center border border-outline-variant/20 bg-surface-container">
          <p className="text-on-surface-variant font-body">
            {multiMode && selectedGames.length === 0
              ? 'Select at least one game above, then pick a mode'
              : 'Select a mode above to start'}
          </p>
        </div>
      )}
    </main>
  );
}
