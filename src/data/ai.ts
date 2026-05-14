import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, 5];
const color = '#6b4d74';

export const ai: SourceItem[] = [
  {
    title: 'AI-assisted development',
    subtitle:
      'Using Codex as the primary coding harness, with opencode and Claude Code for supporting workflows.',
    family: 'ai',
    size: 'l',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Agentic workflows',
    subtitle: 'Long-running agent loops that turn planning notes into scoped implementation work.',
    cardFields: {
      Technique: 'Ralph loops',
    },
    family: 'ai',
    size: 'm',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'AI knowledge sharing',
    subtitle:
      'Practical workshops and patterns for using AI coding agents in real development work.',
    cardFields: {
      Workshops:
        "Agents code while you're away: intro to ralph-loops; Context management for AI coding agents",
    },
    family: 'ai',
    size: 'm',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
];
