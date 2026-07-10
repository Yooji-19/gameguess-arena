import { Game, QuizMode, Question } from '../types';

export const GAMES: Game[] = [
  { id: 'valorant', name: 'VALORANT', shortName: 'VAL', genre: 'Tactical Shooter', accentColor: '#ff4655', emoji: '🎯', description: 'Identify VALORANT agents and maps.' },
  { id: 'mobile-legends', name: 'Mobile Legends', shortName: 'MLBB', genre: 'Mobile MOBA', accentColor: '#00f1fe', emoji: '⚔️', description: 'Identify MLBB heroes.' },
  { id: 'pokemon', name: 'Pokémon', shortName: 'PKM', genre: 'RPG', accentColor: '#e9c400', emoji: '⚡', description: 'Identify Pokémon species.' },
  { id: 'league-of-legends', name: 'League of Legends', shortName: 'LoL', genre: 'MOBA', accentColor: '#d2bbff', emoji: '🏆', description: 'Identify LoL champions.' },
  { id: 'tekken', name: 'Tekken', shortName: 'TK', genre: 'Fighting', accentColor: '#ffb4ab', emoji: '👊', description: 'Identify Tekken fighters and stages.' },
];

export const QUIZ_MODES: QuizMode[] = [
  { id: 'character-guess', name: 'Character Guess', description: 'A zoomed-in image of a character — guess who it is!', icon: 'person_search', timeLimit: 20, questionCount: 10 },
  { id: 'map-region', name: 'Map / Stage Guess', description: 'Identify the map or stage from the picture.', icon: 'map', timeLimit: 20, questionCount: 10 },
];

// ─── URL helpers ──────────────────────────────────────────────────────────────
const VAL  = (uuid: string) => `https://media.valorant-api.com/agents/${uuid}/fullportrait.png`;
const VALM = (uuid: string) => `https://media.valorant-api.com/maps/${uuid}/splash.png`;
const PKM  = (id: number)   => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const LOL  = (name: string) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;
const MLBB = (path: string) => `https://static.wikia.nocookie.net/mobile-legends/images/${path}`;

// ─── VALORANT agents — all 27 agents ─────────────────────────────────────────
const makeWrong = (names: string[], correct: string, seed: string = correct) => {
  const wrong = names.filter(n => n !== correct);
  // Use seeded sort so answers are consistent per correct answer
  let h = 0; for(let c of seed){h=(h*31+c.charCodeAt(0))%997;}
  const shuffled = wrong.sort((a,b)=>((h+a.charCodeAt(0))%7)-((h+b.charCodeAt(0))%7)).slice(0, 3);
  const all = [correct, ...shuffled].sort((a,b)=>((h*13+a.charCodeAt(0))%5)-((h*13+b.charCodeAt(0))%5));
  return all.map((t, i) => ({ id: String.fromCharCode(97 + i), text: t, isCorrect: t === correct }));
};

// All VAL agent names for distractors
const VAL_AGENTS = ['Jett','Sage','Omen','Reyna','Cypher','Sova','Killjoy','Viper','Raze','Chamber',
  'Brimstone','Phoenix','Breach','Skye','Yoru','Astra','KAY/O','Neon','Fade','Harbor',
  'Gekko','Deadlock','Iso','Clove','Vyse','Tejo','Waylay'];

