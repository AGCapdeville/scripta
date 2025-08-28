import { ApplyTheme } from "../theme/ThemeFunctions.ts";

export const Settings = () => {
  return (
    <div className="relative w-[100px] h-[50px] rounded-lg p-4 bg-primary text-primary-foreground">
      <h1
        className="
          w-fit px-4 py-2 
          text-sm font-medium 
          text-textColor
          bg-background
          rounded
        "
        >Settings</h1>
      <h1
        className="
          w-fit px-4 py-2 
          text-sm font-medium 
          text-textColor
          bg-background
          rounded
        "
      >Test</h1>
      <button onClick={() => ApplyTheme("light")}>Light Theme</button>
      <button onClick={() => ApplyTheme("dark")}>Dark Theme</button>
    </div>
  );
}