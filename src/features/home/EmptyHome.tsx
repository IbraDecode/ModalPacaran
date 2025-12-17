import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { GlassCard } from '@/components/GlassCard';
import MobileShell from '@/components/MobileShell';
import BottomNav from '@/components/BottomNav';

const EmptyHome = () => {
  const navigate = useNavigate();
  return (
    <MobileShell className="flex flex-col items-center justify-center" footer={<BottomNav />}>
      <div className="w-full max-w-xl space-y-5 text-center">
        <Kucing mood="coding" />
        <GlassCard className="w-full text-center space-y-3 bg-[var(--surface)]">
          <p className="text-lg font-semibold">Kayaknya lo belum nyambung sama pasangan lo nih.</p>
          <p className="text-sm text-[var(--text-secondary)]">Yuk bikin room.</p>
          <div className="grid grid-cols-2 gap-3">
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
