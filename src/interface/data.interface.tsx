// Portfolio Data Interfaces
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'office';
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description?: string;
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    location: string;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: Contact;
}
