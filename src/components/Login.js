import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("") // State for email input
  const [password, setPassword] = useState("") // State for password input
  const [error, setError] = useState("") // State for error message
  const navigate = useNavigate() // Hook for navigating programmatically

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault() // Prevent page reload on form submit

    // Check if both email and password are entered
    if (email && password) {
      axios
        .post("http://127.0.0.1:8000/products/access/", {
          username: email,
          password: password,
        })
        .then((response) => {
          // Save JWT tokens and username to localStorage
          localStorage.setItem("access", response.data.access) // Save access token
          localStorage.setItem("refresh", response.data.refresh) // Save refresh token
          localStorage.setItem("username", email) // Save username

          // Save admin status in localStorage
          localStorage.setItem("isAdmin", response.data.isAdmin) // Save admin status
          navigate("/")
        })
        .catch((error) => {
          setError("Invalid credentials, please try again.") // Display error if login fails
          console.error("Error during login:", error.response?.data)
        })
    } else {
      setError("Please fill in all fields.") // Error message if fields are empty
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* Display error if exists */}
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
