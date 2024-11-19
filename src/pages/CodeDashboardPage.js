import React, { useEffect, useState } from "react";
import getQuestions from "../services/QuestionService"; // Import the getQuestions function
import "../stylesheets/dashboard-page.css"; // Assuming CSS is set up for styling the cards
import { useNavigate } from "react-router-dom";

const CodeDashboardPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // State to store questions
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store error message

  // Fetch questions when the component mounts

  const fetchQuestions = async (level) => {
    console.log('i m fetching');
    try {
      const data = await getQuestions(level); // Fetch questions using the service
      setQuestions(data); // Set questions data in state
      console.log(data);
    } catch (error) {
      setError("Failed to load questions"); // Set error message if something fails
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  const gotoCode = (id) => {
    window.open(`/codenow/${id}`, "_blank");
  };

  // fetchQuestions(); // Call the function to fetch questions

  //   if (loading) return <div>Loading questions...</div>; // Display loading text
  //   if (error) return <div>{error}</div>; // Display error message if fetching failed

  return (
    <div className="dashboard-page">
      <h1>Welcome to the dashboard</h1>
      <div>
        <h2>Get Coding Questions to Practice</h2>
        <div style={{ display: "flex", gap: "50px" }}>
          <button className="btn" onClick={() => fetchQuestions(0)}>
            Easy
          </button>
          <button className="btn" onClick={() => fetchQuestions(1)}>
            Medium
          </button>
          <button className="btn" onClick={() => fetchQuestions(2)}>
            Difficult
          </button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* Iterate through questions and display them as cards */}
        {questions.map((question) => (
          <div className="card-for-questions" style={{ marginTop: "20px" }}>
            <div
              key={question.questionID}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ textAlign: "left", marginLeft: "2%" }}>
                <h2>{question.fullQuestion}</h2>
                <p>Difficulty: {question.difficulty}</p>
              </div>
              <button
                className="btn"
                style={{ marginRight: "2%" }}
                onClick={() => gotoCode(question.questionID, question.fullQuestion, question.difficulty)}
              >
                Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeDashboardPage;
