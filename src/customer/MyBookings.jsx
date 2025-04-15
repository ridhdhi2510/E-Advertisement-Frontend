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
  Chip,
  Paper,
  Stack,
  useTheme,
  Fade,
  Grow,
  Skeleton,
  Tooltip,
  Badge
} from "@mui/material";
import {
  ArrowBack,
  EventNote,
  CalendarToday,
  Paid,
  LocationOn,
  Description,
  Image,
  Videocam,
  Receipt,
  Star,
  Share,
  Download,
   Refresh

  

} from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const ViewBooking = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [state, setState] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const id = localStorage.getItem("id");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const response = await axios.get(`/booking/getBookingByUserId/${id}`);
        setBookings(response.data.data);
        console.log("bookings:",response.data)
        // Fetch all location data
        const [statesRes, citiesRes, areasRes] = await Promise.all([
          axios.get(`/state/getall`),
          axios.get(`/city/getall`),
          axios.get(`/area/getall`)
        ]);
        
        setState(statesRes.data.data);
        setCities(citiesRes.data.data);
        setAreas(areasRes.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load booking details");
        setLoading(false);
      }
    };
    

    fetchBookings();
  }, [id]);
   
  const handleBack = () => navigate(-1);
  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);
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
  const getLocationString = (booking) => {
    const bookingState = state.find(s => s._id === booking.hordingId?.stateId);
    const bookingCity = cities.find(c => c._id === booking.hordingId?.cityId);
    const bookingArea = areas.find(a => a._id === booking.hordingId?.areaId);
    
    return [
      bookingState?.name || 'Unknown State',
      bookingCity?.name || 'Unknown City',
      bookingArea?.name || 'Unknown Area'
    ].filter(Boolean).join(', ');
  };
  const handleDeleteBooking = async (bookingId) => {
    try {
      // Confirm before deleting
      if (!window.confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
        return;
      }

      // Show loading state
      setLoading(true);

      // Call the delete API endpoint
      await axios.delete(`/booking/deleteBooking/${bookingId}`);
      //loader
      
      // Remove the deleted booking from state
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      
      // Show success notification
      alert("Booking deleted successfully! Check your mail for Cancellation Refund Information");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(`Failed to delete booking: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
   
  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Stack spacing={2} alignItems="center">
            <Skeleton variant="circular" width={80} height={80} animation="wave" />
            <Skeleton variant="text" width={200} height={40} animation="wave" />
            <Skeleton variant="rectangular" width={300} height={100} animation="wave" />
          </Stack>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">

          

          <Card sx={{ 
            p: 4, 

            textAlign: 'center',
            animation: `${fadeIn} 0.5s ease-out`,
            borderLeft: `4px solid ${theme.palette.error.main}`
          }}>
            <Typography variant="h6" color="error" gutterBottom>
              Error Loading Bookings
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{error}</Typography>

            <Button 
              variant="contained" 

              color="error"
              onClick={() => window.location.reload()}
              startIcon={<Refresh />}
            >
              Try Again
            </Button>
          </Card>
        </Box>
      </Container>
    );
  }
  

  if (!bookings.length) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Tooltip title="Go back">

            <IconButton 

              onClick={handleBack}
              sx={{
                mr: 2,
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }
              }}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>

          <Typography variant="h4" component="h1" sx={{ 

            fontWeight: 800,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            My Bookings
          </Typography>
        </Box>

        
        <Fade in timeout={800}>
          <Card sx={{ 

            textAlign: 'center',
            p: 6,
            mt: 4,
            borderRadius: 4,
            maxWidth: 600,
            mx: 'auto',

            background: theme.palette.mode === 'dark' 

              ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
              : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: theme.palette.primary.light,
              opacity: 0.2
            }
          }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.light',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'primary.contrastText',
                boxShadow: `0 5px 15px ${theme.palette.primary.light}`
              }}
            >
              <EventNote sx={{ fontSize: 60 }} />
            </Box>

            
            <Typography variant="h4" gutterBottom sx={{ 

              fontWeight: 700,
              mb: 2
            }}>
              No Bookings Found
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ 

              mb: 4,
              maxWidth: 400,
              mx: 'auto'
            }}>
              You haven't made any bookings yet. Explore our premium hoardings and start your advertising journey today!
            </Typography>
            

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/customer/bookhording')}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: `0 4px 20px ${theme.palette.primary.light}`,
                '&:hover': {
                  animation: `${pulse} 1s infinite`
                }
              }}
              endIcon={<Star />}
            >
              Discover Premium Hoardings
            </Button>
          </Card>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box display="flex" alignItems="center" mb={6}>
        <Tooltip title="Go back">
          <IconButton 

            onClick={handleBack}
            sx={{
              mr: 3,
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateX(-5px)',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>

        <Typography variant="h3" component="h1" sx={{ 

          fontWeight: 800,
          letterSpacing: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 80,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: 2
          }
        }}>
          My Bookings
        </Typography>
      </Box>

      <Grid container spacing={5}>
        {bookings.map((booking, index) => (
          <Grow in timeout={index * 200 + 500} key={booking._id}>
            <Grid item xs={12}>

              <Card sx={{ 

                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                boxShadow: `0 5px 15px rgba(0,0,0,0.1)`,
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 15px 35px rgba(0,0,0,0.2)`
                },
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 4,
                  height: '100%',
                  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                }
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Grid container>
                    {/* Left: Hoarding Image */}
                    <Grid item xs={12} md={5}>
                      <Box sx={{
                        height: '100%',
                        minHeight: 300,
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${booking.hordingId?.hordingURL})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.5s',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }} />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          p: 3,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          color: 'white'
                        }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                            <Box>

                              <Typography variant="h5" sx={{ 

                                fontWeight: 700,
                                textShadow: '0 2px 5px rgba(0,0,0,0.5)'
                              }}>
                                {booking.hordingId?.hoardingType}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <LocationOn fontSize="small" />
                                <Typography variant="body2">
                                {getLocationString(booking)}
                                </Typography>
                              </Stack>
                            </Box>
                            <Badge
                              color={getStatusColor(booking.status)}
                              badgeContent={booking.status}
                              sx={{
                                '& .MuiBadge-badge': {
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  padding: '4px 8px',
                                  borderRadius: 12,
                                  textTransform: 'uppercase'
                                }
                              }}
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Right: Booking Details */}
                    <Grid item xs={12} md={7}>
                      <Box sx={{ p: 4 }}>
                        <Stack spacing={3}>
                          {/* Booking Summary */}
                          <Box>

                            <Typography variant="h6" sx={{ 

                              fontWeight: 700,
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <Receipt color="primary" sx={{ mr: 1 }} />
                              Booking Summary
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">Booking ID</Typography>
                                <Tooltip title={booking._id}>

                                  <Typography variant="body2" sx={{ 

                                    fontWeight: 500,
                                    wordBreak: 'break-all',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}>
                                    {booking._id}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">Booking Date</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {formatDate(booking.createdAt)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">Duration</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {dayjs(booking.endDate).diff(dayjs(booking.startDate), 'day')} days
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">Start Date</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {formatDate(booking.startDate)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">End Date</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {formatDate(booking.endDate)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="caption" color="text.secondary">Total Cost</Typography>

                                <Typography variant="body2" sx={{ 

                                  fontWeight: 700,
                                  color: theme.palette.primary.main
                                }}>
                                  ₹{booking.totalCost?.toLocaleString()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>

                          {/* Ad Details */}
                          <Box>

                            <Typography variant="h6" sx={{ 

                              fontWeight: 700,
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <Description color="primary" sx={{ mr: 1 }} />
                              Ad Campaign Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">Ad Name</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {booking.adName || 'Not specified'}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">Description</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {booking.adDescription || 'Not provided'}
                                </Typography>
                              </Grid>
                              {booking.websiteProductUrl && (
                                <Grid item xs={12}>
                                  <Typography variant="caption" color="text.secondary">Website URL</Typography>
                                  <Typography variant="body2">
                                    <Button
                                      href={booking.websiteProductUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      size="small"
                                      sx={{
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        color: theme.palette.primary.main,
                                        '&:hover': {
                                          textDecoration: 'underline'
                                        }
                                      }}
                                      startIcon={<Share fontSize="small" />}
                                    >
                                      {booking.websiteProductUrl}
                                    </Button>
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </Box>

                          {/* Ad Content */}
                          {booking.adFile && (
                            <Box>

                              <Typography variant="h6" sx={{ 

                                fontWeight: 700,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}>
                                {booking.adFile.startsWith("data:image") ? (
                                  <Image color="primary" sx={{ mr: 1 }} />
                                ) : (
                                  <Videocam color="primary" sx={{ mr: 1 }} />
                                )}
                                Ad Content
                              </Typography>
                              {booking.adFile.startsWith("data:image") ? (
                                <Box sx={{
                                  maxWidth: '100%',
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  border: `1px solid ${theme.palette.divider}`,
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                  <img
                                    src={booking.adFile}
                                    alt="Ad Content"

                                    style={{ 

                                      width: '100%',
                                      display: 'block'
                                    }}
                                  />
                                </Box>
                              ) : (
                                <Button
                                  variant="outlined"
                                  size="large"
                                  startIcon={<Download />}
                                  onClick={() => window.open(booking.adFile, '_blank')}
                                  sx={{
                                    borderRadius: 2,
                                    fontWeight: 600
                                  }}
                                >
                                  View AD Content
                                </Button>
                              )}
                            </Box>
                          )}

                          
                        </Stack>

                        {/* Action Buttons */}
                        <Box sx={{ 

                          mt: 4,
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2
                        }}>

                          

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteBooking(booking._id)}
                            sx={{
                              borderRadius: 2,
                              fontWeight: 600,
                              boxShadow: `0 4px 12px ${theme.palette.primary.light}`
                            }}
                          >
                            Delete booking
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewBooking;