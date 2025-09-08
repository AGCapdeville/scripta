import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import { Atom, Wind, Zap, Code } from "lucide-react";

const TechBadge = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs text-foreground/80">
    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    <span>{label}</span>
  </span>
);

export const About = () => {

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      <div className="w-full max-w-6xl mt-12 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6 text-left">
        <h2 className="text-lg font-semibold text-foreground">
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
            <TechBadge icon={Atom} label="React" />
            <TechBadge icon={Wind} label="Tailwind" />
            <TechBadge icon={Zap} label="Vite" />
            <TechBadge icon={Code} label="TypeScript" />
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