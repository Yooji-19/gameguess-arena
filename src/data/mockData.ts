import { Game, QuizMode, Question, LeaderboardEntry, UserProfile, Achievement } from '../types';

export const GAMES: Game[] = [
  { id: 'valorant', name: 'VALORANT', shortName: 'VAL', genre: 'Tactical Shooter', accentColor: '#ff4655', glowClass: 'glow-valorant', description: "Test your knowledge of agents, maps, and voice lines from Riot's tactical shooter.", questionCount: 120, emoji: '🎯' },
  { id: 'mobile-legends', name: 'Mobile Legends', shortName: 'MLBB', genre: 'Mobile MOBA', accentColor: '#00f1fe', glowClass: 'glow-mlbb', description: 'Identify heroes, skills, and lore from the arena of Mobile Legends: Bang Bang.', questionCount: 95, emoji: '⚔️' },
  { id: 'pokemon', name: 'Pokémon', shortName: 'PKM', genre: 'RPG', accentColor: '#e9c400', glowClass: 'glow-pokemon', description: "Prove you're a true Pokémon Master by identifying species, types, and moves.", questionCount: 200, emoji: '⚡' },
  { id: 'league-of-legends', name: 'League of Legends', shortName: 'LoL', genre: 'MOBA', accentColor: '#d2bbff', glowClass: 'glow-lol', description: "Demonstrate mastery of champions, abilities, and lore from the Summoner's Rift.", questionCount: 150, emoji: '🏆' },
  { id: 'tekken', name: 'Tekken', shortName: 'TK', genre: 'Fighting', accentColor: '#ffb4ab', glowClass: 'glow-tekken', description: "Show your expertise in Tekken's fighters, moves, and legendary storylines.", questionCount: 80, emoji: '👊' },
];

export const QUIZ_MODES: QuizMode[] = [
  { id: 'voice-line', name: 'Voice Line Guess', description: 'Listen to character voice lines and identify who said it.', icon: 'record_voice_over', difficulty: 'Hard', timeLimit: 15, questionCount: 10 },
  { id: 'character-guess', name: 'Character Guess', description: 'Identify characters from silhouettes, descriptions, or abilities.', icon: 'person_search', difficulty: 'Medium', timeLimit: 20, questionCount: 10 },
  { id: 'map-region', name: 'Map / Region / Stage', description: 'Name the map, region, or stage from a screenshot or description.', icon: 'map', difficulty: 'Medium', timeLimit: 20, questionCount: 10 },
  { id: 'mixed-quiz', name: 'Mixed Quiz', description: 'A blend of all question types for a well-rounded challenge.', icon: 'shuffle', difficulty: 'Variable', timeLimit: 20, questionCount: 15 },
  { id: 'daily-challenge', name: 'Daily Challenge', description: 'A new set of curated questions every 24 hours. Compete globally.', icon: 'today', difficulty: 'Variable', timeLimit: 20, questionCount: 10, badge: 'DAILY' },
  { id: 'endless', name: 'Endless Mode', description: 'Keep going until you get three wrong. How far can you make it?', icon: 'all_inclusive', difficulty: 'Variable', timeLimit: 15, questionCount: 999, badge: 'ENDLESS' },
];

