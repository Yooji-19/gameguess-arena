module.exports = [
"[project]/src/components/NavBar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavBar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
function NavBar({ currentPage, onNavigate, username = 'Guest' }) {
    const navLinks = [
        {
            label: 'Home',
            page: 'home',
            icon: 'home'
        },
        {
            label: 'Games',
            page: 'games',
            icon: 'sports_esports'
        },
        {
            label: 'Leaderboard',
            page: 'leaderboard',
            icon: 'leaderboard'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-20 bg-surface/90 backdrop-blur-xl border-b border-surface-variant",
        style: {
            boxShadow: '0 0 15px rgba(210,187,255,0.1)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>onNavigate('home'),
                className: "font-display font-black text-2xl italic text-primary tracking-tighter hover:text-secondary transition-all hover:scale-105",
                children: "TRIVIA-X"
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hidden md:flex gap-8",
                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate(link.page),
                        className: `text-label-lg font-body font-medium uppercase tracking-wide transition-all hover:scale-105 ${currentPage === link.page ? 'text-primary font-bold border-b-2 border-primary pb-0.5' : 'text-on-surface-variant hover:text-secondary'}`,
                        children: link.label
                    }, link.page, false, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "text-primary hover:text-secondary transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined",
                            children: "emoji_events"
                        }, void 0, false, {
                            fileName: "[project]/src/components/NavBar.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('profile'),
                        className: `flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${currentPage === 'profile' ? 'border-primary bg-primary/10' : 'border-surface-variant hover:border-primary/50 bg-surface-container-high'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-7 h-7 rounded-full bg-surface-variant border border-primary/50 flex items-center justify-center text-sm select-none",
                                children: username[0]?.toUpperCase() || 'G'
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "hidden sm:block text-label-sm font-mono text-on-surface-variant",
                                children: username
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 md:hidden flex bg-surface border-t border-surface-variant z-50",
                children: [
                    navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate(link.page),
                            className: `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${currentPage === link.page ? 'text-primary' : 'text-on-surface-variant'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-xl",
                                    style: {
                                        fontVariationSettings: currentPage === link.page ? "'FILL' 1" : "'FILL' 0"
                                    },
                                    children: link.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NavBar.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase",
                                    children: link.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NavBar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, link.page, true, {
                            fileName: "[project]/src/components/NavBar.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('profile'),
                        className: `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${currentPage === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-xl",
                                style: {
                                    fontVariationSettings: currentPage === 'profile' ? "'FILL' 1" : "'FILL' 0"
                                },
                                children: "person"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono uppercase",
                                children: "Profile"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NavBar.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/data/mockData.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_QUESTIONS",
    ()=>ALL_QUESTIONS,
    "GAMES",
    ()=>GAMES,
    "MOCK_ACHIEVEMENTS",
    ()=>MOCK_ACHIEVEMENTS,
    "MOCK_LEADERBOARD",
    ()=>MOCK_LEADERBOARD,
    "MOCK_USER_PROFILE",
    ()=>MOCK_USER_PROFILE,
    "QUIZ_MODES",
    ()=>QUIZ_MODES
]);
const GAMES = [
    {
        id: 'valorant',
        name: 'VALORANT',
        shortName: 'VAL',
        genre: 'Tactical Shooter',
        accentColor: '#ff4655',
        glowClass: 'glow-valorant',
        description: "Test your knowledge of agents, maps, and voice lines from Riot's tactical shooter.",
        questionCount: 120,
        emoji: '🎯'
    },
    {
        id: 'mobile-legends',
        name: 'Mobile Legends',
        shortName: 'MLBB',
        genre: 'Mobile MOBA',
        accentColor: '#00f1fe',
        glowClass: 'glow-mlbb',
        description: 'Identify heroes, skills, and lore from the arena of Mobile Legends: Bang Bang.',
        questionCount: 95,
        emoji: '⚔️'
    },
    {
        id: 'pokemon',
        name: 'Pokémon',
        shortName: 'PKM',
        genre: 'RPG',
        accentColor: '#e9c400',
        glowClass: 'glow-pokemon',
        description: "Prove you're a true Pokémon Master by identifying species, types, and moves.",
        questionCount: 200,
        emoji: '⚡'
    },
    {
        id: 'league-of-legends',
        name: 'League of Legends',
        shortName: 'LoL',
        genre: 'MOBA',
        accentColor: '#d2bbff',
        glowClass: 'glow-lol',
        description: "Demonstrate mastery of champions, abilities, and lore from the Summoner's Rift.",
        questionCount: 150,
        emoji: '🏆'
    },
    {
        id: 'tekken',
        name: 'Tekken',
        shortName: 'TK',
        genre: 'Fighting',
        accentColor: '#ffb4ab',
        glowClass: 'glow-tekken',
        description: "Show your expertise in Tekken's fighters, moves, and legendary storylines.",
        questionCount: 80,
        emoji: '👊'
    }
];
const QUIZ_MODES = [
    {
        id: 'voice-line',
        name: 'Voice Line Guess',
        description: 'Listen to character voice lines and identify who said it.',
        icon: 'record_voice_over',
        difficulty: 'Hard',
        timeLimit: 15,
        questionCount: 10
    },
    {
        id: 'character-guess',
        name: 'Character Guess',
        description: 'Identify characters from silhouettes, descriptions, or abilities.',
        icon: 'person_search',
        difficulty: 'Medium',
        timeLimit: 20,
        questionCount: 10
    },
    {
        id: 'map-region',
        name: 'Map / Region / Stage',
        description: 'Name the map, region, or stage from a screenshot or description.',
        icon: 'map',
        difficulty: 'Medium',
        timeLimit: 20,
        questionCount: 10
    },
    {
        id: 'mixed-quiz',
        name: 'Mixed Quiz',
        description: 'A blend of all question types for a well-rounded challenge.',
        icon: 'shuffle',
        difficulty: 'Variable',
        timeLimit: 20,
        questionCount: 15
    },
    {
        id: 'daily-challenge',
        name: 'Daily Challenge',
        description: 'A new set of curated questions every 24 hours. Compete globally.',
        icon: 'today',
        difficulty: 'Variable',
        timeLimit: 20,
        questionCount: 10,
        badge: 'DAILY'
    },
    {
        id: 'endless',
        name: 'Endless Mode',
        description: 'Keep going until you get three wrong. How far can you make it?',
        icon: 'all_inclusive',
        difficulty: 'Variable',
        timeLimit: 15,
        questionCount: 999,
        badge: 'ENDLESS'
    }
];
const VALORANT_QUESTIONS = [
    {
        id: 'val-1',
        gameId: 'valorant',
        type: 'voice-line',
        prompt: '"Watch them run."',
        subPrompt: 'Which VALORANT agent says this when activating their ultimate ability?',
        difficulty: 'Hard',
        points: 300,
        hint: 'This agent is a Duelist known for swift movement.',
        answers: [
            {
                id: 'a',
                text: 'Jett',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Sage',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Phoenix',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Omen',
                isCorrect: true
            }
        ]
    },
    {
        id: 'val-2',
        gameId: 'valorant',
        type: 'character-image',
        prompt: 'Which agent controls wind and excels in movement-based dueling?',
        subPrompt: 'Identify this VALORANT agent by their signature ability.',
        difficulty: 'Easy',
        points: 100,
        hint: 'This agent is from South Korea.',
        answers: [
            {
                id: 'a',
                text: 'Jett',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Neon',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Yoru',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Reyna',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-3',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which map features a large outdoor site called "B Long" and a cable car aesthetic?',
        subPrompt: 'Identify the VALORANT map.',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Ascent',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Haven',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Bind',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Icebox',
                isCorrect: true
            }
        ]
    },
    {
        id: 'val-4',
        gameId: 'valorant',
        type: 'trivia',
        prompt: "What is the name of Sage's healing ability?",
        subPrompt: 'Name the specific ability, not the ultimate.',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Healing Orb',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Revival',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Mend',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Restore',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-5',
        gameId: 'valorant',
        type: 'voice-line',
        prompt: '"They\'ll never see me coming."',
        subPrompt: 'Which stealthy VALORANT agent says this?',
        difficulty: 'Hard',
        points: 300,
        hint: 'This agent can teleport and create decoys.',
        answers: [
            {
                id: 'a',
                text: 'Omen',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Yoru',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Cypher',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Astra',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-6',
        gameId: 'valorant',
        type: 'trivia',
        prompt: 'Which VALORANT map was the first ever released with the game at launch?',
        subPrompt: 'Think about the original map pool.',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Split',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bind',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Haven',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Ascent',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-7',
        gameId: 'valorant',
        type: 'character-image',
        prompt: 'Which agent hails from Morocco and specializes in camera traps and surveillance?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Killjoy',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Cypher',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Chamber',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Breach',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-8',
        gameId: 'valorant',
        type: 'trivia',
        prompt: 'What is the maximum number of rounds in a standard Valorant competitive match?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: '24',
                isCorrect: false
            },
            {
                id: 'b',
                text: '30',
                isCorrect: false
            },
            {
                id: 'c',
                text: '25',
                isCorrect: false
            },
            {
                id: 'd',
                text: '30 (with overtime)',
                isCorrect: true
            }
        ]
    },
    {
        id: 'val-9',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which map is set in Venice, Italy, and features a large central courtyard with a mid-gate mechanic?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Ascent',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Fracture',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Pearl',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Sunset',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-10',
        gameId: 'valorant',
        type: 'trivia',
        prompt: 'Which controller agent can place stars on the map and pull them to create cosmic abilities?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Viper',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Omen',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Astra',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Harbor',
                isCorrect: false
            }
        ]
    }
];
const POKEMON_QUESTIONS = [
    {
        id: 'pkm-1',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'Which Pokémon is known as the "Genetic Pokémon" and was created through DNA manipulation?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Mew',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Mewtwo',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Deoxys',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Genesect',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-2',
        gameId: 'pokemon',
        type: 'character-image',
        prompt: 'This Pokémon evolves from Eevee using a Thunder Stone. Which Pokémon is it?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Flareon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Vaporeon',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Jolteon',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Leafeon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-3',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'What type combination does Charizard have in its original form (not Mega or Gigantamax)?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Fire / Dragon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Fire / Flying',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Fire / Fighting',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pure Fire',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-4',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'Which move has the highest base power and can only be used once per battle?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Hyper Beam',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Explosion',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'V-create',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Eruption',
                isCorrect: true
            }
        ]
    },
    {
        id: 'pkm-5',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'In which Pokémon game was the Johto region first introduced?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Pokémon Yellow',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Pokémon Gold & Silver',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Pokémon Crystal',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pokémon FireRed & LeafGreen',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-6',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'What is the National Pokédex number of Pikachu?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: '#025',
                isCorrect: true
            },
            {
                id: 'b',
                text: '#001',
                isCorrect: false
            },
            {
                id: 'c',
                text: '#049',
                isCorrect: false
            },
            {
                id: 'd',
                text: '#133',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-7',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'Which legendary Pokémon is said to represent time in the Sinnoh region?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Palkia',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Arceus',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Dialga',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Giratina',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-8',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'What move can Snorlax learn that no other Pokémon can in the original games?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Rest',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Body Slam',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Belly Drum',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Snore',
                isCorrect: true
            }
        ]
    },
    {
        id: 'pkm-9',
        gameId: 'pokemon',
        type: 'character-image',
        prompt: 'This Ghost/Ground type Pokémon is known as the "Gripper Pokémon". Identify it.',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Gengar',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Golurk',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Marshadow',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Palossand',
                isCorrect: true
            }
        ]
    },
    {
        id: 'pkm-10',
        gameId: 'pokemon',
        type: 'trivia',
        prompt: 'What Pokémon type is NOT very effective against Water types?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Grass',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Electric',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Fire',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Dragon',
                isCorrect: false
            }
        ]
    }
];
const LOL_QUESTIONS = [
    {
        id: 'lol-1',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'Which champion is known as "The Dark Child" and uses a giant teddy bear named Tibbers?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Lux',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Annie',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Syndra',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lissandra',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-2',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'What is the maximum number of items a champion can carry at once in a standard LoL game?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: '5',
                isCorrect: false
            },
            {
                id: 'b',
                text: '7',
                isCorrect: false
            },
            {
                id: 'c',
                text: '6',
                isCorrect: true
            },
            {
                id: 'd',
                text: '8',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-3',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'What is the name of the jungle objective that grants a powerful buff to your entire team when slain?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Dragon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Herald',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Baron Nashor',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Voidgrub',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-4',
        gameId: 'league-of-legends',
        type: 'character-image',
        prompt: 'This champion is a blind monk from Ionia who masters cosmic combat. Who is he?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Master Yi',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Shen',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Lee Sin',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Karma',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-5',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'Which region in the LoL lore is the homeland of the Freljord champions like Ashe?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Demacia',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Freljord',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Noxus',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Piltover',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-6',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'What is the passive ability of the champion Garen called?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Determination',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Courage',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Perseverance',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Valor',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-7',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'Which LoL champion was the first to be released with the game?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Ryze',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Ashe',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Nunu',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Annie',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-8',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'The Netflix animated series based on League of Legends is called what?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Runaways',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Arcane',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Legends',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Ruination',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-9',
        gameId: 'league-of-legends',
        type: 'trivia',
        prompt: 'Which city-state in the LoL universe is known for science and hextech inventions?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Zaun',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Piltover',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Bilgewater',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Shurima',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-10',
        gameId: 'league-of-legends',
        type: 'character-image',
        prompt: 'Which champion is known as "The Undead Juggernaut" and is a massive armored zombie?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Urgot',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Sion',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Galio',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Malphite',
                isCorrect: false
            }
        ]
    }
];
const MLBB_QUESTIONS = [
    {
        id: 'ml-1',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'Which Mobile Legends hero is known as the "Demon Hunter" and wields dual pistols?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Claude',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Brody',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Yi Sun-shin',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lesley',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-2',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'What is the name of the powerful jungle monster that appears in the center of the map?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Turtle',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Demon King',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Lord',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Dragon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-3',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'Which MLBB hero can transform into three different forms: Ball, Spike, and Drill?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Terizla',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Aldous',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Gusion',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Gloo',
                isCorrect: true
            }
        ]
    },
    {
        id: 'ml-4',
        gameId: 'mobile-legends',
        type: 'character-image',
        prompt: 'This hero is a powerful mage known as the "Conqueror of Ancient Civilizations". Who is she?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Lunox',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Cyclops',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Cecilion',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Kagura',
                isCorrect: true
            }
        ]
    },
    {
        id: 'ml-5',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'How many players are on each team in a standard Mobile Legends match?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: '3',
                isCorrect: false
            },
            {
                id: 'b',
                text: '4',
                isCorrect: false
            },
            {
                id: 'c',
                text: '5',
                isCorrect: true
            },
            {
                id: 'd',
                text: '6',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-6',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'Which MLBB hero is a fighter known for his farming mechanics and can split into multiple clones?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Wanwan',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Lancelot',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Thamuz',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Guinevere',
                isCorrect: true
            }
        ]
    },
    {
        id: 'ml-7',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'What role does the hero "Tigreal" commonly play in Mobile Legends?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Marksman',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Tank',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Mage',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Assassin',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-8',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'Which terrain feature in MLBB provides vision control and is contested early game?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'River',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bush',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Turtle Pit',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Blue or Red Buff camps',
                isCorrect: true
            }
        ]
    },
    {
        id: 'ml-9',
        gameId: 'mobile-legends',
        type: 'trivia',
        prompt: 'Which season introduced the revamped Roaming system in Mobile Legends?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Season 15',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Season 18',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Season 12',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Season 20',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-10',
        gameId: 'mobile-legends',
        type: 'character-image',
        prompt: 'A tank hero known as "The Sea Halberd", this hero throws a magical lance and can freeze enemies. Who is it?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Baxia',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Atlas',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Barats',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Khufra',
                isCorrect: true
            }
        ]
    }
];
const TEKKEN_QUESTIONS = [
    {
        id: 'tk-1',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'Who is the main antagonist and father of the protagonist in the Tekken series?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Lee Chaolan',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Heihachi Mishima',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Kazuya Mishima',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jin Kazama',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-2',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'What is the name of the fighting style used by Jin Kazama in Tekken 3?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Karate',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Mishima Style',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Kazama Style Traditional Martial Arts',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Dragon Fist',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-3',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'What supernatural force runs through the Mishima bloodline in Tekken?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'The Ogre Gene',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Devil Gene',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Omega Force',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Dark Hado',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-4',
        gameId: 'tekken',
        type: 'character-image',
        prompt: 'This female ninja character in Tekken is known for her agility and works for G Corporation. Who is she?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Zafina',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Nina Williams',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Anna Williams',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Kazumi Mishima',
                isCorrect: true
            }
        ]
    },
    {
        id: 'tk-5',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'What is the name of the Mishima corporation that frequently appears in the Tekken storyline?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Zaibatsu Corp',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'G Corporation',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Mishima Zaibatsu',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Iron Fist Group',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-6',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'Which Tekken game introduced the popular character Hwoarang?',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Tekken 2',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Tekken 4',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Tekken 3',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Tekken 5',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-7',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'Who won the "King of Iron Fist Tournament" in the original Tekken?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Heihachi Mishima',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Paul Phoenix',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Kazuya Mishima',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'King',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-8',
        gameId: 'tekken',
        type: 'trivia',
        prompt: 'Which Tekken character is a bear that wears boxing gloves?',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Panda',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Roger Jr.',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Kuma',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Alex',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-9',
        gameId: 'tekken',
        type: 'trivia',
        prompt: "What is the name of Eddy Gordo's fighting style in Tekken?",
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Samba',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Capoeira',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Muay Thai',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jiu-Jitsu',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-10',
        gameId: 'tekken',
        type: 'character-image',
        prompt: 'Which cyborg character was introduced in Tekken 5 as a female fighter with robotic limbs?',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Jack-7',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bryan Fury',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Nina Williams',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Alisa Bosconovitch',
                isCorrect: true
            }
        ]
    }
];
const ALL_QUESTIONS = {
    valorant: VALORANT_QUESTIONS,
    pokemon: POKEMON_QUESTIONS,
    'league-of-legends': LOL_QUESTIONS,
    'mobile-legends': MLBB_QUESTIONS,
    tekken: TEKKEN_QUESTIONS
};
const MOCK_LEADERBOARD = [
    {
        rank: 1,
        username: 'ProGamer_X',
        score: 12500,
        accuracy: 98,
        streak: 25,
        gameId: 'valorant',
        modeId: 'mixed-quiz',
        date: '2026-06-29',
        badge: '👑'
    },
    {
        rank: 2,
        username: 'ShadowStriker',
        score: 11200,
        accuracy: 95,
        streak: 20,
        gameId: 'valorant',
        modeId: 'voice-line',
        date: '2026-06-29',
        badge: '🥈'
    },
    {
        rank: 3,
        username: 'NeonSage',
        score: 10800,
        accuracy: 93,
        streak: 18,
        gameId: 'pokemon',
        modeId: 'character-guess',
        date: '2026-06-28',
        badge: '🥉'
    },
    {
        rank: 4,
        username: 'VoidWalker',
        score: 9500,
        accuracy: 91,
        streak: 15,
        gameId: 'league-of-legends',
        modeId: 'mixed-quiz',
        date: '2026-06-28'
    },
    {
        rank: 5,
        username: 'IronFistKing',
        score: 8900,
        accuracy: 89,
        streak: 14,
        gameId: 'tekken',
        modeId: 'character-guess',
        date: '2026-06-27'
    },
    {
        rank: 6,
        username: 'FireStorm99',
        score: 8200,
        accuracy: 87,
        streak: 12,
        gameId: 'mobile-legends',
        modeId: 'mixed-quiz',
        date: '2026-06-27'
    },
    {
        rank: 7,
        username: 'CrypticFox',
        score: 7800,
        accuracy: 85,
        streak: 11,
        gameId: 'valorant',
        modeId: 'map-region',
        date: '2026-06-26'
    },
    {
        rank: 8,
        username: 'ArcaneWizard',
        score: 7200,
        accuracy: 84,
        streak: 10,
        gameId: 'league-of-legends',
        modeId: 'voice-line',
        date: '2026-06-26'
    },
    {
        rank: 9,
        username: 'GuestPlayer',
        score: 6500,
        accuracy: 82,
        streak: 9,
        gameId: 'pokemon',
        modeId: 'mixed-quiz',
        date: '2026-06-25',
        isCurrentUser: true
    },
    {
        rank: 10,
        username: 'StarFighter',
        score: 6100,
        accuracy: 80,
        streak: 8,
        gameId: 'tekken',
        modeId: 'mixed-quiz',
        date: '2026-06-25'
    },
    {
        rank: 11,
        username: 'ThunderBolt',
        score: 5800,
        accuracy: 78,
        streak: 7,
        gameId: 'mobile-legends',
        modeId: 'character-guess',
        date: '2026-06-24'
    },
    {
        rank: 12,
        username: 'NightOwl',
        score: 5200,
        accuracy: 76,
        streak: 6,
        gameId: 'valorant',
        modeId: 'character-guess',
        date: '2026-06-24'
    }
];
const MOCK_ACHIEVEMENTS = [
    {
        id: 'first-win',
        name: 'First Blood',
        description: 'Complete your first quiz session.',
        icon: '🎯',
        isUnlocked: true,
        unlockedAt: '2026-06-01',
        rarity: 'Common'
    },
    {
        id: 'streak-5',
        name: 'On Fire',
        description: 'Achieve a 5x answer streak.',
        icon: '🔥',
        isUnlocked: true,
        unlockedAt: '2026-06-05',
        rarity: 'Common'
    },
    {
        id: 'perfect-score',
        name: 'Flawless Victory',
        description: 'Score 100% accuracy in any quiz.',
        icon: '💎',
        isUnlocked: false,
        rarity: 'Legendary'
    },
    {
        id: 'all-games',
        name: 'Omniplayer',
        description: 'Play a quiz for all 5 games.',
        icon: '🌟',
        isUnlocked: true,
        unlockedAt: '2026-06-10',
        rarity: 'Rare'
    },
    {
        id: 'streak-20',
        name: 'Unstoppable',
        description: 'Achieve a 20x answer streak.',
        icon: '⚡',
        isUnlocked: false,
        rarity: 'Epic'
    },
    {
        id: 'daily-7',
        name: 'Weekly Warrior',
        description: 'Complete the Daily Challenge 7 days in a row.',
        icon: '📅',
        isUnlocked: false,
        rarity: 'Rare'
    },
    {
        id: 'high-score',
        name: 'Top Scorer',
        description: 'Reach 10,000 points in a single session.',
        icon: '🏆',
        isUnlocked: false,
        rarity: 'Epic'
    },
    {
        id: 'endless-50',
        name: 'Endless Runner',
        description: 'Answer 50 questions in Endless Mode.',
        icon: '♾️',
        isUnlocked: false,
        rarity: 'Legendary'
    }
];
const MOCK_USER_PROFILE = {
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
        {
            gameId: 'valorant',
            gamesPlayed: 20,
            highScore: 6500,
            accuracy: 82
        },
        {
            gameId: 'pokemon',
            gamesPlayed: 12,
            highScore: 4800,
            accuracy: 78
        },
        {
            gameId: 'league-of-legends',
            gamesPlayed: 8,
            highScore: 3900,
            accuracy: 75
        },
        {
            gameId: 'mobile-legends',
            gamesPlayed: 5,
            highScore: 2800,
            accuracy: 71
        },
        {
            gameId: 'tekken',
            gamesPlayed: 2,
            highScore: 1800,
            accuracy: 65
        }
    ]
};
}),
"[project]/src/components/GameCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
// Game icons as SVG or emoji representations
const GAME_ICONS = {
    valorant: '🎯',
    'mobile-legends': '⚔️',
    pokemon: '⚡',
    'league-of-legends': '🏆',
    tekken: '👊'
};
const GAME_GRADIENTS = {
    valorant: 'from-red-900/40 to-background',
    'mobile-legends': 'from-cyan-900/40 to-background',
    pokemon: 'from-yellow-900/40 to-background',
    'league-of-legends': 'from-purple-900/40 to-background',
    tekken: 'from-orange-900/40 to-background'
};
function GameCard({ game, onClick, selected, showStats, highScore }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 w-full aspect-video flex flex-col items-start justify-end p-4 text-left ${selected ? 'border-primary bg-surface-container shadow-[0_0_25px_rgba(210,187,255,0.3)]' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:scale-[1.02]'}`,
        style: selected ? {
            boxShadow: `0 0 30px -5px ${game.accentColor}40`
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 bg-gradient-to-b ${GAME_GRADIENTS[game.id]} z-0`
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 z-0 select-none",
                children: GAME_ICONS[game.id]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary text-lg",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "check_circle"
                }, void 0, false, {
                    fileName: "[project]/src/components/GameCard.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "font-heading font-bold text-white uppercase tracking-widest block text-sm mb-0.5",
                        children: game.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-label-sm font-body text-on-surface-variant/80",
                        children: game.genre
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    showStats && highScore !== undefined && highScore > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-tertiary text-xs",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "emoji_events"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCard.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-tertiary",
                                children: highScore.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCard.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCard.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/LandingPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameCard.tsx [ssr] (ecmascript)");
'use client';
;
;
;
function LandingPage({ onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "flex flex-col items-center justify-center text-center py-16 md:py-28 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-primary/20 text-primary text-label-sm font-mono tracking-widest uppercase mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            "Live · Season 4"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-[72px] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-container mb-6 leading-tight uppercase",
                        children: "GameGuess Arena"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-lg font-body text-on-surface-variant max-w-2xl mb-8",
                        children: "Can you recognize the voice, character, or map? Test your gaming knowledge across VALORANT, Pokémon, LoL, MLBB, and Tekken."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest transition-all duration-300 hover:-skew-x-3 hover:scale-105",
                        style: {
                            boxShadow: '0 0 25px rgba(210,187,255,0.4), inset 0 0 10px rgba(210,187,255,0.1)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "play_arrow"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            "Play Now"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LandingPage.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-12 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "md:col-span-8 glass-panel rounded-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-headline-lg font-heading text-primary",
                                        children: "Choose Your Game"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onNavigate('games'),
                                        className: "text-label-sm font-mono text-secondary hover:underline uppercase",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        game: game,
                                        onClick: ()=>onNavigate('games')
                                    }, game.id, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "md:col-span-4 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-headline-md font-heading text-on-surface mb-4",
                                        children: "Quick Play"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].slice(0, 4).map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNavigate('games'),
                                                className: "flex items-center gap-3 px-3 py-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container hover:border-primary/30 transition-all group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded bg-surface-container-high border border-outline-variant/30 flex items-center justify-center group-hover:border-primary/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-colors",
                                                            children: mode.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/LandingPage.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-left flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-heading font-semibold text-on-surface group-hover:text-primary transition-colors",
                                                                children: mode.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-label-sm font-mono text-outline",
                                                                children: [
                                                                    mode.timeLimit,
                                                                    "s/Q"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors",
                                                        children: "chevron_right"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, mode.id, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5 border border-tertiary/20 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-tertiary/5 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-tertiary text-lg",
                                                        style: {
                                                            fontVariationSettings: "'FILL' 1"
                                                        },
                                                        children: "today"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-label-sm font-mono text-tertiary uppercase tracking-widest",
                                                        children: "Daily Challenge"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "text-headline-md font-heading text-on-surface mb-1",
                                                children: "Fresh questions every 24h"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-label-sm font-body text-on-surface-variant mb-4",
                                                children: "Compete with players worldwide for the top spot."
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNavigate('games'),
                                                className: "w-full flex items-center justify-center gap-2 border border-tertiary/50 text-tertiary hover:bg-tertiary/10 font-mono text-label-lg py-2.5 rounded-lg uppercase tracking-widest transition-all text-sm",
                                                children: [
                                                    "Accept Challenge",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "arrow_forward"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-4",
                                        children: "Global Stats"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            {
                                                label: 'Players',
                                                value: '142K',
                                                icon: 'groups'
                                            },
                                            {
                                                label: 'Questions',
                                                value: '645',
                                                icon: 'quiz'
                                            },
                                            {
                                                label: 'Games',
                                                value: '5',
                                                icon: 'sports_esports'
                                            },
                                            {
                                                label: 'Avg Score',
                                                value: '3,280',
                                                icon: 'trending_up'
                                            }
                                        ].map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "bg-surface-container-high rounded-lg p-3 border border-outline-variant/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-sm text-outline",
                                                                children: stat.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-label-sm font-mono text-outline uppercase text-xs",
                                                                children: stat.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-headline-md font-heading text-on-surface font-bold",
                                                        children: stat.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, stat.label, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LandingPage.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/LandingPage.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/utils/index.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRank",
    ()=>calculateRank,
    "calculateStreakBonus",
    ()=>calculateStreakBonus,
    "calculateTimeBonus",
    ()=>calculateTimeBonus,
    "formatDate",
    ()=>formatDate,
    "formatScore",
    ()=>formatScore,
    "getAccuracyColor",
    ()=>getAccuracyColor,
    "getGameById",
    ()=>getGameById,
    "getHighScores",
    ()=>getHighScores,
    "getModeById",
    ()=>getModeById,
    "getPersonalBest",
    ()=>getPersonalBest,
    "getResults",
    ()=>getResults,
    "getUsername",
    ()=>getUsername,
    "saveHighScore",
    ()=>saveHighScore,
    "saveResult",
    ()=>saveResult,
    "saveUsername",
    ()=>saveUsername,
    "shuffleArray",
    ()=>shuffleArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
;
// LocalStorage keys
const HS_KEY = 'gameguess_high_scores';
const RESULTS_KEY = 'gameguess_results';
const PROFILE_KEY = 'gameguess_profile';
// Safe localStorage access
const isClient = ("TURBOPACK compile-time value", "undefined") !== 'undefined';
function getHighScores() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveHighScore(score) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getPersonalBest(gameId, modeId) {
    const scores = getHighScores();
    return scores.find((s)=>s.gameId === gameId && s.modeId === modeId) || null;
}
function saveResult(result) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getResults() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveUsername(username) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getUsername() {
    if ("TURBOPACK compile-time truthy", 1) return 'GuestPlayer';
    //TURBOPACK unreachable
    ;
}
function calculateTimeBonus(timeLeft, totalTime) {
    const ratio = timeLeft / totalTime;
    if (ratio > 0.8) return 100;
    if (ratio > 0.6) return 75;
    if (ratio > 0.4) return 50;
    if (ratio > 0.2) return 25;
    return 10;
}
function calculateStreakBonus(streak) {
    if (streak >= 10) return 300;
    if (streak >= 7) return 200;
    if (streak >= 5) return 150;
    if (streak >= 3) return 100;
    if (streak >= 2) return 50;
    return 0;
}
function calculateRank(score, totalPossible) {
    const ratio = score / totalPossible;
    if (ratio >= 0.95) return {
        rank: 'S+',
        percentile: 99
    };
    if (ratio >= 0.90) return {
        rank: 'S',
        percentile: 95
    };
    if (ratio >= 0.80) return {
        rank: 'A',
        percentile: 85
    };
    if (ratio >= 0.70) return {
        rank: 'B',
        percentile: 70
    };
    if (ratio >= 0.55) return {
        rank: 'C',
        percentile: 50
    };
    if (ratio >= 0.40) return {
        rank: 'D',
        percentile: 30
    };
    return {
        rank: 'F',
        percentile: 10
    };
}
function getGameById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === id);
}
function getModeById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === id);
}
function formatScore(score) {
    return score.toLocaleString();
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function getAccuracyColor(accuracy) {
    if (accuracy >= 90) return 'text-secondary-fixed';
    if (accuracy >= 75) return 'text-primary';
    if (accuracy >= 60) return 'text-tertiary';
    return 'text-error';
}
function shuffleArray(array) {
    const shuffled = [
        ...array
    ];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }
    return shuffled;
}
}),
"[project]/src/pages/GameSelectionPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameSelectionPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
function GameSelectionPage({ onNavigate, onSelectGame }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const highScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getHighScores"])();
    const handleSelect = (gameId)=>{
        setSelected(gameId);
    };
    const handleContinue = ()=>{
        if (!selected) return;
        onSelectGame(selected);
        onNavigate('quiz-mode');
    };
    const selectedGame = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-10 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('home'),
                        className: "flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "arrow_back"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            "Back to Home"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3",
                        children: "Step 1 of 2"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-display-sm font-display font-black text-on-surface mb-2",
                        children: "Select Your Game"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Choose the game universe you want to be tested on."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>{
                    const hs = highScores.find((h)=>h.gameId === game.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        game: game,
                        onClick: ()=>handleSelect(game.id),
                        selected: selected === game.id,
                        showStats: true,
                        highScore: hs?.score
                    }, game.id, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            selectedGame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-6 mb-8 border border-primary/20 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-start md:items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-4xl select-none",
                                            children: selectedGame.emoji
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                    className: "text-headline-lg font-heading text-on-surface",
                                                    children: selectedGame.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-label-sm font-mono text-on-surface-variant",
                                                    children: selectedGame.genre
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-body-md font-body text-on-surface-variant",
                                    children: selectedGame.description
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "quiz"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 19
                                                }, this),
                                                selectedGame.questionCount,
                                                " questions"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "leaderboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this),
                                                "Active leaderboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleContinue,
                            className: "flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-8 py-3 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: [
                                "Continue",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    children: "arrow_forward"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-8 mb-8 text-center border border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-4xl text-outline mb-3 block",
                        children: "touch_app"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Select a game above to continue"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                children: [
                    {
                        icon: '🎯',
                        label: 'Voice Lines',
                        desc: 'Identify characters by quotes'
                    },
                    {
                        icon: '👤',
                        label: 'Characters',
                        desc: 'Guess from descriptions'
                    },
                    {
                        icon: '🗺️',
                        label: 'Maps & Stages',
                        desc: 'Locate iconic locations'
                    },
                    {
                        icon: '🎲',
                        label: 'Mixed Mode',
                        desc: 'All types combined'
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-2xl select-none",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-heading font-semibold text-on-surface",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-body text-on-surface-variant",
                                        children: item.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.label, true, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/GameSelectionPage.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ModeCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModeCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
const DIFFICULTY_COLORS = {
    Easy: 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10',
    Medium: 'text-tertiary border-tertiary/40 bg-tertiary/10',
    Hard: 'text-valo-red border-valo-red/40 bg-valo-red/10',
    Variable: 'text-primary border-primary/40 bg-primary/10'
};
function ModeCard({ mode, onClick, selected }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `group relative border rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 text-left w-full ${selected ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.3)]' : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/50 hover:bg-surface-container hover:-translate-y-0.5'}`,
        children: [
            mode.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "text-label-sm font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full",
                    children: mode.badge
                }, void 0, false, {
                    fileName: "[project]/src/components/ModeCard.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `w-10 h-10 rounded-lg flex items-center justify-center border ${selected ? 'bg-primary/20 border-primary/30' : 'bg-surface-container-high border-outline-variant/30 group-hover:bg-primary/10 group-hover:border-primary/20'} transition-all`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: `material-symbols-outlined text-xl ${selected ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors`,
                    style: {
                        fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0"
                    },
                    children: mode.icon
                }, void 0, false, {
                    fileName: "[project]/src/components/ModeCard.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: `font-heading font-semibold text-base mb-1 ${selected ? 'text-primary' : 'text-on-surface group-hover:text-primary'} transition-colors`,
                        children: mode.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-body text-on-surface-variant leading-relaxed",
                        children: mode.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: `text-label-sm font-mono border rounded-full px-2 py-0.5 ${DIFFICULTY_COLORS[mode.difficulty]}`,
                        children: mode.difficulty
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 text-outline text-label-sm font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-xs",
                                children: "timer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ModeCard.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            mode.questionCount === 999 ? '∞' : mode.questionCount,
                            "Q · ",
                            mode.timeLimit,
                            "s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ModeCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/QuizModeSelectionPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizModeSelectionPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ModeCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ModeCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
function QuizModeSelectionPage({ selectedGameId, onNavigate, onSelectMode }) {
    const [selectedMode, setSelectedMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === selectedGameId);
    const handleContinue = ()=>{
        if (!selectedMode) return;
        onSelectMode(selectedMode);
        onNavigate('quiz');
    };
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === selectedMode);
    const pb = selectedGameId && selectedMode ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getPersonalBest"])(selectedGameId, selectedMode) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-10 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "arrow_back"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            "Back to Game Selection"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3",
                        children: "Step 2 of 2"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-3",
                        children: [
                            game && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-4xl select-none",
                                children: game.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 47,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "text-display-sm font-display font-black text-on-surface",
                                        children: "Select Quiz Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    game && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-body-md font-body text-on-surface-variant",
                                        children: [
                                            "Playing: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-primary font-semibold",
                                                children: game.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                lineNumber: 54,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ModeCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        mode: m,
                        onClick: ()=>setSelectedMode(m.id),
                        selected: selectedMode === m.id
                    }, m.id, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            mode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-6 border border-primary/20 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-start md:items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-primary",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: mode.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "text-headline-md font-heading text-on-surface",
                                            children: mode.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-body-md font-body text-on-surface-variant mb-3",
                                    children: mode.description
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "timer"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 19
                                                }, this),
                                                mode.timeLimit,
                                                "s per question"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "quiz"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                mode.questionCount === 999 ? 'Unlimited' : `${mode.questionCount} questions`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this),
                                        pb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-tertiary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "emoji_events"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 21
                                                }, this),
                                                "PB: ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatScore"])(pb.score)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleContinue,
                            className: "flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    style: {
                                        fontVariationSettings: "'FILL' 1"
                                    },
                                    children: "play_arrow"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                "Start Quiz"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-8 text-center border border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-4xl text-outline mb-3 block",
                        children: "touch_app"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Select a mode above to begin"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ScoreDisplay.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScoreDisplay",
    ()=>ScoreDisplay,
    "StreakDisplay",
    ()=>StreakDisplay
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
function ScoreDisplay({ score, label = 'Score', size = 'md', showGlow }) {
    const sizeClasses = {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-3'
    };
    const scoreSizes = {
        sm: 'text-lg',
        md: 'text-headline-md',
        lg: 'text-headline-lg'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`,
        style: showGlow ? {
            boxShadow: '0 0 15px rgba(210,187,255,0.2)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-label-sm font-body text-outline uppercase tracking-widest",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: `${scoreSizes[size]} font-heading font-bold text-on-surface`,
                children: score.toLocaleString()
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ScoreDisplay.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function StreakDisplay({ streak, size = 'md' }) {
    const sizeClasses = {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2'
    };
    const isHot = streak >= 3;
    const isOnFire = streak >= 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-label-sm font-body text-outline uppercase tracking-widest",
                children: "Streak"
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: `text-headline-md font-heading font-bold flex items-center gap-1 ${isOnFire ? 'text-valo-red' : isHot ? 'text-tertiary' : 'text-on-surface'}`,
                children: [
                    streak,
                    "x",
                    ' ',
                    isHot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-[20px]",
                        style: {
                            fontVariationSettings: "'FILL' 1"
                        },
                        children: "local_fire_department"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScoreDisplay.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ScoreDisplay.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/TimerBar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TimerBar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
'use client';
;
;
function TimerBar({ timeLimit, onTimeUp, isActive, onTick }) {
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(timeLimit);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setTimeLeft(timeLimit);
    }, [
        timeLimit
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!isActive) return;
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }
        const interval = setInterval(()=>{
            setTimeLeft((prev)=>{
                const next = prev - 1;
                if (onTick) onTick(next);
                return next;
            });
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        isActive,
        timeLeft,
        onTimeUp,
        onTick
    ]);
    const pct = timeLeft / timeLimit * 100;
    const isWarning = timeLeft <= 5;
    const isLow = timeLeft <= 10;
    const barColor = isWarning ? 'bg-valo-red' : isLow ? 'bg-tertiary' : 'bg-secondary-container';
    const timerBg = isWarning ? 'border-valo-red animate-pulse-red' : isLow ? 'border-tertiary' : 'border-secondary-container';
    const timerTextColor = isWarning ? 'text-valo-red' : isLow ? 'text-tertiary' : 'text-on-surface';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-4 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-1 h-2 bg-surface-variant rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `h-full ${barColor} rounded-full transition-all duration-1000`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/TimerBar.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TimerBar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `w-14 h-14 rounded-full flex items-center justify-center border-2 ${timerBg} bg-surface-container-high flex-shrink-0`,
                style: {
                    boxShadow: isWarning ? '0 0 10px rgba(255,70,85,0.5)' : undefined
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: `font-heading font-bold text-lg ${timerTextColor}`,
                    children: timeLeft
                }, void 0, false, {
                    fileName: "[project]/src/components/TimerBar.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TimerBar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TimerBar.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/AnswerButton.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnswerButton
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
function AnswerButton({ label, text, onClick, state = 'default', disabled }) {
    const stateClasses = {
        default: 'border-surface-variant bg-surface-container-high hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(210,187,255,0.3)]',
        selected: 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.4)]',
        correct: 'border-secondary-fixed bg-secondary-fixed/20 shadow-[0_0_30px_rgba(116,245,255,0.5)]',
        incorrect: 'border-valo-red bg-valo-red/20 shadow-[0_0_30px_rgba(255,70,85,0.5)]',
        revealed: 'border-secondary-fixed/50 bg-secondary-fixed/10'
    };
    const textColors = {
        default: 'text-white group-hover:text-primary',
        selected: 'text-primary',
        correct: 'text-secondary-fixed',
        incorrect: 'text-valo-red',
        revealed: 'text-secondary-fixed/80'
    };
    const labelColors = {
        default: 'text-outline',
        selected: 'text-primary/70',
        correct: 'text-secondary-fixed/70',
        incorrect: 'text-valo-red/70',
        revealed: 'text-secondary-fixed/50'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `group relative border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 w-full text-left ${stateClasses[state]} ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'} ${!disabled && state === 'default' ? 'hover:-skew-x-1' : ''}`,
        style: {
            minHeight: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `absolute top-2 left-3 text-label-sm font-mono ${labelColors[state]} font-bold`,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            state === 'correct' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-secondary-fixed text-sm",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "check_circle"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnswerButton.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            state === 'incorrect' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-valo-red text-sm",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "cancel"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnswerButton.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: `text-headline-md font-heading font-bold ${textColors[state]} transition-colors text-center`,
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnswerButton.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/AudioPlayer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AudioPlayer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
'use client';
;
;
function AudioPlayer({ isVoiceLine = true, label }) {
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [hasPlayed, setHasPlayed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handlePlay = ()=>{
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
        setHasPlayed(true);
        // Simulate playback duration
        setTimeout(()=>setIsPlaying(false), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full rounded-lg border border-surface-variant bg-surface-container-highest relative overflow-hidden flex flex-col items-center justify-center gap-4 p-6",
        style: {
            minHeight: '160px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-1 h-12 opacity-30 select-none pointer-events-none",
                children: Array.from({
                    length: 24
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `w-1.5 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-surface-variant'} transition-colors`,
                        style: {
                            height: `${20 + Math.sin(i / 24 * Math.PI * 4) * 18 + Math.random() * 10}px`,
                            animationDelay: `${i * 50}ms`
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/AudioPlayer.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: handlePlay,
                className: `relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border ${isPlaying ? 'bg-primary/30 border-primary shadow-[0_0_25px_rgba(210,187,255,0.5)] scale-110' : 'bg-primary/20 border-primary/60 hover:bg-primary/30 hover:scale-110 shadow-[0_0_15px_rgba(210,187,255,0.2)]'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary text-3xl",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: isPlaying ? 'pause' : 'play_arrow'
                }, void 0, false, {
                    fileName: "[project]/src/components/AudioPlayer.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-label-sm font-mono text-on-surface-variant text-center",
                children: [
                    !hasPlayed && (isVoiceLine ? 'Play voice line to identify the character' : label || 'Click to play audio'),
                    hasPlayed && isPlaying && '🔊 Playing...',
                    hasPlayed && !isPlaying && '✓ Audio played — make your guess below'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "absolute bottom-2 right-2 text-label-sm font-mono text-outline/50 text-xs",
                children: "[placeholder audio]"
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AudioPlayer.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/QuizGameplayPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizGameplayPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScoreDisplay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TimerBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TimerBar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnswerButton$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnswerButton.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function QuizGameplayPage({ gameId, modeId, onNavigate, onQuizComplete }) {
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === gameId);
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === modeId);
    // Build question set
    const [questions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>{
        if (!gameId) return [];
        const pool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["ALL_QUESTIONS"][gameId] || [];
        const shuffled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["shuffleArray"])(pool);
        const count = mode?.questionCount === 999 ? 999 : mode?.questionCount || 10;
        return shuffled.slice(0, Math.min(count, shuffled.length));
    });
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [streak, setStreak] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [maxStreak, setMaxStreak] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [correctCount, setCorrectCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [totalTimeBonus, setTotalTimeBonus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(mode?.timeLimit || 20);
    const [timerActive, setTimerActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [answerStates, setAnswerStates] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [selectedAnswerId, setSelectedAnswerId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isAnswered, setIsAnswered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showHint, setShowHint] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [hintUsed, setHintUsed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [endlessLives, setEndlessLives] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(3);
    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPct = totalQuestions > 0 ? currentIndex / totalQuestions * 100 : 0;
    const isEndless = modeId === 'endless';
    const finishQuiz = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const totalPossible = questions.reduce((acc, q)=>acc + q.points + 200, 0); // approx
        const accuracy = totalQuestions > 0 ? Math.round(correctCount / totalQuestions * 100) : 0;
        const { rank, percentile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["calculateRank"])(score, totalPossible || 3000);
        const result = {
            gameId: gameId,
            modeId: modeId,
            score,
            totalQuestions,
            correctAnswers: correctCount,
            maxStreak,
            accuracy,
            timeBonus: totalTimeBonus,
            rank,
            percentile,
            date: new Date().toISOString(),
            duration: 0
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["saveHighScore"])({
            gameId: gameId,
            modeId: modeId,
            score,
            accuracy,
            date: new Date().toISOString()
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["saveResult"])(result);
        onQuizComplete(result);
        onNavigate('results');
    }, [
        correctCount,
        gameId,
        maxStreak,
        modeId,
        onNavigate,
        onQuizComplete,
        questions,
        score,
        totalQuestions,
        totalTimeBonus
    ]);
    const handleAnswer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((answer)=>{
        if (isAnswered || !currentQuestion) return;
        setTimerActive(false);
        setIsAnswered(true);
        setSelectedAnswerId(answer.id);
        const newStates = {};
        currentQuestion.answers.forEach((a)=>{
            if (a.id === answer.id) {
                newStates[a.id] = a.isCorrect ? 'correct' : 'incorrect';
            } else if (a.isCorrect) {
                newStates[a.id] = 'revealed';
            } else {
                newStates[a.id] = 'default';
            }
        });
        setAnswerStates(newStates);
        if (answer.isCorrect) {
            const bonus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["calculateTimeBonus"])(timeLeft, mode?.timeLimit || 20);
            const streakBonus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["calculateStreakBonus"])(streak + 1);
            const earned = currentQuestion.points + bonus + streakBonus - (hintUsed ? 50 : 0);
            setScore((prev)=>prev + Math.max(0, earned));
            setTotalTimeBonus((prev)=>prev + bonus);
            setStreak((prev)=>{
                const newStreak = prev + 1;
                setMaxStreak((m)=>Math.max(m, newStreak));
                return newStreak;
            });
            setCorrectCount((prev)=>prev + 1);
        } else {
            setStreak(0);
            if (isEndless) {
                setEndlessLives((prev)=>{
                    const next = prev - 1;
                    if (next <= 0) {
                        setTimeout(finishQuiz, 1200);
                    }
                    return next;
                });
            }
        }
    }, [
        isAnswered,
        currentQuestion,
        timeLeft,
        mode,
        streak,
        hintUsed,
        isEndless,
        finishQuiz
    ]);
    const handleTimeUp = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        if (isAnswered) return;
        setTimerActive(false);
        setIsAnswered(true);
        // Reveal correct answer
        const newStates = {};
        currentQuestion?.answers.forEach((a)=>{
            newStates[a.id] = a.isCorrect ? 'revealed' : 'default';
        });
        setAnswerStates(newStates);
        setStreak(0);
        if (isEndless) {
            setEndlessLives((prev)=>{
                const next = prev - 1;
                if (next <= 0) {
                    setTimeout(finishQuiz, 1200);
                }
                return next;
            });
        }
    }, [
        currentQuestion,
        isAnswered,
        isEndless,
        finishQuiz
    ]);
    const handleNext = ()=>{
        if (currentIndex + 1 >= questions.length && !isEndless) {
            finishQuiz();
            return;
        }
        setCurrentIndex((prev)=>prev + 1);
        setIsAnswered(false);
        setAnswerStates({});
        setSelectedAnswerId(null);
        setShowHint(false);
        setHintUsed(false);
        setTimeLeft(mode?.timeLimit || 20);
        setTimerActive(true);
    };
    if (!currentQuestion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center text-on-surface-variant",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-headline-md font-heading mb-4",
                        children: "No questions available."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "text-primary hover:underline font-mono",
                        children: "Go back"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this);
    }
    const accentColor = game?.accentColor || '#d2bbff';
    const isVoiceLine = currentQuestion.type === 'voice-line';
    const LABELS = [
        'A',
        'B',
        'C',
        'D'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col relative overflow-x-hidden",
        style: {
            backgroundColor: '#0b1326'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-0 pointer-events-none opacity-15",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        background: `radial-gradient(ellipse at top, ${accentColor}20, transparent 60%)`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "relative z-10 px-4 md:px-12 pt-24 pb-4 flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-label-sm font-mono text-outline",
                                children: [
                                    currentIndex + 1,
                                    "/",
                                    isEndless ? '∞' : totalQuestions
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TimerBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    timeLimit: mode?.timeLimit || 20,
                                    onTimeUp: handleTimeUp,
                                    isActive: timerActive,
                                    onTick: setTimeLeft
                                }, currentIndex, false, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ScoreDisplay"], {
                                score: score,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["StreakDisplay"], {
                                streak: streak,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1 hidden md:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-full h-1 bg-surface-variant rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-primary rounded-full transition-all duration-500",
                                        style: {
                                            width: `${progressPct}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-sm select-none",
                                        children: game?.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-label-sm font-mono text-on-surface-variant hidden sm:block",
                                        children: game?.shortName
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            isEndless && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    ...Array(3)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: `material-symbols-outlined text-sm ${i < endlessLives ? 'text-valo-red' : 'text-surface-variant'}`,
                                        style: {
                                            fontVariationSettings: "'FILL' 1"
                                        },
                                        children: "favorite"
                                    }, i, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-12 py-4 flex flex-col lg:flex-row gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2 flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-5 border border-surface-variant bg-surface-container relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: `text-label-sm font-mono border rounded-full px-2 py-0.5 ${currentQuestion.difficulty === 'Hard' ? 'text-valo-red border-valo-red/40 bg-valo-red/10' : currentQuestion.difficulty === 'Medium' ? 'text-tertiary border-tertiary/40 bg-tertiary/10' : 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'}`,
                                                children: currentQuestion.difficulty
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 rounded-full px-2 py-0.5",
                                                children: game?.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-primary ml-auto",
                                                children: [
                                                    "+",
                                                    currentQuestion.points,
                                                    "pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-headline-md font-heading text-white font-bold mb-3 leading-snug",
                                        children: currentQuestion.prompt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    currentQuestion.subPrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-body-md font-body text-on-surface-variant mb-4",
                                        children: currentQuestion.subPrompt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this),
                                    isVoiceLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        isVoiceLine: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 289,
                                        columnNumber: 29
                                    }, this),
                                    showHint && currentQuestion.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mt-3 p-3 rounded-lg bg-tertiary/10 border border-tertiary/30 animate-fade-in",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-label-sm font-mono text-tertiary flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-sm",
                                                    children: "lightbulb"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this),
                                                currentQuestion.hint
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    currentQuestion.hint && !isAnswered && !hintUsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowHint(true);
                                            setHintUsed(true);
                                        },
                                        className: "flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-label-sm font-mono",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "lightbulb"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            "Use Hint (-50 pts)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    hintUsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-label-sm font-mono text-outline flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "lightbulb"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            "Hint used"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (window.confirm('Surrender this quiz?')) finishQuiz();
                                        },
                                        className: "flex items-center gap-1.5 text-outline hover:text-valo-red transition-colors text-label-sm font-mono ml-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "exit_to_app"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 323,
                                                columnNumber: 15
                                            }, this),
                                            "Surrender"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 319,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2 flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: currentQuestion.answers.map((answer, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnswerButton$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        label: LABELS[idx],
                                        text: answer.text,
                                        onClick: ()=>handleAnswer(answer),
                                        state: answerStates[answer.id] || 'default',
                                        disabled: isAnswered
                                    }, answer.id, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            isAnswered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                className: "mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-[1.01] transition-all animate-fade-in",
                                style: {
                                    boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                                },
                                children: currentIndex + 1 >= totalQuestions && !isEndless ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "emoji_events"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, this),
                                        "View Results"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        "Next Question",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined",
                                            children: "arrow_forward"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            isAnswered && selectedAnswerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `text-center text-label-sm font-mono animate-fade-in ${currentQuestion.answers.find((a)=>a.id === selectedAnswerId)?.isCorrect ? 'text-secondary-fixed' : 'text-valo-red'}`,
                                children: currentQuestion.answers.find((a)=>a.id === selectedAnswerId)?.isCorrect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "flex items-center justify-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-sm",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "check_circle"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 374,
                                            columnNumber: 19
                                        }, this),
                                        "Correct! +",
                                        currentQuestion.points + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["calculateTimeBonus"])(timeLeft, mode?.timeLimit || 20) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["calculateStreakBonus"])(streak) - (hintUsed ? 50 : 0),
                                        " pts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "flex items-center justify-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-sm",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 379,
                                            columnNumber: 19
                                        }, this),
                                        "Incorrect — correct answer highlighted above"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 378,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ResultSummary.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultSummary
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
function ResultSummary({ result, onPlayAgain, onViewLeaderboard, onHome }) {
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === result.gameId);
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === result.modeId);
    const isPerfect = result.accuracy === 100;
    const isGreat = result.accuracy >= 80;
    const rankColors = {
        'S+': 'text-tertiary',
        S: 'text-tertiary',
        A: 'text-secondary-fixed',
        B: 'text-primary',
        C: 'text-on-surface',
        D: 'text-outline',
        F: 'text-valo-red'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center gap-6 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono tracking-widest uppercase",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                children: "military_tech"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            "Match Concluded"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-display-lg font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary uppercase italic leading-tight",
                        children: isPerfect ? 'Perfect!' : isGreat ? 'Victory' : result.accuracy >= 60 ? 'Complete' : 'Try Again'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: [
                            game?.name,
                            " · ",
                            mode?.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-12 gap-4 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "md:col-span-6 glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-3",
                                children: "Final Score"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-[72px] font-display font-black text-primary leading-none drop-shadow-[0_0_10px_rgba(210,187,255,0.3)]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatScore"])(result.score)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            result.timeBonus > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-label-sm font-mono text-secondary-fixed flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-xs",
                                        children: "bolt"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    "+",
                                    result.timeBonus,
                                    " time bonus"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex items-center gap-2 text-label-sm font-mono text-on-surface-variant",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-xs text-secondary-container",
                                        children: "trending_up"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    "Top ",
                                    100 - result.percentile,
                                    "% Global · Rank",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: `font-bold text-base ${rankColors[result.rank] || 'text-primary'}`,
                                        children: result.rank
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "md:col-span-6 grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Accuracy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-secondary-container text-base",
                                                children: "my_location"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.accuracy,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "bg-secondary-container h-full rounded-full transition-all",
                                            style: {
                                                width: `${result.accuracy}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultSummary.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Max Streak"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 82,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-valo-red text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "local_fire_department"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.maxStreak,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-valo-red text-body-md font-body ml-1",
                                                children: "x"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Correct"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-secondary-fixed text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "check_circle"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.correctAnswers,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-on-surface-variant text-body-md font-body",
                                                children: [
                                                    "/",
                                                    result.totalQuestions
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Time Bonus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-tertiary text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "bolt"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            "+",
                                            result.timeBonus
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-center gap-3 w-full max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onPlayAgain,
                        className: "flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:opacity-90 hover:-skew-x-1 transition-all",
                        style: {
                            boxShadow: '0 0 15px rgba(210,187,255,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "replay"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            "Play Again"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onViewLeaderboard,
                        className: "flex-1 flex items-center justify-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                children: "leaderboard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            "Leaderboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onHome,
                        className: "flex items-center justify-center gap-1 border border-outline/30 text-on-surface-variant hover:text-on-surface hover:border-outline font-mono text-label-sm px-4 py-3 rounded-lg uppercase tracking-widest transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-sm",
                            children: "home"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultSummary.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ResultSummary.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/ResultsPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultSummary$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultSummary.tsx [ssr] (ecmascript)");
'use client';
;
;
function ResultsPage({ result, onNavigate }) {
    if (!result) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-on-surface-variant font-body text-body-md mb-4",
                        children: "No results to show."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('home'),
                        className: "text-primary font-mono hover:underline",
                        children: "Go Home"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/ResultsPage.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen relative overflow-hidden flex items-center justify-center px-4 md:px-12 py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
                children: Array.from({
                    length: 12
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute rounded-full bg-tertiary animate-float opacity-0",
                        style: {
                            width: `${4 + i % 3 * 3}px`,
                            height: `${4 + i % 3 * 3}px`,
                            left: `${i * 8.3 % 100}%`,
                            top: `${50 + i % 5 * 10}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${3 + i % 3}s`
                        }
                    }, i, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-5xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultSummary$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    result: result,
                    onPlayAgain: ()=>onNavigate('quiz-mode'),
                    onViewLeaderboard: ()=>onNavigate('leaderboard'),
                    onHome: ()=>onNavigate('home')
                }, void 0, false, {
                    fileName: "[project]/src/pages/ResultsPage.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/ResultsPage.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/LeaderboardTable.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardTable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
'use client';
;
;
const RANK_ICONS = {
    1: '👑',
    2: '🥈',
    3: '🥉'
};
function LeaderboardTable({ entries }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full rounded-xl overflow-hidden border border-surface-variant",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-2 px-4 py-3 bg-surface-container-high border-b border-surface-variant",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-1 text-label-sm font-mono text-outline uppercase",
                        children: "#"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-4 text-label-sm font-mono text-outline uppercase",
                        children: "Player"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Score"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Acc."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-1 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Stk."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right hidden md:block",
                        children: "Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeaderboardTable.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            entries.map((entry)=>{
                const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === entry.gameId);
                const isTop3 = entry.rank <= 3;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: `grid grid-cols-12 gap-2 px-4 py-3 border-b border-surface-variant/50 transition-colors ${entry.isCurrentUser ? 'bg-primary/10 border-l-2 border-l-primary' : isTop3 ? 'bg-surface-container-high/50' : 'hover:bg-surface-container'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-1 flex items-center",
                            children: RANK_ICONS[entry.rank] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-base select-none",
                                children: RANK_ICONS[entry.rank]
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 48,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-on-surface-variant",
                                children: entry.rank
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-7 h-7 rounded-full bg-surface-variant border border-outline-variant/30 flex items-center justify-center text-xs select-none",
                                    children: entry.username[0].toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: `text-sm font-heading font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-on-surface'}`,
                                            children: [
                                                entry.username,
                                                entry.isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-label-sm font-mono text-primary/70",
                                                    children: "(you)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        entry.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: entry.badge
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                                            lineNumber: 68,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-2 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `text-sm font-mono font-bold ${isTop3 ? 'text-tertiary' : 'text-on-surface'}`,
                                children: entry.score.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-2 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `text-sm font-mono ${entry.accuracy >= 90 ? 'text-secondary-fixed' : entry.accuracy >= 75 ? 'text-primary' : 'text-on-surface-variant'}`,
                                children: [
                                    entry.accuracy,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-1 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-sm font-mono text-on-surface-variant",
                                children: entry.streak
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "col-span-2 items-center justify-end hidden md:flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 px-2 py-0.5 rounded-full",
                                children: game?.shortName || entry.gameId.slice(0, 3).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, `${entry.rank}-${entry.username}`, true, {
                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LeaderboardTable.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/LeaderboardPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderboardTable$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LeaderboardTable.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
function LeaderboardPage({ onNavigate }) {
    const [filterGame, setFilterGame] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [filterMode, setFilterMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('global');
    const localScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getHighScores"])();
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MOCK_LEADERBOARD"].filter((e)=>{
        if (filterGame !== 'all' && e.gameId !== filterGame) return false;
        if (filterMode !== 'all' && e.modeId !== filterMode) return false;
        return true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-8 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono uppercase tracking-widest mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "emoji_events"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            "Rankings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-display-sm font-display font-black text-on-surface mb-2",
                        children: "Leaderboard"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "See how you stack up against the best players globally."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mb-6 bg-surface-container-low rounded-lg p-1 w-fit",
                children: [
                    'global',
                    'personal'
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t),
                        className: `px-5 py-2 rounded-md text-label-sm font-mono uppercase tracking-wide transition-all ${tab === t ? 'bg-surface-container-high text-primary border border-outline-variant/30' : 'text-on-surface-variant hover:text-on-surface'}`,
                        children: t === 'global' ? 'Global' : 'My Scores'
                    }, t, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            tab === 'global' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-label-sm font-mono text-outline uppercase",
                                    children: "Game:"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFilterGame('all'),
                                            className: `px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${filterGame === 'all' ? 'bg-primary/20 border-primary/40 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'}`,
                                            children: "All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                            lineNumber: 66,
                                            columnNumber: 17
                                        }, this),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterGame(g.id),
                                                className: `px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${filterGame === g.id ? 'bg-primary/20 border-primary/40 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'}`,
                                                children: g.shortName
                                            }, g.id, false, {
                                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-4 mb-8 max-w-2xl",
                        children: filtered.slice(0, 3).map((entry, idx)=>{
                            const podiumOrder = [
                                1,
                                0,
                                2
                            ]; // 2nd, 1st, 3rd heights
                            const actual = [
                                filtered[1],
                                filtered[0],
                                filtered[2]
                            ][idx];
                            if (!actual) return null;
                            const heights = [
                                'h-24',
                                'h-32',
                                'h-20'
                            ];
                            const icons = [
                                '🥈',
                                '👑',
                                '🥉'
                            ];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `flex flex-col items-center gap-2 ${idx === 1 ? 'order-first md:order-none' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-2xl select-none",
                                        children: icons[idx]
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-surface-variant border-2 border-primary/40 flex items-center justify-center text-lg font-heading font-bold text-on-surface",
                                        children: actual.username[0]
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 105,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-on-surface text-center truncate max-w-full",
                                        children: actual.username
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 108,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `w-full ${heights[idx]} rounded-t-lg flex items-end justify-center pb-3 ${idx === 1 ? 'bg-primary/20 border border-primary/30' : 'bg-surface-container-high border border-outline-variant/20'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-heading font-bold ${idx === 1 ? 'text-tertiary' : 'text-on-surface'}`,
                                            children: actual.score.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                            lineNumber: 112,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 109,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, actual.rank, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 103,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderboardTable$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        entries: filtered
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /* Personal best scores */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: localScores.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "glass-panel rounded-xl p-12 text-center border border-outline-variant/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-5xl text-outline mb-4 block",
                            children: "leaderboard"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 129,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-headline-md font-heading text-on-surface-variant mb-2",
                            children: "No scores yet"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-body-md font-body text-outline mb-6",
                            children: "Complete a quiz to see your personal bests here."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 131,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate('games'),
                            className: "inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:bg-primary/30 transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    style: {
                                        fontVariationSettings: "'FILL' 1"
                                    },
                                    children: "play_arrow"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this),
                                "Play Now"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                    lineNumber: 128,
                    columnNumber: 13
                }, this) : localScores.sort((a, b)=>b.score - a.score).map((hs, idx)=>{
                    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === hs.gameId);
                    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === hs.modeId);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "glass-panel rounded-xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/20 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-xl select-none",
                                children: game?.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 148,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-heading font-semibold text-on-surface",
                                        children: game?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 152,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-on-surface-variant",
                                        children: mode?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 153,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-headline-md font-heading text-primary font-bold",
                                        children: hs.score.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 156,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-outline",
                                        children: [
                                            hs.accuracy,
                                            "% accuracy"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 157,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-label-sm font-mono text-outline text-right hidden sm:block",
                                children: new Date(hs.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 147,
                        columnNumber: 19
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/LeaderboardPage.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/AchievementBadge.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AchievementBadge
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
const RARITY_STYLES = {
    Common: 'border-outline-variant/50 bg-surface-container-low',
    Rare: 'border-primary/40 bg-primary/5',
    Epic: 'border-secondary-container/60 bg-secondary-container/10',
    Legendary: 'border-tertiary/60 bg-tertiary/10'
};
const RARITY_LABEL_COLORS = {
    Common: 'text-outline',
    Rare: 'text-primary',
    Epic: 'text-secondary-container',
    Legendary: 'text-tertiary'
};
function AchievementBadge({ achievement, size = 'md' }) {
    const isLocked = !achievement.isUnlocked;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `relative border rounded-xl flex flex-col items-center text-center gap-2 transition-all duration-200 ${size === 'sm' ? 'p-3' : 'p-4'} ${RARITY_STYLES[achievement.rarity]} ${isLocked ? 'opacity-40 grayscale' : 'hover:-translate-y-0.5'}`,
        children: [
            isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center z-10 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-outline/70 text-2xl",
                    children: "lock"
                }, void 0, false, {
                    fileName: "[project]/src/components/AchievementBadge.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: `text-label-sm font-mono text-[10px] ${RARITY_LABEL_COLORS[achievement.rarity]}`,
                    children: achievement.rarity[0]
                }, void 0, false, {
                    fileName: "[project]/src/components/AchievementBadge.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${size === 'sm' ? 'text-2xl' : 'text-4xl'} select-none`,
                children: achievement.icon
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: `font-heading font-semibold text-on-surface ${size === 'sm' ? 'text-xs' : 'text-sm'}`,
                        children: achievement.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    size === 'md' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-body text-on-surface-variant mt-0.5 leading-tight",
                        children: achievement.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    achievement.isUnlocked && achievement.unlockedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-mono text-outline text-[10px] mt-1",
                        children: new Date(achievement.unlockedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AchievementBadge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/ProfilePage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AchievementBadge$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AchievementBadge.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProfilePage({ onNavigate }) {
    const [username, setUsernameState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('GuestPlayer');
    const [editingName, setEditingName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [nameInput, setNameInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [localScores, setLocalScores] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getUsername"])();
        setUsernameState(saved);
        setNameInput(saved);
        setLocalScores((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getHighScores"])());
        setResults((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getResults"])());
    }, []);
    const profile = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"],
        username,
        totalGamesPlayed: results.length || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"].totalGamesPlayed,
        highScore: localScores.length > 0 ? Math.max(...localScores.map((s)=>s.score)) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"].highScore
    };
    const xpPct = Math.round(profile.xp / profile.xpToNextLevel * 100);
    const handleSaveName = ()=>{
        if (nameInput.trim()) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["saveUsername"])(nameInput.trim());
            setUsernameState(nameInput.trim());
        }
        setEditingName(false);
    };
    const unlockedCount = profile.achievements.filter((a)=>a.isUnlocked).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "mb-8 mt-4 grid grid-cols-1 md:grid-cols-12 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "md:col-span-4 glass-panel rounded-xl p-6 flex flex-col items-center text-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 rounded-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-4xl border-2 border-primary/40 select-none",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: "🎮"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        editingName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-2 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    value: nameInput,
                                    onChange: (e)=>setNameInput(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleSaveName(),
                                    className: "bg-surface-container-high border border-primary/40 rounded-lg px-3 py-2 text-center text-on-surface font-heading font-bold w-full outline-none focus:border-primary",
                                    maxLength: 20,
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveName,
                                            className: "text-label-sm font-mono text-secondary-fixed px-3 py-1 rounded border border-secondary-fixed/40 hover:bg-secondary-fixed/10 transition-all",
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setEditingName(false),
                                            className: "text-label-sm font-mono text-outline px-3 py-1 rounded border border-outline/30 hover:bg-surface-container transition-all",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "text-headline-md font-heading text-on-surface font-bold",
                                    children: profile.username
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingName(true),
                                    className: "text-outline hover:text-primary transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-base",
                                        children: "edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-on-surface-variant",
                                            children: [
                                                "Level ",
                                                profile.level
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-outline",
                                            children: [
                                                profile.xp,
                                                " / ",
                                                profile.xpToNextLevel,
                                                " XP"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-full h-2 bg-surface-container-high rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full transition-all",
                                        style: {
                                            width: `${xpPct}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3 w-full mt-2",
                            children: [
                                {
                                    label: 'Games Played',
                                    value: profile.totalGamesPlayed,
                                    icon: 'sports_esports'
                                },
                                {
                                    label: 'High Score',
                                    value: profile.highScore.toLocaleString(),
                                    icon: 'emoji_events'
                                },
                                {
                                    label: 'Accuracy',
                                    value: `${profile.accuracy}%`,
                                    icon: 'my_location'
                                },
                                {
                                    label: 'Max Streak',
                                    value: `${profile.maxStreak}x`,
                                    icon: 'local_fire_department'
                                }
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "bg-surface-container-high rounded-lg p-3 border border-outline-variant/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-primary text-sm block mb-1",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: s.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-headline-md font-heading text-on-surface font-bold",
                                            children: s.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-label-sm font-mono text-outline text-xs",
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full p-3 rounded-lg bg-tertiary/10 border border-tertiary/20 text-left",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-label-sm font-mono text-tertiary flex items-start gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-sm mt-0.5",
                                        children: "info"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    "Playing as guest. Scores are saved locally to this device only."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/ProfilePage.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/ProfilePage.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "md:col-span-8 flex flex-col gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-headline-md font-heading text-on-surface mb-4",
                                    children: "Game Performance"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>{
                                        const stat = profile.gamesStats.find((s)=>s.gameId === game.id);
                                        const local = localScores.find((s)=>s.gameId === game.id);
                                        const hs = local?.score || stat?.highScore || 0;
                                        const acc = local?.accuracy || stat?.accuracy || 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 p-3 rounded-lg bg-surface-container-high border border-outline-variant/20 hover:border-primary/20 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl select-none",
                                                    children: game.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-heading font-semibold text-on-surface",
                                                                    children: game.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-label-sm font-mono text-outline",
                                                                    children: [
                                                                        stat?.gamesPlayed || 0,
                                                                        " games"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-1 bg-surface-variant rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-primary rounded-full",
                                                                style: {
                                                                    width: `${acc}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                lineNumber: 147,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-heading font-bold text-primary",
                                                            children: hs > 0 ? hs.toLocaleString() : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: acc > 0 ? `${acc}%` : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, game.id, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "text-headline-md font-heading text-on-surface",
                                            children: "Achievements"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-on-surface-variant",
                                            children: [
                                                unlockedCount,
                                                "/",
                                                profile.achievements.length,
                                                " unlocked"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                                    children: profile.achievements.map((ach)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AchievementBadge$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            achievement: ach,
                                            size: "sm"
                                        }, ach.id, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-headline-md font-heading text-on-surface mb-4",
                                    children: "Recent Games"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: results.slice(0, 5).map((r, i)=>{
                                        const g = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GAMES"].find((gm)=>gm.id === r.gameId);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-xl select-none",
                                                    children: g?.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-heading text-on-surface",
                                                            children: g?.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: new Date(r.date).toLocaleDateString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-mono font-bold text-primary",
                                                            children: r.score.toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: [
                                                                r.accuracy,
                                                                "% acc · Rank ",
                                                                r.rank
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/ProfilePage.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/ProfilePage.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/ProfilePage.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NavBar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LandingPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LandingPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$GameSelectionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/GameSelectionPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizModeSelectionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/QuizModeSelectionPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizGameplayPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/QuizGameplayPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ResultsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/ResultsPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LeaderboardPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ProfilePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/ProfilePage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const Home = ()=>{
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('home');
    const [selectedGame, setSelectedGame] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedMode, setSelectedMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [quizResult, setQuizResult] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [username] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return 'GuestPlayer';
    });
    const handleNavigate = (page)=>{
        setCurrentPage(page);
        // Scroll to top on page change
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    const handleSelectGame = (gameId)=>{
        setSelectedGame(gameId);
    };
    const handleSelectMode = (modeId)=>{
        setSelectedMode(modeId);
    };
    const handleQuizComplete = (result)=>{
        setQuizResult(result);
    };
    const showNav = currentPage !== 'quiz';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "GameGuess Arena — TRIVIA-X"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Test your gaming knowledge — VALORANT, Pokémon, LoL, MLBB, and Tekken trivia."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-background bg-pattern dark",
                children: [
                    showNav && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        currentPage: currentPage,
                        onNavigate: handleNavigate,
                        username: username
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LandingPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'games' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$GameSelectionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate,
                        onSelectGame: handleSelectGame
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'quiz-mode' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizModeSelectionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        selectedGameId: selectedGame,
                        onNavigate: handleNavigate,
                        onSelectMode: handleSelectMode
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'quiz' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizGameplayPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        gameId: selectedGame,
                        modeId: selectedMode,
                        onNavigate: handleNavigate,
                        onQuizComplete: handleQuizComplete
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'results' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ResultsPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        result: quizResult,
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'leaderboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ProfilePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = Home;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0j4mdpa._.js.map