import React from "react";
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

// Dummy Data – Replace with backend data via API calls
const hoardings = 120;
const bookings = 305;
const revenue = 12345;
const pendingApprovals = 2;
const bookingsThisMonth = 10;
const revenueThisMonth = 3000;

const bookingStatusData = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["#007bff", "#64b5f6", "#cfd8dc"];

const agencyComparison = [
  { name: "Agency A", value: 30 },
  { name: "Agency B", value: 25 },
  { name: "Agency C", value: 20 },
  { name: "Agency D", value: 15 },
  { name: "Agency E", value: 25 },
];

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
          { title: "Total Hoardings", value: hoardings, color: "#1E2A47" },
          { title: "Total Bookings", value: bookings, color: "#2E7D32" },
          { title: "Total Revenue", value: `$${revenue}`, color: "#D32F2F" },
          { title: "Pending Approvals", value: pendingApprovals, color: "#ED6C02" }
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
                  {bookingsThisMonth}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  +12% from last month
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
                  ${revenueThisMonth}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  +8% from last month
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
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              <BarChart data={agencyComparison}>
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
              <BarChart data={agencyComparison}>
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