const VALORANT_QUESTIONS: Question[] = [
  { id: 'val-1', gameId: 'valorant', type: 'voice-line', prompt: '"Watch them run."', subPrompt: 'Which VALORANT agent says this when activating their ultimate ability?', difficulty: 'Hard', points: 300, hint: 'This agent is a Duelist known for swift movement.', answers: [{ id: 'a', text: 'Jett', isCorrect: false }, { id: 'b', text: 'Sage', isCorrect: false }, { id: 'c', text: 'Phoenix', isCorrect: false }, { id: 'd', text: 'Omen', isCorrect: true }] },
  { id: 'val-2', gameId: 'valorant', type: 'character-image', prompt: 'Which agent controls wind and excels in movement-based dueling?', subPrompt: 'Identify this VALORANT agent by their signature ability.', difficulty: 'Easy', points: 100, hint: 'This agent is from South Korea.', answers: [{ id: 'a', text: 'Jett', isCorrect: true }, { id: 'b', text: 'Neon', isCorrect: false }, { id: 'c', text: 'Yoru', isCorrect: false }, { id: 'd', text: 'Reyna', isCorrect: false }] },
  { id: 'val-3', gameId: 'valorant', type: 'map', prompt: 'Which map features a large outdoor site called "B Long" and a cable car aesthetic?', subPrompt: 'Identify the VALORANT map.', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Ascent', isCorrect: false }, { id: 'b', text: 'Haven', isCorrect: false }, { id: 'c', text: 'Bind', isCorrect: false }, { id: 'd', text: 'Icebox', isCorrect: true }] },
  { id: 'val-4', gameId: 'valorant', type: 'trivia', prompt: "What is the name of Sage's healing ability?", subPrompt: 'Name the specific ability, not the ultimate.', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Healing Orb', isCorrect: true }, { id: 'b', text: 'Revival', isCorrect: false }, { id: 'c', text: 'Mend', isCorrect: false }, { id: 'd', text: 'Restore', isCorrect: false }] },
  { id: 'val-5', gameId: 'valorant', type: 'voice-line', prompt: '"They\'ll never see me coming."', subPrompt: 'Which stealthy VALORANT agent says this?', difficulty: 'Hard', points: 300, hint: 'This agent can teleport and create decoys.', answers: [{ id: 'a', text: 'Omen', isCorrect: false }, { id: 'b', text: 'Yoru', isCorrect: true }, { id: 'c', text: 'Cypher', isCorrect: false }, { id: 'd', text: 'Astra', isCorrect: false }] },
  { id: 'val-6', gameId: 'valorant', type: 'trivia', prompt: 'Which VALORANT map was the first ever released with the game at launch?', subPrompt: 'Think about the original map pool.', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Split', isCorrect: false }, { id: 'b', text: 'Bind', isCorrect: true }, { id: 'c', text: 'Haven', isCorrect: false }, { id: 'd', text: 'Ascent', isCorrect: false }] },
  { id: 'val-7', gameId: 'valorant', type: 'character-image', prompt: 'Which agent hails from Morocco and specializes in camera traps and surveillance?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Killjoy', isCorrect: false }, { id: 'b', text: 'Cypher', isCorrect: true }, { id: 'c', text: 'Chamber', isCorrect: false }, { id: 'd', text: 'Breach', isCorrect: false }] },
  { id: 'val-8', gameId: 'valorant', type: 'trivia', prompt: 'What is the maximum number of rounds in a standard Valorant competitive match?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: '24', isCorrect: false }, { id: 'b', text: '30', isCorrect: false }, { id: 'c', text: '25', isCorrect: false }, { id: 'd', text: '30 (with overtime)', isCorrect: true }] },
  { id: 'val-9', gameId: 'valorant', type: 'map', prompt: 'Which map is set in Venice, Italy, and features a large central courtyard with a mid-gate mechanic?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Ascent', isCorrect: true }, { id: 'b', text: 'Fracture', isCorrect: false }, { id: 'c', text: 'Pearl', isCorrect: false }, { id: 'd', text: 'Sunset', isCorrect: false }] },
  { id: 'val-10', gameId: 'valorant', type: 'trivia', prompt: 'Which controller agent can place stars on the map and pull them to create cosmic abilities?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Viper', isCorrect: false }, { id: 'b', text: 'Omen', isCorrect: false }, { id: 'c', text: 'Astra', isCorrect: true }, { id: 'd', text: 'Harbor', isCorrect: false }] },
];

