// import React, { useState } from "react";
// import { Container, Typography, Button, Grid, TextField, Paper, Divider } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import PaymentIcon from "@mui/icons-material/Payment";

// const PaymentPage = ({ bookingDetails }) => {
//   const navigate = useNavigate();
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   const handleChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayment = () => {
//     alert("Payment successful! Your ad is booked.");
//     navigate("/");
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           Secure Payment
//         </Typography>
//         <PaymentIcon style={{ fontSize: 50, color: "#3f51b5" }} />
//         <Divider style={{ margin: "20px 0" }} />
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Card Number" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} placeholder="XXXX-XXXX-XXXX-XXXX" />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Card Holder Name" name="cardHolder" value={paymentDetails.cardHolder} onChange={handleChange} placeholder="John Doe" />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField fullWidth label="Expiry Date" type="month" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField fullWidth label="CVV" type="password" name="cvv" value={paymentDetails.cvv} onChange={handleChange} placeholder="XXX" />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" fullWidth startIcon={<CreditCardIcon />} onClick={handlePayment}>
//               Pay Now
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography, MenuItem, Select, Grid, Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const PaymentPage = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlePayment = () => {
    setShowOtp(true);
  };

  const handleOtpSubmit = () => {
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            {/* Ad Slot Details */}
            <Grid item xs={12} md={4}>
              <Box component="img" src="/ad-slot.jpg" alt="Ad Slot" width="100%" borderRadius={2} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Ad Slot Premium
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ref. AD-2025/001
              </Typography>
              <Typography variant="h6" mt={1}>
                $50.00 USD
              </Typography>
            </Grid>

            {/* Payment Form */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold">
                Payment Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Fill in the info below to continue.
              </Typography>

              <TextField
                label="Cardholder Name"
                variant="standard"
                fullWidth
                margin="normal"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
              <TextField
                label="Card Number"
                variant="standard"
                fullWidth
                margin="normal"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />

              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Expiry Month</Typography>
                  <Select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="standard"
                  >
                    <MenuItem value="" disabled>Month</MenuItem>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">Expiry Year</Typography>
                  <Select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="standard"
                  >
                    <MenuItem value="" disabled>Year</MenuItem>
                    {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem key={i} value={2025 + i}>{2025 + i}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="CVV"
                    type="password"
                    variant="standard"
                    fullWidth
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box mt={3} display="flex" justifyContent="space-between">
                <Button variant="outlined" color="primary" style={{ minWidth: "120px" }}>
                  Back
                </Button>
                <Button variant="contained" color="primary" style={{ minWidth: "120px" }} onClick={handlePayment}>
                  Continue
                </Button>
              </Box>

              {showOtp && (
                <Box mt={3}>
                  <Typography variant="h6" fontWeight="bold">Enter OTP</Typography>
                  <TextField
                    label="One Time Password"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px", minWidth: "120px" }}
                    onClick={handleOtpSubmit}
                  >
                    Submit OTP
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Payment Done!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default PaymentPage;