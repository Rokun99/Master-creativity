import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set this environment variable in Netlify.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-latest" });

export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    return result.response?.text() ?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

export async function getImageData(prompt: string): Promise<string> {
    if (!prompt) return "";
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const base64ImageBytes = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
      return base64ImageBytes;
    } catch (error) {
      console.error("Error in getImageData:", error);
      return "";
    }
  }

export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    if (text) {
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getJsonFromText:", error);
    return null;
  }
}