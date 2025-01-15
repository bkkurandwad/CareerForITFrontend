import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import AssesService from "../services/AssesmentService"; // Import the service
import "../stylesheets/AssessmentTestPage.css";

const AssessmentTestPage = () => {
  const { assignId } = useParams(); // Get the assignId from the URL params
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null); // State to store the score
  const [submitted, setSubmitted] = useState(false); // State to check if the test is submitted

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await AssesService.getQuestionsByAssessmentId(assignId); // Use assignId dynamically
        setQuestions(response);
        setAnswers(Array(response.length).fill(null)); // Initialize answers array with null
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [assignId]); // Refetch questions if assignId changes

  const handleOptionChange = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index; // Save selected answer
    setAnswers(updatedAnswers);
  };

  const handleDeselect = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = null; // Remove the answer for the current question
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    // Initialize score
    let calculatedScore = 0;
  
    // Debugging comparison logic
    console.log("User Answers:", answers);
    console.log("Questions:", questions);
  
    questions.forEach((question, index) => {
      if (answers[index] !== null) {
        const selectedOption = question.options[answers[index]]; // Get the selected option string
        const correctOption = question.correctAnswer; // Get the correct answer string
        console.log(`Q${index + 1}: Selected - ${selectedOption}, Correct - ${correctOption}`);
  
        // Normalize and compare answers
        if (selectedOption.trim().toLowerCase() === correctOption.trim().toLowerCase()) {
          calculatedScore++;
        }
      }
    });
  
    // Set the score in state
    setScore(calculatedScore);
    setSubmitted(true);
  };
  

  return (
    <div className="assessment-container">
      {/* Sidebar with question navigation */}
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

      {/* Main Content (Card centered with question) */}
      <div className="card-container">
        {!submitted ? (
          <div className="question-area">
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questions[currentQuestion]?.question}</p>
            <form>
              {questions[currentQuestion]?.options.map((option, index) => (
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
        ) : (
          <div className="result-area">
            <h2>Assessment Submitted!</h2>
            <p>
              You scored {score} out of {questions.length}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentTestPage;
