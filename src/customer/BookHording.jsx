import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem, TextField, Box } from "@mui/material";
import axios from "axios";

const BookHording = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [hordings, setHordings] = useState([]);
  const [selectedHording, setSelectedHording] = useState(null);
  const [formData, setFormData] = useState({ state: "", city: "", area: "", startDate: "", endDate: "" });
  
  useEffect(() => {
    axios.get("/state/getall").then((res) => setStates(res.data.data));
    fetchFilteredHordings();
  }, []);

  useEffect(() => {
    fetchFilteredHordings();
  }, [formData.state, formData.city, formData.area]);

  const fetchFilteredHordings = () => {
    const { state, city, area } = formData;
    let query = "";
    if (state) query += `stateId=${state}&`;
    if (city) query += `cityId=${city}&`;
    if (area) query += `areaId=${area}&`;

    axios.get(`/hording/getHordingsByLocation?${query}`).then((res) => {
      setHordings(res.data.data);
    }).catch(() => setHordings([]));
  };

  const getCityByStateId = (id) => {
    axios.get(`/city/getcitybystate/${id}`).then((res) => setCities(res.data.data));
  };
  
  const getAreaByCityId = (id) => {
    axios.get(`/area/getareabycity/${id}`).then((res) => setAreas(res.data.data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHordingClick = (hording) => {
    setSelectedHording((prev) => (prev && prev._id === hording._id ? null : hording));
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
      alert("Please select a hoarding and valid dates.");
      return;
    }
    const totalCost = calculateTotalCost();
    navigate("/customer/bookhording/payment", {
      state: {
        selectedHording,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalCost,
      },
    });
  };

  return (
    <Container>
      <Box mt={3}>
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

        <Grid container spacing={2} mt={2}>
          {hordings.length > 0 ? hordings.map((hording) => (
            <Grid item xs={12} sm={6} md={4} key={hording._id}>
              <Card onClick={() => handleHordingClick(hording)} sx={{ cursor: "pointer", height: 350, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent>
                  <img src={hording.hordingURL} alt="Hoarding" width="100%" height="150" style={{ objectFit: "cover" }} />
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{hording.hoardingType}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem", textTransform: "lowercase" }}>{hording.hoardingDimension}</Typography>
                  </Box>
                  <Typography variant="body2">{hording.areaId?.name}, {hording.cityId?.name}, {hording.stateId?.name}</Typography>
                  <Typography variant="body2">Hourly Rate: ${hording.hourlyRate}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )) : <Typography variant="h6" align="center" mt={3}>No hoardings available</Typography>}
        </Grid>

        {selectedHording && (
          <Box mt={3} p={2} border={1} borderRadius={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img src={selectedHording.hordingURL} alt="Hoarding" width="100%" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">{selectedHording.hoardingType}</Typography>
                <Typography variant="body2">Size: {selectedHording.hoardingDimension}</Typography>
                <Typography variant="body2">Rate: ${selectedHording.hourlyRate} per hour</Typography>
                <TextField fullWidth type="date" name="startDate" value={formData.startDate} onChange={handleChange} label="Start Date" InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
                <TextField fullWidth type="date" name="endDate" value={formData.endDate} onChange={handleChange} label="End Date" InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
                <Typography variant="h6" color="primary" mt={2}>Total Cost: ${calculateTotalCost()}</Typography>
                <Button variant="contained" color="primary" onClick={handleBooking} sx={{ mt: 2 }} disabled={!selectedHording}>
                  Continue to Payment
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BookHording;

