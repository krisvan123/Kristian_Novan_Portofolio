export interface SkillItem {
  name: string;
  category: "technical" | "soft";
  context: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming & Tools",
    subtitle: "Core programming languages, database systems, and design software used in coursework and builds.",
    items: [
      { name: "C", category: "technical", context: "Foundations, memory concepts & low-level algorithms" },
      { name: "Python", category: "technical", context: "Machine learning, data processing & scripting" },
      { name: "JavaScript", category: "technical", context: "Modern web interfaces & frontend interactivity" },
      { name: "Java", category: "technical", context: "Object-oriented programming & systems structure" },
      { name: "SQL", category: "technical", context: "Relational schema design & database queries" },
      { name: "HTML", category: "technical", context: "Semantic web structure & responsive layout" },
      { name: "Figma", category: "technical", context: "User interface design, wireframes & prototyping" },
    ],
  },
  {
    title: "Soft Skills",
    subtitle: "Interpersonal disciplines developed through campus leadership, committee coordination, and stage moderation.",
    items: [
      { name: "Public Speaking", category: "soft", context: "Stage moderation, event hosting & audience engagement" },
      { name: "Teamwork", category: "soft", context: "Cross-functional collaboration in coursework & committees" },
      { name: "Leadership", category: "soft", context: "Initiative taking, organizing workflows & team guidance" },
      { name: "Independent Problem Solving", category: "soft", context: "Research-driven debugging & autonomous execution" },
      { name: "Communication", category: "soft", context: "Clear articulation of technical ideas and project goals" },
      { name: "Collaboration", category: "soft", context: "Constructive feedback, active listening & team alignment" },
    ],
  },
];
