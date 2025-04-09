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
    const [formData, setFormData] = useState({
        hoardingDimension: '',
        hoardingType: '',
        hourlyRate: '',
        latitude: '',
        longitude: '',
        stateId: '',
        cityId: '',
        areaId: ''
    })

    useEffect(() => {
        getAllStates();
        fetchHoardingDetails();
    }, []);

    const getAllStates = async () => {
        try {     
            const res = await axios.get('/state/getall');
            setStates(res.data.data);
        } 
        catch (error) {
          console.error("Error fetching states:", error);
        }
    };

    const getAreaByCityId = async (cityId) => {
        try {        
            const res = await axios.get(`/area/getareabycity/${cityId}`);
            setAreas(res.data.data);
            // Reset area when city changes
            setFormData(prev => ({
                ...prev,
                areaId: ''
            }));
        } 
        catch (error) {
          console.error("Error fetching areas:", error);
        }
    };

    const getCityByStateId = async (stateId) => {
        try {     
            const res = await axios.get(`/city/getcitybystate/${stateId}`);
            setCities(res.data.data);
            // Reset city and area when state changes
            setFormData(prev => ({
                ...prev,
                cityId: '',
                areaId: ''
            }));
            setAreas([]);
        } 
        catch (error) {
          console.error("Error fetching cities:", error);
        }
    };

    

    const fetchHoardingDetails = async () => {
        try {
            const res = await axios.get(`/hording/getHordingById/${id}`);
            const data = res.data.data;
            console.log(data)
            setFormData({ hoardingDimension: data.hoardingDimension || '',
                hoardingType: data.hoardingType || '',
                hourlyRate: data.hourlyRate || '',
                latitude: data.latitude || '',
                longitude: data.longitude || '',
                stateId: data.stateId?._id || '',
                cityId: data.cityId?._id || '',
                areaId: data.areaId?._id || ''})
           
        
        if (data.stateId?._id) {
            await getCityByStateId(data.stateId._id);
        }
        if (data.cityId?._id) {
            await getAreaByCityId(data.cityId._id);
        }
    }
        catch (error) {
          console.error("Error fetching Hoarding Details:", error);
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
            
            setisLoading(true);
            const res = await axios.put(`/hording/updatehording/${id}`, dataToSend);
            setisLoading(false);
        
            if (res.status === 200) {
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
            {isLoading && <CustomLoader />}
            <div className={styles.addScreenContainer}>
                <div className={styles.addScreenForm}>
                    <h2 className={styles.title}>Update Hoarding</h2>
                    <form onSubmit={submitHandler}>
                        <label className={styles.label}>Hoarding Dimension</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            name="hoardingDimension"
                            value={formData.hoardingDimension}
                            onChange={handleInputChange}
                        />

                        <label className={styles.label}>Hoarding Type</label>
                        <select 
                            className={styles.input} 
                            name="hoardingType"
                            value={formData.hoardingType}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Type</option>
                            <option value="Unipole">Unipole</option>
                            <option value="Billboard">Billboard</option>
                            <option value="Gantry">Gantry</option>
                            <option value="Digital">Digital</option>
                        </select>

                        <label className={styles.label}>Hourly Rate</label>
                        <input 
                            type="number" 
                            className={styles.input} 
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                        />

                        <label className={styles.label}>Latitude</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                        />
                        
                        <label className={styles.label}>Longitude</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                        />

                        <label className={styles.label}>Select State</label>
                        <select 
                            className={styles.input} 
                            name="stateId"
                            value={formData.stateId}
                            onChange={(e) => {
                                handleInputChange(e);
                                getCityByStateId(e.target.value);
                            }}
                        >
                            <option value="">SELECT STATE</option>
                            {states.map((state) => (
                                <option key={state._id} value={state._id}>{state.name}</option>
                            ))}
                        </select>

                        <label className={styles.label}>Select City</label>
                        <select 
                            className={styles.input} 
                            name="cityId"
                            value={formData.cityId}
                            onChange={(e) => {
                                handleInputChange(e);
                                getAreaByCityId(e.target.value);
                            }}
                        >
                            <option value="">SELECT CITY</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>

                        <label className={styles.label}>Select Area</label>
                        <select 
                            className={styles.input} 
                            name="areaId"
                            value={formData.areaId}
                            onChange={handleInputChange}
                        > 
                            <option value="">SELECT AREA</option>
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

         

