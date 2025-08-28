

export const ApplyTheme = (theme: "light" | "dark" ) => {
    const root = document.documentElement;
    // root.classList.toggle("dark", theme === "dark");   // <== important
    root.setAttribute("data-theme", theme);               // swaps CSS vars
}

