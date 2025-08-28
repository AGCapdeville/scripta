import { Link } from 'react-router-dom';
import { PresentLetterColor } from '../types/Colors'


export const Home = () => {
  
  // While developing.
  // localStorage.clear(); // Clear local storage for testing purposes  
  return (
    <>
      <p>Select a game:</p>
      <div className="flex flex-col w-full items-center content-evenly">
        <div className="
            w-fit px-4 py-2 
            text-sm font-medium 
          bg-[#7B5CF0] 
          text-white rounded"
          >
          <Link to="/scripta/daily">Daily Word</Link>
        </div>
      </div>
    </>
  );
}