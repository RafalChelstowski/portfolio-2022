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
      'Practical agent-assisted engineering with Codex, OpenCode, Claude Code, and OpenAI, Anthropic, and local models.',
    size: 'l',
    cardFields: {
      Skills:
        'Custom skills for steering agents through implementation and code review',
      'Long running agents':
        'Requirements translated into long-running Ralph loops and scoped goals',
      'Advanced context management':
        'qmd, rtk, and context-mode workflows for keeping agents grounded in the right material',
    },
    categories: ['ai'],
    projects: ['portfolio', 'kitchen'],
    ...dataSetup,
  },
  {
    title: 'AI knowledge sharing',
    subtitle:
      'Workshops and adoption patterns for using AI coding agents in real development work.',
    cardFields: {
      Workshops:
        "Agents code while you're away: intro to Ralph loops; context management for AI coding agents",
    },
    size: 'm',
    categories: ['ai'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Personal agent workflows',
    subtitle:
      'Openclaw-style specialized agents for daily planning, personal projects, and long-running coding loops.',
    size: 's',
    categories: ['ai'],
    projects: ['portfolio'],
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
