

export const getCountdown = (targetDate : Date): String => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}


export const convertTime = (seconds : number): String => {
    // Calculate hours, minutes, and seconds
    let hr = Math.floor(seconds / 3600);
    let remainingSec = seconds % 3600;
    let min = Math.floor(remainingSec / 60);
    let sec = remainingSec % 60;

    // Convert to strings and pad with a leading zero if necessary
    let paddedHours = String(hr).padStart(2, '0');
    let paddedMinutes = String(min).padStart(2, '0');
    let paddedSeconds = String(sec).padStart(2, '0');

    // Combine into a formatted time string
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}