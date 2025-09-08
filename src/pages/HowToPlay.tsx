import { Footer } from "../components/Footer";
import { PageTitle } from "../components/PageComponents";
import {
  HelpCircle,
  Keyboard,
  Settings,
  Info,
  Crown,
  Sparkles,
} from "lucide-react";
import React from "react";

const Pill = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs text-foreground/80">
    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    <span>{children}</span>
  </span>
);

const KeyCap = ({ label }: { label: string }) => (
  <span className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background/60 px-2 py-1 text-xs leading-none text-foreground/80">
    {label}
  </span>
);

const Tile = ({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "present" | "correct" | "absent";
}) => {
  const colors =
    variant === "correct"
      ? "bg-letter-bg-correct border-letter-bg-correct text-letter-text-invert"
      : variant === "present"
        ? "bg-letter-bg-present border-letter-bg-present text-letter-text-invert"
        : variant === "absent"
          ? "bg-key-bg-absent border-key-bg-absent text-key-text-invert"
          : "bg-letter-bg-default border-letter-border text-letter-text";

  return (
    <span
      className={`inline-grid place-items-center h-8 w-8 rounded-md border text-sm font-bold ${colors}`}
      aria-label={`${label} tile`}
    >
      {label}
    </span>
  );
};

export const HowToPlay = () => {
  return (
    <div className="h-screen min-h-dvh w-full flex flex-col overflow-y-auto items-center">
    {/* <div className="h-screen w-full overflow-y-auto flex flex-col items-center bg-background"> */}
      {/* scrollable content here */}
      <PageTitle title="How to Play" />

      <div className="flex flex-col w-full max-w-6xl mt-6 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6 text-left">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          The Goal
        </h2>
        <p className="mt-3 text-foreground/80">
          Guess the secret <span className="font-semibold">five-letter word</span> in
          six tries or fewer. Each guess reveals colored feedback to guide your next move.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill icon={Keyboard}>Type or tap keys</Pill>
          <Pill icon={Settings}>6 attempts</Pill>
          <Pill icon={Sparkles}>Smart feedback</Pill>
          <Pill icon={Crown}>Daily challenge</Pill>
        </div>

        {/* Steps */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              How it works
            </h3>
            <ol className="mt-3 space-y-3 list-decimal list-inside text-foreground/80">
              <li>Enter any five-letter word and press <KeyCap label="Enter" />.</li>
              <li>Tiles flip to show feedback for each letter.</li>
              <li>Use the clues to refine your next guess.</li>
              <li>Guess the word within six attempts to win!</li>
            </ol>

          </div>

          {/* Color legend */}
          <div>
            <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
              <Info className="h-5 w-5" />
              Tile feedback
            </h3>
            <div className="mt-3 space-y-3 text-foreground/80">
              <div className="flex items-center gap-3">
                <Tile label="A" variant="correct" />
                <span><span className="font-semibold">Correct</span>: right letter in the right spot.</span>
              </div>
              <div className="flex items-center gap-3">
                <Tile label="A" variant="present" />
                <span><span className="font-semibold">Present</span>: letter exists, but in a different spot.</span>
              </div>
              <div className="flex items-center gap-3">
                <Tile label="A" variant="absent" />
                <span><span className="font-semibold">Absent</span>: letter is not in the word.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard guide */}
        <div className="mt-8">
          <h3 className="text-md font-semibold text-foreground">Keyboard guide</h3>
          <p className="mt-2 text-foreground/80">
            You can play with your keyboard or on-screen keys. Special keys:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-foreground/80">
            <KeyCap label="Enter" /> <span>Submit guess</span>
            <span className="opacity-50">·</span>
            <KeyCap label="Backspace" /> <KeyCap label="⌫" /> <span>Delete letter</span>
          </div>
        </div>

        {/* Rules & notes */}
        <div className="mt-8">
          <h3 className="text-md font-semibold text-foreground">Rules & notes</h3>
          <ul className="mt-3 list-disc list-inside space-y-2 text-foreground/80">
            <li>Guesses must be valid words in the game dictionary.</li>
            <li>Letters can repeat (feedback reflects each position).</li>
            <li>Daily mode uses the same word for everyone on that day.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};
