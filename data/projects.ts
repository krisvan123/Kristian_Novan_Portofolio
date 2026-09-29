export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  shortDescription: string;
  overview: string[];
  technologies: string[];
  previewImage: string;
  images: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
}

export interface UpcomingProject {
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  images: string[];
  disclaimer?: string;
}

export const projectsData: ProjectDetail[] = [
  {
    slug: "airsense-dashboard",
    title: "AirSense Dashboard",
    category: "AOL — Machine Learning",
    shortDescription:
      "AirSense Dashboard is a machine learning application for estimating PM2.5 concentration based on historical WHO data. Users can enter regional parameters to obtain predictions without relying on a PM2.5 sensor in the field.",
    overview: [
      "AirSense Dashboard is a machine learning application for estimating PM2.5 concentration based on historical WHO data. Users can enter regional parameters to obtain predictions without relying on a PM2.5 sensor in the field.",
      "The application was developed as part of an Academic On-Line (AOL) project to explore practical regression models on environmental data. In many regions, physical air quality monitoring stations are scarce or costly to deploy. By leveraging macro environmental indicators recorded in World Health Organization datasets, the tool provides an accessible estimate of particulate concentration directly through a streamlined interface.",
      "The project focuses on data preprocessing, feature correlation, and presenting predictive outcomes clearly so users can evaluate local air quality indicators effectively.",
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "WHO Dataset"],
    previewImage: "/images/projects/airsense-01.jpg",
    images: ["/images/projects/airsense-01.jpg"],
  },
  {
    slug: "nivscan",
    title: "NiVScan",
    category: "AOL — Natural Language Processing",
    shortDescription:
      "NiVScan is an NLP-based application designed to analyze information related to the Nipah virus using natural language processing techniques.",
    overview: [
      "NiVScan is an NLP-based application designed to analyze information related to the Nipah virus using natural language processing techniques.",
      "Developed for an AOL coursework assignment, the system processes unstructured biomedical texts and public health reports concerning Nipah virus transmissions and outbreaks. Through natural language processing pipelines, it structures key textual findings to assist researchers and students in reviewing scientific literature more efficiently.",
      "The project emphasizes practical text preprocessing, lexical analysis, and clean presentation of extracted insights without unnecessary complexity.",
    ],
    technologies: ["Python", "NLP", "Text Processing", "Information Retrieval"],
    previewImage: "/images/projects/nivscan-01.jpg",
    images: ["/images/projects/nivscan-01.jpg"],
  },
  {
    slug: "promod-ai",
    title: "ProMod AI",
    subtitle: "Post-Translational Modification (PTM)",
    category: "AOL — Computational Biology",
    shortDescription:
      "ProMod AI explores Post-Translational Modification (PTM), a chemical modification that occurs to proteins after translation. One important example is phosphorylation, which involves adding a phosphate group to specific amino acid residues such as Serine, Threonine, or Tyrosine.",
    overview: [
      "ProMod AI explores Post-Translational Modification (PTM), a chemical modification that occurs to proteins after translation. One important example is phosphorylation, which involves adding a phosphate group to specific amino acid residues such as Serine, Threonine, or Tyrosine. Phosphorylation plays an important role in cellular signaling and is associated with diseases including cancer and Alzheimer's disease.",
      "Created for an AOL Computational Biology study, ProMod AI investigates computational methods for recognizing modification patterns along amino acid sequences. Because experimental wet-lab identification of phosphorylation sites can be resource-intensive, computational biology models offer an important complementary method for screening protein candidates.",
      "The project combines bioinformatics concepts with machine learning sequence classification, presenting predictions with scientific clarity.",
    ],
    technologies: ["Python", "Computational Biology", "Machine Learning", "Bioinformatics"],
    previewImage: "/images/projects/promod-01.jpg",
    images: ["/images/projects/promod-01.jpg", "/images/projects/promod-02.jpg"],
  },
  {
    slug: "finance-app",
    title: "Financial / Savings Application",
    category: "AOL — Software Engineering",
    shortDescription:
      "A financial application focused on saving and personal financial management, designed to streamline budgeting and money tracking.",
    overview: [
      "A financial application focused on saving and personal financial management.",
      "Built as a practical software engineering project, the application emphasizes clean software architecture, reliable state handling, and a clear user interface for tracking everyday financial goals and expense categories. More detailed functionality and expanded modules will continue to be added as development evolves.",
    ],
    technologies: ["Software Engineering", "Full-Stack Development", "System Design"],
    previewImage: "/images/projects/finance-01.jpg",
    images: ["/images/projects/finance-01.jpg"],
  },
  {
    slug: "platgizi",
    title: "PlatGizi",
    subtitle: "Smart Menu Planning System",
    category: "Assignment — Machine Learning",
    shortDescription:
      "PlatGizi is a smart menu planning system designed to support a healthy lifestyle and balanced nutrition through a machine learning-based approach.",
    overview: [
      "PlatGizi is a smart menu planning system designed to support a healthy lifestyle and balanced nutrition through a machine learning-based approach.",
      "Developed for an academic coursework assignment, PlatGizi addresses the challenge of planning nutritionally balanced daily meals. By analyzing nutritional values, caloric constraints, and user preferences, the system algorithmically recommends meal plans that align with balanced diet standards.",
      "The system focuses on structured nutrient balancing and accessible user recommendations for everyday dietary health.",
    ],
    technologies: ["Python", "Machine Learning", "Recommendation Algorithms", "Nutrition Data"],
    previewImage: "/images/projects/platgizi-01.jpg",
    images: ["/images/projects/platgizi-01.jpg"],
  },
  {
    slug: "ecorouter-ai",
    title: "EcoRouter AI",
    subtitle: "CompFest AI Competition",
    category: "CompFest AI Competition",
    shortDescription:
      "Every stop lightens the load — EcoRouter sequences deliveries around it to burn the least fuel getting there.",
    overview: [
      "Every stop lightens the load — EcoRouter sequences deliveries around it to burn the least fuel getting there.",
      "Developed as a competitive entry for the CompFest AI Competition, EcoRouter AI models vehicle routing optimization under dynamic load constraints. Instead of treating transit segments as having static weight, the algorithm factors in vehicle mass reduction after each delivery stop to identify route sequences that minimize overall fuel consumption.",
      "The project provided valuable experience in algorithmic optimization, logistical heuristic modeling, and competitive team problem solving.",
    ],
    technologies: ["Python", "Optimization Algorithms", "Heuristic Search", "Green Logistics"],
    previewImage: "/images/projects/ecorouter-01.jpg",
    images: ["/images/projects/ecorouter-01.jpg"],
  },
  {
    slug: "skinical",
    title: "Skinical",
    category: "AOL — Computer Vision",
    shortDescription:
      "Skinical is a web-based skin lesion classification system developed using two approaches: Classical Machine Learning and Hybrid Deep Learning + Classical Machine Learning. The system is designed to classify whether a skin lesion is Benign or Malignant.",
    overview: [
      "Skinical is a web-based skin lesion classification system developed using two approaches: Classical Machine Learning and Hybrid Deep Learning + Classical Machine Learning. The system is designed to classify whether a skin lesion is Benign or Malignant.",
      "Created as an AOL Computer Vision project, the study compares the diagnostic performance of classical computer vision feature descriptors against a hybrid pipeline that combines deep neural representations with classical classifiers. The objective was to evaluate both accuracy and computational efficiency in non-invasive lesion screening support.",
      "The application bundles the classification pipeline into a web interface for clear image upload and result inspection.",
    ],
    technologies: ["Computer Vision", "Deep Learning", "Classical Machine Learning", "Web Interface"],
    previewImage: "/images/projects/skinical-01.jpg",
    images: ["/images/projects/skinical-01.jpg"],
  },
  {
    slug: "travel-app",
    title: "Travel Application",
    subtitle: "Figma Prototype & HCI Study",
    category: "AOL — Human and Computer Interaction",
    shortDescription:
      "A travel-oriented application designed through user interface and human-computer interaction principles, with the prototype created using Figma.",
    overview: [
      "A travel-oriented application designed through user interface and human-computer interaction principles, with the prototype created using Figma.",
      "Undertaken as an AOL Human-Computer Interaction coursework project, this work examined how travelers organize complex itineraries, discover destinations, and navigate multi-leg journeys. By applying core HCI principles—such as cognitive load minimization, clear visual hierarchy, consistent feedback, and intuitive journey flows—the prototype simplifies travel scheduling into a calm, coherent mobile experience.",
      "The final high-fidelity Figma prototype illustrates the primary user flow, visual design system, and key interactive components.",
    ],
    technologies: ["Figma", "HCI Principles", "UI/UX Design", "Wireframing", "Prototyping"],
    previewImage: "/images/projects/travel-01.jpg",
    images: [
      "/images/projects/travel-01.jpg",
      "/images/projects/travel-02.jpg",
      "/images/projects/travel-03.jpg",
    ],
  },
];

