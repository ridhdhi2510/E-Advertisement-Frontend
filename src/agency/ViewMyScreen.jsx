// import {Box, Button,Card,CardContent, CardMedia,Grid,Typography,} from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const HordingCard = ({ data }) => {
//   return (
//     <Card sx={{width: 280,boxShadow: 2,borderRadius: 2,border: "1px solid #ddd",}}>
//       <CardMedia component="img" height="150"
//         image={data?.hordingURL || "https://via.placeholder.com/200x150"}
//         alt="Hording"
//       />
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>
//           {data?.hoardingType
//             ? `${data.hoardingType} - ${data.hoardingDimension}`
//             : "Unknown Type"}
//         </Typography>
//         <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//           Rate: {data?.hourlyRate || "N/A"}
//         </Typography>
//         <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//           Location:{" "}
//           {data?.latitude && data?.longitude
//             ? `${data.latitude}, ${data.longitude}`
//             : "Location not available"}
//         </Typography>
//         {/* <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//              Address: {data?.cityId || "N/A"}
//            </Typography>
//            <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//              Posted by: {data?.userId || "Unknown"}
//            </Typography> */}
//         <Button 
//           variant="contained"
//           sx={{
//             mt: 2,
//             backgroundColor: "blue.500",
//             "&:hover": { backgroundColor: "blue.700" },
//             fontWeight: "bold",
//             width: "100%",
//           }}
//         >
//           Update
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const ViewMyScreen = () => {
//   //hooks
//   const [hordingData, sethordingData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllScreens = async () => {
//     try {
//       const res = await axios.get(
//         "/hording/getHordingsbyuserid/" + localStorage.getItem("id")
//       );

//       console.log("Full API Response:", res);
//       console.log("Fetched Data:", res.data?.data);

//       if (res.data && Array.isArray(res.data.data)) {
//         sethordingData(res.data.data);
//       } else {
//         console.error("Invalid API response:", res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching hoardings:", error);
//     } finally {
//       setLoading(false); // ✅ Set loading to false after fetching
//     }
//   };

//   useEffect(() => {
//     getAllScreens();
//   }, []);

//   useEffect(() => {
//     console.log("Updated hoardingData length:", hordingData.length);
//   }, [hordingData]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <Typography variant="h6">Loading...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//       <Grid container spacing={4} justifyContent="center">
//         {hordingData.length > 0 ? (
//           hordingData.map((item, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <HordingCard data={item} />
//             </Grid>
//           ))
//         ) : (
//           <Typography>No hoardings available</Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// };
// export default ViewMyScreen;

import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomLoader from "../component/CustomLoader";

// const HordingCard = ({ data }) => {
//   const navigate = useNavigate(); // React Router navigation hook

//   const handleUpdateClick = () => {
//     navigate(`/agency/updateScreen/${data._id}`); // 🔥 Instant redirect
//   };

//   return (
//     <Card sx={{ width: 280, boxShadow: 2, borderRadius: 2, border: "1px solid #ddd" }}>
//       <CardMedia
//         component="img"
//         height="150"
//         image={data?.hordingURL || "https://via.placeholder.com/200x150"}
//         alt="Hording"
//       />
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>
//           {data?.hoardingType
//             ? `${data.hoardingType} - ${data.hoardingDimension}`
//             : "Unknown Type"}
//         </Typography>
//         <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//           Rate: {data?.hourlyRate || "N/A"}
//         </Typography>
//         <Typography sx={{ fontSize: 14, color: "gray.600" }}>
//           Location: {data?.latitude && data?.longitude ? `${data.latitude}, ${data.longitude}` : "Location not available"}
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={handleUpdateClick} // ✅ Single click to navigate
//           sx={{ mt: 2, backgroundColor: "blue.500", "&:hover": { backgroundColor: "blue.700" }, fontWeight: "bold", width: "100%" }}
//         >
//           Update
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

const HordingCard = ({ data, hordingData, setHordingData, setisLoading  }) => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    console.log(data._id)
    navigate(`/agency/updateScreen/${data._id}`);
  };

  const handleRemoveClick = async (id) => {
    try {
      setisLoading(true); // Show Loader
      const res = await axios.delete(`http://localhost:3000/hording/delete/${id}`);
      setisLoading(false); 

      if (res.status === 200) {
        console.log("Deleted successfully:", res);
        // Remove the deleted item from the state
        setHordingData(hordingData.filter(h => h._id !== id));
        alert("Hoarding deleted successfully! ✅");
      } else {
        console.error("Failed to delete hoarding:", res);
      }
    } catch (error) {
      setisLoading(false); // Hide Loader on Error
      console.error("Error deleting hoarding:", error);
      alert("Failed to delete hoarding ❌");
    }
  }

  return (
    <Card sx={{ width: 280, height: 330, boxShadow: 2, borderRadius: 2, border: "1px solid #ddd", overflow: "hidden" }}>
      {/* ✅ Image inside a fixed container */}
      <Box sx={{ height: 170, width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={data?.hordingURL || "https://via.placeholder.com/200x150"}
          alt="Hoarding"
          sx={{ height: "100%", width: "100%", objectFit: "cover" }} // ✅ Ensures full image is visible
        />
      </Box>

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.800" }}>
          {data?.hoardingType ? `${data.hoardingType} - ${data.hoardingDimension}` : "Unknown Type"}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "gray.600" }}>
          Rate: {data?.hourlyRate || "N/A"}
        </Typography>
        {/* <Typography sx={{ fontSize: 14, color: "gray.600" }}>
          Location: {data?.latitude && data?.longitude ? `${data.latitude}, ${data.longitude}` : "Location not available"}
        </Typography> */}

        <Typography variant="body2" >
          {data.areaId?.name}, {data.cityId?.name}, {data.stateId?.name}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleUpdateClick}
            sx={{ backgroundColor: "blue.500", "&:hover": { backgroundColor: "blue.700" }, fontWeight: "bold", width: "48%" }}
          >
            Update
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveClick(data._id)}
            sx={{ backgroundColor: "red.500", "&:hover": { backgroundColor: "red.700" }, fontWeight: "bold", width: "48%" }}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};


const ViewMyScreen = () => {
  // State Hooks
  const [hordingData, setHordingData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // Fetch all hoardings
  const getAllScreens = async () => {
    try {
      setisLoading(true);
      const res = await axios.get("/hording/getHordingsbyuserid/" + localStorage.getItem("id"));
      setisLoading(false);
      console.log("Full API Response:", res);
      console.log("Fetched Data:", res.data?.data);

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

  // if (loading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
  //       <Typography variant="h6">Loading...</Typography>
  //     </Box>
  //   );
  // }

  return (
    <>
      {isLoading == true && <CustomLoader />}
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {hordingData.length > 0 ? (
            hordingData.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <HordingCard
                  data={item}
                  hordingData={hordingData}
                  setHordingData={setHordingData}
                  setisLoading={setisLoading}
                />
              </Grid>

            ))
          ) : (
            <Typography>No hoardings available</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ViewMyScreen;
