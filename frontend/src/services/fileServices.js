// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// File upload function
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

// File analysis function
export const analyzeFile = async (fileId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analysis/analyze/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('File Analysis Error:', error.response?.data || error.message);
    throw error;
  }
};


