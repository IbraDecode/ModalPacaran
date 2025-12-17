import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';

const AlarmScreen = () => {
  const [favHour, setFavHour] = useState('19:00');
  return (
    <MobileShell
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Alarm / Reminder</h1>
          <Link to="/home" className="text-sm text-[var(--text-secondary)]">
            Tutup
          </Link>
        </div>
      }
      footer={<BottomNav />}
    >
      <GlassCard className="space-y-3 bg-[var(--surface)]">
        <p className="text-sm text-[var(--text-secondary)]">Jam reminder favorit</p>
        <input
          type="time"
          value={favHour}
          onChange={(e) => setFavHour(e.target.value)}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-3 py-3"
        />
        <p className="text-sm text-[var(--text-secondary)]">Kalau lo buka app sekitar jam ini dan belum setor, gue bisikin.</p>
        <Button className="w-full">Simpan</Button>
      </GlassCard>
    </MobileShell>
  );
};

export default AlarmScreen;
