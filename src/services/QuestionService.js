// src/services/QuestionService.js
import axiosInstance from "../interceptors/axiosInterceptor";

const API_URL = process.env.REACT_APP_server_url; // Replace with your backend URL

const getQuestions = async (level) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/ques/list`, {
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
    const response = await axiosInstance.get(`${API_URL}/ques/codenowques`, {
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
const runCode = async (id, code, lang) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/code/compile`, {
      id,
      code,
      lang
    });
    return response.data; // Expecting the backend to return the output/result
  } catch (error) {
    console.error("Failed to run code", error);
    throw error;
  }
};

export default { getQuestions, getQuestion, runCode };
