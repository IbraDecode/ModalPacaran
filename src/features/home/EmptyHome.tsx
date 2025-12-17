import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { GlassCard } from '@/components/GlassCard';

const EmptyHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-night text-slate-100 px-6 py-10 flex flex-col items-center">
      <Kucing mood="coding" />
      <GlassCard className="max-w-xl w-full text-center space-y-4">
        <p className="text-lg font-semibold">Kayaknya lo belum nyambung sama pasangan lo nih.</p>
        <p className="text-sm text-white/70">Yuk bikin room.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/pair')} className="px-5 py-3">
            Buat Room
          </Button>
          <Button onClick={() => navigate('/pair?mode=join')} className="px-5 py-3 bg-white/10 border border-white/20">
            Join Room
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default EmptyHome;
