import { useCallback, useEffect, useMemo, useState } from 'react';

import { Word } from '../../components/Word';
import { Keys } from '../../components/Keys';
import { Results } from '../../components/Results';

import { useNavigate } from 'react-router-dom';
import { isValidWord } from '../../utility/words';
import { getFiveLetterWord } from '../../utility/fiveLetterWord';

import { useTimer } from "../../components/Timer";
import { time } from 'framer-motion';

const WORD_LENGTH = 5;

export const TimedGame = () => {

  const [word, setWord] = useState("     ");
  const [secretWord, setSecretWord] = useState("");
  const [save, saveWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [revealModal, setRevealModal] = useState(false);
  
  const [attempts, setAttempts] = useState(0);
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  
  const [startedGame, setStartedGame] = useState<boolean>(false);
  const [completedWords, setCompletedWords] = useState(0);
  const [clearSubmittedWords, resetSubmittedWords] = useState(false);
  const navigate = useNavigate();
  
  const [totalTime, setTotalTime] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const { start, reset, remaining, pause } = useTimer();

  const [prevTime, setPrevTime] = useState(60);

  let timeStart = 60;
  
  useEffect(() => {
    start(timeStart);            // e.g., 60-second round
    setTotalTime(timeStart);
    setStartedGame(true);
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
    const word = getFiveLetterWord();
    console.log(word);
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

    if (word === secretWord) {
      let avg = prevTime - remaining;
      setTimes([...times, avg]) // how long it took to complete word
      setPrevTime(remaining + 60);

      setLoading(true);
      start(remaining + 60);
      setCompletedWords(completedWords + 1);

      // Reset
      setAttempts(0);
      resetSubmittedWords(true);
      setAbsentLetters([]);
      setPresentLetters([]);
      setCorrectLetters([]);
      fetchSecretWord();
    } else {
      if (attempts >= 5) {
        pause();
        setShowResults(true)
        setTimeout(() => setRevealModal(true), 1500);
      }
    }
  }, [save])

  useEffect(() => {
    if (showResults) return;

    setTotalTime(totalTime + 1);

    if (remaining === 0 && startedGame) {
      setShowResults(true);
      setTimeout(() => setRevealModal(true), 500);
    }
  }, [remaining])


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
    if (remaining === 0 && startedGame) return;

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
            clearSubmittedWords={clearSubmittedWords}
            resetSubmittedWords={resetSubmittedWords}
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
          game="Timed"
          outcome={false}
          guesses={completedWords}
          secretWord={secretWord}
          averageTime={times}
          totalTime={totalTime}
          onClose={closeHandler}
        />
      )}

    </div>
  )
}

