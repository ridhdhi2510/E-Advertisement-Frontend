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
  Divider,
  useMediaQuery,
  useTheme,
  Container
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TvIcon from '@mui/icons-material/Tv';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home'
import axios from "axios";
import CustomLoader from "../component/CustomLoader";

const DefaultPage = () => {
  const [hoardings, setHoardings] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [totalScreens, setTotalScreens] = useState(0); // New state for total screens count

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  let carouselRef = React.useRef(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setisLoading(true);
  //       const res = await axios.get(`/hording/getHordingsbyuserid/${localStorage.getItem("id")}`);
  //       setHoardings(res.data?.data || []);
  //       setCarouselKey(prev => prev + 1); // Force carousel refresh
  //     } catch (error) {
  //       console.error("Error fetching hoardings:", error);
  //       setHoardings([]);
  //     } finally {
  //       setisLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        // Fetch hoardings data
        const res = await axios.get(`/hording/getHordingsbyuserid/${localStorage.getItem("id")}`);
        setHoardings(res.data?.data || []);
        setTotalScreens(res.data?.data?.length || 0); // Update total screens count
        setCarouselKey(prev => prev + 1);
      } catch (error) {
        console.error("Error fetching hoardings:", error);
        setHoardings([]);
        setTotalScreens(0);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      {isLoading == true && <CustomLoader />}
      <Container maxWidth="lg" sx={{
        p: isMobile ? 1 : 3,
        overflowX: 'hidden',
        width: '100%'
      }}>
        {/* Welcome Section */}
        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get started by adding your first digital hoarding screen
          </Typography>
        </Box>

        {/* Stats Cards - Only Active Bookings and Total Screens */}
        <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{
              p: isMobile ? 2 : 3,
              borderRadius: 2,
              height: '100%'
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                    Active Bookings
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"}>0</Typography>
                  <Typography variant="caption" color="text.secondary">
                    No bookings yet
                  </Typography>
                </Box>
                <Avatar sx={{
                  bgcolor: 'action.hover',
                  width: isMobile ? 40 : 56,
                  height: isMobile ? 40 : 56
                }}>
                  <EventAvailableIcon fontSize={isMobile ? "medium" : "large"} color="info" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{
              p: isMobile ? 2 : 3,
              borderRadius: 2,
              height: '100%'
            }}>
              {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                    Total Screens
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"}>0</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Add your first screen
                  </Typography>
                </Box>
                <Avatar sx={{
                  bgcolor: 'action.hover',
                  width: isMobile ? 40 : 56,
                  height: isMobile ? 40 : 56
                }}>
                  <TvIcon fontSize={isMobile ? "medium" : "large"} color="primary" />
                </Avatar>
              </Stack> */}

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                    Total Screens
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"}>{totalScreens}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {totalScreens === 0 ? 'Add your first screen' : `${totalScreens} screens registered`}
                  </Typography>
                </Box>
                <Avatar sx={{
                  bgcolor: 'action.hover',
                  width: isMobile ? 40 : 56,
                  height: isMobile ? 40 : 56
                }}>
                  <TvIcon fontSize={isMobile ? "medium" : "large"} color="primary" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Getting Started Section */}
        <Paper elevation={3} sx={{
          p: isMobile ? 2 : 3,
          borderRadius: 2,
          mb: isMobile ? 2 : 4,
          width: '100%'
        }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
            Getting Started
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{
                p: isMobile ? 1 : 2,
                height: '100%',
                minHeight: isMobile ? 120 : 'auto'
              }}>
                <Stack direction="row" spacing={isMobile ? 1 : 2} alignItems="center">
                  <Avatar sx={{
                    bgcolor: 'primary.light',
                    width: isMobile ? 36 : 40,
                    height: isMobile ? 36 : 40
                  }}>
                    <AddIcon fontSize={isMobile ? "small" : "medium"} color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant={isMobile ? "body2" : "subtitle1"}>
                      Add Your First Hoarding
                    </Typography>
                    <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
                      List your digital hoarding screens
                    </Typography>
                    <Button
                      variant="contained"
                      size={isMobile ? "small" : "medium"}
                      sx={{ mt: 1 }}
                      onClick={() => window.location.href = '/agency/addscreen'}
                      fullWidth={isMobile}
                    >
                      Add Now
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{
                p: isMobile ? 1 : 2,
                height: '100%',
                minHeight: isMobile ? 120 : 'auto'
              }}>
                <Stack direction="row" spacing={isMobile ? 1 : 2} alignItems="center">
                  <Avatar sx={{
                    bgcolor: 'info.light',
                    width: isMobile ? 36 : 40,
                    height: isMobile ? 36 : 40
                  }}>
                    <SettingsIcon fontSize={isMobile ? "small" : "medium"} color="info" />
                  </Avatar>
                  <Box>
                    <Typography variant={isMobile ? "body2" : "subtitle1"}>
                      Setup Your Profile
                    </Typography>
                    <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
                      Complete your agency profile
                    </Typography>
                    <Button
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      sx={{ mt: 1 }}
                      onClick={() => window.location.href = '/agency/update'}
                      fullWidth={isMobile}
                    >
                      Update Profile
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Hoardings Carousel */}
        <Paper elevation={3} sx={{
          p: isMobile ? 2 : 3,
          borderRadius: 2,
          mb: isMobile ? 2 : 4,
          width: '100%',
          overflow: 'hidden'
        }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ mb: 2 }}>
            Your Hoardings
          </Typography>

          <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%'
          }}>

            {hoardings.length === 0 ? (

              <Box textAlign="center" py={5}>
                <Typography variant="h6" color="text.secondary">
                  No hoardings available.First Add your screen to get started!
                </Typography>
              </Box>) : (

              <OwlCarousel
                key={`carousel-${carouselKey}`}
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
                  600: { items: 2 },
                  960: { items: 2 }, // Adjusted for medium laptops
                  1280: { items: 2 } // Adjusted for larger screens
                }}
              >
                {hoardings.map((hoarding) => (
                  <Card
                    key={hoarding._id}
                    sx={{
                      height: 350,
                      display: 'flex',
                      flexDirection: 'column',
                      mx: isMobile ? 1 : 2,
                      maxWidth: '100%',
                      minHeight: 350
                    }}
                  >
                    <Box sx={{
                      position: 'relative',
                      height: 230,
                      width: '100%',
                      flexShrink: 0
                    }}>
                      <img
                        src={hoarding.hordingURL}
                        alt={hoarding.hordingType}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          maxWidth: '100%'
                        }}
                      />

                    </Box>
                    <Box sx={{ height: 370 }}>
                      <CardContent sx={{
                        flexGrow: 1,
                        p: isMobile ? 1 : 2,
                        width: '100%'
                      }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Box sx={{
                              // position: 'absolute',
                              // width:'100%',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              bgcolor: 'white',
                              color: 'black',
                              p: 0.5,
                              pl: 1
                            }}>
                              <Box sx={{ display: "flex", width: "350" }}>
                                <Typography variant={isMobile ? "caption" : "body2"} sx={{
                                  color: "common.black",
                                  fontWeight: 600
                                }}>
                                  Type:
                                </Typography>
                                <Typography variant={isMobile ? "caption" : "body2"} >
                                  {hoarding.hoardingType || 'N/A'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", width: "350px" }}>
                                <Box><Typography variant={isMobile ? "caption" : "body2"} sx={{
                                  color: "common.black",
                                  fontWeight: 600
                                }}>
                                  Place:
                                </Typography></Box>
                                <Box sx={{ display: "flex" }}>
                                  <Typography variant={isMobile ? "caption" : "body2"}>
                                    {hoarding.areaId?.name || 'N/A'},
                                  </Typography>
                                  <Typography variant={isMobile ? "caption" : "body2"}  >
                                    {hoarding.cityId?.name || 'N/A'},
                                  </Typography>
                                  <Typography variant={isMobile ? "caption" : "body2"} >
                                    {hoarding.stateId?.name || 'N/A'}
                                  </Typography>
                                </Box>

                              </Box>
                              <Box sx={{ display: "flex", width: "350px" }}>
                                <Typography variant={isMobile ? "caption" : "body2"} sx={{
                                  color: "common.black",
                                  fontWeight: 600
                                }} >
                                  Price:
                                </Typography>
                                <Typography variant={isMobile ? "caption" : "body2"} >
                                  {hoarding.hourlyRate
                                  }
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", width: "350px" }}>
                                <Typography variant={isMobile ? "caption" : "body2"} sx={{
                                  color: "common.black",
                                  fontWeight: 600
                                }} >
                                  Bookings:
                                </Typography>
                                <Typography variant={isMobile ? "caption" : "body2"}>
                                  {hoarding.bookings}
                                </Typography>
                              </Box>

                            </Box>

                          </Grid>



                        </Grid>
                      </CardContent>
                    </Box>

                  </Card>
                ))}
              </OwlCarousel>)}

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
                Need Help Getting Started?
              </Typography>
              <Typography variant={isMobile ? "caption" : "body1"} color="text.secondary" sx={{ mb: 1 }}>
                Check out our guide for new agencies
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                size={isMobile ? "small" : "medium"}
                fullWidth={isMobile}
              >
                View Help Center
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default DefaultPage;