const VALORANT_CHARACTER: Question[] = [
  { id:'val-c-1',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('add6443a-41bd-e414-f6ad-e58d267f4e95'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Jett') },
  { id:'val-c-2',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('569fdd95-4d10-43ab-ca70-79becc718b46'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Sage') },
  { id:'val-c-3',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('8e253930-4c05-31dd-1b6c-968525494517'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Omen') },
  { id:'val-c-4',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('a3bfb853-43b2-7238-a4f1-ad90e9e46bcc'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Reyna') },
  { id:'val-c-5',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('117ed9e3-49f3-6512-3ccf-0cada7e3823b'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Cypher') },
  { id:'val-c-6',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('320b2a48-4d9b-a075-30f1-1f93a9b638fa'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Sova') },
  { id:'val-c-7',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('1e58de9c-4950-5125-93e9-a0aee9f98746'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Killjoy') },
  { id:'val-c-8',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('9f0d8ba9-4140-b941-57d3-a7ad57c6b417'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Viper') },
  { id:'val-c-9',  gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('f94c3b30-42be-e959-889c-5aa313dba261'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Raze') },
  { id:'val-c-10', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('22697a3d-45bf-8dd7-4fec-84a9e28c69d7'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Chamber') },
  { id:'val-c-11', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('9dbd505e-588d-3dde-944b-3e93c13b2674'), difficulty:'Easy',   points:100, answers:makeWrong(VAL_AGENTS,'Brimstone') },
  { id:'val-c-12', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('eb93336a-449b-9c1e-0ac5-b08e50f0bf90'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Phoenix') },
  { id:'val-c-13', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('5f8d3a7f-467b-97f3-062c-13acf203c006'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Breach') },
  { id:'val-c-14', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('6f2a04ca-43e0-be17-7f36-b3908627744d'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Skye') },
  { id:'val-c-15', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('7f94d92c-4234-0a36-9646-3a87eb8b5c89'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Yoru') },
  { id:'val-c-16', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('41fb69c1-4189-7b37-f117-bcaf1e96f1bf'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Astra') },
  { id:'val-c-17', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('0e38b510-41a8-5780-5e8f-568b2a4f2d6c'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'KAY/O') },
  { id:'val-c-18', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('bb2a4828-46eb-8cd1-e765-15848195d751'), difficulty:'Medium', points:200, answers:makeWrong(VAL_AGENTS,'Neon') },
  { id:'val-c-19', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('dade69b4-4f5a-8528-247b-219e5a1facd6'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Fade') },
  { id:'val-c-20', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('95b78ed7-4637-86d9-7e41-71ba8c293152'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Harbor') },
  { id:'val-c-21', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('e370fa57-4757-3604-3648-319aa9d2b8e7'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Gekko') },
  { id:'val-c-22', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('cc8b64c8-4b25-4ff9-6e7f-37b4da43d235'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Deadlock') },
  { id:'val-c-23', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('0dfdbcc7-4b43-bb0b-1f74-059935b9c796'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Iso') },
  { id:'val-c-24', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('1dbf2edd-4729-0984-3115-daa5eed44993'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Clove') },
  { id:'val-c-25', gameId:'valorant', type:'character', pixelate:true, prompt:'Who is this VALORANT agent?', image:VAL('efba5359-4016-a1e5-7626-b1ae76895940'), difficulty:'Hard',   points:300, answers:makeWrong(VAL_AGENTS,'Vyse') },
];

const VALORANT_MAP: Question[] = [
  { id:'val-m-1',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('7eaecc1b-4337-bbf6-6c9c-d8a2b9a2fee3'), difficulty:'Easy',   points:100, answers:[{id:'a',text:'Ascent',isCorrect:true},{id:'b',text:'Bind',isCorrect:false},{id:'c',text:'Haven',isCorrect:false},{id:'d',text:'Split',isCorrect:false}] },
  { id:'val-m-2',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba'), difficulty:'Easy',   points:100, answers:[{id:'a',text:'Fracture',isCorrect:false},{id:'b',text:'Bind',isCorrect:true},{id:'c',text:'Pearl',isCorrect:false},{id:'d',text:'Lotus',isCorrect:false}] },
  { id:'val-m-3',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('2bee0dc9-4ffe-519b-1cbd-7fbe763a6047'), difficulty:'Medium', points:200, answers:[{id:'a',text:'Split',isCorrect:false},{id:'b',text:'Breeze',isCorrect:false},{id:'c',text:'Haven',isCorrect:true},{id:'d',text:'Icebox',isCorrect:false}] },
  { id:'val-m-4',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('e2ad5c54-4114-a870-9641-8ea21279579a'), difficulty:'Medium', points:200, answers:[{id:'a',text:'Breeze',isCorrect:false},{id:'b',text:'Icebox',isCorrect:true},{id:'c',text:'Ascent',isCorrect:false},{id:'d',text:'Sunset',isCorrect:false}] },
  { id:'val-m-5',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('d960549e-485c-e861-8d71-aa9d1aed12a2'), difficulty:'Easy',   points:100, answers:[{id:'a',text:'Haven',isCorrect:false},{id:'b',text:'Lotus',isCorrect:false},{id:'c',text:'Split',isCorrect:true},{id:'d',text:'Pearl',isCorrect:false}] },
  { id:'val-m-6',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('fd267378-4d1d-484f-ff52-77821ed10dc2'), difficulty:'Hard',   points:300, answers:[{id:'a',text:'Sunset',isCorrect:false},{id:'b',text:'Breeze',isCorrect:false},{id:'c',text:'Fracture',isCorrect:false},{id:'d',text:'Pearl',isCorrect:true}] },
  { id:'val-m-7',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('2fe4ed3a-450a-948b-6d6b-e89a78e680a9'), difficulty:'Hard',   points:300, answers:[{id:'a',text:'Lotus',isCorrect:true},{id:'b',text:'Fracture',isCorrect:false},{id:'c',text:'Bind',isCorrect:false},{id:'d',text:'Haven',isCorrect:false}] },
  { id:'val-m-8',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('b529448b-4d60-346e-e89e-00a4c527a405'), difficulty:'Medium', points:200, answers:[{id:'a',text:'Pearl',isCorrect:false},{id:'b',text:'Breeze',isCorrect:true},{id:'c',text:'Icebox',isCorrect:false},{id:'d',text:'Split',isCorrect:false}] },
  { id:'val-m-9',  gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('92584fbe-486a-b1b2-9faa-39049ba584c6'), difficulty:'Hard',   points:300, answers:[{id:'a',text:'Lotus',isCorrect:false},{id:'b',text:'Bind',isCorrect:false},{id:'c',text:'Sunset',isCorrect:true},{id:'d',text:'Ascent',isCorrect:false}] },
  { id:'val-m-10', gameId:'valorant', type:'map', pixelate:false, prompt:'Which VALORANT map is this?', image:VALM('b6a9fcab-4d1e-1e7a-4b40-7cac49e5eb90'), difficulty:'Hard',   points:300, answers:[{id:'a',text:'Haven',isCorrect:false},{id:'b',text:'Fracture',isCorrect:true},{id:'c',text:'Split',isCorrect:false},{id:'d',text:'Pearl',isCorrect:false}] },
];

// ─── POKÉMON — 30 Pokémon with correct 4-choice answers ──────────────────────
const PKM_NAMES = ['Pikachu','Charizard','Mewtwo','Gengar','Eevee','Lucario','Snorlax','Umbreon',
  'Garchomp','Sylveon','Bulbasaur','Charmander','Squirtle','Blastoise','Venusaur','Alakazam',
  'Machamp','Golem','Arcanine','Gyarados','Lapras','Vaporeon','Jolteon','Flareon',
  'Espeon','Leafeon','Glaceon','Dragonite','Tyranitar','Blaziken'];

const PKM_IDS: Record<string,number> = {
  Pikachu:25, Charizard:6, Mewtwo:150, Gengar:94, Eevee:133, Lucario:448,
  Snorlax:143, Umbreon:197, Garchomp:445, Sylveon:700, Bulbasaur:1, Charmander:4,
  Squirtle:7, Blastoise:9, Venusaur:3, Alakazam:65, Machamp:68, Golem:76,
  Arcanine:59, Gyarados:130, Lapras:131, Vaporeon:134, Jolteon:135, Flareon:136,
  Espeon:196, Leafeon:470, Glaceon:471, Dragonite:149, Tyranitar:248, Blaziken:257
};

const PKM_DIFF: Record<string,'Easy'|'Medium'|'Hard'> = {
  Pikachu:'Easy', Charizard:'Easy', Mewtwo:'Easy', Gengar:'Medium', Eevee:'Easy',
  Lucario:'Medium', Snorlax:'Easy', Umbreon:'Medium', Garchomp:'Hard', Sylveon:'Hard',
  Bulbasaur:'Easy', Charmander:'Easy', Squirtle:'Easy', Blastoise:'Medium', Venusaur:'Medium',
  Alakazam:'Medium', Machamp:'Medium', Golem:'Hard', Arcanine:'Easy', Gyarados:'Easy',
  Lapras:'Medium', Vaporeon:'Easy', Jolteon:'Medium', Flareon:'Medium',
  Espeon:'Medium', Leafeon:'Hard', Glaceon:'Hard', Dragonite:'Easy', Tyranitar:'Hard', Blaziken:'Medium'
};

const POKEMON_CHARACTER: Question[] = PKM_NAMES.map((name, i) => ({
  id: `pkm-c-${i+1}`,
  gameId: 'pokemon' as const,
  type: 'character' as const,
  pixelate: true,
  prompt: 'Which Pokémon is this?',
  image: PKM(PKM_IDS[name]),
  difficulty: PKM_DIFF[name],
  points: PKM_DIFF[name] === 'Easy' ? 100 : PKM_DIFF[name] === 'Medium' ? 200 : 300,
  answers: makeWrong(PKM_NAMES, name),
}));

// ─── LEAGUE OF LEGENDS — 25 champions ────────────────────────────────────────
const LOL_NAMES = ['Jinx','Yasuo','Lux','Thresh','Ahri','Teemo','Vi','Zed','Garen','Ezreal',
  'Ashe','Darius','Katarina','Lee Sin','Vayne','Leona','Morgana','Nami','Zoe','Akali',
  'Yone','Sett','Viego','Seraphine','Pyke'];

const LOL_DIFF: Record<string,'Easy'|'Medium'|'Hard'> = {
  Jinx:'Easy', Yasuo:'Easy', Lux:'Easy', Thresh:'Medium', Ahri:'Easy', Teemo:'Easy',
  Vi:'Medium', Zed:'Medium', Garen:'Easy', Ezreal:'Medium', Ashe:'Easy', Darius:'Easy',
  Katarina:'Medium', 'Lee Sin':'Medium', Vayne:'Medium', Leona:'Medium', Morgana:'Easy',
  Nami:'Hard', Zoe:'Hard', Akali:'Hard', Yone:'Hard', Sett:'Medium', Viego:'Hard',
  Seraphine:'Hard', Pyke:'Hard'
};

// LoL splash art uses exact champion name — spaces removed, special chars handled
const LOL_SPLASH_KEY: Record<string,string> = {
  'Lee Sin': 'LeeSin',
};
const lolSplash = (name: string) => LOL(`${LOL_SPLASH_KEY[name] ?? name.replace(/[^a-zA-Z]/g,'')}`);

const LOL_CHARACTER: Question[] = LOL_NAMES.map((name, i) => ({
  id: `lol-c-${i+1}`,
  gameId: 'league-of-legends' as const,
  type: 'character' as const,
  pixelate: true,
  prompt: 'Which LoL champion is this?',
  image: lolSplash(name),
  difficulty: LOL_DIFF[name],
  points: LOL_DIFF[name] === 'Easy' ? 100 : LOL_DIFF[name] === 'Medium' ? 200 : 300,
  answers: makeWrong(LOL_NAMES, name),
}));

// ─── MOBILE LEGENDS — 20 heroes using wikia avatars ──────────────────────────
const MLBB_DATA: { name: string; path: string; diff: 'Easy'|'Medium'|'Hard' }[] = [
  { name:'Layla',     path:'c/c6/Layla_avatar.png',     diff:'Easy'   },
  { name:'Alucard',   path:'9/93/Alucard_avatar.png',   diff:'Easy'   },
  { name:'Tigreal',   path:'5/5c/Tigreal_avatar.png',   diff:'Easy'   },
  { name:'Kagura',    path:'7/71/Kagura_avatar.png',     diff:'Medium' },
  { name:'Fanny',     path:'f/f7/Fanny_avatar.png',     diff:'Hard'   },
  { name:'Gusion',    path:'a/a2/Gusion_avatar.png',    diff:'Medium' },
  { name:'Chou',      path:'3/38/Chou_avatar.png',      diff:'Easy'   },
  { name:'Wanwan',    path:'e/e4/Wanwan_avatar.png',    diff:'Medium' },
  { name:'Ling',      path:'d/d4/Ling_avatar.png',      diff:'Hard'   },
  { name:'Hayabusa',  path:'0/04/Hayabusa_avatar.png',  diff:'Hard'   },
  { name:'Lancelot',  path:'a/a2/Lancelot_avatar.png',  diff:'Medium' },
  { name:'Grock',     path:'4/4f/Grock_avatar.png',     diff:'Hard'   },
  { name:'Lesley',    path:'6/6c/Lesley_avatar.png',    diff:'Medium' },
  { name:'Lunox',     path:'7/7e/Lunox_avatar.png',     diff:'Hard'   },
  { name:'Granger',   path:'0/0e/Granger_avatar.png',   diff:'Medium' },
  { name:'Estes',     path:'2/2a/Estes_avatar.png',     diff:'Easy'   },
  { name:'Franco',    path:'8/8a/Franco_avatar.png',    diff:'Easy'   },
  { name:'Miya',      path:'6/6a/Miya_avatar.png',      diff:'Easy'   },
  { name:'Eudora',    path:'7/7b/Eudora_avatar.png',    diff:'Easy'   },
  { name:'Zilong',    path:'1/13/Zilong_avatar.png',    diff:'Easy'   },
];

const MLBB_NAMES = MLBB_DATA.map(d => d.name);

const MLBB_CHARACTER: Question[] = MLBB_DATA.map((d, i) => ({
  id: `ml-c-${i+1}`,
  gameId: 'mobile-legends' as const,
  type: 'character' as const,
  pixelate: true,
  prompt: 'Which MLBB hero is this?',
  image: MLBB(d.path),
  difficulty: d.diff,
  points: d.diff === 'Easy' ? 100 : d.diff === 'Medium' ? 200 : 300,
  answers: makeWrong(MLBB_NAMES, d.name),
}));

// ─── TEKKEN — 20 fighters using tekken-official.jp ───────────────────────────
const TK_DATA: { name: string; slug: string; diff: 'Easy'|'Medium'|'Hard' }[] = [
  { name:'Jin Kazama',         slug:'jin',         diff:'Easy'   },
  { name:'Kazuya Mishima',     slug:'kazuya',      diff:'Easy'   },
  { name:'Paul Phoenix',       slug:'paul',        diff:'Easy'   },
  { name:'King',               slug:'king',        diff:'Medium' },
  { name:'Nina Williams',      slug:'nina',        diff:'Medium' },
  { name:'Marshall Law',       slug:'law',         diff:'Medium' },
  { name:'Hwoarang',           slug:'hwoarang',    diff:'Hard'   },
  { name:'Lili',               slug:'lili',        diff:'Medium' },
  { name:'Yoshimitsu',         slug:'yoshimitsu',  diff:'Hard'   },
  { name:'Alisa Bosconovitch', slug:'alisa',       diff:'Medium' },
  { name:'Asuka Kazama',       slug:'asuka',       diff:'Easy'   },
  { name:'Bryan Fury',         slug:'bryan',       diff:'Hard'   },
  { name:'Claudio Serafino',   slug:'claudio',     diff:'Hard'   },
  { name:'Devil Jin',          slug:'devil_jin',   diff:'Hard'   },
  { name:'Dragunov',           slug:'dragunov',    diff:'Hard'   },
  { name:'Eddy Gordo',         slug:'eddy',        diff:'Medium' },
  { name:'Jack-8',             slug:'jack8',       diff:'Medium' },
  { name:'Lars Alexandersson', slug:'lars',        diff:'Hard'   },
  { name:'Leo Kliesen',        slug:'leo',         diff:'Hard'   },
  { name:'Leroy Smith',        slug:'leroy',       diff:'Hard'   },
];

const TK_NAMES = TK_DATA.map(d => d.name);
const TK_IMG = (slug: string) => `https://www.tekken-official.jp/tekken8/en/assets/images/characters/${slug}/normal_l.png`;

const TEKKEN_CHARACTER: Question[] = TK_DATA.map((d, i) => ({
  id: `tk-c-${i+1}`,
  gameId: 'tekken' as const,
  type: 'character' as const,
  pixelate: true,
  prompt: 'Which Tekken fighter is this?',
  image: TK_IMG(d.slug),
  difficulty: d.diff,
  points: d.diff === 'Easy' ? 100 : d.diff === 'Medium' ? 200 : 300,
  answers: makeWrong(TK_NAMES, d.name),
}));

const TEKKEN_MAP: Question[] = [
  { id:'tk-m-1',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg01.jpg', difficulty:'Easy',   points:100, answers:[{id:'a',text:'Mishima Dojo',isCorrect:true},{id:'b',text:'Midnight Siege',isCorrect:false},{id:'c',text:'Fallen Destiny',isCorrect:false},{id:'d',text:'Ortiz Farm',isCorrect:false}] },
  { id:'tk-m-2',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg02.jpg', difficulty:'Medium', points:200, answers:[{id:'a',text:'Coliseum of Fate',isCorrect:false},{id:'b',text:'Urban Square',isCorrect:true},{id:'c',text:'Midnight Siege',isCorrect:false},{id:'d',text:'Fallen Destiny',isCorrect:false}] },
  { id:'tk-m-3',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg03.jpg', difficulty:'Medium', points:200, answers:[{id:'a',text:'Midnight Siege',isCorrect:false},{id:'b',text:'Fallen Destiny',isCorrect:true},{id:'c',text:'Coliseum of Fate',isCorrect:false},{id:'d',text:'Ortiz Farm',isCorrect:false}] },
  { id:'tk-m-4',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg04.jpg', difficulty:'Hard',   points:300, answers:[{id:'a',text:'Fallen Destiny',isCorrect:false},{id:'b',text:'Ortiz Farm',isCorrect:true},{id:'c',text:'Midnight Siege',isCorrect:false},{id:'d',text:'Yakushima',isCorrect:false}] },
  { id:'tk-m-5',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg05.jpg', difficulty:'Hard',   points:300, answers:[{id:'a',text:'Ortiz Farm',isCorrect:false},{id:'b',text:'Midnight Siege',isCorrect:true},{id:'c',text:'Coliseum of Fate',isCorrect:false},{id:'d',text:'Fallen Destiny',isCorrect:false}] },
  { id:'tk-m-6',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg06.jpg', difficulty:'Medium', points:200, answers:[{id:'a',text:'Midnight Siege',isCorrect:false},{id:'b',text:'Coliseum of Fate',isCorrect:true},{id:'c',text:'Mishima Dojo',isCorrect:false},{id:'d',text:'Yakushima',isCorrect:false}] },
  { id:'tk-m-7',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg07.jpg', difficulty:'Hard',   points:300, answers:[{id:'a',text:'Coliseum of Fate',isCorrect:false},{id:'b',text:'Descent Into Subconscious',isCorrect:true},{id:'c',text:'Ortiz Farm',isCorrect:false},{id:'d',text:'Midnight Siege',isCorrect:false}] },
  { id:'tk-m-8',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg08.jpg', difficulty:'Hard',   points:300, answers:[{id:'a',text:'Descent Into Subconscious',isCorrect:false},{id:'b',text:'Yakushima',isCorrect:true},{id:'c',text:'Midnight Siege',isCorrect:false},{id:'d',text:'Fallen Destiny',isCorrect:false}] },
  { id:'tk-m-9',  gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg09.jpg', difficulty:'Medium', points:200, answers:[{id:'a',text:'Yakushima',isCorrect:false},{id:'b',text:'Into the Stratosphere',isCorrect:true},{id:'c',text:'Mishima Dojo',isCorrect:false},{id:'d',text:'Ortiz Farm',isCorrect:false}] },
  { id:'tk-m-10', gameId:'tekken', type:'map', pixelate:false, prompt:'Which Tekken 8 stage is this?', image:'https://www.tekken-official.jp/tekken8/en/assets/images/stages/stage_bg10.jpg', difficulty:'Easy',   points:100, answers:[{id:'a',text:'Into the Stratosphere',isCorrect:false},{id:'b',text:'Primal Arts Festival',isCorrect:true},{id:'c',text:'Ortiz Farm',isCorrect:false},{id:'d',text:'Urban Square',isCorrect:false}] },
];

// ─── Export — questions are randomly picked at runtime in QuizGameplayPage ────
export const ALL_QUESTIONS: Record<string, { character: Question[]; map: Question[] }> = {
  valorant:            { character: VALORANT_CHARACTER, map: VALORANT_MAP },
  pokemon:             { character: POKEMON_CHARACTER,  map: []           },
  'league-of-legends': { character: LOL_CHARACTER,      map: []           },
  'mobile-legends':    { character: MLBB_CHARACTER,     map: []           },
  tekken:              { character: TEKKEN_CHARACTER,   map: TEKKEN_MAP   },
};
