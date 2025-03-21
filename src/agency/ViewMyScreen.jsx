import {Box, Button,Card,CardContent, CardMedia,Grid,Typography,} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HordingCard = ({ data }) => {
  return (
    <Card sx={{width: 280,boxShadow: 2,borderRadius: 2,border: "1px solid #ddd",}}>
      <CardMedia component="img" height="150"
        image={data?.hordingURL || "https://via.placeholder.com/200x150"}
        alt="Hording"
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>
          {data?.hoardingType
            ? `${data.hoardingType} - ${data.hoardingDimension}`
            : "Unknown Type"}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "gray.600" }}>
          Rate: {data?.hourlyRate || "N/A"}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "gray.600" }}>
          Location:{" "}
          {data?.latitude && data?.longitude
            ? `${data.latitude}, ${data.longitude}`
            : "Location not available"}
        </Typography>
        {/* <Typography sx={{ fontSize: 14, color: "gray.600" }}>
             Address: {data?.cityId || "N/A"}
           </Typography>
           <Typography sx={{ fontSize: 14, color: "gray.600" }}>
             Posted by: {data?.userId || "Unknown"}
           </Typography> */}
        <Button 
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "blue.500",
            "&:hover": { backgroundColor: "blue.700" },
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Update
        </Button>
      </CardContent>
    </Card>
  );
};

const ViewMyScreen = () => {
  //hooks
  const [hordingData, sethordingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllScreens = async () => {
    try {
      const res = await axios.get(
        "/hording/getHordingsbyuserid/" + localStorage.getItem("id")
      );

      console.log("Full API Response:", res);
      console.log("Fetched Data:", res.data?.data);

      if (res.data && Array.isArray(res.data.data)) {
        sethordingData(res.data.data);
      } else {
        console.error("Invalid API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching hoardings:", error);
    } finally {
      setLoading(false); // ✅ Set loading to false after fetching
    }
  };

  useEffect(() => {
    getAllScreens();
  }, []);

  useEffect(() => {
    console.log("Updated hoardingData length:", hordingData.length);
  }, [hordingData]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {hordingData.length > 0 ? (
          hordingData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <HordingCard data={item} />
            </Grid>
          ))
        ) : (
          <Typography>No hoardings available</Typography>
        )}
      </Grid>
    </Box>
  );
};
export default ViewMyScreen;
