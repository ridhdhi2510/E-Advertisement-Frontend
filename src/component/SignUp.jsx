import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import bgImg from '../assets/Bg-1.png';
import CloseIcon from "@mui/icons-material/Close";


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [roleId, setRoleId] = useState(null); // Store roleId
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } ,setValue} = useForm();
    const [role, setRole] = useState("");

    const handleRoleChange = async (event) => {
        
        const roleName = event.target.value;
        console.log(roleName)
        // setRole(roleName);
        // setValue("role", event.target.value);
        // console.log("Selected Role:", roleName);
        try {
            const res = await axios.get(`/role/getrolebyname/${roleName}`);
            console.log("API Response:", res.data); 
            if (res.data.data) {
                setRoleId(res.data.data._id);
            }
        } catch (error) {
            console.error("Error fetching role ID:", error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        // console.log("role id is", roleId)
        if (!roleId) {
            alert("Please select a valid role.");
            return;
        }

        data.roleId = roleId; // Assign roleId before sending the request

        try {
            const res = await axios.post("/user/signup", data);
            if (res.status === 201) {

                // localStorage.setItem("userName", data.name);
                alert("Signup successful! Please login.");
                navigate("/signin");
            }
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    const password = watch("password", "");

    return (

        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(103, 102, 102, 0.55)", // Light opacity overlay
            backgroundBlendMode: "lighten",
        }}>

            <Paper elevation={3} sx={{ p: 4, mt: 7, mb: 7, width: 450, boxShadow: 3, borderRadius: 2, bgcolor: "rgba(33, 33, 33, 0.9)", color: "white" }}>
                <Box display="flex" justify-content="space-between" alignItems="center" width="100%">
                    <Typography fontWeight="bold" align="center" sx={{ ml: 1, fontSize: "23px", whiteSpace: "nowrap" }}>
                        Sign Up
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
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.7)", // Change focus border color to white
                            },
                        }}
                        InputProps={{
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
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.7)", // Change focus border color to white
                            },
                        }}
                        InputProps={{
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
                        {...register("email", { required: "Email is required", pattern: { value: /.+@.+\..+/, message: "Enter a valid email" } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
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
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.7)", // Change focus border color to white
                            },
                        }}
                        InputProps={{
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
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <FormControl fullWidth margin="normal" variant="outlined" sx={{
                        backgroundColor: "rgba(71, 70, 70, 0.2)", // Dark background with opacity
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-root": {
                            color: "#fff !important" , // Light text color
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff !important", // Light border
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff !important", // Border on hover
                            }
                        }
                    }} >

                        <InputLabel sx={{ color: "#FFFFFFB3", "&.Mui-focused": { color: "#fff !important" } }}>Role</InputLabel>
                        <Select
                            defaultValue=""
                            {...register("role", { required: "Role is required" })}
                            onChange={handleRoleChange}
                            sx={{
                                color: "#fff", // Light text color
                                "& .MuiSvgIcon-root": { color: "#fff" }, // Light dropdown icon
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: "rgb(69, 69, 69)", // Dark dropdown background
                                        color: "#fff", // Light text in dropdown
                                    }
                                }
                            }}

                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="agency">Agency</MenuItem>
                        </Select>
                    </FormControl>
                    

                    {/* <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
                        <InputLabel sx={{ mt: -0.8 }}>Role</InputLabel>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role is required" }}
                            render={({ field }) => (
                                <Select {...field} onChange={(event) => {
                                    field.onChange(event); // Ensure React Hook Form updates value
                                    handleRoleChange(event); // Call your function
                                }}>
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="agency">Agency</MenuItem>
                                </Select>
                            )}
                        />
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
                        Sign Up
                    </Button>
                </form>
                <Divider sx={{ my: 2 }}>OR</Divider>
                <Typography align="center">
                    Already have an account? <Link to="/signin" style={{ color: '#1976d2' }}>Sign In</Link>
                </Typography>
            </Paper>

        </Box>
    );
}
