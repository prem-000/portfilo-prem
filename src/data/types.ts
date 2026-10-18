export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  tech: string[];
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
