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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [hordings, setHordings] = useState([]);
  const [selectedHording, setSelectedHording] = useState(null);
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    area: '',
    startDate: "",
    endDate: "",
    adName: "",
    adDescription: "",
    websiteUrl: ""
  });
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

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCityByStateId = (id) => {
    setFormData(prev => ({ ...prev, city: '', area: '' }));
    setCities([]);
    setAreas([]);
    if (id) {
      axios.get(`/city/getcitybystate/${id}`)
        .then((res) => setCities(res.data.data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  };

  const getAreaByCityId = (id) => {
    setFormData(prev => ({ ...prev, area: '' }));
    setAreas([]);
    if (id) {
      axios.get(`/area/getareabycity/${id}`)
        .then((res) => setAreas(res.data.data))
        .catch((err) => console.error("Error fetching areas:", err));
    }
  };

  const handleHordingClick = (hording) => {
    setSelectedHording(hording);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        adpic:formData.adFileUrl,
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
        {/* State, City, and Area Filters */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Select
              fullWidth
              name="state"
              value={formData.state}
              onChange={(e) => {
                handleChange(e);
                getCityByStateId(e.target.value);
              }}
              displayEmpty
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((s) => (
                <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs>
            <Select
              fullWidth
              name="city"
              value={formData.city}
              onChange={(e) => {
                handleChange(e);
                getAreaByCityId(e.target.value);
              }}
              displayEmpty
              disabled={!formData.state}
            >
              <MenuItem value="">Select City</MenuItem>
              {cities.map((c) => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs>
            <Select
              fullWidth
              name="area"
              value={formData.area}
              onChange={handleChange}
              displayEmpty
              disabled={!formData.city}
            >
              <MenuItem value="">Select Area</MenuItem>
              {areas.map((a) => (
                <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Hoarding Cards */}
        <Grid container spacing={2} mt={2}>
          {hordings.length > 0 ? hordings.map((hording) => (
            <Grid item xs={12} sm={6} md={4} key={hording._id}>
              <Card
                onClick={() => handleHordingClick(hording)}
                sx={{
                  height: 330,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                  boxShadow: 2,
                  borderRadius: 2,
                  border: "1px solid #ddd"
                }}
              >
                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                  <Box sx={{ height: 170, width: "100%", overflow: "hidden" }}>
                    <img
                      src={hording.hordingURL}
                      alt="Hoarding"
                      width="100%"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%"
                      }}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', padding:1 }}  >
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800", padding: 1,paddingLeft:0.02 }}>
                        {hording.hoardingType}</Typography>
                      <Typography variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>({hording.hoardingDimension})</Typography>

                    </Box>
                 
                    <Typography variant="body2" sx={{ padding: 1 }}>
                      {hording.areaId?.name}, {hording.cityId?.name}, {hording.stateId?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray.600", mt: 1, padding: 1 }}>
                      Hourly Rate: Rs.{hording.hourlyRate}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )) : (
            <Typography variant="h6" align="center" mt={3} width="100%">
              No hoardings available
            </Typography>
          )}
        </Grid>

        {/* Payment Details Modal */}
        <Modal
          open={modalOpen}
          onClose={() => { }} // Disable default close behavior
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            onClick: (e) => e.stopPropagation() // Prevent closing on backdrop click
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 700 },
              maxWidth: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          >
            <IconButton
              onClick={handleCloseModal}
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
                <Typography variant="body2">Rate: Rs.{selectedHording.hourlyRate} per hour</Typography>

                <TextField
                  fullWidth
                  name="adName"
                  label="Ad Name"
                  value={formData.adName}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />

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

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Upload Ad Content:</Typography>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="adFile"
                    
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Create object URL for preview (if needed)
                        const fileUrl = URL.createObjectURL(file);
                        setFormData({ 
                          ...formData, 
                          adFile: file,
                          adFileUrl: file.type.startsWith('image/') ? fileUrl : null
                        });
                      }
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  type="url"
                  name="websiteUrl"
                  label="Website or Product URL (Optional)"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  sx={{ mt: 2 }}
                />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        inputProps: {
                          min: getTodayDate() // Disable past dates
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        inputProps: {
                          min: formData.startDate || getTodayDate() // Can't be before start date
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" color="primary" mt={2}>
                  Total Cost: Rs.{calculateTotalCost()}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleBooking}
                  sx={{ mt: 2 }}
                  disabled={!selectedHording || !formData.startDate || !formData.endDate}
                  size="large"
                >
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