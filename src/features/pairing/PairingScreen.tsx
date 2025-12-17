import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import Kucing from '@/components/Kucing';
import { useAppStore } from '@/app/store';
import { createRoom, joinRoom } from '@/services/rtdbRepo';
import { Member } from '@/app/types';

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
    <div className="min-h-screen bg-night text-slate-100 px-6 py-10 flex flex-col items-center space-y-6">
      <Kucing mood={status.includes('Gagal') ? 'fail' : 'success'} />
      <GlassCard className="max-w-xl w-full space-y-4">
        {mode === 'create' ? (
          <>
            <p className="text-lg font-semibold">Bagi kode ini ke dia.</p>
            <div className="text-3xl tracking-widest text-center font-mono">{roomCode}</div>
            <Button className="w-full" onClick={handleCreate}>
              Buat Room
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold">Masukin kode room dia.</p>
            <input
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-3 focus:outline-none text-center tracking-widest"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <Button className="w-full" onClick={handleJoin}>
              Join Room
            </Button>
          </>
        )}
        <p className="text-sm text-white/70 text-center min-h-5">{status}</p>
      </GlassCard>
    </div>
  );
};

export default PairingScreen;
