// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Paper, Typography, CircularProgress } from "@mui/material";
// import CustomLoader from "../component/CustomLoader";

// export const AddScreen = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const getAllStates = async () => {
//     try {
//       const res = await axios.get("/state/getall");
//       setStates(res.data.data);
//     } 
//     catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const getCityByStateId = async (id) => {
//     try {
//       const res = await axios.get("/city/getcitybystate/" + id);
//       setCities(res.data.data);
//     } 
//     catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const getAreaByCityId = async (id) => {
//     try {
//       const res = await axios.get("/area/getareabycity/" + id);
//       setAreas(res.data.data);
//     } 
//     catch (error) {
//       console.error("Error fetching areas:", error);
//     }
//   };

//   const submitHandler = async (data) => {
//     try {

//       if (!data.hoardingDimension || !data.hoardingType || !data.hourlyRate || !data.latitude || !data.longitude || !data.stateId || !data.cityId || !data.areaId || !data.image || data.image.length === 0) {
//         alert("All fields are required. Please fill out the form completely.");
//         return;
//       }

//       data.userId = localStorage.getItem("id");
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => formData.append(key, data[key]));
//       formData.append("image", data.image[0]);

//       setIsLoading(true);
//       const res = await axios.post("/hording/addWithFile", formData);
//       setIsLoading(false);

      
//       if (res.status === 200) {
//         alert("Hoarding added successfully!");
//         navigate("/agency/myscreens");
//       } else {
//         alert("Failed to add hoarding: " + res.data.message);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error submitting form:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 5 }}>
//       {isLoading && <CustomLoader />}
//       <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Add New Hoarding
//         </Typography>
//         <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
//           <Grid container spacing={4}>
//             {/* ----------- Hording Dimension --------- */}
//             <Grid item xs={12} md={6}>
//               <TextField fullWidth placeholder="107*107" label="Hoarding Dimension" {...register("hoardingDimension")} variant="outlined" />
//             </Grid>
//             {/* --------------------- select state ---------------------- */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Select State"
//                 variant="outlined"
//                 {...register("stateId")}
//                 onChange={(e) => getCityByStateId(e.target.value)}
//               >
//                 <MenuItem value="">SELECT STATE</MenuItem>
//                 {states.map((state) => (
//                   <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             {/* -------------- Hording Type ---------------- */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Hoarding Type"
//                 variant="outlined"
//                 {...register("hoardingType")}
//               >
//                 <MenuItem value="Unipole">Unipole</MenuItem>
//                 <MenuItem value="Billboard">Billboard</MenuItem>
//                 <MenuItem value="Gantry">Gantry</MenuItem>
//                 <MenuItem value="Digital">Digital</MenuItem>
//               </TextField>
//             </Grid>
//             {/* ------------------------ select city ------------------------ */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Select City"
//                 variant="outlined"
//                 {...register("cityId")}
//                 onChange={(e) => getAreaByCityId(e.target.value)}
//               >
//                 <MenuItem value="">SELECT CITY</MenuItem>
//                 {cities.map((city) => (
//                   <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             {/* ------------------------------- Latitude ---------------------------------------- */}
//             {/* <Grid item xs={12} md={6}>
//               <TextField fullWidth placeholder="eg.23.0171" label="Latitude" {...register("latitude")} variant="outlined" />
//             </Grid> */}
//             {/* ------------------------------ Longitude ------------------------------------------ */}
//             <Grid item xs={12} md={6}>
//               <TextField fullWidth label="Longitude" placeholder="eg.23.0171" {...register("longitude")} variant="outlined" />
//             </Grid>
//             {/* ------------------ select area ------------------ */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Select Area"
//                 variant="outlined"
//                 {...register("areaId")}
//               >
//                 <MenuItem value="">SELECT AREA</MenuItem>
//                 {areas.map((area) => (
//                   <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             {/* ---------------- Latitude ----------------------- */}
//             <Grid item xs={12} md={6}>
//               <TextField fullWidth placeholder="eg.23.0171" label="Latitude" {...register("latitude")} variant="outlined" />
//             </Grid>
//             {/* ----------------- Hourly Rate ----------------- */}
//             <Grid item xs={12} md={6}>
//               <TextField fullWidth label="Hourly Rate" type="number" {...register("hourlyRate")} variant="outlined" />
//             </Grid>          
//             {/* ----------------- File Upload ---------------------- */}
//             <Grid item xs={12}>
//               <TextField fullWidth type="file" {...register("image")} variant="outlined" />
//             </Grid>
//             {/* --------------------- Submit Button ----------------------- */}
//             <Grid item xs={12}>
//               <Button fullWidth variant="contained" color="primary" type="submit" size="large">
//                 {isLoading ? <CircularProgress size={24} /> : "Submit"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };


