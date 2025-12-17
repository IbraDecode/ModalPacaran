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
  <div className="app-shell min-h-screen flex flex-col">
    <div className="safe-area-top" />
    {header && <header className="px-5 pt-3 pb-2">{header}</header>}
    <main className={clsx('flex-1 px-5 pb-4', className)}>{children}</main>
    {footer}
    <div className="safe-area-bottom" />
  </div>
);

export default MobileShell;
