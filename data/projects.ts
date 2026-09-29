export interface ProjectSection {
  title: string;
  content: string | string[];
  isPlaceholder?: boolean;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  images: string[];
  previewImage: string;
  hasContinuousGallery?: boolean; // For travel project or special gallery showcase
  galleryCaption?: string;
  sections: ProjectSection[];
  links?: {
    demo?: string;
    repo?: string;
  };
}

export const projectsData: ProjectDetail[] = [
  {
    slug: "airsense-dashboard",
    title: "AirSense Dashboard",
    category: "AOL — Machine Learning",
    shortDescription:
      "AirSense Dashboard is a machine learning application for estimating PM2.5 concentration based on historical WHO data. Users can enter regional parameters to obtain predictions without relying on a PM2.5 sensor in the field.",
    technologies: ["Python", "Machine Learning", "Data Analysis", "WHO Dataset"],
    previewImage: "/images/projects/airsense-01.jpg",
    images: ["/images/projects/airsense-01.jpg"],
    sections: [
      {
        title: "Project Overview",
        content:
          "AirSense Dashboard is an intelligent environmental monitoring tool built to estimate air quality metrics—specifically PM2.5 particulate matter—using historical meteorological and spatial indicators from the World Health Organization (WHO) dataset. It provides accessible air quality estimates for communities without physical monitoring stations.",
      },
      {
        title: "Problem & Context",
        content:
          "High particulate matter (PM2.5) poses severe long-term cardiovascular and respiratory health risks. However, installing and maintaining specialized PM2.5 sensor arrays across every district is capital-intensive and logistically challenging. There was a critical need for an algorithmic estimation system that leverages available regional and climate parameters.",
      },
      {
        title: "Solution",
        content:
          "The dashboard applies supervised machine learning regression models trained on extensive WHO historical environmental indicators. Users can input available regional climatic variables (such as temperature, humidity, geographic factors, and historical baselines) to receive instantaneous, accurate PM2.5 estimates directly in an intuitive dashboard.",
      },
      {
        title: "Key Features",
        content: [
          "Sensor-independent PM2.5 concentration estimation based on macro variables",
          "Interactive regional input form for environmental parameters",
          "Real-time prediction feedback with visual air quality hazard categorization",
          "Comparative historical trend visualization",
        ],
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Dataset & Modeling",
        content:
          "Utilizes historical WHO environmental records. Preprocessing involved handling regional missingness, feature normalization, and evaluating regression model performance across various test splits.",
      },
      {
        title: "Outcome & Learning",
        content: "[Add project result here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "nivscan",
    title: "NiVScan",
    category: "AOL — Natural Language Processing",
    shortDescription:
      "NiVScan is an NLP-based application designed to analyze information related to the Nipah virus using natural language processing techniques.",
    technologies: ["Python", "Natural Language Processing", "Data Analysis", "Text Mining"],
    previewImage: "/images/projects/nivscan-01.jpg",
    images: ["/images/projects/nivscan-01.jpg"],
    sections: [
      {
        title: "Project Overview",
        content:
          "NiVScan is a dedicated natural language processing utility designed to extract, synthesize, and categorize biomedical literature and public health reports concerning the Nipah virus (NiV). It streamlines literature discovery for researchers and healthcare communicators.",
      },
      {
        title: "NLP Method",
        content: "[Add NLP method here]",
        isPlaceholder: true,
      },
      {
        title: "Dataset",
        content: "[Add dataset details here]",
        isPlaceholder: true,
      },
      {
        title: "Model Architecture",
        content: "[Add model architecture here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Results & Evaluation",
        content: "[Add project results here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "promod-ai",
    title: "ProMod AI",
    subtitle: "Post-Translational Modification (PTM)",
    category: "AOL — Computational Biology",
    shortDescription:
      "PTM is a chemical modification that occurs to a protein after translation by the ribosome. One of the most common types of PTM is phosphorylation, which involves the addition of a phosphate group to specific amino acid residues such as Serine, Threonine, or Tyrosine. Phosphorylation functions as a biological switch that regulates cellular signaling and is involved in various diseases, including cancer and Alzheimer's disease.",
    technologies: ["Python", "Computational Biology", "Machine Learning", "Bioinformatics", "Protein Modeling"],
    previewImage: "/images/projects/promod-01.jpg",
    images: ["/images/projects/promod-01.jpg", "/images/projects/promod-02.jpg"],
    sections: [
      {
        title: "Scientific Context & Biological Background",
        content:
          "Post-Translational Modification (PTM) represents one of the most critical mechanisms expanding the functional diversity of the proteome. After protein biosynthesis via ribosomes, chemical groups are enzymatically conjugated onto amino acid chains. Among these, phosphorylation (attaching phosphate groups to Serine, Threonine, or Tyrosine residues) serves as a fundamental regulatory switch in cellular communication, enzymatic activation, and disease pathogenesis like oncogenesis and neurodegeneration.",
      },
      {
        title: "Problem Statement",
        content:
          "High-throughput wet-lab identification of phosphorylation sites via mass spectrometry is expensive, labor-intensive, and often misses transient modifications. Developing computational intelligence models to accurately predict potential phosphorylation sites from primary amino acid sequences is crucial for accelerating therapeutic drug target discovery.",
      },
      {
        title: "PTM Prediction Approach",
        content: "[Add PTM prediction approach here]",
        isPlaceholder: true,
      },
      {
        title: "Algorithm / Model Details",
        content: "[Add algorithm / model details here]",
        isPlaceholder: true,
      },
      {
        title: "Dataset",
        content: "[Add dataset details here]",
        isPlaceholder: true,
      },
      {
        title: "Input Specification",
        content: "[Add input specification here]",
        isPlaceholder: true,
      },
      {
        title: "Output Specification",
        content: "[Add output specification here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Results & Biological Findings",
        content: "[Add project results here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "finance-app",
    title: "Financial / Savings Application",
    category: "AOL — Software Engineering",
    shortDescription:
      "A financial-related application focused on savings and financial management, designed to help users track personal budgets, set savings goals, and manage transactions effectively.",
    technologies: ["Software Engineering", "Financial Systems", "Database Design", "Full-Stack Development"],
    previewImage: "/images/projects/finance-01.jpg",
    images: ["/images/projects/finance-01.jpg"],
    sections: [
      {
        title: "Project Overview",
        content: "[Add project overview details here]",
        isPlaceholder: true,
      },
      {
        title: "Main Features",
        content: "[Add main features here]",
        isPlaceholder: true,
      },
      {
        title: "User Problem",
        content: "[Add user problem here]",
        isPlaceholder: true,
      },
      {
        title: "Solution",
        content: "[Add solution here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Technologies",
        content: "[Add technologies here]",
        isPlaceholder: true,
      },
      {
        title: "Results",
        content: "[Add project results here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "platgizi",
    title: "PlatGizi",
    subtitle: "Smart Menu Planning System for a Healthy Lifestyle & Balanced Nutrition",
    category: "Assignment — Machine Learning",
    shortDescription:
      "PlatGizi is a smart menu planning system designed to support a healthy lifestyle and balanced nutrition using a machine learning-based approach.",
    technologies: ["Python", "Machine Learning", "Recommendation Systems", "Nutrition Analytics"],
    previewImage: "/images/projects/platgizi-01.jpg",
    images: ["/images/projects/platgizi-01.jpg"],
    sections: [
      {
        title: "Project Overview",
        content:
          "PlatGizi addresses daily nutritional imbalance by providing an automated, personalized meal planning platform. The system generates balanced daily meal combinations tailored to individual demographic and caloric needs.",
      },
      {
        title: "Dataset",
        content: "[Add dataset details here]",
        isPlaceholder: true,
      },
      {
        title: "Machine Learning Method",
        content: "[Add machine learning method here]",
        isPlaceholder: true,
      },
      {
        title: "Input Parameters",
        content: "[Add input parameters here]",
        isPlaceholder: true,
      },
      {
        title: "Prediction / Recommendation Logic",
        content: "[Add recommendation logic here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Results",
        content: "[Add project results here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "ecorouter-ai",
    title: "EcoRouter AI",
    subtitle: "Every stop lightens the load — EcoRouter sequences deliveries around it to burn the least fuel getting there.",
    category: "CompFest AI Competition",
    shortDescription:
      "Every stop lightens the load — EcoRouter sequences deliveries around it to burn the least fuel getting there.",
    technologies: ["Python", "Optimization Algorithms", "Artificial Intelligence", "Green Logistics", "Heuristic Search"],
    previewImage: "/images/projects/ecorouter-01.jpg",
    images: ["/images/projects/ecorouter-01.jpg"],
    sections: [
      {
        title: "Competition Context",
        content:
          "Built for the CompFest AI Competition. The challenge focused on algorithmic innovation for sustainable supply-chain transport, tackling complex vehicle routing variants with dynamic load constraints.",
      },
      {
        title: "Core Philosophy",
        content:
          "“Every stop lightens the load — EcoRouter sequences deliveries around it to burn the least fuel getting there.” Instead of assuming constant vehicle mass across transit segments, EcoRouter models gravitational load depletion, gradient elevations, and traffic density.",
      },
      {
        title: "Problem Statement",
        content: "[Add problem statement here]",
        isPlaceholder: true,
      },
      {
        title: "Approach",
        content: "[Add approach details here]",
        isPlaceholder: true,
      },
      {
        title: "Algorithm",
        content: "[Add algorithm description here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Competition Outcome",
        content: "[Add outcome here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "skinical",
    title: "Skinical",
    category: "AOL — Computer Vision",
    shortDescription:
      "Skinical is a web-based skin lesion classification system developed using two approaches: Classical Machine Learning and Hybrid Deep Learning + Classical Machine Learning. The system aims to support early detection by classifying whether a skin lesion is Benign or Malignant.",
    technologies: ["Computer Vision", "Classical Machine Learning", "Deep Learning", "Feature Extraction", "Web Deployment"],
    previewImage: "/images/projects/skinical-01.jpg",
    images: ["/images/projects/skinical-01.jpg"],
    sections: [
      {
        title: "Project Overview",
        content:
          "Skinical is a diagnostic decision-support system built to classify dermoscopic images of skin lesions into Benign or Malignant categories. The study rigorously compared classical computer vision pipelines against hybrid neural-feature models to optimize early detection sensitivity.",
      },
      {
        title: "Problem",
        content:
          "Melanoma and malignant skin conditions require rapid, non-invasive early detection. Dermatological access is uneven, creating a need for automated screening tools that can deliver dependable classification while remaining computationally efficient.",
      },
      {
        title: "Classical ML Approach",
        content: "[Add classical ML approach details here]",
        isPlaceholder: true,
      },
      {
        title: "Hybrid Deep Learning Approach",
        content: "[Add hybrid deep learning approach details here]",
        isPlaceholder: true,
      },
      {
        title: "Dataset",
        content: "[Add dataset details here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Results",
        content: "[Add results here]",
        isPlaceholder: true,
      },
      {
        title: "What I Learned",
        content: "[Add learning outcomes here]",
        isPlaceholder: true,
      },
    ],
  },
  {
    slug: "travel-app",
    title: "Travel / Journey Planning Application",
    category: "AOL — Human and Computer Interaction",
    shortDescription:
      "A travel and journey-related digital experience designed using Figma and HCI principles, prioritizing clear visual hierarchy, intuitive journey flows, and minimal cognitive load.",
    technologies: ["Figma", "HCI Principles", "Interaction Design", "User Journey Mapping", "Prototyping"],
    previewImage: "/images/projects/travel-01.jpg",
    images: [
      "/images/projects/travel-01.jpg",
      "/images/projects/travel-02.jpg",
      "/images/projects/travel-03.jpg",
    ],
    hasContinuousGallery: true,
    galleryCaption: "Interactive application screenshots showcasing the travel itinerary planning flow and UI systems.",
    sections: [
      {
        title: "HCI Purpose & Design Concept",
        content:
          "Travel planning often overwhelms users with fragmented booking tabs, cluttered schedules, and unclear geographic routing. This project applied Human-Computer Interaction (HCI) methodologies to craft a cohesive, stress-free journey planning experience centered around mental model alignment, progressive disclosure, and contextual feedback.",
      },
      {
        title: "User Problem",
        content: "[Add user problem here]",
        isPlaceholder: true,
      },
      {
        title: "User Flow",
        content: "[Add user flow details here]",
        isPlaceholder: true,
      },
      {
        title: "HCI Principles Applied",
        content: "[Add HCI principles applied here]",
        isPlaceholder: true,
      },
      {
        title: "Design Process",
        content: "[Add design process steps here]",
        isPlaceholder: true,
      },
      {
        title: "My Contribution",
        content: "[Add your contribution here]",
        isPlaceholder: true,
      },
      {
        title: "Final Result & Prototype Validation",
        content: "[Add final results here]",
        isPlaceholder: true,
      },
    ],
  },
];
