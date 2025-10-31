import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure API key is set

async function analyzeCode(code, filePath) {
  try {
    console.log(`🔍 Analyzing: ${filePath}`); // Debugging

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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