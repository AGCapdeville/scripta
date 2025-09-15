import { PageTitle } from "../components/PageComponents";
import { GameModeStatistics } from "../components/Statistics";
import { loadPlayerData } from "../utility/UserData";

export const Record = () => {
  const player = loadPlayerData();

  return (
    <div className= "flex flex-col bg-background h-dvh">
      <div className="flex-1 min-h-0 overflow-y-auto pb-24">
        {GameModeStatistics(player.dailyGame)}
        {GameModeStatistics(player.practiceGame)}
        {GameModeStatistics(player.timedGame)}
      </div>
    </div>
  );
}
