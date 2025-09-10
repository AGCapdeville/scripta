// Keys.tsx
import React, { useCallback, useEffect, useMemo, useRef } from "react";

type KeyState = "correct" | "present" | "absent" | undefined;

type KeysProps = {
  // Called when user enters a letter (A-Z)
  onChar: (ch: string) => void;
  // Called on backspace/delete
  onDelete: () => void;
  // Called when user submits; guarded so it only runs once until resolved
  submitGuess: () => Promise<void> | void;

  // Optional: map letters to their color/state for the UI
  keyStates?: Record<string, KeyState>;

  // Optional: disable entire keyboard
  disabled?: boolean;
};

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

export const Keys = ({
  onChar,
  onDelete,
  submitGuess,
  keyStates = {},
  disabled = false,
}: KeysProps) => {
  // Prevent double submits (rapid Enter taps, on-screen + hardware overlap, etc.)

  const handleKey = useCallback(
    (raw: string) => {
      if (disabled) return;

      const key = raw.toUpperCase();

      if (key === "ENTER") {
        submitGuess()
        return;
      }

      if (key === "BACKSPACE" || key === "DEL" || key === "DELETE") {
        onDelete();
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        onChar(key);
      }
    },
    [disabled, onChar, onDelete]
  );

  // Hardware keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Avoid interfering with inputs/textareas
      const target = e.target as HTMLElement | null;
      const tag = (target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;

      // Normalize keys we care about
      const { key } = e;

      // Prevent scroll on space/backspace, and form submits on Enter
      if (key === "Enter" || key === "Backspace") {
        e.preventDefault();
      }

      // Route it
      handleKey(key);
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const classesFor = useCallback(
    (label: string) => {
      // basic Tailwind-ish classes — adjust to your design system
      const base =
        "rounded-md px-2 sm:px-3 md:px-4 " +        // horizontal padding scales
        "h-10 sm:h-12 md:h-14 " +                    // key height scales
        "text-[12px] sm:text-xs md:text-sm font-bold uppercase " + // text size scales
        "flex items-center justify-center " +
        "transition-colors duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ";
        

      const wide = label === "ENTER" || label === "DEL" ? " basis-1 p-1 m-1" : "";
      const state = keyStates[label] as KeyState;

      let color = "bg-key-bg-default text-key-text"; // default key
      if (state === "correct") color = "bg-key-bg-correct text-key-text-invert";
      else if (state === "present") color = "bg-key-bg-present text-key-text-invert";
      else if (state === "absent") color = "bg-key-bg-absent text-key-text-invert";

      return `${base} ${color}${wide}`;
    },
    [keyStates]
  );

  const layout = useMemo(() => ROWS, []);

  return (
    // <div className="flex flex-col items-center select-none w-full" aria-label="Keyboard">
    <div className="w-full max-w-[640px] sm:max-w-[720px] mx-auto px-2 select-none" aria-label="Keyboard">

      {layout.map((row, rIdx) => {
        const gridCols =
          rIdx === 0 ? "grid-cols-10" :
          rIdx === 1 ? "grid-cols-9" :
            "grid-cols-11"; // last row has 9 letters + ENTER + DEL

        return (
          <div
            key={`row-${rIdx}`}
            className={`grid ${gridCols} gap-2 py-1 w-full`}
            role="row"
          >
          {row.map((label) => {
            const isAction = label === "ENTER" || label === "DEL";
            const span = isAction && rIdx === 2 ? "col-span-2" : "col-span-1";            
          
            return (  
              <button
                key={label}
                disabled={disabled}
                className={`${classesFor(label)} ${span}`}

                onMouseDown={(e) => {
                  // onMouseDown avoids losing focus on mobile
                  e.preventDefault();
                  handleKey(label === "DEL" ? "Backspace" : label);
                }}
                
                onKeyDown={(e) => {
                  // Allow Enter/Space to "press" focused on-screen key for accessibility
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleKey(label === "DEL" ? "Backspace" : label);
                  }
                }}
              >
                {label === "DEL" ? "⌫" : label}
              </button>
            )
          })}
          </div>
        )}
      )}

    </div>
  );
}

