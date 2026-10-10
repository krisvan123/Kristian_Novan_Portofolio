import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import QuoteBook from "@/components/QuoteBook";
import Contact from "@/components/Contact";
import SectionTransition from "@/components/SectionTransition";
import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Section navigator (desktop only) */}
      <SectionNavigator />

      {/* 1. Hero */}
      <SectionTransition id="home">
        <Hero />
      </SectionTransition>

      {/* 2. Activities: WALUBI & MC seamless marquees */}
      <SectionTransition id="activities">
        <Activities />
      </SectionTransition>

      {/* 3. Projects: Case studies with dynamic filters */}
      <SectionTransition id="projects">
        <ProjectGrid />
      </SectionTransition>

      {/* 4. Upcoming Projects */}
      <SectionTransition id="upcoming">
        <UpcomingProjects />
      </SectionTransition>

      {/* 5. Skills */}
      <SectionTransition id="skills">
        <Skills />
      </SectionTransition>

      {/* 6. Certificates: 8 verified credentials */}
      <SectionTransition id="certificates">
        <Certificates />
      </SectionTransition>

      {/* 7. About Me */}
      <SectionTransition id="about">
        <About />
      </SectionTransition>

      {/* 8. Quote Book: Finger-draggable book */}
      <SectionTransition id="quotes">
        <QuoteBook />
      </SectionTransition>

      {/* 9. Contact */}
      <SectionTransition id="contact">
        <Contact />
      </SectionTransition>
    </div>
  );
}
