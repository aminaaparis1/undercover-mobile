import { useState, useEffect } from 'react';
import { FaPizzaSlice, FaFilm, FaPlane, FaFutbol, FaPalette, FaTools, FaFolder, FaGamepad, FaHome, FaGlassCheers, FaTv, FaMusic, FaCocktail, FaBriefcase, FaLaptop, FaPaw, FaStar, FaBrain, FaLayerGroup, FaDice } from 'react-icons/fa';

// En production (Vercel), l'API est sur la même URL (/api). En local, on interroge le port 3001.
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

// Génération d'un pool d'avatars très inclusifs, ultra colorés et premium (Style Micah de DiceBear)
const AVATARS_POOL = [
    "Alex", "Sam", "Charlie", "Jordan", "Taylor", "Casey", "Riley", "Morgan", 
    "Avery", "Quinn", "Parker", "Reese", "Rowan", "Blake", "Emerson", "Finley"
].map(seed => `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc,b3e5fc,c8e6c9`);

const CATEGORY_STYLES = {
    "nourriture": { icon: FaPizzaSlice, bg: "from-orange-400 via-orange-500 to-red-500", glow: "shadow-orange-500/40" },
    "boissons": { icon: FaCocktail, bg: "from-pink-400 via-pink-500 to-rose-500", glow: "shadow-pink-500/40" },
    "cinema": { icon: FaFilm, bg: "from-indigo-400 via-indigo-500 to-purple-600", glow: "shadow-indigo-500/40" },
    "series": { icon: FaTv, bg: "from-violet-400 via-violet-500 to-fuchsia-600", glow: "shadow-violet-500/40" },
    "jeux_video": { icon: FaGamepad, bg: "from-blue-400 via-blue-500 to-cyan-500", glow: "shadow-blue-500/40" },
    "musique": { icon: FaMusic, bg: "from-amber-400 via-amber-500 to-orange-500", glow: "shadow-amber-500/40" },
    "voyage": { icon: FaPlane, bg: "from-sky-400 via-sky-500 to-blue-600", glow: "shadow-sky-500/40" },
    "sport": { icon: FaFutbol, bg: "from-green-400 via-emerald-500 to-teal-600", glow: "shadow-emerald-500/40" },
    "animaux": { icon: FaPaw, bg: "from-yellow-500 via-yellow-600 to-amber-700", glow: "shadow-yellow-600/40" },
    "metiers": { icon: FaBriefcase, bg: "from-slate-400 via-slate-500 to-slate-700", glow: "shadow-slate-500/40" },
    "culture": { icon: FaPalette, bg: "from-pink-400 via-rose-500 to-red-500", glow: "shadow-rose-500/40" },
    "technologie": { icon: FaLaptop, bg: "from-blue-500 via-blue-600 to-indigo-700", glow: "shadow-blue-600/40" },
    "custom": { icon: FaTools, bg: "from-yellow-400 via-amber-500 to-orange-500", glow: "shadow-amber-600/40" },
    "hardcore": { icon: FaBrain, bg: "from-purple-400 via-purple-500 to-indigo-600", glow: "shadow-purple-500/40" },
    "quotidien": { icon: FaHome, bg: "from-teal-400 via-teal-500 to-emerald-600", glow: "shadow-teal-500/40" },
    "soiree": { icon: FaGlassCheers, bg: "from-rose-400 via-rose-500 to-pink-600", glow: "shadow-rose-500/40" },
    "divers": { icon: FaLayerGroup, bg: "from-slate-500 via-slate-600 to-slate-800", glow: "shadow-slate-600/40" },
    "default": { icon: FaStar, bg: "from-fuchsia-400 via-fuchsia-500 to-purple-600", glow: "shadow-fuchsia-500/40" }
};

