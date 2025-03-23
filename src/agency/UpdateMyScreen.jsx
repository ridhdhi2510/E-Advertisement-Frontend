import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../assets/css/addScreen.module.css'; // ✅ Using the same styles as AddScreen

export const UpdateMyScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getAllStates();
        fetchHoardingDetails();
    }, []);

    const getAllStates = async () => {
        const res = await axios.get('/state/getallstates');
        setStates(res.data.data);
    };

    const getCityByStateId = async (stateId) => {
        const res = await axios.get(`/city/getcitybystate/${stateId}`);
        setCities(res.data.data);
    };

    const getAreaByCityId = async (cityId) => {
        const res = await axios.get(`/area/getareabycity/${cityId}`);
        setAreas(res.data.data);
    };

    const { register, handleSubmit, setValue } = useForm();

    const fetchHoardingDetails = async () => {
        const res = await axios.get(`/hording/getHordingById/${id}`);
        const data = res.data.data;
        Object.keys(data).forEach((key) => setValue(key, data[key]));
    };

    const submitHandler = async (data) => {
        data.userId = localStorage.getItem('id');
        delete data._id; // Remove _id before updating
        
        await axios.put(`/hording/updatehording/${id}`, data);
        alert('Updated successfully!'); // ✅ Show success popup
        navigate('/agency/myscreens'); // ✅ Redirect to ViewMyScreen.jsx
    };

    return (
        <div className={styles.addScreenContainer}>
            <div className={styles.addScreenForm}>
                <h2 className={styles.title}>Update Hoarding</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
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
    );
};