const POKEMON_QUESTIONS: Question[] = [
  { id: 'pkm-1', gameId: 'pokemon', type: 'trivia', prompt: 'Which Pokémon is known as the "Genetic Pokémon" and was created through DNA manipulation?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Mew', isCorrect: false }, { id: 'b', text: 'Mewtwo', isCorrect: true }, { id: 'c', text: 'Deoxys', isCorrect: false }, { id: 'd', text: 'Genesect', isCorrect: false }] },
  { id: 'pkm-2', gameId: 'pokemon', type: 'character-image', prompt: 'This Pokémon evolves from Eevee using a Thunder Stone. Which Pokémon is it?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Flareon', isCorrect: false }, { id: 'b', text: 'Vaporeon', isCorrect: false }, { id: 'c', text: 'Jolteon', isCorrect: true }, { id: 'd', text: 'Leafeon', isCorrect: false }] },
  { id: 'pkm-3', gameId: 'pokemon', type: 'trivia', prompt: 'What type combination does Charizard have in its original form (not Mega or Gigantamax)?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Fire / Dragon', isCorrect: false }, { id: 'b', text: 'Fire / Flying', isCorrect: true }, { id: 'c', text: 'Fire / Fighting', isCorrect: false }, { id: 'd', text: 'Pure Fire', isCorrect: false }] },
  { id: 'pkm-4', gameId: 'pokemon', type: 'trivia', prompt: 'Which move has the highest base power and can only be used once per battle?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Hyper Beam', isCorrect: false }, { id: 'b', text: 'Explosion', isCorrect: false }, { id: 'c', text: 'V-create', isCorrect: false }, { id: 'd', text: 'Eruption', isCorrect: true }] },
  { id: 'pkm-5', gameId: 'pokemon', type: 'map', prompt: 'In which Pokémon game was the Johto region first introduced?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Pokémon Yellow', isCorrect: false }, { id: 'b', text: 'Pokémon Gold & Silver', isCorrect: true }, { id: 'c', text: 'Pokémon Crystal', isCorrect: false }, { id: 'd', text: 'Pokémon FireRed & LeafGreen', isCorrect: false }] },
  { id: 'pkm-6', gameId: 'pokemon', type: 'trivia', prompt: 'What is the National Pokédex number of Pikachu?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: '#025', isCorrect: true }, { id: 'b', text: '#001', isCorrect: false }, { id: 'c', text: '#049', isCorrect: false }, { id: 'd', text: '#133', isCorrect: false }] },
  { id: 'pkm-7', gameId: 'pokemon', type: 'trivia', prompt: 'Which legendary Pokémon is said to represent time in the Sinnoh region?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Palkia', isCorrect: false }, { id: 'b', text: 'Arceus', isCorrect: false }, { id: 'c', text: 'Dialga', isCorrect: true }, { id: 'd', text: 'Giratina', isCorrect: false }] },
  { id: 'pkm-8', gameId: 'pokemon', type: 'trivia', prompt: 'What move can Snorlax learn that no other Pokémon can in the original games?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Rest', isCorrect: false }, { id: 'b', text: 'Body Slam', isCorrect: false }, { id: 'c', text: 'Belly Drum', isCorrect: false }, { id: 'd', text: 'Snore', isCorrect: true }] },
  { id: 'pkm-9', gameId: 'pokemon', type: 'character-image', prompt: 'This Ghost/Ground type Pokémon is known as the "Gripper Pokémon". Identify it.', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Gengar', isCorrect: false }, { id: 'b', text: 'Golurk', isCorrect: false }, { id: 'c', text: 'Marshadow', isCorrect: false }, { id: 'd', text: 'Palossand', isCorrect: true }] },
  { id: 'pkm-10', gameId: 'pokemon', type: 'trivia', prompt: 'What Pokémon type is NOT very effective against Water types?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Grass', isCorrect: false }, { id: 'b', text: 'Electric', isCorrect: false }, { id: 'c', text: 'Fire', isCorrect: true }, { id: 'd', text: 'Dragon', isCorrect: false }] },
];

