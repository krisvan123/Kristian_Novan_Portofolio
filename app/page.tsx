import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Achievement from "@/components/Achievement";
import Contact from "@/components/Contact";
import CrayonSunflower from "@/components/CrayonSunflower";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with B2028 identity, ML+UI/UX focus, interactive photo, and scroll cue */}
      <Hero />

      {/* 2. About: natural human student profile */}
      <About />

      {/* 3. Activities: WALUBI (8 photos) & MC (6 photos) seamless image marquees */}
      <Activities />

      {/* 4. Projects: Selected case studies */}
      <ProjectGrid />

      {/* 5. Upcoming Projects: Trobos & MindCare prototypes */}
      <UpcomingProjects />

      {/* 6. Skills: Programming & Tools and Soft Skills */}
      <Skills />

      {/* 7. ICORIS 2026 Paper Author Certificate */}
      <Achievement />

      {/* 8. Contact: Let's Connect */}
      <Contact />

      {/* 9. Handmade Crayon Sunflower Easter Egg (sits between Contact and Footer) */}
      <div className="w-full flex justify-center py-4 sm:py-6 bg-canvas">
        <CrayonSunflower />
      </div>
    </div>
  );
}
