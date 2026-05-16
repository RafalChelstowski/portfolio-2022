import type { SourceItem } from '../types';

const dataSetup: Pick<
  SourceItem,
  'family' | 'sortingVelocity' | 'customColor'
> = {
  family: 'ai',
  sortingVelocity: [2, -2, 5],
  customColor: '#6b4d74',
};

export const ai: SourceItem[] = [
  {
    title: 'AI-assisted development',
    subtitle:
      'Using Codex, Opencode, Claude Code with whole range of OpenAI, Anthropic and local models',
    size: 'l',
    cardFields: {
      Skills:
        'skills allow me to better steer agents when implementing/reviewing code',
      'Long running agents':
        'transforming requirements into long running ralph loops/goals',
      'Advanced context management':
        'tools like qmd/rtk/context mode that allow me to maximize agents context window',
    },
    categories: ['ai'],
    projects: ['portfolio', 'tpp', 'kitchen'],
    ...dataSetup,
  },
  {
    title: 'AI knowledge sharing',
    subtitle:
      "I'm involved in AI adoption. I'm organizing workshops and sharing patterns for using AI coding agents in real development work.",
    cardFields: {
      Workshops:
        "Agents code while you're away: intro to ralph-loops; Context management for AI coding agents",
    },
    size: 'm',
    categories: ['ai'],
    projects: [],
    ...dataSetup,
  },
  {
    title: 'Openclaw',
    subtitle:
      'Array of specialized agents supporting my daily planning, hobbies/interests and coding with long running loops',
    size: 's',
    categories: ['ai'],
    projects: ['portfolio', 'kitchen'],
    ...dataSetup,
  },
  {
    title: 'Local models',
    subtitle:
      "I'm interested in local models, identifying the workflows in which they can support API inference",
    size: 's',
    categories: ['ai'],
    projects: [],
    ...dataSetup,
  },
];
