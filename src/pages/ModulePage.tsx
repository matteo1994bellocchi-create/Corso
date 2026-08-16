import { Link, Navigate, useParams } from 'react-router-dom';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { ContentBlockRenderer } from '../components/ContentBlockRenderer';
import { Badge } from '../components/Badge';
import { ArrowRightIcon, CheckIcon, ClockIcon } from '../components/icons';
import { getModuleBySlug, isModuleReady, modules } from '../content/modules';
import { getModuleStatus } from '../lib/progressSelectors';
import { useProgress } from '../store/ProgressContext';

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useProgress();
  const module = slug ? getModuleBySlug(slug) : undefined;

  if (!module) return <Navigate to="/" replace />;

  const status = getModuleStatus(module, state);
  const ready = isModuleReady(module);
  const nextModule = modules.find((m) => m.number === module.number + 1);

  return (
    <div className="space-y-8">
      <div>
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-300">
          ← Torna alla dashboard
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            {module.number}
          </span>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">{module.title}</h1>
          {status.completed && (
            <Badge variant="success" icon={<CheckIcon width={12} height={12} />}>
              Completato
            </Badge>
          )}
        </div>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{module.subtitle}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <ClockIcon width={14} height={14} /> {module.estimatedMinutes} minuti stimati
        </p>
      </div>

      {!ready && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          Il contenuto completo di questo modulo non è ancora stato caricato. Questa è un'anteprima strutturale.
        </div>
      )}

      {module.theory.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Teoria</h2>
          {module.theory.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen={section.defaultOpen}
              collapsible={section.collapsible}
            >
              {section.blocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} />
              ))}
            </CollapsibleSection>
          ))}
        </section>
      )}

      {module.examples.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Esempi pratici</h2>
          {module.examples.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen={section.defaultOpen}
              collapsible={section.collapsible}
              eyebrow="Esempio"
            >
              {section.blocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} />
              ))}
            </CollapsibleSection>
          ))}
        </section>
      )}

      {ready && (
        <section className="rounded-2xl border border-accent-500/30 bg-accent-500/5 p-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Esercizio pratico</h2>
          <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-50">{module.exercise.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{module.exercise.instructions}</p>
          {module.exercise.hint && (
            <p className="mt-3 text-xs text-slate-500 italic dark:text-slate-400">💡 {module.exercise.hint}</p>
          )}
        </section>
      )}

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-50">Pronto per il quiz?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {ready
              ? `${module.quiz.length} domande · minimo ${module.passingScore}% per superare il modulo`
              : 'Disponibile quando il contenuto sarà completo.'}
          </p>
        </div>
        {ready ? (
          <Link
            to={`/moduli/${module.slug}/quiz`}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            {status.attempted ? 'Rifai il quiz' : 'Inizia il quiz'} <ArrowRightIcon width={16} height={16} />
          </Link>
        ) : (
          <span className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-600">
            Quiz non disponibile
          </span>
        )}
      </section>

      {status.completed && nextModule && (
        <div className="text-center">
          <Link to={`/moduli/${nextModule.slug}`} className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Prosegui con il modulo {nextModule.number}: {nextModule.title} →
          </Link>
        </div>
      )}
    </div>
  );
}
