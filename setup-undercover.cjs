const fs = require('fs');
const path = require('path');

console.log("🚀 Initialisation du projet de jeu Undercover (Version Multi-serveur stable)...");

const dirs = [
  'database',
  'api',
  'src'
];

// Créer les répertoires s'ils n'existent pas
dirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Dossier créé : ${dir}`);
  }
});

const packageJson = {
  "name": "undercover-mobile-premium",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "concurrently \"vite\" \"node api/index.js\"",
    "build": "vite build",
    "server": "node api/index.js",
    "preview": "vite preview"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1",
    "concurrently": "^8.2.2"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log("📄 Fichier créé : package.json");

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

fs.writeFileSync('vite.config.js', viteConfig);
console.log("📄 Fichier créé : vite.config.js");

const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Undercover - Premium</title>
    <!-- FontAwesome pour de magnifiques icônes de jeux -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts pour un look premium et soigné -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body class="flex items-center justify-center min-h-screen p-0 sm:p-4 bg-slate-950 overflow-hidden">
    <div id="root" class="w-full h-screen sm:h-auto flex justify-center items-center"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

fs.writeFileSync('index.html', indexHtml);
console.log("📄 Fichier créé : index.html");

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'scale-up': 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
`;

fs.writeFileSync('tailwind.config.js', tailwindConfig);
console.log("📄 Fichier créé : tailwind.config.js");

const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

fs.writeFileSync('postcss.config.js', postcssConfig);
console.log("📄 Fichier créé : postcss.config.js");

