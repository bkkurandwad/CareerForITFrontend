import React, { useState } from "react";
import "../stylesheets/AssessmentPage.css";

const AssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null)); // Example with 10 questions

  const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], correct: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Paris", "Rome"], correct: 1 },
    // Add more questions here
  ];

  // Handle option selection
  const handleOptionChange = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index; // Save selected answer
    setAnswers(updatedAnswers);
  };

  // Deselect the selected answer
  const handleDeselect = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = null; // Remove the answer for the current question
    setAnswers(updatedAnswers);
  };

  // Go to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Handle submission
  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Assessment Submitted!");
    // Submit the answers to the backend or calculate results
  };

  return (
    <div className="assessment-container">
      {/* Sidebar */}
      <div className="sidebar">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`question-box ${answers[index] !== null ? "attempted" : ""}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Main Question Area */}
      <div className="question-area">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{questions[currentQuestion].question}</p>
        <form>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleOptionChange(index)}
                />
                {option}
              </label>
            </div>
          ))}
        </form>
        <button onClick={handleDeselect} disabled={answers[currentQuestion] === null}>
          Deselect
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>Next Question</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
