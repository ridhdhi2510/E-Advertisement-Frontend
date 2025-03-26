import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../assets/css/addScreen.module.css"; // ✅ Import as module
import CustomLoader from "../component/CustomLoader";


export const AddScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

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
      data.userId = localStorage.getItem("id");
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("image", data.image[0]);
      
      setisLoading(true);
      const res = await axios.post("/hording/addWithFile", formData);
      setisLoading(false);
  
      if (res.status === 201) {
        alert("Hoarding added successfully!");
        navigate("/agency/myscreens");
      } else {
        alert("Failed to add hoarding: " + res.data.message);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }

  };

  return (
    <>
    {isLoading == true && <CustomLoader />}
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6">
    <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg transition-all duration-300" id="container">
      {/* Form Title */}
      <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Add New Hoarding
      </h2>

        <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
          {/* Hoarding Dimension */}
          <label className={styles.label}>Hoarding Dimension</label>
          <input
            type="text"
            placeholder="e.g., 10x20 ft"
            className={styles.input}
            {...register("hoardingDimension")}
          />

          {/* Hoarding Type */}
          <label className={styles.label}>Hoarding Type</label>
          <select className={styles.input} {...register("hoardingType")}>
            <option value="Unipole">Unipole</option>
            <option value="Billboard">Billboard</option>
            <option value="Gantry">Gantry</option>
            <option value="Digital">Digital</option>
          </select>

          {/* Hourly Rate */}
          <label className={styles.label}>Hourly Rate</label>
          <input
            type="number"
            placeholder="Enter rate per hour"
            className={styles.input}
            {...register("hourlyRate")}
          />

          {/* Latitude & Longitude */}
          <label className={styles.label}>Latitude</label>
          <input type="text" placeholder="e.g., 37.7749, -122.4194" className={styles.input} {...register("latitude")} />

          <label className={styles.label}>Longitude</label>
          <input type="text" placeholder="e.g., 37.7749, -122.4194" className={styles.input} {...register("longitude")} />

          {/* State Selection */}
          <label className={styles.label}>Select State</label>
          <select className={styles.input} {...register("stateId")} onChange={(e) => getCityByStateId(e.target.value)}>
            <option>SELECT STATE</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>

          {/* City Selection */}
          <label className={styles.label}>Select City</label>
          <select className={styles.input} {...register("cityId")} onChange={(e) => getAreaByCityId(e.target.value)}>
            <option>SELECT CITY</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Area Selection */}
          <label className={styles.label}>Select Area</label>
          <select className={styles.input} {...register("areaId")}>
            <option>SELECT AREA</option>
            {areas.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))}
          </select>

          {/* File Upload */}
          <label className={styles.label}>Upload Hoarding Image</label>
          <input type="file" className={styles.input} {...register("image")} />

          {/* Submit Button */}
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};






// import { Box, Container, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// // import "../assets/css/addScreen.css"



// export const AddScreen = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const getAllStates = async () => {
//     const res = await axios.get("/state/getall");
//     console.log(res.data);
//     setStates(res.data.data);
//   };

//   const getCityByStateId = async (id) => {
//     console.log(id);
//     const res = await axios.get("/city/getcitybystate/" + id);
//     console.log(res.data.data);
//     setCities(res.data.data);
//   };

//   const getAreaByCityId = async (id) => {
//     const res = await axios.get("/area/getareabycity/" + id);
//     setAreas(res.data.data);
//   };

//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const submitHandler = async (data) => {
//     data.userId = localStorage.getItem("id");
//     console.log(data);
//     console.log(data.image[0]); //array -->0th index access..

//     const formData = new FormData();
//     formData.append("hoardingDimension", data.hoardingDimension);
//     formData.append("hoardingType", data.hoardingType);
//     formData.append("hourlyRate", data.hourlyRate);
//     formData.append("latitude", data.latitude);
//     formData.append("longitude", data.longitude);
//     formData.append("stateId", data.stateId);
//     formData.append("cityId", data.cityId);
//     formData.append("areaId", data.areaId);
//     formData.append("image", data.image[0]);
//     formData.append("userId", data.userId);

