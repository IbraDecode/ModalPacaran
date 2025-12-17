import { DayState } from '@/app/types';

export type CopyInput = {
  role: 'owner' | 'partner';
  timeOfDay: 'pagi' | 'siang' | 'malam';
  dayState: DayState;
  streak: number;
  lastBy?: 'aku' | 'dia';
};

export const copyEngine = (input: CopyInput) => {
  const { timeOfDay, dayState, streak, lastBy } = input;
  const greetings: Record<typeof timeOfDay, string> = {
    pagi: 'Pagi slow',
    siang: 'Siang adem',
    malam: 'Malam santai',
  };

  const headlineBase = `${greetings[timeOfDay]}, lanjut dikit?`;
  if (dayState === 'deposited') {
    return {
      headline: 'Pelan tapi jalan.',
      subtitle: `Udah setor${lastBy === 'aku' ? '' : ' dia duluan'}, streak ${streak} hari aman.`,
      cta: 'Setor lagi',
    };
  }
  if (dayState === 'missed') {
    return {
      headline: 'Kelihatan bolongnya 😼',
      subtitle: 'Hari ini belum ada yang gerak. Tarik napas, terus isi sedikit.',
      cta: 'Isi sekarang',
    };
  }
  if (dayState === 'opened') {
    return {
      headline: headlineBase,
      subtitle: lastBy === 'dia' ? 'Dia udah mampir. Lo mau nyusul?' : 'Belum ada yang setor. Buka bentar, isi secuil.',
      cta: 'Setor 7K',
    };
  }
  return {
    headline: 'Halo lagi.',
    subtitle: streak > 2 ? `Streak ${streak} hari. Jangan putus gara-gara males.` : 'Belum ada gerakan. Isi kecil aja.',
    cta: 'Mulai setor',
  };
};
