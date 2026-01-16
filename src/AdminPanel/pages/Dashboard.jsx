import React from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent 
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Dashboard = () => {
  // Demo data for statistics cards 
  const stats = [
    { title: "Total Sales", value: "$12,450", icon: <AttachMoneyIcon sx={{ color: '#2563eb' }} />, trend: "+12%" },
    { title: "New Orders", value: "48", icon: <ShoppingCartIcon sx={{ color: '#2563eb' }} />, trend: "+5%" },
    { title: "Total Users", value: "1,240", icon: <PeopleIcon sx={{ color: '#2563eb' }} />, trend: "+18%" },
    { title: "Out of Stock", value: "3", icon: <InventoryIcon sx={{ color: '#ef4444' }} />, trend: "-2" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#2563eb', mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="textSecondary" variant="overline" fontWeight="bold">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: stat.trend.includes('+') ? 'green' : 'red', fontWeight: 'bold' }}>
                      {stat.trend} <span style={{ color: 'gray', fontWeight: 'normal' }}>vs last month</span>
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)', p: 1, borderRadius: 2 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphic Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
            <Typography color="textSecondary">
              [ Here will be a sales chart or other graphical representation ]
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, minHeight: 300 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Recent Activities
            </Typography>
            {/* Demo Recent Activity Data */}
            <Box sx={{ borderLeft: '2px solid #2563eb', pl: 2, py: 1, mb: 2 }}>
              <Typography variant="body2" fontWeight="bold">New Order #4412</Typography>
              <Typography variant="caption" color="textSecondary">2 minutes ago</Typography>
            </Box>
            <Box sx={{ borderLeft: '2px solid #cbd5e1', pl: 2, py: 1 }}>
              <Typography variant="body2" fontWeight="bold">User "John Doe" registered</Typography>
              <Typography variant="caption" color="textSecondary">1 hour ago</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;