const LOL_QUESTIONS: Question[] = [
  { id: 'lol-1', gameId: 'league-of-legends', type: 'trivia', prompt: 'Which champion is known as "The Dark Child" and uses a giant teddy bear named Tibbers?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Lux', isCorrect: false }, { id: 'b', text: 'Annie', isCorrect: true }, { id: 'c', text: 'Syndra', isCorrect: false }, { id: 'd', text: 'Lissandra', isCorrect: false }] },
  { id: 'lol-2', gameId: 'league-of-legends', type: 'trivia', prompt: 'What is the maximum number of items a champion can carry at once in a standard LoL game?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: '5', isCorrect: false }, { id: 'b', text: '7', isCorrect: false }, { id: 'c', text: '6', isCorrect: true }, { id: 'd', text: '8', isCorrect: false }] },
  { id: 'lol-3', gameId: 'league-of-legends', type: 'map', prompt: 'What is the name of the jungle objective that grants a powerful buff to your entire team when slain?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Dragon', isCorrect: false }, { id: 'b', text: 'Herald', isCorrect: false }, { id: 'c', text: 'Baron Nashor', isCorrect: true }, { id: 'd', text: 'Voidgrub', isCorrect: false }] },
  { id: 'lol-4', gameId: 'league-of-legends', type: 'character-image', prompt: 'This champion is a blind monk from Ionia who masters cosmic combat. Who is he?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Master Yi', isCorrect: false }, { id: 'b', text: 'Shen', isCorrect: false }, { id: 'c', text: 'Lee Sin', isCorrect: true }, { id: 'd', text: 'Karma', isCorrect: false }] },
  { id: 'lol-5', gameId: 'league-of-legends', type: 'trivia', prompt: 'Which region in the LoL lore is the homeland of the Freljord champions like Ashe?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Demacia', isCorrect: false }, { id: 'b', text: 'Freljord', isCorrect: true }, { id: 'c', text: 'Noxus', isCorrect: false }, { id: 'd', text: 'Piltover', isCorrect: false }] },
  { id: 'lol-6', gameId: 'league-of-legends', type: 'trivia', prompt: 'What is the passive ability of the champion Garen called?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Determination', isCorrect: false }, { id: 'b', text: 'Courage', isCorrect: false }, { id: 'c', text: 'Perseverance', isCorrect: true }, { id: 'd', text: 'Valor', isCorrect: false }] },
  { id: 'lol-7', gameId: 'league-of-legends', type: 'trivia', prompt: 'Which LoL champion was the first to be released with the game?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Ryze', isCorrect: true }, { id: 'b', text: 'Ashe', isCorrect: false }, { id: 'c', text: 'Nunu', isCorrect: false }, { id: 'd', text: 'Annie', isCorrect: false }] },
  { id: 'lol-8', gameId: 'league-of-legends', type: 'trivia', prompt: 'The Netflix animated series based on League of Legends is called what?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Runaways', isCorrect: false }, { id: 'b', text: 'Arcane', isCorrect: true }, { id: 'c', text: 'Legends', isCorrect: false }, { id: 'd', text: 'Ruination', isCorrect: false }] },
  { id: 'lol-9', gameId: 'league-of-legends', type: 'trivia', prompt: 'Which city-state in the LoL universe is known for science and hextech inventions?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Zaun', isCorrect: false }, { id: 'b', text: 'Piltover', isCorrect: true }, { id: 'c', text: 'Bilgewater', isCorrect: false }, { id: 'd', text: 'Shurima', isCorrect: false }] },
  { id: 'lol-10', gameId: 'league-of-legends', type: 'character-image', prompt: 'Which champion is known as "The Undead Juggernaut" and is a massive armored zombie?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Urgot', isCorrect: false }, { id: 'b', text: 'Sion', isCorrect: true }, { id: 'c', text: 'Galio', isCorrect: false }, { id: 'd', text: 'Malphite', isCorrect: false }] },
];

