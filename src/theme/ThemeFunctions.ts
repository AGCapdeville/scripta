
export const ApplyTheme = (theme: "light" | "dark") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

export const LoadTheme = () => {
    localStorage.getItem("theme") === "dark" ? ApplyTheme("dark") : ApplyTheme("light");
}

export const FetchTheme = (): string => {
    return localStorage.getItem("theme") || "light";
}   

