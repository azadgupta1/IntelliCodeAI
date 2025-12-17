import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fixCode = async (code, filePath, analysisResult) => {
  try {
    // const model = genAI.getGenerativeModel({ model: "gemini‑2.5‑flash" });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


    const prompt = `
You are an expert software engineer.

Below is a JavaScript file and an AI-generated analysis of its issues. Fix the code based on this analysis: remove bugs, apply suggestions, and follow best practices.

Return ONLY the fully fixed code inside a single \`\`\` block.

File: ${filePath}

--- CODE START ---
\`\`\`js
${code}
\`\`\`
--- CODE END ---

--- ANALYSIS START ---
${analysisResult}
--- ANALYSIS END ---
`;

    const result = await model.generateContent(prompt);
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Debugging, when this API called--------------------------------------------");
    console.log("Gemini response:", responseText);


    const codeMatch = responseText.match(/```(?:[a-z]*\n)?([\s\S]*?)```/);
    const fixedCode = codeMatch ? codeMatch[1].trim() : "";

    return fixedCode;
  } catch (error) {
    console.error("❌ Gemini fixCode error:", error);
    return "";
  }
};

export default fixCode;
