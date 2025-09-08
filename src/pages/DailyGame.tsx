import { useCallback, useEffect, useMemo, useState } from 'react';
import seedrandom from 'seedrandom';

import { Word } from '../components/Word';
import { Keys } from '../components/Keys';

import wordJSON from "../assets/wordList.json";
import { Results } from '../components/Results';

import { useNavigate } from "react-router-dom";


const getDailySeed = (ns = 'my-game'): string => {
  const todayUTC = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  return `${ns}:${todayUTC}`;
}

const getDailyRNG = (ns?: string) => {
  return seedrandom(getDailySeed(ns));
}

const getDailyWord = (wordList: string[]): string => {

  let key = getDailySeed();
  let word = localStorage.getItem(key);

  if (!word) {
    const rng = getDailyRNG();
    word = wordList[Math.floor(rng() * wordList.length)];
    localStorage.setItem(getDailySeed(), word);
  }

  return word; 
};

export const DailyGame = () => {

  const [word, setWord] = useState("     ");
  const [save, saveWord] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [outcome, setOutcome] = useState(false);
  const [revealModal, setRevealModal] = useState(false);

  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const navigate = useNavigate();

  // 1) constants & derived
  const WORD_LENGTH = 5;
  const fiveLetterWords = useMemo(
    () => (wordJSON as string[]).filter((w) => w.length === WORD_LENGTH),
    []
  );
  
  const closeHandler = () => {
    setShowResults(false);
    setRevealModal(false);
    navigate('/scripta/');
  };

  const fetchSecretWord = async () => {
    const word = getDailyWord(fiveLetterWords);
    console.log("answer : " + word);
    try {
      setSecretWord(word.toUpperCase());
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };
  // Do once and forget...
  useEffect(() => {
    fetchSecretWord();
  }, []);

  useEffect(() => {
    if (!save) return;

    const won = word === secretWord;
    const ended = won || attempts >= 5;
    
    if (ended) {
      setOutcome(won);
      setShowResults(true)
      setTimeout(() => setRevealModal(true), 1500);
    }
  }, [save])

  const validWordSet = useMemo(() => new Set(fiveLetterWords), [fiveLetterWords]);
  const currentGuess = useMemo(() => word.replace(/ /g, ""), [word]);
  const isValid = (w: string) => validWordSet.has(w.toLowerCase());
  const padToLen = (s: string) => (s + " ".repeat(WORD_LENGTH)).slice(0, WORD_LENGTH);

  // 2) key handlers
  const addCharToCurrentGuess = (ch: string) => {
    setWord((prev) => {
      const raw = prev.replace(/ /g, "");
      if (raw.length >= WORD_LENGTH) return prev;
      return padToLen(raw + ch.toUpperCase());
    });
  };
  const removeLastCharFromCurrentGuess = () => {
    setWord((prev) => {
      const raw = prev.replace(/ /g, "");
      if (raw.length === 0) return prev;
      return padToLen(raw.slice(0, -1));
    });
  };

  // 3) submit wrapper
  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH || !isValid(currentGuess)) return;
    saveWord(true);
  }, [currentGuess, isValid]);

  // 4) key states
  type KeyState = "correct" | "present" | "absent";

  const keyStates: Record<string, KeyState | undefined> = useMemo(() => {
    const map: Record<string, KeyState> = {};
    absentLetters.forEach((l) => { map[l.toUpperCase()] = "absent"; });
    presentLetters.forEach((l) => { map[l.toUpperCase()] = "present"; });
    correctLetters.forEach((l) => { map[l.toUpperCase()] = "correct"; });
    return map;
  }, [absentLetters, presentLetters, correctLetters]);

  // 5) flags
  const canSubmit = currentGuess.length === WORD_LENGTH && isValid(currentGuess);

  return (
    <div className='bg-background h-full w-full min-h-screen text-text-page'>
      
      {loading ? "loading..." :
        <div className='pt-4'>
          <Word word={word} 
            setWord={setWord} 
            secretWord={secretWord} 
            save={save} 
            saveWord={saveWord}
            attempts={attempts}
            setAttempts={setAttempts} 
            absentLetters={absentLetters}
            setAbsentLetters={setAbsentLetters}
            presentLetters={presentLetters}
            setPresentLetters={setPresentLetters}
            correctLetters={correctLetters}
            setCorrectLetters={setCorrectLetters}
          />
        </div>
      }

      <div className='fixed bottom-0 w-full'>
        <Keys
          onChar={addCharToCurrentGuess}
          onDelete={removeLastCharFromCurrentGuess}
          submitGuess={submitGuess}
          canSubmit={canSubmit}
          keyStates={keyStates}
          disabled={showResults}
        />
      </div>

      {revealModal && (
        <Results
          game="Daily Game"
          outcome={outcome}
          guesses={attempts}
          secretWord={secretWord}
          onClose={closeHandler}
        />
      )}

    </div>
  )
}