const MLBB_QUESTIONS: Question[] = [
  { id: 'ml-1', gameId: 'mobile-legends', type: 'trivia', prompt: 'Which Mobile Legends hero is known as the "Demon Hunter" and wields dual pistols?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Claude', isCorrect: true }, { id: 'b', text: 'Brody', isCorrect: false }, { id: 'c', text: 'Yi Sun-shin', isCorrect: false }, { id: 'd', text: 'Lesley', isCorrect: false }] },
  { id: 'ml-2', gameId: 'mobile-legends', type: 'trivia', prompt: 'What is the name of the powerful jungle monster that appears in the center of the map?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Turtle', isCorrect: false }, { id: 'b', text: 'Demon King', isCorrect: false }, { id: 'c', text: 'Lord', isCorrect: true }, { id: 'd', text: 'Dragon', isCorrect: false }] },
  { id: 'ml-3', gameId: 'mobile-legends', type: 'trivia', prompt: 'Which MLBB hero can transform into three different forms: Ball, Spike, and Drill?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Terizla', isCorrect: false }, { id: 'b', text: 'Aldous', isCorrect: false }, { id: 'c', text: 'Gusion', isCorrect: false }, { id: 'd', text: 'Gloo', isCorrect: true }] },
  { id: 'ml-4', gameId: 'mobile-legends', type: 'character-image', prompt: 'This hero is a powerful mage known as the "Conqueror of Ancient Civilizations". Who is she?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Lunox', isCorrect: false }, { id: 'b', text: 'Cyclops', isCorrect: false }, { id: 'c', text: 'Cecilion', isCorrect: false }, { id: 'd', text: 'Kagura', isCorrect: true }] },
  { id: 'ml-5', gameId: 'mobile-legends', type: 'trivia', prompt: 'How many players are on each team in a standard Mobile Legends match?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: '3', isCorrect: false }, { id: 'b', text: '4', isCorrect: false }, { id: 'c', text: '5', isCorrect: true }, { id: 'd', text: '6', isCorrect: false }] },
  { id: 'ml-6', gameId: 'mobile-legends', type: 'trivia', prompt: 'Which MLBB hero is a fighter known for his farming mechanics and can split into multiple clones?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Wanwan', isCorrect: false }, { id: 'b', text: 'Lancelot', isCorrect: false }, { id: 'c', text: 'Thamuz', isCorrect: false }, { id: 'd', text: 'Guinevere', isCorrect: true }] },
  { id: 'ml-7', gameId: 'mobile-legends', type: 'trivia', prompt: 'What role does the hero "Tigreal" commonly play in Mobile Legends?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Marksman', isCorrect: false }, { id: 'b', text: 'Tank', isCorrect: true }, { id: 'c', text: 'Mage', isCorrect: false }, { id: 'd', text: 'Assassin', isCorrect: false }] },
  { id: 'ml-8', gameId: 'mobile-legends', type: 'trivia', prompt: 'Which terrain feature in MLBB provides vision control and is contested early game?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'River', isCorrect: false }, { id: 'b', text: 'Bush', isCorrect: false }, { id: 'c', text: 'Turtle Pit', isCorrect: false }, { id: 'd', text: 'Blue or Red Buff camps', isCorrect: true }] },
  { id: 'ml-9', gameId: 'mobile-legends', type: 'trivia', prompt: 'Which season introduced the revamped Roaming system in Mobile Legends?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Season 15', isCorrect: false }, { id: 'b', text: 'Season 18', isCorrect: false }, { id: 'c', text: 'Season 12', isCorrect: true }, { id: 'd', text: 'Season 20', isCorrect: false }] },
  { id: 'ml-10', gameId: 'mobile-legends', type: 'character-image', prompt: 'A tank hero known as "The Sea Halberd", this hero throws a magical lance and can freeze enemies. Who is it?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Baxia', isCorrect: false }, { id: 'b', text: 'Atlas', isCorrect: false }, { id: 'c', text: 'Barats', isCorrect: false }, { id: 'd', text: 'Khufra', isCorrect: true }] },
];

