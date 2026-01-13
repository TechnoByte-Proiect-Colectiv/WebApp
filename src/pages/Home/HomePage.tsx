import { Container } from "@mui/material";
import { HeroSection } from "./HeroSection/HeroSection";
import { CategorySection } from "./CategorySection";
import {
  Checkroom,
  Devices,
  Kitchen,
  SportsBasketball,
} from "@mui/icons-material";
import { ProductCarousel } from "../../components/features/products/ProductCarousel";
import { useProducts } from "../../context/ProductContext";
import { LazyLoadWrapper } from "../../components/common/LazyLoadWrapper";
import { useEffect, useMemo, useState } from "react";
import { ProductService } from "../../services/ProductService";
import { ProductType } from "../../types/product/product";

export const HomePage = () => {
  const categories = [
    {
      name: "Electronics",
      icon: Devices,
      color: "primary",
      slug: "electronics",
    },
    { name: "Fashion", icon: Checkroom, color: "secondary", slug: "fashion" },
    {
      name: "Home & Garden",
      icon: Kitchen,
      color: "success",
      slug: "home-garden",
    },
    {
      name: "Sports & Outdoors",
      icon: SportsBasketball,
      color: "info",
      slug: "sports",
    },
  ];

  const { setSearchTerm } = useProducts();

  const [allProducts, setAllProducts] = useState<ProductType[]>([]);

  const getRandomProducts = (products: ProductType[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchTerm("");

    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await ProductService.getAll();
        setAllProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [setSearchTerm]);

  const dealsList = useMemo(() => getRandomProducts(allProducts, 10), [allProducts]);
  const topPicksList = useMemo(() => getRandomProducts(allProducts, 10), [allProducts]);
  const recommendedList = useMemo(() => getRandomProducts(allProducts, 10), [allProducts]);
  const trendingList = useMemo(() => getRandomProducts(allProducts, 10), [allProducts]);
  const chickenList = useMemo(() => getRandomProducts(allProducts, 10), [allProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <HeroSection
        title="November Sales!"
        description="50% off everything"
        buttonText="Buy Now"
      ></HeroSection>
      <Container>
        <CategorySection categories={categories}></CategorySection>

        <ProductCarousel
          title="Deals of the Day"
          products={dealsList}
          showPromoCard
        ></ProductCarousel>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Top Picks"
            products={topPicksList}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Recommended for you"
            products={recommendedList}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Trending in Electronics"
            products={trendingList}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Why did the chicken cross the street?"
            products={chickenList}
          ></ProductCarousel>
        </LazyLoadWrapper>
      </Container>
    </div>
  );
};
