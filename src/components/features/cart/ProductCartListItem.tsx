import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../../routes/routePaths";

interface ProductCartListItemProps {
  product: {
    product: {
      id: string;
      slug: string;
      name: string;
      price: number;
      currency: string;
      image: string;
    };
    quantity: number;
  };
  isPopUpCart: boolean;
  index: number;
}

export const ProductCartListItem: React.FC<ProductCartListItemProps> = ({
  product: cartProduct,
  isPopUpCart = false,
  index,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(generatePath.productDetail(product.slug));
  };

  const { product, quantity } = cartProduct;
  const totalPrice = product.price * quantity;

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        p: 2,
        borderRadius: 2,
        border: 1,
        borderStyle: "solid",
        borderColor: "divider",
        "&:hover": { boxShadow: 2 },
        transition: "all 0.2s ease-in-out",
      }}
      className="flex items-center gap-4 flex-1"
    >
      {/* Product image */}
      <Box
        className={`${
          isPopUpCart ? "w-10 h-10" : "w-20 h-20"
        } " bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden flex-shrink-0"`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center">
            <Typography variant="caption" className="text-neutral-400">
              No img
            </Typography>
          </Box>
        )}
      </Box>

      {/* Product details */}
      <Box className="flex-1">
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quantity}x {product.price.toFixed(2)} {product.currency}
        </Typography>
      </Box>
    </Box>
  );
};
