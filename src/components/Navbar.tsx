import { Link, useLocation } from 'react-router-dom';
import { ThreeLineMenu, HamburgerMenu, LinkButton } from "./MenuButtons";
import { FlipLetter } from './Letter';
import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useTimer } from "./Timer";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

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
  const { session } = useAuth();
  const { remaining, running } = useTimer();
  const { pathname } = useLocation();
  const inTimed = pathname.includes("/time-attack");
  
  let title = "SCRIPTA";
  const [charSeed, setCharSeed] = useState<string>(() => randomWord(title));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useLoopTitle(title, setCharSeed, 19000);

  const displayName =
    session?.user?.user_metadata?.display_name ??
    session?.user?.email; // fallback

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, session]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setMenuOpen(false);
      navigator
    }
  };

  return (

    <div className="bg-background border-b border-border text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-2">

        <LinkButton to="/scripta" className="group inline-flex items-center gap-2"> 
          <div className="text-white grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-primary shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">Scripta</span>
        </LinkButton>

        {inTimed && (
          <div aria-live="polite" className={`font-mono ${remaining <= 10 ? "text-red-500" : ""}`}>
            {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
          </div>
        )}

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
          {session && (
            <LinkButton
              to="/scripta/statisics"
              children="Statistics"
              className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition"
            />
          )}
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
          {!session && (
            <div className='flex items-center text-foreground/70'>
            <LinkButton
              to={{ pathname:"/scripta/portal", search:"?mode=signin"}}
              children="Sign in"
              className="px-3 py-2 text-sm hover:text-foreground transition"
            /> 
            <div className='pointer-events-none'>/</div>
            <LinkButton
              to={{ pathname:"/scripta/portal", search:"?mode=signup"}}
              children="Sign up"
              className="px-3 py-2 text-sm hover:text-foreground transition"
            />
            </div>
          )}

          {session && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm font-medium text-foreground/80 transition hover:border-foreground/40 hover:text-foreground"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="max-w-[10rem] truncate">{displayName}</span>
                <svg
                  className={`h-3 w-3 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 8"
                  aria-hidden="true"
                >
                  <path d="M10.293.293 6 4.586 1.707.293 0 2l6 6 6-6z" fill="currentColor" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-lg backdrop-blur"
                >
                  <Link
                    to="/scripta/"
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-rose-200 transition hover:bg-rose-500/10 hover:text-rose-300"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          )}
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
