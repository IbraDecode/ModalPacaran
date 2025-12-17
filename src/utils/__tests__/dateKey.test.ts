import { describe, it, expect, vi } from 'vitest';
import { calcStreak, toDateKey } from '../dateKey';

describe('toDateKey', () => {
  it('formats date to YYYY-MM-DD', () => {
    const d = new Date('2024-10-05T00:00:00.000Z');
    expect(toDateKey(d)).toBe('2024-10-05');
  });
});

describe('calcStreak', () => {
  it('counts consecutive days from today backwards', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-10-05T00:00:00.000Z'));
    const daily = {
      '2024-10-05': 1,
      '2024-10-04': 2,
      '2024-10-03': 2,
      '2024-10-01': 2,
    } as Record<string, number>;
    expect(calcStreak(daily)).toBe(3);
    vi.useRealTimers();
  });
});
