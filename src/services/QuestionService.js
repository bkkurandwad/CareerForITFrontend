// src/services/QuestionService.js

import axios from "axios";

const API_URL = "http://localhost:8080"; // Replace with your backend URL

const getQuestions = async (level) => {
  try {
    const response = await axios.get(`${API_URL}/ques/list`, {
      headers: {
        Level: level,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions", error);
    throw error;
  }
};

const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/ques/codenowques`, {
      headers: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch question", error);
    throw error;
  }
};

// New function to submit code for execution
const runCode = async (id, code) => {
  try {
    const response = await axios.post(`${API_URL}/code/compile`, {
      id,
      code,
    });
    return response.data; // Expecting the backend to return the output/result
  } catch (error) {
    console.error("Failed to run code", error);
    throw error;
  }
};

export default { getQuestions, getQuestion, runCode };
