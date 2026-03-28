export interface Project {
  id?: string;
  title: string;
  description: string;
  category: string; // Dev, Design, Art, etc.
  techStack: string[];
  mediaAssets: string[];
  tags: string[]; // skills
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: any;
  updatedAt: any;
}

export interface CaseStudy {
  id?: string;
  projectId: string;
  problem: string;
  approach: string;
  process: string;
  outcome: string;
  richContent: any[]; // text, images, videos
  createdAt: any;
  updatedAt: any;
}

export interface Skill {
  id?: string;
  name: string;
  category: string; // Links to Categories
  level?: number; // Optional level
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  category?: string;
  createdAt: any;
}

export interface Settings {
  id?: string;
  experienceConfig: {
    enabledSections: string[];
    featuredProjects: string[];
    homepageLayout: string;
    animationIntensity: 'low' | 'medium' | 'high';
  };
}
