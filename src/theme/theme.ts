import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.brand[500],
      light: colors.brand[400],
      dark: colors.brand[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.accent[500],
      light: colors.accent[400],
      dark: colors.accent[600],
      contrastText: "#ffffff",
    },
    success: {
      main: colors.success[500],
      light: colors.success[400],
      dark: colors.success[600],
    },
    background: {
      default: colors.neutral[50],
      paper: "#ffffff",
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
    },
    divider: colors.neutral[200],
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.brand[400],
      light: colors.brand[300],
      dark: colors.brand[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.accent[400],
      light: colors.accent[300],
      dark: colors.accent[500],
      contrastText: "#000000",
    },
    success: {
      main: colors.success[400],
      light: colors.success[300],
      dark: colors.success[500],
    },
    background: {
      default: colors.neutral[900],
      paper: colors.neutral[800],
    },
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[400],
    },
    divider: colors.neutral[700],
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});