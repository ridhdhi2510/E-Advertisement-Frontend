import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [roleId, setRoleId] = useState(null); // Store roleId
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } ,setValue} = useForm();
    const [role, setRole] = useState("");

    // Fetch roleId when the user selects a role
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
                setRoleId(res.data.data._id); // Store roleId
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
                alert("Signup successful! Please login.");
                navigate("/signin"); // Redirect to SignIn after signup
            }
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    const password = watch("password", "");

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
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
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
                        <InputLabel sx={{ mt: -0.8 }}>Role</InputLabel>
                        <Select defaultValue="" {...register("role", { required: "Role is required" })} onChange={handleRoleChange}>
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
                        control={<Checkbox {...register("rememberMe")} />}
                        label="Remember Me"
                        sx={{ mt: 1 }}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>
                <Divider sx={{ my: 2 }}>or</Divider>
                <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/" style={{ color: '#1976d2' }}>Sign In</Link>
                </Typography>
            </Paper>
        </Box>
    );
}
