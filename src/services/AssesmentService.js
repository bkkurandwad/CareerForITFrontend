import axiosInstance from "../interceptors/axiosInterceptor";

const API_URL = process.env.REACT_APP_server_url; // Replace with your backend URL

const getAssesments = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/assesment/list`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Assesment Tests", error);
    throw error;
  }
};

const getQuestionsByAssessmentId = async (assignId) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/assesment/questions`, {
      assignID: assignId // Sending the assignId in the request body
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions for assignment", error);
    throw error;
  }
};

export default { getAssesments, getQuestionsByAssessmentId };