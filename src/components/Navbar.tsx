import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "hero", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function useNicosiaClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Nicosia",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const offsetFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Nicosia",
      timeZoneName: "shortOffset",
    });

    function render() {
      const now = new Date();
      const part = offsetFmt.formatToParts(now).find((p) => p.type === "timeZoneName");
      const match = part && /GMT([+-]\d+)/.exec(part.value);
      const offsetHours = match ? Number(match[1]) : 2;
      const zone = offsetHours === 3 ? "EEST" : "EET";
      setLabel(`${zone} ${timeFmt.format(now)}`);
    }

    render();
    const id = setInterval(render, 30_000);
    return () => clearInterval(id);
  }, []);

  return label;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const clock = useNicosiaClock();

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
      className="sticky top-0 z-50 w-full flex items-center gap-4 lg:gap-7 px-4 sm:px-6 lg:px-14 h-[76px] border-b border-hair bg-bg/90 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className="w-10 h-10 shrink-0 border-[1.5px] border-accent rounded-[10px] grid place-items-center font-semibold text-[16px] tracking-[0.03em] text-ink"
      >
        PK
      </Link>

      <div className="flex-1" />

      <ul className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-[0.06em] uppercase text-mist2">
        {navLinks.map((link) => (
          <li key={link.id}>
            {isHome ? (
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`hover:text-accent transition-colors ${link.id === "hero" ? "text-ink" : ""}`}
              >
                {link.label}
              </button>
            ) : (
              <Link to={navHref(link.id)} onClick={() => setMobileOpen(false)} className="hover:text-accent transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="hidden lg:block w-px h-[22px] bg-hair" />
      <span className="hidden lg:inline font-mono text-xs text-mist2 tabular-nums">{clock}</span>

      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        className="p-2 rounded-lg text-ink hover:bg-hair lg:hidden"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 border-t border-hair bg-bg overflow-hidden"
          >
            <ul className="px-4 py-4 flex flex-col gap-1 font-mono text-xs tracking-[0.06em] uppercase text-mist2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {isHome ? (
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.id)}
                      className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-hair hover:text-accent"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={navHref(link.id)}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-3 rounded-lg hover:bg-hair hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2 px-3 text-mist3">{clock}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
