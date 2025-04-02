import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
     const isAuthenticated = !!localStorage.getItem("id"); // Check if token exists
    
     return (
         isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
     );
}

export default PrivateRoute
