type ProgressBarProps = {
  percent: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
};

export function ProgressBar({ percent, className = '', trackClassName = '', barClassName = '' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${trackClassName} ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-[width] duration-500 ease-out ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
