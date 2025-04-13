import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  Grid,
  Box,
  Snackbar,

  Divider,
  Paper,
  CircularProgress
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { styled } from "@mui/material/styles";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
  marginTop: theme.spacing(4)
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1)
}));

const StripePaymentForm = ({ clientSecret, amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required"
      });

      if (error) {
        onError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        const verification = await axios.post("http://localhost:3000/stripe/confirm-booking-payment", {
          paymentIntentId: paymentIntent.id
        });

        if (verification.data.status === "success") {
          onSuccess(paymentIntent);
        } else {
          onError("Payment verification failed");
        }
      }
    } catch (err) {
      onError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async () => {
    if ( totalCost) {
      // setShowOtp(true);
      try {
        
        const availibility = await axios.get(
          `/booking/check-availibility/${selectedHording._id}/${startDate}/${endDate}`
        );

        

        if (!availibility.data.canBookFullRange) {
          alert("Dates were booked by someone else. Please select new dates.");
          navigate("/customer/bookhording");
          return;
        }
        setShowOtp(true);
        const id = localStorage.getItem("id");
        if (!id) {
          alert("User not authenticated. Please login again.");
          navigate("/login");
          return;
        }
        try {
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
         const transactionId=paymentIntent.id;
         const paymentStatus=paymentIntent.status;
          // 1. Simulate payment success and call /payment/add
          const paymentRes = await axios.post("/payment/add", {
            // userId: "123", // Replace with actual user ID
            amount: totalCost,
            paymentStatus: paymentStatus,
            transactionId: transactionId,
            userId: id,
            bookingId: null,
            // amount: 7000,
            // transactionId: "abc789pay12345",
            // paymentStatus: "Completed",
            // bookingId: "67d104e60627895788c52146",
            // userId:"67cf1802ed7f840f5f910a79"
          });
          console.log("payment res:", paymentRes);
          // const paymentId = paymentRes.data.data._id;

          if (paymentRes.data?.data && paymentRes.status === 201) {
            const paymentId = paymentRes.data.data._id;

            // Convert the adpic (URL) to blob
            const response = await fetch(adpic);
            const blob = await response.blob();
            const file = new File([blob], "adContent.jpg", { type: blob.type });

            // 2. Prepare FinalData for booking
            formData.append("hordingId", selectedHording._id);
            formData.append("userId", id);
            formData.append("adName", adName);
            formData.append("adDescription", adDescription);
            formData.append("adFile", file); // ✅ FIXED: match 'adFile' as expected by multer
            formData.append("websiteProductUrl", websiteProductUrl);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("totalCost", totalCost);
            formData.append("paymentId", paymentId); // from successful payment

            // 3. Call booking API
            const bookingRes = await axios.post(
              "/booking/addwithfile",
              formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
            );
            // console.log(bookingRes)
            const bookingId = bookingRes.data.data._id;

            await axios.put(`/payment/update/${paymentId}`, {
              bookingId: bookingId // This is correct - matches the destructured backend expectation
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            setOpenSnackbar(true);

            // Optional: Navigate to booking confirmation page
            setTimeout(() => {
              navigate("/customer/mybookings");
            }, 2000);
          } else {
            console.error("Payment failed or invalid response");
            alert("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error("Error in payment flow:", error);
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Final availability check failed:", error);
        alert("Payment processing error. Please try again.");
      }
    } else {
      alert("Please fill in all card details.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <PaymentElement />
      </Paper>
      <Box mt={3}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe || loading}
          fullWidth
          onClick={handlePayment}
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          {loading ? (
            <CircularProgress  size={24} color="inherit" />
          ) : (
            `Pay $${amount}`
          )}


        </Button>
      </Box>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = new FormData();

  const {
    adpic,
    selectedHording,
    adName,
    adDescription,
    websiteProductUrl,
    startDate,
    endDate,
    totalCost,
  } = location.state || {};
  // const { adpic,selectedHording, startDate, endDate, totalCost} = location.state || {};
  // console.log(location.state)
  const [transactionId, settransactionid] = useState("");
  const [paymentStatus, setpaymentstatus] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/stripe/create-booking-payment", {
          amount: totalCost,
          currency: "inr",
          metadata: {
            description: "Hoarding booking payment"
          },
          payment_method_types: ['card', 'upi']
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent", err);
      }
    };

    createIntent();
  }, [totalCost]);

  const handlePaymentSuccess = (paymentIntent) => {
    setSnackbarMessage("Payment successful! Booking confirmed.");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };
  const handlePaymentError = (error) => {
    setSnackbarMessage(`Payment failed: ${error}`);
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };


 
  // const handlePayment = async() => {
  //   try {
  //     // Final availability verification
  //     const response = await axios.get('/booking/check-availibility', {
  //       params: {
  //         hordingId: selectedHording._id,
  //         startDate: startDate,
  //         endDate: endDate
  //       }
  //     });

  //     if (!response.data.canBookFullRange) {
  //       alert("Dates were booked by someone else. Please select new dates.");
  //       navigate('/customer/bookhording');
  //       return;
  //     }
  //     setShowOtp(true);
  //   }
  //   catch (error) {
  //     console.error("Final availability check failed:", error);
  //     alert("Payment processing error. Please try again.");
  //   }
  // }

  const handleOtpSubmit = async () => {
    // const id=localStorage.getItem("id")
    // try {
    //   // 1. Simulate payment success and call /payment/add
    //   const paymentRes = await axios.post("/payment/add", {
    //     // userId: "123", // Replace with actual user ID
    //     amount: totalCost,
    //     status: paymentStatus,
    //     transactionId:transactionId,
    //     userId: id
    //     // bookingId: selectedHording._id, // optional
    //   });
    //   const paymentId = paymentRes.data.data._id;
    //   if (paymentRes.data?.data && paymentRes.status === 200) {
    //     const paymentId = paymentRes.data.data._id;
    //     // 2. Prepare FormData for booking
    //     const formData = new FormData();
    //     formData.append("adName", adName);
    //     formData.append("adDescription", adDescription);
    //     formData.append("websiteProductUrl", websiteProductUrl);
    //     formData.append("startDate", startDate);
    //     formData.append("endDate", endDate);
    //     formData.append("hoardingId", selectedHording?._id);
    //     formData.append("totalCost", totalCost);
    //     formData.append("paymentId", paymentId);
    //     //userId
    //     // Convert adpic URL to blob
    //     //store Url???
    //     const response = await fetch(adpic);
    //     const blob = await response.blob();
    //     formData.append("adFile", blob, "adImage.jpg");
    //     // 3. Call booking API
    //     await axios.post("/booking/addwithfile", finalData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //     setOpenSnackbar(true);
    //     // Optional: Navigate to booking confirmation page
    //     setTimeout(() => {
    //       navigate("/customer/bookings");
    //     }, 2000);
    //   } else {
    //     console.error("Payment failed or invalid response");
    //     alert("Payment failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error in payment flow:", error);
    //   alert("Something went wrong. Please try again.");
    // }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            {/* Hoarding Details */}
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={adpic}
                alt="Hoarding"
                width="100%"
                borderRadius={2}
              />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {selectedHording?.hoardingType}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {startDate} - {endDate}
              </Typography>
              <Typography variant="h6" mt={1}>
                Total: ₹{totalCost}
              </Typography>
            </Grid>
            {/* payment  form start*/}
            <Grid item xs={12} md={7}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment Method
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Secure payment processed by Stripe
              </Typography>

              {clientSecret ? (
                <Elements options={{ clientSecret }} stripe={stripePromise}>
                  <StripePaymentForm
                    clientSecret={clientSecret}
                    amount={totalCost}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              ) : (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              )}

              <Box mt={3}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    fontWeight: 'medium'
                  }}
                >
                  Back to Booking
                </Button>
              </Box>

              <Box mt={3} sx={{
                backgroundColor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                textAlign: 'center'
              }}>
                <Typography variant="caption" color="text.secondary">
                  Your payment is secure and encrypted. We don't store your credit card details.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default PaymentPage;
