import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove?: () => void;
  isMobile?: boolean;
  isPopUpCart: boolean;
}

export const CartControls: React.FC<CartControlsProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  isPopUpCart = false,
  isMobile = false,
}) => {
  return (
    <Box className={`flex items-center gap-2 ${isMobile ? "" : "ml-4"}`}>
      {!isPopUpCart && (
        <Box className="flex items-center gap-1 border border-neutral-200 dark:border-neutral-700 rounded">
          <IconButton
            size="small"
            className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={onDecrement}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" className="px-3 min-w-[40px] text-center">
            {quantity}
          </Typography>
          <IconButton
            size="small"
            className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={onIncrement}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {onRemove && (
        <IconButton
          onClick={onRemove}
          className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
          size="small"
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};
