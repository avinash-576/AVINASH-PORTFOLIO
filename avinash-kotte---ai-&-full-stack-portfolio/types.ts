export interface Education {
  institution: string;
  degree: string;
  year: string;
  location: string;
  score?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  tech: string[];
  description: string[];
  category: 'AI/ML' | 'Web Dev' | 'Other';
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frameworks' | 'Concepts' | 'Tools';
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  description?: string;
  credentialUrl?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface SocialLinks {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
}

export interface Profile {
  name: string;
  tagline: string;
  summary: string;
  photos: {
    formal: string;
    casual: string;
  };
}