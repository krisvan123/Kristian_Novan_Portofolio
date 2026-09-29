export interface PersonalData {
  name: string;
  role: string;
  heroBio: string;
  aboutBio: {
    paragraphs: string[];
    passions: string[];
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
  role: "Computer Science Student | Developer | Public Speaker | Project Enthusiast",
  heroBio:
    "I am a Computer Science student passionate about technology, software development, artificial intelligence, and building meaningful digital experiences through projects and collaboration.",
  aboutBio: {
    paragraphs: [
      "I am a Computer Science student with a strong interest in software development, artificial intelligence, machine learning, computer vision, natural language processing, and human-computer interaction.",
      "Throughout my academic journey, I have participated in campus committees, mentoring activities, event organizing, public speaking, and collaborative projects. These experiences have helped me develop both technical and interpersonal skills.",
    ],
    passions: [
      "Building applications",
      "Working on AI-related projects",
      "Collaborating with teams",
      "Public speaking",
      "Learning new technologies",
      "Solving problems independently",
    ],
  },
  metrics: [
    {
      label: "Projects",
      value: "8+",
      description: "Academic & competitive builds",
    },
    {
      label: "Campus Activities",
      value: "Multiple Experiences",
      description: "Committees, mentoring & MC",
    },
    {
      label: "Core Focus",
      value: "Technology + Collaboration",
      description: "Engineering & communication",
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
