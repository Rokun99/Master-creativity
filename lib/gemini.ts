import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Safely get the API Key from environment variables.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // This will stop the application and show a clear error if the API key is missing.
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

// 2. Initialize the Gemini AI client with the validated key.
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-latest" });


/**
 * FIX for line 22:
 * Safely returns the response text, or an empty string if the text is undefined.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";

  try {
    const result = await model.generateContent(prompt);
    // FIX: Use nullish coalescing operator (??) to provide a default value.
    const text = result.response.text() ?? '';
    return text;
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

/**
 * FIX for potential undefined nested properties.
 * Safely accesses deeply nested properties.
 */
export async function getImageData(prompt: string): Promise<string> {
  if (!prompt) return "";

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    // FIX: Use optional chaining (?.) to safely navigate the object.
    // The final '?? ""' ensures the result is always a string.
    const base64ImageBytes = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
    
    return base64ImageBytes;
  } catch (error) {
    console.error("Error in getImageData:", error);
    return "";
  }
}

/**
 * FIX for lines 61, 63, etc.:
 * Safely parses JSON from the response text.
 */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // FIX: Add a guard clause to ensure text is not undefined or empty before parsing.
    if (text) {
      try {
        // A second try-catch for the JSON parsing itself, which can also fail.
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