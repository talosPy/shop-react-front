import React from "react";
import { Link } from "react-router-dom";

function Navbar({ cart, calculateTotal }) {
  const totalAmount = calculateTotal(); // Get the calculated total

  // Check if the user is logged in by looking for the access token in localStorage
  const isLoggedIn = localStorage.getItem("access");
  const email = localStorage.getItem("username"); // Username stored in localStorage after login
  const isAdmin = localStorage.getItem("isAdmin"); // Retrieve admin status from localStorage

  // Handle logout by clearing localStorage
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin"); // Remove admin status on logout
    window.location.reload(); // Reload to reflect the logged-out state
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3000/">
            Fizzy Bublah
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active">
            <Link to="">Home</Link>
          </li>
          <li className="active">
            <Link to="/cart">
              Cart ({cart.length} items) - ${totalAmount}
            </Link>
          </li>
          <li className="active">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        <li className="active">
            {isLoggedIn ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "white", marginRight: "30px" }}>
                  Hello, {email}
                </span>
                {isAdmin === "true" && (
                  <div>
                    {/* Admin button */}
                    <Link to="/about" style={{ color: "blue", marginRight: "30px" }}>
                      Admin
                    </Link>
                  </div>
                )}
                <Link to="/logout" onClick={handleLogout} style={{ color: "red" }}>
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
