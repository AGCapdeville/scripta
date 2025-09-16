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

                title_background: "hsl(var(--title-background) / <alpha-value>)",

                fade_in: "hsl(var(--fade-in) / <alpha-value>)",

                text: "hsl(var(--text) / <alpha-value>)",
                text_page: "hsl(var(--text-page) / <alpha-value>)",

                // Custom colors for the word game
                letter_text: "hsl(var(--letter-text) / <alpha-value>)",
                letter_text_invert: "hsl(var(--letter-text-invert) / <alpha-value>)",
                letter_border: "hsl(var(--letter-border) / <alpha-value>)",
                letter_bg_default: "hsl(var(--letter-bg-default) / <alpha-value>)",
                letter_bg_absent: "hsl(var(--letter-bg-absent) / <alpha-value>)",
                letter_bg_present: "hsl(var(--letter-bg-present) / <alpha-value>)",
                letter_bg_correct: "hsl(var(--letter-bg-correct) / <alpha-value>)",

                // Custom colors for the on-screen keyboard
                key_text: "hsl(var(--key-text) / <alpha-value>)",
                key_text_invert: "hsl(var(--key-text-invert) / <alpha-value>)",
                key_border: "hsl(var(--key-border) / <alpha-value>)",
                key_bg_default: "hsl(var(--key-bg-default) / <alpha-value>)",
                key_bg_absent: "hsl(var(--key-bg-absent) / <alpha-value>)",
                key_bg_present: "hsl(var(--key-bg-present) / <alpha-value>)",
                key_bg_correct: "hsl(var(--key-bg-correct) / <alpha-value>)",

                disabled_bg: "hsl(--disabled-bg / <alpha-value>)",
                disabled_foreground: "hsl(--disabled-fg / <alpha-value>)",
                disabled_border: "hsl(--disabled-border / <alpha-value>)",
            },
            scale: {
                55: "0.55",
                65: "0.65",
            },
            screens: {
                xs: '400px',   // iPhone SE / small Androids
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "50%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-5px)" },
                },
                pop: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(2)' },
                },
            },
            animation: {
                shake: "shake 0.5s ease-in-out",
                pop: 'pop 0.3s ease-in-out',
            },
        },
    },
    plugins: [],
}
  
  