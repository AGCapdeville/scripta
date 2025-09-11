import seedrandom from 'seedrandom';
import wordJSON from '../assets/wordList.json';
 
const fiveLetterWordList = (wordJSON as string[]).filter((w) => w.length === 5);

export const getDailySeed = (ns = 'my-game'): string => {
    const todayUTC = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    return `${ns}:${todayUTC}`;
}

export const getDailyRNG = (ns?: string) => {
    return seedrandom(getDailySeed(ns));
}

export const getDailyFiveLetterWord = (): string => {
    let key = getDailySeed();
    let word = localStorage.getItem(key);

    if (!word) {
        const rng = getDailyRNG();
        word = fiveLetterWordList[Math.floor(rng() * fiveLetterWordList.length)];
        localStorage.setItem(getDailySeed(), word);
    }

    return word;
};

export const getFiveLetterWord = (): string => {
    return fiveLetterWordList[Math.floor(Math.random() * fiveLetterWordList.length)];
};
