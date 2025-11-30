import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../../context/ProductContext";
import { ProductType } from "../../types/product/product";
import { useSearchParams } from "react-router-dom";
import { MOCK_CATEGORIES } from "../../context/mockProducts";

export const ProductListPage: React.FC = () => {
  const [productsToShow, setProductsToShow] = useState<ProductType[]>([]);
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  const { mockProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const pageTitle = useMemo(() => {
    if (!categorySlug) {
      return "All Products";
    }
    const foundCategory = MOCK_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );
    return foundCategory ? foundCategory.name : "Products";
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    if (!categorySlug) {
      return mockProducts;
    }
    return mockProducts.filter(
      (product) => product.category.slug === categorySlug
    );
  }, [mockProducts, categorySlug]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = event.target.value;

    setSearchParams((prevParams) => {
      if (newSlug === "all") {
        prevParams.delete("category");
      } else {
        prevParams.set("category", newSlug);
      }
      return prevParams;
    });
  };

  useEffect(() => {
    setProductsToShow(filteredProducts.slice(0, pageSize));
    setPage(1);
  }, [pageSize, filteredProducts]);

  const loadMore = useCallback(() => {
    setPage((currentPage) => {
      const nextPage = currentPage + 1;
      const nextProducts = filteredProducts.slice(0, nextPage * pageSize);
      setProductsToShow(nextProducts);
      return nextPage;
    });
  }, [filteredProducts, pageSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (productsToShow.length < filteredProducts.length) {
            loadMore();
          }
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [productsToShow.length, filteredProducts.length, loadMore]);

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, position: "sticky", top: 102 }}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "text.primary",
                  "&.Mui-focused": {
                    color: "text.primary",
                  },
                }}
              >
                Categories
              </FormLabel>
              <RadioGroup
                aria-label="categories"
                name="categories-group"
                value={categorySlug || "all"}
                onChange={handleCategoryChange}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Categories"
                />
                {MOCK_CATEGORIES.map((cat) => (
                  <FormControlLabel
                    key={cat.slug}
                    value={cat.slug}
                    control={<Radio />}
                    label={cat.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            sx={{ flexWrap: "wrap", gap: 2 }}
          >
            <Typography variant="h4">{pageTitle}</Typography>

            <Box>
              <Typography variant="body1" component="span" mr={1}>
                Products per load:
              </Typography>
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                size="small"
              >
                {[6, 12, 24, 48].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {productsToShow.map((product) => (
              <Grid key={product.id} size={{ xs: 6, sm: 4, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* loader div */}
          {productsToShow.length < filteredProducts.length && (
            <div ref={loader} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
