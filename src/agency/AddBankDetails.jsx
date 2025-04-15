import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, TextField, Button, Paper, Typography, CircularProgress } from "@mui/material";
import CustomLoader from "../component/CustomLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBankDetails = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      if (!data.bankName || !data.branchName || data.accountNumber === 0) {
        alert("All fields are required. Please fill out the form completely.");
        return;
      }

      data.userId = localStorage.getItem("id");

      setIsLoading(true);
      const res = await axios.post("/bankdetailsagency/add", data);
      // console.log("Submitted Bank Details:", data);
      // Your API logic goes here
      setIsLoading(false);

      if (res.status === 200) {
        alert("Bank details added successfully!");
        navigate("/agency/addscreen");
      } else {
        alert("Failed to add hoarding: " + res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      {isLoading && <CustomLoader />}
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Bank Details
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={3} direction="column">
            {/* Bank Name */}
            <Grid item>
              <TextField
                fullWidth
                label="Bank Name"
                placeholder="e.g., HDFC Bank"
                variant="outlined"
                {...register("bankName")}
              />
            </Grid>

            {/* Branch Name */}
            <Grid item>
              <TextField
                fullWidth
                label="Branch Name"
                placeholder="e.g., Navrangpura"
                variant="outlined"
                {...register("branchName")}
              />
            </Grid>

            {/* Account Number */}
            <Grid item>
              <TextField
                fullWidth
                label="Account Number"
                placeholder="e.g., 1234567890"
                type="number"
                variant="outlined"
                {...register("accountNumber")}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item>
              <Button fullWidth variant="contained" color="primary" type="submit" size="large">
                {isLoading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBankDetails;
