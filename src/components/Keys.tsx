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
        // "w-full rounded-md px-2 sm:px-3 md:px-4 " +        // horizontal padding scales
        "rounded-md " +        // horizontal padding scales
        // "h-10 sm:h-12 md:h-14 " +                    // key height scales
        "h-15 sm:h-16 " +                    // key height scales
        "transition-colors duration-150 active:scale-90 disabled:opacity-50 disabled:pointer-events-none " +
        "font-black uppercase " +
        (label === "ENTER" ?
          "text-[12px] sm:text-[16px] md:text-[18px]" :
          "text-[18px] sm:text-[20px] md:text-[22px]"
        );
        

      // const wide = label === "ENTER" || label === "DEL" ? " basis-1 p-1 m-1" : "";
      const state = keyStates[label] as KeyState;

      let color = "bg-key-bg-default text-key-text"; // default key
      if (state === "correct") color = "bg-key-bg-correct text-key-text-invert";
      else if (state === "present") color = "bg-key-bg-present text-key-text-invert";
      else if (state === "absent") color = "bg-key-bg-absent text-key-text-invert";

      // return `${base} ${color} ${wide}`;
      return `${base} ${color}`;
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
            className={`grid ${gridCols} gap-1 min-[400px]:gap-2 py-1`}
            role="row"
          >
          {row.map((label) => {
            const isAction = label === "ENTER" || label === "DEL";
            const span = isAction && rIdx === 2 ? "col-span-2" : "col-span-1";    
            const deleteStyle = (label === "DEL" ? "scale-125 scale-y-120 font-semibold" : "");
            const enterStyle = (label === "ENTER" ? "scale-110 scale-y-125 min-[400px]:scale-120" : "") // TODO: Q: Alberto 400px -> xs

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
                <div className={`${enterStyle} ${deleteStyle}`}>
                 {label === "DEL" ? "⌫" : label}
                </div>
              </button>
            )
          })}
          </div>
        )}
      )}

    </div>
  );
}

