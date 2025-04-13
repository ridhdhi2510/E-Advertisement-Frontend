import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
  Chip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import dayjs from "dayjs";

const ViewBooking = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/booking/getBookingByUserId/${id}`);
        setBookings(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load booking details");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => dayjs(dateString).format("DD MMM YYYY");

  const getStatusColor = (status) => {
    const statusString = status?.toString()?.toLowerCase() || "unknown";
    switch (statusString) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "error";
      case "completed": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h6">Loading bookings...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!bookings.length) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h6">No bookings found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">My Bookings</Typography>
      </Box>

      <Grid container spacing={4}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  {/* Left: Hoarding Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {booking.hordingId?.hoardingType}
                    </Typography>

                    <Box sx={{ my: 1 }}>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>

                    <Box sx={{ height: 200, mb: 2, overflow: "hidden", borderRadius: 2 }}>
                      <img
                        src={booking.hordingId?.hordingURL}
                        alt="Hoarding"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">Location</Typography>
                    <Typography variant="body1">
                      {booking.hordingId?.areaId?.name}, {booking.hordingId?.cityId?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>Total Cost</Typography>
                    <Typography variant="h6" color="primary">
                      ₹{booking.totalCost}
                    </Typography>
                  </Grid>

                  {/* Right: Booking Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Booking ID</Typography>
                    <Typography variant="body1">{booking._id}</Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>Booking Date</Typography>
                    <Typography variant="body1">{formatDate(booking.createdAt)}</Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>Start Date</Typography>
                    <Typography variant="body1">{formatDate(booking.startDate)}</Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>End Date</Typography>
                    <Typography variant="body1">{formatDate(booking.endDate)}</Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">Ad Name</Typography>
                    <Typography variant="body1">{booking.adName}</Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>Description</Typography>
                    <Typography variant="body1">{booking.adDescription}</Typography>

                    {booking.websiteProductUrl && (
                      <>
                        <Typography variant="body2" color="text.secondary" mt={1}>Website URL</Typography>
                        <Typography variant="body1">
                          <a href={booking.websiteProductUrl} target="_blank" rel="noopener noreferrer">
                            {booking.websiteProductUrl}
                          </a>
                        </Typography>
                      </>
                    )}

                    {booking.adFile && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">Ad Content Preview</Typography>
                        {booking.adFile.startsWith("data:image") ? (
                          <img
                            src={booking.adFile}
                            alt="Ad Content"
                            style={{ maxWidth: "100%", maxHeight: 150, borderRadius: 4 }}
                          />
                        ) : (
                          <Typography variant="body2">
                            Video content - <a href={booking.adFile} target="_blank" rel="noopener noreferrer">View</a>
                          </Typography>
                        )}
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Payment Info</Typography>
                    {booking.paymentId ? (
                      <Box>
                        <Typography variant="body2" color="text.secondary">Status</Typography>
                        <Typography variant="body1">{booking.paymentId.paymentStatus}</Typography>

                        <Typography variant="body2" color="text.secondary" mt={1}>Transaction ID</Typography>
                        <Typography variant="body1">{booking.paymentId.transactionId}</Typography>

                        <Typography variant="body2" color="text.secondary" mt={1}>Amount Paid</Typography>
                        <Typography variant="body1">₹{booking.paymentId.amount}</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Payment info not available
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewBooking;
