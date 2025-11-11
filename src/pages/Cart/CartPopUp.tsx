import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { ProductCartList } from "../../components/features/cart/ProductCartList";
import { ProductCartListItem } from "../../components/features/cart/ProductCartListItem";
import { useCart } from "../../context/CartContext";
import { CartListComponent } from "./CartListComponent";

export const CartPage: React.FC = () => {
  return (
    <Box>
      <CartListComponent isPopUpCart={true}></CartListComponent>
    </Box>
  );
};
