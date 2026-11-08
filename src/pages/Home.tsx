import { Link } from 'react-router-dom';
import { AwardIcon, ClockIcon, SparkleIcon } from '../components/icons';
import { ModuleCard } from '../components/ModuleCard';
import { ProgressBar } from '../components/ProgressBar';
import { modules } from '../content/modules';
import { getAllModuleStatuses, getOverallStats, getRecommendedModule } from '../lib/progressSelectors';
import { useProgress } from '../store/ProgressContext';

export function Home() {
  const { state } = useProgress();
  const statuses = getAllModuleStatuses(modules, state);
  const stats = getOverallStats(modules, state);
  const recommended = getRecommendedModule(modules, state);

  return (
    <div className="space-y-10">
      <section>
        <p className="mb-2 text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
          Corso interattivo
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">AI per Fare Soldi</h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
          Da Claude a Lovable, da Higgsfield agli agenti personalizzati: 6 moduli pratici per usare l'AI e trasformarla
          in un vantaggio concreto per il tuo business.
        </p>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 p-6 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">Laboratorio</p>
          <h2 className="text-xl font-bold">🚀 Costruisci il tuo progetto</h2>
          <p className="text-sm text-white/85">
            9 domande facili sulla tua idea: ottieni la mappa, il piano e il messaggio per far partire Claude.
          </p>
        </div>
        <Link
          to="/progetto"
          className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-white/90"
        >
          Inizia ora
        </Link>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Completamento</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-50">{stats.percentComplete}%</p>
          <ProgressBar percent={stats.percentComplete} className="mt-3" />
          <p className="mt-2 text-xs text-slate-400">
            {stats.completedModules} di {stats.totalModules} moduli completati
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Punteggio medio quiz</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-50">
            {stats.averageScorePct > 0 ? `${stats.averageScorePct}%` : '—'}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <AwardIcon width={14} height={14} />
            {stats.allModulesCompleted ? 'Esame finale sbloccato' : 'Completa tutti i moduli per sbloccare l’esame finale'}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Tempo stimato rimanente</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-50">
            {stats.estimatedRemainingMinutes > 0 ? `${stats.estimatedRemainingMinutes} min` : 'Completato!'}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <ClockIcon width={14} height={14} /> Basato sui moduli non ancora completati
          </p>
        </div>
      </section>

      {recommended && (
        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-300/60 bg-brand-50 p-6 sm:flex-row sm:items-center dark:border-brand-700/50 dark:bg-brand-500/10">
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase dark:text-brand-300">
              <SparkleIcon width={14} height={14} /> Prossimo passo consigliato
            </p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{recommended.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{recommended.subtitle}</p>
          </div>
          <Link
            to={`/moduli/${recommended.slug}`}
            className="shrink-0 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Continua
          </Link>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-50">I 6 moduli del corso</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {statuses.map((status) => (
            <ModuleCard key={status.module.slug} status={status} recommended={recommended?.slug === status.module.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
