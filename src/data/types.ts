export interface ProjectTechCategory {
  category: string;
  items: string[];
}

export interface ProjectMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface ArchitectureNode {
  step: string;
  title: string;
  description: string;
  tech: string;
}

export interface EngineeringNote {
  title: string;
  content: string;
}

export interface ProjectSectionDetail {
  problem: string;
  solution: string;
  features: string[];
  plannedFeatures?: string[];
  architecture: string;
  workflow: string[];
  contributions: string[];
  statusBadge: string;
  techCategories: ProjectTechCategory[];
  category?: string;
  caseStudyNumber?: string;
  targetAudience?: string;
  metrics?: ProjectMetric[];
  architecturePipeline?: ArchitectureNode[];
  engineeringNotes?: EngineeringNote[];
  whatNext?: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  tech: string[];
  details: ProjectSectionDetail;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  tech: string[];
  projects?: { name: string; url: string }[];
}
