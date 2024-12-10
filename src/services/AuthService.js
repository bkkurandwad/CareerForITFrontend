// src/apiService.js

import axiosInstance from "../interceptors/axiosInterceptor";

const API_URL = process.env.REACT_APP_server_url; // Replace with your backend URL

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login/student`, {
      username: username,
      password: password,
    });
    return response.data; // Assuming the backend returns user data or token
  } catch (error) {
    console.error("Login failed", error);
    throw error; // Forward error to handle it in the component
  }
};

const register = async (username, password, name, number, mail) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/reg/student`, {
      username: username,
      password: password,
      name: name,
      number: number,
      mail: mail,
    });
    return response.data; // Assuming the backend returns user data or token
  } catch (error) {
    console.error("Reg failed", error);
    throw error; // Forward error to handle it in the component
  }
};

export default { login, register };
