import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';

const Button = ({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={clsx(
      'btn inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-50',
      'bg-[var(--accent)] hover:shadow-xl',
      'hover:scale-[1.01] transition-transform duration-200',
      className,
    )}
    {...rest}
  />
);

export default Button;
