export interface PersonalData {
  name: string;
  education: string;
  classYear: string;
  role: string;
  heroBio: string;
  focusAreas: string[];
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
  role: "Computer Science Student — BINUS University — Class of B2028",
  heroBio:
    "Computer Science student at BINUS University (B2028) working across software development, machine learning, and human-computer interaction, with active experience in campus leadership and stage moderation.",
  focusAreas: [
    "Software Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Computer Vision",
    "Natural Language Processing",
    "Human-Computer Interaction",
  ],
  aboutBio: {
    lead:
      "Kristian Novan is a Computer Science student at BINUS University, class of B2028, with experience across software development, machine learning, natural language processing, computer vision, computational biology, and human-computer interaction.",
    body: [
      "Alongside coursework and technical projects, his academic journey has included active roles in campus committees, event organization, Master of Ceremony moderation, peer mentoring, and team-based development. These experiences have shaped both practical technical discipline and interpersonal communication.",
      "Whether developing algorithmic pipelines, designing interfaces with HCI principles, or coordinating committee workflows on stage, the priority is always building functional work, taking responsibility, and collaborating effectively.",
    ],
    capabilities: [
      "Building practical software & AI models",
      "Event organization & committee leadership",
      "Public speaking & stage moderation",
      "Independent problem solving & debugging",
      "Cross-functional team collaboration",
      "Mentoring & knowledge sharing",
    ],
  },
  metrics: [
    {
      label: "Projects Completed",
      value: "8+",
      description: "Academic coursework & competitive builds",
    },
    {
      label: "Campus Involvement",
      value: "Active",
      description: "Committees, mentoring & MC moderation",
    },
    {
      label: "Academic Focus",
      value: "CS • B2028",
      description: "Software engineering & applied AI",
    },
  ],
  achievement: {
    title: "ICORIS 2026 — Paper Author",
    badge: "International Conference Publication",
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
