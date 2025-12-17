import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/GlassCard';
import { TimelineItem } from '@/app/types';
import { fetchTimeline } from '@/services/rtdbRepo';
import { useAppStore } from '@/app/store';
import { formatCurrency } from '@/utils/currency';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';

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
    <MobileShell
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">History</h1>
          <Link to="/home" className="text-sm text-[var(--text-secondary)]">
            Tutup
          </Link>
        </div>
      }
      footer={<BottomNav />}
    >
      <GlassCard className="space-y-3 bg-[var(--surface)] max-h-[70vh] overflow-y-auto">
        {items.length === 0 && <p className="text-sm text-[var(--text-secondary)]">Belum ada apa-apa. Kita mulai pelan.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.by === useAppStore.getState().deviceId ? 'Lo' : 'Dia'} setor</span>
            <span>{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </GlassCard>
    </MobileShell>
  );
};

export default HistoryScreen;
