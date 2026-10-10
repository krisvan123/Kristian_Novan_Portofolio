import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ProjectGrid from "@/components/ProjectGrid";
import UpcomingProjects from "@/components/UpcomingProjects";
import PlayTeaser from "@/components/PlayTeaser";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import QuoteBook from "@/components/QuoteBook";
import Contact from "@/components/Contact";
import SectionTransition from "@/components/SectionTransition";
import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Floating Section Navigator (Desktop) */}
      <SectionNavigator />

      {/* 1. Hero: Core Identity & Duality */}
      <SectionTransition id="home">
        <Hero />
      </SectionTransition>

      {/* 2. About Me: Story, Academic Mobility (Semarang -> Jakarta), & Dual Passions */}
      <SectionTransition id="about">
        <About />
      </SectionTransition>

      {/* 3. Activities: Leadership, Stage MC & WALUBI Humanitarian Service */}
      <SectionTransition id="activities">
        <Activities />
      </SectionTransition>

      {/* 4. Projects: Featured Spotlight & Technical Case Studies */}
      <SectionTransition id="projects">
        <ProjectGrid />
      </SectionTransition>

      {/* 5. Interactive Engineering Lab & 3D Experiments */}
      <SectionTransition id="play-lab">
        <PlayTeaser />
      </SectionTransition>

      {/* 6. Skills: Technical Stack & Capabilities */}
      <SectionTransition id="skills">
        <Skills />
      </SectionTransition>

      {/* 7. Certificates: Verified Research & Cloud AI Credentials */}
      <SectionTransition id="certificates">
        <Certificates />
      </SectionTransition>

      {/* 8. Upcoming Concepts & Prototypes */}
      <SectionTransition id="upcoming">
        <UpcomingProjects />
      </SectionTransition>

      {/* 9. Quote Book: Interactive Draggable Codex */}
      <SectionTransition id="quotes">
        <QuoteBook />
      </SectionTransition>

      {/* 10. Contact: Collaboration & Inquiry */}
      <SectionTransition id="contact">
        <Contact />
      </SectionTransition>
    </div>
  );
}
