import { useEffect, useState } from 'react';

import { Word } from '../components/Word';
import { Keys } from '../components/Keys';

import wordJSON from "../assets/wordList.json";
import { Results } from '../components/Results';

import { useNavigate } from "react-router-dom";

const getFreeWord = (wordList: string[]): string => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

export const FreeGame = () => {

  const [word, setWord] = useState("     ");
  const [save, saveWord] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [outcome, setOutcome] = useState(false);
  const [revealModal, setRevealModal] = useState(false);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [almostLetters, setAlmostLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const navigate = useNavigate();

  const closeHandler = () => {
    setShowResults(false);
    setRevealModal(false);
    navigate('/scripta/');
  };

  const fetchSecretWord = async () => {

    const fiveLetterWords = wordJSON.filter((w: string) => w.length === 5);
    const word = getFreeWord(fiveLetterWords);
    
    try {
      setSecretWord(word);
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Do once and forget...
  useEffect(() => {
    fetchSecretWord();
  }, []);

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
            guessedLetters={guessedLetters}
            setGuessedLetters={setGuessedLetters}
            almostLetters={almostLetters}
            setAlmostLetters={setAlmostLetters}
            correctLetters={correctLetters}
            setCorrectLetters={setCorrectLetters}
          />
        </div>
      }

      <div className='wordKeyboard'>
        <Keys 
          word={word} 
          setWord={setWord} 
          saveWord={saveWord}
          resultsShown={showResults}
          guessedLetters={guessedLetters}
          almostLetters={almostLetters}
          correctLetters={correctLetters}
        />
      </div>

      {revealModal && (
        <Results
          game="Free Game"
          outcome={outcome}
          guesses={attempts}
          secretWord={secretWord}
          onClose={closeHandler}
        />
      )}

    </div>
  )
}
