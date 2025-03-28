import React, { useState, useEffect } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UpdateAgencyProfile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) {
          console.error("No ID found in localStorage");
          return;
        }
        
        const res = await axios.get(`/user/getbyid/${id}`);
        setData(res.data.data);

        // Update formData with fetched user data
        setFormData({
          name: res.data.data.name || "",
          Email: res.data.data.email || "",
          agree: false,
        });

      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.username = "Please choose a username";
    if (!formData.Email) newErrors.Email = "Please provide a valid email";
    if (!formData.agree) newErrors.agree = "You must agree before submitting";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedData = {
        name:formData.name,
        email:formData.Email
      }

      try{
        
        const response = await axios.put(`/user/update/${localStorage.getItem("id")}` , updatedData);
        console.log("Update successful", response)
        navigate("/agency", { state: { refresh: true } });
      }catch(err){
        console.log(err.message);
      }
      
    }
  };

  if (!data) {
    return <p>Loading user data...</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <TextField
        fullWidth
        label="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        error={!!errors.Email}
        helperText={errors.Email}
        margin="normal"
      />

      <FormControlLabel
        control={<Checkbox name="agree" checked={formData.agree} onChange={handleChange} />}
        label="Agree to terms and conditions"
      />
      {errors.agree && <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.agree}</p>}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Form
      </Button>
    </form>
  );
};

export default UpdateAgencyProfile;





