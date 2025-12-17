import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import Kucing from '@/components/Kucing';
import { useAppStore } from '@/app/store';
import { createRoom, joinRoom } from '@/services/rtdbRepo';
import { Member } from '@/app/types';
import MobileShell from '@/components/MobileShell';

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const PairingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode') === 'join' ? 'join' : 'create';
  const [roomCode, setRoomCode] = useState(generateCode());
  const [inputCode, setInputCode] = useState('');
  const [status, setStatus] = useState('');
  const profile = useAppStore((s) => s.profile);
  const deviceId = useAppStore((s) => s.deviceId);
  const setFlags = useAppStore((s) => s.setFlags);

  useEffect(() => {
    if (mode === 'create') setRoomCode(generateCode());
  }, [mode]);

  const member: Member = useMemo(
    () => ({
      deviceId,
      name: profile.name || 'Gak disebut',
      gender: profile.gender,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      totalSaved: 0,
    }),
    [deviceId, profile.gender, profile.name],
  );

  const handleCreate = async () => {
    try {
      setStatus('Bikin room...');
      await createRoom(roomCode, { createdAt: Date.now(), targetName: profile.targetName, targetAmount: profile.targetAmount }, member);
      setFlags({ roomId: roomCode });
      setStatus('Yeay. Udah nyambung.');
      navigate('/home');
    } catch (e) {
      console.error(e);
      setStatus('Gagal bikin room.');
    }
  };

  const handleJoin = async () => {
    try {
      setStatus('Lagi cek room...');
      await joinRoom(inputCode.toUpperCase(), member);
      setFlags({ roomId: inputCode.toUpperCase() });
      setStatus('Yeay. Udah nyambung.');
      navigate('/home');
    } catch (e) {
      console.error(e);
      if ((e as Error).message === 'room-full') setStatus('Room ini udah penuh. Cari yang lain ya.');
      else setStatus('Room ga ketemu.');
    }
  };

  return (
    <MobileShell
      header={
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">Step 5</p>
            <p className="text-base font-semibold">Sambungin dulu</p>
          </div>
          <button className="text-xs text-[var(--text-secondary)] px-3 py-2 rounded-full border border-[var(--border)]" onClick={() => navigate('/start')}>
            Balik
          </button>
        </div>
      }
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <GlassCard className="bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <Kucing
              mood={status.includes('penuh') || status.includes('Gagal') ? 'fail' : status.includes('Yeay') ? 'success' : 'idle'}
              className="w-24"
            />
            <div>
              <p className="text-lg font-semibold">{mode === 'create' ? 'Bagi kode ini' : 'Masuk pake kode dia'}</p>
              <p className="text-sm text-[var(--text-secondary)]">Sekali konek, setor langsung kebaca sama dia.</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 bg-[var(--surface)]">
          {mode === 'create' ? (
            <>
              <p className="text-sm text-[var(--text-secondary)]">Kasih kode ini ke dia.</p>
              <div className="text-3xl tracking-widest text-center font-mono py-2 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                {roomCode}
              </div>
              <Button className="w-full" onClick={handleCreate}>
                Buat Room
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-[var(--text-secondary)]">Masukin kode room dia.</p>
              <input
                className="w-full rounded-2xl bg-[var(--card)] border border-[var(--border)] px-3 py-3 focus:outline-none text-center tracking-widest"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <Button className="w-full" onClick={handleJoin}>
                Join Room
              </Button>
            </>
          )}
          <p className="text-sm text-[var(--text-secondary)] text-center min-h-5">{status || 'Realtime, maksimal berdua.'}</p>
        </GlassCard>
      </div>
    </MobileShell>
  );
};

export default PairingScreen;
