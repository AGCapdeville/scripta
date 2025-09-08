import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

const page = {
    initial: { opacity: 0 },  // fade content in on mount
    animate: { opacity: 1 },
    exit: { opacity: 1 },  // keep visible; overlay handles fade
};

const overlay = {
    initial: { opacity: 1 },  // start fully black to hide background
    animate: { opacity: 0 },  // fade away to reveal page
    exit: { opacity: 1 },  // fade back to black on exit
};

export function Page({ children }: PropsWithChildren) {
    return (
        <motion.main
            className="relative min-h-screen bg-background" // ensures no white flash behind
            variants={page}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            {children}
        </motion.main>
    );
}
