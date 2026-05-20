import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'ai',
  sortingVelocity: [-2, -2, 5],
  customColor: '#6b4d74',
};

export const ai: SourceItem[] = [
  {
    title: 'AI-assisted development',
    subtitle:
      'Agent-assisted engineering with Codex, OpenCode, Claude Code, using GPT, Claude, and local models.',
    focus: true,
    size: 'l',
    listItems: [
      'Custom skills for steering agents through implementation and code review.',
      'Long running agents: requirements translated into ralph-loops and goals.',
      'Advanced context management: using qmd, rtk, and context-mode.',
    ],
    categories: ['ai'],
    projects: ['portfolio', 'kitchen'],
    ...dataSetup,
  },
  {
    title: 'AI knowledge sharing',
    subtitle:
      'Workshops and adoption patterns for using AI coding agents in real development work.',
    focus: true,
    listItems: [
      "Agents code while you're away: intro to Ralph loops.",
      'Context management for AI coding agents.',
    ],
    size: 'm',
    categories: ['ai', 'career'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Personal agent workflows',
    subtitle:
      'Specialized openclaw agents for daily planning, personal projects, and long-running coding loops.',
    size: 's',
    categories: ['ai'],
    projects: ['portfolio', 'kitchen'],
    ...dataSetup,
  },
  {
    title: 'Local models',
    subtitle:
      'Exploring where local inference can support API-based model workflows.',
    size: 's',
    categories: ['ai'],
    projects: [],
    ...dataSetup,
  },
];
