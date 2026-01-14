import React, { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../../context/CartContext";
import { ProductType } from "../../types/product/product";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../routes/routePaths";
import { Review } from "../../types/product/review";
import { ProductService } from "../../services/ProductService";

const calculateAverageRating = (reviews: Review[] | undefined | null): number => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

export const ProductCard: React.FC<{ product: ProductType }> = ({
  product,
}) => {
  const { addToCart, isInCart, getProductQuantity } = useCart();
  
  const [rating, setRating] = useState<number>(0);
  const [loadingRating, setLoadingRating] = useState<boolean>(true);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; 

    const fetchRating = async () => {
      try {
        const reviews = await ProductService.getReviewsForProduct(Number(product.id));
        
        if (isMounted) {
          if (reviews && reviews.length > 0) {
            setRating(calculateAverageRating(reviews));
            setReviewCount(reviews.length);
          }
        }
      } catch (error) {
        console.error("Failed to load rating for product", product.id);
      } finally {
        if (isMounted) {
          setLoadingRating(false);
        }
      }
    };

    fetchRating();

    return () => {
      isMounted = false;
    };
  }, [product.id]);

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
          sx={{ mb: 0.5 }}
        >
          {product.name}
        </Typography>

        <Box sx={{ height: 24, mb: 1, display: 'flex', alignItems: 'center' }}>
            {loadingRating ? (
                <Skeleton variant="text" width={60} height={20} />
            ) : rating > 0 ? (
                <Box display="flex" alignItems="center" gap={0.5}>
                    <StarIcon sx={{ color: "#FFD700", fontSize: 18 }} />
                    <Typography variant="body2" fontWeight="bold" color="text.primary">
                        {rating.toFixed(1)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        ({reviewCount})
                    </Typography>
                </Box>
            ) : (
                <Typography variant="caption" color="text.secondary">
                    No reviews
                </Typography>
            )}
        </Box>
        
        {product.rating === 0 && (
             <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                No reviews yet
             </Typography>
        )}

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