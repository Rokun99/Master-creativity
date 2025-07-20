// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// FIX: Safely get the API Key and throw an error if it's missing.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set this environment variable in Netlify.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * FIX: This function now safely handles a potentially undefined response.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    // Use optional chaining (?) and the nullish coalescing operator (??) for safety.
    return response?.text() ?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

/**
 * FIX: This function now safely handles a deeply nested, optional property.
 */
export async function getImageData(prompt: string): Promise<string> {
    if (!prompt) return "";
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      // Use optional chaining to safely navigate the object.
      const base64ImageBytes = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
      return base64ImageBytes;
    } catch (error) {
      console.error("Error in getImageData:", error);
      return "";
    }
  }

/**
 * FIX: This function now safely parses text that might be undefined or not valid JSON.
 */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // First, check if text exists.
    if (text) {
      // Second, use a try-catch block for parsing, which can fail.
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