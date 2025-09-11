import { useEffect, useState } from "react";
import { FlipLetter } from "./Letter";
import { isValidWord } from "../utility/words";

const LetterContainer = "flex justify-center w-full gap-[5px] py-[2px]";

type WordProps = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  secretWord: string;
  save: boolean;
  saveWord: React.Dispatch<React.SetStateAction<boolean>>;
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  absentLetters: Array<string>;
  setAbsentLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  presentLetters: Array<string>;
  setPresentLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  correctLetters: Array<string>;
  setCorrectLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export const Word = ({
  word,
  setWord,
  secretWord,
  save,
  saveWord,
  attempts,
  setAttempts,
  absentLetters,
  setAbsentLetters,
  presentLetters,
  setPresentLetters,
  correctLetters,
  setCorrectLetters,
}: WordProps) => {
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!save) return;
    saveWord(false);

    if (isValidWord(word, 5)) { // TODO: come back to this logic... Do we need to do this check here?
      let absent = [...absentLetters];
      let present = [...presentLetters];
      let correct = [...correctLetters];

      [...word].forEach((char, index) => {
        if (!absent.includes(char)) absent = [...absent, char];
        if (secretWord[index] === char) correct = [...correct, char]; // Have to check to see if correct first
        if (secretWord.includes(char) && !present.includes(char)) present = [...present, char]; // If correct but not in the correct location
      });

      if (absent.length > absentLetters.length) setAbsentLetters([...absent]);
      if (correct.length > correctLetters.length) setCorrectLetters([...correct]);
      if (present.length > presentLetters.length) setPresentLetters([...present]);

      setAttempts(attempts + 1);
      setSubmittedWords([...submittedWords, word.trim()]);
      setWord("     ");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

  }, [save]);


  return (
    <>
      <div className="flex flex-col items-center">

        {/* Number of Attempts place holders */}
        {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
          <div key={"wordPlaceHolder" + rowIndex} className={LetterContainer}>
            {[0, 1, 2, 3, 4].map((index) =>
              <FlipLetter
                key={`${rowIndex}-${index}`}
                letter={" "}
                index={index}
                answer={secretWord}
                placeholder={true}
                delayMs={index * 120} // nice stagger
              />
            )}
          </div>
        ))}

        {/* WordBox -> absolute overlay stack of played & current rows */}
        <div className="flex flex-col absolute">

          {/* Submitted rows */}
          {submittedWords.map((submittedWord, rowIndex) => (
            <div key={rowIndex} className={LetterContainer}>
              {[...submittedWord].map((ch, i) => (
                <div key={`${rowIndex}-${i}`} className="bg-background">
                  <FlipLetter
                    letter={ch}
                    index={i}
                    answer={secretWord}
                    placeholder={false}
                    delayMs={i * 120} // nice stagger
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Current typing row */}
          {attempts <= 5 && (
            <div
              id="currentWord"
              className={
                 LetterContainer  //+ (shake ? `animate-[shake_0.5s_ease-in-out]` : ``)
              }
            >
              {[...word].map((letter, index) => (
                <FlipLetter
                  key={`${index}`}
                  letter={letter}
                  index={index}
                  answer={""}
                  placeholder={true}
                  delayMs={index * 120} // nice stagger
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};
