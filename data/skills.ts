export interface SkillItem {
  name: string;
  category: "technical" | "soft";
  description?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages & Tools",
    subtitle: "Core technologies and design environments utilized in coursework, projects, and development.",
    items: [
      { name: "C", category: "technical", description: "Low-level foundations, memory concepts, algorithms" },
      { name: "Python", category: "technical", description: "Machine learning, data processing, backend scripting" },
      { name: "JavaScript", category: "technical", description: "Web interactivity, modern front-end engineering" },
      { name: "Java", category: "technical", description: "Object-oriented design, systems architecture" },
      { name: "SQL", category: "technical", description: "Relational queries, database structuring" },
      { name: "HTML", category: "technical", description: "Semantic web structure, accessibility essentials" },
      { name: "Figma", category: "technical", description: "UI/UX wireframing, high-fidelity interactive prototyping" },
    ],
  },
  {
    title: "Soft Skills",
    subtitle: "Interpersonal attributes refined through leadership roles, campus organizations, and public speaking.",
    items: [
      { name: "Public Speaking", category: "soft", description: "Event moderation, stage presence, engaging delivery" },
      { name: "Teamwork", category: "soft", description: "Cross-functional synergy and goal alignment" },
      { name: "Leadership", category: "soft", description: "Guiding teams, initiating actions, coordinating events" },
      { name: "Independent Problem Solving", category: "soft", description: "Resourcefulness, critical debugging, research" },
      { name: "Communication", category: "soft", description: "Clear articulative technical and interpersonal dialogue" },
      { name: "Collaboration", category: "soft", description: "Empathy, active listening, constructive feedback" },
      { name: "Adaptability", category: "soft", description: "Quick adjustment to new environments and challenges" },
    ],
  },
];
