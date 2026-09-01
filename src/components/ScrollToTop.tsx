import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40 w-11 h-11 border border-accent rounded-[10px] grid place-items-center bg-bg text-accent hover:bg-accent hover:text-accent-ink transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" aria-hidden />
    </button>
  );
}
