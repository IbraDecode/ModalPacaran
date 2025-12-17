import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from './store';
import BootScreen from '@/features/boot/BootScreen';
import IntroScreen from '@/features/onboarding/IntroScreen';
import PermissionScreen from '@/features/onboarding/PermissionScreen';
import ProfileScreen from '@/features/onboarding/ProfileScreen';
import EmptyHome from '@/features/home/EmptyHome';
import PairingScreen from '@/features/pairing/PairingScreen';
import HomeScreen from '@/features/home/HomeScreen';
import HistoryScreen from '@/features/history/HistoryScreen';
import AlarmScreen from '@/features/alarm/AlarmScreen';
import SettingsScreen from '@/features/settings/SettingsScreen';
import NotFoundScreen from '@/features/misc/NotFoundScreen';

const computeStep = (flags: ReturnType<typeof useAppStore.getState>['flags']) => {
  if (!flags.introDone) return '/intro';
  if (!flags.permDone) return '/permission';
  if (!flags.profileDone) return '/profile';
  if (!flags.roomId) return '/start';
  return '/home';
};

const Guard = ({ children }: { children: JSX.Element }) => {
  const flags = useAppStore((s) => s.flags);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expected = computeStep(flags);
    if (location.pathname === '/') return;
    if (location.pathname.startsWith(expected)) return;
    if (location.pathname === '/history' || location.pathname === '/alarm' || location.pathname === '/settings') return;
    navigate(expected, { replace: true });
  }, [flags, location.pathname, navigate]);

  return children;
};

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<BootScreen />} />
    <Route path="/intro" element={<IntroScreen />} />
    <Route path="/permission" element={<PermissionScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />
    <Route
      path="/start"
      element={
        <Guard>
          <EmptyHome />
        </Guard>
      }
    />
    <Route
      path="/pair"
      element={
        <Guard>
          <PairingScreen />
        </Guard>
      }
    />
    <Route
      path="/home"
      element={
        <Guard>
          <HomeScreen />
        </Guard>
      }
    />
    <Route
      path="/history"
      element={
        <Guard>
          <HistoryScreen />
        </Guard>
      }
    />
    <Route
      path="/alarm"
      element={
        <Guard>
          <AlarmScreen />
        </Guard>
      }
    />
    <Route
      path="/settings"
      element={
        <Guard>
          <SettingsScreen />
        </Guard>
      }
    />
    <Route path="*" element={<NotFoundScreen />} />
  </Routes>
);

export default AppRouter;
