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
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    contents: [{ parts: [{ text: `Valide cette paire Undercover : ${civil} et ${undercover}. Réponds en JSON {"valid": true, "category": "...", "reason": "..."}` }] }] 
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur API Google :", errorData);
                throw new Error("Erreur de communication avec l'IA");
            }

            const data = await response.json();
            
            // Sécurité : on vérifie que la réponse contient bien ce qu'on attend
            if (!data.candidates || !data.candidates[0].content.parts[0].text) {
                throw new Error("Réponse de l'IA mal formée");
            }

            const text = data.candidates[0].content.parts[0].text;
            return res.status(200).json(JSON.parse(text));
            
        } else {
            res.status(200).json({ valid: true, category: getCategoryByKeywords(civil, undercover), reason: "Validation locale" });
        }
    } catch (e) {
        console.error("Détail de l'erreur :", e);
        res.status(500).json({ success: false, error: e.message });
    }
}