export interface ActivityCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  additionalInfo?: {
    label: string;
    value: string;
  }[];
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
    badge: "Organization & Leadership",
    description:
      "Participated in various campus activities, including the WALUBI committee during Waisak 2025, mentoring activities organized by HIMTI, company visit committees, and other university events.",
    images: [
      {
        src: "/images/activities/walubi-01.jpg",
        alt: "WALUBI committee event documentation 1",
        caption: "WALUBI Committee — Waisak 2025",
      },
      {
        src: "/images/activities/walubi-02.jpg",
        alt: "WALUBI committee event documentation 2",
        caption: "Ceremonial Coordination & Logistics",
      },
      {
        src: "/images/activities/walubi-03.jpg",
        alt: "HIMTI mentoring activity",
        caption: "HIMTI Mentoring Session",
      },
      {
        src: "/images/activities/walubi-04.jpg",
        alt: "Campus committee coordination",
        caption: "Division Operations & Briefing",
      },
      {
        src: "/images/activities/walubi-05.jpg",
        alt: "Company visit committee event",
        caption: "Company Visit Coordination",
      },
      {
        src: "/images/activities/walubi-06.jpg",
        alt: "Campus event committee group documentation",
        caption: "Committee Synergy & Planning",
      },
      {
        src: "/images/activities/walubi-07.jpg",
        alt: "University event execution",
        caption: "On-site Event Execution",
      },
      {
        src: "/images/activities/walubi-08.jpg",
        alt: "University activity wrap-up",
        caption: "Evaluation & Team Appreciation",
      },
    ],
    additionalInfo: [
      { label: "Key Involvements", value: "WALUBI Waisak 2025, HIMTI Mentoring, Company Visits" },
      { label: "Core Competencies", value: "Logistics, Team Coordination, Schedule Management" },
    ],
  },
  {
    id: "master-of-ceremony",
    title: "Master of Ceremony",
    badge: "Public Speaking & Moderation",
    description:
      "Took part as a Master of Ceremony in campus events and committee activities, developing confidence, communication, audience engagement, and public speaking skills.",
    images: [
      {
        src: "/images/activities/mc-01.jpg",
        alt: "Master of Ceremony opening address",
        caption: "Opening Speech & Stage Hosting",
      },
      {
        src: "/images/activities/mc-02.jpg",
        alt: "Audience engagement during campus event",
        caption: "Audience Interaction & Energy",
      },
      {
        src: "/images/activities/mc-03.jpg",
        alt: "Formal event hosting",
        caption: "Formal Protocol Moderation",
      },
      {
        src: "/images/activities/mc-04.jpg",
        alt: "Panel session introduction",
        caption: "Guest Speaker Introduction",
      },
      {
        src: "/images/activities/mc-05.jpg",
        alt: "Stage coordination and live cueing",
        caption: "Live Stage Coordination",
      },
      {
        src: "/images/activities/mc-06.jpg",
        alt: "Closing ceremony session",
        caption: "Closing Remarks & Session Wrap-up",
      },
    ],
    additionalInfo: [
      { label: "Focus Areas", value: "Stage Presence, Dynamic Moderation, Audience Engagement" },
      { label: "Key Strength", value: "Adaptability to Live Cues and Formal Flow" },
    ],
  },
];

export const additionalExperiences: AdditionalExperience[] = [
  {
    role: "HIMTI Mentor & Peer Guide",
    organization: "HIMTI (Himpunan Mahasiswa Teknik Informatika)",
    period: "Ongoing / Academic Journey",
    description:
      "Assisted junior students in understanding foundational programming concepts, laboratory assignments, and university transition.",
    tags: ["Mentoring", "Academic Support", "Peer Guidance"],
  },
  {
    role: "Company Visit Liaison & Committee",
    organization: "University Industry Engagement",
    period: "Campus Event Term",
    description:
      "Coordinated logistical arrangements, participant flow, and company host communication during university tech company visits.",
    tags: ["External Relations", "Event Management", "Liaison"],
  },
  {
    role: "Collaborative Project Contributor",
    organization: "Academic & Competition Teams",
    period: "Semester 1 - Present",
    description:
      "Actively led and contributed to group coursework, hackathons, and AI competition pipelines with multidisciplinary team members.",
    tags: ["Team Leadership", "Software Pipelines", "Communication"],
  },
];
