import React, { useState } from "react";
import "../stylesheets/LearnPage.css";

import { useNavigate } from "react-router-dom";

const LearnPage = () => {
  const [selectedCompany, setSelectedCompany] = useState("default");
  const navigate = useNavigate();

  const companies = [
    { name: "Google", modules: ["Cloud Computing", "AI/ML Basics", "Data Structures"] },
    { name: "Amazon", modules: ["AWS Essentials", "Logistics Optimization", "Customer Service Excellence"] },
    { name: "Microsoft", modules: ["Azure Fundamentals", "Enterprise Tools", "Collaboration in Teams"] },
  ];

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const selectedModules =
    selectedCompany !== "default"
      ? companies.find((company) => company.name === selectedCompany).modules
      : [];

  return (
    <div className="learn-container">
      <h1>Customized Training Modules</h1>
      <p>Select a company to view tailored training modules.</p>

      <select value={selectedCompany} onChange={handleCompanyChange} className="company-selector">
        <option value="default">Select a Company</option>
        {companies.map((company) => (
          <option key={company.name} value={company.name}>
            {company.name}
          </option>
        ))}
      </select>

      <div className="modules-container">
        {selectedModules.length > 0 ? (
          selectedModules.map((module, index) => (
            <div key={index} className="module-card">
              <h3>{module}</h3>
              <p>
                Learn about {module} to enhance your skills and prepare for a role at {selectedCompany}.
              </p>
              <button
                className="start-button"
                onClick={() => navigate(`/learn/${module}`)} // Navigate to module details
              >
                Start Module
              </button>
            </div>
          ))
        ) : (
          <p>Please select a company to view the training modules.</p>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
