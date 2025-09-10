import { PageTitle } from "../components/PageComponents";
import { GameModeStatistics } from "../components/Statistics";
import { loadPlayerData } from "../utility/UserData";

export const Record = () => {
  const player = loadPlayerData();
  const dailyGame = player.dailyGame;
  const freeGame = player.freeGame;

  return (
    <div className= "flex flex-col bg-background h-dvh">
      <div className="flex-1 min-h-0 overflow-y-auto pb-24">
        {GameModeStatistics(dailyGame)}
        {GameModeStatistics(freeGame)}
      </div>
    </div>
  );
}
