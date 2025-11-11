import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { ForbiddenPage } from "../pages/NotFound/ForbiddenPage";
import ProtectedRoute from "./ProtectedRoute";
import { TestingDashboardPage } from "../pages/TestingComponents/TestingPrivatePage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { TestingLoginPage } from "../pages/TestingComponents/TestingLoginPage";
import { Layout } from "../components/layout/Layout";
import { ROUTES } from "./routePaths";
import { TestingCartList } from "../pages/TestingComponents/TestingCartList";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        {/* --- Public routes --- */}
        <Route index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<TestingLoginPage />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.TESTING} element={<TestingCartList />} />

        {/* --- Private rotues --- */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.ADMIN} element={<TestingDashboardPage />} />
        </Route>

        {/* --- Page not found --- */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
