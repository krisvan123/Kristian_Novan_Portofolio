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
    title: "ICORIS 2026 — Paper Author",
    category: "IEEE International Conference",
    issuer: "IEEE Indonesia Section & UTB",
    description: "Successfully completed ICORIS 2026 as a research paper author, presenting peer-reviewed academic findings.",
    image: "/images/certificates/icoris-2026-author.jpg",
    highlight: true,
  },
  {
    id: "compfest-aic-2026",
    title: "CompFest AIC 2026 — Top 41",
    category: "AI Competition",
    issuer: "CompFest (Universitas Indonesia)",
    description: "Participated in the CompFest AI Competition (AIC) and achieved Top 41.",
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
    id: "walubi-2025",
    title: "WALUBI 2025 — Volunteer",
    category: "Community & Humanitarian Service",
    issuer: "DPD WALUBI Provinsi Jawa Tengah",
    description: "Dedicated volunteer service supporting medical and event logistics during Waisak 2025 at Candi Mendut and Borobudur.",
    image: "/images/certificates/walubi-2026.jpg",
  },
  {
    id: "himti-mentor",
    title: "HIMTI Mentor — Staff of Mentor Division",
    category: "Academic Mentorship",
    issuer: "HIMTI BINUS University",
    description: "Mentor for HIMTI events, guiding and supporting junior students preparing to become active members in student organization committees.",
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
