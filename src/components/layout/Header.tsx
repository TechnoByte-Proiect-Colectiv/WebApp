import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";
import { SearchBar } from "../common/SearchBar";
import { CartIcon } from "../common/CartIcon";
import { LoginButton } from "../common/LoginButton";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export const Header: FC<HeaderProps> = ({ cartItemCount = 0, onSearch }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 shadow-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left Section: Logo + Brand Name */}
          <Link to="/" className="flex items-center gap-3 no-underline shrink-0">
            {/* Logo Image Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="TechnoByte Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Brand Name in Techy Font */}
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400"
              style={{
                fontFamily: "'Space Mono', 'Courier New', monospace",
                letterSpacing: "-0.02em",
              }}
            >
              TechnoByte
            </span>
          </Link>

          {/* Center Section: Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Icon */}
            <CartIcon itemCount={cartItemCount} />

            {/* Login Button */}
            <LoginButton />

            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="outlined"
              size="small"
              className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
