import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { ROUTES } from "../../routes/routePaths";
import { Address } from "../../types/user/address";
import { AddressManager } from "../../components/common/AddressManager";

interface AddressData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const initialAddressState: AddressData = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export const CheckoutPage: React.FC = () => {
  const { cartProducts, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [selectedBillingId, setSelectedBillingId] = useState<string>("");
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [contactInfo, setContactInfo] = useState({ email: "" });
  const [billingData, setBillingData] =
    useState<AddressData>(initialAddressState);
  const [shippingData, setShippingData] =
    useState<AddressData>(initialAddressState);

  useEffect(() => {
    if (isAuthenticated) {
      const currentUser = userService.getCurrentUser();
      if (currentUser) {
        if (currentUser.addresses) setUserAddresses(currentUser.addresses);
        setContactInfo({ email: currentUser.email || "" });
        setBillingData((prev) => ({
          ...prev,
          fullName: currentUser.name || "",
          phone: currentUser.phone || "",
        }));
      }
    }
  }, [isAuthenticated]);

  const handleBillingSelect = (id: string) => {
    setSelectedBillingId(id);
    const addr = userAddresses.find((a) => a.id === id);
    if (addr) {
      const newBilling = {
        fullName: `${addr.firstName} ${addr.lastName}`,
        phone: addr.phoneNumber,
        address: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
      };
      setBillingData(newBilling);
      if (sameAsBilling) {
        setShippingData(newBilling);
        setSelectedShippingId(id);
      }
    }
  };

  const handleShippingSelect = (id: string) => {
    setSelectedShippingId(id);
    const addr = userAddresses.find((a) => a.id === id);
    if (addr) {
      setShippingData({
        fullName: `${addr.firstName} ${addr.lastName}`,
        phone: addr.phoneNumber,
        address: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);
    if (checked) {
      setShippingData(billingData);
      setSelectedShippingId(selectedBillingId);
    } else {
      setSelectedShippingId("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "billing" | "shipping" | "contact"
  ) => {
    const { name, value } = e.target;
    if (type === "contact") {
      setContactInfo((prev) => ({ ...prev, [name]: value }));
    } else if (type === "billing") {
      setBillingData((prev) => {
        const newData = { ...prev, [name]: value };
        if (sameAsBilling) setShippingData(newData);
        return newData;
      });
    } else {
      setShippingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalShippingData = sameAsBilling ? billingData : shippingData;
    const orderData = {
      contact: contactInfo,
      billingAddress: billingData,
      shippingAddress: finalShippingData,
      items: cartProducts.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: getCartTotal(),
      date: new Date().toISOString(),
    };
    console.log("Order Placed:", orderData);
    alert("Order placed successfully!");
    clearCart();
    navigate(ROUTES.HOME);
  };

  const total = getCartTotal();

  const renderAddressForm = (
    type: "billing" | "shipping",
    data: AddressData
  ) => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={(e: any) => handleInputChange(e, type)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          label="Phone number"
          name="phone"
          value={data.phone}
          onChange={(e: any) => handleInputChange(e, type)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={data.address}
          onChange={(e: any) => handleInputChange(e, type)}
          helperText="Street, Number, etc."
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={data.city}
          onChange={(e: any) => handleInputChange(e, type)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          label="Postal Code"
          name="postalCode"
          value={data.postalCode}
          onChange={(e: any) => handleInputChange(e, type)}
        />
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Checkout
      </Typography>

      {cartProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <form onSubmit={handleSubmit}>
              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  1. Contact Information
                </Typography>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e: any) => handleInputChange(e, "contact")}
                />
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  2. Billing Address
                </Typography>

                {!isAuthenticated && (
                  <Alert
                    severity="info"
                    sx={{ mb: 3 }}
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={() => navigate(ROUTES.LOGIN)}
                      >
                        Login
                      </Button>
                    }
                  >
                    Log in to use your saved addresses.
                  </Alert>
                )}

                {isAuthenticated && userAddresses.length > 0 && (
                  <Box mb={3}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Select saved address:
                    </Typography>
                    <AddressManager
                      addresses={userAddresses}
                      selectedAddressId={selectedBillingId}
                      onSelectAddress={handleBillingSelect}
                      allowSelection={true}
                      onAddAddress={() => {}}
                      onEditAddress={() => {}}
                      onDeleteAddress={() => {}}
                    />
                    <Divider sx={{ my: 2 }} />
                  </Box>
                )}
                {renderAddressForm("billing", billingData)}
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  flexWrap="wrap"
                >
                  <Typography variant="h6" fontWeight="bold">
                    3. Shipping Address
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sameAsBilling}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Same as Billing"
                  />
                </Box>

                {!sameAsBilling && (
                  <Box>
                    {!isAuthenticated && (
                      <Alert
                        severity="info"
                        sx={{ mb: 3 }}
                        action={
                          <Button
                            color="inherit"
                            size="small"
                            onClick={() => navigate(ROUTES.LOGIN)}
                          >
                            Login
                          </Button>
                        }
                      >
                        Log in to use your saved addresses.
                      </Alert>
                    )}

                    {isAuthenticated && userAddresses.length > 0 && (
                      <Box mb={3}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={1}
                        >
                          Select shipping address:
                        </Typography>
                        <AddressManager
                          addresses={userAddresses}
                          selectedAddressId={selectedShippingId}
                          onSelectAddress={handleShippingSelect}
                          allowSelection={true}
                          onAddAddress={() => {}}
                          onEditAddress={() => {}}
                          onDeleteAddress={() => {}}
                        />
                        <Divider sx={{ my: 2 }} />
                      </Box>
                    )}
                    {renderAddressForm("shipping", shippingData)}
                  </Box>
                )}
              </Paper>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 2, fontSize: "1.1rem", fontWeight: "bold" }}
              >
                Place Order ({total.toFixed(2)} RON)
              </Button>
            </form>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, position: "sticky", top: 102 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <List disablePadding>
                {cartProducts.map((item) => (
                  <React.Fragment key={item.product.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Qty: ${item.quantity} x ${item.product.price} RON`}
                      />
                      <Typography variant="body2" fontWeight="bold">
                        {(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}

                <ListItem sx={{ px: 0, mt: 2 }}>
                  <ListItemText
                    primary={<Typography variant="h6">Total</Typography>}
                  />
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {total.toFixed(2)} RON
                  </Typography>
                </ListItem>
              </List>
            </Paper>
            <Typography
              variant="caption"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              Scroll down to place order
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};