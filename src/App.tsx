import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
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
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDark={isDark} onThemeToggle={() => setIsDark((d) => !d)} />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero profile={profile} socialLinks={socialLinks} />
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
      <Footer socialLinks={socialLinks} name={profile.name} />
    </div>
  );
}

export default App;
