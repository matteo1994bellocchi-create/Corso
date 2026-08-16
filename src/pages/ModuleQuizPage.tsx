import { Link, Navigate, useParams } from 'react-router-dom';
import { Quiz } from '../components/Quiz';
import { getModuleBySlug } from '../content/modules';
import { useProgress } from '../store/ProgressContext';

export function ModuleQuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const { recordModuleAttempt } = useProgress();
  const module = slug ? getModuleBySlug(slug) : undefined;

  if (!module) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to={`/moduli/${module.slug}`}
          className="text-sm font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-300"
        >
          ← Torna al modulo
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">Quiz — {module.title}</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Quiz
          questions={module.quiz}
          passingScore={module.passingScore}
          onFinish={(scorePct) => recordModuleAttempt(module.slug, scorePct, module.passingScore)}
        />
      </div>
    </div>
  );
}
