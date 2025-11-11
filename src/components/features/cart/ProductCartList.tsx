// ProductCartList.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { EmptyCart } from "./EmptyCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

interface CartListProps<T> {
  title?: string;
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  onRemove?: (index: number) => void;
  onQuantityChange?: (index: number, newQuantity: number) => void;
  isPopUpCart?: boolean;
  emptyMessage?: string;
}

export const ProductCartList = <T,>({
  title,
  items,
  renderItem,
  onRemove,
  onQuantityChange,
  emptyMessage = "Empty Basket",
  isPopUpCart = false,
}: CartListProps<T>) => {
  const totalPrice = items.reduce((sum, item: any) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <Box sx={{ mt: 6 }}>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 3,
          }}
        >
          {title}
        </Typography>
      )}

      {items.length === 0 ? (
        <EmptyCart message={emptyMessage} />
      ) : (
        <Box
          className={`${
            isPopUpCart ? "gap-1" : "gap-6"
          } flex flex-col md:flex-row`}
        >
          <Box className={`${isPopUpCart ? "space-y-1" : "space-y-4"} flex-1`}>
            {items.map((item, index) => (
              <CartItem
                key={index}
                index={index}
                isPopUpCart={isPopUpCart}
                initialQuantity={(item as any).quantity}
                renderContent={
                  renderItem ? () => renderItem(item, index) : undefined
                }
                onRemove={onRemove}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </Box>

          <Box className="md:w-60 lg:w-80 w-full">
            <Box className={"md:sticky md:top-28"}>
              <CartSummary
                isPopUpCart={isPopUpCart}
                totalItems={items.length}
                totalPrice={totalPrice}
                currency={"RON"}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
