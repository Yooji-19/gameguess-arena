# 🎮 GameGuess Arena — Booth Edition

Gaming trivia booth app. Players identify characters, maps, and stages from pictures.

---

## 🚀 Setup

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🖼️ How to Add Your Images

Images go in the `public/images/` folder. The app will show a "Image not found" placeholder for any missing image — the quiz still works fine without them.

### Folder structure

```
public/
└── images/
    ├── valorant/
    │   ├── agents/         ← jett.jpg, sage.jpg, omen.jpg, reyna.jpg,
    │   │                      cypher.jpg, sova.jpg, killjoy.jpg,
    │   │                      viper.jpg, raze.jpg, chamber.jpg
    │   └── maps/           ← ascent.jpg, bind.jpg, haven.jpg, icebox.jpg,
    │                          split.jpg, pearl.jpg, lotus.jpg,
    │                          breeze.jpg, sunset.jpg, fracture.jpg
    ├── pokemon/
    │   ├── characters/     ← pikachu.jpg, charizard.jpg, mewtwo.jpg,
    │   │                      gengar.jpg, eevee.jpg, lucario.jpg,
    │   │                      snorlax.jpg, umbreon.jpg, garchomp.jpg, sylveon.jpg
    │   └── regions/        ← kanto.jpg, johto.jpg, hoenn.jpg, sinnoh.jpg,
    │                          unova.jpg, kalos.jpg, alola.jpg,
    │                          galar.jpg, paldea.jpg, pallet_town.jpg
    ├── lol/
    │   ├── champions/      ← jinx.jpg, yasuo.jpg, lux.jpg, thresh.jpg,
    │   │                      ahri.jpg, teemo.jpg, vi.jpg, zed.jpg,
    │   │                      garen.jpg, ezreal.jpg
    │   └── maps/           ← summoners_rift.jpg, howling_abyss.jpg,
    │                          piltover.jpg, noxus.jpg, ionia.jpg,
    │                          freljord.jpg, shurima.jpg, bilgewater.jpg,
    │                          demacia.jpg, baron_pit.jpg
    ├── mlbb/
    │   ├── heroes/         ← layla.jpg, alucard.jpg, tigreal.jpg,
    │   │                      kagura.jpg, fanny.jpg, gusion.jpg,
    │   │                      chou.jpg, wanwan.jpg, ling.jpg, grock.jpg
    │   └── maps/           ← land_of_dawn.jpg, turtle_pit.jpg, lord_pit.jpg,
    │                          minimap.jpg, brawl_map.jpg, top_lane.jpg,
    │                          bot_lane.jpg, blue_buff.jpg, red_buff.jpg,
    │                          base_crystal.jpg
    └── tekken/
        ├── fighters/       ← jin.jpg, kazuya.jpg, heihachi.jpg, nina.jpg,
        │                      paul.jpg, king.jpg, eddy.jpg, hwoarang.jpg,
        │                      yoshimitsu.jpg, alisa.jpg
        └── stages/         ← mishima_dojo.jpg, forgotten_realm.jpg,
                               polar_paradise.jpg, ling_dojo.jpg,
                               dynamic_weather.jpg, jungle.jpg, urban.jpg,
                               cave.jpg, precipice.jpg, arena.jpg
```

### Tips
- Any image format works: `.jpg`, `.png`, `.webp`
- Recommended size: **800×500px** or similar 16:9 ratio
- The filename must match exactly (lowercase, underscores)
- If an image is missing, the question still shows — just with a placeholder message

---

## 🏆 Leaderboard

- Scores are saved to **localStorage** on this device/browser
- Every player enters their name on the Results screen after a quiz
- All scores persist between browser restarts
- An **Admin** button on the Leaderboard page lets you clear all scores between events
- Scores are sorted by highest score automatically

---

## 📱 Pages

| Page | Description |
|---|---|
| Home | Title screen with Play Now button |
| Game Select | Choose VALORANT, MLBB, Pokémon, LoL, or Tekken |
| Mode Select | Character Guess or Map/Region/Stage |
| Quiz | 10 image questions, 20s timer, score + streak system |
| Results | Score summary + name entry to save to leaderboard |
| Leaderboard | All booth scores ranked by score |

---

## ⚙️ Customizing Questions

Open `src/data/mockData.ts` to edit questions, change answers, update image paths, or add new questions. Each question needs:
- `prompt` — the question text
- `image` — path starting with `/images/...`
- `answers` — array of 4 choices, one with `isCorrect: true`
- `difficulty` — `'Easy'`, `'Medium'`, or `'Hard'`
- `points` — 100 / 200 / 300
