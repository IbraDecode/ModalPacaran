import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { useAppStore } from '@/app/store';

const PermissionChip = ({ label, ok }: { label: string; ok: boolean }) => (
  <div className="flex items-center justify-between glass-card rounded-2xl px-4 py-3">
    <span>{label}</span>
    <span className={`text-xs px-3 py-1 rounded-full ${ok ? 'bg-green-500/20 text-green-200' : 'bg-white/10'}`}>
      {ok ? 'OK ✅' : 'BELUM'}
    </span>
  </div>
);

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
    <div className="min-h-screen bg-night text-slate-100 flex flex-col items-center px-6 py-10 space-y-4">
      <Kucing mood="idle" />
      <div className="max-w-xl w-full space-y-4">
        <p className="text-lg font-semibold text-center">Sebelum mulai, izinin notif dulu ya. Biar gue gampang ngingetin—tanpa spam.</p>
        <PermissionChip label="Notifikasi" ok={notifOk} />
        <PermissionChip label="Getar halus" ok={vibrateOk} />
        <PermissionChip label="Sound ringan" ok={soundOk} />
        <PermissionChip label="Install ke Home" ok={false} />
        <div className="flex gap-3 pt-2">
          <Button onClick={handleNotif} className="flex-1">
            Izinkan
          </Button>
          <Button
            className="flex-1 bg-white/10 text-white border border-white/20"
            onClick={() => {
              setFlags({ permDone: true });
              navigate('/profile');
            }}
          >
            Skip dulu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermissionScreen;
