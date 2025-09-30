import { useState } from "react";
import { ApplyTheme, FetchTheme } from "../theme/ThemeFunctions";
import { PageTitle } from "../components/PageComponents.js";
import { Sun, Moon } from "lucide-react";


const ThemeEvent = (theme: string, setChosenTheme: React.Dispatch<React.SetStateAction<string>>) => {
  ApplyTheme(theme as "light" | "dark");
  setChosenTheme(theme);
}

export const Settings = () => {
  const [chosenTheme, setChosenTheme] = useState(() => FetchTheme());
  
  const ThemeButton = ({selected}: {selected: boolean}) =>`
    flex items-center justify-center
    w-fit h-fit px-4 py-2 
    text-sm font-medium 
    rounded m-3
    ${selected ? "ring-3 ring-key-bg-present ring-offset-2 ring-offset-background" : "ring-1 ring-foreground/50 text-foreground/50"}
  `
  return (

    <div className= "flex flex-col min-h-screen w-full mx-auto max-w-6xl bg-background text-foreground">
      <PageTitle title="Settings" />
      
      <div className="relative w-[100px] h-[50px] rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 text-xl text-foreground">
          <div>Mode:</div>
        </div>
        <div className="flex flex-row">
          <button
            id="light-theme"
            className={ThemeButton({selected: chosenTheme === "light"})}
            onClick={() => ThemeEvent("light", setChosenTheme)}
          >
            <Sun className="w-6 h-6 p-1"/>Light
          </button>
          <button
            id="dark-theme"
            className={ThemeButton({selected: chosenTheme === "dark" })}
            onClick={() => ThemeEvent("dark", setChosenTheme)}
          >
            <Moon className="w-6 h-6 p-1" />Dark
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xl text-foreground">
          <div>Theme Example:</div>
        </div>

        <div
          className={
          `w-[200px] h-fit p-2 m-2 place-items-center 
          rounded-lg border-2
          [backface-visibility:hidden]
          text-letter-text
          bg-letter-bg-default
          border-letter-border`
          }
        >
          Default letter
        </div>

        <div
          className={
          `w-[200px] h-fit p-2 m-2 place-items-center 
          rounded-lg border-2
          [backface-visibility:hidden]
          text-letter-text-invert
          bg-letter-bg-absent
          border-letter-bg-absent`
          }
        >
          Absent letter
        </div>

        <div
          className={
            `w-[200px] h-fit p-2 m-2 place-items-center 
          rounded-lg border-2
          [backface-visibility:hidden]
          text-letter-text-invert
          bg-letter-bg-present 
          border-letter-bg-present`
          }
        >
          Present letter
        </div>

        <div
          className={
          `w-[200px] h-fit p-2 m-2 place-items-center 
          rounded-lg border-2
          [backface-visibility:hidden]
          text-letter-text-invert
          bg-letter-bg-correct 
          border-letter-bg-correct`
          }
        >
          Correct letter
        </div>
      <button className={` 
        w-[200px] h-fit
        mt-10
        px-4 py-2 rounded-lg
      bg-blue-600 text-white font-medium 
      hover:bg-blue-700 active:scale-95 transition`}
        onClick={() => { localStorage.clear(); alert("Memory has been cleared!");}
      }>
        Clear Porgress
      </button>
      </div>
    </div>
  );
}