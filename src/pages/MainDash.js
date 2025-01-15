import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/MainDash.css";

const MainDash = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p className="step-description">Follow the steps to accelerate your career growth!</p>
      <div className="step-by-step-container">
        {/* <div className="step" onClick={() => navigate("/guidance")}> */}
        {/*   <div className="step-number">1</div> */}
        {/*   <div className="step-content"> */}
        {/*     <h2>Take Guidance</h2> */}
        {/*     <p>Get expert advice and resources for career growth.</p> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className="step" onClick={() => navigate("/learn")}> */}
        {/*   <div className="step-number">2</div> */}
        {/*   <div className="step-content"> */}
        {/*     <h2>Learn</h2> */}
        {/*     <p>Learn to land your dream job with tailored learning modules.</p> */}
        {/*   </div> */}
        {/* </div> */}
        <div className="step" onClick={() => navigate("/resume")}>
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>Build Resume</h2>
            <p>Create a professional resume to increase your chances of success.</p>
          </div>
        </div>
        <div className="step" onClick={() => navigate("/assesment")}>
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>Take Aptitude Assessment</h2>
            <p>Test your aptitude skills with challenging assessments.</p>
          </div>
        </div>
        <div className="step" onClick={() => navigate("/dashboard")}>
          <div className="step-number">3</div>
          <div className="step-content">
            <h2>Code Now</h2>
            <p>Start solving coding challenges to sharpen your skills.</p>
          </div>
        </div>
        <div className="step" onClick={() => navigate("/interview")}>
          <div className="step-number">4</div>
          <div className="step-content">
            <h2>Take Interview</h2>
            <p>Participate in AI-based mock interviews to evaluate your skills.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDash;