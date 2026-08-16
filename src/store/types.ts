export type ModuleProgress = {
  completed: boolean;
  bestScorePct: number;
  attempts: number;
  lastAttemptAt?: string;
};

export type FinalExamProgress = {
  completed: boolean;
  bestScorePct: number;
  attempts: number;
  lastAttemptAt?: string;
  /** Draft answers for open questions, keyed by question id. */
  openAnswers: Record<string, string>;
  /** Self-assessment checklist ticks, keyed by `${questionId}:${itemIndex}`. */
  checklistTicks: Record<string, boolean>;
};

export type ProgressState = {
  version: 1;
  modules: Record<string, ModuleProgress>;
  finalExam: FinalExamProgress;
};

export const emptyModuleProgress: ModuleProgress = {
  completed: false,
  bestScorePct: 0,
  attempts: 0,
};

export const emptyFinalExamProgress: FinalExamProgress = {
  completed: false,
  bestScorePct: 0,
  attempts: 0,
  openAnswers: {},
  checklistTicks: {},
};

export const emptyProgressState: ProgressState = {
  version: 1,
  modules: {},
  finalExam: emptyFinalExamProgress,
};
