export function TimePast(history) {
    const now = new Date().getTime();
    const timePast = now - history;
    const days = Math.floor(timePast / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timePast % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timePast % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timePast % (1000 * 60)) / 1000);

    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}