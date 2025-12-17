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
      <div className="flex-1 min-h-0">
        <GlassCard className="space-y-4 bg-[var(--surface)] h-full overflow-y-auto">
          {items.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-6 text-center text-sm text-[var(--text-secondary)]">
              <p>Belum ada apa-apa. Kita mulai pelan.</p>
            </div>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="pt-1">
                <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="flex-1 pb-2 border-b border-[var(--border)]">
                <p className="text-sm font-semibold">{item.by === useAppStore.getState().deviceId ? 'Lo' : 'Dia'} setor</p>
                <p className="text-xs text-[var(--text-secondary)]">{formatCurrency(item.amount)}</p>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </MobileShell>
  );
};

export default HistoryScreen;
