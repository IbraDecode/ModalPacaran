import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';
import { useAppStore } from '@/app/store';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';

const SettingsScreen = () => {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const setFlags = useAppStore((s) => s.setFlags);
  const setRoom = useAppStore((s) => s.setRoom);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const navigate = useNavigate();
  const [name, setName] = useState(profile.name);
  const [targetName, setTargetName] = useState(profile.targetName);
  const [targetAmount, setTargetAmount] = useState(profile.targetAmount);

  return (
    <MobileShell
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Settings</h1>
          <Link to="/home" className="text-sm text-[var(--text-secondary)]">
            Tutup
          </Link>
        </div>
      }
      footer={<BottomNav />}
    >
      <div className="flex-1 flex flex-col gap-4">
        <GlassCard className="space-y-3 bg-[var(--surface)]">
          <p className="text-sm font-semibold">Profil</p>
          <label className="space-y-1 block text-sm text-[var(--text-secondary)]">
            Nama panggilan
            <input className="w-full rounded-2xl bg-[var(--card)] border border-[var(--border)] px-3 py-3" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <p className="text-sm font-semibold pt-2">Target</p>
          <input className="w-full rounded-2xl bg-[var(--card)] border border-[var(--border)] px-3 py-3" value={targetName} onChange={(e) => setTargetName(e.target.value)} />
          <input
            type="number"
            className="w-full rounded-2xl bg-[var(--card)] border border-[var(--border)] px-3 py-3"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
          />
          <Button
            className="w-full"
            onClick={() => {
              setProfile({ name, targetName, targetAmount });
            }}
          >
            Simpan
          </Button>
        </GlassCard>

        <GlassCard className="space-y-3 bg-[var(--surface)]">
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>Mode</span>
            <button
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 'Gelap' : 'Terang'}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>Notif</span>
            <span className="px-3 py-1 rounded-full bg-[var(--border)] text-xs">Kelola di browser</span>
          </div>
        </GlassCard>

        <GlassCard className="space-y-3 bg-[var(--surface)]">
          <p className="text-sm font-semibold text-[var(--error)]">Keluar</p>
          <Button
            className="w-full bg-[var(--error)]"
            onClick={() => {
              setFlags({ roomId: undefined });
              setRoom(null);
              navigate('/start');
            }}
          >
            Leave room
          </Button>
        </GlassCard>
      </div>
    </MobileShell>
  );
};

export default SettingsScreen;
