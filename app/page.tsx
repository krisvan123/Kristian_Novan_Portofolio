import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import PianoCorner from "@/components/PianoCorner";
import QuoteBook from "@/components/QuoteBook";
import Contact from "@/components/Contact";
import DayNightMascot from "@/components/DayNightMascot";
import SectionTransition from "@/components/SectionTransition";
import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Interactive floating presentation section navigator (desktop) */}
      <SectionNavigator />

      {/* 1. Hero with academic hierarchy, profile photo, and downloadable CV */}
      <SectionTransition id="home">
        <Hero />
      </SectionTransition>

      {/* 2. Activities: WALUBI & MC seamless image marquees */}
      <SectionTransition id="activities">
        <Activities />
      </SectionTransition>

      {/* 3. Projects: Selected case studies with dynamic filters */}
      <SectionTransition id="projects">
        <ProjectGrid />
      </SectionTransition>

      {/* 4. Upcoming Projects: Trobos (Next.js prototype) & MindCare */}
      <SectionTransition id="upcoming">
        <UpcomingProjects />
      </SectionTransition>

      {/* 5. Skills: Hard Skills (4 categories) & Soft Skills (12 interpersonal disciplines) */}
      <SectionTransition id="skills">
        <Skills />
      </SectionTransition>

      {/* 6. Certificates: 8 verified credentials with full-screen Lightbox */}
      <SectionTransition id="certificates">
        <Certificates />
      </SectionTransition>

      {/* 7. About Me / Personal Side: Technical curiosity & creative arts with 4 photos */}
      <SectionTransition id="about">
        <About />
      </SectionTransition>

      {/* 8. A Little Piano Corner: Interactive 3D keyboard & Clair de Lune guided melody */}
      <SectionTransition id="piano">
        <PianoCorner />
      </SectionTransition>

      {/* 9. Interactive Physical Book: My Favorite Quotes (Real finger drag physics) */}
      <SectionTransition id="quotes">
        <QuoteBook />
      </SectionTransition>

      {/* 10. Contact: Let's Connect (Final major content section) */}
      <SectionTransition id="contact">
        <Contact />
      </SectionTransition>

      {/* 11. Day/Night Mascot: Crayon Sunflower in Light Mode / Crayon Moon in Dark Mode directly above Footer */}
      <SectionTransition>
        <DayNightMascot />
      </SectionTransition>
    </div>
  );
}
