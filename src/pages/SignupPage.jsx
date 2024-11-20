import React, { useState } from "react";
import "../stylesheets/SignupPage.css";
import register from "../services/AuthService"; // Assuming a signup service exists
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const userData = await register(name, email, phoneNumber, username, password);
      console.log("Signup successful:", userData);
      setError("");

      // Store the JWT in a cookie (assuming userData contains a token)
      Cookies.set("token", userData.token, { expires: 1 }); // Token expires in 1 day

      // Redirect to dashboard after successful signup
      setRedirect(true);
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please check your details and try again.");
    }
  };

  if (redirect) {
    return <Navigate to="/main" />;
  }

  return (
    <div
      className="signup-page"
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
        <h1 className="heading" style={{ marginBottom: "20px" }}>Sign Up</h1>
        <form
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ height: "25px", width: "200px" }}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ height: "25px", width: "200px" }}
          />

          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={{ height: "25px", width: "200px" }}
          />

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
            Sign Up
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
