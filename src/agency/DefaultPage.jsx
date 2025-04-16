import React, { useEffect, useState } from "react";
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
  useMediaQuery,
  useTheme,
  Container,
  Skeleton,
  alpha
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TvIcon from '@mui/icons-material/Tv';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import axios from "axios";
import CustomLoader from "../component/CustomLoader";
import dayjs from "dayjs";

const DefaultPage = () => {
  const [hoardings, setHoardings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [totalScreens, setTotalScreens] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  let carouselRef = React.useRef(null);
  const drawerWidth = 220

  // Enhanced responsive value calculator
  const getValue = (values) => {
    if (isXs) return values.xs;
    if (isSm) return values.sm || values.xs;
    if (isMd) return values.md || values.sm || values.xs;
    if (isLg) return values.lg || values.md || values.sm || values.xs;
    return values.xl || values.lg || values.md || values.sm || values.xs;
  };

  const formatDate = (dateString) => dayjs(dateString).format("DD MMM YYYY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setStatsLoading(true);
        const userId = localStorage.getItem("id");
        
        const hoardingsRes = await axios.get(`/hording/getHordingsbyuserid/${userId}`);
        setHoardings(hoardingsRes.data?.data || []);
        setTotalScreens(hoardingsRes.data?.data?.length || 0);

        const bookingsRes = await axios.get(`/booking/getBookingByUserId/${userId}`);
        const bookings = bookingsRes.data?.data || [];
        
        const today = new Date();
        const active = bookings.filter(booking => {
          const endDate = new Date(booking.endDate);
          return endDate >= today;
        }).length;
        
        setActiveBookings(active);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHoardings([]);
        setTotalScreens(0);
        setActiveBookings(0);
      } finally {
        setIsLoading(false);
        setStatsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <CustomLoader />}
      <Container
  maxWidth={false}
  disableGutters
  sx={{
    boxSizing: 'border-box',
    width: '75vw',
    maxWidth: '75vw',
    mr: 0,
    px: getValue({ xs: 2, sm: 3, md: 4 }),
    overflowX: 'hidden',
    minHeight: '100vh',
    mx: 'auto', // this centers the layout
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`
  }}
>


        {/* Welcome Section */}
        <Box sx={{ 
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          mb: getValue({ xs: 2, sm: 3, md: 4 }),
          // maxWidth: getValue({ xs: '100%', sm: '90%', md: '80%', lg: '70%' })
        }}>
          <Typography 
            variant={getValue({ xs: "h5", sm: "h4", md: "h3" })}
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: getValue({ xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' }),
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              lineHeight: 1.2
            }}
          >
            Welcome to Your Agency Dashboard
          </Typography>
          <Typography 
            variant={getValue({ xs: "body2", sm: "body1", md: "h6" })}
            color="text.secondary"
            sx={{ 
              lineHeight: 1.5,
              fontWeight: 500,
              fontSize: getValue({ xs: '0.875rem', sm: '1rem', md: '1.1rem' }),
            }}
          >
            {hoardings.length > 0 
              ? "Manage your hoarding screens and view your active bookings" 
              : "Add your first digital hoarding screen to get started"}
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid 
          container 
          spacing={getValue({ xs: 2, sm: 3 })}
          sx={{ 
            mb: getValue({ xs: 3, sm: 4 }),
            justifyContent: 'center'
          }}
        >
          {/* Active Bookings Card */}
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: getValue({ xs: 1.5, sm: 2, md: 2.5 }),
                borderRadius: 3,
                height: '100%',
                background: theme.palette.mode === 'light' 
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
                  : alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography 
                    variant={getValue({ xs: "caption", sm: "subtitle2" })}
                    color="text.secondary"
                    sx={{ 
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontWeight: 500
                    }}
                  >
                    Active Bookings
                  </Typography>
                  {statsLoading ? (
                    <Skeleton 
                      variant="text" 
                      width={getValue({ xs: 80, sm: 100, md: 120 })}
                      height={getValue({ xs: 36, sm: 44, md: 52 })}
                    />
                  ) : (
                    <Typography 
                      variant={getValue({ xs: "h5", sm: "h4", md: "h3" })}
                      sx={{ 
                        fontSize: getValue({ xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' }),
                        fontWeight: 700,
                        mt: 0.5
                      }}
                    >
                      {activeBookings}
                    </Typography>
                  )}
                </Box>
                
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: getValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
                    height: getValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
                    '& svg': {
                      fontSize: getValue({ xs: 20, sm: 24, md: 28, lg: 32 }),
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  <EventAvailableIcon />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>

          {/* Total Screens Card */}
          <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: getValue({ xs: 1.5, sm: 2, md: 2.5 }),
                borderRadius: 3,
                height: '100%',
                background: theme.palette.mode === 'light' 
                  ? `linear-gradient(135deg, ${alpha(theme.palette.info.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
                  : alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.info.main, 0.05)}`,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.info.main, 0.1)}`
                }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography 
                    variant={getValue({ xs: "caption", sm: "subtitle2" })}
                    color="text.secondary"
                    sx={{ 
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontWeight: 500
                    }}
                  >
                    Total Screens
                  </Typography>
                  {statsLoading ? (
                    <Skeleton 
                      variant="text" 
                      width={getValue({ xs: 80, sm: 100, md: 120 })}
                      height={getValue({ xs: 36, sm: 44, md: 52 })}
                    />
                  ) : (
                    <Typography 
                      variant={getValue({ xs: "h5", sm: "h4", md: "h3" })}
                      sx={{ 
                        fontSize: getValue({ xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' }),
                        fontWeight: 700,
                        mt: 0.5
                      }}
                    >
                      {totalScreens}
                    </Typography>
                  )}
                </Box>
                
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    width: getValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
                    height: getValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
                    '& svg': {
                      fontSize: getValue({ xs: 20, sm: 24, md: 28, lg: 32 }),
                      color: theme.palette.info.main
                    }
                  }}
                >
                  <TvIcon />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper 
          elevation={0}
          sx={{ 
            p: getValue({ xs: 2, sm: 2.5, md: 3 }),
            borderRadius: 3, 
            mb: getValue({ xs: 3, sm: 4 }),
            width: '100%',
            background: theme.palette.mode === 'light' 
              ? alpha(theme.palette.background.paper, 0.9)
              : alpha(theme.palette.background.paper, 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`
          }}
        >
          <Typography 
            variant={getValue({ xs: "h6", sm: "h5", md: "h4" })}
            gutterBottom
            sx={{ 
              fontSize: getValue({ xs: '1.1rem', sm: '1.3rem', md: '1.5rem', lg: '1.75rem' }),
              fontWeight: 600,
              mb: getValue({ xs: 1.5, sm: 2 })
            }}
          >
            Quick Actions
          </Typography>
          <Grid 
            container  
            spacing={getValue({ xs: 1.5, sm: 2 })}
            sx={{
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}
          >
            <Grid item xs={12} sm={6} md={4} sx={{ boxSizing: 'border-box', maxWidth: '100%' }}>

              <Button 
                variant="contained" 
                fullWidth
                size={getValue({ xs: "small", sm: "medium", md: "large" })}
                sx={{ 
                  py: getValue({ xs: 1, sm: 1.25, md: 1.5 }),
                  borderRadius: 2,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  fontSize: getValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                  },
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onClick={() => window.location.href = '/agency/addscreen'}
              >
                Add New Hoarding
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ boxSizing: 'border-box', maxWidth: '100%' }}>

              <Button 
                variant="outlined" 
                fullWidth
                size={getValue({ xs: "small", sm: "medium", md: "large" })}
                sx={{ 
                  py: getValue({ xs: 1, sm: 1.25, md: 1.5 }),
                  borderRadius: 2,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  fontSize: getValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                  },
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onClick={() => window.location.href = '/agency/update'}
              >
                Update Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ boxSizing: 'border-box', maxWidth: '100%' }}>

              <Button 
                variant="outlined" 
                fullWidth
                size={getValue({ xs: "small", sm: "medium", md: "large" })}
                sx={{ 
                  py: getValue({ xs: 1, sm: 1.25, md: 1.5 }),
                  borderRadius: 2,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  fontSize: getValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                  },
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onClick={() => window.location.href = '/agency/bookings'}
              >
                View Bookings
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Hoardings Carousel */}
        <Paper 
          elevation={0}
          sx={{ 
            p: getValue({ xs: 2, sm: 2.5, md: 3 }),
            borderRadius: 3, 
            mb: getValue({ xs: 3, sm: 4 }),
            width: '100%',
            overflow: 'hidden',
            background: theme.palette.mode === 'light' 
              ? alpha(theme.palette.background.paper, 0.9)
              : alpha(theme.palette.background.paper, 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`
          }}
        >
          <Typography 
            variant={getValue({ xs: "h6", sm: "h5", md: "h4" })}
            gutterBottom 
            sx={{ 
              fontSize: getValue({ xs: '1.1rem', sm: '1.3rem', md: '1.5rem', lg: '1.75rem' }),
              mb: getValue({ xs: 1.5, sm: 2 }),
              fontWeight: 600
            }}
          >
            {hoardings.length > 0 ? "Your Hoarding Screens" : "Featured Hoardings"}
          </Typography>
          
          <Box className="owl-stage-outer"  sx={{ 
    width: '100%',
    maxWidth: '100vw', // limit max expansion
    overflowX: 'hidden',
    boxSizing: 'border-box',
    mx: 'auto',
  }}>

            {hoardings.length === 0 ? (
              <Box 
                textAlign="center" 
                py={getValue({ xs: 3, sm: 4, md: 5 })}
                sx={{
                  background: alpha(theme.palette.primary.light, 0.05),
                  borderRadius: 2,
                  border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`
                }}
              >
                <TvIcon sx={{ 
                  fontSize: getValue({ xs: 48, sm: 56, md: 64 }),
                  color: 'text.secondary', 
                  mb: 2 
                }} />
                <Typography 
                  variant={getValue({ xs: "h6", sm: "h5" })}
                  color="text.secondary" 
                  sx={{ mb: 1 }}
                >
                  No hoardings yet
                </Typography>
                <Typography 
                  variant={getValue({ xs: "body2", sm: "body1" })}
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Start by adding your first digital hoarding screen
                </Typography>
                <Button
                  variant="contained"
                  size={getValue({ xs: "medium", sm: "large" })}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    px: getValue({ xs: 3, sm: 4 }),
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                  }}
                  onClick={() => window.location.href = '/agency/addscreen'}
                >
                  Add Hoarding
                </Button>
              </Box>
            ) : (
              <>
                <OwlCarousel
                margin={0} 
                  key={`carousel-${carouselKey}`}
                  ref={carouselRef}
                  className="owl-theme"
                  loop

                  // margin={getValue({ xs: 8, sm: 12, md: 16 })}
                  autoplay
                  autoplayTimeout={4000}
                  autoplaySpeed={1000}
                  autoplayHoverPause={true}
                  smartSpeed={1000}
                  nav={false}
                  responsive={{
                    0: { items: 1 },      // xs
                    600: { items: 1 },    // sm
                    900: { items: 2 },    // md
                    1200: { items: 2 },   // lg
                    1536: { items: 3 }    // xl
                  }}
                >
                  {hoardings.map((hoarding) => (
                    <Card
                      key={hoarding._id}
                      sx={{ 
                        boxSizing: 'border-box',
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%', 
                        px: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        // px: getValue({ xs: 0.5, sm: 1, md: 1.5 }),
                        // mx: getValue({ xs: 0.5, sm: 1, md: 1.5 }),
                        
                        cursor: 'pointer',
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.1)}`
                        }
                      }}
                      onClick={() => window.location.href = `/agency/hoarding/${hoarding._id}`}
                    >
                      <Box sx={{ 

                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        maxHeight: getValue({ xs: 160, sm: 180, md: 200, lg: 220 }),
                        overflow: 'hidden'
                      }}>
                        <img
                          src={hoarding.hordingURL}
                          alt={hoarding.hordingType}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transition: 'transform 0.5s'
                          }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          p: getValue({ xs: 1.25, sm: 1.5 }),
                          background: `linear-gradient(transparent, rgba(0,0,0,0.9))`
                        }}>
                          <Typography 
                            variant={getValue({ xs: "subtitle1", sm: "h6" })}
                            sx={{ fontWeight: 600 }}
                          >
                            {hoarding.hordingType || 'Digital Hoarding'}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                            <LocationOnIcon fontSize={getValue({ xs: "small", sm: "medium" })} 
                              sx={{ color: theme.palette.secondary.light }} />
                            <Typography 
                              variant={getValue({ xs: "body2", sm: "body1" })}
                              sx={{ color: theme.palette.grey[300] }}
                            >
                              {hoarding.areaId?.name || 'N/A'}, {hoarding.cityId?.name || 'N/A'}
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        p: getValue({ xs: 1.5, sm: 2 }),
                        width: '100%',
                        background: alpha(theme.palette.background.paper, 0.8)
                      }}>
                        <Grid container spacing={getValue({ xs: 1, sm: 1.5 })}>
                          <Grid item xs={6}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ display: 'block', mb: 0.5 }}
                            >
                              Hourly Rate
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <PaidIcon 
                                fontSize={getValue({ xs: "small", sm: "medium" })} 
                                color="primary" />
                              <Typography 
                                variant={getValue({ xs: "body2", sm: "body1" })} 
                                sx={{ fontWeight: 500 }}
                              >
                                ₹{hoarding.hourlyRate?.toLocaleString() || '0'}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ display: 'block', mb: 0.5 }}
                            >
                              Bookings
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <EventAvailableIcon 
                                fontSize={getValue({ xs: "small", sm: "medium" })} 
                                color="primary" />
                              <Typography 
                                variant={getValue({ xs: "body2", sm: "body1" })} 
                                sx={{ fontWeight: 500 }}
                              >
                                {hoarding.bookings || '0'}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ display: 'block', mb: 0.5 }}
                            >
                              Dimensions
                            </Typography>
                            <Typography 
                              variant={getValue({ xs: "body2", sm: "body1" })} 
                              sx={{ 
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {hoarding.hoardingDimension || 'N/A'} ft
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
                  mt: getValue({ xs: 2, sm: 3 }),
                  gap: getValue({ xs: 1.5, sm: 2, md: 3 }),
                  width: '100%',
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="outlined"
                    size={getValue({ xs: "small", sm: "medium" })}
                    startIcon={<ArrowBackIosIcon fontSize={getValue({ xs: "small", sm: "medium" })} />}
                    onClick={() => carouselRef.current.prev()}
                    sx={{
                      borderRadius: 2,
                      px: getValue({ xs: 1.5, sm: 2 }),
                      fontWeight: 600,
                      borderWidth: 2,
                      minWidth: getValue({ xs: 'calc(50% - 8px)', sm: 'auto' }),
                      mb: getValue({ xs: 1, sm: 0 }),
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    {!isXs && "Previous"}
                  </Button>
                  <Button
                    variant="contained"
                    size={getValue({ xs: "small", sm: "medium" })}
                    onClick={() => window.location.href = '/agency/myscreens'}
                    sx={{
                      borderRadius: 2,
                      px: getValue({ xs: 2, sm: 3 }),
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      minWidth: getValue({ xs: '100%', sm: 'auto' }),
                      mb: getValue({ xs: 1, sm: 0 }),
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                      },
                      transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                  >
                    View All Hoardings
                  </Button>
                  <Button
                    variant="outlined"
                    size={getValue({ xs: "small", sm: "medium" })}
                    endIcon={<ArrowForwardIosIcon fontSize={getValue({ xs: "small", sm: "medium" })} />}
                    onClick={() => carouselRef.current.next()}
                    sx={{
                      borderRadius: 2,
                      px: getValue({ xs: 1.5, sm: 2 }),
                      fontWeight: 600,
                      borderWidth: 2,
                      minWidth: getValue({ xs: 'calc(50% - 8px)', sm: 'auto' }),
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    {!isXs && "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>

        {/* Help Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: getValue({ xs: 2.5, sm: 3, md: 3.5 }),
            borderRadius: 3,
            width: '100%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.05)}`
          }}
        >
          <Stack 
            direction={getValue({ xs: "column", sm: "row" })} 
            spacing={getValue({ xs: 2, sm: 3 })} 
            alignItems={getValue({ xs: "flex-start", sm: "center" })}
          >
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                width: getValue({ xs: 56, sm: 64, md: 72 }),
                height: getValue({ xs: 56, sm: 64, md: 72 }),
                '& svg': {
                  fontSize: getValue({ xs: 28, sm: 32, md: 36 }),
                  color: theme.palette.secondary.main
                }
              }}
            >
              <HelpOutlineIcon />
            </Avatar>
            <Box sx={{ width: '100%' }}>
              <Typography 
                variant={getValue({ xs: "h6", sm: "h5", md: "h4" })}
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  fontSize: getValue({ xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }),
                  mb: getValue({ xs: 1, sm: 1.5 })
                }}
              >
                Need Help Managing Your Hoardings?
              </Typography>
              <Typography 
                variant={getValue({ xs: "body2", sm: "body1" })}
                color="text.secondary" 
                sx={{ 
                  mb: getValue({ xs: 2, sm: 2.5 }),
                  maxWidth: '600px'
                }}
              >
                Our dedicated support team is available to assist you with any questions about managing your digital hoardings
              </Typography>
              <Button 
                variant="contained"
                color="secondary"
                size={getValue({ xs: "small", sm: "medium", md: "large" })}
                fullWidth={isXs}
                sx={{
                  borderRadius: 2,
                  px: getValue({ xs: 3, sm: 4 }),
                  fontWeight: 600,
                  maxWidth: getValue({ xs: '100%', sm: '200px', md: '240px' }),
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`
                  },
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
              >
                Contact Support
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default DefaultPage;














// import React, { useEffect, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
//   Avatar,
//   Stack,
//   Divider,
//   useMediaQuery,
//   useTheme,
//   Container,
//   Skeleton,
//   Chip,
//   alpha
// } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import TvIcon from '@mui/icons-material/Tv';
// import AddIcon from '@mui/icons-material/Add';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PaidIcon from '@mui/icons-material/Paid';
// import axios from "axios";
// import CustomLoader from "../component/CustomLoader";
// import dayjs from "dayjs";

// const DefaultPage = () => {
//   const [hoardings, setHoardings] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [carouselKey, setCarouselKey] = useState(0);
//   const [totalScreens, setTotalScreens] = useState(0);
//   const [activeBookings, setActiveBookings] = useState(0);
//   const [statsLoading, setStatsLoading] = useState(true);

//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
//   const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
//   const isXl = useMediaQuery(theme.breakpoints.up('xl'));
//   let carouselRef = React.useRef(null);

//   // Responsive breakpoint calculations
//   const getResponsiveValue = (values) => {
//     if (isXs && values.xs !== undefined) return values.xs;
//     if (isSm && values.sm !== undefined) return values.sm;
//     if (isMd && values.md !== undefined) return values.md;
//     if (isLg && values.lg !== undefined) return values.lg;
//     if (isXl && values.xl !== undefined) return values.xl;
//     return values.default || values.xs || values.sm || values.md || values.lg || values.xl;
//   };

//   const formatDate = (dateString) => dayjs(dateString).format("DD MMM YYYY");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         setStatsLoading(true);
//         const userId = localStorage.getItem("id");
        
//         // Fetch hoardings data
//         const hoardingsRes = await axios.get(`/hording/getHordingsbyuserid/${userId}`);
//         setHoardings(hoardingsRes.data?.data || []);
//         setTotalScreens(hoardingsRes.data?.data?.length || 0);

//         // Fetch bookings data
//         const bookingsRes = await axios.get(`/booking/getBookingByUserId/${userId}`);
//         const bookings = bookingsRes.data?.data || [];
        
//         // Calculate active bookings (where end date is in the future)
//         const today = new Date();
//         const active = bookings.filter(booking => {
//           const endDate = new Date(booking.endDate);
//           return endDate >= today;
//         }).length;
        
//         setActiveBookings(active);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setHoardings([]);
//         setTotalScreens(0);
//         setActiveBookings(0);
//       } finally {
//         setIsLoading(false);
//         setStatsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {isLoading && <CustomLoader />}
//       <Container 
//         maxWidth="lg"
//         disableGutters
//         sx={{
//           overflow:'hidden',
//           mx: 'auto',
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
//           minHeight: '100vh',
//           p: getResponsiveValue({ xs: 2, sm: 3, md: 4 })
//         }}
//       >
//         {/* Welcome Section */}
//         <Box sx={{ 
//           mb: getResponsiveValue({ xs: 3, sm: 4, md: 5 }),
//           maxWidth: getResponsiveValue({ xs: '100%', md: '80%', lg: '70%' })
//         }}>
//           <Typography 
//             variant={getResponsiveValue({ xs: "h4", sm: "h3", md: "h2" })}
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               fontSize: getResponsiveValue({ xs: '1.5rem', sm: '2rem', md: '2.5rem' }),
//               background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               display: 'inline-block',
//               lineHeight: getResponsiveValue({ xs: 1.3, sm: 1.2, md: 1.1 })
//             }}
//           >
//             Welcome to Your Agency Dashboard
//           </Typography>
//           <Typography 
//             variant={getResponsiveValue({ xs: "body1", sm: "h6", md: "h5" })}
//             color="text.secondary"
//             sx={{ 
//               lineHeight: 1.6,
//               fontWeight: 600,
//               fontSize: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1.2rem' }),
//             }}
//           >
//             {hoardings.length > 0 
//               ? "Manage your hoarding screens and view your active bookings" 
//               : "Add your first digital hoarding screen to get started"}
//           </Typography>
//         </Box>

//         {/* Stats Cards */}
//         <Grid 
//           container 
//           spacing={getResponsiveValue({ xs: 2, sm: 3, md: 3 })}
//           sx={{ 
//             mb: getResponsiveValue({ xs: 3, sm: 4, md: 5 }),
//             justifyContent: getResponsiveValue({ xs: 'center', sm: 'flex-start' })
//           }}
//         >
//           {/* Active Bookings Card */}
//           <Grid 
//             item 
//             xs={12} 
//             sm={6} 
//             md={6} 
//             lg={5} 
//             xl={4}
//             // sx={{
//             //   maxWidth: getResponsiveValue({ xs: '100%', sm: 'none' })
//             // }}
//           >
//             <Paper 
//               elevation={0} 
//               sx={{ 
//                 p: getResponsiveValue({ xs: 1.5, sm: 2, md: 2.5 }),
//                 height: '100%',
//                 borderRadius: 3,
//                 background: theme.palette.mode === 'light' 
//                   ? `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
//                   : alpha(theme.palette.background.paper, 0.8),
//                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                 boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`,
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.1)}`
//                 }
//               }}
//             >
//               <Stack direction="row" justifyContent="space-between" alignItems="center" >
//                 <Box>
//                   <Typography 
//                     variant={getResponsiveValue({ xs: "caption", sm: "subtitle2" })}
//                     color="text.secondary"
//                     sx={{ 
//                       textTransform: 'uppercase',
//                       letterSpacing: 1,
//                       fontWeight: 500
//                     }}
//                   >
//                     Active Bookings
//                   </Typography>
//                   {statsLoading ? (
//                     <Skeleton 
//                       variant="text" 
//                       width={getResponsiveValue({ xs: 100, sm: 120, md: 140 })}
//                       height={getResponsiveValue({ xs: 40, sm: 50, md: 60 })}
//                     />
//                   ) : (
//                     <Typography 
//                     variant={getResponsiveValue({ xs: "h5", sm: "h4", md: "h3" })}
//                     sx={{
//                       fontSize: getResponsiveValue({ xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' }),
//                       fontWeight: 700
//                     }}
//                     >
//                       {activeBookings}
//                     </Typography>
//                   )}
//                 </Box>
                
//                 <Avatar 
//                   sx={{ 
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     width: getResponsiveValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
//                     height: getResponsiveValue({ xs: 40, sm: 48, md: 56, lg: 64 }),
//                     '& svg': {
//                       fontSize: getResponsiveValue({ xs: 20, sm: 24, md: 28, lg: 32 })
//                     }
//                   }}
//                 >
//                   <EventAvailableIcon />
//                 </Avatar>
//               </Stack>
//             </Paper>
//           </Grid>

//           {/* Total Screens Card */}
//           <Grid 
//             item 
//             xs={12} 
//             sm={6} 
//             md={6} 
//             lg={5} 
//             xl={4}
//             sx={{
//               maxWidth: getResponsiveValue({ xs: '100%', sm: 'none' })
//             }}
//           >
//             <Paper 
//               elevation={0} 
//               sx={{ 
//                 p: getResponsiveValue({ xs: 2, sm: 3, md: 3 }),
//                 borderRadius: 3,
//                 height: '100%',
//                 background: theme.palette.mode === 'light' 
//                   ? `linear-gradient(135deg, ${alpha(theme.palette.info.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
//                   : alpha(theme.palette.background.paper, 0.8),
//                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                 boxShadow: `0 8px 32px ${alpha(theme.palette.info.main, 0.05)}`,
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: `0 12px 40px ${alpha(theme.palette.info.main, 0.1)}`
//                 }
//               }}
//             >
//               <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
//                 <Box>
//                   <Typography 
//                     variant={getResponsiveValue({ xs: "caption", sm: "subtitle2" })}
//                     color="text.secondary"
//                     sx={{ 
//                       textTransform: 'uppercase',
//                       letterSpacing: 1,
//                       fontWeight: 500
//                     }}
//                   >
//                     Total Screens
//                   </Typography>
//                   {statsLoading ? (
//                     <Skeleton 
//                       variant="text" 
//                       width={getResponsiveValue({ xs: 100, sm: 120, md: 140 })}
//                       height={getResponsiveValue({ xs: 40, sm: 50, md: 60 })}
//                     />
//                   ) : (
//                     <Typography 
//                       variant={getResponsiveValue({ xs: "h4", sm: "h3", md: "h2" })}
//                       sx={{ 
//                         fontSize: getResponsiveValue({ xs: '1.5rem', sm: '2rem', md: '2.5rem' }),
//                         fontWeight: 700,
//                         mt: 0.5
//                       }}
//                     >
//                       {totalScreens}
//                     </Typography>
//                   )}
//                 </Box>
                
//                 <Avatar 
//                   sx={{ 
//                     bgcolor: alpha(theme.palette.info.main, 0.1),
//                     width: getResponsiveValue({ xs: 48, sm: 56, md: 64 }),
//                     height: getResponsiveValue({ xs: 48, sm: 56, md: 64 }),
//                     '& svg': {
//                       fontSize: getResponsiveValue({ xs: 24, sm: 28, md: 32 }),
//                       color: theme.palette.info.main
//                     }
//                   }}
//                 >
//                   <TvIcon />
//                 </Avatar>
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Quick Actions */}
//         <Paper 
//           elevation={0}
//           sx={{ 
//             p: getResponsiveValue({ xs: 2, sm: 3, md: 3 }),
//             borderRadius: 3, 
//             mb: getResponsiveValue({ xs: 3, sm: 4, md: 5 }),
//             width: '100%',
//             background: theme.palette.mode === 'light' 
//               ? alpha(theme.palette.background.paper, 0.9)
//               : alpha(theme.palette.background.paper, 0.8),
//             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//             boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`
//           }}
//         >
//           <Typography 
//             variant={getResponsiveValue({ xs: "h6", sm: "h5", md: "h4" })}
//             gutterBottom
//             sx={{ 
//               fontSize: getResponsiveValue({ xs: '1.1rem', sm: '1.5rem', md: '1.8rem' }),
//               fontWeight: 600,
//               mb: getResponsiveValue({ xs: 2, sm: 3 })
//             }}
//           >
//             Quick Actions
//           </Typography>
//           <Grid 
//             container spacing={getResponsiveValue({ xs: 1, sm: 2 })} sx={{ flexWrap: 'wrap' }}
//           >
//             <Grid 
//               item xs={12} sm={6} md={4} sx={{ minWidth: 'unset' }}
//             >
//               <Button 
                
//                 fullWidth
//                 size={getResponsiveValue({ xs: "small", sm: "medium", md: "large" })}
//                 sx={{ 
//                   py: getResponsiveValue({ xs: 1, sm: 1.5, md: 2 }),
//                   borderRadius: 2,
//                   fontWeight: 600,
//                   letterSpacing: 0.5,
//                   fontSize: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
//                   },
//                   transition: 'transform 0.3s, box-shadow 0.3s'
//                 }}
//                 onClick={() => window.location.href = '/agency/addscreen'}
//               >
//                 Add New Hoarding
//               </Button>
//             </Grid>
//             <Grid 
//               item xs={12} sm={6} md={4} sx={{ minWidth: 'unset' }}
//             >
//               <Button 
                
//                 fullWidth
//                 size={getResponsiveValue({ xs: "small", sm: "medium", md: "large" })}
//                 sx={{ 
//                   py: getResponsiveValue({ xs: 1, sm: 1.5, md: 2 }),
//                   borderRadius: 2,
//                   fontWeight: 600,
//                   letterSpacing: 0.5,
//                   fontSize: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
//                   },
//                   transition: 'transform 0.3s, box-shadow 0.3s'
//                 }}
//                 onClick={() => window.location.href = '/agency/update'}
//               >
//                 Update Profile
//               </Button>
//             </Grid>
//             <Grid 
//               item xs={12} sm={6} md={4} sx={{ minWidth: 'unset' }}
//             >
//               <Button 
                
//                 fullWidth
//                 size={getResponsiveValue({ xs: "small", sm: "medium", md: "large" })}
//                 sx={{ 
//                   py: getResponsiveValue({ xs: 1, sm: 1.5, md: 2 }),
//                   borderRadius: 2,
//                   fontWeight: 600,
//                   letterSpacing: 0.5,
//                   fontSize: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem' }),
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
//                   },
//                   transition: 'transform 0.3s, box-shadow 0.3s'
//                 }}
//                 onClick={() => window.location.href = '/agency/bookings'}
//               >
//                 View Bookings
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Hoardings Carousel */}
//         <Paper 
//           elevation={0}
//           sx={{ 
//             p: getResponsiveValue({ xs: 2, sm: 3, md: 3 }),
//             borderRadius: 3, 
//             mb: getResponsiveValue({ xs: 3, sm: 4, md: 5 }),
//             width: '100%',
//             overflow: 'hidden',
//             background: theme.palette.mode === 'light' 
//               ? alpha(theme.palette.background.paper, 0.9)
//               : alpha(theme.palette.background.paper, 0.8),
//             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//             boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.05)}`
//           }}
//         >
//           <Typography 
//             variant={getResponsiveValue({ xs: "h6", sm: "h5", md: "h4" })}
//             gutterBottom 
//             sx={{ 
//               fontSize: getResponsiveValue({ xs: '1.1rem', sm: '1.5rem', md: '1.8rem' }),
//               mb: getResponsiveValue({ xs: 2, sm: 3 }),
//               fontWeight: 600
//             }}
//           >
//             {hoardings.length > 0 ? "Your Hoarding Screens" : "Featured Hoardings"}
//           </Typography>
          
//           <Box sx={{ 
//             position: 'relative',
//             width: '100%',
//             maxWidth: '100%'
//           }}>
//             {hoardings.length === 0 ? (
//               <Box 
//                 textAlign="center" 
//                 py={getResponsiveValue({ xs: 4, sm: 5, md: 6 })}
//                 sx={{
//                   background: alpha(theme.palette.primary.light, 0.05),
//                   borderRadius: 2,
//                   border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`
//                 }}
//               >
//                 <TvIcon sx={{ 
//                   fontSize: getResponsiveValue({ xs: 48, sm: 64, md: 72 }),
//                   color: 'text.secondary', 
//                   mb: 2 
//                 }} />
//                 <Typography 
//                   variant={getResponsiveValue({ xs: "h6", sm: "h5" })}
//                   color="text.secondary" 
//                   sx={{ mb: 1 }}
//                 >
//                   No hoardings yet
//                 </Typography>
//                 <Typography 
//                   variant={getResponsiveValue({ xs: "body1", sm: "h6" })}
//                   color="text.secondary" 
//                   sx={{ mb: 3 }}
//                 >
//                   Start by adding your first digital hoarding screen
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   size={getResponsiveValue({ xs: "medium", sm: "large" })}
//                   sx={{
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     px: getResponsiveValue({ xs: 3, sm: 4 }),
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
//                   }}
//                   onClick={() => window.location.href = '/agency/addscreen'}
//                 >
//                   Add Hoarding
//                 </Button>
//               </Box>
//             ) : (
//               <>
//                 <OwlCarousel
//                   key={`carousel-${carouselKey}`}
//                   ref={carouselRef}
//                   className="owl-theme"
//                   loop
//                   margin={getResponsiveValue({ xs: 10, sm: 15, md: 20 })}
//                   autoplay
//                   autoplayTimeout={4000}
//                   autoplaySpeed={1000}
//                   autoplayHoverPause={true}
//                   smartSpeed={1000}
//                   nav={false}
//                   responsive={{
//                     0: { items: 1 },      // xs
//                     600: { items: 1 },    // sm
//                     900: { items: 2 },    // md
//                     1200: { items: 2 },   // lg
//                     1536: { items: 3 }    // xl
//                   }}
//                 >
//                   {hoardings.map((hoarding) => (
//                     <Card
//                       key={hoarding._id}
//                       sx={{ 
//                         height: '100%', 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         mx: getResponsiveValue({ xs: 1, sm: 1.5, md: 2 }),
//                         maxWidth: '100%',
//                         cursor: 'pointer',
//                         borderRadius: 3,
//                         overflow: 'hidden',
//                         border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//                         transition: 'transform 0.3s, box-shadow 0.3s',
//                         '&:hover': {
//                           transform: 'translateY(-5px)',
//                           boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.1)}`
//                         }
//                       }}
//                       onClick={() => window.location.href = `/agency/hoarding/${hoarding._id}`}
//                     >
//                       <Box sx={{ 
//                        position: 'relative',
//                        width: '100%',
//                        aspectRatio: '16/9', // Standard banner ratio
//                        maxHeight: getResponsiveValue({ xs: 180, sm: 200, md: 220, lg: 240 }),
//                        overflow: 'hidden'
//                       }}>
//                         <img
//                           src={hoarding.hordingURL}
//                           alt={hoarding.hordingType}
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover',
//                             maxWidth: '100%',
//                             transition: 'transform 0.5s',
//                             '&:hover': {
//                               transform: 'scale(1.05)'
//                             }
//                           }}
//                         />
//                         <Box sx={{
//                           position: 'absolute',
//                           bottom: 0,
//                           left: 0,
//                           right: 0,
//                           bgcolor: 'rgba(0,0,0,0.7)',
//                           color: 'white',
//                           p: getResponsiveValue({ xs: 1.5, sm: 2 }),
//                           background: `linear-gradient(transparent, rgba(0,0,0,0.9))`
//                         }}>
//                           <Typography 
//                             variant={getResponsiveValue({ xs: "h6", sm: "h5" })}
//                             sx={{ fontWeight: 600 }}
//                           >
//                             {hoarding.hordingType || 'Digital Hoarding'}
//                           </Typography>
//                           <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
//                             <LocationOnIcon fontSize={getResponsiveValue({ xs: "small", sm: "medium" })} 
//                               sx={{ color: theme.palette.secondary.light }} />
//                             <Typography 
//                               variant={getResponsiveValue({ xs: "body2", sm: "body1" })}
//                               sx={{ color: theme.palette.grey[300] }}
//                             >
//                               {hoarding.areaId?.name || 'N/A'}, {hoarding.cityId?.name || 'N/A'}
//                             </Typography>
//                           </Stack>
//                         </Box>
//                       </Box>
//                       <CardContent sx={{ 
//                         flexGrow: 1, 
//                         p: getResponsiveValue({ xs: 2, sm: 2, md: 3 }),
//                         width: '100%',
//                         background: alpha(theme.palette.background.paper, 0.8)
//                       }}>
//                         <Grid container spacing={getResponsiveValue({ xs: 1, sm: 1.5 })}>
//                           <Grid item xs={6}>
//                             <Typography 
//                               variant="caption" 
//                               color="text.secondary" 
//                               sx={{ display: 'block', mb: 0.5 }}
//                             >
//                               Hourly Rate
//                             </Typography>
//                             <Stack direction="row" alignItems="center" spacing={1}>
//                               <PaidIcon 
//                                 fontSize={getResponsiveValue({ xs: "small", sm: "medium" })} 
//                                 color="primary" />
//                               <Typography 
//                                 variant={getResponsiveValue({ xs: "body1", sm: "subtitle2" })} 
//                                 sx={{ fontWeight: 500 }}
//                               >
//                                 ₹{hoarding.hourlyRate?.toLocaleString() || '0'}
//                               </Typography>
//                             </Stack>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography 
//                               variant="caption" 
//                               color="text.secondary" 
//                               sx={{ display: 'block', mb: 0.5 }}
//                             >
//                               Bookings
//                             </Typography>
//                             <Stack direction="row" alignItems="center" spacing={1}>
//                               <EventAvailableIcon 
//                                 fontSize={getResponsiveValue({ xs: "small", sm: "medium" })} 
//                                 color="primary" />
//                               <Typography 
//                                 variant={getResponsiveValue({ xs: "body1", sm: "subtitle2" })} 
//                                 sx={{ fontWeight: 500 }}
//                               >
//                                 {hoarding.bookings || '0'}
//                               </Typography>
//                             </Stack>
//                           </Grid>
//                           <Grid item xs={12} sx={{ mt: 1 }}>
//                             <Typography 
//                               variant="caption" 
//                               color="text.secondary" 
//                               sx={{ display: 'block', mb: 0.5 }}
//                             >
//                               Dimensions
//                             </Typography>
//                             <Typography 
//                               variant={getResponsiveValue({ xs: "body1", sm: "subtitle2" })} 
//                               sx={{ 
//                                 fontWeight: 500,
//                                 whiteSpace: 'nowrap',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis'
//                               }}
//                             >
//                               {hoarding.hoardingDimension || 'N/A'} ft
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </OwlCarousel>

//                 {/* Navigation Arrows */}
//                 <Box sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'center', 
//                   alignItems: 'center', 
//                   mt: getResponsiveValue({ xs: 3, sm: 4 }),
//                   gap: getResponsiveValue({ xs: 2, sm: 3, md: 4 }),
//                   width: '100%',
//                   flexWrap: getResponsiveValue({ xs: 'wrap', sm: 'nowrap' })
//                 }}>
//                   <Button
//                     variant="outlined"
//                     size={getResponsiveValue({ xs: "medium", sm: "large" })}
//                     startIcon={<ArrowBackIosIcon fontSize={getResponsiveValue({ xs: "small", sm: "medium" })} />}
//                     onClick={() => carouselRef.current.prev()}
//                     sx={{
//                       borderRadius: 2,
//                       px: getResponsiveValue({ xs: 2, sm: 3 }),
//                       fontWeight: 600,
//                       borderWidth: 2,
//                       minWidth: getResponsiveValue({ xs: '100%', sm: 'auto' }),
//                       mb: getResponsiveValue({ xs: 1, sm: 0 }),
//                       '&:hover': {
//                         borderWidth: 2
//                       }
//                     }}
//                   >
//                     {!isXs && "Previous"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     size={getResponsiveValue({ xs: "medium", sm: "large" })}
//                     onClick={() => window.location.href = '/agency/myscreens'}
//                     sx={{
//                       borderRadius: 2,
//                       px: getResponsiveValue({ xs: 3, sm: 4 }),
//                       fontWeight: 600,
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       minWidth: getResponsiveValue({ xs: '100%', sm: 'auto' }),
//                       mb: getResponsiveValue({ xs: 1, sm: 0 }),
//                       '&:hover': {
//                         transform: 'translateY(-2px)',
//                         boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
//                       },
//                       transition: 'transform 0.3s, box-shadow 0.3s'
//                     }}
//                   >
//                     View All Hoardings
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size={getResponsiveValue({ xs: "medium", sm: "large" })}
//                     endIcon={<ArrowForwardIosIcon fontSize={getResponsiveValue({ xs: "small", sm: "medium" })} />}
//                     onClick={() => carouselRef.current.next()}
//                     sx={{
//                       borderRadius: 2,
//                       px: getResponsiveValue({ xs: 2, sm: 3 }),
//                       fontWeight: 600,
//                       borderWidth: 2,
//                       minWidth: getResponsiveValue({ xs: '100%', sm: 'auto' }),
//                       '&:hover': {
//                         borderWidth: 2
//                       }
//                     }}
//                   >
//                     {!isXs && "Next"}
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </Box>
//         </Paper>

//         {/* Help Section */}
//         <Paper 
//           elevation={0}
//           sx={{ 
//             p: getResponsiveValue({ xs: 3, sm: 4, md: 4 }),
//             borderRadius: 3,
//             width: '100%',
//             background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
//             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//             boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.05)}`
//           }}
//         >
//           <Stack 
//             direction={getResponsiveValue({ xs: "column", sm: "row" })} 
//             spacing={getResponsiveValue({ xs: 2, sm: 3, md: 4 })} 
//             alignItems={getResponsiveValue({ xs: "flex-start", sm: "center" })}
//           >
//             <Avatar 
//               sx={{ 
//                 bgcolor: alpha(theme.palette.secondary.main, 0.1),
//                 width: getResponsiveValue({ xs: 56, sm: 64, md: 72 }),
//                 height: getResponsiveValue({ xs: 56, sm: 64, md: 72 }),
//                 '& svg': {
//                   fontSize: getResponsiveValue({ xs: 28, sm: 32, md: 36 }),
//                   color: theme.palette.secondary.main
//                 }
//               }}
//             >
//               <HelpOutlineIcon />
//             </Avatar>
//             <Box sx={{ width: '100%' }}>
//               <Typography 
//                 variant={getResponsiveValue({ xs: "h6", sm: "h5", md: "h4" })}
//                 gutterBottom 
//                 sx={{ 
//                   fontWeight: 600,
//                   mb: getResponsiveValue({ xs: 1, sm: 1.5 })
//                 }}
//               >
//                 Need Help Managing Your Hoardings?
//               </Typography>
//               <Typography 
//                 variant={getResponsiveValue({ xs: "body1", sm: "h6" })}
//                 color="text.secondary" 
//                 sx={{ 
//                   mb: getResponsiveValue({ xs: 2, sm: 3 }),
//                   maxWidth: '600px'
//                 }}
//               >
//                 Our dedicated support team is available to assist you with any questions about managing your digital hoardings
//               </Typography>
//               <Button 
//                 variant="contained"
//                 color="secondary"
//                 size={getResponsiveValue({ xs: "medium", sm: "large" })}
//                 fullWidth={isXs}
//                 sx={{
//                   borderRadius: 2,
//                   px: getResponsiveValue({ xs: 3, sm: 4 }),
//                   fontWeight: 600,
//                   maxWidth: getResponsiveValue({ xs: '100%', sm: '200px', md: '240px' }),
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`
//                   },
//                   transition: 'transform 0.3s, box-shadow 0.3s'
//                 }}
//               >
//                 Contact Support
//               </Button>
//             </Box>
//           </Stack>
//         </Paper>
//       </Container>
//     </>
//   );
// };

// export default DefaultPage;