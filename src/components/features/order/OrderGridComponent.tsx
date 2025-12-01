import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { OrderSummaryCard, OrderSummaryCardProps } from "./OrderSummaryCard";

interface OrderGridCoponentProps {
  orders: OrderSummaryCardProps[];
}

export const OrderGridComponent: React.FC<OrderGridCoponentProps> = ({
  orders,
}) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {orders.map((a) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <OrderSummaryCard
            id={a.id}
            createdAt={a.createdAt}
            total={a.total}
            currency={a.currency}
          ></OrderSummaryCard>
        </Grid>
      ))}
    </Grid>
  );
};
