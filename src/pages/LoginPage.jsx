import React, { useState } from "react";
import "../stylesheets/LoginPage.css";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("button clicked");
  
    try {
      const userData = await AuthService.login(username, password);
      console.log("Login response:", userData);
  
      // Check if the response contains a valid token or success message
      if (userData.message === "Login Successful") {
        console.log("Login successful:", userData);
        // Store the JWT in a cookie
        const token = userData.accessToken; // Assuming userData contains the JWT in token field
        const reftoken = userData.refreshToken;
        Cookies.set("Token", token, { expires: 1 }); // Expires in 1 day
        Cookies.set("RefreshToken", reftoken, { expires: 3});
        Cookies.set("username", username);
        // Trigger a redirect to the dashboard
        setRedirect(true);
      } else {
        // If no valid token, display error
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please check your credentials.");
    }
  };
  

  if (redirect) {
    return <Navigate to="/main" />;
  }

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <h1 className="heading" style={{ marginBottom: "20px" }}>Login</h1>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ height: "25px", width: "200px" }}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ height: "25px", width: "200px" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              width: "100px",
              height: "40px",
              marginTop: "20px",
            }}
          >
            Login
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
