import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { ProductType } from "../../types/product/product";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../routes/routePaths";

export const ProductCard: React.FC<{ product: ProductType }> = ({
  product,
}) => {
  const { addToCart, isInCart, getProductQuantity } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(generatePath.productDetail(product.slug));
  };

  return (
    <Box
      onClick={handleCardClick}
      className="flex flex-col w-full h-full group"
      sx={{
        cursor: "pointer",
        borderRadius: 1,
        boxShadow: 3,
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: 4,
          borderColor: "primary.main",
        },
        transition: "all 0.2s ease-in-out",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        "&.dark": {
          boxShadow: 1,
          borderColor: "divider",
          "&:hover": { borderColor: "brand.500" },
        },
      }}
    >
      <Box className="w-full h-40" sx={{ overflow: "hidden" }}>
        <img
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />
      </Box>

      <Box className="flex flex-col flex-grow p-3">
        <Typography
          variant="body1"
          fontWeight="medium"
          title={product.name}
          noWrap
          sx={{ mb: 1 }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" fontWeight="bold" sx={{ mb: 2 }}>
          {product.price.toFixed(2)} {product.currency}
        </Typography>

        <Box className="flex-grow" />

        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          variant={isInCart(product.id) ? "outlined" : "contained"}
          size="small"
          fullWidth
        >
          {isInCart(product.id)
            ? `In basket (${getProductQuantity(product.id)})`
            : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
};
