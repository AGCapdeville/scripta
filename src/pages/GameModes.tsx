import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import { Calendar, Infinity } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ModeCardProps = {
  icon: any;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const ModeCard = ({ icon: Icon, title, subtitle, onClick }: ModeCardProps) => (
  <button
    onClick={onClick}
    className="
      group relative w-full max-w-sm 
      rounded-xl border border-border/60 bg-background/60 backdrop-blur
      p-6 text-left shadow-md transition hover:border-foreground/40 hover:bg-background/80
      hover:scale-103
    "
  >
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-foreground/80 group-hover:text-foreground" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    </div>
    <p className="mt-2 text-sm text-foreground/70">{subtitle}</p>
  </button>
);

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
          onClick={() => navigate("/scripta/daily")}
        />
        <ModeCard
          icon={Infinity}
          title="Free Play"
          subtitle="Unlimited puzzles. Practice anytime."
          onClick={() => navigate("/scripta/practice")}
        />
      </div>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
