import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { QuizQuestion } from '../content/types';
import { CheckIcon, RefreshIcon, XIcon } from './icons';
import { ProgressBar } from './ProgressBar';

type QuizProps = {
  questions: QuizQuestion[];
  passingScore: number;
  onFinish: (scorePct: number, passed: boolean) => void;
  /** Label used on the final "restart" call to action, e.g. "Rifai il quiz". */
  retryLabel?: string;
};

type Answer = { selected: number; correct: boolean };

export function Quiz({ questions, passingScore, onFinish, retryLabel = 'Rifai il quiz' }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const currentAnswer = current ? answers[current.id] : undefined;

  const scorePct = useMemo(() => {
    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    return questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);
  }, [answers, questions.length]);

  function selectOption(optionIndex: number) {
    if (!current || currentAnswer) return;
    const correct = optionIndex === current.correctIndex;
    setAnswers((prev) => ({ ...prev, [current.id]: { selected: optionIndex, correct } }));
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
      onFinish(scorePct, scorePct >= passingScore);
    }
  }

  function restart() {
    setIndex(0);
    setAnswers({});
    setFinished(false);
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Il quiz per questo modulo non è ancora disponibile.
      </div>
    );
  }

  if (finished) {
    const passed = scorePct >= passingScore;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border p-8 text-center ${
          passed
            ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-500/10'
            : 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-500/10'
        }`}
      >
        <div
          className={`mx-auto mb-4 flex size-14 items-center justify-center rounded-full ${
            passed ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
          }`}
        >
          {passed ? <CheckIcon width={24} height={24} /> : <XIcon width={24} height={24} />}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          {passed ? 'Quiz superato!' : 'Non ancora sufficiente'}
        </h3>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Punteggio: <span className="font-semibold">{scorePct}%</span> (minimo richiesto: {passingScore}%)
        </p>
        {!passed && (
          <button
            type="button"
            onClick={restart}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            <RefreshIcon width={16} height={16} /> {retryLabel}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Domanda {index + 1} di {questions.length}
        </span>
        <span>{Math.round(((index + (currentAnswer ? 1 : 0)) / questions.length) * 100)}%</span>
      </div>
      <ProgressBar percent={((index + (currentAnswer ? 1 : 0)) / questions.length) * 100} className="mb-6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">{current.question}</h3>

          <div className="space-y-2.5">
            {current.options.map((option, i) => {
              const isSelected = currentAnswer?.selected === i;
              const isCorrectOption = i === current.correctIndex;
              const showState = Boolean(currentAnswer);

              let stateClasses =
                'border-slate-200 hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-700 dark:hover:border-brand-500 dark:hover:bg-brand-500/5';
              if (showState && isCorrectOption) {
                stateClasses = 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-500/10';
              } else if (showState && isSelected && !isCorrectOption) {
                stateClasses = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-500/10';
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectOption(i)}
                  disabled={showState}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${stateClasses}`}
                >
                  <span className="text-slate-800 dark:text-slate-200">{option}</span>
                  {showState && isCorrectOption && <CheckIcon width={16} height={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />}
                  {showState && isSelected && !isCorrectOption && <XIcon width={16} height={16} className="shrink-0 text-red-600 dark:text-red-400" />}
                </button>
              );
            })}
          </div>

          {currentAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                currentAnswer.correct
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300'
                  : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-500/10 dark:text-amber-300'
              }`}
            >
              <p className="font-semibold">{currentAnswer.correct ? 'Corretto' : 'Non corretto'}</p>
              <p className="mt-0.5 opacity-90">{current.explanation}</p>
            </motion.div>
          )}

          {currentAnswer && (
            <button
              type="button"
              onClick={next}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
            >
              {index + 1 < questions.length ? 'Prossima domanda' : 'Vedi risultato'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
