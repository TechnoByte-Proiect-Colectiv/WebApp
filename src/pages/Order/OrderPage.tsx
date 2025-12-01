import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath, ROUTES } from "../../routes/routePaths";
import { Order } from "../../types/user/order";
import { mockOrders } from "../../services/userService";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>();

  const handleClickSeller = (sellerId: string) => {
    //HERE CALL API TO GET ITS SLUG.
    //NOT BY ID!
    navigate(generatePath.seller(sellerId));
  };

  const handleProductClick = (productId: string) => {
    //HERE CALL API TO GET ITS SLUG.
    //NOT BY ID!
    navigate(generatePath.productDetail(productId));
  }

  useEffect(() => {
    //nu stiu cat de best practice e,
    //dar cand accesez compnenta, verific (in backend)
    //daca id-ul acestei comenzi "apartine"
    //userului curent (jwt) si daca apartine,
    //afisez primesc datele comenzii din backend si le afisez

    //altfel redirectionez catre forbidden

    //promise -> next: incarc order, error: pa

    //navigate(ROUTES.FORBIDDEN)

    setOrder(mockOrders.find((o) => o.id === id));
  }, []);

  return (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Typography fontSize={30}>
        Order No. <span className="font-bold">{id}</span>
      </Typography>
      <Typography fontSize={14}>{order?.createdAt}</Typography>

      <Grid
        container
        sx={{
          mt: 2,
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 8,
          }}
        >
          {/* itereaza peste shipments */}
          {order?.shipments.map((shipment, index) => (
            <Card
              sx={{
                mr: 2,
                mb: 1,
              }}
            >
              <CardContent>
                <Typography fontSize={20}>Shipment {index + 1}</Typography>
                <Typography fontSize={14} className="flex items-center gap-1">
                  Sold & Delivered by:
                  <button
                    type="button"
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    onClick={() => handleClickSeller(shipment.sellerId)}
                  >
                    {shipment.sellerName}
                  </button>
                </Typography>

                {/* itereaza peste produse */}
                {shipment.items.map((item, index) => (
                  <Box
                    sx={{
                      my: 1.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      onClick={() => handleProductClick(item.productId)}
                      sx={{
                        width: "75%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={item.picture}
                        sx={{
                          borderRadius: 1,
                          mr: 1,
                        }}
                      ></Avatar>
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.productName}
                      </Typography>
                    </Box>

                    <Typography sx={{}}>
                      {item.quantity}x {item.unitPrice} {item.currency}
                    </Typography>
                  </Box>
                ))}
                {/* ---- */}
                <Divider
                  sx={{
                    my: 1,
                  }}
                ></Divider>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography>
                    {shipment.shippingCost} {shipment.shippingCurrency}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              top: 102,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Products</Typography>
              <Typography>
                {order?.totalProducts} {order?.currency}
              </Typography>
            </Box>
            <Divider
              sx={{
                my: 1,
              }}
            ></Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Shipping</Typography>
              <Typography>
                {order?.totalShipping} {order?.currency}
              </Typography>
            </Box>
            <Divider
              sx={{
                my: 1,
              }}
            ></Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography fontWeight={800} fontSize={24}>
                {order?.total} {order?.currency}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
