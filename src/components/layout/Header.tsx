import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDarkMode } from "../../context/DarkModeContext";
import { SearchBar } from "../common/SearchBar";
import { CartIcon } from "../common/CartIcon";
import { LoginButton } from "../common/LoginButton";
import { useCart } from "../../context/CartContext";

interface HeaderProps {
}

export const Header: FC<HeaderProps> = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { getCartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 shadow-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="w-full px-2 sm:px-4 py-2 sm:py-3 md:py-4 overflow-x-hidden">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-6 min-w-0">
          {/* Left Section: Logo + Brand Name */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 no-underline shrink-0 min-w-0">
            {/* Logo Image Placeholder */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/logo.png"
                alt="TechnoByte Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Brand Name in Techy Font */}
            <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400 whitespace-nowrap"
              style={{
                fontFamily: "'Space Mono', 'Courier New', monospace",
                letterSpacing: "-0.02em",
              }}
            >
              TechnoByte
            </span>
          </Link>

          {/* Center Section: Search Bar - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Right Section: Actions - Desktop View */}
          <div className="hidden lg:flex items-center gap-2 md:gap-3 shrink-0">
            {/* Cart Icon */}
            <CartIcon itemCount={getCartItemsCount()} />

            {/* Login Button */}
            <LoginButton />

            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="outlined"
              size="small"
              className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </div>

          {/* Mobile/Tablet View: Cart + Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Cart Icon - Visible on all screens */}
            <CartIcon itemCount={getCartItemsCount()} />

            {/* Hamburger Menu Button */}
            <IconButton
              onClick={toggleMobileMenu}
              size="small"
              className="text-neutral-700 dark:text-neutral-300"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>

        {/* Mobile/Tablet Search Bar - Visible below header on screens < lg */}
        <div className="lg:hidden mt-2 sm:mt-3 pb-1 sm:pb-2">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        PaperProps={{
          className:
            "bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 mt-14",
        }}
      >
        <Box
          className="w-full p-4 flex flex-col gap-3"
          role="presentation"
        >
          {/* Login Button */}
          <LoginButton />

          {/* Dark Mode Toggle */}
          <Button
            onClick={() => {
              toggleDarkMode();
              closeMobileMenu();
            }}
            variant="outlined"
            fullWidth
            className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            {darkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
          </Button>
        </Box>
      </Drawer>
    </header>
  );
};
