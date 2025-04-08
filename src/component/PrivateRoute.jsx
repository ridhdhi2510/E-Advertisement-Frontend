import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedIn: false, role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (id && role) {
      setAuthState({ isLoggedIn: true, role });
    }
    setLoading(false);
  }, []);

  return { ...authState, loading };
};

const PrivateRoute = ({ allowedRoles = [] }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.loading) {
    return <h1>Loading...</h1>;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
