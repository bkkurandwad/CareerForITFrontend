import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/MainDash.css";

const MainDash = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/dashboard")}>
          <h2>Code Now</h2>
          <p>Start solving coding challenges and improve your skills.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/assesment")}>
          <h2>Take Aptitude Assessment</h2>
          <p>Test your aptitude skills with challenging assessments.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/guidance")}>
          <h2>Take Guidance</h2>
          <p>Get expert advice and resources for career growth.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/build-resume")}>
          <h2>Build Resume</h2>
          <p>Create a professional resume to land your dream job.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/learn")}>
          <h2>Learn</h2>
          <p>Learn to land on dream job.</p>
        </div>
      </div>
    </div>
  );
};

export default MainDash;
