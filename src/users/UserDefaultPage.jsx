import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button,
  Avatar,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
  Container,
  Skeleton
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TvIcon from '@mui/icons-material/Tv';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";

const CustomerDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const [customerStats, setCustomerStats] = useState([
    { title: "Active Bookings", value: "0", icon: <EventAvailableIcon color="info" /> },
    { title: "Total Spent", value: "₹0", icon: <TrendingUpIcon color="success" /> }
  ]);
  const [loading, setLoading] = useState(true);
  let carouselRef = React.useRef(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const userId = localStorage.getItem("id");
        if (!userId) return;

        // Fetch user's bookings
        const response = await axios.get(`/booking/getBookingByUserId/${userId}`);
        const bookings = response.data.data || [];

        // Calculate active bookings (bookings that haven't ended yet)
        const today = new Date();
        const activeBookings = bookings.filter(booking => {
          const endDate = new Date(booking.endDate);
          return endDate >= today;
        });

        // Calculate total spent
        const totalSpent = bookings.reduce((sum, booking) => {
          return sum + (booking.totalCost || 0);
        }, 0);

        // Update stats
        setCustomerStats([
          { title: "Active Bookings", value: activeBookings.length.toString(), icon: <EventAvailableIcon color="info" /> },
          { title: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: <TrendingUpIcon color="success" /> }
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  // Sample featured hoardings data
  const featuredHoardings = [
    { 
      id: 1, 
      name: "Times Square Digital", 
      location: "New York", 
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "$5,000/week",
      bookings: 42,
      size: "20ft x 30ft"
    },
    { 
      id: 2, 
      name: "Piccadilly Lights", 
      location: "London", 
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "$4,200/week",
      bookings: 38,
      size: "15ft x 25ft"
    },
    { 
      id: 3, 
      name: "Shibuya Scramble", 
      location: "Tokyo", 
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80",
      price: "$3,800/week",
      bookings: 35,
      size: "18ft x 28ft"
    }
  ];

  return (
    <Container 
      sx={{
      overflowX: 'hidden',
      width: {
        xs:350,
        sm:500,
        md:700,
        lg:900,
        xl:1000
      },
      marginLeft: 0
    }}>
      {/* Welcome Section */}
      <Box sx={{ mb: isMobile ? 2 : 4 }}>
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and book the best hoarding locations for your ads
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
        {customerStats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper elevation={3} sx={{ 
              p: isMobile ? 2 : 3, 
              borderRadius: 2,
              height: '100%'
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
                <Box>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                    {stat.title}
                  </Typography>
                  {loading ? (
                    <Skeleton variant="text" width={100} height={40} />
                  ) : (
                    <Typography variant={isMobile ? "h5" : "h4"}>{stat.value}</Typography>
                  )}
                </Box>
                <Avatar sx={{ 
                  bgcolor: 'action.hover', 
                  width: isMobile ? 40 : 56, 
                  height: isMobile ? 40 : 56 
                }}>
                  {stat.icon}
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 3, 
        borderRadius: 2, 
        mb: isMobile ? 2 : 4,
        width: '100%'
      }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ py: isMobile ? 1 : 2 }}
              onClick={() => window.location.href = '/customer/bookhording'}
            >
              Book New Hoarding
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ py: isMobile ? 1 : 2 }}
              onClick={() => window.location.href = '/customer/mybookings'}
            >
              View My Bookings
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ py: isMobile ? 1 : 2 }}
              onClick={() => window.location.href = '/customer/paymentdetails'}
            >
              Payment History
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Hoardings Carousel */}
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 3, 
        borderRadius: 2, 
        mb: isMobile ? 2 : 4,
        width: '100%',
        overflow: 'hidden'
      }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ mb: 2 }}>
          Featured Hoardings
        </Typography>
        
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '100%'
        }}>
          <OwlCarousel
          ref={carouselRef}
          className="owl-theme"
          loop
          margin={isMobile ? 10 : 20}
          autoplay
          autoplayTimeout={4000}
          autoplaySpeed={1000}
          autoplayHoverPause={true}
          smartSpeed={1000}
          nav={false}
          responsive={{
            0: { items: 1 },
            450: { items: 1 },
            600: { items: 2 },
            960: { items: 2 },
            1280: { items: 3 }
          }}

            // ref={carouselRef}
            // className="owl-theme"
            // loop
            // margin={isMobile ? 10 : 20}
            // autoplay
            // autoplayTimeout={4000}
            // autoplaySpeed={1000}
            // autoplayHoverPause={true}
            // smartSpeed={1000}
            // nav={false}
            // responsive={{
            //   0: { items: 1 },
            //   600: { items: 2 },
            //   960: { items: 2 },
            //   1280: { items: 3 }
            // }}
          >
            {featuredHoardings.map((hoarding) => (
              <Card
                key={hoarding.id}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  mx: isMobile ? 1 : 2,
                  maxWidth: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => window.location.href = '/customer/bookhording'}
              >
                <Box sx={{ 
                  position: 'relative', 
                  height: isMobile ? 150 : 200,
                  width: '100%'
                }}>
                  <img
                    src={hoarding.image}
                    alt={hoarding.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      maxWidth: '100%'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    p: 1,
                    pl: 2
                  }}>
                    <Typography variant={isMobile ? "body1" : "h6"}>
                      {hoarding.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnIcon fontSize="small" />
                      <Typography variant="body2">
                        {hoarding.location}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: isMobile ? 1 : 2,
                  width: '100%'
                }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Price
                      </Typography>
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        {hoarding.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Size
                      </Typography>
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        {hoarding.size}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </OwlCarousel>

          {/* Navigation Arrows */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: 3,
            gap: isMobile ? 2 : 4,
            width: '100%'
          }}>
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              startIcon={<ArrowBackIosIcon fontSize={isMobile ? "small" : "medium"} />}
              onClick={() => carouselRef.current.prev()}
            >
              {!isMobile && "Prev"}
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              endIcon={<ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />}
              onClick={() => window.location.href = '/customer/bookhording'}
            >
              View All
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              endIcon={<ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />}
              onClick={() => carouselRef.current.next()}
            >
              {!isMobile && "Next"}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Help Section */}
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 3, 
        borderRadius: 2,
        width: '100%'
      }}>
        <Stack direction={isMobile ? "column" : "row"} 
          spacing={isMobile ? 1 : 2} 
          alignItems={isMobile ? "flex-start" : "center"}
        >
          <Avatar sx={{ 
            bgcolor: 'secondary.light',
            width: isMobile ? 36 : 48,
            height: isMobile ? 36 : 48
          }}>
            <HelpOutlineIcon fontSize={isMobile ? "small" : "medium"} color="secondary" />
          </Avatar>
          <Box sx={{ width: '100%' }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Need Help With Booking?
            </Typography>
            <Typography variant={isMobile ? "caption" : "body1"} color="text.secondary" sx={{ mb: 1 }}>
              Our support team is available 24/7 to assist you
            </Typography>
            <Button 
              variant="outlined" 
              color="secondary"
              size={isMobile ? "small" : "medium"}
              fullWidth={isMobile}
            >
              Contact Support
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CustomerDashboard;