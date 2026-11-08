import { Link, NavLink } from 'react-router-dom';
import { modules } from '../content/modules';
import { getOverallStats } from '../lib/progressSelectors';
import { useProgress } from '../store/ProgressContext';
import { AwardIcon, LockIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { state } = useProgress();
  const stats = getOverallStats(modules, state);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-50">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-sm text-white">
            AI
          </span>
          <span className="hidden sm:inline">AI per Fare Soldi</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 transition ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/progetto"
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 transition ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            🚀 <span className="hidden sm:inline">Il mio progetto</span>
          </NavLink>
          <NavLink
            to="/esame-finale"
            className={({ isActive }) =>
              `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : stats.allModulesCompleted
                    ? 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                    : 'cursor-default text-slate-400 dark:text-slate-600'
              }`
            }
            onClick={(e) => {
              if (!stats.allModulesCompleted) e.preventDefault();
            }}
          >
            {stats.allModulesCompleted ? <AwardIcon width={14} height={14} /> : <LockIcon width={14} height={14} />}
            <span className="hidden sm:inline">Esame finale</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-semibold text-slate-400 sm:inline">{stats.percentComplete}% completato</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
