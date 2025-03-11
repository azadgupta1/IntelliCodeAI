// // src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000', // Backend running on port 3000
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // File upload function
// export const uploadFile = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await api.post('/files/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('File Upload Error:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // File analysis function
// export const analyzeFile = async (fileId) => {
//   try {
//     const response = await api.post(`/analysis/analyze/${fileId}`);
//     return response.data;
//   } catch (error) {
//     console.error('File Analysis Error:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