export const upcomingProjectsData: UpcomingProject[] = [
  {
    slug: "trobos",
    title: "Trobos",
    category: "Mobility & Transit Concept",
    status: "Prototype / In Development",
    description:
      "Trobos is a mobility concept for dealing with traffic congestion. The idea is to let a motorbike rider pick up the passenger while the passenger's car is handled separately and delivered to the intended destination.",
    technologies: ["Product Concept", "Figma Prototype", "Logistics Flow", "Mobile UI"],
    images: [
      "/images/projects/upcoming/trobos-01.jpg",
      "/images/projects/upcoming/trobos-02.jpg",
    ],
  },
  {
    slug: "mindcare",
    title: "MindCare",
    category: "AI Guidance Concept",
    status: "Upcoming Project / Prototype",
    description:
      "MindCare is an AI-based concept designed to provide initial guidance and practical next steps when someone is not feeling emotionally well. The goal is to make supportive guidance easier to access through a conversational experience.",
    disclaimer:
      "Prototype concept only. MindCare is designed for supportive initial guidance and does not provide medical diagnosis or replace professional healthcare.",
    technologies: ["Conversational AI", "UI/UX Concept", "Natural Language Guidance"],
    images: [
      "/images/projects/upcoming/mindcare-01.jpg",
      "/images/projects/upcoming/mindcare-02.jpg",
    ],
  },
];
