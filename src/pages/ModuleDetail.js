import React from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/ModuleDetail.css";

const ModuleDetail = () => {
  const { moduleName } = useParams(); // Get module name from the route parameter

  // Example content (can be replaced with API call)
  const moduleContent = {
    "Cloud Computing": {
      description: "Understand the basics of cloud computing and its applications.",
      lessons: ["Introduction to Cloud", "Cloud Service Models", "Deployment Models"],
    },
    "AI/ML Basics": {
      description: "Learn the fundamentals of AI and Machine Learning.",
      lessons: ["What is AI?", "Introduction to ML", "Supervised vs Unsupervised Learning"],
    },
    "Data Structures": {
      description: "Master data structures to solve complex problems.",
      lessons: ["Arrays", "Linked Lists", "Trees", "Graphs"],
    },
  };

  const content = moduleContent[moduleName] || {
    description: "Module not found.",
    lessons: [],
  };

  return (
    <div className="module-detail-container">
      <h1>{moduleName}</h1>
      <p>{content.description}</p>

      <h2>Lessons:</h2>
      <ul>
        {content.lessons.map((lesson, index) => (
          <li key={index}>{lesson}</li>
        ))}
      </ul>

      <button className="next-button">Next Lesson</button>
    </div>
  );
};

export default ModuleDetail;
