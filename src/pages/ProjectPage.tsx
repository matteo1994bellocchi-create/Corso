import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { clearProject, emptyProject, loadProject, saveProject, type ProjectAnswers } from '../store/projectStorage';

type TextKey = Exclude<keyof ProjectAnswers, 'money' | 'style'>;

type Mission =
  | { kind: 'text'; key: TextKey; emoji: string; title: string; help: string; placeholder: string; multiline?: boolean; optional?: boolean }
  | { kind: 'choice'; key: 'money' | 'style'; emoji: string; title: string; help: string; options: string[]; multi: boolean };

const missions: Mission[] = [
  {
    kind: 'text',
    key: 'name',
    emoji: '🏷️',
    title: 'Come si chiama il tuo progetto?',
    help: 'Va benissimo un nome provvisorio: si può cambiare quando vuoi.',
    placeholder: 'Es. PalestraSmart',
  },
  {
    kind: 'text',
    key: 'oneLiner',
    emoji: '💡',
    title: 'Raccontalo in una frase',
    help: 'Immagina di spiegarlo a un amico al bar in 10 secondi.',
    placeholder: 'Es. Un sito dove trovi un allenamento personalizzato in 2 minuti',
    multiline: true,
  },
  {
    kind: 'text',
    key: 'audience',
    emoji: '👥',
    title: 'Per chi è?',
    help: 'Chi lo userà? Più sei preciso, meglio è.',
    placeholder: 'Es. Persone tra 25 e 45 anni che lavorano e hanno poco tempo per allenarsi',
    multiline: true,
  },
  {
    kind: 'text',
    key: 'problem',
    emoji: '🧩',
    title: 'Che problema risolve?',
    help: 'Cosa dà fastidio a queste persone oggi? Perché dovrebbero usare il tuo progetto?',
    placeholder: 'Es. Non sanno da dove iniziare e i personal trainer costano troppo',
    multiline: true,
  },
  {
    kind: 'text',
    key: 'features',
    emoji: '🛠️',
    title: 'Cosa deve poter fare la persona?',
    help: 'Scrivi le cose più importanti, una per riga. Bastano 3!',
    placeholder: 'Es.\nRispondere a 5 domande su di sé\nRicevere il suo allenamento\nSalvare i progressi',
    multiline: true,
  },
  {
    kind: 'choice',
    key: 'money',
    emoji: '💶',
    title: 'Come vuoi guadagnare?',
    help: 'Puoi sceglierne più di una. Se non lo sai ancora, nessun problema!',
    options: ['Vendita una tantum', 'Abbonamento mensile', 'Servizio / consulenza', 'Pubblicità', 'Affiliazioni', 'Non lo so ancora'],
    multi: true,
  },
  {
    kind: 'choice',
    key: 'style',
    emoji: '🎨',
    title: 'Che stile ti piace?',
    help: "Scegli l'atmosfera che vuoi dare al sito.",
    options: ['Moderno e pulito', 'Colorato e giocoso', 'Elegante e di lusso', 'Tecnologico e futuristico'],
    multi: false,
  },
  {
    kind: 'text',
    key: 'inspiration',
    emoji: '✨',
    title: 'Ci sono siti o app che ti piacciono?',
    help: 'Facoltativo. Scrivi i nomi e cosa ti piace di loro: ci ispiriamo, senza copiare.',
    placeholder: 'Es. Mi piace Duolingo perché è semplice e ti fa venire voglia di continuare',
    multiline: true,
    optional: true,
  },
  {
    kind: 'text',
    key: 'firstGoal',
    emoji: '🚀',
    title: 'Cosa vuoi vedere funzionare per primo?',
    help: 'Il primo traguardo: la prima cosa che vuoi poter mostrare a qualcuno.',
    placeholder: 'Es. La pagina dove la persona risponde alle domande e vede il suo allenamento',
    multiline: true,
  },
];

