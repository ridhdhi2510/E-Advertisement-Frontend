// import React from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Card, CardContent } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// const partners = [
//   { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
//   { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
//   { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
//   { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
//   { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
//   { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
//   { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
//   { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
//   { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
//   { name: "YouTube", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" },
// ];

// const UserDefaultPage = () => {
//   let carouselRef = React.useRef(null);

//   return (
//     <div className="py-10  text-center mx-auto max-w-[90%] md:max-w-5xl relative overflow-hidden " style={{ width:'940px'}}>
//       <h2 className="text-2xl font-bold mb-6">Our Most Popular Partners</h2>
      
//       {/* Carousel */}
//       <div className="relative">
//         <OwlCarousel
//           ref={carouselRef}
//           className="owl-theme"
//           loop
//           margin={10}
//           autoplay
//           autoplayTimeout={3000}
//           autoplaySpeed={1000}
//           autoplayHoverPause={false}
//           smartSpeed={1000}
//           nav={false}
//           responsive={{
//             0: { items: 2 },
//             600: { items: 3 },
//             1000: { items: 5 },
//           }}
//         >
//           {partners.map((partner, index) => (
//             <Card
//               key={index}
//               className="shadow-lg rounded-xl overflow-hidden flex justify-center items-center w-40 h-40 md:w-48 md:h-48 bg-white"
//             >
//               <CardContent className="flex justify-center items-center p-4">
//                 <img style={{height:'150px' , width:'150px'}}
//                   src={partner.logo}
//                   alt={partner.name}
//                   className="w-full h-full object-contain"
                  
//                 />
//               </CardContent>
//             </Card>
//           ))}
//         </OwlCarousel>

//         {/* Navigation Arrows */}
//         <div className="flex justify-center items-center mt-6 gap-6">
//           <button
//             className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
//             onClick={() => carouselRef.current.prev()}
//           >
//             <ArrowBackIosIcon fontSize="medium" />
//           </button>
//           <button
//             className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
//             onClick={() => carouselRef.current.next()}
//           >
//             <ArrowForwardIosIcon fontSize="medium" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDefaultPage;
// ------------------------------new added part---------------------------------
import React from "react";
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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CustomerDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  let carouselRef = React.useRef(null);

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

  // Sample customer stats
  const customerStats = [
    { title: "Active Bookings", value: "2", icon: <EventAvailableIcon color="info" /> },
    { title: "Total Spent", value: "$8,400", icon: <TrendingUpIcon color="success" /> }
  ];

  return (
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
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"}>{stat.value}</Typography>
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
              600: { items: 2 },
              960: { items: 2 },
              1280: { items: 3 }
            }}
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




// ------------------------already commented part--------------------------
// import React, { useEffect } from "react";
// import $ from "jquery";

// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "owl.carousel";
// // import "/css/user/UserDefaultPage.css"
// import "../../public/css/user/UserDefaultPage.css";

// const partners = [
//   { id: 1, name: "Partner 1", img: "partner1.jpg" },
//   { id: 2, name: "Partner 2", img: "partner2.jpg" },
//   { id: 3, name: "Partner 3", img: "partner3.jpg" },
//   { id: 4, name: "Partner 4", img: "partner4.jpg" },
//   { id: 5, name: "Partner 5", img: "partner5.jpg" },
//   { id: 6, name: "Partner 6", img: "partner6.jpg" },
//   { id: 7, name: "Partner 7", img: "partner7.jpg" },
//   { id: 8, name: "Partner 8", img: "partner8.jpg" },
//   { id: 9, name: "Partner 9", img: "partner9.jpg" },
//   { id: 10, name: "Partner 10", img: "partner10.jpg" }
// ];

// const UserDefaultPage = () => {
//      useEffect(() => {
//           if (typeof window !== "undefined") {
//             $(".owl-carousel").owlCarousel({
//               loop: true,
//               margin: 10,
//               nav: true,
//               dots: true,
//               autoplay: true,
//               autoplayTimeout: 3000,
//               responsive: {
//                 0: { items: 1 },
//                 600: { items: 2 },
//                 1000: { items: 3 },
//               },
//             });
//           }
//         }, []);
        
        

//   return (
//     <div>
//       <nav className="blue darken-3">
//         <div className="nav-wrapper container">
//           <a href="#" className="brand-logo">
//             E-Hoarding
//           </a>
//         </div>
//       </nav>

//       <h2 className="center">Welcome to E-Hoarding</h2>

//       {/* Popular Partners Carousel */}
//       <div className="carousel-container">
//         <h4 className="center">Our Popular Partners</h4>
//         <div id="partner-carousel" className="owl-carousel owl-theme">
//           {partners.map((partner) => (
//             <div className="item" key={partner.id} style={{ padding: "10px" }}>
//               <div className="card" style={{ textAlign: "center", padding: "15px" }}>
//                 <div className="card-image">
//                   <img
//                     src={partner.img}
//                     alt={partner.name}
//                     style={{ width: "100%", borderRadius: "8px" }}
//                   />
//                 </div>
//                 <div className="card-content">
//                   <h5>{partner.name}</h5>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Prime Locations Selection */}
//       <div className="prime-locations">
//         <h4 className="center">Select a Prime Location</h4>
//         <div className="locations-container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
//           {["Location 1", "Location 2", "Location 3", "Location 4"].map((loc, index) => (
//             <div
//               key={index}
//               className="location"
//               style={{
//                 width: "180px",
//                 margin: "10px",
//                 padding: "12px",
//                 background: "#1976d2",
//                 borderRadius: "8px",
//                 boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
//                 cursor: "pointer",
//                 color: "white",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 transition: "background 0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.background = "#0d47a1")}
//               onMouseOut={(e) => (e.target.style.background = "#1976d2")}
//             >
//               {loc}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserDefaultPage;
