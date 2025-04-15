// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
// import { Link } from "react-router-dom";
// import { LocationOn, Payment, Search } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { fadeIn, hoverEffect, featureHover, fadeInSlow } from "../animations/MotionVariant";
// import takeoutdoor from "../assets/takeoutdoor.png";
// import backgroundImage from "../assets/EH-2.png";

// export default function Home() {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleContactClick = () => {
//     document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
//   };
//   const handleServiceClick = () => {
//     document.getElementById("Service").scrollIntoView({ behavior: "smooth" });
//   }

//   const handleOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleScrollTo = (id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     handleClose();
//   };

//   return (
//     <Box>
//       {/* Navbar */}
//       <AppBar position="sticky" sx={{ bgcolor: "rgba(193, 190, 214, 0.5)", backdropFilter: "blur(10px)" }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2", display: "flex", alignItems: "center" }}>
//             <img src={takeoutdoor} alt="E-Hoarding Logo" style={{ height: "70px", marginRight: "10px" }} />
//           </Typography>

         
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
//           <Button color="primary" variant="contained" component={Link} to="/signin" sx={{ ml: 2, fontWeight: "bold",minWidth: "90px", height: "42px"}}>Sign In</Button>
//           <Button color="primary" variant="contained" component={Link} to="/signup" sx={{ ml: 2, fontWeight: "bold",minWidth: "100px" , height: "42px" }}>Sign Up</Button>
//           <Button color="primary" variant="contained" onClick={handleContactClick} sx={{ ml: 2, fontWeight: "bold", ":hover": {},minWidth: "130px" , height: "42px" }}>Contact Us</Button>
//           <Button color="primary" variant="contained" onClick={handleServiceClick} sx={{ ml: 2, fontWeight: "bold", ":hover": {},minWidth: "100px" , height: "42px" }}>Services</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <div
//         style={{
//           width: "100%",
//           height: "100vh",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           backgroundBlendMode: "darken",
//           backgroundRepeat: "no-repeat",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//            marginBottom: "-20px"
//         }}
//       >
//         <motion.div variants={fadeIn} initial="hidden" animate="visible">
//           <Box
//             sx={{
//               textAlign: "center",
//               fontFamily: "Poppins, sans-serif",
//               color: "black",
//               fontWeight: 200,
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 2,
//               px: 4,
//             }}
//           >
//              <Typography variant="h3" fontWeight="bold" sx={{mt:2}}>
//               WELCOME TO TAKEOUTDOORS!
//             </Typography>
//             <Typography variant="h4"  sx={{mt:2}}>
//               Find & Book Hoardings Easily!
//             </Typography>
//             <Typography variant="h4" sx={{ mt: 2 }}>
//               A seamless way to advertise in prime locations.
//             </Typography>
//             {/* <motion.div variants={hoverEffect} whileHover="whileHover">
              
             

//             </motion.div> */}
//           </Box>
//         </motion.div>
//       </div>

//   <Box sx={{backgroundColor:"rgba(193, 190, 214, 0.5)"}}>
//       {/* Features Section */}
//       <Box id="Service" sx={{ pt: 0, pb: 0,marginTop:"-46px"}} >
//         <Container maxWidth="xl" sx={{ mt: 6 }}>
//           <Grid container spacing={4}>
//             {[
//               { id: "location", title: "Location-Based Search", desc: "Find hoardings near you easily.", icon: <LocationOn sx={{ fontSize: 40, color: "#1976d2" }} /> },
//               { id: "availability", title: "Real-Time Availability", desc: "Check hoarding availability instantly.", icon: <Search sx={{ fontSize: 40, color: "#1976d2" }} /> },
//               { id: "payments", title: "Secure Payments", desc: "Safe and seamless payment options.", icon: <Payment sx={{ fontSize: 40, color: "#1976d2" }} /> }
//             ].map((feature) => (
//               <Grid item xs={12} md={4} key={feature.id}>
//                 <motion.div variants={featureHover} whileHover="whileHover">
//                   <Card id={feature.id} sx={{ textAlign: "center", p: 3, boxShadow: 5, borderRadius: 4 }}>
//                     <CardContent>
//                       <IconButton>{feature.icon}</IconButton>
//                       <Typography variant="h5" fontWeight="bold" color="black">{feature.title}</Typography>
//                       <Typography variant="body1" color="text.black" sx={{ mt: 1 }}>{feature.desc}</Typography>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
      
