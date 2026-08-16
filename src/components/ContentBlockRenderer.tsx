import type { ContentBlock } from '../content/types';
import { PromptBox } from './PromptBox';

export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>;

    case 'list':
      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-brand-500">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-500">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case 'prompt':
      return <PromptBox example={block.example} />;

    case 'callout': {
      const styles = {
        tip: 'border-accent-500/40 bg-accent-500/10 text-accent-800 dark:text-accent-300',
        warning: 'border-amber-400/50 bg-amber-400/10 text-amber-800 dark:text-amber-300',
        insight: 'border-brand-400/50 bg-brand-400/10 text-brand-800 dark:text-brand-200',
      } as const;
      return (
        <div className={`rounded-xl border px-4 py-3 ${styles[block.variant]}`}>
          {block.title && <p className="mb-1 font-semibold">{block.title}</p>}
          <p className="text-sm text-current opacity-90">{block.text}</p>
        </div>
      );
    }

    case 'quote':
      return (
        <blockquote className="border-l-2 border-brand-400 pl-4 text-slate-700 italic dark:text-slate-300">
          “{block.text}”
          {block.attribution && <footer className="mt-1 text-sm not-italic text-slate-400">— {block.attribution}</footer>}
        </blockquote>
      );

    default:
      return null;
  }
}
