import { useState } from "react";
import { ApplyTheme, FetchTheme } from "../theme/ThemeFunctions.ts";

const ThemeEvent = (theme: string, setChosenTheme: React.Dispatch<React.SetStateAction<string>>) => {
  ApplyTheme(theme as "light" | "dark");
  setChosenTheme(theme);
}

export const Settings = () => {
  const [chosenTheme, setChosenTheme] = useState(() => FetchTheme());
  

  const ThemeButton = ({theme, selected}: {theme: string, selected: boolean}) =>`
    w-fit h-fit px-4 py-2 
    text-sm font-medium 
    rounded bg-foreground m-3
    ${selected ? "ring-2 ring-key-present ring-offset-2 ring-offset-background" : "ring-0"}
  `
    
  return (
    <div className = "min-h-screen w-full flex flex-col bg-background text-text">
      <div className="relative w-[100px] h-[50px] rounded-lg p-4">
        <div className="text-2xl font-bold text-text-page-bold p-4">
          SETTINGS
        </div>
        <div className="text-xl text-text-page">
          Theme:
        </div>
        <div className="flex flex-row">
          <button
            id="light-theme"
            className={ThemeButton({theme: "light", selected: chosenTheme === "light"})}
            onClick={() => ThemeEvent("light", setChosenTheme)}
          >
            Light Theme
          </button>
          <button 
            id="dark-theme"
            className={ThemeButton({ theme: "dark", selected: chosenTheme === "dark" })}
            onClick={() => ThemeEvent("dark", setChosenTheme)}
          >
              Dark Theme
          </button>
        </div>
      </div>
    </div>
  );
}