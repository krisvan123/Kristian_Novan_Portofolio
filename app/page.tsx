import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import QuoteBook from "@/components/QuoteBook";
import DayNightMascot from "@/components/DayNightMascot";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with B2028 identity, School of Computer Science (SOCS), Intelligent Systems (AI), interactive photo, and scroll cue */}
      <Hero />

      {/* 2. About: authentic academic background and direction */}
      <About />

      {/* 3. Activities: WALUBI & MC seamless image marquees */}
      <Activities />

      {/* 4. Projects: Selected case studies */}
      <ProjectGrid />

      {/* 5. Upcoming Projects: Trobos & MindCare prototypes */}
      <UpcomingProjects />

      {/* 6. Skills: Programming & Tools and Interpersonal Strengths */}
      <Skills />

      {/* 7. Certificates: 6 verified credentials with full-screen Lightbox */}
      <Certificates />

      {/* 8. Contact: Let's Connect */}
      <Contact />

      {/* 9. Interactive Physical Book: My Favorite Quotes */}
      <QuoteBook />

      {/* 10. Day/Night Mascot: Crayon Sunflower in Light Mode / Crayon Moon in Dark Mode */}
      <DayNightMascot />
    </div>
  );
}
