export const toDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

export const isSameDay = (a: Date, b: Date) => toDateKey(a) === toDateKey(b);

export const lastNDays = (n: number) => {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toDateKey(d));
  }
  return days;
};

export const relativeTimeFromNow = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  if (diff < 60_000) return 'baru aja';
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
};

export const calcStreak = (daily: Record<string, number | undefined>) => {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 30; i += 1) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = toDateKey(d);
    if (daily[key]) streak += 1;
    else break;
  }
  return streak;
};
