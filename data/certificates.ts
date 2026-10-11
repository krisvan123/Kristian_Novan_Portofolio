export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  description: string;
  image: string;
  highlight?: boolean;
}

export const certificatesData: CertificateItem[] = [
  {
    id: "icoris-2026",
    title: "ICORIS 2026 — Research Paper Author",
    category: "IEEE International Conference",
    issuer: "IEEE Indonesia Section & UTB",
    description: "Author of peer-reviewed paper: \"Decoding Neural Representations: CAV-Based Activation Engineering for Explainable Brain Tumor Segmentation across Multiple Architectures\" at The 8th International Conference on Cybernetics and Intelligent Systems (ICORIS).",
    image: "/images/certificates/icoris-2026-author.jpg",
    highlight: true,
  },
  {
    id: "compfest-aic-2026",
    title: "CompFest AIC 2026 — Top 41",
    category: "AI Competition",
    issuer: "CompFest (Universitas Indonesia)",
    description: "Participated in the CompFest AI Competition (AIC) and achieved Top 41 National Finalist standing.",
    image: "/images/certificates/comfest.jpg",
    highlight: true,
  },
  {
    id: "azure-ai-fundamentals",
    title: "Azure AI Fundamentals",
    category: "Cloud & AI Certification",
    issuer: "Microsoft & GreatNusa",
    description: "Microsoft credential verifying core machine learning, computer vision, natural language processing, and generative AI concepts in Azure.",
    image: "/images/certificates/azure.jpg",
    highlight: true,
  },
  {
    id: "mc-techno",
    title: "MC Techno 2025 — Games Master of Ceremony",
    category: "Public Speaking & Leadership",
    issuer: "HIMTI BINUS University (PTK Division)",
    description: "Games Master of Ceremony at TECHNO 2025 welcoming new students into the HIMTI student association, facilitating event progression and audience engagement (Sep 2025).",
    image: "/images/certificates/mc-techno.jpg",
  },
  {
    id: "ptk-techno",
    title: "PTK Techno 2025 — Member of PTK Division",
    category: "Organizational Committee",
    issuer: "HIMTI BINUS University",
    description: "Active member of PTK (Pengembangan Tenaga Kerja) Division for TECHNO 2025, coordinating onboarding, operations, and organizational management (Sep 2025).",
    image: "/images/certificates/ptk-techno.jpg",
  },
  {
    id: "walubi-2025",
    title: "WALUBI 2025 — Medical & Logistics Volunteer",
    category: "Community & Humanitarian Service",
    issuer: "DPD WALUBI Provinsi Jawa Tengah",
    description: "Dedicated volunteer supporting medical and humanitarian logistics during the national social health service at Candi Borobudur and Mendut, Waisak (May 2025).",
    image: "/images/certificates/walubi-2026.jpg",
  },
  {
    id: "himti-mentor",
    title: "HIMTI SESVENT — Staff of Mentor Division",
    category: "Academic Mentorship",
    issuer: "HIMTI BINUS University",
    description: "Staff of Mentor Division during HIMTI SESVENT 2025, mentoring new HIMTI activists and introducing organizational culture and work habits (Oct 2025).",
    image: "/images/certificates/mentor-sesvent.jpg",
  },
  {
    id: "uiux-io-festival",
    title: "UI/UX Competition — I/O FESTIVAL 2026",
    category: "Design Competition",
    issuer: "BEM FTI Universitas Tarumanagara",
    description: "National UI/UX design competition participant, designing user-centered prototypes and interactive experience flows.",
    image: "/images/certificates/uiux.jpg",
  },
];
