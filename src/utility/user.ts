import { GameModeProperties, PlayerDataProperties } from "../types/Game";

export const loadPlayerData = (): PlayerDataProperties => {
    let player: PlayerDataProperties = localStorage.getItem("playerData") ? JSON.parse(localStorage.getItem("playerData")!) :  null;

    if (!player) {
    
        const daily: GameModeProperties = {
            name: "Daily Word",
            wins: 0,
            losses: 0,
            distribution: Array(6).fill(0),
            streak: 0,
            maxStreak: 0,
        }

        const free: GameModeProperties = {
            name: "Free Play",
            wins: 0,
            losses: 0,
            distribution: Array(6).fill(0),
            streak: 0,
            maxStreak: 0,
        }

        const wave: GameModeProperties = {
            name: "Time Attack",
            wins: 0,
            losses: 0,
            distribution: Array(6).fill(0),
            streak: 0,
            maxStreak: 0,
        }

        const newPlayer: PlayerDataProperties = {
            username: "",
            dailyGame: daily,
            freeGame: free,
            waveGame: wave,
        };

        localStorage.setItem("playerData", JSON.stringify(newPlayer));
        player = newPlayer
    }

    return player;
}

export const completeDaily = () => {
    localStorage.setItem("dailyWordDayCompleted", new Date().toISOString());
}

export const checkDailyStatus = () : boolean => {
    const stored = localStorage.getItem("dailyWordDayCompleted");

    if (!stored) return false;
    
    // Turn the stored string back into a Date object
    const storedDate = new Date(stored);

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Reset daily word
    if (storedDate < today) localStorage.removeItem("dailyWordDayCompleted");

    // Compare days (ignore hours/minutes)
    return storedDate < today;
}

export const saveGameScore = (gameType: string, outcome: boolean, guesses: number) => {
    const player = loadPlayerData();
    let game: GameModeProperties;

    switch (gameType) {
        case "Daily Game":
            game = player.dailyGame;
            break;
        case "Free Game":
            game = player.freeGame;
            break;
        case "Time Attack":
            game = player.waveGame;
            break;
        default:
            console.error("Invalid game type");
            return;
    }   
    
    if (outcome) {
        game.wins += 1;
        game.streak += 1;
        game.maxStreak = Math.max(game.maxStreak, game.streak);
        game.distribution[guesses - 1] += 1;
    } else {
        game.losses += 1;
        game.streak = 0;
    }

    localStorage.setItem("playerData", JSON.stringify(player));
}