const getCategoryStyles = (key, name = "") => {
    const textToSearch = `${key} ${name}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (textToSearch.includes('hardcore') || textToSearch.includes('abstrait')) return CATEGORY_STYLES.hardcore;
    if (textToSearch.includes('quotidienne') || textToSearch.includes('vie')) return CATEGORY_STYLES.quotidien;
    if (textToSearch.includes('soiree') || textToSearch.includes('fun')) return CATEGORY_STYLES.soiree;
    if (textToSearch.includes('divers') || textToSearch.includes('autre')) return CATEGORY_STYLES.divers;
    
    if (textToSearch.includes('nourriture') || textToSearch.includes('food')) return CATEGORY_STYLES.nourriture;
    if (textToSearch.includes('boisson') || textToSearch.includes('drink')) return CATEGORY_STYLES.boissons;
    if (textToSearch.includes('cinema') || textToSearch.includes('pop')) return CATEGORY_STYLES.cinema;
    if (textToSearch.includes('serie') || textToSearch.includes('tv')) return CATEGORY_STYLES.series;
    if (textToSearch.includes('geek') || textToSearch.includes('jeu')) return CATEGORY_STYLES.jeux_video;
    if (textToSearch.includes('musique') || textToSearch.includes('music')) return CATEGORY_STYLES.musique;
    if (textToSearch.includes('voyage') || textToSearch.includes('travel')) return CATEGORY_STYLES.voyage;
    if (textToSearch.includes('sport')) return CATEGORY_STYLES.sport;
    if (textToSearch.includes('animaux') || textToSearch.includes('animal')) return CATEGORY_STYLES.animaux;
    if (textToSearch.includes('metier') || textToSearch.includes('job')) return CATEGORY_STYLES.metiers;
    if (textToSearch.includes('culture') || textToSearch.includes('art')) return CATEGORY_STYLES.culture;
    if (textToSearch.includes('techno') || textToSearch.includes('tech')) return CATEGORY_STYLES.technologie;
    if (textToSearch.includes('custom')) return CATEGORY_STYLES.custom;

    return CATEGORY_STYLES.default; 
};

function App() {
    const [screen, setScreen] = useState('home'); 
    const [setupStep, setSetupStep] = useState('category'); 
    const [themes, setThemes] = useState({});
    
    const [defaultPlayers, setDefaultPlayers] = useState(() => {
        const saved = localStorage.getItem('undercover_default_players_v2');
        return saved ? JSON.parse(saved) : [];
    });

    const [localCustomPairs, setLocalCustomPairs] = useState(() => {
        const saved = localStorage.getItem('undercover_local_custom_pairs');
        return saved ? JSON.parse(saved) : [];
    });

    const [players, setPlayers] = useState(() => {
        const saved = localStorage.getItem('undercover_default_players_v2');
        return saved ? JSON.parse(saved) : [];
    });

    const [newPlayerName, setNewPlayerName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS_POOL[0]); 
    const [selectedTheme, setSelectedTheme] = useState("random"); 
    const [playedThemeName, setPlayedThemeName] = useState("");
    const [undercoverCount, setUndercoverCount] = useState(1);
    const [mrWhiteCount, setMrWhiteCount] = useState(0);

    const [activeWordPair, setActiveWordPair] = useState({ civil: "", undercover: "" });
    const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
    const [revealStep, setRevealStep] = useState('pass'); 
    const [startingPlayer, setStartingPlayer] = useState("");
    const [startingPlayerAvatar, setStartingPlayerAvatar] = useState("");
    const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
    const [winner, setWinner] = useState(null); 

    const [customCivil, setCustomCivil] = useState("");
    const [customUndercover, setCustomUndercover] = useState("");
    const [showCustomManager, setShowCustomManager] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const fetchThemes = async () => {
        try {
            const response = await fetch(`${API_URL}/themes?_t=${Date.now()}`);
            const data = await response.json();

            console.log("PAIR API:", JSON.stringify(data, null, 2));

            if (data.success) {
                const mergedThemes = { ...data.themes };
                
                localCustomPairs.forEach(pair => {
                    const cat = pair.category || 'autre';
                    if (mergedThemes[cat]) {
                        mergedThemes[cat].count = (mergedThemes[cat].count || 0) + 1;
                    }
                });

                mergedThemes['custom'] = {
                    name: "Vos Mots",
                    icon: "fa-star",
                    color: "from-yellow-500 to-amber-600",
                    count: localCustomPairs.length
                };

                setThemes(mergedThemes);
            }
        } catch (error) {
            triggerAlert("Impossible de se connecter au serveur backend.", "Erreur Réseau");
        }
    };

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
        
        const currentIdx = AVATARS_POOL.indexOf(selectedAvatar);
        const nextIdx = (currentIdx + 1) % AVATARS_POOL.length;
        setSelectedAvatar(AVATARS_POOL[nextIdx]);
    };

    const removePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const resetPlayersToSavedDefault = () => {
        if (defaultPlayers.length === 0) {
            triggerAlert("Vous n'avez pas encore enregistré de liste par défaut. Ajoutez des joueurs puis cliquez sur 'Enregistrer'.", "Aucune liste");
            return;
        }
        setPlayers(defaultPlayers.map(p => ({ ...p, role: "", word: "", isEliminated: false })));
        setNewPlayerName("");
        triggerAlert("Votre liste par défaut a été rechargée avec succès !", "Liste Restaurée");
    };

    const saveCurrentListAsDefault = () => {
        if (players.length < 3) {
            triggerAlert("Il faut au moins 3 joueurs pour enregistrer une configuration par défaut !", "Action Impossible");
            return;
        }
        const cleanList = players.map((p, idx) => ({
            id: idx + 1,
            name: p.name,
            avatar: p.avatar,
            role: "",
            word: "",
            isEliminated: false
        }));
        setDefaultPlayers(cleanList);
        localStorage.setItem('undercover_default_players_v2', JSON.stringify(cleanList));
        triggerAlert("Cette configuration a été enregistrée comme votre nouvelle liste par défaut sur ce téléphone !", "Sauvegarde Réussie");
    };

    const deleteDefaultList = () => {
        setDefaultPlayers([]);
        localStorage.removeItem('undercover_default_players_v2');
        triggerAlert("Votre groupe habituel a été définitivement supprimé de l'appareil.", "Sauvegarde Effacée");
    };

    const clearPlayersList = () => {
        setPlayers([]);
        setNewPlayerName("");
    };

    const resetGameToSetup = () => {
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
            const response = await fetch(`${API_URL}/custom-pair`, {
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
                    const updatedPairs = [...localCustomPairs, newPair];
                    setLocalCustomPairs(updatedPairs);
                    localStorage.setItem('undercover_local_custom_pairs', JSON.stringify(updatedPairs));
                    setCustomCivil("");
                    setCustomUndercover("");
                    triggerAlert(`Validé par l'IA ! Enregistré dans la catégorie "${validatedCategory}".\n\nRaison : "${data.reason}"`, "Paire Acceptée");
                } else {
                    triggerAlert(`Rejeté par la validation : "${data.reason}"`, "Paire Refusée");
                }
            } else {
                triggerAlert(data.error || "Erreur d'enregistrement.", "Erreur");
            }
        } catch (error) {
            setIsAnalyzing(false);
            triggerAlert("Connexion impossible avec le serveur.", "Erreur");
        }
    };

    const clearCustomWords = () => {
        setLocalCustomPairs([]);
        localStorage.removeItem('undercover_local_custom_pairs');
        triggerAlert("Vos mots personnalisés locaux ont été effacés.", "Terminé");
    };

    const startGame = async () => {
        if (players.length < 3) {
            triggerAlert("Il faut au moins 3 joueurs pour lancer la partie !", "Démarrage Impossible");
            return;
        }

        let themeToFetch = selectedTheme;
        if (selectedTheme === 'random') {
            const availableKeys = Object.keys(themes).filter(k => k !== 'custom');
            if (availableKeys.length > 0) {
                themeToFetch = availableKeys[Math.floor(Math.random() * availableKeys.length)];
            } else {
                themeToFetch = 'nourriture';
            }
        }

        const localPairsForTheme = localCustomPairs.filter(p => p.category === themeToFetch);
        const serverThemeCount = themes[themeToFetch]?.count - localPairsForTheme.length;

        let chosenPair = null;

        if (themeToFetch === 'custom') {
            if (localCustomPairs.length === 0) {
                triggerAlert("Votre stockage de mots personnalisés est vide ! Ajoutez-en d'abord.", "Attention");
                return;
            }
            chosenPair = localCustomPairs[Math.floor(Math.random() * localCustomPairs.length)];
        } else {
            const totalWords = (serverThemeCount || 0) + localPairsForTheme.length;
            if (totalWords === 0) {
                triggerAlert("Cette thématique est vide.", "Attention");
                return;
            }
            const randIndex = Math.floor(Math.random() * totalWords);
            if (randIndex < localPairsForTheme.length) {
                chosenPair = localPairsForTheme[randIndex];
            } else {
                try {
                    const response = await fetch(`${API_URL}/random-pair/${themeToFetch}?_t=${Date.now()}`);
                    const data = await response.json();
                    if (data.success) {
    chosenPair = data.pair;
}
                } catch (err) {
                    console.warn("Échec de connexion serveur.");
                }
            }
        }

        if (!chosenPair) {
            triggerAlert("Erreur de récupération d'une paire de mots.", "Erreur");
            return;
        }

        setActiveWordPair(chosenPair);
        
        const themeName = themes[themeToFetch]?.name || "Aléatoire";
        const emojiIndex = themeName.indexOf(' ');
        setPlayedThemeName(emojiIndex !== -1 ? themeName.substring(emojiIndex + 1) : themeName);

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
        setStartingPlayerAvatar(randomCivil.avatar);
        setScreen('reveal');
    };

    const handleRevealWord = () => setRevealStep('show');
    const handleNextReveal = () => {
        if (currentRevealIndex < players.length - 1) {
            setCurrentRevealIndex(currentRevealIndex + 1);
            setRevealStep('pass');
        } else setScreen('gameplay');
    };

    const eliminatePlayerAction = (player) => {
        const updatedPlayers = players.map(p => p.id === player.id ? { ...p, isEliminated: true } : p);
        setPlayers(updatedPlayers);
        setEliminatedPlayer(player);
        
        setTimeout(() => {
            if (player.role === 'mr_white') setScreen('guess_white');
            else checkWinConditions(updatedPlayers);
        }, 800);
    };

    const handleMrWhiteGuess = (isCorrect) => {
        if (isCorrect) {
            setWinner('undercovers_and_white');
            setScreen('gameover');
        } else {
            triggerAlert(`Ce n'était pas le mot des civils. Mr. White est éliminé ! Le mot était : "${activeWordPair.civil}"`, "Fin");
            checkWinConditions(players);
        }
    };

    const checkWinConditions = (currentPlayers) => {
        const survivors = currentPlayers.filter(p => !p.isEliminated);
        const activeCivilians = survivors.filter(p => p.role === 'civilian').length;
        const activeUndercovers = survivors.filter(p => p.role === 'undercover').length;
        const activeMrWhites = survivors.filter(p => p.role === 'mr_white').length;

        if (activeUndercovers === 0 && activeMrWhites === 0) {
            setWinner('civilians'); setScreen('gameover'); return;
        }
        if (activeUndercovers + activeMrWhites >= activeCivilians) {
            setWinner('undercovers_and_white'); setScreen('gameover'); return;
        }

        const survivorsList = survivors.filter(p => p.role === 'civilian');
        if (survivorsList.length > 0) {
            const nextStarter = survivorsList[Math.floor(Math.random() * survivorsList.length)];
            setStartingPlayer(nextStarter.name);
            setStartingPlayerAvatar(nextStarter.avatar);
        }
        setScreen('gameplay');
    };

    return (
        <div className="w-full max-w-md h-screen sm:h-[820px] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative shadow-2xl sm:rounded-[40px] sm:border-[12px] sm:border-slate-800 animate-fade-in">
            
            {/* STYLES PERSONNALISÉS POUR LES ANIMATIONS */}
            <style>{`
                /* Rotation de teinte infaillible (Parcourt toutes les couleurs) */
                @keyframes colorCycle {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                .animate-color-cycle {
                    animation: colorCycle 6s linear infinite;
                }
                
                /* Flottement du Logo */
                @keyframes floatLogo {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                .animate-float {
                    animation: floatLogo 4s ease-in-out infinite;
                }

                /* Animation d'élimination Dramatique */
                @keyframes eliminateCard {
                    0% { transform: scale(1); filter: grayscale(0%); }
                    30% { transform: scale(1.05) rotate(-2deg); background-color: #7f1d1d; filter: grayscale(30%); }
                    100% { transform: scale(0.95); filter: grayscale(100%); opacity: 0.8; }
                }
                .animate-eliminate-card {
                    animation: eliminateCard 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }

                /* Pop in du crâne */
                @keyframes popSkull {
                    0% { opacity: 0; transform: scale(0.2); }
                    60% { transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-pop {
                    animation: popSkull 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>

            {/* ALERTS */}
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
                        <button onClick={() => setCustomAlert(null)} className="w-full bg-violet-600 hover:bg-violet-500 py-2.5 rounded-xl text-sm font-bold transition-all text-white active:scale-95">
                            Compris
                        </button>
                    </div>
                </div>
            )}

            {/* SCREEN ACCUEIL (DYNAMIQUE) */}
            {screen === 'home' && (
                <div className="flex-1 flex flex-col justify-between p-6">
                    <div className="flex flex-col items-center justify-center flex-1 space-y-10">
                        {/* Logo Animé avec Hue-Rotate pour un cycle de couleurs garanti */}
                        <div className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-[40px] flex items-center justify-center shadow-[0_15px_40px_rgba(139,92,246,0.3)] animate-float animate-color-cycle border-t-4 border-l-4 border-white/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2 mix-blend-overlay"></div>
                            <i className="fa-solid fa-user-secret text-[80px] sm:text-[100px] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] z-10"></i>
                        </div>
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-color-cycle">UNDERCOVER</h1>
                            <p className="text-slate-300 text-base font-light px-4 leading-relaxed">
                                Un téléphone, un mot secret, un intrus caché. Qui saura bluffer pour l'emporter ?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => { setScreen('setup'); setSetupStep('category'); }} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 active:from-violet-700 active:to-fuchsia-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-fuchsia-900/30 active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                            <i className="fa-solid fa-play"></i> Lancer la Soirée
                        </button>
                        <button onClick={() => setShowCustomManager(true)} className="w-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-100 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                            <i className="fa-solid fa-pen-to-square text-amber-400"></i> Rajoute tes mots secrets ({localCustomPairs.length})
                        </button>
                    </div>
                </div>
            )}

            {/* SCREEN GESTION DES MOTS */}
            {showCustomManager && (
                <div className="absolute inset-0 bg-slate-950/95 z-40 flex flex-col justify-between p-6 animate-fade-in backdrop-blur-md">
                    <div className="space-y-4 overflow-y-auto flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <i className="fa-solid fa-star text-amber-400"></i> Vos Mots Secrets
                            </h3>
                            <button onClick={() => setShowCustomManager(false)} className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 active:scale-90">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {isAnalyzing ? (
                            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8 text-center space-y-4 animate-pulse">
                                <div className="w-14 h-14 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto">
                                    <i className="fa-solid fa-brain text-violet-400 text-3xl animate-bounce"></i>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-white">Analyse de vos mots...</h4>
                                    <p className="text-xs text-slate-400">L'IA vérifie la cohérence du doublon.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400">Mot du Civil</label>
                                    <input type="text" placeholder="Ex: Coca-Cola" value={customCivil} onChange={(e) => setCustomCivil(e.target.value)} className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400">Mot de l'Infiltré</label>
                                    <input type="text" placeholder="Ex: Pepsi" value={customUndercover} onChange={(e) => setCustomUndercover(e.target.value)} className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                                </div>
                                <button onClick={addCustomWordPair} className="w-full bg-violet-600 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all">
                                    Faire Valider & Ajouter
                                </button>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1 mt-4">
                            <span>Paires locales ({localCustomPairs.length})</span>
                            {localCustomPairs.length > 0 && (
                                <button onClick={clearCustomWords} className="text-red-400 text-[10px] uppercase hover:underline">Vider l'appareil</button>
                            )}
                        </div>
                    </div>
                    <button onClick={() => setShowCustomManager(false)} className="w-full bg-slate-900 border border-slate-800 text-white font-bold py-3.5 rounded-2xl text-sm mt-4 active:scale-95">
                        Retour à l'accueil
                    </button>
                </div>
            )}

            {/* SCREEN SETUP MULTI-ÉTAPES */}
            {screen === 'setup' && (
                <div className="flex-1 flex flex-col justify-between p-5 overflow-hidden animate-fade-in">
                    
                    {/* Header NavBar Setup */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <button onClick={() => {
                            if (setupStep === 'category') setScreen('home');
                            else if (setupStep === 'players') setSetupStep('category');
                            else if (setupStep === 'roles') setSetupStep('players');
                        }} className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 active:scale-90">
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
                                {setupStep === 'roles' && "Équilibrage des Rôles"}
                            </p>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center"><i className="fa-solid fa-layer-group text-slate-700 text-sm"></i></div>
                    </div>

                    {/* SETUP - Étape 1 : Catégories */}
                    {setupStep === 'category' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                <div className="grid grid-cols-2 gap-3 pb-4 px-2">
                                    
                                    <button 
                                        onClick={() => setSelectedTheme("random")} 
                                        className={`relative overflow-hidden h-40 p-3 rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.95] shadow-lg shadow-cyan-950/50 bg-gradient-to-br from-slate-900 via-slate-950 to-black
                                            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:to-transparent before:h-1/2
                                            border-t border-white/15 border-x border-white/5 border-b border-black/40
                                            ${selectedTheme === "random" ? 'ring-4 ring-white scale-[1.02] z-20' : 'z-10'}
                                        `}
                                    >
                                        <FaDice className="text-5xl text-cyan-400 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-10 shrink-0" />
                                        <div className="text-center z-10 px-1">
                                            <p className="text-[14px] font-bold text-white leading-tight drop-shadow-sm">Aléatoire</p>
                                            <p className="text-[11px] text-cyan-400/80 font-bold uppercase mt-1">Toutes</p>
                                        </div>
                                    </button>

                                    {Object.entries(themes).map(([key, theme]) => {
                                        if (theme.count === 0 && key !== 'custom') return null;
                                        
                                        const style = getCategoryStyles(key, theme.name);
                                        const IconComponent = style.icon;
                                        
                                        let cleanName = (theme.name || key).replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();

                                        if (cleanName.toLowerCase().includes('hardcore') || cleanName.toLowerCase().includes('abstrait')) {
                                            cleanName = "Abstrait";
                                        }

                                        return (
                                            <button 
                                                key={key} 
                                                onClick={() => setSelectedTheme(key)} 
                                                className={`relative overflow-hidden h-40 p-3 rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.95] shadow-lg ${style.glow} bg-gradient-to-br ${style.bg}
                                                    before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:h-1/2
                                                    border-t border-white/15 border-x border-white/5 border-b border-black/40
                                                    ${selectedTheme === key ? 'ring-4 ring-white scale-[1.02] z-20' : 'z-10'}
                                                `}
                                            >
                                                <IconComponent className="text-5xl text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)] z-10 shrink-0" />
                                                <div className="text-center z-10 px-1 w-full">
                                                    <p className="text-[14px] font-bold text-white leading-tight drop-shadow-sm text-balance">{cleanName}</p>
                                                    <p className="text-[11px] text-white/80 font-bold uppercase mt-1">{theme.count} paires</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <button onClick={() => setSetupStep('players')} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all text-sm mt-2 flex items-center justify-center gap-2">
                                Continuer <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                    )}

                    {/* SETUP - Étape 2 : Joueurs */}
                    {setupStep === 'players' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            <div className="flex-1 flex flex-col overflow-hidden space-y-4 pr-1">
                                
                                <div className="px-1">
                                    <h3 className="text-sm font-bold uppercase tracking-wider flex items-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                        <i className="fa-solid fa-users mr-2 text-violet-400"></i> Équipe ({players.length})
                                    </h3>
                                </div>
                                
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-2.5 shadow-lg flex flex-col gap-2.5">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                                            <i className="fa-solid fa-lightbulb text-yellow-400"></i> Gérez votre groupe habituel
                                        </span>
                                        {defaultPlayers.length > 0 && (
                                            <button onClick={deleteDefaultList} className="text-[10px] text-red-400 hover:text-white font-bold bg-red-500/10 hover:bg-red-500 px-2 py-1 rounded-md border border-red-500/30 active:scale-95 transition-all">
                                                <i className="fa-solid fa-trash mr-1"></i> Supprimer
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={resetPlayersToSavedDefault} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold uppercase bg-slate-900 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95">
                                            <i className="fa-solid fa-cloud-arrow-down text-base"></i> Charger
                                        </button>
                                        <button onClick={saveCurrentListAsDefault} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold uppercase bg-slate-900 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95">
                                            <i className="fa-solid fa-floppy-disk text-base"></i> Mémoriser
                                        </button>
                                        <button onClick={clearPlayersList} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold uppercase bg-slate-900 text-slate-400 border border-slate-500/50 hover:bg-slate-600 hover:text-white transition-all active:scale-95">
                                            <i className="fa-solid fa-broom text-base"></i> Vider
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-violet-900 to-indigo-900 border-2 border-violet-500 p-3 rounded-2xl space-y-3 shrink-0 shadow-lg">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={newPlayerName} 
                                            onChange={(e) => setNewPlayerName(e.target.value)} 
                                            onKeyDown={(e) => e.key === 'Enter' && addPlayer()} 
                                            placeholder="Nouveau joueur..." 
                                            maxLength="14" 
                                            className="flex-1 bg-indigo-950 border border-violet-700 rounded-xl px-4 py-2.5 text-white placeholder-violet-300 focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 text-sm transition-all shadow-inner" 
                                        />
                                        <button onClick={addPlayer} className="bg-gradient-to-r from-fuchsia-500 to-violet-500 active:from-fuchsia-600 active:to-violet-600 text-white px-5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95">
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none snap-x">
                                            {AVATARS_POOL.map((avatar) => (
                                                <button key={avatar} onClick={() => setSelectedAvatar(avatar)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all snap-center shrink-0 active:scale-90 border-2 overflow-hidden ${selectedAvatar === avatar ? 'border-white bg-fuchsia-500 scale-110 shadow-[0_0_15px_rgba(232,121,249,0.6)]' : 'border-transparent bg-indigo-950 hover:bg-indigo-800'}`}>
                                                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    <div className="grid grid-cols-2 gap-4 pb-2 px-1">
                                        {players.length === 0 && (
                                            <div className="col-span-2 text-center py-8 text-slate-400 text-sm italic bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
                                                Aucun joueur dans l'équipe...
                                            </div>
                                        )}
                                        
                                        {players.map((player, index) => {
                                            const cardColors = [
                                                "from-cyan-400 to-blue-500 shadow-cyan-500/40",
                                                "from-fuchsia-400 to-purple-500 shadow-fuchsia-500/40",
                                                "from-emerald-400 to-teal-500 shadow-emerald-500/40",
                                                "from-rose-400 to-orange-500 shadow-rose-500/40",
                                                "from-indigo-400 to-violet-500 shadow-violet-500/40"
                                            ];
                                            const colorTheme = cardColors[index % cardColors.length];

                                            return (
                                                <div key={player.id} className={`relative overflow-hidden bg-gradient-to-br rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg animate-fade-in group ${colorTheme} 
                                                    before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:h-1/2
                                                    border-t border-white/40 border-x border-white/20`}
                                                >
                                                    <button 
                                                        onClick={() => removePlayer(player.id)} 
                                                        className="absolute top-2 right-2 w-7 h-7 bg-black/30 hover:bg-red-500 text-white/90 hover:text-white rounded-full flex items-center justify-center text-[10px] shadow-sm border border-white/20 hover:border-red-400 transition-all active:scale-90 z-20 backdrop-blur-sm"
                                                    >
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                    
                                                    <div className="w-16 h-16 bg-white/20 rounded-2xl overflow-hidden border border-white/50 shrink-0 shadow-inner z-10 mt-1">
                                                        <img src={player.avatar || AVATARS_POOL[0]} alt={player.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    
                                                    <span className="font-bold text-[14px] text-white truncate w-full text-center px-1 drop-shadow-md z-10">{player.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => {
                                if (players.length < 3) return triggerAlert("Il vous faut au moins 3 joueurs pour continuer !", "Action Impossible");
                                setSetupStep('roles');
                            }} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-fuchsia-900/30 active:scale-95 transition-all text-sm mt-3 flex items-center justify-center gap-2 shrink-0">
                                Continuer <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                    )}

                    {/* SETUP - Étape 3 : Rôles */}
                    {setupStep === 'roles' && (
                        <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                            
                            <div className="px-1 mb-2 shrink-0">
                                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                    <i className="fa-solid fa-scale-balanced mr-2 text-violet-400"></i> Équilibrage de la partie
                                </h3>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center gap-5 px-1 my-auto">
                                
                                <div className="relative overflow-hidden w-52 aspect-square bg-gradient-to-br from-amber-400 to-orange-500 rounded-[28px] p-4 shadow-lg shadow-orange-500/30 flex flex-col items-center justify-between text-center group 
                                    before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2
                                    border-t border-white/50 border-x border-white/20">
                                    
                                    <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center text-xl text-white shadow-inner shrink-0 z-10 border border-white/40 backdrop-blur-sm">
                                        <i className="fa-solid fa-user-secret drop-shadow-md"></i>
                                    </div>
                                    
                                    <div className="z-10 flex flex-col items-center justify-center">
                                        <p className="text-base font-black text-white drop-shadow-md leading-tight">Infiltrés</p>
                                        <p className="text-[10px] text-white/90 font-medium mt-1 px-1 leading-tight">Ont un mot alternatif</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1 rounded-xl border border-white/20 z-10 shrink-0 shadow-inner w-full justify-between">
                                        <button onClick={() => setUndercoverCount(Math.max(1, undercoverCount - 1))} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white text-lg font-black transition-all active:scale-90 flex items-center justify-center">
                                            -
                                        </button>
                                        <span className="font-black text-white text-base w-4 text-center drop-shadow-md">{undercoverCount}</span>
                                        <button onClick={() => setUndercoverCount(Math.min(Math.max(1, Math.floor((players.length - 1) / 3)), undercoverCount + 1))} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white text-lg font-black transition-all active:scale-90 flex items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden w-52 aspect-square bg-gradient-to-br from-rose-400 to-red-500 rounded-[28px] p-4 shadow-lg shadow-red-500/30 flex flex-col items-center justify-between text-center group 
                                    before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2
                                    border-t border-white/50 border-x border-white/20">
                                    
                                    <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center text-xl text-white shadow-inner shrink-0 z-10 border border-white/40 backdrop-blur-sm">
                                        <i className="fa-solid fa-masks-theater drop-shadow-md"></i>
                                    </div>
                                    
                                    <div className="z-10 flex flex-col items-center justify-center">
                                        <p className="text-base font-black text-white drop-shadow-md leading-tight">Mr. White</p>
                                        <p className="text-[10px] text-white/90 font-medium mt-1 px-1 leading-tight">Sans mot, doit bluffer</p>
                                    </div>
                                    
                                    <div className="flex items-center bg-black/20 backdrop-blur-sm p-1 rounded-xl border border-white/20 z-10 shrink-0 shadow-inner w-full">
                                        <button onClick={() => setMrWhiteCount(0)} className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] transition-all active:scale-95 ${mrWhiteCount === 0 ? 'bg-white text-red-500 shadow-md font-black' : 'text-white hover:bg-white/10'}`}>
                                            Sans
                                        </button>
                                        <button onClick={() => {
                                            if (players.length - undercoverCount >= 3) setMrWhiteCount(1);
                                            else triggerAlert("Pas assez de joueurs pour ajouter Mr. White !", "Impossible");
                                        }} className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] transition-all active:scale-95 ${mrWhiteCount === 1 ? 'bg-white text-red-500 shadow-md font-black' : 'text-white hover:bg-white/10'}`}>
                                            Avec
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <button onClick={startGame} className="w-full relative overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-fuchsia-900/40 active:scale-95 transition-all text-sm mt-4 flex items-center justify-center gap-2 border-t border-white/30 shrink-0">
                                <i className="fa-solid fa-hourglass-start animate-spin mr-1"></i> Lancer la Partie
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* SCREEN REVEAL */}
            {screen === 'reveal' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Distribution secrète</div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-gradient-to-r from-violet-400 to-fuchsia-500 h-full transition-all duration-300" style={{ width: `${((currentRevealIndex + (revealStep === 'show' ? 1 : 0.5)) / players.length) * 100}%` }}></div>
                        </div>
                    </div>

                    {revealStep === 'pass' && (
                        <div className="my-auto flex flex-col items-center gap-6">
                            <div className="relative overflow-hidden w-32 h-32 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-[32px] p-2 shadow-2xl shadow-indigo-500/40 flex items-center justify-center animate-bounce border-t border-white/40 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2">
                                <div className="w-full h-full bg-white/20 rounded-2xl overflow-hidden border border-white/30 z-10 shadow-inner">
                                    <img src={players[currentRevealIndex].avatar || AVATARS_POOL[0]} alt="avatar" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-2xl font-extrabold text-white">Passe le téléphone !</h3>
                                <p className="text-slate-300 text-sm">Confiez l'écran en secret à :</p>
                                <div className="text-xl font-black text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5 px-8 rounded-2xl inline-block shadow-lg border border-white/20">
                                    {players[currentRevealIndex].name}
                                </div>
                            </div>
                        </div>
                    )}

                    {revealStep === 'show' && (
                        <div className="my-auto space-y-5 animate-scale-up">
                            <div className="text-slate-300 text-sm font-medium">Bonjour <span className="text-white font-extrabold">{players[currentRevealIndex].name}</span>, voici ton rôle :</div>
                            
                            {players[currentRevealIndex].role === 'mr_white' ? (
                                <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-red-600 rounded-[32px] p-6 shadow-2xl shadow-red-500/40 space-y-4 border-t border-white/50 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2">
                                    <div className="z-10 relative">
                                        <span className="px-4 py-2 bg-black/20 text-white rounded-full text-xs font-black tracking-widest border border-white/20 backdrop-blur-sm shadow-inner uppercase"><i className="fa-solid fa-masks-theater mr-2"></i> MR. WHITE</span>
                                        <div className="text-5xl font-black tracking-widest text-white py-6 drop-shadow-lg animate-pulse">???</div>
                                        <p className="text-white/90 text-sm max-w-xs mx-auto leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">Tu n'as <strong>aucun mot</strong> secret. Écoute attentivement les autres pour bluffer !</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[32px] p-6 shadow-2xl shadow-teal-500/40 space-y-4 border-t border-white/50 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2">
                                    <div className="z-10 relative">
                                        <span className="px-4 py-2 bg-black/20 text-white rounded-full text-xs font-black tracking-widest border border-white/20 backdrop-blur-sm shadow-inner uppercase"><i className="fa-solid fa-lock mr-2"></i> MOT SECRET</span>
                                        <div className="text-3xl font-black tracking-wide text-white py-6 drop-shadow-lg">{players[currentRevealIndex].word}</div>
                                        <p className="text-white/90 text-sm max-w-xs mx-auto leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">Mémorise bien ce mot et <strong>ne le montre à personne</strong> !</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {revealStep === 'pass' ? (
                        <button onClick={handleRevealWord} className="w-full relative overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-sm border-t border-white/30">
                            Révéler mon rôle en secret
                        </button>
                    ) : (
                        <button onClick={handleNextReveal} className="w-full relative overflow-hidden bg-white text-violet-600 font-black py-4 px-6 rounded-2xl shadow-xl shadow-white/10 active:scale-95 transition-all text-sm border border-slate-200">
                            C'est tout bon !
                        </button>
                    )}
                </div>
            )}

            {/* SCREEN GAMEPLAY DEBATS (Grille 2 Colonnes) */}
            {screen === 'gameplay' && (
                <div className="flex-1 flex flex-col justify-between py-5 overflow-hidden animate-fade-in">
                    <div className="space-y-4 flex flex-col flex-1 overflow-hidden px-1">
                        
                        <div className="text-center px-4">
                            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-2">Qui est l'intrus ?</h2>
                            
                            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-[24px] text-center shadow-lg shadow-purple-500/30 border-t border-white/30 border-x border-white/10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:h-1/2">
                                <div className="z-10 relative">
                                    <p className="text-[10px] text-white/80 uppercase tracking-widest font-black mb-1.5 drop-shadow-md">Premier indice :</p>
                                    <div className="inline-flex items-center gap-3 bg-black/20 py-1.5 pl-1.5 pr-4 rounded-xl border border-white/20 backdrop-blur-sm shadow-inner">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg overflow-hidden border border-white/30 shrink-0">
                                            <img src={startingPlayerAvatar || AVATARS_POOL[0]} alt="avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-base font-black text-white drop-shadow-sm">{startingPlayer}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-cyan-200 flex items-center justify-center gap-1.5 mt-2">
                                        <i className="fa-solid fa-tag"></i> Thème : {playedThemeName}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 mt-2">
                            <div className="grid grid-cols-2 gap-3 pb-2">
                                {players.map((player, index) => {
                                    const cardColors = [
                                        "from-cyan-400 to-blue-500 shadow-cyan-500/30",
                                        "from-fuchsia-400 to-purple-500 shadow-fuchsia-500/30",
                                        "from-emerald-400 to-teal-500 shadow-emerald-500/30",
                                        "from-amber-400 to-orange-500 shadow-amber-500/30",
                                        "from-indigo-400 to-violet-500 shadow-violet-500/30"
                                    ];
                                    const colorTheme = cardColors[index % cardColors.length];

                                    return (
                                        <div key={player.id} className={`relative overflow-hidden rounded-[24px] p-3 flex flex-col items-center justify-between gap-2 shadow-lg transition-all group
                                            ${player.isEliminated 
                                                ? 'bg-slate-900 border border-red-900/40 animate-eliminate-card' 
                                                : `bg-gradient-to-br ${colorTheme} border-t border-white/40 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:h-1/2 hover:scale-105 duration-300`
                                            }`}
                                        >
                                            {/* OVERLAY ÉNORME POUR L'ÉLIMINATION */}
                                            {player.isEliminated && (
                                                <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center backdrop-blur-[2px] z-30 rounded-[24px]">
                                                    <i className="fa-solid fa-skull text-red-500 text-[40px] drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pop animate-pulse"></i>
                                                    <span className="text-red-400 font-black text-[10px] uppercase tracking-widest mt-1 animate-pop" style={{ animationDelay: '0.1s' }}>Éliminé</span>
                                                </div>
                                            )}

                                            <div className="relative w-14 h-14 bg-white/20 rounded-2xl overflow-hidden border border-white/50 shrink-0 shadow-inner z-10 mt-1">
                                                <img src={player.avatar || AVATARS_POOL[0]} alt={player.name} className="w-full h-full object-cover" />
                                            </div>
                                            
                                            <span className={`font-bold text-[14px] text-center px-1 truncate w-full z-10 ${player.isEliminated ? 'text-slate-400 line-through' : 'text-white drop-shadow-md'}`}>
                                                {player.name}
                                            </span>

                                            {!player.isEliminated && (
                                                <button 
                                                    onClick={() => eliminatePlayerAction(player)} 
                                                    className="w-full bg-black/20 hover:bg-red-500 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-white/20 hover:border-red-400 transition-all active:scale-95 z-20 backdrop-blur-sm flex items-center justify-center gap-1.5 mt-1"
                                                >
                                                    <i className="fa-solid fa-skull"></i> Éliminer
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCREEN GUESS WHITE */}
            {screen === 'guess_white' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in">
                    <div className="my-auto w-full max-w-sm mx-auto">
                        <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-red-600 rounded-[32px] p-6 shadow-2xl shadow-red-500/40 border-t border-white/50 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2">
                            <div className="z-10 relative space-y-5">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto text-white text-3xl border border-white/30 shadow-inner backdrop-blur-sm">
                                    <i className="fa-solid fa-masks-theater drop-shadow-md"></i>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white drop-shadow-md">Dernière Chance !</h3>
                                    <p className="text-white/90 text-xs leading-relaxed max-w-[250px] mx-auto font-medium">
                                        <strong className="text-white">{eliminatedPlayer?.name}</strong> était Mr. White ! S'il trouve le mot des civils, il gagne immédiatement !
                                    </p>
                                </div>

                                <div className="bg-black/20 p-4 rounded-2xl border border-white/20 backdrop-blur-sm shadow-inner space-y-3 mt-4">
                                    <p className="text-[11px] text-white/80 uppercase tracking-widest font-black">A-t-il deviné ?</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => handleMrWhiteGuess(false)} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-xs active:scale-95 border border-white/20 transition-all">
                                            Faux
                                        </button>
                                        <button onClick={() => handleMrWhiteGuess(true)} className="bg-white text-red-600 font-black py-3 rounded-xl text-xs shadow-lg active:scale-95 transition-all">
                                            Exact !
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCREEN GAME OVER */}
            {screen === 'gameover' && (
                <div className="flex-1 flex flex-col justify-between p-5 text-center animate-fade-in overflow-hidden">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                        
                        <div className={`relative overflow-hidden rounded-[28px] p-5 shadow-2xl border-t border-white/40 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:h-1/2 ${winner === 'civilians' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-teal-500/40' : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-red-500/40'}`}>
                            <div className="z-10 relative flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center text-white text-3xl border border-white/40 shadow-inner backdrop-blur-sm">
                                    <i className={`fa-solid drop-shadow-md ${winner === 'civilians' ? 'fa-trophy' : 'fa-user-ninja'}`}></i>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white drop-shadow-md">
                                        {winner === 'civilians' ? 'Victoire des Civils !' : 'Victoire des Infiltrés !'}
                                    </h2>
                                    <p className="text-white/90 text-[11px] font-medium mt-1 drop-shadow-sm">
                                        {winner === 'civilians' ? 'Les citoyens ont conservé leur secret !' : 'L\'équipe de l\'ombre a triomphé !'}
                                    </p>
                                </div>
                                <div className="mt-1 bg-black/20 py-2 px-4 rounded-xl border border-white/20 backdrop-blur-sm shadow-inner w-full">
                                    <p className="text-[10px] text-white/80 uppercase tracking-widest font-black mb-1">Mots de la partie</p>
                                    <p className="text-sm font-bold text-white drop-shadow-sm"><span className="text-emerald-200">{activeWordPair.civil}</span> vs <span className="text-amber-200">{activeWordPair.undercover}</span></p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2 text-left">Répartition finale :</p>
                            <div className="grid grid-cols-2 gap-2">
                                {players.map(p => {
                                    const roleColor = p.role === 'civilian' ? 'from-emerald-400 to-teal-500 shadow-teal-500/30' : p.role === 'undercover' ? 'from-amber-400 to-orange-500 shadow-orange-500/30' : 'from-rose-500 to-red-600 shadow-red-500/30';
                                    
                                    return (
                                        <div key={p.id} className={`relative overflow-hidden bg-gradient-to-br ${roleColor} rounded-[20px] p-2 flex items-center gap-2.5 shadow-md border-t border-white/40 border-x border-white/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:h-1/2`}>
                                            <div className="relative w-10 h-10 bg-white/20 rounded-xl overflow-hidden border border-white/40 shrink-0 z-10 shadow-inner">
                                                <img src={p.avatar || AVATARS_POOL[0]} alt="avatar" className="w-full h-full object-cover" />
                                                {p.isEliminated && (
                                                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center backdrop-blur-[1px]">
                                                        <i className="fa-solid fa-skull text-white text-xs drop-shadow-md"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col z-10 overflow-hidden text-left flex-1">
                                                <span className={`font-bold text-[11px] truncate drop-shadow-md ${p.isEliminated ? 'text-white/70 line-through' : 'text-white'}`}>
                                                    {p.name}
                                                </span>
                                                <span className="text-[9px] font-black text-white/90 uppercase mt-0.5 drop-shadow-md">
                                                    {p.role === 'civilian' ? 'Civil' : p.role === 'undercover' ? 'Infiltré' : 'Mr. White'}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <button onClick={resetGameToSetup} className="w-full relative overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-sm border-t border-white/30 mt-3 shrink-0">
                        Relancer une partie
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;