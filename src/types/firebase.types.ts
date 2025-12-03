// Firebase Firestore Types for CodeFolio

import { Timestamp } from 'firebase/firestore';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Profile {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  socialLinks?: SocialLinks;
  updatedAt?: Timestamp | Date;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number;
  icon?: string;
  createdAt?: Timestamp | Date;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  technologies?: string[];
  createdAt?: Timestamp | Date;
}

export interface Portfolio {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
}

// Input Types (same as output for Firebase)
export type CreateProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectInput = Partial<CreateProjectInput>;

export type CreateSkillInput = Omit<Skill, 'id' | 'createdAt'>;
export type UpdateSkillInput = Partial<CreateSkillInput>;

export type CreateExperienceInput = Omit<Experience, 'id' | 'createdAt'>;
export type UpdateExperienceInput = Partial<CreateExperienceInput>;

export type UpdateProfileInput = Partial<Omit<Profile, 'id' | 'updatedAt'>>;
