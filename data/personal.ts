export interface PersonalData {
  name: string;
  education: string;
  classYear: string;
  role: string;
  focus: string;
  heroBio: string;
  aboutBio: {
    lead: string;
    body: string[];
    capabilities: string[];
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  achievement: {
    title: string;
    badge: string;
    description: string;
    certificateImage: string;
    event: string;
  };
  contact: {
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    linkedInName: string;
    linkedInUrl: string;
    githubUrl?: string;
  };
  profileImage: string;
}

export const personalData: PersonalData = {
  name: "Kristian Novan",
  education: "BINUS University",
  classYear: "B2028",
  role: "Computer Science Student — BINUS University — B2028",
  focus: "Machine Learning + UI/UX",
  heroBio:
    "I'm a Computer Science student at BINUS University (B2028), exploring Machine Learning and UI/UX through academic projects, team builds, and hands-on experiments. I enjoy building applications that are not only technically sound, but also clear and comfortable for people to use.",
  aboutBio: {
    lead:
      "I'm Kristian Novan, a Computer Science student at BINUS University (B2028), currently exploring Machine Learning and UI/UX through academic projects, team-based work, and hands-on experiments. I enjoy building things that are not only technically useful, but also clear and comfortable for people to use.",
    body: [
      "Alongside software development, my academic journey has included active experience through campus events, peer mentoring, public speaking as a Master of Ceremony, and collaborative projects. These experiences have helped me develop a balanced perspective—combining technical discipline with clear communication and team responsibility.",
      "Whether analyzing models, crafting interface flows, or coordinating committee operations, I focus on delivering thoughtful, dependable work and collaborating constructively with teams.",
    ],
    capabilities: [
      "Machine Learning & Data Exploration",
      "UI/UX Design & Prototyping",
      "Software Development & Systems",
      "Public Speaking & Stage Moderation",
      "Campus Committee Leadership",
      "Independent Problem Solving",
    ],
  },
  metrics: [
    {
      label: "Academic Cohort",
      value: "BINUS B2028",
      description: "Computer Science Department",
    },
    {
      label: "Current Focus",
      value: "ML + UI/UX",
      description: "Applied models & user interfaces",
    },
    {
      label: "Projects Completed",
      value: "8+ Builds",
      description: "Coursework & competitive pipelines",
    },
  ],
  achievement: {
    title: "ICORIS 2026 — Paper Author",
    badge: "International Conference",
    event: "ICORIS 2026",
    description: "Successfully completed ICORIS 2026 as a paper author.",
    certificateImage: "/images/certificates/icoris-2026-author.jpg",
  },
  contact: {
    email: "kristiannovan17@gmail.com",
    instagramHandle: "@krisxvan",
    instagramUrl: "https://www.instagram.com/krisxvan",
    linkedInName: "Kristian Novan",
    linkedInUrl: "https://www.linkedin.com/in/kristian-novan",
    githubUrl: "https://github.com/krisvan123",
  },
  profileImage: "/images/profile.jpg",
};
