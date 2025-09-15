export interface GameModeProperties {
    name: string;
    wins: number;
    losses: number;
    distribution: number[];
    streak: number;
    maxStreak: number;
    averageSolveTime: number[];
    bestTime: number;
}

export interface TimedGameProperties {
    name: string;
    gamesPlayed: number;
    averageSolveTime: number[];
    timeSurvived: number;
    maxStreak: number;
}

export interface PlayerDataProperties {
    username?: string;
    dailyGame: GameModeProperties;
    practiceGame: GameModeProperties;
    timedGame: TimedGameProperties;
}
