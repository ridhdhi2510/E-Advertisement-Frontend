import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../assets/css/addScreen.module.css'; // ✅ Using the same styles as AddScreen
import CustomLoader from "../component/CustomLoader";


export const UpdateMyScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
      
    const [isLoading, setisLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getAllStates();
        fetchHoardingDetails();
    }, []);

    const getAllStates = async () => {
        try {     
            const res = await axios.get('/state/getallstates');
            setStates(res.data.data);
        } 
        catch (error) {
          console.error("Error fetching states:", error);
        }
    };

    const getCityByStateId = async (stateId) => {
        try {     
            const res = await axios.get(`/city/getcitybystate/${stateId}`);
            setCities(res.data.data);
        } 
        catch (error) {
          console.error("Error fetching cities:", error);
        }
    };

    const getAreaByCityId = async (cityId) => {
        try {        
            const res = await axios.get(`/area/getareabycity/${cityId}`);
            setAreas(res.data.data);
        } 
        catch (error) {
          console.error("Error fetching areas:", error);
        }
    };

    const { register, handleSubmit, setValue } = useForm();

    const fetchHoardingDetails = async () => {
        try {
            const res = await axios.get(`/hording/getHordingById/${id}`);
            const data = res.data.data;
            Object.keys(data).forEach((key) => setValue(key, data[key]));
        } 
        catch (error) {
          console.error("Error fetching Hoarding Details:", error);
        }
    };

    const submitHandler = async (data) => {
       try {

            if (!data.hoardingDimension || !data.hoardingType || !data.hourlyRate || !data.latitude || !data.longitude || !data.stateId || !data.cityId || !data.areaId || !data.image || data.image.length === 0) {
              alert("All fields are required. Please fill out the form completely.");
              return;
            }
      
            data.userId = localStorage.getItem("id");
            delete data._id; // Remove _id before updating
            setisLoading(true);
            const res = await axios.put(`/hording/updatehording/${id}`, data);
            setisLoading(false);
        
            if (res.status === 201) {
                alert('Updated successfully!'); 
                navigate('/agency/myscreens'); 
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
        <div className={styles.addScreenContainer}>
            <div className={styles.addScreenForm}>
                <h2 className={styles.title}>Update Hoarding</h2>
                <form onSubmit={handleSubmit(submitHandler)} /*encType="multipart/form-data"*/ /*use for converting data to form-data used when imgs being uploaded(going to use when we need to update image)*/ >
                    <label className={styles.label}>Hoarding Dimension</label>
                    <input type="text" className={styles.input} {...register("hoardingDimension")} />

                    <label className={styles.label}>Hoarding Type</label>
                    <select className={styles.input} {...register("hoardingType")}>
                        <option value="Unipole">Unipole</option>
                        <option value="Billboard">Billboard</option>
                        <option value="Gantry">Gantry</option>
                        <option value="Digital">Digital</option>
                    </select>

                    <label className={styles.label}>Hourly Rate</label>
                    <input type="number" className={styles.input} {...register("hourlyRate")} />

                    <label className={styles.label}>Latitude</label>
                    <input type="text" className={styles.input} {...register("latitude")} />
                    
                    <label className={styles.label}>Longitude</label>
                    <input type="text" className={styles.input} {...register("longitude")} />

                    <label className={styles.label}>Select State</label>
                    <select className={styles.input} {...register("stateId")} onChange={(e) => getCityByStateId(e.target.value)}>
                        <option>SELECT STATE</option>
                        {states.map((state) => (
                            <option key={state._id} value={state._id}>{state.name}</option>
                        ))}
                    </select>

                    <label className={styles.label}>Select City</label>
                    <select className={styles.input} {...register("cityId")} onChange={(e) => getAreaByCityId(e.target.value)}>
                        <option>SELECT CITY</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>{city.name}</option>
                        ))}
                    </select>

                    <label className={styles.label}>Select Area</label>
                    <select className={styles.input} {...register("areaId")}> 
                        <option>SELECT AREA</option>
                        {areas.map((area) => (
                            <option key={area._id} value={area._id}>{area.name}</option>
                        ))}
                    </select>

                    <button type="submit" className={styles.button}>Update</button>
                </form>
            </div>
        </div>
        </>
    );
};
