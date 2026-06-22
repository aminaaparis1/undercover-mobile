// api/custom-pair.js
const getCategoryByKeywords = (civil, undercover) => {
    const text = (civil + " " + undercover).toLowerCase();
    const categories = {
        nourriture: ["coca", "pepsi", "burger", "pizza", "café", "thé", "raclette", "fruit", "légume"],
        pop_culture: ["harry", "potter", "marvel", "star", "film", "série", "jeu", "console"],
        hardcore: ["temps", "vide", "néant", "confiance", "mémoire", "rêve", "liberté", "secret"],
        vie_quotidienne: ["lit", "canapé", "ordinateur", "téléphone", "voiture", "maison"],
        fun_soiree: ["soirée", "vodka", "bar", "karaoké", "alcool", "fête"]
    };
    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(word => text.includes(word))) return cat;
    }
    return "autre";
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

    const { civil, undercover } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        if (apiKey) {
            // Logique Gemini simplifiée pour Vercel
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: `Valide cette paire Undercover : ${civil} et ${undercover}. Réponds en JSON {"valid": true, "category": "..."}` }] }] })
            });
            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            return res.status(200).json(JSON.parse(text));
        } else {
            // Fallback local
            res.status(200).json({ valid: true, category: getCategoryByKeywords(civil, undercover), reason: "Validation locale" });
        }
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
}