const TEKKEN_QUESTIONS: Question[] = [
  { id: 'tk-1', gameId: 'tekken', type: 'trivia', prompt: 'Who is the main antagonist and father of the protagonist in the Tekken series?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Lee Chaolan', isCorrect: false }, { id: 'b', text: 'Heihachi Mishima', isCorrect: true }, { id: 'c', text: 'Kazuya Mishima', isCorrect: false }, { id: 'd', text: 'Jin Kazama', isCorrect: false }] },
  { id: 'tk-2', gameId: 'tekken', type: 'trivia', prompt: 'What is the name of the fighting style used by Jin Kazama in Tekken 3?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Karate', isCorrect: false }, { id: 'b', text: 'Mishima Style', isCorrect: false }, { id: 'c', text: 'Kazama Style Traditional Martial Arts', isCorrect: true }, { id: 'd', text: 'Dragon Fist', isCorrect: false }] },
  { id: 'tk-3', gameId: 'tekken', type: 'trivia', prompt: 'What supernatural force runs through the Mishima bloodline in Tekken?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'The Ogre Gene', isCorrect: false }, { id: 'b', text: 'Devil Gene', isCorrect: true }, { id: 'c', text: 'Omega Force', isCorrect: false }, { id: 'd', text: 'Dark Hado', isCorrect: false }] },
  { id: 'tk-4', gameId: 'tekken', type: 'character-image', prompt: 'This female ninja character in Tekken is known for her agility and works for G Corporation. Who is she?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Zafina', isCorrect: false }, { id: 'b', text: 'Nina Williams', isCorrect: false }, { id: 'c', text: 'Anna Williams', isCorrect: false }, { id: 'd', text: 'Kazumi Mishima', isCorrect: true }] },
  { id: 'tk-5', gameId: 'tekken', type: 'trivia', prompt: 'What is the name of the Mishima corporation that frequently appears in the Tekken storyline?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Zaibatsu Corp', isCorrect: false }, { id: 'b', text: 'G Corporation', isCorrect: false }, { id: 'c', text: 'Mishima Zaibatsu', isCorrect: true }, { id: 'd', text: 'Iron Fist Group', isCorrect: false }] },
  { id: 'tk-6', gameId: 'tekken', type: 'trivia', prompt: 'Which Tekken game introduced the popular character Hwoarang?', difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Tekken 2', isCorrect: false }, { id: 'b', text: 'Tekken 4', isCorrect: false }, { id: 'c', text: 'Tekken 3', isCorrect: true }, { id: 'd', text: 'Tekken 5', isCorrect: false }] },
  { id: 'tk-7', gameId: 'tekken', type: 'trivia', prompt: 'Who won the "King of Iron Fist Tournament" in the original Tekken?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Heihachi Mishima', isCorrect: false }, { id: 'b', text: 'Paul Phoenix', isCorrect: false }, { id: 'c', text: 'Kazuya Mishima', isCorrect: true }, { id: 'd', text: 'King', isCorrect: false }] },
  { id: 'tk-8', gameId: 'tekken', type: 'trivia', prompt: 'Which Tekken character is a bear that wears boxing gloves?', difficulty: 'Easy', points: 100, answers: [{ id: 'a', text: 'Panda', isCorrect: false }, { id: 'b', text: 'Roger Jr.', isCorrect: false }, { id: 'c', text: 'Kuma', isCorrect: true }, { id: 'd', text: 'Alex', isCorrect: false }] },
  { id: 'tk-9', gameId: 'tekken', type: 'trivia', prompt: "What is the name of Eddy Gordo's fighting style in Tekken?", difficulty: 'Medium', points: 200, answers: [{ id: 'a', text: 'Samba', isCorrect: false }, { id: 'b', text: 'Capoeira', isCorrect: true }, { id: 'c', text: 'Muay Thai', isCorrect: false }, { id: 'd', text: 'Jiu-Jitsu', isCorrect: false }] },
  { id: 'tk-10', gameId: 'tekken', type: 'character-image', prompt: 'Which cyborg character was introduced in Tekken 5 as a female fighter with robotic limbs?', difficulty: 'Hard', points: 300, answers: [{ id: 'a', text: 'Jack-7', isCorrect: false }, { id: 'b', text: 'Bryan Fury', isCorrect: false }, { id: 'c', text: 'Nina Williams', isCorrect: false }, { id: 'd', text: 'Alisa Bosconovitch', isCorrect: true }] },
];

