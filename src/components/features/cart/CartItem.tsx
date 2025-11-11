import { Box, Card } from "@mui/material";
import { useState } from "react";
import { DefaultCartContent } from "./DefaultCartContent";
import { CartControls } from "./CartControl";

interface CartItemProps {
  index: number;
  isPopUpCart: boolean;
  initialQuantity?: number;
  renderContent?: () => React.ReactNode;
  onRemove?: (index: number) => void;
  onQuantityChange?: (index: number, newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  index,
  isPopUpCart,
  initialQuantity = 1,
  renderContent,
  onRemove,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(index, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(index, newQuantity);
    }
  };

  return (
    <Card
      className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-lg ${
        isPopUpCart
          ? "flex flex-row items-center justify-between p-4 h-12"
          : "p-4"
      }`}
    >
      {isPopUpCart ? (
        <>
          <Box className="flex items-center gap-4 flex-1">
            {renderContent ? (
              renderContent()
            ) : (
              <DefaultCartContent index={index} />
            )}
          </Box>
          <CartControls
            quantity={quantity}
            isPopUpCart={isPopUpCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={onRemove ? () => onRemove(index) : undefined}
          />
        </>
      ) : (
        <>
          {/* Desktop: row layout (>450px) */}
          <Box className="hidden [@media(min-width:450px)]:flex flex-row items-center justify-between">
            <Box className="flex items-center gap-4 flex-1">
              {renderContent ? (
                renderContent()
              ) : (
                <DefaultCartContent index={index} />
              )}
            </Box>
            <CartControls
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              isPopUpCart={isPopUpCart}
              onRemove={onRemove ? () => onRemove(index) : undefined}
            />
          </Box>

          {/* Mobile: custom layout (<450px) */}
          <Box className="[@media(min-width:450px)]:hidden">
            <Box className="flex items-start gap-4 mb-4">
              {renderContent ? (
                renderContent()
              ) : (
                <DefaultCartContent index={index} />
              )}
            </Box>
            <CartControls
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              isPopUpCart={isPopUpCart}
              onRemove={onRemove ? () => onRemove(index) : undefined}
              isMobile
            />
          </Box>
        </>
      )}
    </Card>
  );
};
