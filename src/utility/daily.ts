import seedrandom from 'seedrandom';

export const getDailySeed = (ns = 'my-game'): string => {
    const todayUTC = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    return `${ns}:${todayUTC}`;
}

export const getDailyRNG = (ns?: string) => {
    return seedrandom(getDailySeed(ns));
}

export const getDailyWord = (wordList: string[]): string => {

    let key = getDailySeed();
    let word = localStorage.getItem(key);

    if (!word) {
        const rng = getDailyRNG();
        word = wordList[Math.floor(rng() * wordList.length)];
        localStorage.setItem(getDailySeed(), word);
    }

    return word;
};

