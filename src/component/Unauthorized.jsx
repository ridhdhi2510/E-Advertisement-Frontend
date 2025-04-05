import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚫 Access Denied</h1>
      <p style={styles.text}>You do not have permission to view this page.</p>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "2rem",
    color: "red",
  },
  text: {
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  button: {
    fontSize: "1rem",
    padding: "10px 20px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Unauthorized;
