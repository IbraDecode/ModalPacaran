import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import Shimmer from '@/components/Shimmer';
import { useAppStore } from '@/app/store';
import { ensureDeviceId } from '@/services/device';
import { fetchRoom, listenRoom } from '@/services/rtdbRepo';
import { processQueue } from '@/services/offlineQueue';

const BootScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const setDeviceId = useAppStore((s) => s.setDeviceId);
  const flags = useAppStore((s) => s.flags);
  const setFlags = useAppStore((s) => s.setFlags);
  const setRoom = useAppStore((s) => s.setRoom);

  useEffect(() => {
    const id = ensureDeviceId();
    setDeviceId(id);
    const init = async () => {
      try {
        setError(null);
        await processQueue();
        if (flags.roomId) {
          const existing = await fetchRoom(flags.roomId);
          if (existing) {
            setRoom(existing);
            listenRoom(flags.roomId, setRoom);
          }
        }
        const next = !flags.introDone ? '/intro' : !flags.permDone ? '/permission' : !flags.profileDone ? '/profile' : flags.roomId ? '/home' : '/start';
        setTimeout(() => navigate(next, { replace: true }), 600);
      } catch (e) {
        console.error(e);
        setError('Kita lagi keblokir sebentar.');
      }
    };
    init();
  }, [flags, navigate, setDeviceId, setFlags, setRoom]);

  return (
    <div className="app-shell min-h-screen flex flex-col items-center justify-center px-6 text-[var(--text-primary)] bg-[var(--bg)]">
      <Kucing mood="loading" />
      <div className="glass-card rounded-3xl p-6 w-full max-w-md mt-4 text-center border border-[var(--border)]">
        <p className="text-lg font-semibold">ModalPacaran</p>
        <p className="text-sm text-[var(--text-secondary)] mt-2">Lagi siapin ruangan buat kalian berdua.</p>
        <div className="mt-4 space-y-2">
          <Shimmer />
          <Shimmer />
        </div>
        {error && (
          <div className="mt-4 space-y-2">
            <p className="text-[var(--error)]">{error}</p>
            <Button onClick={() => window.location.reload()}>Coba lagi</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootScreen;