export const ALL_QUESTIONS: Record<string, Question[]> = {
  valorant: VALORANT_QUESTIONS,
  pokemon: POKEMON_QUESTIONS,
  'league-of-legends': LOL_QUESTIONS,
  'mobile-legends': MLBB_QUESTIONS,
  tekken: TEKKEN_QUESTIONS,
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'ProGamer_X', score: 12500, accuracy: 98, streak: 25, gameId: 'valorant', modeId: 'mixed-quiz', date: '2026-06-29', badge: '👑' },
  { rank: 2, username: 'ShadowStriker', score: 11200, accuracy: 95, streak: 20, gameId: 'valorant', modeId: 'voice-line', date: '2026-06-29', badge: '🥈' },
  { rank: 3, username: 'NeonSage', score: 10800, accuracy: 93, streak: 18, gameId: 'pokemon', modeId: 'character-guess', date: '2026-06-28', badge: '🥉' },
  { rank: 4, username: 'VoidWalker', score: 9500, accuracy: 91, streak: 15, gameId: 'league-of-legends', modeId: 'mixed-quiz', date: '2026-06-28' },
  { rank: 5, username: 'IronFistKing', score: 8900, accuracy: 89, streak: 14, gameId: 'tekken', modeId: 'character-guess', date: '2026-06-27' },
  { rank: 6, username: 'FireStorm99', score: 8200, accuracy: 87, streak: 12, gameId: 'mobile-legends', modeId: 'mixed-quiz', date: '2026-06-27' },
  { rank: 7, username: 'CrypticFox', score: 7800, accuracy: 85, streak: 11, gameId: 'valorant', modeId: 'map-region', date: '2026-06-26' },
  { rank: 8, username: 'ArcaneWizard', score: 7200, accuracy: 84, streak: 10, gameId: 'league-of-legends', modeId: 'voice-line', date: '2026-06-26' },
  { rank: 9, username: 'GuestPlayer', score: 6500, accuracy: 82, streak: 9, gameId: 'pokemon', modeId: 'mixed-quiz', date: '2026-06-25', isCurrentUser: true },
  { rank: 10, username: 'StarFighter', score: 6100, accuracy: 80, streak: 8, gameId: 'tekken', modeId: 'mixed-quiz', date: '2026-06-25' },
  { rank: 11, username: 'ThunderBolt', score: 5800, accuracy: 78, streak: 7, gameId: 'mobile-legends', modeId: 'character-guess', date: '2026-06-24' },
  { rank: 12, username: 'NightOwl', score: 5200, accuracy: 76, streak: 6, gameId: 'valorant', modeId: 'character-guess', date: '2026-06-24' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-win', name: 'First Blood', description: 'Complete your first quiz session.', icon: '🎯', isUnlocked: true, unlockedAt: '2026-06-01', rarity: 'Common' },
  { id: 'streak-5', name: 'On Fire', description: 'Achieve a 5x answer streak.', icon: '🔥', isUnlocked: true, unlockedAt: '2026-06-05', rarity: 'Common' },
  { id: 'perfect-score', name: 'Flawless Victory', description: 'Score 100% accuracy in any quiz.', icon: '💎', isUnlocked: false, rarity: 'Legendary' },
  { id: 'all-games', name: 'Omniplayer', description: 'Play a quiz for all 5 games.', icon: '🌟', isUnlocked: true, unlockedAt: '2026-06-10', rarity: 'Rare' },
  { id: 'streak-20', name: 'Unstoppable', description: 'Achieve a 20x answer streak.', icon: '⚡', isUnlocked: false, rarity: 'Epic' },
  { id: 'daily-7', name: 'Weekly Warrior', description: 'Complete the Daily Challenge 7 days in a row.', icon: '📅', isUnlocked: false, rarity: 'Rare' },
  { id: 'high-score', name: 'Top Scorer', description: 'Reach 10,000 points in a single session.', icon: '🏆', isUnlocked: false, rarity: 'Epic' },
  { id: 'endless-50', name: 'Endless Runner', description: 'Answer 50 questions in Endless Mode.', icon: '♾️', isUnlocked: false, rarity: 'Legendary' },
];

export const MOCK_USER_PROFILE: UserProfile = {
  username: 'GuestPlayer',
  avatar: '🎮',
  level: 12,
  xp: 2840,
  xpToNextLevel: 3000,
  totalGamesPlayed: 47,
  totalScore: 34200,
  highScore: 6500,
  accuracy: 79,
  maxStreak: 12,
  achievements: MOCK_ACHIEVEMENTS,
  favoriteGame: 'valorant',
  joinDate: '2026-04-15',
  gamesStats: [
    { gameId: 'valorant', gamesPlayed: 20, highScore: 6500, accuracy: 82 },
    { gameId: 'pokemon', gamesPlayed: 12, highScore: 4800, accuracy: 78 },
    { gameId: 'league-of-legends', gamesPlayed: 8, highScore: 3900, accuracy: 75 },
    { gameId: 'mobile-legends', gamesPlayed: 5, highScore: 2800, accuracy: 71 },
    { gameId: 'tekken', gamesPlayed: 2, highScore: 1800, accuracy: 65 },
  ],
};