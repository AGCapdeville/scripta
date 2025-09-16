import { useEffect, useState } from "react";

const TileParent = `
    relative w-full h-full rounded-lg
    transition-transform duration-1000 ease-in-out 
    [transform-style:preserve-3d]
`;
const TileFront = `
    absolute inset-0 grid place-items-center rounded-lg
    bg-letter-default
    border-2 border-letter-border
    [backface-visibility:hidden]
`;

const TileBack = `
    absolute inset-0 grid place-items-center rounded-lg
    border-2
    [transform:rotateX(180deg)] 
    [backface-visibility:hidden]
`;

const LetterContainer = `
    w-[64px] h-[64px] 
    [perspective:900px] 
    font-black
`;


type FlipLetterProps = {
    letter: string;
    index: number;
    answer: string;
    placeholder: boolean; // ignore 
    delayMs?: number; // stagger optional
};


export const FlipLetter = ({ letter, index, answer, placeholder, delayMs = 0 }: FlipLetterProps) => {
    const [flipped, setFlipped] = useState(false);
    const [pop, setPop] = useState(false);
    const [borderDark, setBorderDark] = useState(false);

    // choose result color
    const isCorrect = answer[index] === letter;
    const isPresent = !isCorrect && answer.includes(letter);
    const isAbsent = !isCorrect && !isPresent && !placeholder;

    const letterColor = isCorrect ? 'letter-bg-correct' : isPresent ? 'letter-bg-present' : isAbsent ? 'letter-bg-absent' : 'letter-bg-default';
    const letterBorder = isCorrect ? 'letter-bg-correct' : isPresent ? 'letter-bg-present' : isAbsent ? 'letter-bg-absent' : 'letter-border';
    const letterTextColor = isCorrect || isPresent || isAbsent ? 'letter-text-invert' : 'letter-text';

    // Flip logic
    useEffect(() => {
        // start at 0deg, flip after delay -> triggers transition
        const startDelay = Math.max(16, delayMs); // ~1 frame minimum
        const t = setTimeout(() => setFlipped(true), startDelay);
        return () => clearTimeout(t);
    }, [delayMs]);

    useEffect(() => {
        if (isCorrect || isPresent || isAbsent) {
            setBorderDark(false);
            return;
        };

        if (letter.trim() !== "") {
            setBorderDark(true);
            setPop(true);
            const t = setTimeout(() => setPop(false), 350); // ~= animation length
            return () => {
                clearTimeout(t);
            }
        } else {
            setBorderDark(false);
        }
    }, [letter]);

    return (
        <div className={"w-[58px] h-[58px] [perspective:900px] font-black"} >
            <div 
                    // relative w-full h-full
                className={`
                    
                    absolute inset-0 grid place-items-center

                    transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] 
                    ${flipped ? `[transform:rotateX(180deg)]` : ``} 
                    border-2 rounded-lg 
                    ${pop ? "animate-[pop_0.3s_ease-in-out]" : ""}
                    ${borderDark ? "border-black" : `border-${letterBorder}`}
                `}
            >
                <div id="front-card"
                    className={`
                        absolute inset-0 grid place-items-center
                        rounded-lg [backface-visibility:hidden] 
                        bg-letter-bg-default border-letter-border text-letter-text
                    `}
                >
                    {letter}
                </div>
                <div id="back-card"
                    className={`
                        absolute inset-0 grid place-items-center
                        bg-${letterColor} text-${letterTextColor}
                        [transform:rotateX(180deg)] [backface-visibility:hidden]
                    `}
                >
                    <span 
                        // className={`
                        //     w-full h-full
                        //     absolute inset-0 grid place-items-center rounded-lg border-2
                        //     bg-${letterColor} border-${letterBorder} text-${letterTextColor}
                        // `}
                        // ${pop ? "animate-[pop_0.3s_ease-in-out]" : ""}
                        // ${borderDark ? "border-opacity-100" : "border-opacity-50"}
                        // onAnimationStart={() => setBorderDark(true)}
                    >
                        {letter}
                    </span>
                </div>
            </div>
        </div>
    );
}