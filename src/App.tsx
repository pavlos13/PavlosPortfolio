import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Ticker } from "./components/Ticker";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Education } from "./sections/Education";
import { Skills } from "./sections/Skills";
import { Certifications } from "./sections/Certifications";
import { Contact } from "./sections/Contact";
import { CookingPage } from "./pages/CookingPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { useGsapReveals } from "./hooks/useGsapReveals";
import {
  profile,
  experiences,
  projects,
  education,
  skillCategories,
  certifications,
  socialLinks,
} from "./data/profile";

function App() {
  useGsapReveals();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Ticker />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero profile={profile} />
                <About about={profile.about} />
                <Experience experiences={experiences} />
                <Projects projects={projects} />
                <Education education={education} />
                <Skills skillCategories={skillCategories} />
                <Certifications certifications={certifications} />
                <Contact profile={profile} socialLinks={socialLinks} />
              </>
            }
          />
          <Route path="/cooking" element={<CookingPage />} />
        </Routes>
      </main>
      <Footer name={profile.name} />
      <ScrollToTop />
    </div>
  );
}

export default App;
