import { INITIAL_THEMES } from '../../database/words.js';

export default function handler(req, res) {
    const { theme } = req.query;
    if (INITIAL_THEMES[theme]) {
        const pairs = INITIAL_THEMES[theme].pairs;
        res.status(200).json({ success: true, pair: pairs[Math.floor(Math.random() * pairs.length)] });
    } else {
        res.status(404).json({ success: false, error: "Thème non trouvé" });
    }
}