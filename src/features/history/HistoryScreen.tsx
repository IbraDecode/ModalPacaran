import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import { TimelineItem } from '@/app/types';
import { fetchTimeline } from '@/services/rtdbRepo';
import { useAppStore } from '@/app/store';
import { formatCurrency } from '@/utils/currency';

const HistoryScreen = () => {
  const roomId = useAppStore((s) => s.flags.roomId)!;
  const [items, setItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTimeline(roomId);
      setItems(data.sort((a, b) => b.ts - a.ts));
    };
    load();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-night text-slate-100 px-5 py-6 space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">History</h1>
        <Link to="/home" className="text-sm underline">
          Kembali
        </Link>
      </div>
      <GlassCard className="space-y-3">
        {items.length === 0 && <p className="text-sm text-white/70">Belum ada apa-apa. Kita mulai pelan.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.by === useAppStore.getState().deviceId ? 'Lo' : 'Dia'} setor</span>
            <span>{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

export default HistoryScreen;
