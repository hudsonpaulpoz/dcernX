import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/** Compact icon-only theme toggle for marketing/legal page navs. */
export function MarketingThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
      className={`h-8 w-8 inline-flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors ${className}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
