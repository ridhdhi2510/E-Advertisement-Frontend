import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem, 
  TextField, Box, Modal, Backdrop, IconButton 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BookHording = () => {
  const navigate = useNavigate();
  const [hordings, setHordings] = useState([]);
  const [selectedHording, setSelectedHording] = useState(null);
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("/hording/getAll").then((res) => setHordings(res.data.data)).catch(() => setHordings([]));
  }, []);

  const handleHordingClick = (hording) => {
    setSelectedHording(hording);
    setModalOpen(true);
  };

  // ✅ Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotalCost = () => {
    if (!formData.startDate || !formData.endDate || !selectedHording) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? diffInDays * 24 * selectedHording.hourlyRate : 0;
  };

  const handleBooking = () => {
    if (!selectedHording || !formData.startDate || !formData.endDate) {
      alert("Please select valid dates.");
      return;
    }
    navigate("/customer/bookhording/payment", {
      state: {
        selectedHording,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalCost: calculateTotalCost(),
      },
    });
  };

  return (
    <Container>
      <Box mt={3}>
        <Grid container spacing={2} mt={2}>
          {hordings.length > 0 ? hordings.map((hording) => (
            <Grid item xs={12} sm={6} md={4} key={hording._id}>
              <Card
                onClick={() => handleHordingClick(hording)}
                sx={{ cursor: "pointer", height: 350, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}
              >
                <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                  <Box sx={{ height: 150, width: "100%", overflow: "hidden" }}>
                    <img src={hording.hordingURL || "https://via.placeholder.com/280x150"} alt="Hoarding" width="100%" height="100%" style={{ objectFit: "cover", borderRadius: "4px" }} />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>{hording.hoardingType || "Unknown Type"}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem", textTransform: "lowercase", color: "gray.600" }}>{hording.hoardingDimension || "N/A"}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "gray.600", mt: 1 }}>{hording.areaId?.name}, {hording.cityId?.name}, {hording.stateId?.name}</Typography>
                  <Typography variant="body2" sx={{ color: "gray.600", mt: 1 }}>Hourly Rate: ${hording.hourlyRate || "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )) : <Typography variant="h6" align="center" mt={3}>No hoardings available</Typography>}
        </Grid>

        {/* ✅ Payment Details Modal with Close Button */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}  // ✅ Now this function exists
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {/* ✅ Close (X) Button */}
            <IconButton
              onClick={handleCloseModal}  // ✅ Works fine now
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "gray",
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedHording && (
              <>
                <Typography variant="h6">{selectedHording.hoardingType}</Typography>
                <Typography variant="body2">Size: {selectedHording.hoardingDimension}</Typography>
                <Typography variant="body2">Rate: ${selectedHording.hourlyRate} per hour</Typography>
                <TextField fullWidth type="date" name="startDate" value={formData.startDate} onChange={handleChange} label="Start Date" InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
                <TextField fullWidth type="date" name="endDate" value={formData.endDate} onChange={handleChange} label="End Date" InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
                <Typography variant="h6" color="primary" mt={2}>Total Cost: ${calculateTotalCost()}</Typography>
                <Button variant="contained" color="primary" onClick={handleBooking} sx={{ mt: 2 }} disabled={!selectedHording}>
                  Continue to Payment
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default BookHording;
