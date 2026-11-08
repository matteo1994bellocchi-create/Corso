export type ProjectAnswers = {
  name: string;
  oneLiner: string;
  audience: string;
  problem: string;
  features: string;
  money: string[];
  style: string;
  inspiration: string;
  firstGoal: string;
};

export const emptyProject: ProjectAnswers = {
  name: '',
  oneLiner: '',
  audience: '',
  problem: '',
  features: '',
  money: [],
  style: '',
  inspiration: '',
  firstGoal: '',
};

const STORAGE_KEY = 'corso:progetto:v1';

export function loadProject(): ProjectAnswers {
  if (typeof window === 'undefined') return emptyProject;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProject;
    const parsed = JSON.parse(raw) as Partial<ProjectAnswers>;
    return {
      ...emptyProject,
      ...parsed,
      money: Array.isArray(parsed.money) ? parsed.money.filter((m) => typeof m === 'string') : [],
    };
  } catch {
    return emptyProject;
  }
}

export function saveProject(answers: ProjectAnswers): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // localStorage unavailable — answers just won't persist.
  }
}

export function clearProject(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
