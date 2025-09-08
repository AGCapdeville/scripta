import { Link } from 'react-router-dom';
import { ThreeLineMenu, HamburgerMenu, LinkButton } from "./MenuButtons";
import { FlipLetter } from './Letter';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';


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

    <div className="bg-background border-b border-border text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-2">

        <LinkButton to="/scripta" className="group inline-flex items-center gap-2"> 
          <div className="text-white grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-primary shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">Scripta</span>
        </LinkButton>

        <nav className="hidden gap-1 sm:flex">
          <LinkButton 
            to="/scripta/modes" 
            children="Game Modes" 
            className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
          />
          <LinkButton
            to="/scripta/how-to-play"
            children="How to Play"
            className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
          />
          <LinkButton
            to="/scripta/statisics"
            children="Statistics"
            className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
          />
          <LinkButton
            to="/scripta/settings"
            children="Settings"
            className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
          />
          <LinkButton
            to="/scripta/about"
            children="About"
            className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
          />
        </nav>
        <nav className="inline-flex sm:hidden">
          <div className='ml-auto'>
            <HamburgerMenu />
          </div>
        </nav>
      </header>
    </div>
  )
  
}
