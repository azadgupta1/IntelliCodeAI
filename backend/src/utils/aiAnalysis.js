// import axios from 'axios';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const analyzeCodeWithAI = async (code) => {
//   const url = 'https://api-inference.huggingface.co/models/codebert/codebert-base'; // CodeBERT model, adjust as necessary
//   const headers = {
//     'Authorization': `Bearer ${process.env.YOUR_HUGGINGFACE_API_KEY}`,
//     'Content-Type': 'application/json',
//   };

//   try {
//     const response = await axios.post(url, 
//       {
//         inputs: code,
//       },
//       { headers: headers }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("AI Analysis Error:", error);
//     throw new Error("Failed to analyze code");
//   }
// };

// export default analyzeCodeWithAI;


// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY, // Store in .env
// });

// async function analyzeCode(code) {
//   const response = await openai.chat.completions.create({
//     model: "deepseek/deepseek-r1:free",
//     messages: [{ role: "user", content: `Debug this code:\n${code}` }],
//   });
//   return response.choices[0].message.content;
// }

// export default analyzeCode; // ✅ Default export


import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Store in .env
});

async function analyzeCode(code) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: `Debug this code:\n${code}` }],
    });

    console.log("AI API Full Response:", JSON.stringify(response, null, 2)); // Detailed logging

    if (
      !response ||
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      console.warn("Empty or unexpected AI response structure:", response);
      return "The AI could not analyze the code. Please try again or provide a different code snippet.";
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI analysis failed:", error);
    return "Error analyzing code. Please try again later.";
  }
}

export default analyzeCode;
