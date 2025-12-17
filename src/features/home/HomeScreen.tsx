import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import SavingsChart, { ChartPoint } from '@/components/SavingsChart';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';
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
      <div className="app-shell min-h-screen flex items-center justify-center text-[var(--text-primary)] bg-[var(--bg)]">
        <Kucing mood="loading" />
      </div>
    );
  }

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-sm font-semibold">
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'K'}
        </div>
        <div>
          <p className="text-xs text-[var(--text-secondary)]">Halo, {profile.name || 'lo berdua'}</p>
          <p className="text-lg font-semibold leading-tight">{copy.headline}</p>
          <p className="text-xs text-[var(--text-secondary)]">{copy.subtitle}</p>
        </div>
      </div>
      <Kucing mood={dayState === 'deposited' ? 'success' : 'idle'} className="w-20" />
    </div>
  );

  return (
    <MobileShell header={header} footer={<BottomNav />} className="flex flex-col gap-4">
      <GlassCard className="space-y-3 bg-[var(--surface)]">
        <div className="flex justify-between items-center text-sm text-[var(--text-secondary)]">
          <span>Total berdua</span>
          <span>Target {room.meta.targetName}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">{formatCurrency(totalTogether)}</p>
          <button className="text-xs text-[var(--text-secondary)]">👁️ Sembunyikan</button>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">Hari ini {formatCurrency(myToday + partnerToday)}</p>
        <div className="text-xs text-amber-400">{partnerToday === 0 ? '⚠ pasangan lo belum setor hari ini' : 'Dua-duanya kebaca'}</div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="space-y-1 bg-[var(--surface)]">
          <p className="text-sm text-[var(--text-secondary)]">Aku</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalMe)}</p>
          <p className="text-xs text-[var(--text-secondary)]">{myToday ? `Setor hari ini ${formatCurrency(myToday)}` : 'Belum setor hari ini'}</p>
          <p className="text-xs text-[var(--text-secondary)]">Last active {me?.lastActive ? relativeTimeFromNow(me.lastActive) : '-'}</p>
        </GlassCard>
        <GlassCard className="space-y-1 bg-[var(--surface)]">
          <p className="text-sm text-[var(--text-secondary)]">Dia</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalPartner)}</p>
          <p className="text-xs text-[var(--text-secondary)]">{partnerToday ? `Setor hari ini ${formatCurrency(partnerToday)}` : 'Belum setor hari ini'}</p>
          <p className="text-xs text-[var(--text-secondary)]">{partner?.lastActive ? `Terakhir ${relativeTimeFromNow(partner.lastActive)}` : 'Belum kelihatan'}</p>
        </GlassCard>
      </div>

      <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Pergerakan 7 hari</p>
          <span className="text-xs text-[var(--text-secondary)]">Ringkas</span>
        </div>
        <SavingsChart data={chartData} />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button
          className="btn flex flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] py-3 text-xs text-[var(--text-primary)]"
          onClick={() => handleDeposit(7000)}
          disabled={pending}
        >
          <span className="h-10 w-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow">+7K</span>
          <span>Tambah</span>
        </button>
        <button
          className="btn flex flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] py-3 text-xs text-[var(--text-primary)]"
          onClick={() => handleDeposit(amount)}
          disabled={pending}
        >
          <input
            type="number"
            className="w-full text-center bg-transparent border-none focus:outline-none text-sm"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <span className="text-[var(--text-secondary)]">Custom</span>
        </button>
        <Link
          to="/history"
          className="btn flex flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] py-3 text-xs text-[var(--text-primary)]"
        >
          <span className="h-10 w-10 rounded-full bg-[var(--border)] flex items-center justify-center">📜</span>
          <span>History</span>
        </Link>
        <Link
          to="/settings"
          className="btn flex flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] py-3 text-xs text-[var(--text-primary)]"
        >
          <span className="h-10 w-10 rounded-full bg-[var(--border)] flex items-center justify-center">ℹ️</span>
          <span>Room</span>
        </Link>
      </div>

      <GlassCard className="space-y-2 bg-[var(--surface)]">
        <p className="text-sm">Streak kecil 🔥 {streak} hari</p>
        <p className="text-xs text-[var(--text-secondary)]">Last move: {partnerToday > 0 && myToday === 0 ? 'dia' : myToday > 0 ? 'aku' : 'belum ada'}</p>
      </GlassCard>
    </MobileShell>
  );
};

export default HomeScreen;
