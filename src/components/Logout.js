import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout action
  const handleLogout = () => {
    // Clear tokens and username from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>You are logged out</h2>
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Logout
      </button>
    </div>
  );
}

export default Logout;
