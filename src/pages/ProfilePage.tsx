'use client';
import React, { useState, useEffect } from 'react';
import { MOCK_USER_PROFILE, GAMES } from '../data/mockData';
import { UserProfile } from '../types';
import AchievementBadge from '../components/AchievementBadge';
import { getHighScores, getUsername, saveUsername, getResults } from '../utils';

type Page = 'home' | 'games' | 'quiz-mode' | 'quiz' | 'results' | 'leaderboard' | 'profile';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [username, setUsernameState] = useState('GuestPlayer');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [localScores, setLocalScores] = useState<ReturnType<typeof getHighScores>>([]);
  const [results, setResults] = useState<ReturnType<typeof getResults>>([]);

  useEffect(() => {
    const saved = getUsername();
    setUsernameState(saved);
    setNameInput(saved);
    setLocalScores(getHighScores());
    setResults(getResults());
  }, []);

  const profile: UserProfile = {
    ...MOCK_USER_PROFILE,
    username,
    totalGamesPlayed: results.length || MOCK_USER_PROFILE.totalGamesPlayed,
    highScore: localScores.length > 0 ? Math.max(...localScores.map((s) => s.score)) : MOCK_USER_PROFILE.highScore,
  };

  const xpPct = Math.round((profile.xp / profile.xpToNextLevel) * 100);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      saveUsername(nameInput.trim());
      setUsernameState(nameInput.trim());
    }
    setEditingName(false);
  };

  const unlockedCount = profile.achievements.filter((a) => a.isUnlocked).length;

  return (
    <main className="pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16">
      <div className="mb-8 mt-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile card */}
        <div className="md:col-span-4 glass-panel rounded-xl p-6 flex flex-col items-center text-center gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-4xl border-2 border-primary/40 select-none"
            style={{ boxShadow: '0 0 20px rgba(210,187,255,0.3)' }}>
            🎮
          </div>

          {/* Username */}
          {editingName ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="bg-surface-container-high border border-primary/40 rounded-lg px-3 py-2 text-center text-on-surface font-heading font-bold w-full outline-none focus:border-primary"
                maxLength={20}
                autoFocus
              />
              <div className="flex gap-2">
                <button onClick={handleSaveName} className="text-label-sm font-mono text-secondary-fixed px-3 py-1 rounded border border-secondary-fixed/40 hover:bg-secondary-fixed/10 transition-all">
                  Save
                </button>
                <button onClick={() => setEditingName(false)} className="text-label-sm font-mono text-outline px-3 py-1 rounded border border-outline/30 hover:bg-surface-container transition-all">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-headline-md font-heading text-on-surface font-bold">{profile.username}</h1>
              <button onClick={() => setEditingName(true)} className="text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
            </div>
          )}

          {/* Level & XP */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-label-sm font-mono text-on-surface-variant">Level {profile.level}</span>
              <span className="text-label-sm font-mono text-outline">{profile.xp} / {profile.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full transition-all"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            {[
              { label: 'Games Played', value: profile.totalGamesPlayed, icon: 'sports_esports' },
              { label: 'High Score', value: profile.highScore.toLocaleString(), icon: 'emoji_events' },
              { label: 'Accuracy', value: `${profile.accuracy}%`, icon: 'my_location' },
              { label: 'Max Streak', value: `${profile.maxStreak}x`, icon: 'local_fire_department' },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-high rounded-lg p-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-sm block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="text-headline-md font-heading text-on-surface font-bold">{s.value}</p>
                <p className="text-label-sm font-mono text-outline text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Guest mode notice */}
          <div className="w-full p-3 rounded-lg bg-tertiary/10 border border-tertiary/20 text-left">
            <p className="text-label-sm font-mono text-tertiary flex items-start gap-1.5">
              <span className="material-symbols-outlined text-sm mt-0.5">info</span>
              Playing as guest. Scores are saved locally to this device only.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Per-game stats */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-headline-md font-heading text-on-surface mb-4">Game Performance</h2>
            <div className="flex flex-col gap-3">
              {GAMES.map((game) => {
                const stat = profile.gamesStats.find((s) => s.gameId === game.id);
                const local = localScores.find((s) => s.gameId === game.id);
                const hs = local?.score || stat?.highScore || 0;
                const acc = local?.accuracy || stat?.accuracy || 0;
                return (
                  <div key={game.id} className="flex items-center gap-4 p-3 rounded-lg bg-surface-container-high border border-outline-variant/20 hover:border-primary/20 transition-colors">
                    <span className="text-2xl select-none">{game.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-heading font-semibold text-on-surface">{game.name}</p>
                        <span className="text-label-sm font-mono text-outline">{stat?.gamesPlayed || 0} games</span>
                      </div>
                      <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${acc}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-heading font-bold text-primary">{hs > 0 ? hs.toLocaleString() : '—'}</p>
                      <p className="text-label-sm font-mono text-outline">{acc > 0 ? `${acc}%` : '—'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-headline-md font-heading text-on-surface">Achievements</h2>
              <span className="text-label-sm font-mono text-on-surface-variant">
                {unlockedCount}/{profile.achievements.length} unlocked
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.achievements.map((ach) => (
                <AchievementBadge key={ach.id} achievement={ach} size="sm" />
              ))}
            </div>
          </div>

          {/* Recent results */}
          {results.length > 0 && (
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-headline-md font-heading text-on-surface mb-4">Recent Games</h2>
              <div className="flex flex-col gap-2">
                {results.slice(0, 5).map((r, i) => {
                  const g = GAMES.find((gm) => gm.id === r.gameId);
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-xl select-none">{g?.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-heading text-on-surface">{g?.name}</p>
                        <p className="text-label-sm font-mono text-outline">{new Date(r.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono font-bold text-primary">{r.score.toLocaleString()}</p>
                        <p className="text-label-sm font-mono text-outline">{r.accuracy}% acc · Rank {r.rank}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
