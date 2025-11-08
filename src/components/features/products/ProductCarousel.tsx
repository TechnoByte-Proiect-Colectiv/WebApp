import React, { useId } from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { AppPromoCard } from "../../common/AppPromoCard";

interface ProductCarouselProps {
  title: string;
  products: number[];
  showPromoCard?: boolean;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  showPromoCard = false,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const nextClass = `swiper-next-${uniqueId}`;
  const prevClass = `swiper-prev-${uniqueId}`;

  return (
    <Box className="mt-12 relative group">
      <Typography variant="h4" component="h2" className="font-bold mb-6">
        {title}
      </Typography>

      <Box className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          loop={true}
          slidesPerView={"auto"}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          className="!py-4"
        >
          {showPromoCard && (
            <SwiperSlide className="!w-auto h-40">
              <AppPromoCard />
            </SwiperSlide>
          )}
          {products.map((product, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <Card className="flex flex-row items-center justify-center h-40 w-[240px] bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-lg">
                {product}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className={`${prevClass} !absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0`}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%) translateX(-50%)",
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton
          className={`${nextClass} !absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0`}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%) translateX(50%)",
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
