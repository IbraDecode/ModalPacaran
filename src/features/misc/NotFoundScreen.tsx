import { Link } from 'react-router-dom';
import Kucing from '@/components/Kucing';

const NotFoundScreen = () => (
  <div className="min-h-screen bg-night text-slate-100 flex flex-col items-center justify-center space-y-4">
    <Kucing mood="404" />
    <p>Nyasar. Balik yuk.</p>
    <Link className="underline" to="/home">
      Kembali ke home
    </Link>
  </div>
);

export default NotFoundScreen;
