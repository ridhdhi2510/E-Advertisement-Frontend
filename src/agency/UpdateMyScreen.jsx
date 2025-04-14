import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  TextField, 
  MenuItem, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress 
} from "@mui/material";
import CustomLoader from "../component/CustomLoader";

export const UpdateMyScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    hoardingDimension: '',
    hoardingType: '',
    hourlyRate: '',
    latitude: '',
    longitude: '',
    stateId: '',
    cityId: '',
    areaId: ''
  });

  // Store initial names for display
  const [initialNames, setInitialNames] = useState({
    stateName: '',
    cityName: '',
    areaName: ''
  });

  // Track if initial data is loaded
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get all states first
        const statesRes = await axios.get('/state/getall');
        setStates(statesRes.data.data);
        
        // Then get the hoarding details
        const hoardingRes = await axios.get(`/hording/getHordingById/${id}`);
        const data = hoardingRes.data.data;
        
        // Set initial names
        setInitialNames({
          stateName: data.stateId?.name || '',
          cityName: data.cityId?.name || '',
          areaName: data.areaId?.name || ''
        });

        // Set form data
        setFormData({ 
          hoardingDimension: data.hoardingDimension || '',
          hoardingType: data.hoardingType || '',
          hourlyRate: data.hourlyRate || '',
          latitude: data.latitude || '',
          longitude: data.longitude || '',
          stateId: data.stateId?._id || '',
          cityId: data.cityId?._id || '',
          areaId: data.areaId?._id || ''
        });

        // If state exists, get its cities
        if (data.stateId?._id) {
          const citiesRes = await axios.get(`/city/getcitybystate/${data.stateId._id}`);
          setCities(citiesRes.data.data);
          
          // If city exists, get its areas
          if (data.cityId?._id) {
            const areasRes = await axios.get(`/area/getareabycity/${data.cityId._id}`);
            setAreas(areasRes.data.data);
          }
        }

        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStateChange = (e) => {
    const newStateId = e.target.value;
    setFormData(prev => ({
      ...prev,
      stateId: newStateId,
      cityId: '',
      areaId: ''
    }));

    setCities([]);
    setAreas([]);

    if (newStateId) {
      getCityByStateId(newStateId);
    }
  };

  const handleCityChange = (e) => {
    const newCityId = e.target.value;
    setFormData(prev => ({
      ...prev,
      cityId: newCityId,
      areaId: ''
    }));

    setAreas([]);

    if (newCityId) {
      getAreaByCityId(newCityId);
    }
  };

  const getCityByStateId = async (stateId) => {
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getAreaByCityId = async (cityId) => {
    try {
      const res = await axios.get(`/area/getareabycity/${cityId}`);
      setAreas(res.data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!formData.hoardingDimension || !formData.hoardingType || !formData.hourlyRate || 
          !formData.latitude || !formData.longitude || !formData.stateId || 
          !formData.cityId || !formData.areaId) {
        alert("All fields are required. Please fill out the form completely.");
        return;
      }
  
      const dataToSend = {
        ...formData,
        userId: localStorage.getItem("id")
      };
      
      setIsLoading(true);
      const res = await axios.put(`/hording/updatehording/${id}`, dataToSend);
      setIsLoading(false);
    
      if (res.status === 200) {
        alert('Updated successfully!'); 
        navigate('/agency/myscreens'); 
      } else {
        alert("Failed to update hoarding: " + res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {isLoading && <CustomLoader />}
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update Hoarding
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={4}>
            {/* Hoarding Dimension */}
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Hoarding Dimension" 
                name="hoardingDimension"
                value={formData.hoardingDimension}
                onChange={handleInputChange}
                variant="outlined" 
              />
            </Grid>

            {/* State Selection */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select State"
                name="stateId"
                value={formData.stateId}
                onChange={handleStateChange}
                variant="outlined"
              >
                <MenuItem value="">SELECT STATE</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                ))}
                {initialLoadComplete && formData.stateId && !states.some(s => s._id === formData.stateId) && (
                  <MenuItem value={formData.stateId}>
                    {initialNames.stateName}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

            {/* Hoarding Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Hoarding Type"
                name="hoardingType"
                value={formData.hoardingType}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="">SELECT TYPE</MenuItem>
                <MenuItem value="Unipole">Unipole</MenuItem>
                <MenuItem value="Billboard">Billboard</MenuItem>
                <MenuItem value="Gantry">Gantry</MenuItem>
                <MenuItem value="Digital">Digital</MenuItem>
              </TextField>
            </Grid>

            {/* City Selection */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select City"
                name="cityId"
                value={formData.cityId}
                onChange={handleCityChange}
                variant="outlined"
                disabled={!formData.stateId}
              >
                <MenuItem value="">SELECT CITY</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
                ))}
                {initialLoadComplete && formData.cityId && !cities.some(c => c._id === formData.cityId) && (
                  <MenuItem value={formData.cityId}>
                    {initialNames.cityName}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

            {/* Longitude */}
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Longitude" 
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                variant="outlined" 
              />
            </Grid>

            {/* Area Selection */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select Area"
                name="areaId"
                value={formData.areaId}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!formData.cityId}
              >
                <MenuItem value="">SELECT AREA</MenuItem>
                {areas.map((area) => (
                  <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>
                ))}
                {initialLoadComplete && formData.areaId && !areas.some(a => a._id === formData.areaId) && (
                  <MenuItem value={formData.areaId}>
                    {initialNames.areaName}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

            {/* Latitude */}
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Latitude" 
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                variant="outlined" 
              />
            </Grid>

            {/* Hourly Rate */}
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Hourly Rate" 
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                variant="outlined" 
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                type="submit" 
                size="large"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Update"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};