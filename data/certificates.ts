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
    description: "Successfully completed ICORIS 2026 as a research paper author.",
    image: "/images/certificates/Icoris-2026-author.jpg",
    highlight: true,
  },
  {
    id: "azure-ai-fundamentals",
    title: "Azure AI Fundamentals",
    category: "AI / Cloud Certification",
    issuer: "Microsoft",
    description: "Microsoft credential verifying foundational artificial intelligence and cloud concepts in Azure.",
    image: "/images/certificates/azure.jpg",
    highlight: true,
  },
  {
    id: "walubi-2025",
    title: "WALUBI 2025 — Volunteer",
    category: "Community & Humanitarian Service",
    issuer: "DPD WALUBI Provinsi Jawa Tengah",
    description: "Volunteer experience with WALUBI during Waisak 2025 at Mendut and Borobudur.",
    image: "/images/certificates/walubi-2026.jpg",
  },
  {
    id: "himti-mentor",
    title: "HIMTI Mentor — Staff of Mentor Division",
    category: "Academic Mentorship",
    issuer: "HIMTI BINUS University",
    description: "Mentor for a HIMTI event, supporting and guiding students preparing to become HIMTI activists.",
    image: "/images/certificates/mentor-sesvent.jpg",
  },
  {
    id: "uiux-io-festival",
    title: "UI/UX Competition — I/O FESTIVAL 2026",
    category: "Design Competition",
    issuer: "BEM FTI UNTAR",
    description: "Certificate for participating in a UI/UX competition at I/O FESTIVAL 2026.",
    image: "/images/certificates/uiux.jpg",
  },
  {
    id: "azure-training",
    title: "Azure AI Fundamentals Training",
    category: "Technical AI Training",
    issuer: "Microsoft & GreatNusa",
    description: "Completed 15 hours of learning in the Microsoft Elevate AI Training Session: Pelatihan Azure AI Fundamentals (AI-900T00-A).",
    image: "/images/certificates/azure.jpg",
  },
];
