import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import QuoteBook from "@/components/QuoteBook";
import DayNightMascot from "@/components/DayNightMascot";
import Contact from "@/components/Contact";
import SectionTransition from "@/components/SectionTransition";
import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Interactive floating presentation section navigator (desktop) */}
      <SectionNavigator />

      {/* 1. Hero with academic hierarchy, profile photo, and scroll cue */}
      <SectionTransition id="home">
        <Hero />
      </SectionTransition>

      {/* 2. About: authentic academic background and direction */}
      <SectionTransition id="about">
        <About />
      </SectionTransition>

      {/* 3. Activities: WALUBI & MC seamless image marquees */}
      <SectionTransition id="activities">
        <Activities />
      </SectionTransition>

      {/* 4. Projects: Selected case studies */}
      <SectionTransition id="projects">
        <ProjectGrid />
      </SectionTransition>

      {/* 5. Upcoming Projects: Trobos (Next.js prototype) & MindCare */}
      <SectionTransition id="upcoming">
        <UpcomingProjects />
      </SectionTransition>

      {/* 6. Skills: Hard Skills (4 categories) & Soft Skills (12 interpersonal disciplines) */}
      <SectionTransition id="skills">
        <Skills />
      </SectionTransition>

      {/* 7. Certificates: 6 verified credentials with full-screen Lightbox */}
      <SectionTransition id="certificates">
        <Certificates />
      </SectionTransition>

      {/* 8. Interactive Physical Book: My Favorite Quotes (comes BEFORE Contact) */}
      <SectionTransition id="quotes">
        <QuoteBook />
      </SectionTransition>

      {/* 9. Day/Night Mascot: Crayon Sunflower in Light Mode / Crayon Moon in Dark Mode */}
      <SectionTransition>
        <DayNightMascot />
      </SectionTransition>

      {/* 10. Contact: Let's Connect (Final major content section) */}
      <SectionTransition id="contact">
        <Contact />
      </SectionTransition>
    </div>
  );
}
