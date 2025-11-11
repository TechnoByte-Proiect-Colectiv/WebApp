import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { Button } from "@mui/material";

export const Layout: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Navigation / Header */}

      <nav className="sticky top-0 z-50 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 shadow-md border-b border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-neutral-900 dark:text-neutral-50">
            Navigation/Header
          </span>
          <Button onClick={toggleDarkMode} variant="outlined">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}

      <footer className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-6">
        <div className="container mx-auto px-4 text-neutral-600 dark:text-neutral-400">
          Footer
        </div>
      </footer>
    </div>
  );
};
