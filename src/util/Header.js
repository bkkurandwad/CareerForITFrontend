import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/homepage.css";
import logo from "../resources/logo.webp";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    // Clear the 'Token' cookie on logout
    Cookies.remove("Token");
    console.log("Logged out successfully");
    navigate("/login"); // Redirect to login page after logout
  };

  const token = Cookies.get("Token");

  return (
    <header className="global-header">
      <div style={{ display: "flex", gap: "10px" }}>
        <img src={logo} alt="Organization Logo" style={{ width: "100px" }} />
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="name"
        >
          <h1 style={{ marginTop: "-30px", marginLeft: "-40px" }}>
            Career Crafter
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
            marginTop: "-10px",
          }}
        >
          <Link to="/main" className="linkobj">
            Home
          </Link>
          <Link to="/resume" className="linkobj">
            Resume
          </Link>
          <Link to="/dashboard" className="linkobj">
            Code
          </Link>
          <Link to="/interview" className="linkobj">
            Interview
          </Link>
          <Link to="/contact" className="linkobj">
            Contact Us
          </Link>
          {/* Conditional rendering for Login/Logout buttons */}
          <div style={{ display: "flex", gap: "12px", marginLeft: "40px" }}>
            {token ? (
              <button className="btn" onClick={handleLogoutClick}>
                Logout
              </button>
            ) : (
              <>
                <button className="btn" onClick={handleLoginClick}>
                  Login
                </button>
                <button className="btn" onClick={handleSignupClick}>
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div />
        </div>
      </div>
    </header>
  );
}

export default Header;
