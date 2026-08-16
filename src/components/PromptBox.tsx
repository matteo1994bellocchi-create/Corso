import type { PromptExample } from '../content/types';

export function PromptBox({ example }: { example: PromptExample }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      {example.label && (
        <div className="border-b border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          {example.label}
        </div>
      )}
      <pre className="overflow-x-auto bg-slate-900 px-4 py-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-slate-100">
        {example.prompt}
      </pre>
      {example.note && (
        <p className="border-t border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          {example.note}
        </p>
      )}
    </div>
  );
}
