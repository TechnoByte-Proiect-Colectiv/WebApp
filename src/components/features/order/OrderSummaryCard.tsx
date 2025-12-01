import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { generatePath } from "../../../routes/routePaths";

export interface OrderSummaryCardProps {
  id: string;
  createdAt: string;
  total: number;
  photos?: string[];
  currency: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  id,
  createdAt,
  total,
  photos = [
    "https://images.dog.ceo/breeds/mix/xeshaBelka_(1).jpg",
    "https://images.dog.ceo/breeds/mix/xeshaBelka_(1).jpg",
    "https://images.dog.ceo/breeds/mix/xeshaBelka_(1).jpg",
    "https://images.dog.ceo/breeds/mix/xeshaBelka_(1).jpg",
    "https://images.dog.ceo/breeds/mix/xeshaBelka_(1).jpg",
  ],
  currency,
}) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(generatePath.order(id));
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip label={`No. ${id}`}></Chip>
          <Chip
            color="primary"
            label={`View`}
            clickable={true}
            onClick={handleOrderClick}
          ></Chip>
        </Box>

        {!photos ? (
          <>
            <Typography>Could not find product images</Typography>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {photos.slice(0, 3).map((photo, index) => (
                <Avatar
                  key={index}
                  sx={{
                    borderRadius: 1,
                    mr: 1,
                  }}
                  variant="square"
                  src={photo}
                ></Avatar>
              ))}
              {photos.length > 3 && (
                <Avatar
                  key={"remaining"}
                  sx={{
                    borderRadius: 1,
                    mr: 1,
                  }}
                  variant="square"
                >
                  +{photos.length - 3}
                </Avatar>
              )}
            </Box>
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography fontSize={12} sx={{ flex: 1, mb: -1 }}>
            {createdAt}
          </Typography>
          <Typography sx={{ flex: 1, textAlign: "right", mb: -1 }}>
            {total} {currency}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
