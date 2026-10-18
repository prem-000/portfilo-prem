import { ExperienceItem } from "./types";

export const experienceItems: ExperienceItem[] = [
  {
    id: "1",
    role: "Python Full Stack Developer",
    company: "SCRS Club",
    location: "India",
    type: "Part-time",
    startDate: "Aug 2025",
    endDate: "Present",
    description:
      "Developing institutional full-stack platforms, secure role-based services, and backend workflows powering campus-wide events and operations.",
    highlights: [
      "Engineered secure authentication and role-based access control serving 100+ students, managing registration, profile lifecycle, and permission scoping across college-wide deployments.",
      "Built and integrated REST APIs handling data collection, retrieval, and management workflows across 10+ events and hackathons, supporting 100+ participant records with zero data loss.",
      "Collaborated within a cross-functional student team to deliver full-stack applications powering institutional activities for a 100+ user base.",
    ],
    tech: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "RBAC", "Authentication"],
  },
];
