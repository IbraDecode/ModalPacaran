import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';

const AlarmScreen = () => {
  const [favHour, setFavHour] = useState('19:00');
  return (
    <div className="min-h-screen bg-night text-slate-100 px-5 py-6 space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Alarm / Reminder</h1>
        <Link to="/home" className="text-sm underline">
          Kembali
        </Link>
      </div>
      <GlassCard className="space-y-3">
        <p className="text-sm text-white/70">Jam reminder favorit</p>
        <input
          type="time"
          value={favHour}
          onChange={(e) => setFavHour(e.target.value)}
          className="rounded-2xl bg-white/5 border border-white/10 px-3 py-3"
        />
        <p className="text-sm text-white/70">Kalau lo buka app sekitar jam ini dan belum setor, gue bisikin.</p>
        <Button className="w-full">Simpan</Button>
      </GlassCard>
    </div>
  );
};

export default AlarmScreen;
