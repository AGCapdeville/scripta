// tailwind.config.cjs

const { text } = require('framer-motion/client');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'], // optional: enables `dark:` with your data attribute
    theme: {
        extend: {
            colors: {
                // Custom general colors
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",

                fade_in: "hsl(var(--fade-in) / <alpha-value>)",

                text: "hsl(var(--text) / <alpha-value>)",
                text_page: "hsl(var(--text-page) / <alpha-value>)",

                navbar: "hsl(var(--navbar) / <alpha-value>)",

                // Custom colors for the word game
                letter_bg: "hsl(var(--letter-bg) / <alpha-value>)",
                letter_text: "hsl(var(--letter-text) / <alpha-value>)",
                letter_correct: "hsl(var(--letter-correct) / <alpha-value>)",
                letter_present: "hsl(var(--letter-present) / <alpha-value>)",
                letter_default: "hsl(var(--letter-default) / <alpha-value>)",
                letter_border: "hsl(var(--letter-border) / <alpha-value>)",

                // Custom colors for the on-screen keyboard
                key_bg: "hsl(var(--key-bg) / <alpha-value>)",
                key_text: "hsl(var(--key-text) / <alpha-value>)",
                key_correct: "hsl(var(--key-correct) / <alpha-value>)",
                key_present: "hsl(var(--key-present) / <alpha-value>)",
                key_missing: "hsl(var(--key-missing) / <alpha-value>)",
                key_default: "hsl(var(--key-default) / <alpha-value>)",
                key_border: "hsl(var(--key-border) / <alpha-value>)",
            },
            scale: {
                55: "0.55",
                65: "0.65",
            },
            screens: {
                'xs': '375px',   // iPhone SE / small Androids
                'xxs': '320px',  // very tiny devices
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "50%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-5px)" },
                },
            },
            animation: {
                shake: "shake 0.5s ease-in-out",
            },
        },
    },
    plugins: [],
}
  
  