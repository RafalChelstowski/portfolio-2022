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
    title: 'Agent orchestration',
    subtitle:
      'Custom infrastructure for moving scoped requirements through implementation, verification, and review with coding agents.',
    focus: true,
    size: 'l',
    listItems: [
      'A project dashboard launches and manages concurrent agent sessions in isolated containerized workspaces.',
      'Bounded long-running workflows turn requirements into implementation, focused checks, and independent review.',
      'Durable project context and evaluated reusable skills keep agents grounded and workflows consistent.',
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
      'AI fundamentals workshops covering core terminology, model capabilities, and practical prompting techniques.',
    ],
    size: 'm',
    categories: ['ai'],
    projects: [],
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
