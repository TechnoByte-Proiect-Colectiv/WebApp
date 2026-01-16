import React, { useState, useEffect } from "react";
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem, TextField, CircularProgress,
  IconButton, Box, Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

interface Order {
  id: number | string;
  userEmail: string;
  totalAmount: number;
  orderStatus: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
}

const API_BASE_URL = "http://localhost:8080/api/order";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setOrders([]); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(`${API_BASE_URL}/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: newStatus
        }),
      });

      if (response.ok) {
        setOpen(false);
        loadOrders(); 
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status: Order['orderStatus']) => {
    switch (status) {
      case "PENDING": return { color: "warning" as const, label: "Pending" };
      case "IN_PROGRESS": return { color: "info" as const, label: "In Progress" };
      case "DELIVERED": return { color: "success" as const, label: "Delivered" };
      default: return { color: "default" as const, label: status };
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#2563eb' }}>
          Order Management
        </Typography>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "#263238" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Order ID</TableCell>
                <TableCell sx={{ color: "white" }}>Customer Email</TableCell>
                <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const statusInfo = getStatusStyle(order.orderStatus);
                return (
                  <TableRow key={order.id} hover>
                    <TableCell>
                       <Box display="flex" alignItems="center">
                          <ShoppingBagIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          #{order.id}
                       </Box>
                    </TableCell>
                    <TableCell>{order.userEmail || "Guest"}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {order.totalAmount} RON
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={statusInfo.label} 
                        color={statusInfo.color} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditClick(order)} sx={{ color: '#2563eb' }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" mb={2}>
            Change status for Order <strong>#{selectedOrder?.id}</strong>
          </Typography>
          <TextField
            select
            fullWidth
            label="Order Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button 
            onClick={handleUpdateStatus} 
            variant="contained" 
            sx={{ backgroundColor: '#2563eb' }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders;