import { useMemo } from "react";
import { GameModeProperties, TimedGameProperties } from "../types/Game";
import { mean, toPercentage } from "../utility/math";
import { Calendar, Infinity, Hourglass } from "lucide-react";
import { convertTime } from "../utility/time";
import React from "react";

interface StatisticsProps {
    winRate: String;
    totalGames: number;
    streak: number;
    maxStreak: number;
    hideStreak?: boolean;
    averageSolveTime: number[],
    bestTime: number
}

interface TimedStatisticsProps {
    gamesPlayed: number;
    averageSolveTime: number[];
    timeSurvived: number;
    maxStreak: number;
}

const Stat = ({ label, value, mono = false }: {
    label: React.ReactNode; value: React.ReactNode; mono?: boolean;
}) => (
    <div className="flex flex-col items-center">
        <div className={`font-bold text-2xl ${mono ? "font-mono tabular-nums" : ""}`}>{value}</div>
        <div className="sub-text text-foreground/70 text-center leading-tight">{label}</div>
    </div>
);

export const TimedStatistics = React.memo(({
    gamesPlayed,
    averageSolveTime,
    timeSurvived,
    maxStreak,
}: TimedStatisticsProps) => {
    const avgSec = useMemo(() => mean(averageSolveTime), [averageSolveTime]);
    const avgFmt = useMemo(() => convertTime(avgSec), [avgSec]);
    const survivedFmt = useMemo(() => convertTime(timeSurvived), [timeSurvived]);

    return (
        <div className="w-full max-w-[720px] flex flex-col justify-evenly font-sans text-foreground">
            <div className="w-full flex justify-evenly">
                <div className="w-full flex justify-evenly mt-4">
                    <Stat label="Played" value={gamesPlayed} />
                </div>
                <div className="w-full flex justify-evenly mt-4">
                    <Stat label={<>Max<br />Streak</>} value={maxStreak} />
                </div>
            </div>

            <div className="w-full flex justify-evenly mt-4">
                <div className="w-full flex justify-evenly mt-4">
                    <Stat label="Best Time Survived" value={survivedFmt} mono />
                </div>
                <div className="w-full flex justify-evenly mt-4">
                    <Stat label="Average Time Per Word" value={avgFmt} mono />
                </div>
            </div>
        </div>
    );
});

export const Statistics = React.memo(({
    winRate, totalGames, streak, maxStreak, hideStreak = false,
    averageSolveTime, bestTime
}: StatisticsProps) => {
    const avgSec = useMemo(() => mean(averageSolveTime), [averageSolveTime]);
    const avgFmt = useMemo(() => convertTime(avgSec), [avgSec]);
    const bestFmt = useMemo(() => convertTime(bestTime), [bestTime]);

    return (
        <div className="w-full max-w-[720px] flex flex-col justify-evenly font-sans text-foreground">
            <div className="w-full flex justify-evenly">
                {hideStreak ? 
                    <>
                        <Stat label="Played" value={totalGames} />
                        <Stat label="Win %" value={winRate} />
                    </> : 
                    <>
                        <div className="w-full flex justify-evenly">
                            <div className="w-full flex justify-evenly mt-4">
                                <Stat label="Played" value={totalGames} />
                            </div>
                            <div className="w-full flex justify-evenly mt-4">
                                <Stat label="Win %" value={winRate} />
                            </div>
                        </div>
                    </>
                }

                {hideStreak && (
                    <>
                        <Stat label={<>Current<br />Streak</>} value={streak} />
                        <Stat label={<>Max<br />Streak</>} value={maxStreak} />
                    </>
                )}
            </div>

            {hideStreak && (
                <div className="w-full flex justify-evenly mt-4">
                    <div className="w-full flex justify-evenly mt-4">
                        <Stat label="Best Solve Time" value={bestFmt} mono />
                    </div>
                    <div className="w-full flex justify-evenly mt-4">
                        <Stat label="Average Solve Time" value={avgFmt} mono />
                    </div>
                </div>
            )}
        </div>
    );
});

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
  

export const GameModeStatistics = (game: GameModeProperties | TimedGameProperties) => {
    // Type guard to check if 'wins' and 'losses' exist
    const isBaseGame = (g: any): g is GameModeProperties => 
        typeof g.wins === "number" && typeof g.losses === "number" && Array.isArray(g.distribution);

    if (isBaseGame(game)) {
        const totalGames = game.wins + game.losses;
        const winRate = toPercentage(game.wins, totalGames);
        const distribution = game.distribution;

        const avgSolvedTime = game.averageSolveTime;
        const bestTime = game.bestTime;

        return(
            <div className="flex flex-col m-5 items-center bg-background md:w-90%">
                <div className="w-full max-w-6xl mt-12 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6">
                    {/* <div className="flex items-center text-xl md:text-3xl text-foreground font-bold py-2"> */}
                    <div className="flex items-center justify-center gap-3 p-2 text-foreground text-2xl md:text-3xl font-bold">
                        {game.name === "Daily" && <Calendar className="h-6 w-6 md:h-7 md:w-7 text-foreground/80" />}
                        {game.name === "Practice" && <Infinity className="h-6 w-6 md:h-7 md:w-7 text-foreground/80" />}
                        <span>{game.name}</span>
                    </div>
                        <div className="flex flex-col w-full items-center">
                            
                            <div className="text-sm md:text-lg font-black text-foreground m-5">STATISTICS</div>
                            <Statistics 
                                winRate={winRate}
                                totalGames={totalGames} 
                                streak={game.streak}
                                maxStreak={game.maxStreak} 
                                hideStreak={game.name !== "Practice"}
                                averageSolveTime={avgSolvedTime}
                                bestTime={bestTime}
                            />
                        </div>
                    <div className="flex flex-col w-full items-center">
                        <div className="text-sm md:text-lg font-black text-foreground m-5">GUESS DISTRIBUTION</div>
                    </div>
                    <Distribution distribution={distribution} />
    
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col m-5 items-center bg-background md:w-90%">
                <div className="w-full max-w-6xl mt-12 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6">
                    {/* <div className="flex items-center text-xl md:text-3xl text-foreground font-bold py-2"> */}
                    <div className="flex items-center justify-center gap-3 p-2 text-foreground text-2xl md:text-3xl font-bold">
                        <Hourglass className="h-6 w-6 md:h-7 md:w-7 text-foreground/80" />
                        <span>{game.name}</span>
                    </div>
                    <div className="flex flex-col w-full items-center">
                        <div className="text-sm md:text-lg font-black text-foreground m-5">STATISTICS</div>
                        <TimedStatistics
                            gamesPlayed={game.gamesPlayed}
                            averageSolveTime={game.averageSolveTime}
                            timeSurvived={game.timeSurvived}
                            maxStreak={game.maxStreak}
                        />
                    </div>

                </div>
            </div>
        );
    }
}