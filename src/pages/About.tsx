import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import { Atom, Wind, Zap, Code, Shell, DatabaseZap } from "lucide-react";

type IconTint =
  | "sky-400"
  | "cyan-300"
  | "violet-400"
  | "blue-400"
  | "emerald-400"
  | "orange-400";

const ICON_TONE: Record<IconTint, string> = {
  "sky-400": "text-sky-400",
  "cyan-300": "text-cyan-300",
  "violet-400": "text-violet-400",
  "blue-400": "text-blue-400",
  "emerald-400": "text-emerald-400",
  "orange-400": "text-orange-400",
};

const TechBadge = ({ icon: Icon, iconColor, label }: { icon: any; iconColor: IconTint; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-1 sm:px-2  py-1 text-xs text-foreground/80">
    <Icon className={`h-5 w-5 ${ICON_TONE[iconColor]}`} aria-hidden="true" />
    <span>{label}</span>
  </span>
);

export const About = () => {

  return (
    <div className="h-[100vh] overflow-hidden overflow-y-auto flex flex-col items-center bg-background ml-[10px] mr-[10px]">
      <div className="w-full max-w-6xl mt-6 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6 text-left">
        <h2 className="text-lg sm:text-[10px] font-semibold text-foreground">
          Why I Built Scripta
        </h2>

        <p className="mt-3 text-foreground/80">
          Scripta is a small collection of word games designed to be shared with friends and family — an inviting way to create something fun while growing as a developer.
          I wanted a project that could be both playful and practical: a way to experiment with architecture, polish UX, and practice consistent iteration.
          With each improvement comes an opportunity to turn lessons into practice and practice into skill.
        </p>

        <div className="flex flex-col items-center justify-center">
          <p className="mt-4 text-foreground/80">
            Here’s the stack powering Scripta:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <TechBadge icon={Atom} iconColor="sky-400" label="React" />
            <TechBadge icon={Wind} iconColor="cyan-300" label="Tailwind" />
            <TechBadge icon={Zap} iconColor="violet-400" label="Vite" />
            <TechBadge icon={Code} iconColor="blue-400" label="TypeScript" />
            <TechBadge icon={DatabaseZap} iconColor="emerald-400" label="Supabase" />
            <TechBadge icon={Shell} iconColor="orange-400" label="Lucide" />
          </div>

          <p className="mt-2 text-sm text-foreground/60">
            Along the way, refining my understanding of HTML, CSS, and JavaScript.
          </p>
        </div>

        <p className="mt-4 text-foreground/80">
          Building Scripta has helped me strengthen my understanding of component architecture,
          develop a smoother design-to-implementation workflow, and practice shipping small, frequent updates.
          It’s a reminder that learning is most effective — and most fun — when it’s shared.
        </p>
      </div>

      <Footer />
    </div>
  );

}
