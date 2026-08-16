import { emptyProgressState, type ProgressState } from './types';

const STORAGE_KEY = 'corso:progress:v1';

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return emptyProgressState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgressState;
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return emptyProgressState;
    return {
      ...emptyProgressState,
      ...parsed,
      finalExam: { ...emptyProgressState.finalExam, ...parsed.finalExam },
    };
  } catch {
    return emptyProgressState;
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist.
  }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
