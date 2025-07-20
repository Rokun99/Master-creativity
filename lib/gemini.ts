import { GoogleGenerativeAI } from '@google/generative-ai';

// Safely get the API Key and throw an error if it's missing.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
// Using a modern, stable model name.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * Safely generates text from a prompt.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    // Use optional chaining and nullish coalescing for safety.
    return result.response?.text() ?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}