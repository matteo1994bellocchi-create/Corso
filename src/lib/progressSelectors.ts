import { isModuleReady } from '../content/modules';
import type { Module } from '../content/types';
import type { ProgressState } from '../store/types';

export type ModuleStatus = {
  module: Module;
  ready: boolean;
  attempted: boolean;
  completed: boolean;
  bestScorePct: number;
  attempts: number;
};

export function getModuleStatus(module: Module, progress: ProgressState): ModuleStatus {
  const p = progress.modules[module.slug];
  return {
    module,
    ready: isModuleReady(module),
    attempted: (p?.attempts ?? 0) > 0,
    completed: p?.completed ?? false,
    bestScorePct: p?.bestScorePct ?? 0,
    attempts: p?.attempts ?? 0,
  };
}

export function getAllModuleStatuses(modules: Module[], progress: ProgressState): ModuleStatus[] {
  return modules.map((m) => getModuleStatus(m, progress));
}

export type OverallStats = {
  totalModules: number;
  readyModules: number;
  completedModules: number;
  percentComplete: number;
  averageScorePct: number;
  estimatedRemainingMinutes: number;
  allModulesCompleted: boolean;
};

export function getOverallStats(modules: Module[], progress: ProgressState): OverallStats {
  const statuses = getAllModuleStatuses(modules, progress);
  const readyModules = statuses.filter((s) => s.ready);
  const completed = statuses.filter((s) => s.completed);
  const attemptedScores = statuses.filter((s) => s.attempted).map((s) => s.bestScorePct);
  const remainingMinutes = statuses
    .filter((s) => !s.completed)
    .reduce((sum, s) => sum + s.module.estimatedMinutes, 0);

  return {
    totalModules: modules.length,
    readyModules: readyModules.length,
    completedModules: completed.length,
    percentComplete: modules.length === 0 ? 0 : Math.round((completed.length / modules.length) * 100),
    averageScorePct:
      attemptedScores.length === 0
        ? 0
        : Math.round(attemptedScores.reduce((a, b) => a + b, 0) / attemptedScores.length),
    estimatedRemainingMinutes: remainingMinutes,
    allModulesCompleted: modules.length > 0 && completed.length === modules.length,
  };
}

/** First ready-but-not-completed module in order; falls back to the first
 * not-yet-ready module (content pending) if every ready module is done. */
export function getRecommendedModule(modules: Module[], progress: ProgressState): Module | undefined {
  const statuses = getAllModuleStatuses(modules, progress);
  const nextReady = statuses.find((s) => s.ready && !s.completed);
  if (nextReady) return nextReady.module;
  const nextPending = statuses.find((s) => !s.ready);
  return nextPending?.module;
}