import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Grid, TextField, MenuItem, Button, Paper, Typography,
  CircularProgress, Box
} from "@mui/material";
import CustomLoader from "../component/CustomLoader";

export const AddScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBankCheck, setLoadingBankCheck] = useState(true);
  const [bankExists, setBankExists] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  // Check bank details first
  useEffect(() => {
    const checkBankDetails = async () => {
      try {
        const res = await axios.get(`/bankdetailsagency/getbyuserId/${userId}`);
        // console.log(res.data)
        if (res.data.data && res.data.data.bankName) {
          setBankExists(true);
        } else {
          setBankExists(false);
        }
      } catch (err) {
        setBankExists(false);
      } finally {
        setLoadingBankCheck(false);
      }
    };

    checkBankDetails();
  }, [userId]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    try {
      const res = await axios.get("/state/getall");
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCityByStateId = async (id) => {
    try {
      const res = await axios.get("/city/getcitybystate/" + id);
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getAreaByCityId = async (id) => {
    try {
      const res = await axios.get("/area/getareabycity/" + id);
      setAreas(res.data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const submitHandler = async (data) => {
    try {
      if (
        !data.hoardingDimension ||
        !data.hoardingType ||
        !data.hourlyRate ||
        !data.latitude ||
        !data.longitude ||
        !data.stateId ||
        !data.cityId ||
        !data.areaId ||
        !data.image ||
        data.image.length === 0
      ) {
        alert("All fields are required. Please fill out the form completely.");
        return;
      }

      data.userId = userId;
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("image", data.image[0]);

      setIsLoading(true);
      const res = await axios.post("/hording/addWithFile", formData);
      setIsLoading(false);

      if (res.status === 200) {
        alert("Hoarding added successfully!");
        navigate("/agency/myscreens");
      } else {
        alert("Failed to add hoarding: " + res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Show loader while checking bank
  if (loadingBankCheck) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  // If bank not exists, show message and redirect option
  if (!bankExists) {
    return (
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Bank Details Required
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Please add your bank details before adding a hoarding screen.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/agency/addbankdetais")}>
            Add Bank Details
          </Button>
        </Paper>
      </Container>
    );
  }

  // ✅ Main Add Hoarding Form
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {isLoading && <CustomLoader />}
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Hoarding
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder="107*107" label="Hoarding Dimension" {...register("hoardingDimension")} variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select State"
                variant="outlined"
                {...register("stateId")}
                onChange={(e) => getCityByStateId(e.target.value)}
              >
                <MenuItem value="">SELECT STATE</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Hoarding Type"
                variant="outlined"
                {...register("hoardingType")}
              >
                <MenuItem value="Unipole">Unipole</MenuItem>
                <MenuItem value="Billboard">Billboard</MenuItem>
                <MenuItem value="Gantry">Gantry</MenuItem>
                <MenuItem value="Digital">Digital</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select City"
                variant="outlined"
                {...register("cityId")}
                onChange={(e) => getAreaByCityId(e.target.value)}
              >
                <MenuItem value="">SELECT CITY</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Longitude" placeholder="eg.23.0171" {...register("longitude")} variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Select Area"
                variant="outlined"
                {...register("areaId")}
              >
                <MenuItem value="">SELECT AREA</MenuItem>
                {areas.map((area) => (
                  <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder="eg.23.0171" label="Latitude" {...register("latitude")} variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Hourly Rate" type="number" {...register("hourlyRate")} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="file" {...register("image")} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
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















// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "../assets/css/addScreen.module.css"; // ✅ Import as module
// import CustomLoader from "../component/CustomLoader";


// export const AddScreen = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const getAllStates = async () => {
//     try {
//       const res = await axios.get("/state/getall");
//       setStates(res.data.data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const getCityByStateId = async (id) => {
//     try {
//       const res = await axios.get("/city/getcitybystate/" + id);
//       setCities(res.data.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const getAreaByCityId = async (id) => {
//     try {
//       const res = await axios.get("/area/getareabycity/" + id);
//       setAreas(res.data.data);
//     } catch (error) {
//       console.error("Error fetching areas:", error);
//     }
//   };


//   const submitHandler = async (data) => {
//     try {
//       data.userId = localStorage.getItem("id");
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => formData.append(key, data[key]));
//       formData.append("image", data.image[0]);
      
//       setisLoading(true);
//       const res = await axios.post("/hording/addWithFile", formData);
//       setisLoading(false);
  
//       if (res.status === 201) {
//         alert("Hoarding added successfully!");
//         navigate("/agency/myscreens");
//       } else {
//         alert("Failed to add hoarding: " + res.data.message);
//       }
//     } catch (error) {
//       setisLoading(false);
//       console.error("Error submitting form:", error);
//       alert("Something went wrong. Please try again.");
//     }

//   };

//   return (
//     <>
//     {isLoading == true && <CustomLoader />}
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6">
//     <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg transition-all duration-300" id="container">
//       {/* Form Title */}
//       <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
//         Add New Hoarding
//       </h2>

//         <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
//           {/* Hoarding Dimension */}
//           <label className={styles.label}>Hoarding Dimension</label>
//           <input
//             type="text"
//             placeholder="e.g., 10x20 ft"
//             className={styles.input}
//             {...register("hoardingDimension")}
//           />

//           {/* Hoarding Type */}
//           <label className={styles.label}>Hoarding Type</label>
//           <select className={styles.input} {...register("hoardingType")}>
//             <option value="Unipole">Unipole</option>
//             <option value="Billboard">Billboard</option>
//             <option value="Gantry">Gantry</option>
//             <option value="Digital">Digital</option>
//           </select>

//           {/* Hourly Rate */}
//           <label className={styles.label}>Hourly Rate</label>
//           <input
//             type="number"
//             placeholder="Enter rate per hour"
//             className={styles.input}
//             {...register("hourlyRate")}
//           />

//           {/* Latitude & Longitude */}
//           <label className={styles.label}>Latitude</label>
//           <input type="text" placeholder="e.g., 37.7749, -122.4194" className={styles.input} {...register("latitude")} />

//           <label className={styles.label}>Longitude</label>
//           <input type="text" placeholder="e.g., 37.7749, -122.4194" className={styles.input} {...register("longitude")} />

//           {/* State Selection */}
//           <label className={styles.label}>Select State</label>
//           <select className={styles.input} {...register("stateId")} onChange={(e) => getCityByStateId(e.target.value)}>
//             <option>SELECT STATE</option>
//             {states.map((state) => (
//               <option key={state._id} value={state._id}>
//                 {state.name}
//               </option>
//             ))}
//           </select>

//           {/* City Selection */}
//           <label className={styles.label}>Select City</label>
//           <select className={styles.input} {...register("cityId")} onChange={(e) => getAreaByCityId(e.target.value)}>
//             <option>SELECT CITY</option>
//             {cities.map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.name}
//               </option>
//             ))}
//           </select>

//           {/* Area Selection */}
//           <label className={styles.label}>Select Area</label>
//           <select className={styles.input} {...register("areaId")}>
//             <option>SELECT AREA</option>
//             {areas.map((area) => (
//               <option key={area._id} value={area._id}>
//                 {area.name}
//               </option>
//             ))}
//           </select>

//           {/* File Upload */}
//           <label className={styles.label}>Upload Hoarding Image</label>
//           <input type="file" className={styles.input} {...register("image")} />

//           {/* Submit Button */}
//           <button type="submit" className={styles.button}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };






