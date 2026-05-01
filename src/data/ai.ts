import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, 5];
const color = '#6b4d74';

export const ai: SourceItem[] = [
  {
    title: 'Codex',
    subtitle: 'my main harness for openai models',
    family: 'ai',
    size: 'l',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'opencode',
    subtitle: 'my support harness for anthropic/other models',
    family: 'ai',
    size: 'm',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Claude Code',
    family: 'ai',
    size: 'm',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'openclaw',
    subtitle:
      'several specialized agents for calendar management/workout analysis/learning/coding with ralph-loops',
    family: 'ai',
    size: 's',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'ralph-loop',
    subtitle: 'iterative agent loop for turning planning notes into implementation tasks',
    family: 'ai',
    size: 's',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
