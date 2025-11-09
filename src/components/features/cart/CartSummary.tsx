import { Box, Typography } from "@mui/material";

export const CartSummary: React.FC<{
  totalItems: number;
  totalPrice: number;
  currency: string;
  isPopUpCart: boolean;
}> = ({ totalItems, totalPrice, currency, isPopUpCart = false }) => {
  return (
    <Box
      className={`${
        isPopUpCart
          ? "p-2"
          : "p-4 rounded-lg border border-neutral-200 dark:border-neutral-700"
      } " bg-neutral-50 dark:bg-neutral-900 "`}
    >
      <Box className="flex justify-between items-center">
        <Typography
          variant="h6"
          sx={{
            fontWeight: isPopUpCart ? "" : "bold",
          }}
        >
          Final price:
        </Typography>
        <Typography
          variant="h6"
          className="font-bold text-brand-500 md:text-end text-justify"
        >
          {totalPrice.toFixed(2)} {currency}
        </Typography>
      </Box>
    </Box>
  );
};
