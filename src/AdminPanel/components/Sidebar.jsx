import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // Functie ajutatoare pentru a stiliza link-ul activ (Tailwind)
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "block px-4 py-2 rounded-md bg-blue-600 text-white" // Stilul activ
      : "block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"; // Stilul inactiv
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={getNavLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={getNavLinkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/products" className={getNavLinkClass}>
          Products
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
