import { Link } from 'react-router-dom';
import { ThreeLineMenu } from "./MenuButtons";
import { FlipLetter } from './Letter';
import { useEffect, useState } from 'react';

const tileStyle = `
  flex justify-center
  gap-[3px] 
  scale-55
  md:scale-65
`;

// min and max inclusive
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomLetter = () => {
  const code = Math.floor(Math.random() * 26) + 97; // 97–122
  return String.fromCharCode(code);
}

const randomWord = (seedWord : String) => {
  let randomString = "";

  for (let i = 0; i < seedWord.length - 1; i++) {
    if (randomInt(1,10) > 6) {
      randomString += seedWord[randomInt(1, seedWord.length)];
    } else {
      randomString += randomLetter();
    }
  }
  return randomString.toUpperCase();
}


/* custom hook: updates charSeed every 3s */
function useLoopTitle(
  title: string,
  setCharSeed: React.Dispatch<React.SetStateAction<string>>,
  intervalMs = 3000
) {
  useEffect(() => {
    const id = setInterval(() => {
      setCharSeed(() => randomWord(title));
    }, intervalMs);
    return () => clearInterval(id);
  }, [title, intervalMs, setCharSeed]);
}


export const Navbar = () => {
  let title = "SCRIPTA";
  const [charSeed, setCharSeed] = useState<string>(() => randomWord(title));
  useLoopTitle(title, setCharSeed, 19000);

  return (
    <nav className="flex p-2 bg-foreground text-text">
      <div className="absolute left-0 right-0">
        <Link
          key={charSeed}
          className={tileStyle} //"flex scale-60 m-1" //scale-55
          to="/scripta"
        >
          {[...title].map((ch, i) => (
            <FlipLetter
            key={`${i}`}
            letter={ch}
            index={i}
            answer={charSeed}
            delayMs={i * 120} // nice stagger
            />
          ))}
        </Link>
      </div>
      <div className="ml-auto">
        <ThreeLineMenu/>
      </div>
    </nav>
  );
}
