import { FC } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

interface CartIconProps {
  itemCount?: number;
}

export const CartIcon: FC<CartIconProps> = ({ itemCount = 0 }) => {
  return (
    <Link to="/cart" className="no-underline">
      <IconButton
        size="small"
        className="text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Badge
          badgeContent={itemCount}
          color="error"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#d946ef",
              color: "#ffffff",
              fontWeight: "bold",
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Link>
  );
};
