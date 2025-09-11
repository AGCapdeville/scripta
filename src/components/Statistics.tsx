import { PlayerDataProperties, GameModeProperties } from "../types/Game";
import { toPercentage } from "../utility/math";

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
        <div className="w-full max-w-[720px] flex justify-evenly font-sans text-foreground">
            <div className="flex flex-col items-center top-0">
                <div className="font-bold text-2xl">{totalGames}</div>
                <div className="sub-text text-foreground/70">Played </div>
            </div>
            <div className="flex flex-col items-center top-0">
                <div className="font-bold text-2xl">{winRate}</div>
                <div className="sub-text text-foreground/70">Win %</div>
            </div>
            { hideStreak ? 
                <>
                    <div className="flex flex-col items-center top-0">
                        <div className="font-bold text-2xl">{streak}</div>
                        <div className="flex flex-col text-center sub-text text-foreground/70">
                            <div>Current</div> 
                            <div>Streak</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center top-0">
                        <div className="font-bold text-2xl">{maxStreak}</div>
                        <div className="flex flex-col text-center sub-text text-foreground/70">
                            <div>Max</div>
                            <div>Streak</div>
                        </div>
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
        <div className="flex flex-col items-center bg-background md:w-90%">
            <div className="w-full max-w-6xl mt-12 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6">

                <div className="text-xl md:text-3xl text-foreground font-bold py-2">{game.name}</div>
                    <div className="flex flex-col w-full items-center">
                        <div className="text-sm md:text-lg font-black text-foreground m-5">STATISTICS</div>
                        <Statistics 
                            winRate={toPercentage(game.wins, totalGames)}
                            totalGames={totalGames} 
                            streak={game.streak}
                            maxStreak={game.maxStreak} 
                            hideStreak={game.name !== "Practice"}
                        />
                    </div>
                <div className="flex flex-col w-full items-center">
                    <div className="text-sm md:text-lg font-black text-foreground m-5">GUESS DISTRIBUTION</div>
                </div>
                    <Distribution distribution={game.distribution} />

            </div>
        </div>
    );
}