import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { useAppStore } from '@/app/store';

const IntroScreen = () => {
  const navigate = useNavigate();
  const setFlags = useAppStore((s) => s.setFlags);
  return (
    <div className="min-h-screen bg-night text-slate-100 flex flex-col items-center px-6 py-10">
      <Kucing mood="welcome" />
      <div className="max-w-xl text-center space-y-4 mt-4">
        <p className="text-xl font-semibold leading-relaxed">Halo. Gue Kucing lo.</p>
        <p className="text-sm text-white/80">
          Gue bantuin lo berdua biar konsisten nabung bareng. Santai, gak ada login. Tapi kalau bolong… kelihatan 😼
        </p>
        <Button
          onClick={() => {
            setFlags({ introDone: true });
            navigate('/permission');
          }}
          className="px-6 py-3 text-base"
        >
          Mulai
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
