export default function timeAgo(timestampInSeconds: number): string {
  const now = Date.now();

  const secondsAgo = Math.floor((now - timestampInSeconds * 1000) / 1000);
  if (secondsAgo < 60) return `${secondsAgo} seconds ago`;

  const minutes = Math.floor(secondsAgo / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
