import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { CartListComponent } from "./CartListComponent";
import { ROUTES } from "../../routes/routePaths";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CartListComponent />
      <Button
        onClick={handleCheckout} 
        variant="contained"
        sx={{
          mb: 4
        }}
      >
        To checkout
      </Button>
    </Box>
  );
};