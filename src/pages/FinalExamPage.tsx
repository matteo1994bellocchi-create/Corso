import { Link, Navigate } from 'react-router-dom';
import { Quiz } from '../components/Quiz';
import { AwardIcon, CheckIcon } from '../components/icons';
import { finalExam, modules } from '../content/modules';
import { getOverallStats } from '../lib/progressSelectors';
import { useProgress } from '../store/ProgressContext';

export function FinalExamPage() {
  const { state, recordFinalExamAttempt, setOpenAnswer, toggleChecklistTick } = useProgress();
  const stats = getOverallStats(modules, state);

  if (!stats.allModulesCompleted) return <Navigate to="/" replace />;

  const hasContent = finalExam.mcq.length > 0 || finalExam.openQuestions.length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-300">
          ← Torna alla dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">{finalExam.title}</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Copre tutti e 6 i moduli: domande a risposta multipla + domande aperte con autovalutazione guidata.
        </p>
      </div>

      {!hasContent && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          L'esame finale sarà disponibile una volta caricato il contenuto completo di tutti i moduli (vedi
          src/content/final-exam.json).
        </div>
      )}

      {finalExam.mcq.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">Parte 1 — Domande a risposta multipla</h2>
          <Quiz
            questions={finalExam.mcq}
            passingScore={finalExam.passingScore}
            retryLabel="Rifai la parte a risposta multipla"
            onFinish={(scorePct) => recordFinalExamAttempt(scorePct, finalExam.passingScore)}
          />
        </section>
      )}

      {finalExam.openQuestions.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parte 2 — Domande aperte</h2>
          {finalExam.openQuestions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-slate-50">{q.prompt}</p>
              <textarea
                value={state.finalExam.openAnswers[q.id] ?? ''}
                onChange={(e) => setOpenAnswer(q.id, e.target.value)}
                rows={5}
                placeholder="Scrivi qui la tua risposta..."
                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-brand-900"
              />
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Checklist di autovalutazione
                </p>
                <ul className="space-y-1.5">
                  {q.checklist.map((item, i) => {
                    const key = `${q.id}:${i}`;
                    const ticked = Boolean(state.finalExam.checklistTicks[key]);
                    return (
                      <li key={i}>
                        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={ticked}
                            onChange={() => toggleChecklistTick(q.id, i)}
                            className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-400 dark:border-slate-600"
                          />
                          <span className={ticked ? 'text-slate-400 line-through' : ''}>{item}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}

      {state.finalExam.completed && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-center dark:border-emerald-700 dark:bg-emerald-500/10">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CheckIcon width={22} height={22} />
          </div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">Hai superato l'esame finale!</p>
          <Link
            to="/certificato"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            <AwardIcon width={16} height={16} /> Vedi il tuo certificato
          </Link>
        </div>
      )}
    </div>
  );
}
