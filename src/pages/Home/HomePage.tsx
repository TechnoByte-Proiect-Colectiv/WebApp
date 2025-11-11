import { Container } from "@mui/material";
import { HeroSection } from "./HeroSection/HeroSection";
import { CategorySection } from "./CategorySection";
import { Checkroom, Devices, Kitchen, MenuBook } from "@mui/icons-material";
import { ProductCarousel } from "../../components/features/products/ProductCarousel";

export const HomePage = () => {
  const categories = [
    { name: "Electronics", icon: Devices, color: "primary" },
    { name: "Fashion", icon: Checkroom, color: "secondary" },
    { name: "Home & Kitchen", icon: Kitchen, color: "success" },
    { name: "Books & Media", icon: MenuBook, color: "info" },
  ];

  const mockProducts = [1, 2, 3, 4, 5, 6, 7, 8];

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
          products={mockProducts}
          showPromoCard
        ></ProductCarousel>

        <ProductCarousel
          title="Top Picks"
          products={mockProducts}
        ></ProductCarousel>

        <ProductCarousel
          title="Recommended for you"
          products={mockProducts}
        ></ProductCarousel>

        <ProductCarousel
          title="Trending in Electronics"
          products={mockProducts}
        ></ProductCarousel>

        <ProductCarousel
          title="Why did the chicken cross the street?"
          products={mockProducts}
        ></ProductCarousel>
      </Container>
    </div>
  );
};
