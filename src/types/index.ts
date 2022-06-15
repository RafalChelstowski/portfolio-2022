import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Material } from 'three';

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

export enum ExperienceType {
  Experience = 'Experience / Education',
  Project = 'Additional Projects',
  Technology = 'Skill / Technology',
}

export enum Sets {
  CREATIVE_DEV = 'creative dev',
  FRONTEND_DEV = 'frontend dev',
  MARKETING = 'marketing lead',
  FREELANCE = 'freelancer',
}

interface Item3dProps {
  sortingVelocity: number[];
  customColor: string;
  size: string;
  set?: Sets[];
}

interface DateLocation {
  fromTo: string;
  where?: string;
}

export interface ExperienceItem extends Item3dProps, Required<DateLocation> {
  type: ExperienceType.Experience;
  name: string;
  current?: boolean;
}

export interface TechnologyItem extends Item3dProps {
  type: ExperienceType.Technology;
  name: string;
}

export interface ProjectItem extends Item3dProps {
  type: ExperienceType.Project;
  name: string;
  for?: string;
  description?: string;
  link?: string;
}

type AllDataItems = ExperienceItem | TechnologyItem | ProjectItem;

interface ControlProps {
  id: string;
  callback?: (item: AllDataItems) => void;
}

export type Item3d = AllDataItems & ControlProps;
