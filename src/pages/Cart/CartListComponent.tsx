import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { ProductCartList } from "../../components/features/cart/ProductCartList";
import { ProductCartListItem } from "../../components/features/cart/ProductCartListItem";
import { useCart } from "../../context/CartContext";

interface CartListComponentProps {
    isPopUpCart? : boolean;
}

export const CartListComponent: React.FC<CartListComponentProps> = ({
    isPopUpCart = false,
}) => {
  const { cartProducts, removeFromCart, updateQuantity, getCartItemsCount } = useCart();

  return (
    <Container>
      <Box>
        <ProductCartList
          title={`Cart (${getCartItemsCount()} items)`}
          items={cartProducts}
          renderItem={(product, index) => (
            <ProductCartListItem
              isPopUpCart={isPopUpCart}
              product={product}
              index={index}
            />
          )}
          isPopUpCart={isPopUpCart}
          onQuantityChange={updateQuantity}
          onRemove={removeFromCart}
        />
      </Box>
    </Container>
  );
};
