

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

// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY, // Ensure this is in your .env
// });

// async function analyzeCode(code) {
//   try {
//     console.log("Sending Code to AI:", code); // ✅ Debug what’s sent to AI

//     const response = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1:free",
//       messages: [{ role: "user", content: `Debug this code:\n${code}` }],
//     });

//     console.log("AI API Full Response:", JSON.stringify(response, null, 2)); // ✅ Log raw AI response

//     if (!response?.choices?.[0]?.message?.content) {
//       console.warn("Unexpected AI response structure:", response);
//       return "AI could not analyze the code. Try again.";
//     }

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("AI analysis failed:", error);
//     return "Error analyzing code. Please try again later.";
//   }
// }

// export default analyzeCode;


// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure API key is in .env

// async function analyzeCode(code) {
//   try {
//     console.log("Sending Code to AI:", code); // ✅ Debug what's sent to AI

//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


//     const prompt = `
//     Analyze the following code:
//     1. Check for errors or debugging needs.
//     2. Suggest performance optimizations.
//     3. Recommend best practices or improvements.
    
//     Code:
//     \`\`\`javascript
//     ${code}
//     \`\`\`
    
//     Provide a structured response with separate sections for:
//     - Debugging Issues (if any)
//     - Optimization Suggestions
//     - Best Practices & Improvements
//     `;

//     const response = await model.generateContent(prompt);

//     console.log("AI API Full Response:", JSON.stringify(response, null, 2)); // ✅ Log raw AI response

//     if (!response?.response?.candidates?.[0]?.content) {
//       console.warn("Unexpected AI response structure:", response);
//       return "AI could not analyze the code. Try again.";
//     }

//     return response.response.candidates[0].content;
//   } catch (error) {
//     console.error("AI analysis failed:", error);
//     return "Error analyzing code. Please try again later.";
//   }
// }

// export default analyzeCode;



import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure API key is set

async function analyzeCode(code, filePath) {
  try {
    console.log(`🔍 Analyzing: ${filePath}`); // Debugging

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Improved prompt to enforce structured JSON output
    const prompt = `
    Analyze the following code:
    - Identify critical errors and debugging issues.
    - Suggest performance optimizations.
    - Recommend best practices & improvements.

    Code:
    \`\`\`
    ${code}
    \`\`\`

    Return the response in **JSON format** with three keys:
    {
      "errors": ["List major issues found"],
      "optimizations": ["List performance improvements"],
      "suggestions": ["List best practice recommendations"]
    }
    Ensure the response is **strictly formatted JSON**.
    `;

    const response = await model.generateContent(prompt);

    console.log("🔄 AI API Full Response:", JSON.stringify(response, null, 2));

    // Extract AI response correctly
    const content = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.warn("⚠️ Unexpected AI response format:", response);
      return { errors: [], optimizations: [], suggestions: ["AI response format issue"] };
    }

    // Extract JSON from the response
    try {
      return JSON.parse(content.replace(/```json|```/g, "").trim());
    } catch (parseError) {
      console.error("❌ Failed to parse AI response as JSON:", parseError);
      return { errors: [], optimizations: [], suggestions: ["Invalid JSON from AI response."] };
    }
  } catch (error) {
    console.error("❌ AI analysis failed:", error);
    return { errors: [], optimizations: [], suggestions: ["Error analyzing code. Try again."] };
  }
}

export default analyzeCode;
