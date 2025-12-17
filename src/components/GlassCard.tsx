import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

export const GlassCard = ({
  asChild,
  className,
  children,
}: {
  asChild?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp className={clsx('glass-card rounded-3xl p-5 border border-white/10', className)}>{children}</Comp>
  );
};
