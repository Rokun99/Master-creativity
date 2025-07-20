import { GoogleGenerativeAI } from '@google/generative-ai';

// Safely get the API Key and throw a clear error if it's missing.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set this environment variable in Netlify.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * Safely generates text from a prompt.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    // FIX: Use optional chaining and nullish coalescing for safety.
    return result.response?.text() ?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

/**
 * Safely accesses deeply nested properties that might be undefined.
 */
export async function getImageData(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    // FIX: Use optional chaining to safely navigate the object.
    const base64ImageBytes = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
    return base64ImageBytes;
  } catch (error) {
    console.error("Error in getImageData:", error);
    return "";
  }
}

/**
 * Safely parses JSON from the response text.
 */
export async function getJsonFromText<T>(prompt:string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // FIX: Add a guard clause to ensure text is not undefined or empty before parsing.
    if (text) {
      try {
        return JSON.parse(text) as T;
      } catch (parseError) {
        console.error("Failed to parse JSON from response:", parseError);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getJsonFromText:", error);
    return null;
  }
}