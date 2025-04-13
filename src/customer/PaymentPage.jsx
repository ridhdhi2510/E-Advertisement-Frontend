import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
  Button,
  Snackbar,
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

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
  marginTop: theme.spacing(4)
}));

const StripePaymentForm = ({ clientSecret, amount, adpic, selectedHording, adName, adDescription, websiteProductUrl, startDate, endDate, totalCost, navigate, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const formData = new FormData();

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
          const id = localStorage.getItem("id");

          if (!id) {
            alert("User not authenticated. Please login again.");
            navigate("/login");
            return;
          }

          // Check availability
          const availibility = await axios.get(`/booking/check-availibility/${selectedHording._id}/${startDate}/${endDate}`);

          if (!availibility.data.canBookFullRange) {
            alert("Dates were booked by someone else. Please select new dates.");
            navigate("/customer/bookhording");
            return;
          }

          // Record payment
          const paymentRes = await axios.post("/payment/add", {
            amount: totalCost,
            paymentStatus: paymentIntent.status,
            transactionId: paymentIntent.id,
            userId: id,
            bookingId: null
          });

          if (paymentRes.data?.data && paymentRes.status === 201) {
            const paymentId = paymentRes.data.data._id;

            const response = await fetch(adpic);
            const blob = await response.blob();
            const file = new File([blob], "adContent.jpg", { type: blob.type });

            formData.append("hordingId", selectedHording._id);
            formData.append("userId", id);
            formData.append("adName", adName);
            formData.append("adDescription", adDescription);
            formData.append("adFile", file);
            formData.append("websiteProductUrl", websiteProductUrl);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("totalCost", totalCost);
            formData.append("paymentId", paymentId);

            const bookingRes = await axios.post("/booking/addwithfile", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            const bookingId = bookingRes.data.data._id;

            await axios.put(`/payment/update/${paymentId}`, {
              bookingId: bookingId
            });

            onSuccess(paymentIntent);
            setTimeout(() => navigate("/customer/mybookings"), 2000);
          } else {
            onError("Payment failed. Please try again.");
          }
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
          size="large"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : `Pay ₹${amount}`}
        </Button>
      </Box>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    adpic,
    selectedHording,
    adName,
    adDescription,
    websiteProductUrl,
    startDate,
    endDate,
    totalCost
  } = location.state || {};

  const [clientSecret, setClientSecret] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const createIntent = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/stripe/create-booking-payment", {
          amount: totalCost,
          currency: "inr",
          metadata: { description: "Hoarding booking payment" },
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

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box component="img" src={adpic} alt="Hoarding" width="100%" borderRadius={2} />
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
                    adpic={adpic}
                    selectedHording={selectedHording}
                    adName={adName}
                    adDescription={adDescription}
                    websiteProductUrl={websiteProductUrl}
                    startDate={startDate}
                    endDate={endDate}
                    totalCost={totalCost}
                    navigate={navigate}
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