//     //const res = await axios.post("/hording/add", data);
//     const res = await axios.post("/hording/addWithFile", formData);
//     console.log(res); //axios
//     console.log(res.data); //api response
//     //if else...
//     navigate("/agency/myscreens");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6">
//     <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg transition-all duration-300 container">
//       {/* Form Title */}
//       <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-6">
//         Add New Hoarding
//       </h2>

//       <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data" className="space-y-5">
//         {/* Hoarding Dimension */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Hoarding Dimension</label>
//           <input
//             type="text"
//             placeholder="e.g., 10x20 ft"
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("hoardingDimension")}
//           />
//         </div>

//         {/* Hoarding Type */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Hoarding Type</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("hoardingType")}
//           >
//             <option value="Unipole">Unipole</option>
//             <option value="Billboard">Billboard</option>
//             <option value="Gantry">Gantry</option>
//             <option value="Digital">Digital</option>
//           </select>
//         </div>

//         {/* Hourly Rate */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Hourly Rate</label>
//           <input
//             type="number"
//             placeholder="Enter rate per hour"
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("hourlyRate")}
//           />
//         </div>

//         {/* Latitude & Longitude */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Latitude</label>
//             <input
//               type="text"
//               placeholder="Enter latitude"
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//               {...register("latitude")}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Longitude</label>
//             <input
//               type="text"
//               placeholder="Enter longitude"
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//               {...register("longitude")}
//             />
//           </div>
//         </div>

//         {/* State Selection */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select State</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("stateId")}
//             onChange={(event) => getCityByStateId(event.target.value)}
//           >
//             <option>SELECT STATE</option>
//             {states?.map((state) => (
//               <option key={state._id} value={state._id}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* City Selection */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select City</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("cityId")}
//             onChange={(event) => getAreaByCityId(event.target.value)}
//           >
//             <option>SELECT CITY</option>
//             {cities?.map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Area Selection */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select Area</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("areaId")}
//           >
//             <option>SELECT AREA</option>
//             {areas?.map((area) => (
//               <option key={area._id} value={area._id}>
//                 {area.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* File Upload */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Upload Hoarding Image</label>
//           <input
//             type="file"
//             className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
//             {...register("image")}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 shadow-md"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   </div>
//   );
// };




//<Box sx={{ display: "flex" }}>
//   <Box component="main">
//     <Typography sx={{ marginBottom: 2 }}>
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <div className="card p-4 shadow">
//               <h2 className="text-center mb-4">Add Screen</h2>
//               <form
//                 onSubmit={handleSubmit(submitHandler)}
//                 encType="multipart/form-data"
//               >
//                 <div className="mb-3">
//                   <label className="form-label">Hoarding Dimension</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     {...register("hoardingDimension")}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Hoarding Type</label>
//                   <select
//                     className="form-select"
//                     {...register("hoardingType")}
//                   >
//                     <option value="Unipole">Unipole</option>
//                     <option value="Billboard">Billboard</option>
//                     <option value="Gantry">Gantry</option>
//                     <option value="Digital">Digital</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Hourly Rate</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     {...register("hourlyRate")}
//                   />
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Latitude</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       {...register("latitude")}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Longitude</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       {...register("longitude")}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Select State</label>
//                   <select
//                     className="form-select"
//                     {...register("stateId")}
//                     onChange={(event) =>
//                       getCityByStateId(event.target.value)
//                     }
//                   >
//                     <option>SELECT STATE</option>
//                     {states?.map((state) => (
//                       <option key={state._id} value={state._id}>
//                         {state.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Select City</label>
//                   <select
//                     className="form-select"
//                     {...register("cityId")}
//                     onChange={(event) =>
//                       getAreaByCityId(event.target.value)
//                     }
//                   >
//                     <option>SELECT CITY</option>
//                     {cities?.map((city) => (
//                       <option key={city._id} value={city._id}>
//                         {city.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Select Area</label>
//                   <select className="form-select" {...register("areaId")}>
//                     <option>SELECT AREA</option>
//                     {areas?.map((area) => (
//                       <option key={area._id} value={area._id}>
//                         {area.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Select HORDING URL</label>
//                   <input type="file" {...register("image")}></input>
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Typography>
//   </Box>
// </Box>