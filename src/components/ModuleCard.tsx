import { Link } from 'react-router-dom';
import type { ModuleStatus } from '../lib/progressSelectors';
import { Badge } from './Badge';
import { ArrowRightIcon, CheckIcon, ClockIcon, LockIcon, SparkleIcon } from './icons';
import { motion } from 'framer-motion';

export function ModuleCard({ status, recommended }: { status: ModuleStatus; recommended: boolean }) {
  const { module, ready, completed, attempted, bestScorePct } = status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900 ${
        completed
          ? 'border-emerald-300/70 dark:border-emerald-700/60'
          : recommended
            ? 'border-brand-400/70 ring-2 ring-brand-200 dark:border-brand-500/60 dark:ring-brand-900/60'
            : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {recommended && !completed && (
        <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <SparkleIcon width={12} height={12} /> Consigliato ora
        </span>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {module.number}
          </span>
          {completed && (
            <Badge variant="success" icon={<CheckIcon width={12} height={12} />}>
              Completato
            </Badge>
          )}
          {!completed && !ready && (
            <Badge variant="muted" icon={<LockIcon width={12} height={12} />}>
              In arrivo
            </Badge>
          )}
          {!completed && ready && attempted && <Badge variant="warning">Da ripassare</Badge>}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{module.title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{module.subtitle}</p>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1 text-slate-400">
          <ClockIcon width={14} height={14} /> {module.estimatedMinutes} min
        </span>
        {attempted && (
          <span className="font-semibold text-slate-500 dark:text-slate-400">Punteggio: {bestScorePct}%</span>
        )}
      </div>

      <Link
        to={`/moduli/${module.slug}`}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:group-hover:bg-brand-500 dark:group-hover:text-white"
      >
        {completed ? 'Rivedi modulo' : ready ? 'Inizia modulo' : 'Anteprima'}
        <ArrowRightIcon width={16} height={16} />
      </Link>
    </motion.div>
  );
}
