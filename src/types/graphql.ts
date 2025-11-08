// GraphQL Types for CodeFolio API

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  order: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Portfolio {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Input Types
export interface UpdateProfileInput {
  name?: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface SkillInput {
  name: string;
  category: string;
  level: number;
  icon?: string;
  order?: number;
}

export interface ExperienceInput {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  order?: number;
}