const vercelConfig = {
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log("📄 Fichier créé : vercel.json");

const wordsJs = `// Base de données locale de mots secrets pour le jeu Undercover.
export const INITIAL_THEMES = {
    nourriture: {
        name: "🍔 Nourriture & Boissons",
        icon: "fa-hamburger",
        color: "from-amber-500 to-orange-600",
        pairs: [
            { civil: "Coca-Cola", undercover: "Pepsi" },
            { civil: "Burger", undercover: "Kebab" },
            { civil: "Chocolat noir", undercover: "Chocolat au lait" },
            { civil: "Pizza", undercover: "Quiche" },
            { civil: "Café", undercover: "Thé" },
            { civil: "Raclette", undercover: "Fondue" },
            { civil: "Frites", undercover: "Potatoes" },
            { civil: "Croissant", undercover: "Pain au chocolat" },
            { civil: "Bière", undercover: "Cidre" },
            { civil: "Crêpe", undercover: "Gaufre" },
            { civil: "Pâtes", undercover: "Riz" },
            { civil: "Beurre", undercover: "Margarine" },
            { civil: "Sel", undercover: "Poivre" },
            { civil: "Ketchup", undercover: "Mayonnaise" },
            { civil: "Sushi", undercover: "Maki" },
            { civil: "Fraise", undercover: "Framboise" },
            { civil: "Eau plate", undercover: "Eau gazeuse" },
            { civil: "Miel", undercover: "Sirop d'érable" },
            { civil: "Glace", undercover: "Sorbet" },
            { civil: "Lait", undercover: "Crème fraîche" },
            { civil: "Nutella", undercover: "Pâte à tartiner" },
            { civil: "Whisky", undercover: "Rhum" },
            { civil: "Baguette", undercover: "Pain de mie" },
            { civil: "Saucisson", undercover: "Chorizo" },
            { civil: "Champagne", undercover: "Prosecco" }
        ]
    },
    pop_culture: {
        name: "🎬 Pop Culture & Geek",
        icon: "fa-film",
        color: "from-purple-500 to-indigo-600",
        pairs: [
            { civil: "Harry Potter", undercover: "Percy Jackson" },
            { civil: "Batman", undercover: "Iron Man" },
            { civil: "Star Wars", undercover: "Star Trek" },
            { civil: "Netflix", undercover: "Prime Video" },
            { civil: "TikTok", undercover: "Instagram" },
            { civil: "PlayStation", undercover: "Xbox" },
            { civil: "Pikachu", undercover: "Évoli" },
            { civil: "Marvel", undercover: "DC Comics" },
            { civil: "Mario", undercover: "Sonic" },
            { civil: "Zelda", undercover: "Link" },
            { civil: "iPhone", undercover: "Android" },
            { civil: "ChatGPT", undercover: "Google Gemini" },
            { civil: "Spotify", undercover: "Deezer" },
            { civil: "Fortnite", undercover: "Call of Duty" },
            { civil: "Naruto", undercover: "Sasuke" },
            { civil: "YouTube", undercover: "Twitch" },
            { civil: "Simpsons", undercover: "South Park" },
            { civil: "Minecraft", undercover: "Roblox" },
            { civil: "Shrek", undercover: "Monstres Cie" },
            { civil: "Spider-Man", undercover: "Spider-Gwen" },
            { civil: "One Piece", undercover: "Dragon Ball" },
            { civil: "Disney", undercover: "Pixar" },
            { civil: "Pac-Man", undercover: "Tetris" },
            { civil: "Game of Thrones", undercover: "Le Seigneur des Anneaux" },
            { civil: "Elon Musk", undercover: "Mark Zuckerberg" }
        ]
    },
    hardcore: {
        name: "🧠 Mode Hardcore (Abstrait)",
        icon: "fa-brain",
        color: "from-rose-500 to-red-600",
        pairs: [
            { civil: "Temps", undercover: "Durée" },
            { civil: "Vide", undercover: "Néant" },
            { civil: "Confiance", undercover: "Naïveté" },
            { civil: "Mémoire", undercover: "Souvenir" },
            { civil: "Objectif", undercover: "Ambition" },
            { civil: "Rêve", undercover: "Illusion" },
            { civil: "Liberté", undercover: "Indépendance" },
            { civil: "Justice", undercover: "Égalité" },
            { civil: "Peur", undercover: "Angoisse" },
            { civil: "Tristesse", undercover: "Mélancolie" },
            { civil: "Sagesse", undercover: "Intelligence" },
            { civil: "Secret", undercover: "Mystère" },
            { civil: "Hasard", undercover: "Destin" },
            { civil: "Vérité", undercover: "Réalité" },
            { civil: "Espace", undercover: "Univers" },
            { civil: "Origine", undercover: "Source" },
            { civil: "Esprit", undercover: "Pensée" },
            { civil: "Silence", undercover: "Calme" },
            { civil: "Destructeur", undercover: "Ravager" },
            { civil: "Sympathie", undercover: "Empathie" },
            { civil: "Art", undercover: "Design" },
            { civil: "Erreur", undercover: "Faute" },
            { civil: "Croyance", undercover: "Opinion" },
            { civil: "Haine", undercover: "Colère" }
        ]
    },
    vie_quotidienne: {
        name: "🏡 Vie Quotidienne",
        icon: "fa-home",
        color: "from-emerald-500 to-teal-600",
        pairs: [
            { civil: "Lit", undercover: "Canapé" },
            { civil: "Ordinateur", undercover: "Téléphone" },
            { civil: "Voiture", undercover: "Moto" },
            { civil: "Stylo", undercover: "Crayon" },
            { civil: "Douche", undercover: "Bain" },
            { civil: "Montre", undercover: "Horloge" },
            { civil: "Porte", undercover: "Fenêtre" },
            { civil: "Miroir", undercover: "Tableau" },
            { civil: "Clé", undercover: "Badge" },
            { civil: "Livre", undercover: "Magazine" },
            { civil: "Ciseaux", undercover: "Couteau" },
            { civil: "Sac à dos", undercover: "Valise" },
            { civil: "Chaussette", undercover: "Chaussure" },
            { civil: "Parapluie", undercover: "Manteau" },
            { civil: "Lunettes", undercover: "Lentilles" },
            { civil: "Oreiller", undercover: "Couette" },
            { civil: "Brosse à dents", undercover: "Dentifrice" },
            { civil: "Savon", undercover: "Gel douche" },
            { civil: "Verre", undercover: "Tasse" },
            { civil: "Balai", undercover: "Aspirateur" },
            { civil: "Casserole", undercover: "Poêle" },
            { civil: "Frigo", undercover: "Congélateur" },
            { civil: "Vis", undercover: "Clou" },
            { civil: "Radiateur", undercover: "Cheminée" },
            { civil: "Serviette", undercover: "Gant de toilette" }
        ]
    },
    fun_soiree: {
        name: "🎉 Soirée & Fun",
        icon: "fa-glass-cheers",
        color: "from-pink-500 to-rose-600",
        pairs: [
            { civil: "Gueule de bois", undercover: "Fin de soirée" },
            { civil: "Vérité ou Action", undercover: "Je n'ai jamais" },
            { civil: "Vodka Pomme", undercover: "Gin Tonic" },
            { civil: "Grasse matinée", undercover: "Sieste d'après-midi" },
            { civil: "Pizzas froides", undercover: "Kebabs de nuit" },
            { civil: "Karaoké", undercover: "Blind test" },
            { civil: "Boîte de nuit", undercover: "Bar dansant" },
            { civil: "Dragueur", undercover: "Romantique" },
            { civil: "Tire-bouchon", undercover: "Décapsuleur" },
            { civil: "Secret de polichinelle", undercover: "Ragot de couloir" },
            { civil: "DJ", undercover: "Playlist Spotify" },
            { civil: "Flirt", undercover: "Coup de foudre" },
            { civil: "Late-night discussion", undercover: "Confession intime" }
        ]
    },
    autre: {
        name: "🌀 Autre & Divers",
        icon: "fa-folder-open",
        color: "from-slate-500 to-zinc-600",
        pairs: [
            { civil: "Soleil", undercover: "Lune" },
            { civil: "Chien", undercover: "Chat" },
            { civil: "Or", undercover: "Argent" },
            { civil: "Mer", undercover: "Océan" },
            { civil: "Guitare", undercover: "Piano" }
        ]
    }
};
`;

fs.writeFileSync(path.join('database', 'words.js'), wordsJs);
console.log("📄 Fichier créé : database/words.js");

const apiIndexJs = `import express from 'express';
import cors from 'cors';
import { INITIAL_THEMES } from '../database/words.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Clé API Gemini configurée via les variables d'environnement de Vercel ou locale
const apiKey = process.env.GEMINI_API_KEY || "";

// Algorithme de catégorisation intelligent par mots-clés (Bypass hors-ligne ultra efficace)
const getCategoryByKeywords = (civil, undercover) => {
    const text = (civil + " " + undercover).toLowerCase();
    
    const categories = {
        nourriture: ["coca", "pepsi", "burger", "kebab", "chocolat", "pizza", "quiche", "café", "thé", "raclette", "fondue", "frites", "potatoes", "croissant", "bière", "cidre", "crêpe", "gaufre", "pâtes", "riz", "beurre", "margarine", "sel", "poivre", "ketchup", "mayonnaise", "sushi", "maki", "fraise", "framboise", "eau", "miel", "sirop", "glace", "sorbet", "lait", "crème", "nutella", "pâte", "whisky", "rhum", "baguette", "pain", "saucisson", "chorizo", "champagne", "prosecco", "boisson", "manger", "plat", "fruit", "légume"],
        pop_culture: ["harry", "potter", "percy", "jackson", "batman", "iron", "star", "wars", "trek", "netflix", "prime", "tiktok", "instagram", "playstation", "xbox", "pikachu", "évoli", "marvel", "dc", "comics", "mario", "sonic", "zelda", "link", "iphone", "android", "chatgpt", "gemini", "spotify", "deezer", "fortnite", "call", "duty", "naruto", "sasuke", "youtube", "twitch", "simpsons", "south", "park", "minecraft", "roblox", "shrek", "monstres", "spider", "one", "piece", "dragon", "ball", "disney", "pixar", "pac", "tetris", "game", "thrones", "seigneur", "anneaux", "elon", "musk", "zuckerberg", "série", "film", "jeu", "console"],
        hardcore: ["temps", "durée", "vide", "néant", "confiance", "naïveté", "mémoire", "souvenir", "objectif", "ambition", "rêve", "illusion", "liberté", "indépendance", "justice", "égalité", "peur", "angoisse", "tristesse", "mélancolie", "sagesse", "intelligence", "secret", "mystère", "hasard", "destin", "vérité", "réalité", "espace", "univers", "origine", "source", "esprit", "pensée", "silence", "calme", "destructeur", "ravager", "sympathie", "empathie", "art", "design", "erreur", "faute", "croyance", "opinion", "haine", "colère"],
        vie_quotidienne: ["lit", "canapé", "ordinateur", "téléphone", "voiture", "moto", "stylo", "crayon", "douche", "bain", "montre", "horloge", "porte", "fenêtre", "miroir", "tableau", "clé", "badge", "livre", "magazine", "ciseaux", "couteau", "sac", "valise", "chaussette", "chaussure", "parapluie", "manteau", "lunettes", "lentilles", "oreiller", "couette", "brosse", "dentifrice", "savon", "gel", "verre", "tasse", "balai", "aspirateur", "casserole", "poêle", "frigo", "congélateur", "vis", "clou", "radiateur", "cheminée", "serviette"],
        fun_soiree: ["gueule", "bois", "soirée", "vérité", "action", "vodka", "pomme", "gin", "tonic", "grasse", "matinée", "sieste", "karaoké", "blind", "test", "boîte", "nuit", "bar", "dragueur", "romantique", "tire", "bouchon", "décapsuleur", "polichinelle", "ragot", "dj", "playlist", "flirt", "foudre", "discussion", "confession", "fête", "alcool", "jeu"]
    };

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(word => text.includes(word))) {
            return category;
        }
    }
    return "autre"; // Catégorie par défaut
};

const callGeminiWithRetry = async (civil, undercover) => {
    // Utilisation du modèle stable de production de Google
    const url = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`;
    
    const payload = {
        contents: [{
            parts: [{
                text: \`Vérifie si la paire de mots suivante est de bonne qualité pour le jeu Undercover (un mot secret pour le civil et un autre proche mais différent pour l'infiltré pour créer du doute, par exemple 'Coca-Cola' et 'Pepsi').\\n\\nMot Civil : "\${civil}"\\nMot Infiltré : "\${undercover}"\\n\\nTu devez t'assurer impérativement de :\\n1. Ce ne sont pas des mots bizarres, offensants, ou du charabia de touches frappées au hasard (ex: 'asdfg').\\n2. Les deux mots ont un lien sémantique évident et logique (pas de mots complètement hors-sujet comme 'Chien' et 'Ordinateur').\\n3. La paire est jouable, saine, propre et amusante.\\n\\nTu dois répondre STRICTEMENT au format JSON avec les propriétés suivantes :\\n- "valid" (boolean): true si les mots ont un sens proche mais distinct et conviennent parfaitement au jeu, false sinon.\\n- "reason" (string): une explication claire, polie et concise en français (max 15 mots) pour justifier ta décision de rejet ou d'acceptation.\\n- "category" (string): choisis la catégorie existante la plus adaptée parmi : 'nourriture', 'pop_culture', 'hardcore', 'vie_quotidienne', 'fun_soiree', 'autre'.\`
            }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    valid: { type: "BOOLEAN" },
                    reason: { type: "STRING" },
                    category: { type: "STRING", enum: ["nourriture", "pop_culture", "hardcore", "vie_quotidienne", "fun_soiree", "autre"] }
                },
                required: ["valid", "reason", "category"]
            }
        }
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                return JSON.parse(text);
            }
        } catch (error) {
            // Continuer silencieusement pour le retry
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
    }
    throw new Error("L'API de validation Gemini n'a pas répondu après plusieurs tentatives.");
};

app.get('/api/themes', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    try {
        const themeList = {};
        
        Object.entries(INITIAL_THEMES).forEach(([key, theme]) => {
            themeList[key] = {
                name: theme.name,
                icon: theme.icon,
                color: theme.color,
                count: theme.pairs.length
            };
        });

        res.json({ success: true, themes: themeList });
    } catch (error) {
        res.status(500).json({ success: false, error: "Impossible de charger les thématiques." });
    }
});

app.get('/api/random-pair/:theme', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { theme } = req.params;
    let selectedPair = null;

    try {
        if (INITIAL_THEMES[theme]) {
            const pairs = INITIAL_THEMES[theme].pairs;
            selectedPair = pairs[Math.floor(Math.random() * pairs.length)];
            res.json({ success: true, pair: selectedPair });
        } else {
            return res.status(404).json({ success: false, error: "Thématique introuvable." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Erreur lors de la sélection du mot secret." });
    }
});

app.post('/api/custom-pair', async (req, res) => {
    const { civil, undercover } = req.body;

    if (!civil || !undercover || !civil.trim() || !undercover.trim()) {
        return res.status(400).json({ success: false, error: "Les mots du Civil et de l'Infiltré sont obligatoires." });
    }

    try {
        let result = { valid: true, category: "autre", reason: "" };

        // Si une clé de validation Gemini est présente, on l'interroge, sinon on effectue un tri local intelligent
        if (apiKey) {
            result = await callGeminiWithRetry(civil.trim(), undercover.trim());
        } else {
            const localCat = getCategoryByKeywords(civil.trim(), undercover.trim());
            const catNames = {
                nourriture: "🍔 Nourriture & Boissons",
                pop_culture: "🎬 Pop Culture & Geek",
                hardcore: "🧠 Mode Hardcore (Abstrait)",
                vie_quotidienne: "🏡 Vie Quotidienne",
                fun_soiree: "🎉 Soirée & Fun",
                autre: "🌀 Autre & Divers"
            };
            result = {
                valid: true,
                category: localCat,
                reason: \`Validé localement hors-ligne dans la catégorie "\${catNames[localCat]}".\`
            };
        }

        res.json({ 
            success: true, 
            valid: result.valid, 
            category: result.category || 'autre', 
            reason: result.reason 
        });

    } catch (error) {
        res.status(500).json({ success: false, error: "Une erreur est survenue lors de la validation : " + error.message });
    }
});

// Permet le lancement autonome du serveur
app.listen(PORT, () => {
    console.log(\`Serveur Undercover actif en local sur le port \${PORT}\`);
});

export default app;
`;

fs.writeFileSync(path.join('api', 'index.js'), apiIndexJs);
console.log("📄 Fichier créé : api/index.js");

const appJsx = `import { useState, useEffect } from 'react';

// En production (Vercel), l'API est sur la même URL (/api). En local, on interroge le port 3001.
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

// Avatars fun disponibles pour les joueurs
const AVATARS_POOL = ["🕵️‍♀️", "🦊", "👾", "🥷", "👻", "👽", "🦄", "🤠", "🤖", "🧙‍♀️", "🧛", "🐯", "🐼", "🍿", "🍕", "🔥"];

// Liste par défaut "usine" au tout premier démarrage avec avatars cool
const DEFAULT_PLAYERS_FALLBACK = [
    { id: 1, name: "Amina", avatar: "🕵️‍♀️", role: "", word: "", isEliminated: false },
    { id: 2, name: "Rim", avatar: "🦊", role: "", word: "", isEliminated: false },
    { id: 3, name: "Ilay", avatar: "👾", role: "", word: "", isEliminated: false }
];

function App() {
    const [screen, setScreen] = useState('home'); // home, setup, reveal, gameplay, guess_white, gameover
    const [setupStep, setSetupStep] = useState('category'); // category, players, roles
    const [themes, setThemes] = useState({});
    
    // Charger la liste de joueurs par défaut enregistrée par l'utilisateur
    const [defaultPlayers, setDefaultPlayers] = useState(() => {
        const saved = localStorage.getItem('undercover_default_players_v2');
        return saved ? JSON.parse(saved) : DEFAULT_PLAYERS_FALLBACK;
    });

    // Charger les paires de mots personnalisés stockées UNIQUEMENT sur cet appareil
    const [localCustomPairs, setLocalCustomPairs] = useState(() => {
        const saved = localStorage.getItem('undercover_local_custom_pairs');
        return saved ? JSON.parse(saved) : [];
    });

    // La liste de joueurs active pour la partie en cours
    const [players, setPlayers] = useState(() => {
        const saved = localStorage.getItem('undercover_default_players_v2');
        const list = saved ? JSON.parse(saved) : DEFAULT_PLAYERS_FALLBACK;
        return list.map(p => ({ ...p, role: "", word: "", isEliminated: false }));
    });

    const [newPlayerName, setNewPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS_POOL[3]); // 🥷 par défaut pour les nouveaux
    const [selectedTheme, setSelectedTheme] = useState("random"); // "random" par défaut
    const [playedThemeName, setPlayedThemeName] = useState("");
    const [undercoverCount, setUndercoverCount] = useState(1);
    const [mrWhiteCount, setMrWhiteCount] = useState(0);

    const [activeWordPair, setActiveWordPair] = useState({ civil: "", undercover: "" });
    const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
    const [revealStep, setRevealStep] = useState('pass'); // pass, show
    const [startingPlayer, setStartingPlayer] = useState("");
    const [startingPlayerAvatar, setStartingPlayerAvatar] = useState("");
    const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
    const [winner, setWinner] = useState(null); // 'civilians', 'undercovers_and_white'

    const [customCivil, setCustomCivil] = useState("");
    const [customUndercover, setCustomUndercover] = useState("");
    const [showCustomManager, setShowCustomManager] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const fetchThemes = async () => {
        try {
            const response = await fetch(\`\${API_URL}/themes?_t=\${Date.now()}\`);
            const data = await response.json();
            if (data.success) {
                // On clone les thèmes du serveur, puis on additionne localement les mots privés pour l'affichage de l'appareil
                const mergedThemes = { ...data.themes };
                
                localCustomPairs.forEach(pair => {
                    const cat = pair.category || 'autre';
                    if (mergedThemes[cat]) {
                        mergedThemes[cat].count = (mergedThemes[cat].count || 0) + 1;
                    }
                });

                // On ajoute la thématique "Vos Mots Personnalisés" seulement pour l'appareil local
                mergedThemes['custom'] = {
                    name: "⭐ Vos Mots Personnalisés",
                    icon: "fa-star",
                    color: "from-yellow-500 to-amber-600",
                    count: localCustomPairs.length
                };

                setThemes(mergedThemes);
            }
        } catch (error) {
            triggerAlert("Impossible de se connecter au serveur backend. Vérifiez que votre serveur local Express tourne bien.", "Erreur Réseau");
        }
    };

    // Mettre à jour et recalculer les thèmes dès que les paires personnalisées changent
    useEffect(() => {
        fetchThemes();
    }, [localCustomPairs]);

    const triggerAlert = (message, title = "Info") => {
        setCustomAlert({ title, message });
    };

    const addPlayer = () => {
        if (!newPlayerName.trim()) return;
        const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
        setPlayers([...players, { id: newId, name: newPlayerName.trim(), avatar: selectedAvatar, role: "", word: "", isEliminated: false }]);
        setNewPlayerName("");
        
        // Choisir un avatar au hasard pour le prochain ajout afin de dynamiser
        const currentIdx = AVATARS_POOL.indexOf(selectedAvatar);
        const nextIdx = (currentIdx + 1) % AVATARS_POOL.length;
        setSelectedAvatar(AVATARS_POOL[nextIdx]);
    };

    const removePlayer = (id) => {
        if (players.length <= 3) return;
        setPlayers(players.filter(p => p.id !== id));
    };

    // Restaurer l'affichage avec la liste par défaut enregistrée en mémoire de l'appareil
    const resetPlayersToSavedDefault = () => {
        setPlayers(defaultPlayers.map(p => ({ ...p, role: "", word: "", isEliminated: false })));
        setNewPlayerName("");
        triggerAlert("La liste par défaut a été rechargée avec succès !", "Liste Restaurée");
    };

    // Enregistrer la configuration de la liste actuelle comme "liste par défaut permanente"
    const saveCurrentListAsDefault = () => {
        if (players.length < 3) {
            triggerAlert("Il faut au moins 3 joueurs pour enregistrer une liste par défaut !", "Action Impossible");
            return;
        }
        const cleanList = players.map((p, idx) => ({
            id: idx + 1,
            name: p.name,
            avatar: p.avatar || "🕵️‍♀️",
            role: "",
            word: "",
            isEliminated: false
        }));
        setDefaultPlayers(cleanList);
        localStorage.setItem('undercover_default_players_v2', JSON.stringify(cleanList));
        triggerAlert("Cette configuration de joueurs a été enregistrée comme votre nouvelle liste par défaut permanente sur cet appareil !", "💾 Sauvegarde Réussie");
    };

    const clearPlayersList = () => {
        setPlayers([]);
        setNewPlayerName("");
    };

    const resetGameToSetup = () => {
        // Recharge automatiquement la liste par défaut persistante pour la nouvelle partie
        setPlayers(defaultPlayers.map(p => ({ ...p, role: "", word: "", isEliminated: false })));
        setNewPlayerName("");
        setSelectedTheme("random");
        setUndercoverCount(1);
        setMrWhiteCount(0);
        setWinner(null);
        setEliminatedPlayer(null);
        setSetupStep('category');
        setScreen('setup');
    };

    const addCustomWordPair = async () => {
        if (!customCivil.trim() || !customUndercover.trim()) {
            triggerAlert("Veuillez remplir les deux cases pour valider votre paire !", "Erreur");
            return;
        }

        setIsAnalyzing(true);

        try {
            // Le serveur s'occupe de la validation logique / Gemini mais ne stocke rien en BDD globale
            const response = await fetch(\`\${API_URL}/custom-pair\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ civil: customCivil, undercover: customUndercover })
            });
            const data = await response.json();
            setIsAnalyzing(false);

            if (data.success) {
                if (data.valid) {
                    const validatedCategory = data.category || 'autre';
                    const newPair = {
                        civil: customCivil.trim(),
                        undercover: customUndercover.trim(),
                        category: validatedCategory
                    };
                    
                    // On enregistre la paire validée UNIQUEMENT dans le stockage local de l'appareil
                    const updatedPairs = [...localCustomPairs, newPair];
                    setLocalCustomPairs(updatedPairs);
                    localStorage.setItem('undercover_local_custom_pairs', JSON.stringify(updatedPairs));

                    setCustomCivil("");
                    setCustomUndercover("");
                    triggerAlert(\`✅ Validé par l'IA ! Enregistré localement sur votre téléphone dans la catégorie "\${validatedCategory}".\\n\\nRaison : "\${data.reason}"\`, "Paire Privée Enregistrée");
                } else {
                    triggerAlert(\`❌ Rejeté par la validation : "\${data.reason}"\`, "Paire Refusée");
                }
            } else {
                triggerAlert(data.error || "Une erreur est survenue lors de l'enregistrement.", "Oups");
            }
        } catch (error) {
            setIsAnalyzing(false);
            triggerAlert("Connexion impossible avec le serveur de validation.", "Erreur");
        }
    };

    const clearCustomWords = () => {
        setLocalCustomPairs([]);
        localStorage.removeItem('undercover_local_custom_pairs');
        triggerAlert("Vos mots personnalisés locaux ont été effacés de cet appareil.", "Fait");
    };

    const startGame = async () => {
        if (players.length < 3) {
            triggerAlert("Il faut au moins 3 joueurs pour lancer la partie !", "Démarrage Impossible");
            return;
        }

        let themeToFetch = selectedTheme;

        // Choix du thème aléatoire si "Mélange Aléatoire" est sélectionné
        if (selectedTheme === 'random') {
            const availableKeys = Object.keys(themes).filter(k => k !== 'custom');
            if (availableKeys.length > 0) {
                themeToFetch = availableKeys[Math.floor(Math.random() * availableKeys.length)];
            } else {
                themeToFetch = 'nourriture';
            }
        }

        // Récupérer les mots correspondants
        const localPairsForTheme = localCustomPairs.filter(p => p.category === themeToFetch);
        const serverThemeCount = themes[themeToFetch]?.count - localPairsForTheme.length;

        let chosenPair = null;

        // Si le joueur veut jouer ses mots customisés exclusifs
        if (themeToFetch === 'custom') {
            if (localCustomPairs.length === 0) {
                triggerAlert("Votre stockage de mots personnalisés est vide ! Ajoutez des mots secrets d'abord dans l'accueil.", "Oups !");
                return;
            }
            chosenPair = localCustomPairs[Math.floor(Math.random() * localCustomPairs.length)];
        } else {
            // Ratio de tirage aléatoire entre base officielle du serveur et mots privés de l'appareil
            const totalWords = (serverThemeCount || 0) + localPairsForTheme.length;
            if (totalWords === 0) {
                triggerAlert("Cette thématique est vide.", "Oups !");
                return;
            }

            const randIndex = Math.floor(Math.random() * totalWords);

            if (randIndex < localPairsForTheme.length) {
                // On pioche dans les mots privés du téléphone !
                chosenPair = localPairsForTheme[randIndex];
                console.log("🎮 Tirage effectué sur un mot personnalisé exclusif de l'appareil.");
            } else {
                // On pioche sur le serveur de manière sécurisée
                try {
                    const response = await fetch(\`\${API_URL}/random-pair/\${themeToFetch}?_t=\${Date.now()}\`);
                    const data = await response.json();
                    if (data.success) {
                        chosenPair = data.pair;
                    }
                } catch (err) {
                    console.warn("Échec de connexion serveur, repli sur un mot alternatif.");
                }
            }
        }

        if (!chosenPair) {
            triggerAlert("Erreur de récupération d'une paire de mots.", "Oups");
            return;
        }

        setActiveWordPair(chosenPair);
        setPlayedThemeName(themes[themeToFetch]?.name || "Aléatoire");

        let rolesPool = [];
        for (let i = 0; i < undercoverCount; i++) rolesPool.push('undercover');
        for (let i = 0; i < mrWhiteCount; i++) rolesPool.push('mr_white');
        const civilCount = players.length - undercoverCount - mrWhiteCount;
        for (let i = 0; i < civilCount; i++) rolesPool.push('civilian');

        rolesPool.sort(() => Math.random() - 0.5);

        const updatedPlayers = players.map((player, index) => {
            const role = rolesPool[index];
            let word = "";
            if (role === 'civilian') word = chosenPair.civil;
            else if (role === 'undercover') word = chosenPair.undercover;
            else word = "???";

            return {
                ...player,
                role,
                word,
                isEliminated: false
            };
        });

        setPlayers(updatedPlayers);
        setCurrentRevealIndex(0);
        setRevealStep('pass');

        const civilians = updatedPlayers.filter(p => p.role === 'civilian');
        const randomCivil = civilians[Math.floor(Math.random() * civilians.length)];
        setStartingPlayer(randomCivil.name);
        setStartingPlayerAvatar(randomCivil.avatar || "🕵️‍♀️");

        setScreen('reveal');
    };

    const handleRevealWord = () => {
        setRevealStep('show');
    };

    const handleNextReveal = () => {
        if (currentRevealIndex < players.length - 1) {
            setCurrentRevealIndex(currentRevealIndex + 1);
            setRevealStep('pass');
        } else {
            setScreen('gameplay');
        }
    };

    const eliminatePlayerAction = (player) => {
        const updatedPlayers = players.map(p => {
            if (p.id === player.id) {
                return { ...p, isEliminated: true };
            }
            return p;
        });
        
        setPlayers(updatedPlayers);
        setEliminatedPlayer(player);

        if (player.role === 'mr_white') {
            setScreen('guess_white');
        } else {
            checkWinConditions(updatedPlayers);
        }
    };

    const handleMrWhiteGuess = (isCorrect) => {
        if (isCorrect) {
            setWinner('undercovers_and_white');
            setScreen('gameover');
        } else {
            triggerAlert(\`Ce n'était pas le mot des civils. Mr. White est définitivement éliminé ! Le mot était : "\${activeWordPair.civil}"\`, "Raté !");
            checkWinConditions(players);
        }
    };

    const checkWinConditions = (currentPlayers) => {
        const survivors = currentPlayers.filter(p => !p.isEliminated);
        const activeCivilians = survivors.filter(p => p.role === 'civilian').length;
        const activeUndercovers = survivors.filter(p => p.role === 'undercover').length;
        const activeMrWhites = survivors.filter(p => p.role === 'mr_white').length;

        if (activeUndercovers === 0 && activeMrWhites === 0) {
            setWinner('civilians');
            setScreen('gameover');
            return;
        }

        if (activeUndercovers + activeMrWhites >= activeCivilians) {
            setWinner('undercovers_and_white');
            setScreen('gameover');
            return;
        }

        const survivorsList = survivors.filter(p => p.role === 'civilian');
        if (survivorsList.length > 0) {
            const nextStarter = survivorsList[Math.floor(Math.random() * survivorsList.length)];
            setStartingPlayer(nextStarter.name);
            setStartingPlayerAvatar(nextStarter.avatar || "🕵️‍♀️");
        }
        setScreen('gameplay');
    };

    return (
        <div className="w-full max-w-md h-screen sm:h-[820px] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative shadow-2xl sm:rounded-[40px] sm:border-[12px] sm:border-slate-800 animate-fade-in">
            {customAlert && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-xs text-center space-y-4 shadow-2xl animate-scale-up">
                        <div className="w-12 h-12 bg-violet-600/10 text-violet-400 rounded-full flex items-center justify-center mx-auto text-xl">
                            <i className="fa-solid fa-circle-info animate-pulse"></i>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-white font-serif">{customAlert.title}</h4>
                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{customAlert.message}</p>
                        </div>
                        <button 
                            onClick={() => setCustomAlert(null)}
                            className="w-full bg-violet-600 hover:bg-violet-500 py-2.5 rounded-xl text-sm font-bold transition-all text-white active:scale-95"
                        >
                            D'accord
                        </button>
                    </div>
                </div>
            )}

            {screen === 'home' && (
                <div className="flex-1 flex flex-col justify-between p-6">
                    <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <i className="fa-solid fa-user-secret text-5xl text-white animate-pulse"></i>
                            </div>
                        </div>
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent">UNDERCOVER</h1>
                            <p className="text-slate-300 text-base font-light px-4 leading-relaxed">
                                Un téléphone, un mot secret, un intrus caché. Qui saura bluffer pour l'emporter ?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={() => {
                                setScreen('setup');
                                setSetupStep('category');
                            }}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-lg flex items-center justify-center gap-3"
                        >
                            <i className="fa-solid fa-play"></i> Lancer la Soirée
                        </button>
                        <button 
                            onClick={() => setShowCustomManager(true)}
                            className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 py-3 px-6 rounded-2xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-pen-to-square text-amber-400"></i> Vos Mots Secrets ({localCustomPairs.length})
                        </button>
                        <div className="text-center text-[11px] text-slate-500 font-medium">
                            Un seul téléphone suffit. Passez-le à tour de rôle !
                        </div>
                    </div>
                </div>
            )}

            {showCustomManager && (
                <div className="absolute inset-0 bg-slate-950/95 z-40 flex flex-col justify-between p-6 animate-fade-in">
                    <div className="space-y-4 overflow-y-auto flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <i className="fa-solid fa-star text-amber-400"></i> Vos Mots Secrets (API)
                            </h3>
                            <button onClick={() => setShowCustomManager(false)} className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 active:scale-90">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <p className="text-xs text-slate-400">Ces mots sont vérifiés par l'IA Gemini et stockés uniquement sur votre téléphone (sécurisé).</p>

                        {isAnalyzing ? (
                            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8 text-center space-y-4 animate-pulse">
                                <div className="w-14 h-14 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto">
                                    <i className="fa-solid fa-brain text-violet-400 text-3xl animate-bounce"></i>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-white">Analyse de vos mots par l'IA...</h4>
                                    <p className="text-xs text-slate-400">Gemini vérifie la cohérence du doublon et cherche la bonne thématique.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400">Mot du Civil</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: Coca-Cola" 
                                        value={customCivil}
                                        onChange={(e) => setCustomCivil(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400">Mot de l'Infiltré</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: Pepsi" 
                                        value={customUndercover}
                                        onChange={(e) => setCustomUndercover(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                                <button 
                                    onClick={addCustomWordPair}
                                    className="w-full bg-violet-600 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
                                >
                                    Faire Valider & Ajouter
                                </button>
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                                <span>Paires stockées localement ({localCustomPairs.length})</span>
                                {localCustomPairs.length > 0 && (
                                    <button onClick={clearCustomWords} className="text-red-400 text-[10px] uppercase hover:underline">Vider l'appareil</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowCustomManager(false)}
                        className="w-full bg-slate-900 border border-slate-800 text-white font-bold py-3.5 rounded-2xl text-sm mt-4 active:scale-95"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            )}

            {/* SCREEN SETUP MULTI-ÉTAPES (Prend tout l'écran de manière optimisée) */}
            {screen === 'setup' && (
                <div className="flex-1 flex flex-col justify-between p-5 overflow-hidden animate-fade-in">
                    
                    {/* Header dynamique des étapes */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <button 
                            onClick={() => {
                                if (setupStep === 'category') setScreen('home');
                                else if (setupStep === 'players') setSetupStep('category');
                                else if (setupStep === 'roles') setSetupStep('players');
                            }} 
                            className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 active:scale-90"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="text-center">
                            <h2 className="text-sm font-bold text-violet-400 tracking-wider uppercase font-sans">
                                {setupStep === 'category' && "Étape 1/3"}
                                {setupStep === 'players' && "Étape 2/3"}
                                {setupStep === 'roles' && "Étape 3/3"}
                            </h2>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">
                                {setupStep === 'category' && "Choix du Thème"}
                                {setupStep === 'players' && "Profils des Joueurs"}
                                {setupStep === 'roles' && "Équilibrage des rôles"}
                            </p>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center">
                            <i className="fa-solid fa-layer-group text-slate-700 text-sm"></i>
                        </div>
                    </div>

                    {/* ÉTAPE 1 : SELECTION DE LA CATEGORIE (Full screen) */}
                    {setupStep === 'category' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                <h3 className="text-base font-bold text-slate-300 px-1 mb-2">Sélectionnez le thème de la partie :</h3>
                                
                                {/* Bouton Mélange Aléatoire */}
                                <button
                                    onClick={() => setSelectedTheme("random")}
                                    className={\`w-full p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98] \${
                                        selectedTheme === "random" 
                                        ? 'border-violet-500 bg-gradient-to-r from-violet-950/40 to-indigo-950/40 text-violet-300 shadow-lg shadow-violet-900/10' 
                                        : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:bg-slate-900/60'
                                    }\`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center text-lg">
                                            <i className="fa-solid fa-shuffle"></i>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-white">🎲 Mélange Aléatoire</p>
                                            <p className="text-xs text-slate-500 font-medium">Une catégorie au hasard à chaque partie</p>
                                        </div>
                                    </div>
                                    {selectedTheme === "random" && <i className="fa-solid fa-circle-check text-violet-500 text-lg"></i>}
                                </button>

                                {Object.entries(themes).map(([key, theme]) => {
                                    if (theme.count === 0 && key !== 'custom') return null;
                                    
                                    const emojiIndex = theme.name.indexOf(' ');
                                    const cleanName = emojiIndex !== -1 ? theme.name.substring(emojiIndex + 1) : theme.name;
                                    const emoji = emojiIndex !== -1 ? theme.name.substring(0, emojiIndex) : "🔮";

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedTheme(key)}
                                            className={\`w-full p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98] \${
                                                selectedTheme === key 
                                                ? 'border-violet-500 bg-gradient-to-r from-violet-950/40 to-indigo-950/40 text-violet-300 shadow-lg shadow-violet-900/10' 
                                                : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:bg-slate-900/60'
                                            }\`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-violet-500/10 text-violet-400 rounded-xl flex items-center justify-center text-lg">
                                                    <span className="text-2xl">{emoji}</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-bold text-white">{cleanName}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{theme.count} paires de mots enregistrées</p>
                                                </div>
                                            </div>
                                            {selectedTheme === key && <i className="fa-solid fa-circle-check text-violet-500 text-lg"></i>}
                                        </button>
                                    );
                                })}
                            </div>

                            <button 
                                onClick={() => setSetupStep('players')}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all text-sm mt-4 flex items-center justify-center gap-2"
                            >
                                Continuer <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                    )}

                    {/* ÉTAPE 2 : CONFIGURATION DES JOUEURS + AVATARS */}
                    {setupStep === 'players' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                <div className="flex justify-between items-center px-1">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Membres de la soirée ({players.length})</h3>
                                    <div className="flex gap-2 text-[10px] uppercase font-bold text-slate-500">
                                        <button onClick={resetPlayersToSavedDefault} className="hover:text-violet-400 active:scale-95 transition-all flex items-center gap-1">
                                            <i className="fa-solid fa-rotate-left"></i> Restaurer
                                        </button>
                                        <span>•</span>
                                        <button onClick={saveCurrentListAsDefault} className="hover:text-emerald-400 active:scale-95 transition-all text-emerald-500 flex items-center gap-1">
                                            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
                                        </button>
                                        <span>•</span>
                                        <button onClick={clearPlayersList} className="hover:text-red-400 active:scale-95 transition-all text-red-500 flex items-center gap-1">
                                            <i className="fa-solid fa-trash-can"></i> Vider
                                        </button>
                                    </div>
                                </div>

                                {/* Formulaire de création de joueur */}
                                <div className="bg-slate-900/40 border border-slate-900 p-3 rounded-2xl space-y-3">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={newPlayerName}
                                            onChange={(e) => setNewPlayerName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                                            placeholder="Saisissez un prénom..."
                                            maxLength="14"
                                            className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-4 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm"
                                        />
                                        <button 
                                            onClick={addPlayer}
                                            className="bg-violet-600 active:bg-violet-700 hover:bg-violet-500 text-white px-4 rounded-xl font-bold text-sm"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>

                                    {/* Carrousel d'Avatars */}
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">Choisissez son avatar :</p>
                                        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none snap-x">
                                            {AVATARS_POOL.map((avatar) => (
                                                <button
                                                    key={avatar}
                                                    onClick={() => setSelectedAvatar(avatar)}
                                                    className={\`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all snap-center flex-shrink-0 active:scale-90 border-2 \${
                                                        selectedAvatar === avatar 
                                                        ? 'border-violet-500 bg-violet-600/20 scale-110' 
                                                        : 'border-transparent bg-slate-950/60'
                                                    }\`}
                                                >
                                                    {avatar}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Liste des Joueurs */}
                                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                                    {players.map((player) => (
                                        <div key={player.id} className="flex items-center justify-between bg-slate-900/60 rounded-xl px-3 py-2 text-sm border border-slate-850 animate-fade-in">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-xl bg-slate-950 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-900">{player.avatar || "🕵️‍♀️"}</span>
                                                <span className="font-bold text-slate-200">{player.name}</span>
                                            </div>
                                            <button 
                                                onClick={() => removePlayer(player.id)}
                                                className="text-slate-500 hover:text-red-400 p-1 active:scale-90"
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    if (players.length < 3) {
                                        triggerAlert("Il vous faut au moins 3 joueurs pour continuer !", "Action Impossible");
                                        return;
                                    }
                                    setSetupStep('roles');
                                }}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all text-sm mt-4 flex items-center justify-center gap-2"
                            >
                                Continuer <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                    )}

                    {/* ÉTAPE 3 : DISTRIBUTION DES ROLES SPECIAUX */}
                    {setupStep === 'roles' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                <h3 className="text-base font-bold text-slate-300 px-1 mb-2">Configurez la répartition des rôles secrets :</h3>

                                <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-850">
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">Infiltrés (Undercover)</p>
                                        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Ont un mot légèrement alternatif</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setUndercoverCount(Math.max(1, undercoverCount - 1))}
                                            className="w-8 h-8 rounded-lg bg-slate-800 text-white text-sm font-extrabold active:scale-90"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-violet-400 text-base w-4 text-center">{undercoverCount}</span>
                                        <button 
                                            onClick={() => setUndercoverCount(Math.min(Math.max(1, Math.floor((players.length - 1) / 3)), undercoverCount + 1))}
                                            className="w-8 h-8 rounded-lg bg-slate-800 text-white text-sm font-extrabold active:scale-90"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-850">
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">Mister White</p>
                                        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">N'a aucun mot, doit bluffer à 100%</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setMrWhiteCount(0)}
                                            className={\`px-4 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 \${mrWhiteCount === 0 ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' : 'bg-slate-900 text-slate-400'}\`}
                                        >
                                            Sans
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (players.length - undercoverCount - 2 < 1) {
                                                    triggerAlert("Il n'y a pas assez de joueurs civils pour rajouter Mister White !", "Configuration Impossible");
                                                    return;
                                                }
                                                setMrWhiteCount(1);
                                            }}
                                            className={\`px-4 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 \${mrWhiteCount === 1 ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' : 'bg-slate-900 text-slate-400'}\`}
                                        >
                                            Avec (1)
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-violet-950/20 border border-violet-900/20 p-4 rounded-2xl space-y-1.5 text-center mt-4">
                                    <p className="text-[10px] text-violet-400 uppercase tracking-widest font-extrabold">Résumé de la distribution :</p>
                                    <div className="flex justify-center items-center gap-3 text-xs font-bold text-slate-300">
                                        <span>👥 {players.length} Joueurs</span>
                                        <span>•</span>
                                        <span>🤫 {undercoverCount} Undercover</span>
                                        {mrWhiteCount > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>🃏 1 Mr. White</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={startGame}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all text-sm mt-4 flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-hourglass-start animate-spin"></i> Lancer la Partie !
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* DISTRIBUTION DES ROLES */}
            {screen === 'reveal' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Distribution secrète</div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full transition-all duration-300"
                                style={{ width: \`\${((currentRevealIndex + (revealStep === 'show' ? 1 : 0.5)) / players.length) * 100}%\` }}
                            ></div>
                        </div>
                    </div>

                    {revealStep === 'pass' && (
                        <div className="my-auto space-y-6">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-violet-400 text-3xl animate-bounce border border-slate-850">
                                <span className="text-4xl">{players[currentRevealIndex].avatar || "🕵️‍♀️"}</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-extrabold text-white">Passe le téléphone !</h3>
                                <p className="text-slate-400 text-sm">Le moment est venu de confier l'écran à :</p>
                                <p className="text-xl font-black text-violet-400 bg-violet-500/10 py-2 px-6 rounded-2xl inline-block border border-violet-500/20">{players[currentRevealIndex].name}</p>
                            </div>
                        </div>
                    )}

                    {revealStep === 'show' && (
                        <div className="my-auto space-y-5 animate-scale-up">
                            <div className="text-slate-400 text-sm font-medium">Bonjour <span className="text-white font-extrabold">{players[currentRevealIndex].name}</span>, voici ton rôle :</div>
                            
                            {players[currentRevealIndex].role === 'mr_white' ? (
                                <div className="space-y-4">
                                    <span className="px-3.5 py-1.5 bg-red-500/10 text-red-400 rounded-full text-[10px] font-bold border border-red-500/20">MR. WHITE</span>
                                    <div className="text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 py-6 animate-pulse">???</div>
                                    <p className="text-slate-300 text-xs max-w-xs mx-auto leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-850">
                                        Tu n'as <strong>aucun mot</strong> secret. Écoute très attentivement les indices pour deviner le mot d'origine des civils !
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <span className="px-3.5 py-1.5 bg-violet-600/10 text-violet-400 rounded-full text-[10px] font-bold border border-violet-500/20 uppercase tracking-widest">
                                        🔒 Mot Secret
                                    </span>
                                    <div className="text-3xl font-black tracking-wide text-white py-5 bg-slate-900 border border-slate-850 rounded-2xl max-w-xs mx-auto shadow-inner">
                                        {players[currentRevealIndex].word}
                                    </div>
                                    <p className="text-slate-300 text-xs max-w-xs mx-auto leading-relaxed bg-slate-900/40 p-3 rounded-xl">
                                        Mémorise bien ce mot et ne le montre à personne ! 
                                        Tu ne sais pas si tu es Civil ou Infiltré... à toi de le déduire au fil des indices donnés !
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {revealStep === 'pass' ? (
                        <button 
                            onClick={handleRevealWord}
                            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-sm"
                        >
                            Révéler mon rôle en secret
                        </button>
                    ) : (
                        <button 
                            onClick={handleNextReveal}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-sm"
                        >
                            C'est tout bon !
                        </button>
                    )}
                </div>
            )}

            {/* SCREEN GAMEPLAY DEBATS */}
            {screen === 'gameplay' && (
                <div className="flex-1 flex flex-col justify-between p-5 overflow-hidden animate-fade-in">
                    <div className="space-y-4 flex flex-col flex-1 overflow-hidden">
                        <div className="text-center">
                            <span className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-violet-500/20">Phase de débats & d'indices</span>
                            <h2 className="text-xl font-black mt-1.5 text-white">Qui est l'intrus ?</h2>
                        </div>

                        <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-1.5 text-center shadow-lg">
                            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-extrabold">Premier à donner son indice :</p>
                            <p className="text-lg font-black text-violet-400 bg-violet-500/5 py-1 px-4 rounded-lg inline-block border border-violet-500/10">
                                <span className="mr-2 text-xl">{startingPlayerAvatar}</span>{startingPlayer}
                            </p>
                            <div className="text-xs font-semibold text-cyan-400 flex items-center justify-center gap-1.5 py-0.5">
                                <i className="fa-solid fa-tag"></i> Thématique : {playedThemeName}
                            </div>
                            <p className="text-[10px] text-slate-300 leading-relaxed mt-1">Donnez chacun un mot unique à voix haute, débattez puis éliminez quelqu'un !</p>
                        </div>

                        <div className="space-y-1.5 flex-1 overflow-hidden flex flex-col">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Membres encore en jeu ({players.filter(p => !p.isEliminated).length})</p>
                            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                                {players.map((player) => (
                                    <div 
                                        key={player.id} 
                                        className={\`flex items-center justify-between p-3 rounded-xl border transition-all \${
                                            player.isEliminated 
                                            ? 'bg-slate-900/10 border-slate-950 opacity-30 line-through' 
                                            : 'bg-slate-900 border-slate-850'
                                        }\`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={\`w-2.5 h-2.5 rounded-full \${player.isEliminated ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}\`}></div>
                                            <span className="text-xl bg-slate-950 w-7 h-7 rounded-lg flex items-center justify-center border border-slate-900/60">{player.avatar || "🕵️‍♀️"}</span>
                                            <span className="font-bold text-sm text-slate-200">{player.name}</span>
                                        </div>
                                        
                                        {!player.isEliminated && (
                                            <button 
                                                onClick={() => eliminatePlayerAction(player)}
                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold active:scale-95 transition-all"
                                            >
                                                Éliminer
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCREEN GUESS WHITE */}
            {screen === 'guess_white' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in">
                    <div className="my-auto space-y-6">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 text-4xl border border-red-500/20">
                            <i className="fa-solid fa-masks-theater animate-pulse"></i>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white">Dernière Chance !</h3>
                            <p className="text-red-400 font-bold text-sm">
                                <span className="mr-2 text-2xl">{eliminatedPlayer?.avatar}</span>Mr. White ({eliminatedPlayer?.name}) a été éliminé.
                            </p>
                            <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                                S'il trouve le mot exact détenu par les civils, il gagne immédiatement la partie avec ses alliés !
                            </p>
                        </div>

                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 space-y-4 animate-scale-up">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Mr. White a-t-il deviné le mot correct ?</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => handleMrWhiteGuess(false)}
                                    className="bg-slate-800 hover:bg-slate-750 text-white font-bold py-2.5 px-4 rounded-xl text-xs active:scale-95"
                                >
                                    Faux ❌
                                </button>
                                <button 
                                    onClick={() => handleMrWhiteGuess(true)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-emerald-600/20 active:scale-95"
                                >
                                    Exact ! 🎉
                                </button>
                            </div>
                            <div className="text-[11px] text-slate-400 bg-slate-950 py-2 rounded-xl">Le mot des civils était : <strong className="text-emerald-400">{activeWordPair.civil}</strong></div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCREEN GAME OVER */}
            {screen === 'gameover' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in">
                    <div className="my-auto space-y-5">
                        {winner === 'civilians' ? (
                            <div className="space-y-3">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-4xl border border-emerald-500/20">
                                    <i className="fa-solid fa-trophy animate-bounce"></i>
                                </div>
                                <h2 className="text-3xl font-black text-emerald-400">Victoire des Civils !</h2>
                                <p className="text-slate-300 text-xs max-w-xs mx-auto leading-relaxed">Les citoyens ont repoussé la menace et conservé leur secret !</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 text-4xl border border-red-500/20">
                                    <i className="fa-solid fa-user-ninja"></i>
                                </div>
                                <h2 className="text-3xl font-black text-red-400">Victoire des Infiltrés !</h2>
                                <p className="text-slate-300 text-xs max-w-xs mx-auto leading-relaxed">L'équipe de l'ombre s'est parfaitement imposée sous votre nez !</p>
                            </div>
                        )}

                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 text-left max-h-52 overflow-y-auto space-y-1.5 shadow-inner">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Répartition finale :</p>
                            {players.map(p => (
                                <div key={p.id} className="flex items-center justify-between py-1 text-xs border-b border-slate-850/50 last:border-0 animate-fade-in">
                                    <span className="font-bold text-slate-300 flex items-center gap-2">
                                        <span className="text-lg bg-slate-950 w-7 h-7 rounded flex items-center justify-center">{p.avatar || "🕵️‍♀️"}</span>
                                        {p.name} {p.isEliminated ? '💀' : ''}
                                    </span>
                                    <span className={\`font-extrabold text-[9px] px-2 py-1 rounded-md \${
                                        p.role === 'civilian' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' 
                                        : p.role === 'undercover' 
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' 
                                            : 'bg-red-500/10 text-red-400 border border-red-500/10'
                                    }\`}>
                                        {p.role === 'civilian' ? \`Civil (\${p.word})\` : p.role === 'undercover' ? \`Infiltré (\${p.word})\` : "Mr. White"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl text-[11px] text-slate-400">
                            Les mots du tour : <span className="text-emerald-400 font-bold">{activeWordPair.civil}</span> vs <span className="text-amber-400 font-bold">{activeWordPair.undercover}</span>
                        </div>
                    </div>

                    <button 
                        onClick={resetGameToSetup}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-sm"
                    >
                        Relancer une partie
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
`;

fs.writeFileSync(path.join('src', 'App.jsx'), appJsx);
console.log("📄 Fichier créé : src/App.jsx");

const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

fs.writeFileSync(path.join('src', 'main.jsx'), mainJsx);
console.log("📄 Fichier créé : src/main.jsx");

const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  background-color: #0b0f19;
  font-family: 'Outfit', sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
`;

fs.writeFileSync(path.join('src', 'index.css'), indexCss);
console.log("📄 Fichier créé : src/index.css");

console.log("\n✨ Régénération et configuration de l'IA terminées avec succès !");
console.log("👉 Pour démarrer ton projet en local, écris ces commandes dans ton terminal :");
console.log("   1. npm install");
console.log("   2. npm run dev");