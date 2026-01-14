import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generatePath, ROUTES } from "../../routes/routePaths";
import { Order } from "../../types/user/order";
import { mockOrders, userService } from "../../services/userService";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClickSeller = (sellerId: string) => {
    //HERE CALL API TO GET ITS SLUG.
    //NOT BY ID!
    navigate(generatePath.seller(sellerId));
  };

  const handleProductClick = (slug: string) => {
    navigate(generatePath.productDetail(slug));
  };

  useEffect(() => {
    if (!id) return;

    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const data = await userService.getOrderById(id);

        setOrder(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch order:", err);
        setError("Could not load order details.");

        if (err.message && err.message.includes("permission")) {
          navigate(ROUTES.HOME); // Fallback
        } else if (err.message && err.message.includes("not found")) {
          navigate(ROUTES.HOME);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error || "Order not found."}</Alert>
      </Container>
    );
  }

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
      <Chip label={order?.orderStatus} color="primary" sx={{ mt: 1 }} />

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
          {/* billing address */}
          <Box
            sx={{
              mr: 2,
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: 2,
                border: "1px dashed #ccc",
                borderRadius: 1,
              }}
            >
              <Typography fontSize={20}>Billing Address</Typography>
              <Typography
                sx={{
                  mt: 1,
                }}
              >
                {order?.billingAddress.firstName}{" "}
                {order?.billingAddress.lastName}{" "}
              </Typography>
              <Typography>
                {order?.billingAddress.street}
                {", "}
                {order?.billingAddress.postalCode}
                {", "}
                {order?.billingAddress.city}
                {", "}
                {order?.billingAddress.county}
                {", "}
                {order?.billingAddress.country}
              </Typography>
              <Typography>{order?.billingAddress.phoneNumber}</Typography>
            </Box>
          </Box>
          {/* shipping address */}
          <Box
            sx={{
              mr: 2,
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: 2,
                border: "1px dashed #ccc",
                borderRadius: 1,
              }}
            >
              <Typography fontSize={20}>Shipping Address</Typography>
              <Typography
                sx={{
                  mt: 1,
                }}
              >
                {order?.shippingAddress.firstName}{" "}
                {order?.shippingAddress.lastName}{" "}
              </Typography>
              <Typography>
                {order?.shippingAddress.street}
                {", "}
                {order?.shippingAddress.postalCode}
                {", "}
                {order?.shippingAddress.city}
                {", "}
                {order?.shippingAddress.county}
                {", "}
                {order?.shippingAddress.country}
              </Typography>
              <Typography>{order?.shippingAddress.phoneNumber}</Typography>
            </Box>
          </Box>
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
                {/* <Typography fontSize={14} className="flex items-center gap-1">
                  Sold & Delivered by:
                  <button
                    type="button"
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    onClick={() => handleClickSeller(shipment.sellerId)}
                  >
                    {shipment.sellerName}
                  </button>
                </Typography> */}

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
                      // onClick={() => handleProductClick(item.productId)}
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
