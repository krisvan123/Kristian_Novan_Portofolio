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
    role: "HIMTI Mentor & PTK Staff (SESVENT & TECHNO)",
    organization: "HIMTI (Himpunan Mahasiswa Teknik Informatika) BINUS University",
    period: "Oct 2024 – Feb 2026",
    description:
      "Served as Staff of PTK (Pengembangan Tenaga Kerja) Division and Mentor Staff for SESVENT 2025 (Oct 2025). Guided new members and introduced organizational culture, habits, and collaborative workflows within HIMTI.",
    tags: ["Staff PTK", "Mentor SESVENT", "HIMTI Onboarding", "Oct 2024 – Feb 2026"],
  },
  {
    role: "Master of Ceremony (FEAST, TECHNO, BIFEST CBDC)",
    organization: "HIMTI & BINUS University (CBDC)",
    period: "Mar 2025 – Nov 2025",
    description:
      "Hosted formal and dynamic stage events: MC FEAST (Mar 2025) for all School of Computer Science (SOCS) students, MC TECHNO 2025 (Sep 2025) welcoming new HIMTI members, and MC BIFEST CBDC (Nov 2025).",
    tags: ["MC FEAST (SOCS)", "MC TECHNO 2025", "MC BIFEST CBDC", "Public Speaking"],
  },
  {
    role: "Company Visit Committee — PT Pura Smart Technology",
    organization: "HIMTI BINUS University",
    period: "Jun 2025",
    description:
      "Coordinated an industrial company visit to PT Pura Smart Technology, managing operational rundowns, participant transportation, and communication with enterprise engineering hosts.",
    tags: ["Company Visit", "PT Pura Smart Technology", "Industry Relations", "HIMTI"],
  },
  {
    role: "Medical & Humanitarian Logistics Volunteer",
    organization: "DPD WALUBI Jawa Tengah (Waisak National Committee)",
    period: "May 2025",
    description:
      "Assisted doctors and healthcare teams at medical aid posts during the national social health service at Candi Borobudur and Mendut, managing supply distribution under high-volume field conditions.",
    tags: ["WALUBI Volunteer", "Waisak 2025", "Healthcare Logistics", "Candi Borobudur"],
  },
];
