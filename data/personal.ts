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
    studyPeriod: "Semesters 4–5",
  },
  role: "Computer Science Student",
  focus: "Machine Learning · UI/UX",
  heroBio:
    "I'm Kristian Novan, a Computer Science student at BINUS University. At this stage of my studies, I'm focusing on Machine Learning and UI/UX, while continuing to learn through academic projects, team collaborations, and campus activities. I enjoy working between the technical and visual sides of a project — building something that works, but also making it clear and comfortable to use.",
  aboutBio: {
    lead:
      "I'm an undergraduate student at BINUS University's School of Computer Science (SOCS), Class of B2028, pursuing Computer Science with a specialization in Intelligent Systems (AI) taken during Semesters 4–5.",
    body: [
      "My academic work centers on applied machine learning, computer vision, natural language processing, and human-computer interaction. I'm fascinated by the intersection of computational algorithms and thoughtful interface design — creating tools that not only solve real problems under the hood, but also feel natural, reliable, and respectful of the user.",
      "Beyond technical coursework, my university journey has been shaped by active roles in student organizations: mentoring peers with HIMTI, volunteering in humanitarian initiatives like WALUBI Waisak 2025, coordinating company excursions, and moderating formal stages as a Master of Ceremony. These diverse experiences have strengthened my team leadership, cross-disciplinary communication, and ability to deliver under pressure.",
    ],
    capabilities: [
      "Machine Learning & Intelligent Systems (AI)",
      "UI/UX Design & Interactive Prototyping",
      "Full-Stack Web & Software Engineering",
      "Public Speaking & Master of Ceremony",
      "Campus Leadership & Committee Operations",
      "Analytical & Independent Problem Solving",
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
    instagramHandle: "@krisxvan",
    instagramUrl: "https://www.instagram.com/krisxvan",
    linkedInName: "Kristian Novan",
    linkedInUrl: "https://www.linkedin.com/in/kristian-novan",
    githubUrl: "https://github.com/krisvan123",
  },
  profileImage: "/images/profile.jpg",
};
