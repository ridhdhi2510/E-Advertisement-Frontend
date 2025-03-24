import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import bgImg from '../assets/Bg-1.png';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from 'react-router-dom';

export const ResetPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {register,handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate();
    const token = useParams().token

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = async(data)=>{
        const obj = {
            token: token,
            password: data.password
        }
        const res = await axios.post("/user/resetpassword",obj)
        if(res.status == 200){
            alert(res.data.message)
            navigate("/signin")
        }
        else{
            alert("Update failed")
        }
    }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" sx={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(103, 102, 102, 0.55)", // Light opacity overlay
        backgroundBlendMode: "lighten",
    }}>

        <Paper elevation={3} sx={{ padding: 4, width: 350, bgcolor: "rgba(33, 33, 33, 0.9)", color: "white" }}>

            <Box display="flex" justify-content="space-between" alignItems="center" width="100%">
                <Typography fontWeight="bold" align="center" sx={{ ml: 1, fontSize: "23px", whiteSpace: "nowrap" }}>
                    Reset Password
                </Typography>

                <IconButton onClick={() => navigate("/")} color="inherit" sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "32px",  // Set a fixed width
                    height: "32px", // Set a fixed height
                    minWidth: "auto", // Prevents default stretching
                    padding: "5px",  // Reduces padding
                    color: "white", backgroundColor: "rgba(255, 255, 255, 0.3)", // Light opacity background
                    borderRadius: "50%", // Make it round
                    ml: "auto", p: 0
                }}>
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </Box>


            <form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? "text" : "password"} // Toggle visibility
                    variant="outlined"
                    margin="normal"
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.7)", // Change focus border color to white
                        },
                    }}
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: {
                            color: "white", // Text color
                            backgroundColor: "rgba(71, 70, 70, 0.2)", // Slightly visible background
                            borderRadius: "5px",
                            border: "1px solid white",
                        },
                    }}
                    InputLabelProps={{
                        style: { color: "rgba(255, 255, 255, 0.7)" }, // Label color
                    }}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                    Set Password
                </Button>
            </form>
        </Paper>
        
    </Box>
  )
}