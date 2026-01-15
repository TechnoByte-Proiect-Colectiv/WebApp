import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userService } from "../services/userService";
import { ROUTES } from "./routePaths";

const AdminRoute: React.FC = () => {
  const user = userService.getCurrentUser();
  
  // verify if the user is admin
  const isAdmin = user && (user.isAdmin || user.role === 'admin');

  if (!isAdmin) {
    // if it's not admin, redirect to forbidden page
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  // if admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;