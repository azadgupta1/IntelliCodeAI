

// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY, // Store in .env
// });

// async function analyzeCode(code) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1:free",
//       messages: [{ role: "user", content: `Debug this code:\n${code}` }],
//     });

//     console.log("AI API Full Response:", JSON.stringify(response, null, 2)); // Detailed logging

//     if (
//       !response ||
//       !response.choices ||
//       !response.choices[0] ||
//       !response.choices[0].message ||
//       !response.choices[0].message.content
//     ) {
//       console.warn("Empty or unexpected AI response structure:", response);
//       return "The AI could not analyze the code. Please try again or provide a different code snippet.";
//     }

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("AI analysis failed:", error);
//     return "Error analyzing code. Please try again later.";
//   }
// }

// export default analyzeCode;

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Ensure this is in your .env
});

async function analyzeCode(code) {
  try {
    console.log("Sending Code to AI:", code); // ✅ Debug what’s sent to AI

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: `Debug this code:\n${code}` }],
    });

    console.log("AI API Full Response:", JSON.stringify(response, null, 2)); // ✅ Log raw AI response

    if (!response?.choices?.[0]?.message?.content) {
      console.warn("Unexpected AI response structure:", response);
      return "AI could not analyze the code. Try again.";
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI analysis failed:", error);
    return "Error analyzing code. Please try again later.";
  }
}

export default analyzeCode;
