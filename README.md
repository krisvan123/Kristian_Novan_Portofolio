# Kristian Novan — Personal Portfolio Website

A minimal, elegant, modern, and interactive portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, designed for high-performance deployment on **Vercel**.

Designed specifically for **Kristian Novan**, an undergraduate student at **BINUS University's School of Computer Science (SOCS)**, Class of **B2028**, specializing in **Intelligent Systems (AI)**.

---

## 🌟 Key Features & Updates

- **Academic Overview**:
  - **School**: School of Computer Science (SOCS)
  - **University**: BINUS University
  - **Cohort**: B2028
  - **Specialization**: Intelligent Systems (AI)
  - Featured prominently in the desktop header quick-view pill, mobile drawer, hero badges, and about section.

- **Theme Engine (Light & Dark Mode)**:
  - Persistent Light / Dark mode toggle in the navigation header with `localStorage` and system preference detection.
  - Subtle twinkling starfield backdrop in dark mode.
  - **Day / Night Hand-drawn Mascot**: Interactive **Crayon Sunflower** in light mode and **Crayon Moon** in dark mode (both with playful bounce animations and speech bubbles).

- **Verified Certifications & Credentials with Lightbox Modal**:
  - Full-featured credential gallery with interactive full-screen Lightbox modal (keyboard ESC/arrow navigation, backdrop dismissal):
    1. **ICORIS 2026 — Paper Author** (IEEE International Conference)
    2. **Azure AI Fundamentals** (Microsoft)
    3. **WALUBI 2025 — Volunteer** (DPD WALUBI Jawa Tengah)
    4. **HIMTI Mentor — Staff of Mentor Division** (HIMTI BINUS)
    5. **UI/UX Competition — I/O FESTIVAL 2026** (BEM FTI UNTAR)
    6. **Azure AI Fundamentals Training** (Microsoft & GreatNusa)

- **High-Speed Seamless Infinite Marquee**:
  - Hardware-accelerated infinite ribbon marquee across Activities, Project Visual Showcases, and Upcoming Prototypes.
  - Tuned movement speed (~50–85 px/s desktop, ~30–55 px/s mobile) for a fluid, lively feel.
  - Pure visual showcase without captions underneath moving images.
  - Smooth hover-to-pause that resumes directly from the current position.

- **Case Studies & Project Showcase**:
  - 8 completed projects, including **FinPro** (`/projects/finpro`), AirSense Dashboard, EcoRouter, NivScan, PlatGizi, ProMod AI, Skinical, and Travel Planner.
  - Upcoming prototypes: **Trobos** and **MindCare**.
  - All project images strictly ordered numerically by suffix (`01`, `02`, `03`...), with suffix `01` serving as the primary card preview.

---

## 📁 Image Directories

All images are preserved as provided:
- `/public/images/certificates/`
- `/public/images/projects/`
- `/public/images/projects/upcoming/`
- `/public/images/activities/`
- `/public/images/profile/`

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
