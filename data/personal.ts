export interface AcademicOverview {
  school: string;
  program: string;
  university: string;
  cohort: string;
  specialization: string;
  studyPeriod: string;
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
    phone?: string;
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
    program: "Computer Science",
    university: "BINUS University",
    cohort: "B2028",
    specialization: "Intelligent Systems (AI)",
    studyPeriod: "Sem 1–3 Semarang (Main) · Sem 4–5 Jakarta (AI Streaming)",
  },
  role: "Creative Technologist",
  focus: "Machine Learning · UI/UX",
  heroBio:
    "I'm Kristian Novan, a Computer Science student at BINUS University (started in Semarang for Semesters 1–3, currently taking the Intelligent Systems streaming in Jakarta for Semesters 4–5). I explore the intersection of Machine Learning, Human-Computer Interaction, and creative stagecraft.",
  aboutBio: {
    lead:
      "I started my Computer Science journey at BINUS University Semarang (Semesters 1–3), and am currently undertaking the Intelligent Systems (AI) streaming in Jakarta (Semesters 4–5) to dive deeper into Machine Learning and UI/UX engineering.",
    body: [
      "Outside of technology, I also enjoy music, theater, choir, and modeling. I like trying things that are unfamiliar to me and learning something new along the way. For me, exploring different interests is part of how I stay curious and keep growing.",
      "Whether I'm training a machine learning model, crafting an interface in Figma, or stepping onto a stage, I find joy in connecting technical thinking with creative expression. I enjoy building things from both sides of the process — making systems dependable under the hood while ensuring they feel natural, clear, and human on the surface.",
    ],
    capabilities: [
      "Machine Learning & Intelligent Systems (AI)",
      "UI/UX Design & Human-Centered Craft",
      "Creative Arts: Music, Theater & Choir",
      "Full-Stack Web & Software Engineering",
      "Public Speaking & Master of Ceremony",
      "Curious & Hands-on Exploration",
    ],
  },
  metrics: [
    {
      label: "Program",
      value: "Computer Science",
      description: "School of Computer Science (SOCS)",
    },
    {
      label: "Specialization",
      value: "Intelligent Systems (AI)",
      description: "Specialization taken during Semesters 4–5",
    },
    {
      label: "Institution & Cohort",
      value: "BINUS University · B2028",
      description: "Class of B2028 undergraduate",
    },
    {
      label: "Current Focus",
      value: "Machine Learning · UI/UX",
      description: "Applied AI models & human-centered design",
    },
  ],
  contact: {
    email: "kristiannovan17@gmail.com",
    phone: "+62 895-7024-95980",
    instagramHandle: "@krisxvan",
    instagramUrl: "https://www.instagram.com/krisxvan",
    linkedInName: "Kristian Novan",
    linkedInUrl:
      "https://www.linkedin.com/in/kristian-n-195031328?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "https://github.com/krisvan123",
  },
  profileImage: "/images/profile.jpg",
};
