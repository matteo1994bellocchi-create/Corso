import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { ChevronDownIcon } from './icons';

type CollapsibleSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  eyebrow?: string;
};

export function CollapsibleSection({ title, children, defaultOpen = false, collapsible = true, eyebrow }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen || !collapsible);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => collapsible && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
        aria-expanded={open}
        disabled={!collapsible}
      >
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-300">{eyebrow}</p>
          )}
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-50">{title}</h3>
        </div>
        {collapsible && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-slate-400"
          >
            <ChevronDownIcon />
          </motion.span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="prose-body space-y-4 px-5 pb-5 text-slate-600 dark:text-slate-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
