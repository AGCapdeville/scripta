// components/Results.tsx
import { createPortal } from "react-dom";
import { completeDaily, saveGameScore } from "../utility/user";

type ResultsProps = {
  game: string;
  outcome: boolean;
  guesses: number;
  secretWord: string;
  onClose: () => void;
};

export const Results = ({ game, outcome, guesses, secretWord, onClose }: ResultsProps) => {

  saveGameScore(game, outcome, guesses);

  completeDaily();

  const modalRoot = document.getElementById("modal-root")!;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative z-10 w-full max-w-md
          rounded-xl border border-[#1e1f22]
          bg-[#2b2d31] p-6 shadow-2xl
          text-[#f2f3f5]
          transition-all duration-150 ease-out
          animate-in fade-in zoom-in-95
        "
      >
        {/* Close button */}
        <button
          className="
            absolute right-3 top-3 rounded
            p-1.5 text-[#b5bac1] hover:text-[#f2f3f5]
            hover:bg-white/5 focus:outline-none focus:ring-2
            focus:ring-[#5865F2]/60
          "
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="mb-1 text-lg font-semibold text-white">
          {game} Results
        </h2>
        <p className="mb-4 text-sm text-[#b5bac1]">
          {outcome ? "Nice! You won today’s game." : "Tough round — you’ll get it next time."}
        </p>

        {/* Body */}
        {outcome ? (
          <div className="mb-6 rounded-md bg-[#2f4c8a] px-4 py-3 text-sm">
            You guessed the word in <span className="font-semibold">{guesses}</span> tries!
          </div>
        ) : (
            <div className="mb-6 rounded-md bg-[#8a2f2f] px-4 py-3 text-sm">
              The word was <span className="font-semibold">{secretWord}</span>.
          </div>
        )}


        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-md px-4 py-2 text-sm font-semibold
              text-white bg-[#5865F2]
              hover:bg-[#4752C4] active:bg-[#3c45a5]
              focus:outline-none focus:ring-2 focus:ring-[#5865F2]/60
              shadow
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
