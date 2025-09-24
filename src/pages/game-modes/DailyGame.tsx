import { useCallback, useEffect, useMemo, useState } from 'react';

import { Word } from '../../components/Word';
import { Keys } from '../../components/Keys';
import { Results } from '../../components/Results';

import { useNavigate } from 'react-router-dom';
import { isValidWord } from '../../utility/words';
import { getDailyFiveLetterWord } from '../../utility/fiveLetterWord';
import { useTimer } from '../../components/Timer';

const WORD_LENGTH = 5;

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

  const { start, reset, remaining, running, pause } = useTimer();
  const [totalTime, setTotalTime] = useState(0);
  
  
  useEffect(() => {
    start(86400); // (24HR) shouldn't take players longer than this...
    return () => reset(); // cleanup on unmount
  }, [start, reset]);

  const closeHandler = () => {
    setShowResults(false);
    setRevealModal(false);
    navigate('/scripta/');
  };

  const padToLen = (s: string) => (s + " ".repeat(WORD_LENGTH)).slice(0, WORD_LENGTH);

  // Do once and forget...
  useEffect(() => {
    fetchSecretWord();
  }, []);


  const fetchSecretWord = async () => {
    const word = getDailyFiveLetterWord();
    try {
      setSecretWord(word.toUpperCase());
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!save || showResults) return;

    const won = word === secretWord;
    const ended = won || attempts >= 5;
    
    if (ended) {
      pause();              // ✅ stop ticking 
      const final = 86400 - remaining;
      setTotalTime(final);   // ✅ store in state
      setOutcome(won);
      setShowResults(true)
      setTimeout(() => setRevealModal(true), 1500);
    }
  }, [save])

  // Key handlers
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

  // Submit wrapper
  const submitGuess = useCallback(async () => {
    if (word.length !== WORD_LENGTH) return;
    if (!isValidWord(word, WORD_LENGTH)) return;

    saveWord(true);
  }, [word, saveWord]);

  // Key states
  type KeyState = "correct" | "present" | "absent";

  const keyStates: Record<string, KeyState | undefined> = useMemo(() => {
    const map: Record<string, KeyState> = {};
    absentLetters.forEach((l) => { map[l.toUpperCase()] = "absent"; });
    presentLetters.forEach((l) => { map[l.toUpperCase()] = "present"; });
    correctLetters.forEach((l) => { map[l.toUpperCase()] = "correct"; });
    return map;
  }, [absentLetters, presentLetters, correctLetters]);

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
          keyStates={keyStates}
          disabled={showResults}
        />
      </div>

      {revealModal && (
        <Results
          game="Daily"
          outcome={outcome}
          guesses={attempts}
          secretWord={secretWord}
          averageTime={[totalTime]}
          totalTime={totalTime}
          onClose={closeHandler}
        />
      )}

    </div>
  )
}

