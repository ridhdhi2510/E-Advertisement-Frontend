// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Unauthorized = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear user data from localStorage
//     localStorage.removeItem("id");
//     localStorage.removeItem("role");

//     // Redirect to sign-in page
//     navigate("/signin");
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🚫 Access Denied</h1>
//       <p style={styles.text}>You do not have permission to view this page.</p>
//       <button style={styles.button} onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     marginTop: "50px",
//     fontFamily: "Arial, sans-serif"
//   },
//   heading: {
//     fontSize: "2rem",
//     color: "red",
//   },
//   text: {
//     fontSize: "1.2rem",
//     margin: "20px 0",
//   },
//   button: {
//     fontSize: "1rem",
//     padding: "10px 20px",
//     color: "#fff",
//     backgroundColor: "#007bff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
// };

// export default Unauthorized;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import unauthorizedImage from "../assets/unauthorized.png";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img
          src={unauthorizedImage}
          alt="Unauthorized"
          style={isMobile ? styles.imageMobile : styles.image}
        />
        <button
          style={isMobile ? styles.buttonMobile : styles.button}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  content: {
    textAlign: "center",
    maxWidth: "90%",
  },
  image: {
    width: "100%",
    maxWidth: "700px",
    height: "auto",
  },
  imageMobile: {
    width: "100%",
    maxWidth: "90vw",
    height: "auto",
  },
  button: {
    marginTop: "20px",
    padding: "12px 30px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
  buttonMobile: {
    marginTop: "16px",
    padding: "10px 24px",
    fontSize: "0.9rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
};

export default Unauthorized;
