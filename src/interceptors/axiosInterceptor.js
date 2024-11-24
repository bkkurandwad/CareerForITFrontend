import axios from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API base URL
});

// Add a request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from the cookie
    const token = Cookies.get('Token'); // Assuming 'token' is the cookie name
    if (token) {
      // Add token to Authorization header if it exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can also add a response interceptor if you need to handle errors or responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error globally (e.g., for token expiry or other errors)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - Token Expired or Invalid');
      // Optionally redirect to login page or handle token expiry
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
