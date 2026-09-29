export interface ActivityCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  imagePaths: string[];
}

export interface AdditionalExperience {
  role: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

export const activitiesData: ActivityCategory[] = [
  {
    id: "campus-committee",
    title: "Campus Committee & Event Organization",
    badge: "Organization & Operations",
    description:
      "Active participant across major university and community initiatives, including the WALUBI committee during Waisak 2025, peer mentoring sessions organized by HIMTI, corporate company visit committees, and institutional event logistics.",
    imagePaths: [
      "/images/activities/walubi-01.jpg",
      "/images/activities/walubi-02.jpg",
      "/images/activities/walubi-03.jpg",
      "/images/activities/walubi-04.jpg",
      "/images/activities/walubi-05.jpg",
      "/images/activities/walubi-06.jpg",
      "/images/activities/walubi-07.jpg",
      "/images/activities/walubi-08.jpg",
    ],
  },
  {
    id: "master-of-ceremony",
    title: "Master of Ceremony",
    badge: "Public Speaking & Engagement",
    description:
      "Participated as a Master of Ceremony in campus events and committee activities, developing experience in public speaking, audience engagement, communication, and event coordination.",
    imagePaths: [
      "/images/activities/mc-01.jpg",
      "/images/activities/mc-02.jpg",
      "/images/activities/mc-03.jpg",
      "/images/activities/mc-04.jpg",
      "/images/activities/mc-05.jpg",
      "/images/activities/mc-06.jpg",
    ],
  },
];

export const additionalExperiences: AdditionalExperience[] = [
  {
    role: "HIMTI Mentor & Peer Guide",
    organization: "HIMTI (Himpunan Mahasiswa Teknik Informatika)",
    period: "Academic Journey",
    description:
      "Guided junior students through fundamental programming coursework, lab assignments, and student life adjustment.",
    tags: ["Mentorship", "Programming Fundamentals", "Academic Support"],
  },
  {
    role: "Company Visit Liaison & Committee",
    organization: "BINUS University Industry Relations",
    period: "Campus Event Term",
    description:
      "Assisted coordination for tech corporate site visits, managing schedule agendas, participant arrivals, and host communications.",
    tags: ["Industry Relations", "Event Management", "Liaison"],
  },
  {
    role: "Collaborative Project Contributor",
    organization: "Academic Coursework & Hackathon Teams",
    period: "B2028 Academic Cohort",
    description:
      "Collaborated in multidisciplinary teams delivering end-to-end coursework projects, research papers, and competition pipelines.",
    tags: ["Team Collaboration", "Agile Project Work", "Problem Solving"],
  },
];
