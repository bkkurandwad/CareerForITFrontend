import React, { useEffect, useState } from "react";
import AssesService from "../services/AssesmentService";
import "../stylesheets/AssesmentPage.css";

const AssesmentPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments data from the service
    const fetchAssignments = async () => {
      try {
        const response = await AssesService.getAssesments();
          setAssignments(response);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="assessment-container">
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h3 className="card-title">{assignment.name}</h3>
            <p className="card-desc">{assignment.desc}</p>
            <p className="card-questions">Total Questions: {assignment.totalQues}</p>
            <button className="start-button">Start</button>
          </div>
        ))
      ) : (
        <p>No assignments available</p>
      )}
    </div>
  );
};

export default AssesmentPage;
