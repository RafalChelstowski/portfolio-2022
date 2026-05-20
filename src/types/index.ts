import { Mesh, Material } from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

export type ItemFamily = 'project' | 'ai' | 'stack' | 'creative' | 'career' | 'learning';
export type ItemSize = 's' | 'm' | 'l';
export type MainCategory = 'dev' | 'creative' | 'ai' | 'career' | 'learning';
export type ProjectConstellation = 'kitchen' | 'portfolio' | 'tpp';

export type SortOption = MainCategory | ProjectConstellation | 'focus' | 'sort';
export type SelectedGroupOption = Exclude<SortOption, 'sort'>;

export type CardFieldValue = string | string[];
export interface LearningCourseRow {
  provider: string;
  course: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  family: ItemFamily;
  size: ItemSize;
  categories: MainCategory[];
  projects: ProjectConstellation[];
  focus?: boolean;
  sortingVelocity: [number, number, number];
  customColor: string;
  subtitle?: string;
  description?: string;
  listItems?: string[];
  link?: string;
  date?: string;
  location?: string;
  current?: boolean;
  outcome?: string;
  cardFields?: Record<string, CardFieldValue>;
  learningCourses?: LearningCourseRow[];
}

export type Item3d = PortfolioItem;
export type SourceItem = Omit<PortfolioItem, 'id'>;
