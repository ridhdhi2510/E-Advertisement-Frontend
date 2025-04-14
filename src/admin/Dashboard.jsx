import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#007bff", "#64b5f6", "#cfd8dc"];

const recentActivities = [
  { id: 1, text: "New booking by Alice Smith", time: "10 mins ago" },
  { id: 2, text: "Hoarding updated by Billboard Co", time: "25 mins ago" },
  { id: 3, text: "Payout processed to Ad Agency", time: "1 hour ago" },
  { id: 4, text: "New customer John Doe registered", time: "2 hours ago" },
  { id: 5, text: "Booking cancelled by Jane Doe", time: "5 hours ago" },
];

export default function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalHoardings: 0,
    totalBookings: 0,
    bookingsThisMonth: 0,
    topAgencies: [],
    topCustomers: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all hoardings count
        const hoardingsRes = await axios.get('http://localhost:3000/hording/getall');
        const totalHoardings = hoardingsRes.data.data.length;
        
        // Fetch all bookings count
        const bookingsRes = await axios.get('http://localhost:3000/booking/getall');
        const totalBookings = bookingsRes.data.data.length;
        
        // Calculate bookings this month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const bookingsThisMonth = bookingsRes.data.data.filter(booking => {
          const bookingDate = new Date(booking.startDate);
          return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
        }).length;
        
        // Get top agencies (users with most hoardings)
        const agenciesData = hoardingsRes.data.data.reduce((acc, hoarding) => {
          const userId = hoarding.userId?._id || 'unknown';
          if (!acc[userId]) {
            acc[userId] = {
              name: hoarding.userId?.name || `Agency ${userId.slice(0, 5)}`,
              value: 0
            };
          }
          acc[userId].value++;
          return acc;
        }, {});
        const topAgencies = Object.values(agenciesData)
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        
        // Get top customers (users with most bookings)
        const customersData = bookingsRes.data.data.reduce((acc, booking) => {
          const userId = booking.userId?._id || 'unknown';
          if (!acc[userId]) {
            acc[userId] = {
              name: booking.userId?.name || `Customer ${userId.slice(0, 5)}`,
              value: 0
            };
          }
          acc[userId].value++;
          return acc;
        }, {});
        const topCustomers = Object.values(customersData)
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        
        setStats({
          totalHoardings,
          totalBookings,
          bookingsThisMonth,
          topAgencies,
          topCustomers
        });
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        p: 3, 
        ml: { xs: '90px', sm: '220px' },
        backgroundColor: '#f5f7fa',
        minHeight: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      ml: { xs: '90px', sm: '220px' },
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      {/* Top Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { title: "Total Hoardings", value: stats.totalHoardings, color: "#1E2A47" },
          { title: "Total Bookings", value: stats.totalBookings, color: "#2E7D32" },
          { title: "Total Revenue", value: "$0", color: "#D32F2F" },
          { title: "Pending Approvals", value: 0, color: "#ED6C02" }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ 
              p: 2, 
              borderRadius: 2,
              borderLeft: `4px solid ${stat.color}`,
              height: '100%'
            }}>
              <Typography variant="subtitle1" color="textSecondary">{stat.title}</Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: stat.color }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Left Column - Recent Activities */}
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ 
            p: 2, 
            height: '100%',
            borderRadius: 2,
            minHeight: isMediumScreen ? 'auto' : 400
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Recent Activities
            </Typography>
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Monthly Stats */}
        <Grid item xs={12} md={4} lg={6}>
          <Grid container spacing={3}>
            {/* Monthly Bookings */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ 
                p: 2, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Bookings This Month
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  {stats.bookingsThisMonth}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {/* You can add comparison logic here later */}
                  Loading comparison...
                </Typography>
              </Paper>
            </Grid>

            {/* Monthly Revenue */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ 
                p: 2, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Revenue This Month
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  $0
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {/* You can add comparison logic here later */}
                  Loading comparison...
                </Typography>
              </Paper>
            </Grid>

            {/* Booking Status Chart */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ 
                p: 2, 
                borderRadius: 2,
                height: '100%'
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Booking Status
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: 100 }, // Placeholder - you can implement real status tracking later
                        { name: "Pending", value: 0 },
                        { name: "Cancelled", value: 0 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Row - Charts */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ 
            p: 2, 
            borderRadius: 2,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Top Agencies
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topAgencies}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#007bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ 
            p: 2, 
            borderRadius: 2,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Top Customers
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topCustomers}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4caf50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}