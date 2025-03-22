// import React, { useState } from "react";
// import { Container, Typography, Button, Grid, TextField, MenuItem, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const BookHording = ({ setBookingDetails }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     state: "California",
//     city: "Los Angeles",
//     area: "Downtown",
//     hoardingType: "Billboard",
//     startDate: "",
//     endDate: "",
//     timeSlot: "Morning (6 AM - 12 PM)",
//     totalCost: 5000,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     //setBookingDetails(formData);
//     navigate("/customer/bookhording/payment");
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Book Advertisement
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Area" name="area" value={formData.area} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Hoarding Type" name="hoardingType" value={formData.hoardingType} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField fullWidth label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField fullWidth label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth select label="Time Slot" name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
//               <MenuItem value="Morning (6 AM - 12 PM)">Morning (6 AM - 12 PM)</MenuItem>
//               <MenuItem value="Afternoon (12 PM - 6 PM)">Afternoon (12 PM - 6 PM)</MenuItem>
//               <MenuItem value="Evening (6 PM - 12 AM)">Evening (6 PM - 12 AM)</MenuItem>
//               <MenuItem value="Night (12 AM - 6 AM)">Night (12 AM - 6 AM)</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h5" color="primary">
//               Total Cost: ${formData.totalCost}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
//               Proceed to Payment
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default BookHording;

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, Button, Grid, Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HpImage from "../assets/EH-2.png";



const BookingHoarding = () => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box sx={{ px: "2rem", mt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  displayEmpty
                  sx={{
                    height: "45px",
                    "&:hover": { border: `0.8px solid ${theme.palette.primary.main}` },
                    "&.Mui-focused": { border: `0.8px solid ${theme.palette.primary.main}` },
                  }}
                >
                  <MenuItem value="" disabled>Select State</MenuItem>
                  <MenuItem value="Gujarat">Gujarat</MenuItem>
                  <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                </Select>
              )}
            />
          </Grid>

          <Grid item xs>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  displayEmpty
                  sx={{
                    height: "45px",
                    "&:hover": { border: `0.8px solid ${theme.palette.primary.main}` },
                    "&.Mui-focused": { border: `0.8px solid ${theme.palette.primary.main}` },
                  }}
                >
                  <MenuItem value="" disabled>Select City</MenuItem>
                  <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                </Select>
              )}
            />
          </Grid>

          <Grid item xs>
            <Controller
              name="area"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  displayEmpty
                  sx={{
                    height: "45px",
                    "&:hover": { border: `0.8px solid ${theme.palette.primary.main}` },
                    "&.Mui-focused": { border: `0.8px solid ${theme.palette.primary.main}` },
                  }}
                >
                  <MenuItem value="" disabled>Select Area</MenuItem>
                  <MenuItem value="Navrangpura">Navrangpura</MenuItem>
                  <MenuItem value="Powai">Powai</MenuItem>
                </Select>
              )}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ height: "45px", minWidth: "120px" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Cards Section */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: 3,
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage: `url(${HpImage})`, // ✅ Corrected background image syntax
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Hoarding Details */}
                <CardContent
                  sx={{
                    height: "30%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
                    color: "white",
                  }}
                >
                  <Typography variant="subtitle1">Size: 20ft x 10ft</Typography>
                  <Typography variant="body2">Type: Billboard</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </form>
    </Box>
    </>
  );
};

export default BookingHoarding;