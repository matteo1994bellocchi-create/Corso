// Content schema for the course. Modules are authored as plain JSON files in
// this folder (module-1.json ... module-6.json) matching the `Module` type
// below, so pasting new course text never requires touching app code.
// See CONTENT_GUIDE.md at the repo root for authoring instructions.

export type PromptExample = {
  /** Optional short label shown above the prompt, e.g. "Prompt di esempio". */
  label?: string;
  /** The literal prompt text, shown in a highlighted/monospace box. */
  prompt: string;
  /** Optional short note explaining why the prompt works. */
  note?: string;
};

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'prompt'; example: PromptExample }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'insight'; title?: string; text: string }
  | { type: 'quote'; text: string; attribution?: string };

export type ModuleSection = {
  id: string;
  title: string;
  blocks: ContentBlock[];
  /** Rendered as a collapsible card. Defaults to true. */
  collapsible?: boolean;
  /** Only relevant when collapsible. Defaults to false (collapsed). */
  defaultOpen?: boolean;
};

export type Exercise = {
  title: string;
  instructions: string;
  hint?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  explanation: string;
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  theory: ModuleSection[];
  examples: ModuleSection[];
  exercise: Exercise;
  quiz: QuizQuestion[];
  /** Percentage (0-100) required to pass the module quiz. */
  passingScore: number;
};

export type FinalExamMCQ = QuizQuestion & { moduleRef?: number };

export type FinalExamOpenQuestion = {
  id: string;
  prompt: string;
  /** Self-assessment checklist: what a good answer should contain. */
  checklist: string[];
};

export type FinalExam = {
  title: string;
  passingScore: number;
  mcq: FinalExamMCQ[];
  openQuestions: FinalExamOpenQuestion[];
};