//       <Box sx={{ height: 50 }} />

//       {/* Call-to-Action Section */}
//       <motion.div variants={fadeInSlow} initial="hidden" animate="visible">
//         <Box sx={{ textAlign: "center", py: 5,  color: "black", marginTop: "-30px",    marginBottom: "-46px" }}>
//           <Typography variant="h4" fontWeight="bold">Start Advertising Smarter Today!</Typography>
//           <motion.div variants={hoverEffect} whileHover="whileHover">
//             <Button variant="contained" color="primary" sx={{ mt: 3, fontWeight: "bold" }} component={Link} to="/signup">Sign Up Now</Button>
//           </motion.div>
//         </Box>
//       </motion.div>
//   </Box>

//       {/* Contact Section */}
//       <Box id="contact-section" sx={{ textAlign: "center", py: 6, backgroundColor:"rgba(29, 33, 49, 0.8)", color: "black", mt: 6 }}>
//         <Typography variant="h4" fontWeight="bold">Contact Us</Typography>
//         <Typography variant="body1" sx={{ mt: 2 }}>Email: contact@ehoarding.com</Typography>
//         <Typography variant="body1">Phone: +123 456 7890</Typography>
//       </Box>
//     </Box>
//   );
// }





import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Menu, 
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import { LocationOn, Payment, Search, Menu as MenuIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { fadeIn, hoverEffect, featureHover, fadeInSlow } from "../animations/MotionVariant";
import takeoutdoor from "../assets/takeoutdoor.png";
import backgroundImage from "../assets/EH-2.png";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isVerySmall = useMediaQuery('(max-width:350px)');

  const handleContactClick = () => {
    document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
  };
  
  const handleServiceClick = () => {
    document.getElementById("Service").scrollIntoView({ behavior: "smooth" });
  }

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: "rgba(193, 190, 214, 0.5)", backdropFilter: "blur(10px)" }}>
        <Toolbar sx={{ minHeight: isVerySmall ? '48px' : '64px' }}>
          <Typography variant="h6" sx={{ 
            flexGrow: 1, 
            fontWeight: "bold", 
            color: "#1976d2", 
            display: "flex", 
            alignItems: "center",
            fontSize: isVerySmall ? '1rem' : '1.25rem'
          }}>
            <img 
              src={takeoutdoor} 
              alt="E-Hoarding Logo" 
              style={{ 
                height: isVerySmall ? '30px' : isMobile ? '50px' : '70px', 
                marginRight: isVerySmall ? '5px' : '10px' 
              }} 
            />
            {isVerySmall}
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size={isVerySmall ? "small" : "medium"}
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleOpen}
                sx={{ p: isVerySmall ? '4px' : '8px' }}
              >
                <MenuIcon fontSize={isVerySmall ? "small" : "medium"} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem 
                  component={Link} 
                  to="/signin"
                  sx={{ fontSize: isVerySmall ? '0.8rem' : '1rem' }}
                >
                  Sign In
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/signup"
                  sx={{ fontSize: isVerySmall ? '0.8rem' : '1rem' }}
                >
                  Sign Up
                </MenuItem>
                <MenuItem 
                  onClick={handleContactClick}
                  sx={{ fontSize: isVerySmall ? '0.8rem' : '1rem' }}
                >
                  Contact Us
                </MenuItem>
                <MenuItem 
                  onClick={handleServiceClick}
                  sx={{ fontSize: isVerySmall ? '0.8rem' : '1rem' }}
                >
                  Services
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
              <Button 
                color="primary" 
                variant="contained" 
                component={Link} 
                to="/signin" 
                sx={{ 
                  ml: 1,
                  fontWeight: "bold",
                  minWidth: isVerySmall ? '60px' : isTablet ? "80px" : "90px", 
                  height: isVerySmall ? '32px' : "42px",
                  fontSize: isVerySmall ? '0.6rem' : isTablet ? "0.8rem" : "0.9rem",
                  p: isVerySmall ? '4px' : '6px 8px'
                }}
              >
                Sign In
              </Button>
              <Button 
                color="primary" 
                variant="contained" 
                component={Link} 
                to="/signup" 
                sx={{ 
                  ml: 1,
                  fontWeight: "bold",
                  minWidth: isVerySmall ? '70px' : isTablet ? "85px" : "100px", 
                  height: isVerySmall ? '32px' : "42px",
                  fontSize: isVerySmall ? '0.6rem' : isTablet ? "0.8rem" : "0.9rem",
                  p: isVerySmall ? '4px' : '6px 8px'
                }}
              >
                Sign Up
              </Button>
              <Button 
                color="primary" 
                variant="contained" 
                onClick={handleContactClick} 
                sx={{ 
                  ml: 1,
                  fontWeight: "bold", 
                  minWidth: isVerySmall ? '80px' : isTablet ? "110px" : "130px", 
                  height: isVerySmall ? '32px' : "42px",
                  fontSize: isVerySmall ? '0.6rem' : isTablet ? "0.8rem" : "0.9rem",
                  p: isVerySmall ? '4px' : '6px 8px'
                }}
              >
                Contact Us
              </Button>
              <Button 
                color="primary" 
                variant="contained" 
                onClick={handleServiceClick} 
                sx={{ 
                  ml: 1,
                  fontWeight: "bold", 
                  minWidth: isVerySmall ? '70px' : isTablet ? "85px" : "100px", 
                  height: isVerySmall ? '32px' : "42px",
                  fontSize: isVerySmall ? '0.6rem' : isTablet ? "0.8rem" : "0.9rem",
                  p: isVerySmall ? '4px' : '6px 8px'
                }}
              >
                Services
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: isVerySmall ? '50vh' : isMobile ? "70vh" : "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "-20px"
        }}
      >
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Box
            sx={{
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              color: "black",
              fontWeight: 200,
              py: isVerySmall ? 2 : isMobile ? 4 : 10,
              px: isVerySmall ? 1 : isMobile ? 2 : 4,
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: 2,
              mx: isVerySmall ? 1 : isMobile ? 2 : 0,
              width: isVerySmall ? '95%' : isMobile ? "90%" : "auto"
            }}
          >
            <Typography 
              variant={isVerySmall ? "h5" : isMobile ? "h4" : isTablet ? "h3" : "h3"} 
              fontWeight="bold" 
              sx={{ mt: isVerySmall ? 0 : 2 }}
            >
              WELCOME TO TAKEOUTDOORS!
            </Typography>
            <Typography 
              variant={isVerySmall ? "h6" : isMobile ? "h5" : isTablet ? "h4" : "h4"}  
              sx={{ mt: isVerySmall ? 1 : 2 }}
            >
              Find & Book Hoardings Easily!
            </Typography>
            <Typography 
              variant={isVerySmall ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h4"} 
              sx={{ mt: isVerySmall ? 1 : 2 }}
            >
              A seamless way to advertise in prime locations.
            </Typography>
          </Box>
        </motion.div>
      </div>

      <Box sx={{ backgroundColor: "rgba(193, 190, 214, 0.5)" }}>
        {/* Features Section */}
        <Box id="Service" sx={{ pt: 0, pb: 0, marginTop: isVerySmall ? '-30px' : "-46px" }} >
          <Container maxWidth="xl" sx={{ 
            mt: isVerySmall ? 4 : 6, 
            px: isVerySmall ? 1 : isMobile ? 2 : 4 
          }}>
            <Grid container spacing={isVerySmall ? 1 : isMobile ? 2 : 4}>
              {[
                { id: "location", title: "Location Search", desc: "Find hoardings near you.", icon: <LocationOn sx={{ fontSize: isVerySmall ? 30 : 40, color: "#1976d2" }} /> },
                { id: "availability", title: "Real-Time", desc: "Check availability instantly.", icon: <Search sx={{ fontSize: isVerySmall ? 30 : 40, color: "#1976d2" }} /> },
                { id: "payments", title: "Secure Payments", desc: "Safe payment options.", icon: <Payment sx={{ fontSize: isVerySmall ? 30 : 40, color: "#1976d2" }} /> }
              ].map((feature) => (
                <Grid item xs={12} sm={6} md={4} key={feature.id}>
                  <motion.div variants={featureHover} whileHover="whileHover">
                    <Card id={feature.id} sx={{ 
                      textAlign: "center", 
                      p: isVerySmall ? 1 : isMobile ? 2 : 3, 
                      boxShadow: 5, 
                      borderRadius: 4,
                      height: "100%",
                      minHeight: isVerySmall ? '180px' : 'auto'
                    }}>
                      <CardContent>
                        <IconButton sx={{ p: isVerySmall ? '4px' : '8px' }}>
                          {feature.icon}
                        </IconButton>
                        <Typography 
                          variant={isVerySmall ? "subtitle1" : isMobile ? "h6" : "h5"} 
                          fontWeight="bold" 
                          color="black"
                          sx={{ fontSize: isVerySmall ? '0.9rem' : 'inherit' }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant={isVerySmall ? "body2" : "body1"} 
                          color="text.black" 
                          sx={{ 
                            mt: 1,
                            fontSize: isVerySmall ? '0.8rem' : 'inherit'
                          }}
                        >
                          {feature.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        <Box sx={{ height: isVerySmall ? 20 : isMobile ? 30 : 50 }} />

        {/* Call-to-Action Section */}
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible">
          <Box sx={{ 
            textAlign: "center", 
            py: isVerySmall ? 2 : isMobile ? 3 : 5,  
            color: "black", 
            marginTop: "-30px",    
            marginBottom: "-46px",
            px: isVerySmall ? 1 : isMobile ? 2 : 0
          }}>
            <Typography 
              variant={isVerySmall ? "h6" : isMobile ? "h5" : "h4"} 
              fontWeight="bold"
              sx={{ fontSize: isVerySmall ? '1rem' : 'inherit' }}
            >
              Start Advertising Today!
            </Typography>
            <motion.div variants={hoverEffect} whileHover="whileHover">
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ 
                  mt: isVerySmall ? 1 : 3, 
                  fontWeight: "bold",
                  fontSize: isVerySmall ? '0.7rem' : isMobile ? "0.8rem" : "1rem",
                  p: isVerySmall ? '4px 8px' : '6px 16px',
                  height: isVerySmall ? '32px' : 'auto'
                }} 
                component={Link} 
                to="/signup"
              >
                Sign Up Now
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>

      {/* Contact Section */}
      <Box 
        id="contact-section" 
        sx={{ 
          textAlign: "center", 
          py: isVerySmall ? 2 : isMobile ? 4 : 6, 
          backgroundColor: "rgba(29, 33, 49, 0.8)", 
          color: "white", 
          mt: 6,
          px: isVerySmall ? 1 : isMobile ? 2 : 0
        }}
      >
        <Typography 
          variant={isVerySmall ? "h6" : isMobile ? "h5" : "h4"} 
          fontWeight="bold"
          sx={{ fontSize: isVerySmall ? '1rem' : 'inherit' }}
        >
          Contact Us
        </Typography>
        <Typography 
          variant={isVerySmall ? "body2" : "body1"} 
          sx={{ mt: isVerySmall ? 1 : 2 }}
        >
          Email: contact@ehoarding.com
        </Typography>
        <Typography variant={isVerySmall ? "body2" : "body1"}>
          Phone: +123 456 7890
        </Typography>
      </Box>
    </Box>
  );
}