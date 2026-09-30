export interface AcademicOverview {
  school: string;
  university: string;
  cohort: string;
  specialization: string;
}

export interface PersonalData {
  name: string;
  academic: AcademicOverview;
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
  academic: {
    school: "School of Computer Science (SOCS)",
    university: "BINUS University",
    cohort: "B2028",
    specialization: "Intelligent Systems (AI)",
  },
  role: "BINUS University • School of Computer Science (SOCS) • B2028",
  focus: "Machine Learning + UI/UX",
  heroBio:
    "Student at BINUS University's School of Computer Science (SOCS), Class of B2028, currently taking the Intelligent Systems (AI) specialization. Exploring Machine Learning and UI/UX through hands-on projects, team collaborations, and applied experiments.",
  aboutBio: {
    lead:
      "I'm Kristian Novan, an undergraduate student at BINUS University's School of Computer Science (SOCS), Class of B2028, specializing in Intelligent Systems (AI). My primary focus areas are Machine Learning and UI/UX design.",
    body: [
      "I enjoy building applications that combine algorithmic intelligence with interfaces that feel clear and comfortable for people to use. My academic work spans machine learning exploration, natural language processing, computer vision, and user-centered design prototypes.",
      "Alongside software development, my university experience has included active roles in campus committees, peer mentoring with HIMTI, public speaking as a Master of Ceremony, and collaborative project teams. These experiences have shaped both my technical problem solving and interpersonal communication.",
    ],
    capabilities: [
      "Machine Learning & Intelligent Systems (AI)",
      "UI/UX Design & Prototyping",
      "Software Engineering & Web Systems",
      "Public Speaking & Master of Ceremony",
      "Campus Committee Operations",
      "Independent Problem Solving",
    ],
  },
  metrics: [
    {
      label: "School & Specialization",
      value: "SOCS • AI",
      description: "Intelligent Systems (AI) Specialization",
    },
    {
      label: "Cohort & University",
      value: "BINUS B2028",
      description: "BINUS University Undergraduate",
    },
    {
      label: "Current Focus",
      value: "ML + UI/UX",
      description: "Applied machine learning & interface design",
    },
  ],
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
