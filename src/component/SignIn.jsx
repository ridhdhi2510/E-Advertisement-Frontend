import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment, alertClasses } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import bgImg from '../assets/Bg-1.png';
import CloseIcon from "@mui/icons-material/Close";
import { event } from 'jquery';


export default function SignIn() {
    
    //hook
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit,getValues, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/user/login", data);
            
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
            const res = await axios.post("/user/forgotpassword",maildata)
            if(res.status === 200){
                alert(res.data.message)
            } 
        }
        catch(err){
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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
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
                        control={<Checkbox {...register("rememberMe")} />}
                        label="Remember Me"
                        sx={{ mt: 1 }}
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
    );
}
