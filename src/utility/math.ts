
export const toPercentage = (value: number, total: number): string => {
    if (total === 0) return "0%";
    const percentage = (value / total) * 100;
    return `${Math.round(percentage)}%`;
}