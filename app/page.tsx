import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievement from "@/components/Achievement";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with interactive ProfilePhoto and ScrollIndicator */}
      <Hero />

      {/* 2. About Section with natural human student narrative */}
      <About />

      {/* 3. New Achievement: ICORIS 2026 Paper Author Certificate */}
      <Achievement />

      {/* 4. Activities: WALUBI (8 photos) & MC (6 photos) Pure Image Marquees */}
      <Activities />

      {/* 5. Selected Projects: 8 dynamic case studies */}
      <ProjectGrid />

      {/* 6. Upcoming Projects: Trobos & MindCare prototypes */}
      <UpcomingProjects />

      {/* 7. Skills & Capabilities */}
      <Skills />

      {/* 8. Contact Section: Let's Connect */}
      <Contact />
    </div>
  );
}
