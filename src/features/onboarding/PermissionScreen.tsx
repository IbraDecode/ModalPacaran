import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import MobileShell from '@/components/MobileShell';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore } from '@/app/store';

const PermissionScreen = () => {
  const navigate = useNavigate();
  const [notifOk, setNotifOk] = useState(Notification.permission === 'granted');
  const [vibrateOk, setVibrateOk] = useState(false);
  const [soundOk, setSoundOk] = useState(false);
  const setFlags = useAppStore((s) => s.setFlags);

  useEffect(() => {
    setVibrateOk('vibrate' in navigator);
  }, []);

  const handleNotif = async () => {
    const perm = await Notification.requestPermission();
    setNotifOk(perm === 'granted');
  };

  return (
    <MobileShell className="pt-6 space-y-5">
      <div className="flex items-center gap-3">
        <Kucing mood={notifOk ? 'success' : 'idle'} className="w-24" />
        <div className="space-y-1">
          <p className="text-xl font-semibold">Sebelum mulai, izinin notif dulu ya.</p>
          <p className="text-sm text-[var(--text-secondary)]">Biar gue gampang ngingetin—tanpa spam.</p>
        </div>
      </div>

      <div className="space-y-3">
        <GlassCard className="flex items-center justify-between bg-[var(--surface)]">
          <div>
            <p className="font-semibold">Notifikasi</p>
            <p className="text-sm text-[var(--text-secondary)]">Nudge lembut kalau ada yang ketinggalan.</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${notifOk ? 'bg-[var(--success)]/20 text-[var(--success)]' : 'bg-[var(--border)] text-[var(--text-secondary)]'}`}>
            {notifOk ? 'OK ✅' : 'BELUM'}
          </span>
        </GlassCard>
        <GlassCard className="flex items-center justify-between bg-[var(--surface)]">
          <div>
            <p className="font-semibold">Getar</p>
            <p className="text-sm text-[var(--text-secondary)]">Biar kerasa dikit saat ada aksi.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--border)] text-[var(--text-secondary)]">{vibrateOk ? 'OK ✅' : 'opsional'}</span>
        </GlassCard>
        <GlassCard className="flex items-center justify-between bg-[var(--surface)]">
          <div>
            <p className="font-semibold">Sound ringan</p>
            <p className="text-sm text-[var(--text-secondary)]">Kalem aja.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--border)] text-[var(--text-secondary)]">opsional</span>
        </GlassCard>
        <GlassCard className="flex items-center justify-between bg-[var(--surface)]">
          <div>
            <p className="font-semibold">Install ke Home</p>
            <p className="text-sm text-[var(--text-secondary)]">Biar berasa app beneran.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--border)] text-[var(--text-secondary)]">nanti aja</span>
        </GlassCard>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleNotif} className="flex-1">
          Izinkan
        </Button>
        <Button
          className="flex-1 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]"
          onClick={() => {
            setFlags({ permDone: true });
            navigate('/profile');
          }}
        >
          Skip dulu
        </Button>
      </div>
    </MobileShell>
  );
};

export default PermissionScreen;
