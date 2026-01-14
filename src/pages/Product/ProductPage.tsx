import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Collapse,
  Card,
  CardContent,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { ProductType } from "../../types/product/product";
import { useCart } from "../../context/CartContext";
import { Review } from "../../types/product/review";
import { ProductService } from "../../services/ProductService";

export const ProductPage: React.FC<{ reviews?: Review[] }> = ({
  reviews: propReviews,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductQuantity, isInCart, addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [reviews, setReviews] = useState<Review[]>(propReviews || []);
  const [loading, setLoading] = useState(false);

  const [showDescription, setShowDescription] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showReviews, setShowReviews] = useState(true); 

  useEffect(() => {
    if (!slug) return;
    if (loading) return;
    setLoading(true);
    const prod = ProductService.getBySlug(slug);
    prod
      .then((prod) => {
        setProduct(prod || null);
        return ProductService.getReviewsForProduct(Number.parseInt(prod.id));
      })
      .then((fetchedReviews) => {
        if (fetchedReviews) {
          const sortedReviews = [...fetchedReviews].sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setReviews(sortedReviews);
        } else {
          setReviews([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const renderStars = (rating: number, size: "small" | "medium" = "medium") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} fontSize={size} sx={{ color: "#FFD700" }} />
        ) : (
          <StarBorderIcon key={i} fontSize={size} sx={{ color: "#FFD700" }} />
        )
      );
    }
    return stars;
  };

  const displayRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.rating;

  const reviewCount = reviews.length > 0 ? reviews.length : 0;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box flex="0 0 40%" sx={{ position: "relative" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
          />
          <Chip
            label={product.category}
            color="primary"
            size="small"
            sx={{ position: "absolute", top: 10, left: 10 }}
          />
        </Box>

        <Box flex="1" display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {product.name}
            </Typography>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                variant="h6"
                sx={{ color: "#FFD700", fontWeight: "bold" }}
              >
                {displayRating.toFixed(1)}
              </Typography>
              <Box display="flex">{renderStars(Math.round(displayRating))}</Box>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({reviewCount} reviews)
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h3" color="primary" fontWeight="medium">
              {product.price.toFixed(2)} {product.currency}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              {product.quantity > 0 ? (
                <Chip
                  icon={<CheckCircleIcon />}
                  label={`In Stock (${product.quantity} units)`}
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip
                  icon={<RemoveCircleIcon />}
                  label="Out of Stock"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          <Box flexGrow={1} />

          <Box display="flex" gap={2} mt={3}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              variant={isInCart(product.id) ? "outlined" : "contained"}
              size="large"
              disabled={product.quantity === 0}
              sx={{ flex: 1 }}
            >
              {isInCart(product.id)
                ? `In Basket (${getProductQuantity(product.id)})`
                : product.quantity === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<FavoriteIcon />}
            >
              Wishlist
            </Button>
          </Box>
        </Box>
      </Card>

      <Box mt={4}>
        <Paper variant="outlined" sx={{ mb: 2, overflow: "hidden" }}>
          <Box
            onClick={() => setShowDescription(!showDescription)}
            sx={{
              p: 2,
              bgcolor: "neutral.100",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Description</Typography>
            <Typography>{showDescription ? "−" : "+"}</Typography>
          </Box>
          <Collapse in={showDescription}>
            <Box p={3}>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {product.description}
              </Typography>
            </Box>
          </Collapse>
        </Paper>

        <Paper variant="outlined" sx={{ mb: 2, overflow: "hidden" }}>
          <Box
            onClick={() => setShowSpecs(!showSpecs)}
            sx={{
              p: 2,
              bgcolor: "neutral.100",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Specifications</Typography>
            <Typography>{showSpecs ? "−" : "+"}</Typography>
          </Box>
          <Collapse in={showSpecs}>
            <TableContainer component={Box}>
              <Table>
                <TableBody>
                  {product.specifications &&
                    product.specifications.map((specItem, index) => {
                      const [key, value] = Object.entries(specItem)[0];
                      return (
                        <TableRow key={index} hover>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold", width: "30%" }}
                          >
                            {key}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Paper>

        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Box
            onClick={() => setShowReviews(!showReviews)}
            sx={{
              p: 2,
              bgcolor: "neutral.100",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Reviews ({reviews.length})</Typography>
            <Typography>{showReviews ? "−" : "+"}</Typography>
          </Box>
          <Collapse in={showReviews}>
            <Box p={2}>
              {reviews.length === 0 && (
                <Typography color="text.secondary" align="center" py={2}>
                  No reviews yet for this product.
                </Typography>
              )}

              {reviews.map((r) => (
                <Card
                  key={r.id}
                  variant="outlined"
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box display="flex" gap={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {r.userId
                            ? r.userId.toString().charAt(0).toUpperCase()
                            : "U"}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="bold" variant="subtitle1">
                            User {r.userId}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(r.created_at)}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        {renderStars(r.rating, "small")}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {r.title && (
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontSize: "1rem", fontWeight: "bold" }}
                      >
                        {r.title}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {r.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Collapse>
        </Paper>
      </Box>
    </Container>
  );
};
