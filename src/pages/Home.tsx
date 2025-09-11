import React from "react";
import { Link } from 'react-router-dom';
import { LoadTheme } from '../theme/ThemeFunctions';
import { useEffect } from 'react';
import { motion } from "framer-motion";
import { Play, HelpCircle, BarChart3, Settings, Sparkles } from "lucide-react";
import { Footer } from "../components/Footer";
import { loadPlayerData } from "../utility/user";

export const Home = () => {

  useEffect(() => {
    LoadTheme();
  }, []);

  return (
    <div className="h-full w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      
      <header className="mx-auto max-w-3xl px-6 pt-14">
        <h1 className="md:text-2xl font-black tracking-tight">
          Play & Learn New Words
        </h1>
        <p className="mt-2 text-slate-400">
          Sharpen your vocabulary—one word at a time.
        </p>
      </header>

      <main className="mx-auto max-w-xl px-6 py-10">
        <section className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl p-8">
          <div className="grid gap-4">
            {/* Daily Word (Primary) */}

            <Link 
              to="/scripta/daily"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-900 /30 transition
             hover:bg-violet-500 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 opacity-90 transition group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.01 2.009 2.84-.41a.75.75 0 0 1 .84.84l-.41 2.84 2.01 2.01a.75.75 0 0 1 0 1.06l-2.01 2.01.41 2.84a.75.75 0 0 1-.84.84l-2.84-.41-2.01 2.01a.75.75 0 0 1-1.06 0l-2.01-2.01-2.84.41a.75.75 0 0 1-.84-.84l.41-2.84-2.01-2.01a.75.75 0 0 1 0-1.06l2.01-2.01-.41-2.84a.75.75 0 0 1 .84-.84l2.84.41 2.01-2.01Z" />
              </svg>
              Daily Word
            </Link>

            <Link
              to="/scripta/daily"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-700/80 px-6 py-3 font-semibold text-slate-100 ring-1 ring-white/10 transition
                         hover:bg-slate-700 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path strokeWidth="1.5" d="M6 4h9a2 2 0 0 1 2 2v12M6 4l-2 2v12a2 2 0 0 0 2 2h11M8 8h5M8 12h7" />
              </svg>
              Free Word
            </Link>
            
          </div>

        </section>
      </main>
    </div>

);
}

const Title = ({ text }: { text: string }) => {
  const letters = text.split("");
  return (
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground/90 select-none">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 22 }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </h1>
  );
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-4 py-1.5 text-sm text-foreground/70 shadow-sm">
    {children}
  </div>
);

const CTAButton = ({ href, icon: Icon, children, variant = "primary" }: { href: string, icon: any, children: React.ReactNode, variant?: "primary" | "outline" | "ghost" }) => {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:brightness-105"
      : variant === "outline"
        ? "border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
        : "text-foreground/80 hover:text-foreground";

  return (
    <Link to={href} className={`${base} ${styles}`}>
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );
};

export const HomePage = () => {

  const PlayerData = loadPlayerData();
  const wins = PlayerData.dailyGame.wins
  const losses = PlayerData.dailyGame.losses;
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  useEffect(() => {
    LoadTheme();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <Pill>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Daily puzzle resets at midnight</span>
          </Pill>

          <div className="mt-6">
            <Title text="Scripta" />
          </div>

          <p className="mt-4 max-w-xl text-balance text-base md:text-lg text-foreground/70">
            A minimalist word puzzle — clean, calm, and just challenging enough.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href="/scripta/modes" icon={Play}>Play</CTAButton>
            <CTAButton href="/scripta/how-to-play" icon={HelpCircle} variant="outline">How to Play</CTAButton>
            <CTAButton href="/scripta/statisics" icon={BarChart3} variant="ghost">Statistics</CTAButton>
            <CTAButton href="/scripta/settings" icon={Settings} variant="ghost">Settings</CTAButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Pill>🔥 <span className="font-medium">3‑day streak</span></Pill>
            <Pill>⭐ <span className="font-medium">Win rate {winRate}%</span></Pill>
          </div>
        </div>


        <div className="absolute inset-0 scales" />

      </main>

      <Footer />
    </div>
  );
}