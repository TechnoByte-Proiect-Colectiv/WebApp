import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { ForbiddenPage } from "../pages/NotFound/ForbiddenPage";
import ProtectedRoute from "./ProtectedRoute";
import { TestingDashboardPage } from "../pages/TestingComponents/TestingPrivatePage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { Layout } from "../components/layout/Layout";
import { ROUTES } from "./routePaths";
import { UserEditPage } from "../pages/User/UserEditPage";
import { CartPage } from "../pages/Cart/CartPage";
import { ProductPage } from "../pages/Product/ProductPage";
import { ProductListPage } from "../pages/Product/ProductListPage";
import { LoginPage } from "../pages/Auth/LoginPage";
import { UserPage } from "../pages/User/UserPage";
import { CheckoutPage } from "../pages/Checkout/CheckoutPage";
import { SellerPage } from "../pages/Seller/SellerPage";
import { Container } from "@mui/material";
import { OrderPage } from "../pages/Order/OrderPage";
import { ResetPasswordPage } from "../pages/Auth/ResetPasswordPage";

// Import Admin Panel components
import AdminLayout from "../AdminPanel/AdminLayout";
import Dashboard from "../AdminPanel/pages/Dashboard";
import Users from "../AdminPanel/pages/Users";
import Products from "../AdminPanel/pages/Products";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        {/* --- Public routes --- */}
        <Route index element={<HomePage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductPage />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.SELLER} element={<SellerPage />} />

        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />

        {/* --- Private rotues --- */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.SETTINGS} element={<UserEditPage />} />
          <Route path={ROUTES.ACCOUNT} element={<UserPage />} />
          <Route path={ROUTES.ORDER} element={<OrderPage />} />
        </Route>

        {/* --- Page not found --- */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>

      {/* --- Admin Panel Routes --- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
};
