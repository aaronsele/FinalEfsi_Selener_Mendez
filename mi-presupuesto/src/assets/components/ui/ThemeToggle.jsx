import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme === "light" ? "moon" : "sun"}`}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      <span>
        {theme === "light" ? "Modo oscuro" : "Modo claro"}
      </span>
    </button>
  );
};

export default ThemeToggle;
