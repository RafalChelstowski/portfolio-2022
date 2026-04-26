import type { SourceItem } from '../types';

const velocity: [number, number, number] = [2, -2, 5];
const color = '#6b4d74';

export const ai: SourceItem[] = [
  {
    title: 'Codex',
    subtitle: 'agentic coding workflow for planning, implementation, and review',
    family: 'ai',
    size: 'l',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'opencode',
    subtitle: 'terminal AI coding workflow and local development automation',
    family: 'ai',
    size: 'l',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'Claude Code',
    subtitle: 'AI coding assistant used for implementation and codebase navigation',
    family: 'ai',
    size: 'm',
    categories: ['ai', 'dev'],
    projects: ['portfolio'],
    sortingVelocity: velocity,
    customColor: color,
  },
  {
    title: 'openclaw',
    subtitle: 'custom or experimental AI workflow tooling',
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
