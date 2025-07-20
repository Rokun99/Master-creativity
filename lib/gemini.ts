import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Safely get the API Key from environment variables.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // This stops the application and shows a clear error if the API key is missing.
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

// 2. Initialize the Gemini AI client with the validated key.
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * A safe function to generate text from a prompt.
 * It checks for a valid prompt and safely handles the API response.
 */
export async function generateTextFromPrompt(prompt: string): Promise<string> {
  // Return early if the prompt is empty to avoid unnecessary API calls.
  if (!prompt) {
    console.error("generateTextFromPrompt was called with an empty prompt.");
    return "";
  }

  try {
    // IMPORTANT: Ensure "gemini-2.5-flash" is the exact, valid model ID from the API documentation.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Safely access the text from the response using optional chaining (`?`).
    // If `response` or `text()` is not available, it provides a fallback empty string (`?? ''`).
    const text = response?.text() ?? '';
    
    return text;

  } catch (error) {
    console.error("Error generating text from Gemini:", error);
    // Return an empty string in case of an API error.
    return "";
  }
}

/**
 * An example function showing how to safely access deeply nested data.
 * This pattern solves errors like "'response.generatedImages' is possibly 'undefined'".
 */
export function getImageUrlFromApiResponse(response: any): string {
    // Safely access a nested URL.
    // If `response`, `generatedImages`, or `[0]` is null or undefined,
    // the expression will safely return undefined, and the `?? ''` will
    // convert that to an empty string.
    const imageUrl = response?.generatedImages?.[0]?.url ?? '';
    return imageUrl;
}

/**
 * Safely parses JSON from the response text.
 */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;

  try {
    const result = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" }).generateContent(prompt);
    const text = result.response.text();

    // Add a guard clause to ensure text is not undefined or empty before parsing.
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