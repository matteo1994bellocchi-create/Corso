import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AwardIcon } from '../components/icons';
import { finalExam } from '../content/modules';
import { useProgress } from '../store/ProgressContext';

export function CertificatePage() {
  const { state, setStudentName } = useProgress();
  const [nameDraft, setNameDraft] = useState(state.studentName);

  if (!state.finalExam.completed) return <Navigate to="/esame-finale" replace />;

  const date = state.finalExam.lastAttemptAt ? new Date(state.finalExam.lastAttemptAt) : new Date();
  const formattedDate = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="print:hidden">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Il tuo certificato</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Complimenti per aver completato il corso. Puoi stampare o salvare questa pagina come PDF.
        </p>
        <label className="mt-4 block max-w-xs text-sm">
          <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">Nome sul certificato</span>
          <input
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={() => setStudentName(nameDraft.trim() || 'Matteo')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-900"
          />
        </label>
      </div>

      <div className="relative overflow-hidden rounded-3xl border-4 border-brand-500/30 bg-white p-10 text-center shadow-lg print:border-2 print:shadow-none dark:bg-slate-900 sm:p-14">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/5" />
        <div className="relative">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white">
            <AwardIcon width={30} height={30} />
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">Certificato di completamento</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">AI per Fare Soldi</h2>

          <p className="mt-8 text-sm text-slate-400">Rilasciato a</p>
          <p className="mt-1 text-4xl font-bold text-brand-700 sm:text-5xl dark:text-brand-300">
            {state.studentName || 'Matteo'}
          </p>

          <p className="mt-6 text-slate-500 dark:text-slate-400">
            Ha completato tutti i 6 moduli del corso e superato l'esame finale con un punteggio di{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">{state.finalExam.bestScorePct}%</span>.
          </p>

          <p className="mt-6 inline-block rounded-full bg-accent-500/10 px-5 py-2 text-sm font-semibold text-accent-700 dark:text-accent-300">
            Tornato online. Super skillato.
          </p>

          <p className="mt-8 text-sm text-slate-400">{finalExam.title}</p>
          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{formattedDate}</p>
        </div>
      </div>

      <div className="flex justify-center print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
        >
          Stampa / Salva come PDF
        </button>
      </div>
    </div>
  );
}
