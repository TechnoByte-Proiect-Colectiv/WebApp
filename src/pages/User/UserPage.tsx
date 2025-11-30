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
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { ROUTES } from "../../routes/routePaths";
import { useAuth } from "../../context/AuthContext";
import { Address } from "../../types/user/address";
import { AddressManager } from "../../components/common/AddressManager";

export const UserPage: React.FC = () => {
  const user = userService.getCurrentUser();

  const orders: [] = [];
  const reviews: [] = [];
  const returns: [] = [];
  const warranties: [] = [];
  const about = "No information provided.";

  const [openOrders, setOpenOrders] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [openReturns, setOpenReturns] = useState(false);
  const [openWarranties, setOpenWarranties] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openAddresses, setOpenAddresses] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);

  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    if (user && user.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const handleAddAddress = () => {
    alert("TODO: Add Address");
  };

  const handleEditAddress = (addr: Address) => {
    console.log("Edit address", addr);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
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
              onClick={(e) => {
                e.stopPropagation();
                logout();
                userService.logout();
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
            onClick={() => setOpenAddresses((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openAddresses ? "-" : "+"} My Addresses
          </Button>
          <Collapse in={openAddresses}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <AddressManager
                addresses={addresses}
                onAddAddress={handleAddAddress}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
                onSelectAddress={() => {}}
                selectedAddressId=""
                allowSelection={false} 
              />
            </Box>
          </Collapse>
        </Box>
        {/* My Orders */}
        <Box mb={2} sx={{ borderTop: "1px solid #ccc", pt: 1 }}>
          <Button
            onClick={() => setOpenOrders((prev) => !prev)}
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {openOrders ? "-" : "+"} My Orders
          </Button>
          <Collapse in={openOrders}>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              {orders.length === 0 ? (
                <Typography>No orders yet.</Typography>
              ) : (
                orders.map((order, idx) => (
                  <Card key={idx}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography>Order #{idx + 1}</Typography>
                        <Typography variant="subtitle2">
                          Items: {"N/A"}
                        </Typography>
                        <Typography variant="subtitle2">
                          Date: {"N/A"}
                        </Typography>
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
              {reviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                reviews.map((review, idx) => (
                  <Card key={idx}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography>{`Review #${idx + 1}`}</Typography>
                        <Typography>{`Created At: N/A`}</Typography>
                      </Box>
                      <Box display="flex" gap={1}>
                        <Button variant="outlined" size="small" color="primary">
                          Edit
                        </Button>
                        <Button variant="outlined" size="small" color="error">
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
            <Box mt={1}>
              <Typography>{about}</Typography>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
};
