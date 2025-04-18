import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem,
  TextField, Box, Modal, Backdrop, IconButton, Paper, Chip, Avatar, Stack,
  InputAdornment, Divider, useTheme, Fade
} from "@mui/material";
import {
  Close, LocationOn, CalendarToday, Description, Link,
  AttachFile, Payment, Star, ArrowForward
} from "@mui/icons-material";
import axios from "axios";
import { keyframes } from "@emotion/react";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const BookHording = () => {
  const theme = useTheme();
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
    websiteUrl: "",
    adFile: null,
    adFileUrl: ""
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const calculateTotalCost = () => {
    if (!formData.startDate || !formData.endDate || !selectedHording) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffInDays = Math.ceil(((end - start) + 1) / (1000 * 60 * 60 * 24));
    // console.log(diffInDays * 24 * ((selectedHording.hourlyRate) + 5))
    return diffInDays > 0 ? diffInDays * 24 * ((selectedHording.hourlyRate)+5) : 0;
  };

  const handleBooking = async () => {
    if (!selectedHording || !formData.startDate || !formData.endDate || !formData.adName || !formData.adDescription || !formData.adFileUrl) { //change as per fields
      alert("Please fill all the fields.");
      return;
    }
    try {

      const availibility = await axios.get(`/booking/check-availibility/${selectedHording._id}/${formData.startDate}/${formData.endDate}`)

      if (!availibility.data.canBookFullRange) {
        alert(`These dates are unavailable: ${availibility.data.conflictingDates.join(', ')}`);
        return;
      }
      navigate("/customer/bookhording/payment", {
        state: {
          adpic: formData.adFileUrl,
          selectedHording,
          //userId ?? here or from localStorage
          //need extra fields check??
          adName: formData.adName,
          adDescription: formData.adDescription,
          websiteProductUrl: formData.websiteUrl,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalCost: calculateTotalCost(),
          availabilityCheck: availibility.data
        },
      });
    }
    catch (error) {
      console.error("Availability check failed:", error);
      alert("Error checking availability. Please try again.");
    }
    // console.log({calculateTotalCost})
  };


  const PremiumSelect = ({ label, value, onChange, children, ...props }) => (
    <Select
      fullWidth
      variant="outlined"
      sx={{
        borderRadius: 2,
        bgcolor: 'background.paper',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'divider'
        }
      }}
      value={value}
      onChange={onChange}
      {...props}
    >
      <MenuItem value="" disabled>
        {label}
      </MenuItem>
      {children}
    </Select>
  );

  const EnhancedTextField = ({ label, ...props }) => (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      sx={{
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2
        }
      }}
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Location Filter Section */}
      <Paper elevation={0} sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        background: theme.palette.mode === 'dark' ?
          'linear-gradient(to right, #1a1a1a, #2a2a2a)' :
          'linear-gradient(to right, #f8f9fa, #ffffff)',
        boxShadow: theme.shadows[4]
      }}>
        <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
          Find Perfect Hoarding Location
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <PremiumSelect
              name="state"
              value={formData.state}
              onChange={(e) => {
                handleChange(e);
                getCityByStateId(e.target.value);
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>Select State</MenuItem>
              {states.map((s) => (
                <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
              ))}
            </PremiumSelect>
          </Grid>

          <Grid item xs={12} md={4}>
            <PremiumSelect
              name="city"
              value={formData.city}
              onChange={(e) => {
                handleChange(e);
                getAreaByCityId(e.target.value);
              }}
              disabled={!formData.state}
              displayEmpty
            >
              <MenuItem value="" disabled>Select City</MenuItem>
              {cities.map((c) => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </PremiumSelect>
          </Grid>

          <Grid item xs={12} md={4}>
            <PremiumSelect
              name="area"
              value={formData.area}
              onChange={handleChange}
              disabled={!formData.city}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Area</MenuItem>
              {areas.map((a) => (
                <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
              ))}
            </PremiumSelect>
          </Grid>
        </Grid>
      </Paper>

      {/* Hoarding Cards Grid */}
      {hordings.length > 0 ? (
        <Grid container spacing={3}>
          {hordings.map((hording) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hording._id}>
              <Card
                onClick={() => handleHordingClick(hording)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                    animation: `${float} 3s ease-in-out infinite`
                  }
                }}
              >
                <Box sx={{
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden'
                }}>
                  <img
                    src={hording.hordingURL}
                    alt="Hoarding"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      ':hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                  <Chip
                    label={`₹${(hording.hourlyRate)+5}/hr`}
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 700
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="700" gutterBottom>
                    {hording.hoardingType}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LocationOn color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {hording.areaId?.name}, {hording.cityId?.name}
                    </Typography>
                  </Stack>
                  <Chip
                    label={hording.hoardingDimension}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
          textAlign: 'center'
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="No hoardings"
            style={{ width: 150, opacity: 0.7, marginBottom: 16 }}
          />
          <Typography variant="h6" color="text.secondary">
            No hoardings available for selected location
          </Typography>
          <Button
            variant="text"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              setFormData({ ...formData, state: '', city: '', area: '' });
              fetchFilteredHordings();
            }}
          >
            Clear filters
          </Button>
        </Box>
      )}

      {/* Booking Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0,0,0,0.8)' }
        }}
      >
        <Fade in={modalOpen}>
          <Paper sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '80%', md: 700 },
            maxHeight: '90vh',
            overflowY: 'auto',
            p: 4,
            borderRadius: 4,
            outline: 'none'
          }}>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'text.secondary'
              }}
            >
              <Close />
            </IconButton>

            {selectedHording && (
              <>
                <Typography variant="h5" fontWeight="700" gutterBottom>
                  Book {selectedHording.hoardingType}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{
                      height: 200,
                      borderRadius: 2,
                      overflow: 'hidden',
                      mb: 2
                    }}>
                      <img
                        src={selectedHording.hordingURL}
                        alt="Selected Hoarding"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Chip
                        icon={<LocationOn />}
                        label={`${selectedHording.areaId?.name}, ${selectedHording.cityId?.name}`}
                        variant="outlined"
                      />
                      <Chip
                        icon={<CalendarToday />}
                        label={`₹${(selectedHording.hourlyRate)+5}/hr`}
                        color="primary"
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Ad Campaign Name"
                      name="adName"
                      value={formData.adName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Description color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Ad Description"
                      name="adDescription"
                      value={formData.adDescription}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      fullWidth
                      sx={{ mt: 2 }}
                    />

                    <Box sx={{ mt: 2 }}>
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<AttachFile />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2
                        }}
                      >
                        Upload Ad Content
                        <input
                          type="file"
                          accept="image/*,video/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const fileUrl = URL.createObjectURL(file);
                              setFormData({
                                ...formData,
                                adFile: file,
                                adFileUrl: file.type.startsWith('image/') ? fileUrl : null
                              });
                            }
                          }}
                        />
                      </Button>
                      {formData.adFile && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Selected: {formData.adFile.name}
                        </Typography>
                      )}
                    </Box>

                    <TextField
                      label="Website/Product URL (Optional)"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Link color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <EnhancedTextField
                          type="date"
                          label="Start Date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              min: getTodayDate()
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <EnhancedTextField
                          type="date"
                          label="End Date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              min: formData.startDate || getTodayDate()
                            }
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Paper elevation={0} sx={{
                      p: 2,
                      mt: 3,
                      borderRadius: 2,
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText'
                    }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6">Total Cost</Typography>
                        <Typography variant="h4" fontWeight="700">
                          ₹{calculateTotalCost()}
                        </Typography>
                      </Stack>
                    </Paper>

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      onClick={handleBooking}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': {
                          animation: `${pulse} 1s infinite`
                        }
                      }}
                      disabled={!selectedHording || !formData.startDate || !formData.endDate}
                    >
                      Continue to Payment
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </Container>
  );
};

export default BookHording;