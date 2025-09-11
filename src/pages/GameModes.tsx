import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import { Calendar, Infinity, Hourglass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkDailyStatus } from "../utility/user";
import { useEffect, useState } from "react";
import { getCountdown } from "../utility/time"

type ModeCardProps = {
  icon: any;
  title: string;
  subtitle: string;
  daily: boolean;
  onClick?: () => void;
};

const ModeCard = ({ icon: Icon, title, subtitle, daily, onClick }: ModeCardProps) => {

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
        ${daily ? "bg-disabled-bg" : "bg-background"}
        ${daily ? "hover:border-disabled-border" : "hover:border-foreground/40 hover:bg-background/80"}
        hover:scale-103 
      `}
    >
      <div className={`flex items-center gap-3`}>
        <Icon className={`h-6 w-6 
          ${daily ? 'text-disabled-foreground/80' : 'text-foreground/80'}
          ${daily ? 'group-hover:text-disabled-foreground' : 'group-hover:text-foreground'}
          `} />

        <h3 className={`text-lg font-semibold ${daily ? 'text-disabled-foreground' : 'text-foreground'} `}>
          {title}
        </h3>
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
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text-page">
      <PageTitle title="Game Modes" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 w-full max-w-4xl px-4">
        <ModeCard
          icon={Calendar}
          title="Daily"
          subtitle="One puzzle a day, same word for everyone."
          daily={checkDailyStatus()}
          onClick={() => navigate("/scripta/daily")}
        />
        <ModeCard
          icon={Infinity}
          title="Free Play"
          subtitle="Unlimited puzzles. Practice anytime."
          daily={false}
          onClick={() => navigate("/scripta/practice")}
        />
      </div>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
