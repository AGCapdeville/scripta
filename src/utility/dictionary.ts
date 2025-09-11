import dictionaryJSON from '../assets/words.json';

export const isValidWord = (word: string, maxWordLength: number): boolean => {
    const dictionary = dictionaryJSON as string[];
    return (word.length === maxWordLength || dictionary.includes(word.toLowerCase()));
}