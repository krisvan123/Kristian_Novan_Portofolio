export interface SemesterGPA {
  semester: number;
  label: string;
  gpa: string;
  campus: string;
  focus: string;
}

export interface AcademicOverview {
  school: string;
  program: string;
  university: string;
  cohort: string;
  specialization: string;
  studyPeriod: string;
  cumulativeGpa: string;
  gpaScale: string;
  semesters: SemesterGPA[];
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
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
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
    cumulativeGpa: "3.59",
    gpaScale: "4.00",
    semesters: [
      {
        semester: 1,
        label: "Semester 1",
        gpa: "3.37",
        campus: "BINUS Semarang",
        focus: "Computer Science Fundamentals & Logic",
      },
      {
        semester: 2,
        label: "Semester 2",
        gpa: "3.52",
        campus: "BINUS Semarang",
        focus: "Data Structures & Discrete Mathematics",
      },
      {
        semester: 3,
        label: "Semester 3",
        gpa: "3.68",
        campus: "BINUS Semarang",
        focus: "Algorithm Analysis & Software Engineering",
      },
      {
        semester: 4,
        label: "Semester 4",
        gpa: "3.78",
        campus: "BINUS Jakarta (AI Streaming)",
        focus: "Intelligent Systems, Machine Learning & NLP",
      },
    ],
  },
  role: "Creative Technologist",
  focus: "Intelligent Systems (AI)",
  heroBio:
    "I'm Kristian Novan, a Computer Science student at BINUS University (started in Semarang for Semesters 1–3, currently taking the Intelligent Systems streaming in Jakarta for Semesters 4–5). Passionate about exploring machine learning algorithms and active in team leadership and stage moderation.",
  aboutBio: {
    lead:
      "I am a Computer Science undergraduate at BINUS University specializing in Intelligent Systems (AI). Driven by genuine curiosity, I actively explore computational algorithms and machine learning while thriving in collaborative teamwork, community leadership, and public speaking.",
    body: [
      "My technical journey centers on applying machine learning models to solve real-world problems. Whether building regression pipelines, biomedical NLP systems, or heuristic search algorithms, I enjoy exploring how intelligent systems work from the foundation up.",
      "At the same time, I genuinely enjoy socializing, connecting with diverse teams, and facilitating meaningful events. Through roles in HIMTI, stage moderation as a Master of Ceremony, and community volunteering, I combine technical discipline with articulate, professional communication.",
    ],
    capabilities: [
      "Intelligent Systems & Machine Learning",
      "Algorithmic Problem Solving & Python",
      "Public Speaking & Master of Ceremony",
      "Team Leadership & Community Mentoring",
      "Full-Stack Web Engineering",
      "Curiosity-Driven CS Exploration",
    ],
  },
  metrics: [
    {
      label: "Cumulative GPA",
      value: "3.59 / 4.00",
      description: "Consistent growth: Sem 1 (3.37) → Sem 4 (3.78)",
    },
    {
      label: "Program & Stream",
      value: "Computer Science",
      description: "Intelligent Systems (AI) · B2028",
    },
    {
      label: "Campus Mobility",
      value: "Semarang → Jakarta",
      description: "Sem 1–3 Semarang · Sem 4–5 Jakarta",
    },
    {
      label: "Current Focus",
      value: "Intelligent Systems",
      description: "Machine learning models & applied AI",
    },
  ],
  contact: {
    email: "kristiannovan17@gmail.com",
    phone: "+62 895-7024-96980",
    whatsapp: "+62 895-7024-96980",
    whatsappUrl: "https://wa.me/62895702496980",
    instagramHandle: "@krisxvan",
    instagramUrl: "https://www.instagram.com/krisxvan",
    linkedInName: "Kristian Novan",
    linkedInUrl:
      "https://www.linkedin.com/in/kristian-n-195031328?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "https://github.com/krisvan123",
  },
  profileImage: "/images/profile.jpg",
};
