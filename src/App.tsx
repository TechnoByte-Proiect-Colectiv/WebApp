import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./theme/theme";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { Button, Card, Container, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductContext";

function AppContent() {
  const { darkMode } = useDarkMode();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
