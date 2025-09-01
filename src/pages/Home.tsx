import { Link } from 'react-router-dom';
import { LoadTheme } from '../theme/ThemeFunctions';
import { useEffect } from 'react';


export const Home = () => {
  
  useEffect(() => {
    LoadTheme();
  }, []);

  return (
    <div className="bg-background h-full w-full min-h-screen p-4">
      <div className="text-2xl font-bold text-text-page p-4">GAMES</div>
      <div className="flex flex-col w-full items-center content-evenly">

        <div className="
          w-fit px-4 py-2 m-4
          text-sm font-medium 
          bg-[#7B5CF0] 
          text-white rounded"
        >
          <Link to="/scripta/daily">Daily Word ☀️</Link>
        </div>

        <div className="
          w-fit px-4 py-2 m-4
          text-sm font-medium 
        bg-[#7B5CF0] 
        text-white rounded"
        >
          <Link to="/scripta/free">Free Word 🎟️</Link>
        </div>

      </div>
    </div>
  );
}