import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/homepage.css";
import logo from "../resources/logo.webp";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="global-header">
      <div style={{ display: "flex", gap: "10px" }}>
        <img src={logo} alt="Organization Logo" style={{ width: "100px" }} />
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="name"
        >
          <h1 style={{ marginTop: "-30px", marginLeft: "-40px" }}>Career Crafter</h1>
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
          <Link to="/projects" className="linkobj">
            Resume
          </Link>
          <Link to="/dashboard" className="linkobj">
            Code
          </Link>
          <Link to="/" className="linkobj">
            Interview
          </Link>
          <Link to="/" className="linkobj">
            Contact Us
          </Link>
          <div style={{ display: "flex", gap: "12px", marginLeft: "40px" }}>
            <button className="btn" onClick={handleLoginClick}>
              Login
            </button>
            <button className="btn">Sign Up</button>
          </div>
          <div />
        </div>
      </div>
    </header>
  );
}

export default Header;
