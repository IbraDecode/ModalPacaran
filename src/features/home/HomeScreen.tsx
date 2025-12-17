import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import SavingsChart, { ChartPoint } from '@/components/SavingsChart';
import { useAppStore } from '@/app/store';
import { addDeposit, listenRoom } from '@/services/rtdbRepo';
import { enqueueDeposit } from '@/services/offlineQueue';
import { calcStreak, lastNDays, toDateKey, relativeTimeFromNow } from '@/utils/dateKey';
import { copyEngine } from '@/services/copyEngine';
import { formatCurrency } from '@/utils/currency';

const HomeScreen = () => {
  const roomId = useAppStore((s) => s.flags.roomId)!;
  const room = useAppStore((s) => s.room);
  const setRoom = useAppStore((s) => s.setRoom);
  const deviceId = useAppStore((s) => s.deviceId);
  const profile = useAppStore((s) => s.profile);
  const [amount, setAmount] = useState(7000);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    const unsub = listenRoom(roomId, setRoom);
    return () => unsub && unsub();
  }, [roomId, setRoom]);

  const me = room?.members?.[deviceId];
  const partner = room && Object.values(room.members || {}).find((m) => m.deviceId !== deviceId);

  const daily = room?.savings?.daily?.[toDateKey()] || {};
  const myToday = daily?.[deviceId] || 0;
  const partnerToday = partner ? daily?.[partner.deviceId] || 0 : 0;
  const totalMe = me?.totalSaved || 0;
  const totalPartner = partner?.totalSaved || 0;
  const totalTogether = totalMe + totalPartner;

  const streak = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(room?.savings?.daily || {}).forEach(([day, entries]) => {
      map[day] = entries[deviceId] ?? 0;
    });
    return calcStreak(map);
  }, [room, deviceId]);

  const dayState = myToday > 0 ? 'deposited' : partnerToday > 0 ? 'opened' : 'idle';
  const copy = copyEngine({ role: 'owner', timeOfDay: new Date().getHours() < 12 ? 'pagi' : new Date().getHours() < 18 ? 'siang' : 'malam', dayState, streak, lastBy: partnerToday > 0 && myToday === 0 ? 'dia' : myToday > 0 ? 'aku' : undefined });

  const chartData: ChartPoint[] = useMemo(() => {
    const days = lastNDays(7);
    return days.map((day) => ({
      day: day.slice(5),
      aku: room?.savings?.daily?.[day]?.[deviceId] || 0,
      dia: partner ? room?.savings?.daily?.[day]?.[partner.deviceId] || 0 : 0,
      total: (room?.savings?.daily?.[day]?.[deviceId] || 0) + (partner ? room?.savings?.daily?.[day]?.[partner.deviceId] || 0 : 0),
    }));
  }, [deviceId, partner, room]);

  const handleDeposit = async (value: number) => {
    if (!roomId) return;
    const actionId = crypto.randomUUID();
    setPending(true);
    try {
      if (navigator.onLine) {
        await addDeposit(roomId, deviceId, (room?.savings?.daily?.[toDateKey()]?.[deviceId] || 0) + value, actionId);
      } else {
        await enqueueDeposit({ id: actionId, roomId, deviceId, amount: value, createdAt: Date.now() });
      }
    } finally {
      setPending(false);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-night text-slate-100">
        <Kucing mood="loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night text-slate-100 px-5 py-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-white/70">Halo, {profile.name || 'lo berdua'}</p>
          <p className="text-xl font-semibold">{copy.headline}</p>
          <p className="text-sm text-white/70">{copy.subtitle}</p>
        </div>
        <Kucing mood={dayState === 'deposited' ? 'success' : 'idle'} className="w-28" />
      </div>

      <GlassCard className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">Total berdua</span>
          <span className="text-sm">Target {room.meta.targetName}</span>
        </div>
        <p className="text-3xl font-bold">{formatCurrency(totalTogether)}</p>
        <p className="text-sm text-white/60">Hari ini {formatCurrency(myToday + partnerToday)}</p>
        <div className="text-xs text-orange-200">{partnerToday === 0 ? '⚠ pasangan lo belum setor hari ini' : 'Dua-duanya kebaca'}</div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="space-y-1">
          <p className="text-sm text-white/70">Aku</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalMe)}</p>
          <p className="text-xs text-white/60">{myToday ? `Setor hari ini ${formatCurrency(myToday)}` : 'Belum setor hari ini'}</p>
          <p className="text-xs text-white/50">Last active {me?.lastActive ? relativeTimeFromNow(me.lastActive) : '-'}</p>
        </GlassCard>
        <GlassCard className="space-y-1">
          <p className="text-sm text-white/70">Dia</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalPartner)}</p>
          <p className="text-xs text-white/60">{partnerToday ? `Setor hari ini ${formatCurrency(partnerToday)}` : 'Belum setor hari ini'}</p>
          <p className="text-xs text-white/50">{partner?.lastActive ? `Terakhir ${relativeTimeFromNow(partner.lastActive)}` : 'Belum kelihatan'}</p>
        </GlassCard>
      </div>

      <SavingsChart data={chartData} />

      <GlassCard className="space-y-3">
        <p className="text-sm text-white/70">Quick action</p>
        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => handleDeposit(7000)} disabled={pending}>
            +7K
          </Button>
          <input
            type="number"
            className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-3 focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button className="flex-1" onClick={() => handleDeposit(amount)} disabled={pending}>
            Custom
          </Button>
        </div>
        <div className="flex gap-2 text-sm text-white/70">
          <Link to="/history" className="underline">
            History
          </Link>
          <Link to="/settings" className="underline">
            Room info
          </Link>
        </div>
      </GlassCard>

      <GlassCard className="space-y-2">
        <p className="text-sm">Streak kecil 🔥 {streak} hari</p>
        <p className="text-xs text-white/70">Last move: {partnerToday > 0 && myToday === 0 ? 'dia' : myToday > 0 ? 'aku' : 'belum ada'}</p>
      </GlassCard>
    </div>
  );
};

export default HomeScreen;
