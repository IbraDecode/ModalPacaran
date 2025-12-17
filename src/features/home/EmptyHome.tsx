import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { GlassCard } from '@/components/GlassCard';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';
import { useAppStore } from '@/app/store';

const EmptyHome = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-sm font-semibold">
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'K'}
        </div>
        <div>
          <p className="text-xs text-[var(--text-secondary)]">Halo, {profile.name || 'lo berdua'}</p>
          <p className="text-base font-semibold leading-tight">Kayaknya lo belum nyambung</p>
        </div>
      </div>
      <div className="text-xs text-[var(--text-secondary)] px-3 py-2 rounded-full border border-[var(--border)]">Mode santai</div>
    </div>
  );
  return (
    <MobileShell className="flex flex-col" footer={<BottomNav />} header={header}>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
        <Kucing mood="coding" />
        <GlassCard className="w-full max-w-md text-center space-y-3 bg-[var(--surface)]">
          <p className="text-lg font-semibold">Kayaknya lo belum nyambung sama pasangan lo nih.</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Yuk bikin room.</p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button onClick={() => navigate('/pair')} className="w-full py-3">
              Buat Room
            </Button>
            <Button onClick={() => navigate('/pair?mode=join')} className="w-full py-3 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              Join Room
            </Button>
          </div>
        </GlassCard>
      </div>
    </MobileShell>
  );
};

export default EmptyHome;
