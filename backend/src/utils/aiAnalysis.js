import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const analyzeCodeWithAI = async (code) => {
  const url = 'https://api-inference.huggingface.co/models/codebert/codebert-base'; // CodeBERT model, adjust as necessary
  const headers = {
    'Authorization': `Bearer ${process.env.YOUR_HUGGINGFACE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, 
      {
        inputs: code,
      },
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze code");
  }
};

export default analyzeCodeWithAI;
