import axiosInstance from "../interceptors/axiosInterceptor";

const API_BASE_URL = process.env.REACT_APP_server_url;

const generateResume = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/generate`,
      formData,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error;
  }
};

export default { generateResume };
