import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';
import { useAppStore } from '@/app/store';

const SettingsScreen = () => {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const setFlags = useAppStore((s) => s.setFlags);
  const setRoom = useAppStore((s) => s.setRoom);
  const navigate = useNavigate();
  const [name, setName] = useState(profile.name);
  const [targetName, setTargetName] = useState(profile.targetName);
  const [targetAmount, setTargetAmount] = useState(profile.targetAmount);

  return (
    <div className="min-h-screen bg-night text-slate-100 px-5 py-6 space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Settings</h1>
        <Link to="/home" className="text-sm underline">
          Kembali
        </Link>
      </div>
      <GlassCard className="space-y-3">
        <label className="space-y-1 block text-sm text-white/70">
          Nama panggilan
          <input className="w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-3" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="space-y-1 block text-sm text-white/70">
          Target
          <input className="w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-3" value={targetName} onChange={(e) => setTargetName(e.target.value)} />
          <input
            type="number"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-3"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
          />
        </label>
        <Button
          className="w-full"
          onClick={() => {
            setProfile({ name, targetName, targetAmount });
          }}
        >
          Simpan
        </Button>
        <Button
          className="w-full bg-red-500/80"
          onClick={() => {
            setFlags({ roomId: undefined });
            setRoom(undefined);
            navigate('/start');
          }}
        >
          Leave room
        </Button>
      </GlassCard>
    </div>
  );
};

export default SettingsScreen;
