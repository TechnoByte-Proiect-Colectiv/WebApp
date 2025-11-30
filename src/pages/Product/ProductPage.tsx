import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
  Link
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ProductType } from "../../types/product/product";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { Review } from "../../types/product/review";

export const ProductPage: React.FC<{ reviews?: Review[] }> = ({ reviews: propReviews }) => {
  const { slug } = useParams<{ slug: string }>();
  const { mockProducts } = useProducts();
  const { getProductQuantity, isInCart, addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [reviews, setReviews] = useState<Review[]>(propReviews || []);
  const [loading, setLoading] = useState(true);

  const [showDescription, setShowDescription] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const prod = mockProducts.find((p) => p.slug === slug);
    setProduct(prod || null);
    setLoading(false);
  }, [slug, mockProducts]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} sx={{ color: "#FFD700" }} />
        ) : (
          <StarBorderIcon key={i} sx={{ color: "#FFD700" }} />
        )
      );
    }
    return stars;
  };

  const displayRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.rating;

  const reviewCount = reviews.length > 0 ? reviews.length : 0; 

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Card sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        
        <Box flex="0 0 40%" sx={{ position: 'relative' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: 8, objectFit: 'cover' }}
            />
            <Chip 
                label={product.category.name} 
                color="primary" 
                size="small" 
                sx={{ position: 'absolute', top: 10, left: 10 }}
            />
        </Box>

        <Box flex="1" display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {product.name}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1} mb={2}>
                <StorefrontIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                    Sold by: {' '}
                    <Link 
                        component={RouterLink} 
                        to={`/seller/${product.seller.slug}`}
                        sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                        {product.seller.name}
                    </Link>
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="h6" sx={{ color: "#FFD700", fontWeight: 'bold' }}>
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
                {product.stock > 0 ? (
                    <Chip icon={<CheckCircleIcon />} label={`In Stock (${product.stock} units)`} color="success" variant="outlined" />
                ) : (
                    <Chip icon={<RemoveCircleIcon />} label="Out of Stock" color="error" variant="outlined" />
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
              disabled={product.stock === 0}
              sx={{ flex: 1 }}
            >
              {isInCart(product.id)
                ? `In Basket (${getProductQuantity(product.id)})`
                : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
        
        <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
          <Box 
            onClick={() => setShowDescription(!showDescription)}
            sx={{ p: 2, bgcolor: 'neutral.100', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h6">Description</Typography>
            <Typography>{showDescription ? "−" : "+"}</Typography>
          </Box>
          <Collapse in={showDescription}>
            <Box p={3}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {product.description}
              </Typography>
            </Box>
          </Collapse>
        </Paper>

        <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
          <Box 
            onClick={() => setShowSpecs(!showSpecs)}
            sx={{ p: 2, bgcolor: 'neutral.100', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h6">Specifications</Typography>
            <Typography>{showSpecs ? "−" : "+"}</Typography>
          </Box>
          <Collapse in={showSpecs}>
             <TableContainer component={Box}>
                <Table>
                    <TableBody>
                        {product.specifications && product.specifications.map((specItem, index) => {
                            const [key, value] = Object.entries(specItem)[0];
                            return (
                                <TableRow key={index} hover>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
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

        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <Box 
            onClick={() => setShowReviews(!showReviews)}
            sx={{ p: 2, bgcolor: 'neutral.100', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
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
                <Card key={r.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontWeight="bold">User {r.user_id}</Typography>
                        <Typography variant="caption" color="text.secondary">{r.created_at}</Typography>
                    </Box>
                    <Box display="flex" mb={1}>{renderStars(r.rating)}</Box>
                    <Typography variant="body2">{r.comment}</Typography>
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