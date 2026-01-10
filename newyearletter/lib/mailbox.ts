export function getMailboxLevel(letterCount: number) {
  if (letterCount >= 100) return 10;
  return Math.floor(letterCount / 10) + 1;
}
export function getMailboxImage(level: number) {
  return `/mailboxes/level-${level}.png`;
}