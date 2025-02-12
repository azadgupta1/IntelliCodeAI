import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Ensure this is set in .env
});

async function testAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: "Print: Hello, AI!" }],
      max_tokens: 100, // Ensure limited response size
    });

    console.log("🔍 Full AI Response:", JSON.stringify(response, null, 2)); // Log full response

    if (response.choices && response.choices.length > 0) {
      console.log("✅ AI Message Content:", response.choices[0].message.content);
    } else {
      console.log("⚠️ AI Response is missing expected content.");
    }
  } catch (error) {
    console.error("❌ AI request failed:", error);
  }
}

testAI();
