import { Container } from "@mui/material";
import { HeroSection } from "./HeroSection/HeroSection";
import { CategorySection } from "./CategorySection";
import { Checkroom, Devices, Kitchen, MenuBook } from "@mui/icons-material";
import { ProductCarousel } from "../../components/features/products/ProductCarousel";
import { useProducts } from "../../context/ProductContext";
import { LazyLoadWrapper } from "../../components/common/LazyLoadWrapper";

export const HomePage = () => {
  const categories = [
    { name: "Electronics", icon: Devices, color: "primary", slug: "elect" },
    { name: "Fashion", icon: Checkroom, color: "secondary", slug: "fashion" },
    {
      name: "Home & Kitchen",
      icon: Kitchen,
      color: "success",
      slug: "home_and_kitchen",
    },
    {
      name: "Books & Media",
      icon: MenuBook,
      color: "info",
      slug: "books_and_media",
    },
  ];

  const { mockProducts } = useProducts();

  const getRandomProducts = (products: any[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
          products={getRandomProducts(mockProducts, 10)}
          showPromoCard
        ></ProductCarousel>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Top Picks"
            products={getRandomProducts(mockProducts, 10)}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Recommended for you"
            products={getRandomProducts(mockProducts, 10)}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Trending in Electronics"
            products={getRandomProducts(mockProducts, 10)}
          ></ProductCarousel>
        </LazyLoadWrapper>

        <LazyLoadWrapper placeholderHeight={350}>
          <ProductCarousel
            title="Why did the chicken cross the street?"
            products={getRandomProducts(mockProducts, 10)}
          ></ProductCarousel>
        </LazyLoadWrapper>
      </Container>
    </div>
  );
};
