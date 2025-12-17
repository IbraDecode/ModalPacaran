import { useEffect } from 'react';
import { useAppStore } from '@/app/store';

const ThemeWatcher = () => {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return null;
};

export default ThemeWatcher;
