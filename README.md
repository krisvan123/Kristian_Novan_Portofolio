# Kristian Novan — Personal Portfolio Website

A minimal, elegant, modern, and interactive portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, designed for high-performance deployment on **Vercel**.

Designed specifically for **Kristian Novan**, a Computer Science student at **BINUS University (Class of B2028)** actively involved in applied AI & software development, campus leadership, event organization, and stage moderation.

---

## 🌟 Key Features & Upgrades

- **Alive & Interactive Experience**:
  - **Profile Parallax Tilt**: The hero portrait responds dynamically with a subtle 3D tilt and depth parallax when hovered, resetting smoothly on mouse exit.
  - **Animated Scroll Indicator**: Directly below the hero section, an animated mouse scroll indicator guides visitors to explore, fading away naturally upon scrolling.
  - **Non-Intrusive Custom Cursor**: Smooth follower circle on desktop that magnetically reacts to interactive links and buttons without hiding the native browser cursor (disabled automatically on touch/mobile devices).
  - **Interactive Crayon Sunflower**: A hand-drawn, crayon-style sunflower easter egg at the footer that sways gently, bounces happily when clicked, changes its expression to a joyful smile, and pops up a friendly message.
  - **Interactive Skills**: Skill cards elevate with micro-interactions and icon scaling on hover.
  - **Active Scroll-Spy Navigation**: Header highlights the active section in real-time as the user scrolls.

- **Human, Natural & Student-Centered Writing**:
  - Completely devoid of generic AI buzzwords.
  - Articulates real student experiences across software engineering, applied AI, campus committee operations, and public speaking with clarity and confidence.

- **Comprehensive Showcase & Visual Hierarchy**:
  1. **Hero**: Kristian Novan introduction, BINUS B2028 identity, core focus areas, interactive profile frame, and animated mouse scroll indicator.
  2. **About**: Background narrative, core competencies grid, and key overview metrics.
  3. **Achievement (ICORIS 2026)**: Prominent author certificate presentation for completing ICORIS 2026 as a paper author.
  4. **Activities**:
     - **Campus Committee & Event Organization**: Continuous infinite horizontal marquee with 8 curated photos (WALUBI Waisak 2025, HIMTI mentoring, company visits). **Pure image showcase with no captions underneath**.
     - **Master of Ceremony**: Continuous infinite horizontal marquee with 6 stage moderation photos. **Pure image showcase with no captions underneath**.
     - **Additional Experiences**: Structured records for peer mentoring, liaison duties, and collaborative projects.
  5. **Selected Projects**:
     - 8 complete project case studies with dynamic routes (`/projects/[slug]`).
     - Refactored detail pages focused cleanly on a rich, comprehensive **Project Overview** narrative followed by a continuous moving visual gallery (**no text underneath images**).
  6. **Upcoming Projects**:
     - Clearly designated in-development prototypes:
       - **Trobos**: Urban mobility concept solving route congestion via motorcycle pickup & separate vehicle delivery.
       - **MindCare**: Conversational AI guidance concept for initial emotional support.
  7. **Skills & Capabilities**:
     - *Programming & Tools*: C, Python, JavaScript, Java, SQL, HTML, Figma.
     - *Soft Skills*: Public Speaking, Teamwork, Leadership, Independent Problem Solving, Communication, Collaboration.
  8. **Contact & Footer**:
     - "Let's Talk" and "Contact Me" direct email triggers (`kristiannovan17@gmail.com`), clipboard copy utility, social links, and the interactive crayon sunflower.

---

## 📁 Image Directory Structure

All portfolio images are centralized in `/public/images/`:

```
public/
└── images/
    ├── profile/
    │   └── profile.jpg                 # Hero portrait (3:4 aspect ratio)
    ├── certificates/
    │   └── icoris-2026-author.jpg      # ICORIS 2026 Author Certificate
    ├── activities/
    │   ├── walubi-01.jpg ... walubi-08.jpg   # 8 Campus Committee photos
    │   └── mc-01.jpg ... mc-06.jpg           # 6 Master of Ceremony photos
    ├── projects/
    │   ├── airsense-01.jpg
    │   ├── nivscan-01.jpg
    │   ├── promod-01.jpg, promod-02.jpg
    │   ├── finance-01.jpg
    │   ├── platgizi-01.jpg
    │   ├── ecorouter-01.jpg
    │   ├── skinical-01.jpg
    │   └── travel-01.jpg, travel-02.jpg, travel-03.jpg
    └── projects/upcoming/
        ├── trobos-01.jpg, trobos-02.jpg      # Trobos concept screenshots
        └── mindcare-01.jpg, mindcare-02.jpg  # MindCare concept screenshots
```

> **Safe Image System**: All image components implement `SafeImage.tsx` which provides clean, editorial fallback placeholders if any file is missing, ensuring the website never breaks.

---

## 🛠️ Centralized Content Configuration

Content can be updated without modifying component logic:
- `data/personal.ts`: Identity, B2028 cohort, bio, focus areas, ICORIS 2026 certificate data, and social URLs.
- `data/projects.ts`: Project overviews, tech tags, and upcoming project details.
- `data/activities.ts`: Committee descriptions and photo paths.
- `data/skills.ts`: Programming tools, contextual descriptions, and soft skills.

---

## 🚀 Local Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Test production build
npm run build
```

---

© 2026 Kristian Novan. All rights reserved.
