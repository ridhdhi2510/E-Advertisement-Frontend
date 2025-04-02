import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem,
  TextField, Box, Modal, Backdrop, IconButton, CardActionArea, CardMedia
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BookHording = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [hordings, setHordings] = useState([]);
  const [selectedHording, setSelectedHording] = useState(null);
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("/state/getall").then((res) => setStates(res.data.data));
    fetchFilteredHordings();
  }, []);

  useEffect(() => {
    fetchFilteredHordings();
  }, [formData.state, formData.city, formData.area]);

  const fetchFilteredHordings = () => {
    const { state, city, area } = formData;
    let queryParams = [];

    if (state) queryParams.push(`stateId=${state}`);
    if (city) queryParams.push(`cityId=${city}`);
    if (area) queryParams.push(`areaId=${area}`);

    let query = queryParams.length ? `?${queryParams.join("&")}` : "";

    axios.get(`/hording/getHordingsByLocation${query}`)
      .then((res) => {
        setHordings(res.data.data);
      })
      .catch(() => setHordings([]));
  };

  const getCityByStateId = (id) => {
    axios.get(`/city/getcitybystate/${id}`)
      .then((res) => setCities(res.data.data))
      .catch((err) => console.error("Error fetching cities:", err));
  };

  const getAreaByCityId = (id) => {
    axios.get(`/area/getareabycity/${id}`)
      .then((res) => setAreas(res.data.data))
      .catch((err) => console.error("Error fetching areas:", err));
  };


  useEffect(() => {
    axios.get("/hording/getAll").then((res) => setHordings(res.data.data)).catch(() => setHordings([]));
  }, []);

  const handleHordingClick = (hording) => {
    setSelectedHording((prev) => (prev && prev._id === hording._id ? null : hording));
    setModalOpen((prev) => !(prev && prev._id === hording._id)); // Toggle modal based on selection
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
    if (!selectedHording || !formData.startDate || !formData.endDate) { //change as per fields
      alert("Please select valid dates.");
      return;
    }
    navigate("/customer/bookhording/payment", {
      state: {
        selectedHording,
        //need extra fields check??
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalCost: calculateTotalCost(),
      },
    });
  };

  return (
    <Container>
      <Box mt={3}>
        {/* State, City, and Area Filters */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Select
              fullWidth
              name="state"
              value={formData.state}
              onChange={(e) => { handleChange(e); getCityByStateId(e.target.value); }}
              displayEmpty
              renderValue={formData.state ? undefined : () => "Select State"}
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((s) => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs>
            <Select
              fullWidth
              name="city"
              value={formData.city}
              onChange={(e) => { handleChange(e); getAreaByCityId(e.target.value); }}
              displayEmpty
              renderValue={formData.city ? undefined : () => "Select City"}
            >
              <MenuItem value="">Select City</MenuItem>
              {cities.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs>
            <Select
              fullWidth
              name="area"
              value={formData.area}
              onChange={handleChange}
              displayEmpty
              renderValue={formData.area ? undefined : () => "Select Area"}
            >
              <MenuItem value="">Select Area</MenuItem>
              {areas.map((a) => <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>)}
            </Select>
          </Grid>
        </Grid>

        {/* Hoarding Cards */}
        <Grid container spacing={2} mt={2}>
          {hordings.length > 0 ? hordings.map((hording) => (
            <Grid item xs={12} sm={6} md={4} key={hording._id}>
              <Card onClick={() => handleHordingClick(hording)} sx={{ height: 310, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", boxShadow: 2, borderRadius: 2, border: "1px solid #ddd", mt:2, mr:1 }}>

                
                  {/* <Box sx={{ height: 180, width: "100%", overflow: "hidden" }}> */}
                  <Box sx={{ height: 170, width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardMedia
                    component="img"
                    image={hording.hordingURL}
                    alt="Hoarding"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                    {/* <img src={hording.hordingURL} alt="Hoarding" width="100%" style={{ objectFit: "cover", maxHeight: "250px", height: "auto" }} /> */}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "gray.800" }} >{hording.hoardingType}</Typography>
                    <Typography variant="body2" sx={{fontSize:"15px", mt:2}}>{hording.areaId?.name}, {hording.cityId?.name}, {hording.stateId?.name}</Typography>
                    <Typography variant="body2" sx={{ color: "gray.600", mt: 0.5 }} >Hourly Rate: ${hording.hourlyRate}</Typography>
                  </Box>
                </CardContent>

              </Card>
            </Grid>
          )) : <Typography variant="h6" align="center" mt={3}>No hoardings available</Typography>}
        </Grid>

        {/* Payment Details Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%", // Responsive width
              maxWidth: "600px",
              maxHeight: "90vh",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 3, // ✅ Increased to ensure proper rounding
              display: "flex",
              flexDirection: "column",
              overflow: "hidden", // Prevents inner content from breaking rounding
            }}
          >

            <Box
              sx={{
                overflowY: "auto",
                maxHeight: "90vh", // ✅ Ensures scrolling inside modal
                paddingRight: "8px",
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
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>
                    {selectedHording.hoardingType}
                  </Typography>
                  <Typography variant="body2">Size: {selectedHording.hoardingDimension}</Typography>
                  {/* add location */}
                  <Typography variant="body2">Rate: ${selectedHording.hourlyRate} per hour</Typography>

                  {/* Ad Name */}
                  <TextField
                    fullWidth
                    name="adName"
                    label="Ad Name"
                    value={formData.adName}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                  />

                  {/* Ad Description */}
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name="adDescription"
                    label="Ad Description"
                    value={formData.adDescription}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                  />

                  {/* File Upload */}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="adFile"
                    onChange={(e) => setFormData({ ...formData, adFile: e.target.files[0] })}
                    style={{ marginTop: "16px" }}
                  />

                  {/* Website or Product URL (Optional) */}
                  <TextField
                    fullWidth
                    type="url"
                    name="websiteUrl"
                    label="Website or Product URL (Optional)"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                  />

                  {/* Start Date */}
                  <TextField
                    fullWidth
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />

                  {/* End Date */}
                  <TextField
                    fullWidth
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />

                  {/* Total Cost */}
                  <Typography variant="h6" color="primary" mt={2}>
                    Total Cost: ${calculateTotalCost()}
                  </Typography>

                  {/* Continue to Payment Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBooking}
                    sx={{ mt: 2 }}
                    disabled={!selectedHording}
                  >
                    Continue to Payment
                  </Button>
                </>
              )}


            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};


export default BookHording;
