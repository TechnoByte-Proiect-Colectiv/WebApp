import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); 

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        borderTop: 1,
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.700" : "neutral.200",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            &copy; {currentYear} TechnoByte.
          </Typography>

          <Box
            component="nav"
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
            }}
          >
            <Link
              component="button" 
              variant="body2"
              onClick={() => handleNavigate("/privacy-policy")}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Confidentiality Policy
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => handleNavigate("/terms-of-service")}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => handleNavigate("/contact")}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};