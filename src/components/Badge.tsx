import type { ReactNode } from 'react';

type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'muted';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  muted: 'bg-slate-100 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500',
};

export function Badge({ children, variant = 'neutral', icon }: { children: ReactNode; variant?: BadgeVariant; icon?: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
