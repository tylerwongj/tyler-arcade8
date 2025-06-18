// Load brand configuration
const BRAND_CONFIG = {
    name: "Tyler Arcade",
    creator: "Tyler",
    shortName: "TA"
};

const gamesData = [
    {
        id: 1,
        title: "Power Pong",
        category: "arcade",
        status: "available",
        rating: 8.5,
        description: "Classic Pong with power-ups and multiplayer battles",
        icon: "🏓",
        path: "../power-pong/",
        thumbnail: "../power-pong/thumbnail.png",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 2,
        title: "Wordle Blitz",
        category: "puzzle",
        status: "available",
        rating: 9.2,
        description: "Fast-paced word guessing with multiplayer competition",
        icon: "📝",
        path: "../wordle-blitz/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 3,
        title: "3D World",
        category: "adventure",
        status: "beta",
        rating: 7.8,
        description: "Explore vast 3D environments with friends",
        icon: "🌍",
        path: "../3d-world/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 4,
        title: "Skribbl 2",
        category: "social",
        status: "available",
        rating: 8.9,
        description: "Draw and guess with multiplayer drawing game",
        icon: "🎨",
        path: "../skribbl-2/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 5,
        title: "Piano Player",
        category: "puzzle",
        status: "available",
        rating: 7.5,
        description: "Musical memory and rhythm challenge game",
        icon: "🎹",
        path: "../piano-player/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 6,
        title: "3D Simulator",
        category: "action",
        status: "beta",
        rating: 6.8,
        description: "Physics-based 3D action simulation",
        icon: "🎮",
        path: "../3d-simulator/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 7,
        title: "Tic-Tac-Toe Pro",
        category: "strategy",
        status: "available",
        rating: 8.1,
        description: "Strategic tic-tac-toe with advanced gameplay",
        icon: "⭕",
        path: "../tic-tac-toe-pro/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 8,
        title: "Unity Code Quizzer",
        category: "puzzle",
        status: "available",
        rating: 7.9,
        description: "Test your coding knowledge with interactive quizzes",
        icon: "💻",
        path: "../unity-code-quizzer/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 9,
        title: "Speed Racer",
        category: "action",
        status: "available",
        rating: 8.7,
        description: "High-speed racing with multiplayer competitions",
        icon: "🏎️",
        path: "../speed-racer/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 10,
        title: "Memory Match",
        category: "puzzle",
        status: "available",
        rating: 7.3,
        description: "Classic memory matching with themed card sets",
        icon: "🧠",
        path: "../memory-match/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 11,
        title: "Space Defender",
        category: "action",
        status: "beta",
        rating: 8.4,
        description: "Defend Earth from alien invasions in space",
        icon: "🚀",
        path: "../space-defender/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    },
    {
        id: 12,
        title: "Chess Master",
        category: "strategy",
        status: "available",
        rating: 9.1,
        description: "Classic chess with AI opponents and multiplayer",
        icon: "♟️",
        path: "../chess-master/",
        creator: BRAND_CONFIG.creator,
        platform: BRAND_CONFIG.name
    }
];