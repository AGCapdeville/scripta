import { PlayerDataProperties, GameModeProperties } from "../types/Game";
import { toPercentage } from "../utility/toPercentage";

interface StatisticsProps {
    winRate: String;
    totalGames: number;
    streak: number;
    maxStreak: number;
    hideStreak?: boolean;
}

export const Statistics = ({
    winRate,
    totalGames,
    streak,
    maxStreak,
    hideStreak = false
}: StatisticsProps) => {

    return (
        <div className="flex justify-evenly max-w-[720px] font-sans text-foreground">
            <div className="flexcolumn centered">
                <div className="font-bold">{totalGames}</div>
                <div className="sub-text text-foreground/50">Played </div>
            </div>
            <div className="flexcolumn centered">
                <div className="font-bold">{winRate}</div>
                <div className="sub-text text-foreground/50">Win %</div>
            </div>
            { hideStreak ? 
                <>
                    <div className="flexcolumn centered">
                        <div className="font-bold">{streak}</div>
                        <div className="sub-text text-foreground/50">Streak</div>
                    </div>
                    <div className="flexcolumn centered">
                        <div className="font-bold">{maxStreak}</div>
                        <div className="sub-text text-foreground/50">Max Streak</div>
                    </div>
                </> : <></>
            }
        </div>
    );
}

export const Distribution = ({ distribution }: { distribution: number[] }) => {

    const total = distribution.reduce((sum, v) => sum + v, 0);
    const maxCount = distribution.length ? Math.max(...distribution) : 0;

    return (
        <div className="grid gap-2">

            {distribution.map((count, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="text-foreground/70 w-6 text-right">
                        {index + 1}:
                    </div>
                    <Bar count={count} maxCount={maxCount} total={total} />
                    <div className="h-4" /> 
                </div>
            ))}
        </div>
    );
}

export const Bar = ({ 
    count, 
    maxCount, 
    total
}:{
    count: number; 
    maxCount: number; 
    total: number; 
}) => {
    const widthPercent = maxCount === 0 ? 0 : (count / maxCount) * 100;
    const percentOfTotal = total === 0 ? 0 : (count / total) * 100;

    if (count === 0) return (<div></div>);

    return (
        <div
            className="h-6 text-foreground px-2 flex items-center bg-blue-400"
            style={{ width: `${widthPercent}%` }}
        >
            {count} ({Math.round(percentOfTotal)}%)
        </div>
    );
}

export const GameModeStatistics = ( game: GameModeProperties ) => {
    const totalGames = game.wins + game.losses;
    return(
        <div className="flex flex-col w-full p-4 mt-4 mb-4">
            <div className="text-2xl text-foreground font-bold py-2">{game.name}</div>
            <div className="text-md text-foreground mt-2 mb-2">STATISTICS:</div>
            <Statistics 
                winRate={toPercentage(game.wins, totalGames)}
                totalGames={totalGames} 
                streak={game.streak}
                maxStreak={game.maxStreak} 
                hideStreak={game.name !== "Free Play"}
            />
            <div className="text-md text-foreground mt-2 mb-2">GUESS DISTRIBUTION:</div>
            <Distribution distribution={game.distribution} />
        </div >
    );
}