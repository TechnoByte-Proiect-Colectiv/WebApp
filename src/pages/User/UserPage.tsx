import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Collapse,
  Avatar,
  Chip,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { ROUTES } from "../../routes/routePaths";
import { useAuth } from "../../context/AuthContext";
import { Address } from "../../types/user/address";
import { AddressManager } from "../../components/common/AddressManager";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { OrderSummaryCardProps } from "../../components/features/order/OrderSummaryCard";
import { OrderGridComponent } from "../../components/features/order/OrderGridComponent";
import { useAddressManagement } from "../../hooks/useAddressManagement";
import { AddressFormDialog } from "../../components/common/AddressFormDialog";
import { ReviewService } from "../../services/ReviewService";

const roleType = {
  user: "Client",
  admin: "Administrator",
  seller: "Seller",
};

export const UserPage: React.FC = () => {
  const user = userService.getCurrentUser();

  const reviews: [] = [];
  const returns: [] = [];
  const warranties: [] = [];

  const {
    addresses: userAddresses,
    setAddressList,
    isModalOpen,
    editingAddress,
    editingId,
    openAddModal,
    openEditModal,
    closeModal,
    saveAddress,
    deleteAddress,
  } = useAddressManagement([]);

  const [openOrders, setOpenOrders] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [openReturns, setOpenReturns] = useState(false);
  const [openWarranties, setOpenWarranties] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openAddresses, setOpenAddresses] = useState(false);

  const [about, setAbout] = useState<string>();
  const [orders, setOrders] = useState<OrderSummaryCardProps[]>([]);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  const navigate = useNavigate();

  const { logout } = useAuth();

  const fetchReviews = async () => {
        try {
            const data = await ReviewService.getMyReviews();
            setUserReviews(data);
        } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (user && user.dateCreated) {
      // În JavaScript, new Date(1768341600000) funcționează perfect
      const date = new Date(user.dateCreated);
      
      // Verificăm dacă data este validă
      if (!isNaN(date.getTime())) {
        const formattedDate = date.toLocaleDateString("ro-RO", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        setAbout(`${formattedDate}`);
      } else {
        setAbout("Invalid Date");
      }
    }

    // fetch user addresses
    const fetchAddrs = async () => {
      try {
        const list = await userService.getUserAddresses();
        setAddressList(list);
      } catch (e) {
        /* fallback  */
      }
    };
    fetchAddrs();

    //fetch user Orders
    const fetchOrders = async () => {
      try {
        const data = await userService.getMyOrders();

        const mappedOrders: OrderSummaryCardProps[] = data.map((o: any) => ({
          id: o.id.toString(),
          createdAt: new Date(o.createdAt).toLocaleDateString("ro-RO"), 
          total: o.total,
          currency: o.currency || "RON",
          photos:
            o.previewImages && o.previewImages.length > 0
              ? o.previewImages
              : undefined, 
        }));

        console.log(mappedOrders)

        setOrders(mappedOrders);
      } catch (e) {
        console.error("Failed to fetch orders", e);
      }
    };
    fetchOrders();

    // fetch reviews 
    fetchReviews();
  }, [user]);

  if (!user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleToggleAddresses = () => {
    setOpenAddresses(!openAddresses);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* User info top */}
      <Card
        sx={{
          p: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 120, height: 120 }}
        />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
            <Chip
              icon={<PermIdentityIcon />}
              label={roleType[user.role]}
              variant="outlined"
              sx={{
                mt: 1,
              }}
            />
          </Box>

          <Box
            display="flex"
            gap={2}
            mt={3}
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/account/edit")}
            >
              Settings
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={async (e) => {
                e.stopPropagation();
                navigate(ROUTES.HOME, { replace: true });
                try {
                  await userService.logout();
                  await logout();
                } catch (err) {
                  console.error("logout error", err);
                }
              }}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Collapsible sections */}
      <Box mt={4} width="100%">
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={handleToggleAddresses}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openAddresses ? "-" : "+"} My Addresses
          </Button>
          <Collapse in={openAddresses}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <AddressManager
                addresses={userAddresses}
                onAddAddress={openAddModal}
                onEditAddress={openEditModal}
                onDeleteAddress={deleteAddress}
                onSelectAddress={() => {}}
                selectedAddressId=""
                allowSelection={false}
              />
            </Box>
          </Collapse>
        </Box>
        {/* My Orders / Received Orders */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenOrders((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openOrders ? "-" : "+"}{" "}
            {/* {user.role === "user" ? "My Orders" : "Received Orders"} */}
            My Orders
          </Button>
          <Collapse in={openOrders}>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              {orders.length === 0 ? (
                <Typography>No orders yet.</Typography>
              ) : (
                <OrderGridComponent orders={orders}></OrderGridComponent>
              )}
            </Box>
          </Collapse>
        </Box>

        {/* My Reviews */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenReviews((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openReviews ? "-" : "+"} My Reviews
          </Button>
          <Collapse in={openReviews}>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              {userReviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                userReviews.map((review, idx) => (
                  <Card key={idx}>
                    <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">{review.title}</Typography>
                        <Typography variant="body2">{review.description}</Typography>
                        <Typography variant="caption">Product ID: {review.productId}</Typography>
                      </Box>
                      <Box display="flex" gap={1} alignItems="center">
                        <Button 
                          color="error" 
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this review?")) {
                              try {
                                await ReviewService.deleteReview(review.productId);
                                await fetchReviews(); 
                              } catch (e) {
                                alert("The review cannot be deleted.");
                              }
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Collapse>
        </Box>

        {/* My Returns */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenReturns((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openReturns ? "-" : "+"} My Returns
          </Button>
          <Collapse in={openReturns}>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              {returns.length === 0 ? (
                <Typography>No returns yet.</Typography>
              ) : (
                returns.map((ret, idx) => (
                  <Card key={idx}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography>{`Return #${idx + 1}`}</Typography>
                        <Typography>Items: {"N/A"}</Typography>
                        <Typography>Date: {"N/A"}</Typography>
                      </Box>
                      <Button variant="contained" size="small">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Collapse>
        </Box>

        {/* My Warranties */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenWarranties((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openWarranties ? "-" : "+"} My Warranties
          </Button>
          <Collapse in={openWarranties}>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              {warranties.length === 0 ? (
                <Typography>No warranties yet.</Typography>
              ) : (
                warranties.map((warranty, idx) => (
                  <Card key={idx}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography>{`Warranty #${idx + 1}`}</Typography>
                        <Typography>Valid until: {"N/A"}</Typography>
                      </Box>
                      <Button variant="contained" size="small">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Collapse>
        </Box>

        {/* About My Account */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenAbout((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openAbout ? "-" : "+"} About My Account
          </Button>
          <Collapse in={openAbout}>
            <Box mt={1} sx={{ pl: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                Account created at:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {about}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                Additional Information:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'gray' }}>
                No other information provided.
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </Box>

      <AddressFormDialog
        open={isModalOpen}
        onClose={closeModal}
        onSave={saveAddress}
        initialData={editingAddress}
        title={editingId ? "Edit Address" : "Add New Address"}
      />
    </Container>
  );
};
