import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import { Calendar, Infinity, Hourglass, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkDailyStatus } from "../utility/userData";
import { useEffect, useState } from "react";
import { getCountdown } from "../utility/time"
import { useAuth } from "../context/AuthContext";

type ModeCardProps = {
  icon: any;
  title: string;
  subtitle: string;
  daily: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const ModeCard = ({ icon: Icon, title, subtitle, daily, onClick, disabled}: ModeCardProps) => {

  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (!daily) return;

    const nextMidnight: Date = new Date();
    nextMidnight.setHours(24, 0, 0, 0); // local midnight

    const interval = setInterval(() => {
      setCountdown(getCountdown(nextMidnight).toString());
    }, 1000);

    return () => clearInterval(interval);
  }, [daily]);

  return (
    <button
      onClick={onClick}
      disabled={checkDailyStatus() && title === "Daily"}
      className={`
        group relative w-full max-w-sm 
        rounded-xl border border-border/60 
        backdrop-blur
        p-6 text-left shadow-md transition 
        ${daily || disabled ? "bg-disabled-bg" : "bg-background"}
        ${daily || disabled ? "hover:border-disabled-border" : "hover:border-foreground/40 hover:bg-background/80"}
        hover:scale-103 
      `}
    >
      <div className={`flex items-center gap-3`}>
        <Icon className={`h-6 w-6 
          ${daily || disabled ? 'text-disabled-foreground/80' : 'text-foreground/80'}
          ${daily || disabled ? 'group-hover:text-disabled-foreground' : 'group-hover:text-foreground'}
          `} />

        <h3 className={`text-lg font-semibold ${daily || disabled ? 'text-disabled-foreground' : 'text-foreground'} `}>
          {title}
        </h3>
        {
          disabled && (
            <div className={`
                pointer-events-none absolute top-3 right-3 
                flex items-center gap-1 
                rounded-full border border-primary/70 
                bg-white/90 px-3 py-1 text-[0.65rem] 
                font-semibold uppercase tracking-[0.08em] 
                text-black shadow-lg 
                dark:bg-primary/70 
                dark:text-background
              `}>
              <Lock className="h-3 w-3" />
              Sign Up to Play
            </div>
          )

        }
        {daily && 
          <div className="text-muted-foreground font-medium flex flex-col leading-tight">
            <span>Daily word complete</span>
            <span className="text-sm">Next word in {countdown}</span>
          </div>
        }
      </div>
      <p className="mt-2 text-sm text-foreground/70">{subtitle}</p>
    </button>
  )
};

export const GameModes = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const requiresAccount = !session;
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text-page">
      <PageTitle title="Game Modes" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 items-center justify-center w-full max-w-4xl px-4">
        <ModeCard
          icon={Calendar}
          title="Daily"
          subtitle="One puzzle a day, same word for everyone."
          daily={checkDailyStatus()}
          onClick={() => navigate("/scripta/daily")}
          disabled={false}
        />
        <ModeCard
          icon={Infinity}
          title="Practice"
          subtitle="Unlimited puzzles. Practice anytime."
          daily={false}
          onClick={() => navigate("/scripta/practice")}
          disabled={requiresAccount}
        />
        <ModeCard
          icon={Hourglass}
          title="Time Attack"
          subtitle="Solve to survive — times ticking!"
          daily={false}
          onClick={() => navigate("/scripta/time-attack")}
          disabled={requiresAccount}
        />
        
      </div>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
