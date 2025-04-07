import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import bgImg from '../assets/Bg-1.png';
import CloseIcon from "@mui/icons-material/Close";
import CustomLoader from "./CustomLoader";

export default function SignUp() {
    const [isLoading, setisLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [roleId, setRoleId] = useState(null); // Store roleId
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
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
            setisLoading(true);
            setTimeout(() => {
                console.log("Processing signup...");
            }, 500);
            const res = await axios.post("/user/signup", data,{timeout:10000});
            setisLoading(false);
            if (res.status === 201) {

                // localStorage.setItem("userName", data.name);
                // alert("Signup successful! Please login.");
                navigate("/signin");
            }
        } catch (err) {
            setisLoading(false);
            console.error("Signup error:", err);
        }
    };

    const password = watch("password", "");

    return (

        <>
    {isLoading == true && <CustomLoader />}
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
                    {/* ------------------------ Name --------------------------- */}
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": { border: "1px solid white" }, "& .MuiOutlinedInput-root.Mui-focused ": { border: "none" }
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
                            style: { color: "rgba(255, 255, 255, 0.7)" }, // Label color
                        }}
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    {/* ----------------------------- Email ------------------------------- */}
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        sx={{
                            "& .MuiOutlinedInput-root": { border: "1px solid white" }, "& .MuiOutlinedInput-root.Mui-focused ": { border: "none" }
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
                            style: { color: "rgba(255, 255, 255, 0.7)" }, // Label color
                        }}
                        {...register("email", { required: "Email is required", pattern: { value: /.+@.+\..+/, message: "Enter a valid email" } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    {/* ----------------------------- Password ----------------------------------- */}
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
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
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                    {/* ----------------------------- Confirm Password ----------------------------------  */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": { border: "1px solid white" }, "& .MuiOutlinedInput-root.Mui-focused ": { border: "none" }
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
                            style: { color: "rgba(255, 255, 255, 0.7)" }, // Label color
                        }}
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    {/* ---------------------------- Role -------------------------------------------------- */}
                    <FormControl fullWidth margin="normal" variant="outlined" sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                            border: "1px solid white", // Normal state border
                            },
                            "&:hover fieldset": {
                            border: "1px solid white", // Hover state
                            },
                            "&.Mui-focused": {
                            border: "none !important", // Remove border on focus
                            },
                            color: "white", // Add this for white text color
                        },
                        // Label styling
                        "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&.Mui-focused": {
                            color: "rgba(255, 255, 255, 0.7) !important",
                            },
                        },
                        }}>
                        <InputLabel sx={{
                            "& .MuiOutlinedInput-root": { border: "1px solid white" }, 
                            "& .MuiOutlinedInput-root.Mui-focused": { border: "none" }
                        }}>Role</InputLabel>
                        <Select
                            defaultValue=""
                            {...register("role", { required: "Role is required" })}
                            onChange={handleRoleChange}
                            sx={{
                            "& .MuiSvgIcon-root": { color: "#fff" },
                            color: "white", // Ensure selected text is white
                            // Remove any focus effects
                            "&:before": {
                                borderBottom: "none",
                            },
                            "&:after": {
                                borderBottom: "none",
                            },
                            }}
                            MenuProps={{
                            PaperProps: {
                                sx: {
                                backgroundColor: "rgb(69, 69, 69)",
                                color: "#fff",
                                }
                            }
                            }}
                        >
                            <MenuItem value="customer" sx={{ color: "#fff" }}>Customer</MenuItem>
                            <MenuItem value="agency" sx={{ color: "#fff" }}>Agency</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ------------------------------------- Remember me ----------------------------------- */}
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

                    {/* -------------------------------- SignUp Button ------------------------------------- */}
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
        </>
    );
}