function isAnswered(m: Mission, a: ProjectAnswers): boolean {
  if (m.kind === 'choice') return m.key === 'money' ? a.money.length > 0 : a.style !== '';
  if (m.optional) return true;
  return a[m.key].trim() !== '';
}

function featureList(a: ProjectAnswers): string[] {
  return a.features
    .split('\n')
    .map((f) => f.replace(/^[-*•\d.)\s]+/, '').trim())
    .filter(Boolean);
}

function buildPrompt(a: ProjectAnswers): string {
  const features = featureList(a);
  return [
    `Ciao Claude! Sono Matteo e voglio costruire il mio progetto "${a.name}".`,
    '',
    `In una frase: ${a.oneLiner}`,
    `È per: ${a.audience}`,
    `Risolve questo problema: ${a.problem}`,
    '',
    'La persona deve poter:',
    ...features.map((f) => `- ${f}`),
    '',
    `Come voglio guadagnare: ${a.money.join(', ')}`,
    `Stile: ${a.style}`,
    a.inspiration.trim() ? `Mi ispirano: ${a.inspiration}` : '',
    '',
    `Il primo traguardo che voglio vedere funzionare: ${a.firstGoal}`,
    '',
    'Per favore:',
    '1. Costruisci subito una prima versione del primo traguardo e fammela vedere.',
    "2. Le scelte tecniche (server, database, hosting) decidile tu nel modo più sicuro: spiegami solo l'essenziale, con parole semplici.",
    '3. Dopo ogni pezzo costruito, mostrami cosa hai fatto e dimmi qual è il prossimo passo.',
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');
}

export function ProjectPage() {
  const [answers, setAnswers] = useState<ProjectAnswers>(() => loadProject());
  const [step, setStep] = useState(() => {
    const a = loadProject();
    const firstOpen = missions.findIndex((m) => !isAnswered(m, a));
    return firstOpen === -1 ? missions.length : firstOpen;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => saveProject(answers), [answers]);

  const done = step >= missions.length;
  const completed = missions.filter((m) => isAnswered(m, answers)).length;
  const percent = done ? 100 : Math.round((step / missions.length) * 100);
  const prompt = useMemo(() => buildPrompt(answers), [answers]);

  const restart = () => {
    clearProject();
    setAnswers(emptyProject);
    setStep(0);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <p className="mb-2 text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
          Laboratorio
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">Il mio progetto 🚀</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Rispondi a {missions.length} domande facili: niente tecnicismi, solo la tua idea. Alla fine ottieni la mappa del
          progetto, il piano di costruzione e il messaggio pronto da mandare a Claude per iniziare a costruire.
        </p>
        <div className="mt-5">
          <div className="mb-1 flex justify-between text-xs font-semibold text-slate-400">
            <span>{done ? 'Tutte le missioni completate! 🎉' : `Missione ${step + 1} di ${missions.length}`}</span>
            <span>{percent}%</span>
          </div>
          <ProgressBar percent={percent} />
        </div>
      </section>

      <AnimatePresence mode="wait">
        {!done ? (
          <MissionCard
            key={step}
            mission={missions[step]}
            answers={answers}
            setAnswers={setAnswers}
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            onNext={() => setStep(step + 1)}
          />
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <ProjectMap answers={answers} />
            <BuildPlan answers={answers} />

            <section className="rounded-2xl border border-brand-300/60 bg-brand-50 p-6 dark:border-brand-700/50 dark:bg-brand-500/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">💬 Il tuo messaggio per Claude</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Copialo e incollalo nella chat con Claude: lui inizia a costruire e ti mostra ogni pezzo.
              </p>
              <pre className="mt-4 max-h-80 overflow-auto rounded-xl bg-white p-4 text-sm whitespace-pre-wrap text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {prompt}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyPrompt}
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  {copied ? '✅ Copiato!' : '📋 Copia il messaggio'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ✏️ Modifica le risposte
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Ricomincia da zero
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                🛡️ Ricorda: nel messaggio non mettere mai password o chiavi segrete. Le tue risposte restano salvate solo su
                questo browser.
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {!done && completed > 0 && (
        <p className="text-center text-xs text-slate-400">Le risposte si salvano da sole: puoi chiudere e riprendere quando vuoi.</p>
      )}
    </div>
  );
}

function MissionCard({
  mission,
  answers,
  setAnswers,
  onBack,
  onNext,
}: {
  mission: Mission;
  answers: ProjectAnswers;
  setAnswers: (fn: (a: ProjectAnswers) => ProjectAnswers) => void;
  onBack?: () => void;
  onNext: () => void;
}) {
  const canContinue = isAnswered(mission, answers);
  const inputClass =
    'mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="text-4xl">{mission.emoji}</p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-50">{mission.title}</h2>
      <p className="mt-1 text-slate-500 dark:text-slate-400">{mission.help}</p>

      {mission.kind === 'text' ? (
        mission.multiline ? (
          <textarea
            rows={4}
            autoFocus
            className={inputClass}
            placeholder={mission.placeholder}
            value={answers[mission.key]}
            onChange={(e) => setAnswers((a) => ({ ...a, [mission.key]: e.target.value }))}
          />
        ) : (
          <input
            autoFocus
            className={inputClass}
            placeholder={mission.placeholder}
            value={answers[mission.key]}
            onChange={(e) => setAnswers((a) => ({ ...a, [mission.key]: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canContinue) onNext();
            }}
          />
        )
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {mission.options.map((opt) => {
            const selected = mission.key === 'money' ? answers.money.includes(opt) : answers.style === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  setAnswers((a) =>
                    mission.key === 'money'
                      ? { ...a, money: a.money.includes(opt) ? a.money.filter((m) => m !== opt) : [...a.money, opt] }
                      : { ...a, style: opt },
                  )
                }
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-slate-300 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {selected ? '✓ ' : ''}
                {opt}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800 dark:hover:text-slate-200"
          >
            ← Indietro
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {mission.kind === 'text' && mission.optional && answers[mission.key].trim() === '' ? 'Salta →' : 'Avanti →'}
        </button>
      </div>
    </motion.section>
  );
}

function ProjectMap({ answers }: { answers: ProjectAnswers }) {
  const features = featureList(answers);
  const cards = [
    { emoji: '💡', title: "L'idea", body: answers.oneLiner },
    { emoji: '👥', title: 'Per chi', body: answers.audience },
    { emoji: '🧩', title: 'Il problema', body: answers.problem },
    { emoji: '💶', title: 'Come guadagni', body: answers.money.join(' · ') },
    { emoji: '🎨', title: 'Lo stile', body: answers.style },
    { emoji: '🚀', title: 'Primo traguardo', body: answers.firstGoal },
  ];

  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-slate-900 dark:text-slate-50">🗺️ La mappa di "{answers.name}"</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Ecco il tuo progetto, tutto in una pagina.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {c.emoji} {c.title}
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-200">{c.body || '—'}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">🛠️ Cosa può fare la persona</p>
          <ul className="mt-2 space-y-1 text-slate-700 dark:text-slate-200">
            {features.map((f) => (
              <li key={f}>✔️ {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BuildPlan({ answers }: { answers: ProjectAnswers }) {
  const features = featureList(answers);
  const steps = [
    { title: 'Pagina di presentazione', body: `La "vetrina" di ${answers.name}: spiega cos'è e invita a provarlo.` },
    { title: `Primo traguardo`, body: answers.firstGoal },
    ...features.map((f) => ({ title: f, body: 'Claude lo costruisce e te lo mostra prima di andare avanti.' })),
    { title: 'Controllo sicurezza 🛡️', body: 'Claude verifica che dati e accessi siano protetti.' },
    { title: 'Online per tutti 🎉', body: 'Il sito va su internet con il suo indirizzo. Alla parte tecnica pensa Claude.' },
  ];

  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-slate-900 dark:text-slate-50">🧱 Il piano di costruzione</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Un mattoncino alla volta. A ogni passo vedi subito il risultato.
      </p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li
            key={`${i}-${s.title}`}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">{s.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
