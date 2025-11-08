import { Box, Container } from "@mui/material";
import React from "react";
import { AnimatedCanvas } from "./AnimatedCanvas";
import { HeroContent } from "./HeroContent";
import { HeroSectionProps } from "../../../types/home/types";

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "PROMOTION TITLE",
  description = "Any description",
  buttonText = "Shop Now",
  onButtonClick,
}) => {
  const handlePromotionClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.open("https://google.ro", "_blank");
    }
  };

  return (
    <Box className="w-full max-w-screen-2xl mx-auto h-[60vh] max-h-[612px] relative flex items-center justify-start overflow-hidden">
      <AnimatedCanvas />
      <Container>
        <HeroContent
          title={title}
          description={description}
          buttonText={buttonText}
          onButtonClick={handlePromotionClick}
        />
      </Container>
    </Box>
  );
};
