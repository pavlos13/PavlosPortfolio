import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  "aria-label"?: string;
}

export function ThemeToggle({ isDark, onToggle, "aria-label": ariaLabel }: ThemeToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel ?? (isDark ? "Switch to light mode" : "Switch to dark mode")}
      className="p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" aria-hidden />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" aria-hidden />
      )}
    </motion.button>
  );
}
