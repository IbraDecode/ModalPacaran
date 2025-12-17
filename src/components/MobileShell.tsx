import { ReactNode } from 'react';
import { clsx } from 'clsx';

const MobileShell = ({
  header,
  children,
  footer,
  className,
}: {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) => (
  <div className="app-shell min-h-screen mobile-bg">
    <div className="mobile-frame min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="safe-area-top" />
      {header && <header className="px-5 pt-4 pb-2 sticky top-0 bg-[var(--bg)]/90 backdrop-blur-md z-10">{header}</header>}
      <main className={clsx('flex-1 px-5 pb-5 pt-2 flex flex-col gap-4 overflow-hidden', className)}>{children}</main>
      {footer && <div className="px-3 pb-2 pt-1 bg-[var(--bg)]/70 backdrop-blur-md sticky bottom-0">{footer}</div>}
      <div className="safe-area-bottom" />
    </div>
  </div>
);

export default MobileShell;
