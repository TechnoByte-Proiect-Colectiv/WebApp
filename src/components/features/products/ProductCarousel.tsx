import React, { useId } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { AppPromoCard } from "../../common/AppPromoCard";
import { ProductCard } from "../../../pages/Product/ProductCard";
import { ProductType } from "../../../types/product/product";

interface ProductCarouselProps {
  title: string;
  products: ProductType[];
  showPromoCard?: boolean;
}

const MIN_SLOTS_TO_DISPLAY = 6; 

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  showPromoCard = false,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const nextClass = `swiper-next-${uniqueId}`;
  const prevClass = `swiper-prev-${uniqueId}`;

  const totalItems = products.length + (showPromoCard ? 1 : 0);
  const emptySlotsCount = Math.max(0, MIN_SLOTS_TO_DISPLAY - totalItems);
  const emptySlots = Array.from({ length: emptySlotsCount });

  const shouldLoop = totalItems > MIN_SLOTS_TO_DISPLAY;

  return (
    <Box className="mt-12 relative group">
      <Typography variant="h4" component="h2" className="font-bold mb-6">
        {title}
      </Typography>

      <Box className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          watchOverflow={true} 
          loop={shouldLoop}
          slidesPerView={"auto"}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          className="!py-4 flex" 
        >
          {showPromoCard && (
            <SwiperSlide className="!w-auto h-80">
              <AppPromoCard />
            </SwiperSlide>
          )}

          {products.map((product, index) => (
            <SwiperSlide key={`prod-${index}`} className="!w-[210px] !h-80">
              <ProductCard product={product}></ProductCard>
            </SwiperSlide>
          ))}

          {emptySlots.map((_, index) => (
            <SwiperSlide key={`empty-${index}`} className="!w-[210px] !h-80">
               <Box className="w-full h-full rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50">
                  <Typography variant="body2" className="text-neutral-400 font-medium">
                    Empty Slot
                  </Typography>
               </Box>
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
            "&:hover": { bgcolor: "background.paper" },
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
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};