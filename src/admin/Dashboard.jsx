// admin/Dashboard.jsx
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Dummy Data – Replace with backend data via API calls
const hoardings = 120;
const bookings = 305;
const revenue = 12345;
const pendingPayouts = 3200;

const bookingStatusData = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["#007bff", "#64b5f6", "#cfd8dc"];

const agencyPerformance = [
  { name: "Jan", bookings: 5 },
  { name: "Feb", bookings: 10 },
  { name: "Mar", bookings: 15 },
  { name: "Apr", bookings: 20 },
  { name: "May", bookings: 25 },
  { name: "Jun", bookings: 35 },
];

const agencyComparison = [
  { name: "Agency A", value: 30 },
  { name: "Agency B", value: 25 },
  { name: "Agency C", value: 20 },
  { name: "Agency D", value: 15 },
  { name: "Agency E", value: 25 },
];

export default function Dashboard() {
  return (
    <Box p={3} sx={{ marginLeft: '240px' }}>
      <Grid container spacing={3}>
        {[["Total Hoardings", hoardings], ["Total Bookings", bookings], ["Revenue", `$${revenue}`], ["Pending Payouts", `$${pendingPayouts}`]].map(([title, value]) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h5" fontWeight="bold">{value}</Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Recent Activity</Typography>
            {/* Backend: Fetch recent activity logs */}
            <ul>
              <li>New booking by Alice Smith</li>
              <li>Hoarding updated by Billboard Co</li>
              <li>Payout processed to Ad Agency</li>
              <li>New customer John Doe</li>
              <li>Booking cancelled by Jane Doe</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Booking Status</Typography>
            {/* Backend: Fetch booking status summary */}
            <PieChart width={300} height={200}>
              <Pie
                data={bookingStatusData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
                dataKey="value"
              >
                {bookingStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Agency Performance</Typography>
            {/* Backend: Fetch performance stats by month */}
            <BarChart width={300} height={200} data={agencyPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#007bff" />
            </BarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Top Agencies</Typography>
            {/* Backend: Fetch agency comparison data */}
            <BarChart width={300} height={200} data={agencyComparison}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
