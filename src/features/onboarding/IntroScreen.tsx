import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Kucing from '@/components/Kucing';
import { useAppStore } from '@/app/store';
import MobileShell from '@/components/MobileShell';

const IntroScreen = () => {
  const navigate = useNavigate();
  const setFlags = useAppStore((s) => s.setFlags);
  return (
    <MobileShell className="flex items-center justify-center text-center">
      <div className="w-full space-y-6 flex flex-col items-center">
        <Kucing mood="welcome" />
        <div className="max-w-xl space-y-4">
          <p className="text-xl font-semibold leading-relaxed">Halo. Gue Kucing lo.</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Gue bantuin lo berdua biar konsisten nabung bareng. Santai, gak ada login. Tapi kalau bolong… kelihatan 😼
          </p>
        </div>
        <Button
          onClick={() => {
            setFlags({ introDone: true });
            navigate('/permission');
          }}
          className="px-6 py-3 text-base w-full max-w-sm"
        >
          Mulai
        </Button>
      </div>
    </MobileShell>
  );
};

export default IntroScreen;
