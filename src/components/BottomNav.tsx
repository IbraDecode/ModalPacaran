import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const items = [
  { key: 'home', label: 'Home', to: '/home', icon: HomeIcon },
  { key: 'history', label: 'History', to: '/history', icon: TimeIcon },
  { key: 'add', label: 'Tambah', to: '/pair', icon: PlusIcon, large: true },
  { key: 'alarm', label: 'Inbox', to: '/alarm', icon: BellIcon },
  { key: 'settings', label: 'Settings', to: '/settings', icon: GearIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1.6">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10.5V20h11V10.5" />
    </svg>
  );
}

function TimeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

function PlusIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#fff'} strokeWidth="2">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function BellIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1.6">
      <path d="M18 16V11a6 6 0 0 0-12 0v5" />
      <path d="M5 16h14" />
      <path d="M9 19a3 3 0 0 0 6 0" />
    </svg>
  );
}

function GearIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--accent)' : 'var(--text-secondary)'} strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 11 3.1V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

const BottomNav = () => {
  const location = useLocation();
  return (
    <nav className="safe-area-bottom px-4 pb-3">
      <div className="flex items-center justify-between rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-lg px-4 py-2">
        {items.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.key}
              to={item.to}
              className={clsx(
                'flex flex-col items-center justify-center text-xs gap-1 transition-transform duration-150',
                active ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]',
                item.large && '-mt-8'
              )}
            >
              <div
                className={clsx(
                  'flex items-center justify-center rounded-full p-3',
                  item.large ? 'bg-[var(--accent)] shadow-xl text-white' : 'bg-transparent'
                )}
              >
                <item.icon active={active} />
              </div>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
