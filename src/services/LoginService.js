// src/apiService.js

import axios from "axios";

const API_URL = "http://localhost:8080"; // Replace with your backend URL

const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/login/student", {
      username: username,
      password: password,
    });
    return response.data; // Assuming the backend returns user data or token
  } catch (error) {
    console.error("Login failed", error);
    throw error; // Forward error to handle it in the component
  }
};

export default login;
