# Kristian Novan — Personal Portfolio Website

A minimal, elegant, modern, and professional portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, designed for seamless deployment on **Vercel**.

Designed specifically for a Computer Science student actively involved in campus leadership, public speaking, teamwork, and AI / software projects.

---

## 🌟 Key Features

- **Editorial & Minimal Aesthetic**: Warm off-white/ivory background (`#FAF9F5`), charcoal text (`#18181A`), and subtle botanical sage accent (`#2D5A46`).
- **Responsive Navigation**: Sticky header with backdrop blur, smooth section scrolling, and mobile hamburger menu.
- **Hero Section**: Personal introduction, quick tags, CTAs ("View My Projects" & direct "Contact Me" email button), and a dedicated portrait container with a subtle floating animation.
- **About Section**: Balanced overview of technical skills, areas of passion, and customizable metrics cards.
- **Infinite Marquee Activities**:
  - **Campus Committee & Event Organization**: Continuous smooth horizontal carousel showcasing 8 event photos (WALUBI Waisak 2025, HIMTI mentoring, company visits).
  - **Master of Ceremony**: Continuous smooth horizontal carousel showcasing 6 stage moderation photos.
  - **Additional Campus Experiences**: Centralized, editable activity cards.
- **Selected Projects & Dynamic Case Study Routing**:
  - Complete project showcase with responsive grid and category filtering.
  - Every project has its own dedicated detail route (`/projects/[slug]`):
    1. **AirSense Dashboard** (`/projects/airsense-dashboard`) — *AOL: Machine Learning*
    2. **NiVScan** (`/projects/nivscan`) — *AOL: Natural Language Processing*
    3. **ProMod AI** (`/projects/promod-ai`) — *AOL: Computational Biology & PTM*
    4. **Financial / Savings App** (`/projects/finance-app`) — *AOL: Software Engineering*
    5. **PlatGizi** (`/projects/platgizi`) — *Assignment: Machine Learning*
    6. **EcoRouter AI** (`/projects/ecorouter-ai`) — *CompFest AI Competition*
    7. **Skinical** (`/projects/skinical`) — *AOL: Computer Vision (Benign vs Malignant)*
    8. **Travel / Journey Planning App** (`/projects/travel-app`) — *AOL: Human and Computer Interaction with continuous 3-screenshot moving gallery*
- **Fail-Safe Image System**: All images use `SafeImage` with elegant fallback placeholders so missing images will never break the layout.
- **Centralized Data Architecture**: All content is managed in `data/` files without touching UI components.
- **SEO & Accessibility**: Complete Open Graph metadata, semantic HTML, keyboard focus states, and `prefers-reduced-motion` support.

---

## 📁 Image Customization Guide

All images are loaded from the `/public/images/` directory. To insert your actual photos, simply replace the placeholder files using the exact same filenames:

### 1. Profile Picture
- Path: `public/images/profile.jpg`
- Recommended aspect ratio: 3:4 portrait (e.g., 800×1067 px).

### 2. Activity Photos (WALUBI & Campus Committees)
- Location: `public/images/activities/`
- Files:
  - `walubi-01.jpg`
  - `walubi-02.jpg`
  - `walubi-03.jpg`
  - `walubi-04.jpg`
  - `walubi-05.jpg`
  - `walubi-06.jpg`
  - `walubi-07.jpg`
  - `walubi-08.jpg`

### 3. Master of Ceremony Photos
- Location: `public/images/activities/`
- Files:
  - `mc-01.jpg`
  - `mc-02.jpg`
  - `mc-03.jpg`
  - `mc-04.jpg`
  - `mc-05.jpg`
  - `mc-06.jpg`

### 4. Project Preview & Gallery Screenshots
- Location: `public/images/projects/`
- Files:
  - `airsense-01.jpg`
  - `nivscan-01.jpg`
  - `promod-01.jpg`, `promod-02.jpg`
  - `finance-01.jpg`
  - `platgizi-01.jpg`
  - `ecorouter-01.jpg`
  - `skinical-01.jpg`
  - `travel-01.jpg`, `travel-02.jpg`, `travel-03.jpg`

---

## 🛠️ Editing Content

All portfolio content is decoupled from layout components and stored in the `/data` directory:

| File | What to Edit |
| --- | --- |
| `data/personal.ts` | Name, roles, bio paragraphs, metrics, email, Instagram handle & URL, LinkedIn profile. |
| `data/projects.ts` | Project titles, categories, descriptions, contributions, datasets, results, and tech tags. |
| `data/activities.ts` | Captions, descriptions, and additional campus/mentorship experiences. |
| `data/skills.ts` | Programming languages, tools, and soft skill descriptions. |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

### 3. Build for Production
```bash
npm run build
```

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `Kristian_Novan_Portofolio` repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Click **Deploy**.

---

© 2026 Kristian Novan. All rights reserved.
