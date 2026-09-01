import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Navbar({ isDark, onThemeToggle }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navHref = (id: string) => (id === "hero" ? "/" : `/#${id}`);

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-wide section-padding py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          PK
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              {isHome ? (
                <button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={navHref(link.id)}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <ul className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {isHome ? (
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.id)}
                      className="w-full text-left py-2 px-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={navHref(link.id)}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 px-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
