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
  } from "@mui/material";
  import React, { useState } from "react";
  import { useCart } from "../../context/CartContext";
  
  export const CheckoutPage: React.FC = () => {
    const { cartProducts, getCartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 

      const orderData = {
        customerDetails: formData,
        items: cartProducts.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          pricePerUnit: item.product.price,
        })),
        totalAmount: getCartTotal(),
        orderDate: new Date().toISOString(),
      };
  
      console.log("object to send", JSON.stringify(orderData, null, 2));
  
      alert("Comanda a fost plasată cu succes!");
      clearCart(); 
    };
  
    const total = getCartTotal();
  
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
            fontWeight: "bold"
        }}>
          Finish order
        </Typography>
        
        {cartProducts.length === 0 ? (
          <Typography variant="h6" align="center">
            No products in cart to finish order.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            <Grid size={{xs:12, md:7}}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Delivery and contact data
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        required
                        fullWidth
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <TextField
                        required
                        fullWidth
                        id="address"
                        name="address"
                        label="Address (street, No. etc.)"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        required
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        required
                        fullWidth
                        id="postalCode"
                        name="postalCode"
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Place order
                  </Button>
                </Box>
              </Paper>
            </Grid>
  
            <Grid size={{xs:12, md:5}}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List disablePadding>
                  {cartProducts.map((item) => (
                    <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        {(item.product.price * item.quantity).toFixed(2)} RON
                      </Typography>
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {total.toFixed(2)} RON
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  };