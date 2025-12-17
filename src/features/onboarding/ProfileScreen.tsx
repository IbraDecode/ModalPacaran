import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import MobileShell from '@/components/MobileShell';
import { useAppStore } from '@/app/store';

const genders = [
  { value: 'male', label: 'Cowok' },
  { value: 'female', label: 'Cewek' },
  { value: 'other', label: 'Lainnya' },
  { value: 'skip', label: 'Skip' },
] as const;

const ProfileScreen = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const setFlags = useAppStore((s) => s.setFlags);
  const [name, setName] = useState(profile.name);
  const [gender, setGender] = useState(profile.gender);
  const [targetName, setTargetName] = useState(profile.targetName);
  const [targetAmount, setTargetAmount] = useState(profile.targetAmount);

  return (
    <MobileShell className="pt-6 space-y-6">
      <div className="flex items-center justify-center">
        <Kucing mood="idle" />
      </div>
      <div className="w-full max-w-xl space-y-4 mx-auto">
        <p className="text-lg font-semibold text-center">Isi dikit biar gue manggil lo bener.</p>
        <div className="glass-card rounded-3xl p-5 space-y-3 bg-[var(--surface)]">
          <label className="space-y-2 block">
            <span className="text-sm text-[var(--text-secondary)]">Lo cowok/cewek?</span>
            <div className="grid grid-cols-2 gap-2">
              {genders.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`rounded-2xl border px-3 py-2 text-sm transition ${
                    gender === g.value ? 'bg-[var(--accent)] text-white border-transparent shadow' : 'bg-[var(--surface)] border-[var(--border)]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </label>
          <label className="space-y-2 block">
            <span className="text-sm text-[var(--text-secondary)]">Gue panggil lo apa?</span>
            <input
              className="w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-3 py-3 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama panggilan"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm text-[var(--text-secondary)]">Target kalian apa?</span>
            <input
              className="w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-3 py-3 focus:outline-none"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
            />
            <input
              type="number"
              className="w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-3 py-3 focus:outline-none"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
            />
          </label>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            setProfile({ name, gender, targetName, targetAmount });
            setFlags({ profileDone: true });
            navigate('/start');
          }}
        >
          Lanjut
        </Button>
      </div>
    </MobileShell>
  );
};

export default ProfileScreen;
