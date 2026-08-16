import type { FinalExam, Module } from './types';

import module1 from './module-1.json';
import module2 from './module-2.json';
import module3 from './module-3.json';
import module4 from './module-4.json';
import module5 from './module-5.json';
import module6 from './module-6.json';
import finalExamData from './final-exam.json';

export const modules: Module[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
] as Module[];

export const finalExam: FinalExam = finalExamData as FinalExam;

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleByNumber(number: number): Module | undefined {
  return modules.find((m) => m.number === number);
}

/** A module is "ready" once it has at least one quiz question. Placeholder
 * modules (quiz: []) are shown as "in arrivo" and can't be marked passed. */
export function isModuleReady(module: Module): boolean {
  return module.quiz.length > 0;
}

export const totalModules = modules.length;
