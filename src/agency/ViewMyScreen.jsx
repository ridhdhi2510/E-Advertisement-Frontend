import { 
  Box, Button, Card, CardContent, CardMedia, Grid, Typography, 
  Container, Paper, Chip, Avatar, Stack, useTheme, useMediaQuery,
  IconButton, Divider, CircularProgress
} from "@mui/material";
import {
  LocationOn, CalendarToday, Edit, Delete, 
  Star, Payment, ArrowForward
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../component/CustomLoader";
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

const HordingCard = ({ data, hordingData, setHordingData, setisLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUpdateClick = () => {
    navigate(`/agency/updateScreen/${data._id}`);
  };

  const handleRemoveClick = async (id) => {
    try {
      setisLoading(true);
      const res = await axios.delete(`/hording/delete/${id}`);
      setisLoading(false);

      if (res.status === 200) {
        setHordingData(hordingData.filter(h => h._id !== id));
        alert("Hoarding deleted successfully! ✅");
      } else {
        console.error("Failed to delete hoarding:", res);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error deleting hoarding:", error);
      alert("Failed to delete hoarding ❌");
    }
  }

  return (
    <Card sx={{ 
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
    }}>
      <Box sx={{ 
        position: 'relative',
        height: 200,
        width: "100%",
        overflow: "hidden"
      }}>
        <CardMedia
          component="img"
          image={data?.hordingURL || "https://via.placeholder.com/200x150"}
          alt="Hoarding"
          sx={{ 
            height: "100%", 
            width: "100%", 
            objectFit: "cover",
            transition: 'transform 0.5s ease',
            ':hover': {
              transform: 'scale(1.1)'
            }
          }}
        />
        <Chip
          label={`₹${data.hourlyRate}/hr`}
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
          {data.hoardingType} - {data.hoardingDimension}
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <LocationOn color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {data.areaId?.name}, {data.cityId?.name}, {data.stateId?.name}
          </Typography>
        </Stack>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 3,
          gap: 2
        }}>
          <Button
            variant="contained"
            onClick={handleUpdateClick}
            //startIcon={<Edit />}
            sx={{ 
              flex: 1,
              borderRadius: 2,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              '&:hover': {
                animation: `${pulse} 1s infinite`
              }
            }}
          >
            {!isMobile ? 'Update' : ''}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveClick(data._id)}
            //startIcon={<Delete />}
            sx={{ 
              flex: 1,
              borderRadius: 2,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
              '&:hover': {
                animation: `${pulse} 1s infinite`
              }
            }}
          >
            {!isMobile ? 'Remove' : ''}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const ViewMyScreen = () => {
  const theme = useTheme();
  const [hordingData, setHordingData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getAllScreens = async () => {
    try {
      setisLoading(true);
      const res = await axios.get("/hording/getHordingsbyuserid/" + localStorage.getItem("id"));
      setisLoading(false);
      
      if (res.data && Array.isArray(res.data.data)) {
        setHordingData(res.data.data);
      } else {
        console.error("Invalid API response:", res.data);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching hoardings:", error);
    }
  };

  useEffect(() => {
    getAllScreens();
  }, []);

  return (
    <>
      {isLoading && <CustomLoader />}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4,
          background: theme.palette.mode === 'dark' ? 
            'linear-gradient(to right, #1a1a1a, #2a2a2a)' : 
            'linear-gradient(to right, #f8f9fa, #ffffff)',
          boxShadow: theme.shadows[4]
        }}>
          <Typography variant="h4" fontWeight="700" gutterBottom sx={{ mb: 2 }}>
            My Advertising Screens
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your existing hoardings or add new ones
          </Typography>
        </Paper>

        {hordingData.length > 0 ? (
          <Grid container spacing={3}>
            {hordingData.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <HordingCard
                  data={item}
                  hordingData={hordingData}
                  setHordingData={setHordingData}
                  setisLoading={setisLoading}
                />
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
              You haven't added any hoardings yet
            </Typography>
            <Button 
              variant="contained"
              color="primary"
              sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
              onClick={() => navigate('/agency/addscreen')}
            >
              Add New Hoarding
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ViewMyScreen;