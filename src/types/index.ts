import { Mesh, Material } from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

export type ItemFamily = 'project' | 'ai' | 'stack' | 'creative' | 'career';
export type ItemSize = 's' | 'm' | 'l';
export type MainCategory = 'dev' | 'creative' | 'ai' | 'career';
export type ProjectConstellation = 'kitchen' | 'portfolio' | 'tpp';

export type SortOption = MainCategory | 'sort';

export type CardFieldValue = string | string[];

export interface PortfolioItem {
  id: string;
  title: string;
  family: ItemFamily;
  size: ItemSize;
  categories: MainCategory[];
  projects: ProjectConstellation[];
  sortingVelocity: [number, number, number];
  customColor: string;
  subtitle?: string;
  description?: string;
  link?: string;
  date?: string;
  location?: string;
  current?: boolean;
  outcome?: string;
  cardFields?: Record<string, CardFieldValue>;
}

export type Item3d = PortfolioItem;
export type SourceItem = Omit<PortfolioItem, 'id'>;
