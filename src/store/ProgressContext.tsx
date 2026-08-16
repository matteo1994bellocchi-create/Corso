import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadProgress, saveProgress, resetProgress as clearStoredProgress } from './storage';
import { emptyFinalExamProgress, emptyModuleProgress, emptyProgressState, type ProgressState } from './types';

type ProgressContextValue = {
  state: ProgressState;
  recordModuleAttempt: (slug: string, scorePct: number, passingScore: number) => void;
  recordFinalExamAttempt: (scorePct: number, passingScore: number) => void;
  setOpenAnswer: (questionId: string, text: string) => void;
  toggleChecklistTick: (questionId: string, itemIndex: number) => void;
  setStudentName: (name: string) => void;
  resetAll: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const recordModuleAttempt = useCallback((slug: string, scorePct: number, passingScore: number) => {
    setState((prev) => {
      const existing = prev.modules[slug] ?? emptyModuleProgress;
      const passed = scorePct >= passingScore;
      return {
        ...prev,
        modules: {
          ...prev.modules,
          [slug]: {
            completed: existing.completed || passed,
            bestScorePct: Math.max(existing.bestScorePct, scorePct),
            attempts: existing.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const recordFinalExamAttempt = useCallback((scorePct: number, passingScore: number) => {
    setState((prev) => {
      const existing = prev.finalExam;
      const passed = scorePct >= passingScore;
      return {
        ...prev,
        finalExam: {
          ...existing,
          completed: existing.completed || passed,
          bestScorePct: Math.max(existing.bestScorePct, scorePct),
          attempts: existing.attempts + 1,
          lastAttemptAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const setOpenAnswer = useCallback((questionId: string, text: string) => {
    setState((prev) => ({
      ...prev,
      finalExam: {
        ...prev.finalExam,
        openAnswers: { ...prev.finalExam.openAnswers, [questionId]: text },
      },
    }));
  }, []);

  const toggleChecklistTick = useCallback((questionId: string, itemIndex: number) => {
    setState((prev) => {
      const key = `${questionId}:${itemIndex}`;
      return {
        ...prev,
        finalExam: {
          ...prev.finalExam,
          checklistTicks: {
            ...prev.finalExam.checklistTicks,
            [key]: !prev.finalExam.checklistTicks[key],
          },
        },
      };
    });
  }, []);

  const setStudentName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, studentName: name }));
  }, []);

  const resetAll = useCallback(() => {
    clearStoredProgress();
    setState({ ...emptyProgressState, finalExam: { ...emptyFinalExamProgress } });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      recordModuleAttempt,
      recordFinalExamAttempt,
      setOpenAnswer,
      toggleChecklistTick,
      setStudentName,
      resetAll,
    }),
    [state, recordModuleAttempt, recordFinalExamAttempt, setOpenAnswer, toggleChecklistTick, setStudentName, resetAll],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
