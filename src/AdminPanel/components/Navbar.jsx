import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { ROUTES } from "../../routes/routePaths";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = userService.getCurrentUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await userService.logout();
    setIsDropdownOpen(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-end items-center">

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          
          <span className="font-semibold text-sm">
            {user ? (user.firstName || user.name || "Contul meu") : "Autentificare"}
          </span>

          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown-ul */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-neutral-100 ring-1 ring-black ring-opacity-5">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-neutral-50 mb-1">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">User</p>
                  <p className="text-sm font-semibold truncate text-neutral-800">{user.email}</p>
                </div>
                
                <button
                  onClick={() => { navigate(ROUTES.ACCOUNT); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-neutral-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                >
                  My Profile
                </button>

                <div className="border-t border-neutral-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors flex items-center gap-2"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate(ROUTES.LOGIN); setIsDropdownOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-indigo-600 font-bold hover:bg-indigo-50"
              >
                Log In
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;