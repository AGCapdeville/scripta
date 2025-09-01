import { GameModeStatistics } from "../components/Statistics";
import { loadPlayerData } from "../utility/UserData";

export const Record = () => {
  const player = loadPlayerData();
  const dailyGame = player.dailyGame;
  const freeGame = player.freeGame;

  return (
    <div className="flex flex-col items-center bg-background w-full min-h-screen  overflow-y-auto text-text p-4">
      <div className="text-2xl py-2 font-bold text-text-page-bold">Player Record</div>
      {GameModeStatistics(dailyGame)}
      {GameModeStatistics(freeGame)}
    </div>
  );
}
