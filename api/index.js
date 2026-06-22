import express from 'express';
import cors from 'cors';
import { INITIAL_THEMES } from './database/words.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || "";

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
        if (keywords.some(word => text.includes(word))) return category;
    }
    return "autre";
};

const callGeminiWithRetry = async (civil, undercover) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{
            parts: [{
                text: `Vérifie si la paire de mots suivante est de bonne qualité pour le jeu Undercover (un mot secret pour le civil et un autre proche mais différent pour l'infiltré, par exemple 'Coca-Cola' et 'Pepsi').\n\nMot Civil : "${civil}"\nMot Infiltré : "${undercover}"\n\nRéponds STRICTEMENT en JSON avec : valid (boolean), reason (string, max 15 mots, en français), category (une des valeurs : nourriture, pop_culture, hardcore, vie_quotidienne, fun_soiree, autre).`
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
            // retry silencieusement
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
            themeList[key] = { name: theme.name, icon: theme.icon, color: theme.color, count: theme.pairs.length };
        });
        res.json({ success: true, themes: themeList });
    } catch (error) {
        res.status(500).json({ success: false, error: "Impossible de charger les thématiques." });
    }
});

app.get('/api/random-pair/:theme', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { theme } = req.params;
    try {
        if (INITIAL_THEMES[theme]) {
            const pairs = INITIAL_THEMES[theme].pairs;
            const selectedPair = pairs[Math.floor(Math.random() * pairs.length)];
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
        if (apiKey) {
            result = await callGeminiWithRetry(civil.trim(), undercover.trim());
        } else {
            const localCat = getCategoryByKeywords(civil.trim(), undercover.trim());
            result = { valid: true, category: localCat, reason: `Validé localement (hors-ligne) dans la catégorie "${localCat}".` };
        }
        res.json({ success: true, valid: result.valid, category: result.category || 'autre', reason: result.reason });
    } catch (error) {
        res.status(500).json({ success: false, error: "Une erreur est survenue lors de la validation : " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Serveur Undercover actif en local sur http://localhost:${PORT}`);
});

export default app;