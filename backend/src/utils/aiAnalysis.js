

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
