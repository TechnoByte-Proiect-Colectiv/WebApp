import React, { useState, useEffect, useRef } from "react";
// Ajusteaza calea catre logo-ul tau
import logo from "../../logo.svg";

const Navbar = () => {
  // Starea pentru vizibilitatea dropdown-ului
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref (referinta) pentru a "tine minte" elementul dropdown
  const dropdownRef = useRef(null);

  // Acest efect se ocupa de inchiderea dropdown-ului
  // daca utilizatorul da click in alta parte
  useEffect(() => {
    // Functia care ruleaza la orice click pe pagina
    const handleClickOutside = (event) => {
      // Verificam daca dropdown-ul exista (e randat)
      // si daca click-ul NU a fost in interiorul lui
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Adaugam event listener-ul cand componenta se "monteaza"
    document.addEventListener("mousedown", handleClickOutside);

    // Curatam (inlaturam) listener-ul cand componenta "dispare"
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // [] inseamna ca efectul ruleaza o singura data (la montare)

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Partea stanga: Logo */}
      <div>
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Partea dreapta: Meniu "Contul meu" */}
      <div className="relative" ref={dropdownRef}>
        {/* Butonul care comuta starea dropdown-ului */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
        >
          {/* Aici poti adauga si o iconita de utilizator */}
          <span>Contul meu</span>
          {/* O sageata simpla */}
          <svg
            className={`w-4 h-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown-ul (randat conditionat) */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <a
              href="#profil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profil
            </a>
            <a
              href="#setari"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Setări
            </a>
            <div className="border-t border-gray-100 my-1"></div>
            <a
              href="#logout"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
