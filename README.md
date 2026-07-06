# 🎮 GameGuess Arena — TRIVIA-X

A full-featured gaming trivia web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. Faithfully recreated from Google Stitch UI designs.

---

## ✨ Features

| Feature | Status |
|---|---|
| 5 games: VALORANT, MLBB, Pokémon, LoL, Tekken | ✅ |
| 6 quiz modes (Voice Line, Character, Map, Mixed, Daily, Endless) | ✅ |
| 4-answer multiple choice with A/B/C/D labels | ✅ |
| Countdown timer per question | ✅ |
| Score + time bonus + streak bonus system | ✅ |
| Correct / incorrect answer feedback | ✅ |
| Hint system (-50 pts penalty) | ✅ |
| Endless mode with 3 lives | ✅ |
| Results summary with rank (S+ → F) | ✅ |
| Local high score saving (localStorage) | ✅ |
| Mock global leaderboard | ✅ |
| Personal best scores tab | ✅ |
| Profile page with achievements | ✅ |
| Guest username customization | ✅ |
| Mobile responsive (bottom nav on mobile) | ✅ |
| Dark mode, glassmorphic design | ✅ |

---

## 🚀 Running Locally

### Prerequisites
- Node.js **18+** (check with `node -v`)
- npm or yarn

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/gameguess-arena.git
cd gameguess-arena

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

### Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
gameguess-arena/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AnswerButton.tsx  # Quiz answer choice button
│   │   ├── AudioPlayer.tsx   # Placeholder audio player
│   │   ├── AchievementBadge.tsx
│   │   ├── GameCard.tsx      # Game selection card
│   │   ├── LeaderboardTable.tsx
│   │   ├── ModeCard.tsx      # Quiz mode selection card
│   │   ├── NavBar.tsx        # Top + mobile nav
│   │   ├── ResultSummary.tsx
│   │   ├── ScoreDisplay.tsx  # Score + Streak HUD widgets
│   │   └── TimerBar.tsx      # Countdown timer with progress bar
│   │
│   ├── pages/                # Next.js pages + page components
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx         # Main app shell / router
│   │   ├── LandingPage.tsx
│   │   ├── GameSelectionPage.tsx
│   │   ├── QuizModeSelectionPage.tsx
│   │   ├── QuizGameplayPage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   └── ProfilePage.tsx
│   │
│   ├── data/
│   │   └── mockData.ts       # All game/mode/question/leaderboard data
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   │
│   ├── utils/
│   │   └── index.ts          # localStorage helpers, score math
│   │
│   └── styles/
│       └── globals.css       # Global CSS, Tailwind, animations
│
├── tailwind.config.ts        # Stitch design tokens → Tailwind
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## ❓ About the Leaderboard — Local vs. Cross-Device

### The short answer

**The leaderboard you see in "My Scores" is stored in `localStorage`, which only exists on the device and browser you played on.**

| Scenario | Works? |
|---|---|
| Same browser, same device | ✅ Yes |
| Different browser, same device | ❌ No |
| Different device (laptop/phone) | ❌ No |
| After clearing browser data | ❌ Lost |

The **Global Leaderboard** tab shows mock/seed data that is the same for everyone (hardcoded in `src/data/mockData.ts`).

### How to make leaderboard work across devices

To share scores across devices you need a **backend database**. Here are the easiest paths:

#### Option A — Supabase (free, easy)
```
1. Create a free Supabase project at supabase.com
2. Create a `scores` table with columns:
   id, username, game_id, mode_id, score, accuracy, date
3. Replace localStorage calls in src/utils/index.ts with Supabase client queries
4. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
```

#### Option B — PlanetScale / Railway (MySQL)
```
1. Spin up a MySQL instance
2. Create a Next.js API route: /api/scores (GET + POST)
3. Replace localStorage with fetch('/api/scores')
```

#### Option C — Firebase Realtime Database
```
1. Create a Firebase project
2. Use the Firebase JS SDK
3. Replace localStorage calls with firebase set/get/onValue
```

---

## 🖌️ Design System

From the Google Stitch export (`apex_narrative` theme):

| Token | Value |
|---|---|
| Background | `#0b1326` (deep navy) |
| Primary | `#d2bbff` (soft indigo) |
| Secondary | `#ddfcff` (cyan white) |
| Tertiary | `#e9c400` (gold) |
| Error / VALORANT | `#ff4655` (red) |
| Font — Display | Sora (800) |
| Font — Body | Hanken Grotesk |
| Font — Mono/HUD | JetBrains Mono |

---

## 🗺️ Roadmap

- [ ] Real audio files for voice line mode
- [ ] Character silhouette images
- [ ] Map screenshot images
- [ ] Backend leaderboard (Supabase)
- [ ] User authentication
- [ ] Daily challenge with server-side seed
- [ ] More games (Apex, Genshin, etc.)
- [ ] Sound effects and music
