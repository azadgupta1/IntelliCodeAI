import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Adjust based on your backend URL

axios.defaults.withCredentials = true; // Enable cookies in requests

export const getAuthUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`);
    return response.data;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  await axios.post(`${API_BASE_URL}/auth/logout`);
};


export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('File Upload Error:', error.response?.data || error.message);
    throw error;
  }
};

export const analyzeFile = async (fileId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analysis/analyze/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('File Analysis Error:', error.response?.data || error.message);
    throw error;
  }
};

