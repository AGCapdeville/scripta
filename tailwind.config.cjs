// tailwind.config.cjs
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
                background: "hsl(var(--background) / <alpha-value>)",
                textColor: "hsl(var(--textColor) / <alpha-value>)",
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
  
  