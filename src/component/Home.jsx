import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { LocationOn, Payment, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import { fadeIn, hoverEffect, featureHover, fadeInSlow } from "../animations/MotionVariant";
import takeoutdoor from "../assets/takeoutdoor.png";
import backgroundImage from "../assets/EH-2.png";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: "rgba(193, 190, 214, 0.5)", backdropFilter: "blur(10px)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2", display: "flex", alignItems: "center" }}>
            <img src={takeoutdoor} alt="E-Hoarding Logo" style={{ height: "70px", marginRight: "10px" }} />
          </Typography>

         

          <Button color="primary" variant="contained" component={Link} to="/signin" sx={{ ml: 2, fontWeight: "bold" }}>Sign In</Button>
          <Button color="primary" variant="contained" component={Link} to="/signup" sx={{ ml: 2, fontWeight: "bold" }}>Sign Up</Button>
          <Button color="primary" variant="contained" onClick={handleContactClick} sx={{ ml: 2, fontWeight: "bold", ":hover": {} }}>Contact Us</Button>
          <Button color="primary" variant="contained" onClick={handleServiceClick} sx={{ ml: 2, fontWeight: "bold", ":hover": {} }}>Services</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: "100vh",
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
              py: 10,
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: 2,
              px: 4,
            }}
          >
             <Typography variant="h3" fontWeight="bold" sx={{mt:2}}>
              WELCOME TO TAKEOUTDOORS!
            </Typography>
            <Typography variant="h4"  sx={{mt:2}}>
              Find & Book Hoardings Easily!
            </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
              A seamless way to advertise in prime locations.
            </Typography>
            {/* <motion.div variants={hoverEffect} whileHover="whileHover">
              
             

            </motion.div> */}
          </Box>
        </motion.div>
      </div>

  <Box sx={{backgroundColor:"rgba(193, 190, 214, 0.5)"}}>
      {/* Features Section */}
      <Box id="Service" sx={{ pt: 0, pb: 0,marginTop:"-46px"}} >
        <Container maxWidth="xl" sx={{ mt: 6 }}>
          <Grid container spacing={4}>
            {[
              { id: "location", title: "Location-Based Search", desc: "Find hoardings near you easily.", icon: <LocationOn sx={{ fontSize: 40, color: "#1976d2" }} /> },
              { id: "availability", title: "Real-Time Availability", desc: "Check hoarding availability instantly.", icon: <Search sx={{ fontSize: 40, color: "#1976d2" }} /> },
              { id: "payments", title: "Secure Payments", desc: "Safe and seamless payment options.", icon: <Payment sx={{ fontSize: 40, color: "#1976d2" }} /> }
            ].map((feature) => (
              <Grid item xs={12} md={4} key={feature.id}>
                <motion.div variants={featureHover} whileHover="whileHover">
                  <Card id={feature.id} sx={{ textAlign: "center", p: 3, boxShadow: 5, borderRadius: 4 }}>
                    <CardContent>
                      <IconButton>{feature.icon}</IconButton>
                      <Typography variant="h5" fontWeight="bold" color="black">{feature.title}</Typography>
                      <Typography variant="body1" color="text.black" sx={{ mt: 1 }}>{feature.desc}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      <Box sx={{ height: 50 }} />

      {/* Call-to-Action Section */}
      <motion.div variants={fadeInSlow} initial="hidden" animate="visible">
        <Box sx={{ textAlign: "center", py: 5,  color: "black", marginTop: "-30px",    marginBottom: "-46px" }}>
          <Typography variant="h4" fontWeight="bold">Start Advertising Smarter Today!</Typography>
          <motion.div variants={hoverEffect} whileHover="whileHover">
            <Button variant="contained" color="primary" sx={{ mt: 3, fontWeight: "bold" }} component={Link} to="/signup">Sign Up Now</Button>
          </motion.div>
        </Box>
      </motion.div>
  </Box>

      {/* Contact Section */}
      <Box id="contact-section" sx={{ textAlign: "center", py: 6, backgroundColor:"rgba(29, 33, 49, 0.8)", color: "black", mt: 6 }}>
        <Typography variant="h4" fontWeight="bold">Contact Us</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>Email: contact@ehoarding.com</Typography>
        <Typography variant="body1">Phone: +123 456 7890</Typography>
      </Box>
    </Box>
  );
}
