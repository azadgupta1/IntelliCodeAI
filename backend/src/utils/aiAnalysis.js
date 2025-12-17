import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure API key is set

async function analyzeCode(code, filePath) {
  try {
    console.log(`🔍 Analyzing: ${filePath}`); // Debugging

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const numberedCode = code
          .split("\n")
          .map((line, idx) => `${idx + 1}: ${line}`)
          .join("\n");

        const prompt = `
        You are a senior AI code reviewer. Analyze the code below and provide structured feedback.

        ---

        Code:
        \`\`\`
        ${numberedCode}
        \`\`\`

        Respond with STRICTLY a valid JSON object in the following format:

        {
          "errors": [
            {
              "message": "Describe the critical issue",
              "line": 12,
              "severity": "high | medium | low"
            }
          ],
          "optimizations": [
            {
              "message": "Describe the performance improvement",
              "line": 22
            }
          ],
          "suggestions": [
            {
              "message": "Describe the best practice",
              "line": 8
            }
          ]
        }

        Keep the response clean and ensure proper JSON syntax. Only return the JSON object. Do NOT add commentary.
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














    




// import fetch from "node-fetch";

// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Your new API key

// async function analyzeCode(code, filePath) {
//   try {
//     console.log(`🔍 Analyzing: ${filePath}`); // Debugging

//     const numberedCode = code
//       .split("\n")
//       .map((line, idx) => `${idx + 1}: ${line}`)
//       .join("\n");

//     const prompt = `
//     You are a senior AI code reviewer. Analyze the code below and provide structured feedback.

//     ---

//     Code:
//     \`\`\`
//     ${numberedCode}
//     \`\`\`

//     Respond with STRICTLY a valid JSON object in the following format:

//     {
//       "errors": [
//         {
//           "message": "Describe the critical issue",
//           "line": 12,
//           "severity": "high | medium | low"
//         }
//       ],
//       "optimizations": [
//         {
//           "message": "Describe the performance improvement",
//           "line": 22
//         }
//       ],
//       "suggestions": [
//         {
//           "message": "Describe the best practice",
//           "line": 8
//         }
//       ]
//     }

//     Keep the response clean and ensure proper JSON syntax. Only return the JSON object. Do NOT add commentary.
//     `;

//     // Call OpenRouter API
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "openrouter/auto",
//         messages: [
//           { role: "system", content: "You are an expert AI code reviewer." },
//           { role: "user", content: prompt },
//         ],
//         temperature: 0.2,
//       }),
//     });

//     const data = await response.json();
//     console.log("🔄 AI API Full Response:", JSON.stringify(data, null, 2));

//     // Extract content from response
//     const content = data?.choices?.[0]?.message?.content;

//     if (!content) {
//       console.warn("⚠️ Unexpected AI response format:", data);
//       return { errors: [], optimizations: [], suggestions: ["AI response format issue"] };
//     }

//     // Parse JSON safely
//     try {
//       return JSON.parse(content.replace(/```json|```/g, "").trim());
//     } catch (parseError) {
//       console.error("❌ Failed to parse AI response as JSON:", parseError);
//       return { errors: [], optimizations: [], suggestions: ["Invalid JSON from AI response."] };
//     }

//   } catch (error) {
//     console.error("❌ AI analysis failed:", error);
//     return { errors: [], optimizations: [], suggestions: ["Error analyzing code. Try again."] };
//   }
// }

// export default analyzeCode;





    // const prompt = `
    //     You are a senior AI code reviewer. Analyze the code below and provide structured feedback.

    //     ---
    //     Code:
    //     \`\`\`
    //     ${code}
    //     \`\`\`

    //     Respond with STRICTLY a valid JSON object in the following format:

    //     {
    //       "errors": [
    //         {
    //           "message": "Describe the critical issue",
    //           "line": 12,
    //           "severity": "high | medium | low"
    //         }
    //       ],
    //       "optimizations": [
    //         {
    //           "message": "Describe the performance improvement",
    //           "line": 22
    //         }
    //       ],
    //       "suggestions": [
    //         {
    //           "message": "Describe the best practice",
    //           "line": 8
    //         }
    //       ]
    //     }

    //     Keep the response clean and ensure proper JSON syntax. Only return the JSON object. Do NOT add commentary.
    //     `;