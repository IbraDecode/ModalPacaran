import { describe, expect, it } from 'vitest';
import { copyEngine } from '../copyEngine';

describe('copyEngine', () => {
  it('reacts to deposited state', () => {
    const copy = copyEngine({ role: 'owner', timeOfDay: 'pagi', dayState: 'deposited', streak: 5, lastBy: 'aku' });
    expect(copy.headline).toContain('Pelan');
  });

  it('warns when missed', () => {
    const copy = copyEngine({ role: 'owner', timeOfDay: 'malam', dayState: 'missed', streak: 0 });
    expect(copy.headline).toContain('Kelihatan');
  });
});
