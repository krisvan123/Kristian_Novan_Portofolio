export interface SkillDetail {
  name: string;
  description?: string;
}

export interface HardSkillCategory {
  title: string;
  skills: SkillDetail[];
}

export interface SoftSkillItem {
  name: string;
  context: string;
}

export const hardSkillsData: HardSkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "C", description: "Foundations, memory concepts & low-level algorithms" },
      { name: "Python", description: "Machine learning, data processing & computational models" },
      { name: "Java", description: "Object-oriented architecture & system design" },
      { name: "JavaScript", description: "Modern web interfaces & frontend interactivity" },
      { name: "SQL", description: "Relational schema design & structured queries" },
      { name: "HTML", description: "Semantic web structure & responsive markup" },
    ],
  },
  {
    title: "AI / Machine Learning",
    skills: [
      { name: "Machine Learning", description: "Regression, classification & evaluation metrics" },
      { name: "Natural Language Processing", description: "Text preprocessing & information extraction" },
      { name: "Computer Vision", description: "Image classification & hybrid neural pipelines" },
      { name: "Computational Biology", description: "Post-translational modification pattern screening" },
      { name: "AI Concepts", description: "Heuristic search, optimization & green logistics" },
    ],
  },
  {
    title: "Design / Product",
    skills: [
      { name: "Figma", description: "Interactive prototyping & component design systems" },
      { name: "UI/UX Design", description: "User journey mapping & cognitive load reduction" },
      { name: "User Interface Design", description: "Visual hierarchy, typography & spatial balance" },
      { name: "Prototyping", description: "High-fidelity mockups & interaction flows" },
    ],
  },
  {
    title: "Web / Development",
    skills: [
      { name: "Next.js", description: "App router, static generation & full-stack prototypes" },
      { name: "TypeScript", description: "Type-safe component design & predictable data structures" },
    ],
  },
];

export const softSkillsData: SoftSkillItem[] = [
  { name: "Public Speaking", context: "Stage moderation, event hosting & audience engagement" },
  { name: "Teamwork", context: "Cross-functional collaboration in coursework & committees" },
  { name: "Leadership", context: "Initiative taking, organizing workflows & team guidance" },
  { name: "Communication", context: "Clear articulation of technical ideas & project goals" },
  { name: "Collaboration", context: "Active listening, constructive feedback & team alignment" },
  { name: "Independent Problem Solving", context: "Research-driven debugging & autonomous execution" },
  { name: "Adaptability", context: "Fast learning curve across diverse technical domains" },
  { name: "Presentation", context: "Research delivery & structured design critiques" },
  { name: "Mentoring", context: "Academic mentorship for junior students with HIMTI" },
  { name: "Event Coordination", context: "Excursions, campus operations & logistical execution" },
  { name: "Creative Thinking", context: "Connecting algorithmic rigor with visual intuition" },
  { name: "Responsibility", context: "Ownership of deliverables, ethics & committee duties" },
];
