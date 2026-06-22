import { INITIAL_THEMES } from '../database/words.js';

export default function handler(req, res) {
    const themeList = {};
    Object.entries(INITIAL_THEMES).forEach(([key, theme]) => {
        themeList[key] = { name: theme.name, icon: theme.icon, count: theme.pairs.length };
    });
    res.status(200).json({ success: true, themes: themeList });
}