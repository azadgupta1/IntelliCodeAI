// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const fixCode = async (code, filePath) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// You are an expert software engineer.

// Please fix the following code by removing bugs, optimizing performance, and applying best practices.

// Return **only** the complete fixed code inside a single \`\`\` block.

// File: ${filePath}

// \`\`\`js
// ${code}
// \`\`\`
//     `;

//     const result = await model.generateContent(prompt);
//     const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     // Extract only the code block content
//     const codeMatch = responseText.match(/```(?:[a-z]*\n)?([\s\S]*?)```/);
//     const fixedCode = codeMatch ? codeMatch[1].trim() : "";

//     return fixedCode;
//   } catch (error) {
//     console.error("❌ Gemini fixCode error:", error);
//     return "";
//   }
// };

// export default fixCode;


import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fixCode = async (code, filePath, analysisResult) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    const codeMatch = responseText.match(/```(?:[a-z]*\n)?([\s\S]*?)```/);
    const fixedCode = codeMatch ? codeMatch[1].trim() : "";

    return fixedCode;
  } catch (error) {
    console.error("❌ Gemini fixCode error:", error);
    return "";
  }
};

export default fixCode;
