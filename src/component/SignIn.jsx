import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment, alertClasses } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import bgImg from '../assets/Bg-1.png';
import CloseIcon from "@mui/icons-material/Close";
import { event } from 'jquery';
import CustomLoader from "./CustomLoader";


export default function SignIn() {
    
    //hook
    const [isLoading, setisLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit,getValues, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            setisLoading(true);
            const res = await axios.post("/user/login", data);
            setisLoading(false);
            
            if (res.status === 200) {
                localStorage.setItem("id", res.data.data._id);
                
    
                // Ensure roleId exists before accessing `name`
                if (!res.data.data.roleId || !res.data.data.roleId.name) {
                    alert("Error: Role not assigned to user.");
                    return;
                }
    
                localStorage.setItem("role", res.data.data.roleId.name);
                alert("Login Success");
    
                if (res.data.data.roleId.name === "customer") {
                    navigate("/customer");
                } else if (res.data.data.roleId.name === "agency") {
                    navigate("/agency");
                }
            }
        } catch (error) {
            setisLoading(false);
            console.error("Login Error:", error);
            if(error.response){
                alert(error.response.data.message)
            }
            else {
                alert("An unexpected error occurred.");
            }
        }
    };

    const onForgotPassword = async(event)=> {

        event.preventDefault();

        const email = getValues("email");//getValues parameter of useForm for getting specific data from useForm data (which is here onSubmit data)

        if (!email) {
            alert("Enter your email");
            return;
          }
        
        const maildata = { email };

        try{
            setisLoading(true);
            const res = await axios.post("/user/forgotpassword",maildata)
            setisLoading(false);
            if(res.status === 200){
                alert(res.data.message)
            } 
        }
        catch(err){
            setisLoading(false);
            // alert(err.message)
            alert(err.response?.data?.message);
            console.error("Forgot Password Error:", err);
        }
    }


    // const onSubmit = async (data) => {
    //     try {
    //         const res = await axios.post("/user/login", data);
            
    //         if (res.status === 200) {
    //           console.log(res.data.data);
    //           localStorage.setItem("id", res.data.data._id);
    //           localStorage.setItem("role", res.data.data.roleId.name);
    //           alert("Login Success");
    //           console.log(res.data.data.roleId.name)
    //           if (res.data.data.role === "customer") {
    //             navigate("/customer");
    //           } else if (res.data.data.roleId.name === "agency") {
    //             navigate("/agency");
    //           }
    //         }
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //     }
    // };
    
    return (
        <>
        {isLoading == true && <CustomLoader />}
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5"
            
            sx={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgba(103, 102, 102, 0.55)", // Light opacity overlay
                    backgroundBlendMode: "lighten",
                }}
        >
            
            <Paper elevation={3} sx={{ padding: 4, width: 350, bgcolor: "rgba(33, 33, 33, 0.9)", color: "white" }}>
            
                <Box display="flex" justify-content="space-between" alignItems="center" width="100%">
                    <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                        Sign In
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        sx={{
                            //"& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            //     borderColor: "rgba(255, 255, 255, 0.7)", // Change focus border color to white
                            // },
                            

                             "& .MuiOutlinedInput-root": { border: "1px solid white" }, "& .MuiOutlinedInput-root.Mui-focused": { border: "none" }
                        }}
                        InputProps={{
                            style: {
                            
                                color: "white", // Text color
                                backgroundColor: "rgba(71, 70, 70, 0.2)", // Slightly visible background
                                borderRadius: "5px",
                                // border: "1px solid white",
                            },

                        }}
                        
                        InputLabelProps={{
                            style: { color: "rgba(250, 245, 245, 0.7)" }, // Label color
                            
                        }}
                        {...register("email", { required: "Email is required", pattern: { value: /.+@.+\..+/, message: "Enter a valid email" } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    {/* <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    /> */}
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"} // Toggle visibility
                        variant="outlined"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": { border: "1px solid white" }, "& .MuiOutlinedInput-root.Mui-focused ": { border: "none" }
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
                                // border: "1px solid white",
                            },
                        }}
                        InputLabelProps={{
                            style: { color: "rgba(255, 255, 255, 0.7)" }, // Label color
                        }}
                    />

                    {/* <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
                        <InputLabel sx={{ mt: -0.8 }}>Role</InputLabel>
                        <Select {...register("role", { required: "Role is required" })} defaultValue="customer">
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="agency">Agency</MenuItem>
                        </Select>
                    </FormControl> */}
                    <FormControlLabel
                        control={<Checkbox {...register("rememberMe")} sx={{
                            color: "white", // Default checkbox color
                            "&.Mui-checked": { color: "white" }, // Checked state color
                        }} />}
                        label="Remember Me"
                        sx={{
                            mt: 1, color: "white", // Label color
                            "& .MuiTypography-root": { color: "white" },
                        }}
                    />

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Sign In
                    </Button>
                </form>
                <Divider sx={{ my: 2 }}>or</Divider>

                <Typography align="center" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#1976d2' }}>Create one</Link>
                </Typography>

                <Typography align="center" sx={{ mt: 2 }}>
                    <Link to="" style={{ color: '#1976d2' }} onClick={onForgotPassword}>Forgot Your Password?</Link>
                    {/* to="" makes the link behave like a normal text element. */}
                </Typography>
            </Paper>
        </Box>
        </>
    );
}