import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import { Product, Review } from "../../types/home/types";
import { Container, Typography, Box, Button, Collapse, Card, CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const ProductPage: React.FC<{ product?: Product; reviews?: Review[] }> = ({ product: propProduct, reviews: propReviews }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDescription, setShowDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    if(propProduct) {
        setProduct(propProduct);
        setReviews(propReviews || []);
        setLoading(false);
        return;
    }

    if (!id) return;

    const fetchProduct = async () => {
        try {
            const prod = await ProductService.getById(+id);
            const revs = await ProductService.getReviews(+id);
            setProduct(prod);
            setReviews(revs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
  }, [id, propProduct, propReviews]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <StarIcon key={i} sx={{ color: "#FFD700" }} /> : <StarBorderIcon key={i} sx={{ color: "#FFD700" }} />);
    }
    return stars;
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <Container sx={{ mt: 4 }}>
      {/* Top section: image + info in card */}
      <Card sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Image */}
        <Box flex="0 0 40%">
          <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 4 }} />
        </Box>

        {/* Product info */}
        <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between" sx={{ textAlign: "right" }}>
          <Box>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6" mt={1}>
              Price: {product.price} {product.currency}
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              Category: {product.category || "N/A"}
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              Stock: {product.stock || "N/A"}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5} mt={1}>
                <Typography variant="subtitle1">Rating:</Typography>
                {reviews.length > 0 ? (
                    <>
                    <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>{averageRating.toFixed(1)}/5</Typography>
                    <StarIcon sx={{ color: "#FFD700", fontSize: 21 }} />
                    </>
                ) : (
                    <Typography variant="subtitle1">N/A</Typography>
                )}
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FavoriteIcon />}
            >
              Add to Wishlist
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Collapsible sections */}
      <Box mt={4} width="100%">
        {/* Description */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setShowDescription(prev => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {showDescription ? "-" : "+"} Description
          </Button>
          <Collapse in={showDescription}>
            <Typography>{product.description}</Typography>
          </Collapse>
        </Box>

        {/* Reviews */}
        <Box sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setShowReviews(prev => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {showReviews ? "-" : "+"} Reviews
          </Button>
          <Collapse in={showReviews}>
            <Box mt={1}>
              {reviews.length === 0 && <Typography>No reviews yet.</Typography>}
              {reviews.map(r => (
                <Card key={r.id} sx={{ mb: 1 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>User {r.user_id} —</Typography>
                      <Box display="flex">{renderStars(r.rating)}</Box>
                    </Box>
                    <Typography>{r.comment}</Typography>
                    <Typography sx={{color: "#888", fontSize: "0.875rem"}}>Created at: {r.created_at}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
};